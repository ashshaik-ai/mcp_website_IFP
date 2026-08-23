"use client";

import { useCallback, useEffect, useRef, useState, type ComponentType } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

/* The simulator engine.

   One stage, one strip of steps, one scene. The scene is an SVG component
   that receives the current step and draws it; the engine owns time — play,
   pause, step, auto-advance — and the thin caption under the picture. Text is
   deliberately minimal: a name, the Arabic, one line of transliteration. The
   lesson pages carry the explanation; this is the part you watch.

   Every scene animates with CSS transitions and keyframes only — transform,
   opacity, stroke-dashoffset — so a step change is a handful of compositor
   updates, and prefers-reduced-motion collapses everything to a cut. */

export type Bi = { te: string; en: string };

export type SimStep = {
  id: string;
  label: Bi;
  arabic?: string;
  translit?: string;
  caption?: Bi;
  /** Repetitions shown as a pill, e.g. 3 for "wash three times". */
  count?: number;
  /** Milliseconds this step holds when playing. */
  dur?: number;
  /** Scene-only data the caption never shows. */
  meta?: string;
};

export type SceneProps = {
  step: SimStep;
  index: number;
  playing: boolean;
  lang: "te" | "en";
};

const copy = {
  play: { te: "ప్లే", en: "Play" },
  pause: { te: "పాజ్", en: "Pause" },
  prev: { te: "మునుపటి దశ", en: "Previous step" },
  next: { te: "తదుపరి దశ", en: "Next step" },
  restart: { te: "మళ్ళీ", en: "Restart" },
  step: { te: "దశ", en: "Step" },
  of: { te: "/", en: "of" },
  times: { te: "సార్లు", en: "times" },
} as const;

const DEFAULT_DUR = 3200;

/* Four hairline corners. Cheaper than a full border and it reads as a frame
   the scene is held in rather than a box drawn around it. */
function CornerTicks() {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="pointer-events-none absolute inset-3 sm:inset-4 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] sm:h-[calc(100%-2rem)] sm:w-[calc(100%-2rem)]"
    >
      <g fill="none" stroke="var(--if-gold)" strokeOpacity="0.3" strokeWidth="0.5" vectorEffect="non-scaling-stroke">
        <path d="M0 6 V0 H6" />
        <path d="M94 0 H100 V6" />
        <path d="M100 94 V100 H94" />
        <path d="M6 100 H0 V94" />
      </g>
    </svg>
  );
}

