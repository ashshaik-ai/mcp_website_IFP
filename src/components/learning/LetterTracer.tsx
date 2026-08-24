"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Eraser, PenLine } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { buzz } from "@/lib/haptics";
import { celebrate } from "@/lib/celebrate";

/* Trace the letter with your finger.

   Write It! Arabic is built entirely on this and it was the one rival
   mechanic with no answer here: the portal could show you four positional
   forms of ba and never ask you to make one. Reading a script and writing it
   are different skills, and the second is where the shape sticks.

   No handwriting recognition and no authored stroke paths for twenty-eight
   letters. The letter to follow is drawn to its own canvas, and that same
   canvas is the mask the score is measured against — so the thing on screen
   and the thing being scored are the same pixels by construction. A first cut
   drew the guide as DOM text and re-rendered it for scoring; the two never
   quite agreed, and a fair trace of an alif scored 45%.

   Scoring compares the tracing to the letter on a coarse grid — how much of
   the letter got covered, and how much of the tracing landed outside it.
   Coarse on purpose: this should reward a recognisable attempt, not punish a
   wobble.

   It never claims the stroke ORDER was right, because it cannot see order.
   The lesson text teaches that; this teaches the shape. */
const copy = {
  heading: { te: "అక్షరాన్ని రాయండి", en: "Write the letter" },
  hint: {
    te: "వేలితో (లేదా మౌస్‌తో) అక్షరం పైన గీయండి, తర్వాత సరిచూడండి.",
    en: "Trace over the letter with a finger or the mouse, then check it.",
  },
  check: { te: "సరిచూడండి", en: "Check" },
  clear: { te: "చెరిపేయండి", en: "Clear" },
  best: { te: "అత్యుత్తమం", en: "Best" },
  tryAgain: { te: "మళ్ళీ ప్రయత్నించండి — అక్షరం మీద ఉండేలా గీయండి.", en: "Try again — keep the line on the letter." },
  good: { te: "బాగుంది!", en: "Good!" },
  great: { te: "చాలా బాగుంది!", en: "Excellent!" },
  empty: { te: "ముందు అక్షరం పైన గీయండి.", en: "Draw over the letter first." },
} as const;

const STORE = "ifp-trace-v1";

const readBest = (id: string): number | null => {
  try {
    const raw = localStorage.getItem(STORE);
    const v = raw ? JSON.parse(raw)[id] : null;
    return typeof v === "number" ? v : null;
  } catch {
    return null;
  }
};

const writeBest = (id: string, score: number) => {
  try {
    const raw = localStorage.getItem(STORE);
    const all = raw ? JSON.parse(raw) : {};
    if (typeof all[id] !== "number" || score > all[id]) {
      all[id] = score;
      localStorage.setItem(STORE, JSON.stringify(all));
    }
  } catch {
    /* Storage blocked: the score still shows for this attempt. */
  }
};

/* Cell size for the comparison grid, in canvas pixels. Big enough that a
   shaky line still lands in the same cell as the letter it is following. */
const CELL = 8;

function maskOf(data: Uint8ClampedArray, w: number, h: number): Set<number> {
  const cols = Math.ceil(w / CELL);
  const cells = new Set<number>();
  for (let y = 0; y < h; y += 2) {
    for (let x = 0; x < w; x += 2) {
      if (data[(y * w + x) * 4 + 3] > 40) cells.add(Math.floor(y / CELL) * cols + Math.floor(x / CELL));
    }
  }
  return cells;
}

export function LetterTracer({
  id,
  glyph,
  fontClass = "font-arabic",
  lang: glyphLang = "ar",
}: {
  id: string;
  glyph: string;
  fontClass?: string;
  lang?: string;
}) {
  const { lang } = useI18n();
  const inkRef = useRef<HTMLCanvasElement>(null);
  const ghostRef = useRef<HTMLCanvasElement>(null);
  const fontRef = useRef<HTMLSpanElement>(null);
  const drawing = useRef(false);
  const drew = useRef(false);
  const [best, setBest] = useState<number | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    setBest(readBest(id));
    setScore(null);
    setMsg(null);
    drew.current = false;
    const c = inkRef.current;
    const ctx = c?.getContext("2d");
    if (c && ctx) ctx.clearRect(0, 0, c.width, c.height);
  }, [id]);

  /* Both canvases are sized from the same box at the same pixel ratio, and
     the letter is painted into the lower one. Redrawing it here rather than
     once at mount also covers the web font arriving late: the ResizeObserver
     fires on the reflow it causes, and the guide is repainted in the real
     face rather than the fallback the first frame used. */
  const size = useCallback(() => {
    const ink = inkRef.current;
    const ghost = ghostRef.current;
    if (!ink || !ghost) return;
    const r = ink.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(r.width * dpr);
    const h = Math.round(r.height * dpr);
    for (const c of [ink, ghost]) {
      if (c.width !== w || c.height !== h) {
        c.width = w;
        c.height = h;
      }
    }
    const ctx = ghost.getContext("2d");
    const family = fontRef.current ? getComputedStyle(fontRef.current).fontFamily : "serif";
    if (!ctx) return;
    ctx.clearRect(0, 0, w, h);
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "rgba(200, 146, 42, 0.3)";

    /* Fit and centre on the letter's INK, not on its font metrics. Arabic
       faces carry tall ascenders and deep descenders that most letters never
       use, so a size picked from the em box left an alif clipped off the top
       of the frame while a ba floated in the middle of it. measureText's
       actual bounding box is where the letter really is. */
    const probe = 100;
    ctx.font = `${probe}px ${family}`;
    const m = ctx.measureText(glyph);
    const inkH = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent;
    const inkW = m.actualBoundingBoxLeft + m.actualBoundingBoxRight;
    if (!(inkH > 0) || !(inkW > 0)) {
      /* No metrics (an exotic engine): fall back to a plain centred draw. */
      ctx.textBaseline = "middle";
      ctx.font = `${Math.round(h * 0.5)}px ${family}`;
      ctx.fillText(glyph, w / 2, h / 2);
      return;
    }
    const scale = Math.min((h * 0.72) / inkH, (w * 0.8) / inkW);
    ctx.font = `${Math.round(probe * scale)}px ${family}`;
    const f = ctx.measureText(glyph);
    const x = w / 2 + (f.actualBoundingBoxLeft - f.actualBoundingBoxRight) / 2;
    const y = h / 2 + (f.actualBoundingBoxAscent - f.actualBoundingBoxDescent) / 2;
    ctx.fillText(glyph, x, y);
  }, [glyph]);

  useEffect(() => {
    size();
    const ro = new ResizeObserver(size);
    if (inkRef.current) ro.observe(inkRef.current);
    /* Fonts arrive after first paint; repaint the guide when they do. */
    document.fonts?.ready?.then(size).catch(() => {});
    return () => ro.disconnect();
  }, [size]);

  const point = (e: React.PointerEvent) => {
    const c = inkRef.current!;
    const r = c.getBoundingClientRect();
    return {
      x: ((e.clientX - r.left) / r.width) * c.width,
      y: ((e.clientY - r.top) / r.height) * c.height,
    };
  };

  const start = (e: React.PointerEvent) => {
    const c = inkRef.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    drawing.current = true;
    drew.current = true;
    c.setPointerCapture(e.pointerId);
    const p = point(e);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineWidth = Math.max(10, c.width * 0.035);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#0d3b1e";
    /* A dot, so a tap leaves a mark like a pen would. */
    ctx.lineTo(p.x + 0.1, p.y);
    ctx.stroke();
  };

  const move = (e: React.PointerEvent) => {
    if (!drawing.current) return;
    const ctx = inkRef.current?.getContext("2d");
    if (!ctx) return;
    const p = point(e);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  };

  const end = () => {
    drawing.current = false;
  };

  const clear = () => {
    const c = inkRef.current;
    const ctx = c?.getContext("2d");
    if (c && ctx) ctx.clearRect(0, 0, c.width, c.height);
    drew.current = false;
    setScore(null);
    setMsg(null);
  };

  const check = () => {
    const c = inkRef.current;
    const ctx = c?.getContext("2d");
    const ghost = ghostRef.current;
    if (!c || !ctx || !ghost) return;
    if (!drew.current) {
      setMsg(copy.empty[lang]);
      return;
    }

    /* The guide canvas is the mask: identical pixels, no re-derivation. */
    const gctx = ghost.getContext("2d");
    if (!gctx) return;
    const glyphCells = maskOf(gctx.getImageData(0, 0, ghost.width, ghost.height).data, ghost.width, ghost.height);
    const inkCells = maskOf(ctx.getImageData(0, 0, c.width, c.height).data, c.width, c.height);
    if (!glyphCells.size || !inkCells.size) {
      setMsg(copy.empty[lang]);
      return;
    }

    let hit = 0;
    for (const cell of inkCells) if (glyphCells.has(cell)) hit++;
    let covered = 0;
    for (const cell of glyphCells) if (inkCells.has(cell)) covered++;

    const coverage = covered / glyphCells.size;
    const precision = hit / inkCells.size;
    /* Coverage matters more than neatness: a complete letter drawn thickly
       should beat a tidy fragment. */
    const pct = Math.round(Math.max(0, Math.min(1, coverage * 0.7 + precision * 0.3)) * 100);
    setScore(pct);
    setMsg(pct >= 80 ? copy.great[lang] : pct >= 55 ? copy.good[lang] : copy.tryAgain[lang]);
    buzz(pct >= 55 ? 12 : [10, 40, 10]);
    if (pct >= 80) celebrate();
    if (pct >= 55) {
      writeBest(id, pct);
      setBest((b) => (b === null || pct > b ? pct : b));
    }
  };

  return (
    <div className="rounded-2xl border border-[var(--if-gold)]/20 bg-white p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="inline-flex items-center gap-2 font-display text-base font-bold text-[var(--if-green)]">
          <PenLine aria-hidden="true" className="h-4 w-4 text-[var(--if-gold-ink)]" />
          {copy.heading[lang]}
        </p>
        {best !== null && (
          <p className="text-sm font-semibold text-[var(--if-gold-ink)] tabular-nums">
            {copy.best[lang]}: {best}%
          </p>
        )}
      </div>

      <div className="relative mt-3 aspect-[4/3] w-full overflow-hidden rounded-xl border border-dashed border-[var(--if-gold)]/40 bg-[var(--if-cream-light)]">
        {/* Off-screen, and only so the canvas can ask what the letter font
            actually resolves to on this page. */}
        <span
          ref={fontRef}
          aria-hidden="true"
          className={`pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0 ${fontClass}`}
        />
        {/* The letter to follow, and the mask the tracing is scored against. */}
        <canvas ref={ghostRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
        <span className="sr-only" lang={glyphLang}>
          {glyph}
        </span>
        <canvas
          ref={inkRef}
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerCancel={end}
          className="absolute inset-0 h-full w-full touch-none"
          aria-label={copy.heading[lang]}
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={check}
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--if-green)] px-5 text-sm font-bold text-[var(--if-gold-light)] transition-colors hover:bg-[var(--if-green-mid)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]"
        >
          <Check aria-hidden="true" className="h-4 w-4" />
          {copy.check[lang]}
        </button>
        <button
          type="button"
          onClick={clear}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--if-gold)]/40 bg-white px-4 text-sm font-bold text-[var(--if-green)] transition-colors hover:border-[var(--if-gold)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]"
        >
          <Eraser aria-hidden="true" className="h-4 w-4" />
          {copy.clear[lang]}
        </button>
        <p className="min-w-0 flex-1 text-sm text-[var(--if-text-muted)] text-pretty" aria-live="polite">
          {msg ? (
            <>
              {score !== null && (
                <span className="font-bold tabular-nums text-[var(--if-green)]">{score}% · </span>
              )}
              {msg}
            </>
          ) : (
            copy.hint[lang]
          )}
        </p>
      </div>
    </div>
  );
}