export function Simulator({
  steps,
  scene: Scene,
  autoplay = false,
  className = "",
}: {
  steps: SimStep[];
  scene: ComponentType<SceneProps>;
  autoplay?: boolean;
  className?: string;
}) {
  const { lang } = useI18n();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const reduced = useRef(false);
  const timer = useRef<number | null>(null);
  const step = steps[index];
  const dur = step.dur ?? DEFAULT_DUR;

  /* Autoplay only for people who have not asked for less motion, and only
     once the stage is actually on screen — a simulator playing to itself
     three screens down is noise. */
  const stageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    reduced.current = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    if (!autoplay || reduced.current || !stageRef.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setPlaying(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(stageRef.current);
    return () => io.disconnect();
  }, [autoplay]);

  const go = useCallback(
    (i: number) => setIndex(((i % steps.length) + steps.length) % steps.length),
    [steps.length],
  );

  useEffect(() => {
    if (!playing) return;
    timer.current = window.setTimeout(() => {
      if (index === steps.length - 1) setPlaying(false);
      else setIndex(index + 1);
    }, dur);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [playing, index, dur, steps.length]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); setPlaying(false); go(index + 1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); setPlaying(false); go(index - 1); }
    else if (e.key === " ") { e.preventDefault(); setPlaying((p) => !p); }
  };

  const atEnd = index === steps.length - 1;

  return (
    <div className={`if-sim ${className}`}>
      {/* Stage */}
      <div
        ref={stageRef}
        role="group"
        aria-roledescription="simulator"
        aria-label={step.label[lang]}
        tabIndex={0}
        onKeyDown={onKey}
        className="if-sim-stage relative overflow-hidden rounded-3xl ring-1 ring-[var(--if-gold)]/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]"
      >
        {/* The picture. Everything decorative is scoped to this box so none of
            it runs under the caption strip. Re-mounted per step, so a scene
            that changes little between two steps still arrives rather than
            swapping under you. */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <div className="if-sim-weave" aria-hidden="true" />
          <div key={`bloom-${index}`} className="if-sim-bloom" aria-hidden="true" />
          <div className="if-sim-dial w-[52%] aspect-square" aria-hidden="true" />
          <div className="if-sim-dial w-[78%] aspect-square" aria-hidden="true" />
          <CornerTicks />
          <div key={index} className="if-sim-cut absolute inset-0">
            <Scene step={step} index={index} playing={playing} lang={lang} />
          </div>
        </div>

        {/* Caption strip: the least text that still tells you what you are
            looking at. The step's number is set as a plate on the left, so the
            strip has a fixed anchor and the title always starts in the same
            place however long the previous one was. */}
        <div key={`cap-${index}`} className="if-sim-cap-in relative flex flex-wrap items-end gap-x-3 gap-y-1 sm:gap-x-4 border-t border-[var(--if-gold)]/20 bg-[#061c0d]/55 px-4 sm:px-6 pb-4 pt-3">
          <span
            aria-hidden="true"
            className="if-sim-num shrink-0 self-center select-none font-display text-xl sm:text-2xl font-bold leading-none text-[var(--if-gold)]/55"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0 flex-1 basis-40">
            <p className="font-display text-lg sm:text-xl font-bold text-[var(--if-gold-light)] leading-tight text-balance">
              {step.label[lang]}
              {step.count ? (
                <span className="ml-2 align-middle inline-flex items-center rounded-full bg-[var(--if-gold)]/20 border border-[var(--if-gold)]/40 px-2 py-0.5 text-xs font-semibold text-[var(--if-gold-light)] tabular-nums">
                  ×{step.count}
                </span>
              ) : null}
            </p>
            {step.caption && (
              <p className="mt-0.5 text-sm text-[var(--if-gold-pale)]/80 text-pretty">{step.caption[lang]}</p>
            )}
          </div>
          {(step.arabic || step.translit) && (
            <div className="min-w-0 basis-full text-right sm:basis-auto sm:max-w-[50%]">
              {step.arabic && (
                <p lang="ar" dir="rtl" className="font-arabic text-xl sm:text-2xl text-[var(--if-gold-light)] leading-relaxed">
                  {step.arabic}
                </p>
              )}
              {step.translit && (
                <p className="text-[11px] sm:text-xs text-[var(--if-gold-pale)]/75 italic text-pretty">{step.translit}</p>
              )}
            </div>
          )}
        </div>

        {/* Progress across the current step. Keyed so it restarts per step. */}
        <div className="absolute left-0 right-0 bottom-0 h-1 bg-white/10" aria-hidden="true">
          <div
            key={`${index}-${playing}`}
            className="if-sim-progress h-full bg-[var(--if-gold)]"
            style={{ animationDuration: `${dur}ms`, animationPlayState: playing ? "running" : "paused", width: playing ? undefined : `${((index + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Transport */}
      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={() => { setPlaying(false); go(index - 1); }}
          aria-label={copy.prev[lang]}
          className="if-sim-btn"
        >
          <ChevronLeft aria-hidden="true" className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => { if (atEnd && !playing) { setIndex(0); setPlaying(true); } else setPlaying((p) => !p); }}
          aria-label={playing ? copy.pause[lang] : atEnd ? copy.restart[lang] : copy.play[lang]}
          className="if-sim-btn if-sim-btn-primary"
        >
          {playing ? <Pause aria-hidden="true" className="h-5 w-5" /> : atEnd ? <RotateCcw aria-hidden="true" className="h-5 w-5" /> : <Play aria-hidden="true" className="h-5 w-5 translate-x-px" />}
        </button>
        <button
          type="button"
          onClick={() => { setPlaying(false); go(index + 1); }}
          aria-label={copy.next[lang]}
          className="if-sim-btn"
        >
          <ChevronRight aria-hidden="true" className="h-5 w-5" />
        </button>

        {/* Step dots double as a scrubber. Below sm thirteen of them fall under
            the 24px target floor, so phones get prev/next and the counter. */}
        <ol className="ml-2 hidden sm:flex flex-1 items-center gap-1" aria-label={`${copy.step[lang]} ${index + 1} ${copy.of[lang]} ${steps.length}`}>
          {steps.map((s, i) => (
            <li key={s.id} className="flex-1">
              <button
                type="button"
                onClick={() => { setPlaying(false); setIndex(i); }}
                aria-label={`${copy.step[lang]} ${i + 1}: ${s.label[lang]}`}
                aria-current={i === index ? "step" : undefined}
                className="block w-full min-h-11 py-4 group"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? "bg-[var(--if-gold)] scale-y-150" : i < index ? "bg-[var(--if-gold)]/55" : "bg-[var(--if-green)]/25 group-hover:bg-[var(--if-gold)]/40"
                  }`}
                />
              </button>
            </li>
          ))}
        </ol>
        <span className="ml-auto sm:ml-0 text-sm sm:text-xs font-semibold tabular-nums text-[var(--if-text-muted)] whitespace-nowrap">
          {index + 1} / {steps.length}
        </span>
      </div>
    </div>
  );
}
