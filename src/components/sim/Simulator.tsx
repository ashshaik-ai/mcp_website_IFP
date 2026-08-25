"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ComponentType } from "react";
import { ChevronLeft, ChevronRight, Gamepad2, Pause, Play, RotateCcw, Volume2 } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { buzz } from "@/lib/haptics";
import { celebrate } from "@/lib/celebrate";

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

/* A scene that holds its own state between steps — the 3D rig eases every
   joint from one posture into the next — marks itself continuous. The engine
   then leaves it mounted instead of cutting to a fresh copy each step.

   The drawn SVG scenes are the opposite case: each posture is its own set of
   shapes and the cut between them is the transition, so they stay keyed. */
export type SceneComponent = ComponentType<SceneProps> & { continuous?: boolean };

const copy = {
  play: { te: "ప్లే", en: "Play" },
  pause: { te: "పాజ్", en: "Pause" },
  prev: { te: "మునుపటి దశ", en: "Previous step" },
  next: { te: "తదుపరి దశ", en: "Next step" },
  restart: { te: "మళ్ళీ", en: "Restart" },
  step: { te: "దశ", en: "Step" },
  of: { te: "/", en: "of" },
  times: { te: "సార్లు", en: "times" },
  practice: { te: "ప్రాక్టీస్", en: "Practice" },
  watch: { te: "చూడటం", en: "Watch" },
  whatNext: { te: "తర్వాత ఏ దశ వస్తుంది?", en: "What comes next?" },
  right: { te: "సరైనది!", en: "Right!" },
  wrong: { te: "కాదు — సరైనది:", en: "Not this one — the answer:" },
  done: { te: "పూర్తయింది", en: "Done" },
  score: { te: "స్కోరు", en: "Score" },
  best: { te: "అత్యుత్తమం", en: "Best" },
  again: { te: "మళ్ళీ ఆడండి", en: "Play again" },
  timeline: { te: "కాలరేఖ", en: "Timeline" },
  listen: { te: "అరబీ వినండి", en: "Hear the Arabic" },
  noVoice: {
    te: "ఈ పరికరంలో అరబీ స్వరం లేదు — కింది ఉచ్చారణ చూడండి.",
    en: "No Arabic voice on this device — use the transliteration below.",
  },
} as const;

/* The words themselves, out loud. Every persona who reached an Arabic phrase
   asked how it sounds; the browser's own speech synthesis answers with no
   audio files to record or ship. Quality varies by device voice, which is
   still far better than silence for a first-time reader.

   Having a speech engine is not the same as having an Arabic voice, and a
   device without one plays nothing at all — a button that looks alive and
   does nothing. So this reports whether it actually spoke, and the caller
   says so when it did not. */
function speakArabic(text: string): boolean {
  try {
    const voices = speechSynthesis.getVoices();
    if (voices.length && !voices.some((v) => v.lang?.toLowerCase().startsWith("ar"))) return false;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ar-SA";
    u.rate = 0.8;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
    return true;
  } catch {
    return false;
  }
}

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

/* Practice mode: the sequence as a game.

   Watching a rite step through is one kind of learning; being asked, at each
   step, what comes next is another, and it is the one that sticks. Every
   platform this site was benchmarked against gamifies its sequences somewhere
   — Khan's energy points, Duolingo's whole model — and this gets the same
   effect from content the simulators already carry, with nothing new authored:
   the scene shows the current step, and the learner picks the following one
   from three choices. The best run is remembered per sequence.

   Only offered when a sequence has at least four steps; below that there is
   nothing to guess. */
const PRACTICE_KEY = "ifp-practice-v1";

function readBest(id: string): number | null {
  try {
    const raw = localStorage.getItem(PRACTICE_KEY);
    const v = raw ? JSON.parse(raw)[id] : null;
    return typeof v === "number" ? v : null;
  } catch {
    return null;
  }
}

function writeBest(id: string, score: number) {
  try {
    const raw = localStorage.getItem(PRACTICE_KEY);
    const all = raw ? JSON.parse(raw) : {};
    if (typeof all[id] !== "number" || score > all[id]) {
      all[id] = score;
      localStorage.setItem(PRACTICE_KEY, JSON.stringify(all));
    }
  } catch {
    /* Storage blocked: the run still counts on screen. */
  }
}

function pickOptions(steps: SimStep[], at: number): number[] {
  const answer = at + 1;
  const decoys: number[] = [];
  const pool = steps.map((_, i) => i).filter((i) => i !== answer && i !== at);
  while (decoys.length < 2 && pool.length) {
    const j = Math.floor(Math.random() * pool.length);
    decoys.push(pool.splice(j, 1)[0]);
  }
  const opts = [answer, ...decoys];
  for (let i = opts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [opts[i], opts[j]] = [opts[j], opts[i]];
  }
  return opts;
}

function Practice({
  steps,
  seqId,
  index,
  onIndex,
  lang,
}: {
  steps: SimStep[];
  seqId: string;
  index: number;
  onIndex: (i: number) => void;
  lang: "te" | "en";
}) {
  const [options, setOptions] = useState<number[]>(() => pickOptions(steps, 0));
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [best, setBest] = useState<number | null>(null);
  const promptRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    setBest(readBest(seqId));
  }, [seqId]);

  /* On entry the panel opened below the fold on phones — the game started
     off-screen — and on every advance focus fell out of it. */
  useEffect(() => {
    const el = promptRef.current;
    if (!el) return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
  }, []);

  useEffect(() => {
    if (index > 0) promptRef.current?.focus({ preventScroll: true });
  }, [index]);

  const total = steps.length - 1;

  const restart = () => {
    onIndex(0);
    setOptions(pickOptions(steps, 0));
    setPicked(null);
    setScore(0);
    setFinished(false);
  };

  const answer = index + 1;

  const choose = (i: number) => {
    if (picked !== null) return;
    buzz(i === answer ? 12 : [10, 40, 10]);
    setPicked(i);
    const nextScore = i === answer ? score + 1 : score;
    if (i === answer) setScore(nextScore);
    /* A wrong pick holds twice as long: the correction line has to be read,
       and one persona reported it vanishing before it could be. */
    window.setTimeout(() => {
      if (answer >= steps.length - 1) {
        setFinished(true);
        if (nextScore === steps.length - 1) celebrate();
        writeBest(seqId, nextScore);
        setBest((b) => (b === null || nextScore > b ? nextScore : b));
        onIndex(steps.length - 1);
      } else {
        onIndex(answer);
        setOptions(pickOptions(steps, answer));
        setPicked(null);
      }
    }, i === answer ? 1100 : 2300);
  };

  if (finished) {
    return (
      <div className="mt-3 rounded-2xl border border-[var(--if-gold)]/20 bg-white p-5 text-center">
        <p className="text-xs font-bold uppercase text-[var(--if-gold-ink)]">{copy.done[lang]}</p>
        <p className="mt-1 font-display text-3xl font-bold text-[var(--if-green)] tabular-nums">
          {score} / {total}
        </p>
        {best !== null && (
          <p className="mt-1 text-sm text-[var(--if-text-muted)] tabular-nums">
            {copy.best[lang]}: {best} / {total}
          </p>
        )}
        <button
          type="button"
          onClick={restart}
          className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--if-green)] px-5 text-sm font-bold text-[var(--if-gold-light)]"
        >
          <RotateCcw aria-hidden="true" className="h-4 w-4" />
          {copy.again[lang]}
        </button>
      </div>
    );
  }

  return (
    <div className="mt-3 rounded-2xl border border-[var(--if-gold)]/20 bg-white p-5">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <p
          ref={promptRef}
          id={`if-practice-q-${seqId}`}
          tabIndex={-1}
          className="font-semibold text-[var(--if-text)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--if-gold)]"
        >
          {copy.whatNext[lang]}
        </p>
        {/* The best run shows from the first question — a returning learner
            used to see no trace of their record until they finished again. */}
        <p className="text-sm font-semibold text-[var(--if-gold-ink)] tabular-nums" aria-live="polite">
          {copy.score[lang]} {score} / {total}
          {best !== null && (
            <span className="ml-2 font-medium text-[var(--if-text-muted)]">
              · {copy.best[lang]} {best} / {total}
            </span>
          )}
        </p>
      </div>
      {/* Keyed by question: reused buttons animated their colour from the
          previous verdict, so a red flash bled into the next question. The
          remount also dropped focus to <body>, which made the game
          unplayable by keyboard, so the prompt takes focus each round. */}
      <div key={index} role="group" aria-labelledby={`if-practice-q-${seqId}`} className="grid gap-2 sm:grid-cols-3">
        {options.map((opt) => {
          const isPick = picked === opt;
          const isAnswer = opt === answer;
          const tone =
            picked === null
              ? "border-[var(--if-gold)]/25 bg-white hover:border-[var(--if-gold)]/60"
              : isAnswer
                ? "border-emerald-400 bg-emerald-50"
                : isPick
                  ? "border-red-300 bg-red-50"
                  : "border-[var(--if-gold)]/20 bg-white opacity-60";
          return (
            <button
              key={opt}
              type="button"
              aria-pressed={isPick}
              onClick={() => choose(opt)}
              className={`min-h-11 rounded-xl border px-3 text-sm font-semibold text-[var(--if-green)] transition-colors ${tone}`}
            >
              {steps[opt]?.label[lang]}
            </button>
          );
        })}
      </div>
      <p className="mt-2 min-h-5 text-sm font-semibold" aria-live="polite">
        {picked !== null &&
          (picked === answer ? (
            <span className="text-emerald-700">{copy.right[lang]}</span>
          ) : (
            <span className="text-[var(--if-gold-ink)]">
              {copy.wrong[lang]} {steps[answer]?.label[lang]}
            </span>
          ))}
      </p>
    </div>
  );
}

export function Simulator({
  steps,
  scene: Scene,
  autoplay = false,
  className = "",
}: {
  steps: SimStep[];
  scene: SceneComponent;
  autoplay?: boolean;
  className?: string;
}) {
  const continuous = Scene.continuous === true;
  const { lang } = useI18n();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [practice, setPractice] = useState(false);
  /* Keyed by every step id, not just the first and the count: the Arabic and
     Urdu alphabets both open on alif and both run twelve steps, so they shared
     one record and a first run at Urdu greeted the learner with a best score
     from a different portal. */
  const seqId = useMemo(() => {
    let h = 2166136261;
    for (const s of steps) {
      for (let i = 0; i < s.id.length; i++) {
        h ^= s.id.charCodeAt(i);
        h = Math.imul(h, 16777619);
      }
      h ^= 0x2f;
      h = Math.imul(h, 16777619);
    }
    return `${steps[0]?.id ?? "seq"}-${steps.length}-${(h >>> 0).toString(36)}`;
  }, [steps]);
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

  /* Clamped, not wrapped: previous from step 1 used to jump to the last step,
     which read as a glitch, not a feature. Restart is the play button's job. */
  const go = useCallback(
    (i: number) => setIndex(Math.max(0, Math.min(steps.length - 1, i))),
    [steps.length],
  );

  /* Speech synthesis exists nearly everywhere, but the button only appears
     once a mounted client confirms it — never a dead control. */
  const [canSpeak, setCanSpeak] = useState(false);
  const [spoke, setSpoke] = useState<"idle" | "ok" | "none">("idle");
  useEffect(() => {
    setCanSpeak(typeof window !== "undefined" && "speechSynthesis" in window);
  }, []);

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

  /* A horizontal swipe on the stage steps the sequence — the gesture every
     phone user tries first. Vertical movement passes through to the page. */
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    /* A scene that orbits under the finger owns the horizontal axis. On the
       3D salah figure a drag to turn the camera was read as a swipe as well,
       so studying a posture skipped to the next one. */
    if ((e.target as HTMLElement)?.closest?.("canvas")) {
      swipe.current = null;
      return;
    }
    swipe.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const s0 = swipe.current;
    swipe.current = null;
    if (!s0 || practice) return;
    const dx = e.changedTouches[0].clientX - s0.x;
    const dy = e.changedTouches[0].clientY - s0.y;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      setPlaying(false);
      go(index + (dx < 0 ? 1 : -1));
    }
  };

  const onKey = (e: React.KeyboardEvent) => {
    /* In practice mode the stage is the question — stepping it with arrows
       desynced the scene from the graded answer (two audit personas made the
       correct choice vanish from its own options this way). */
    if (practice) return;
    if (e.key === "ArrowRight") { e.preventDefault(); setPlaying(false); go(index + 1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); setPlaying(false); go(index - 1); }
    else if (e.key === " ") { e.preventDefault(); setPlaying((p) => !p); }
  };

  const atEnd = index === steps.length - 1;

  /* Where each step starts on the timeline, and the whole run's length. */
  const bounds = useMemo(() => {
    const out: number[] = [];
    let t = 0;
    for (const st of steps) {
      out.push(t);
      t += st.dur ?? DEFAULT_DUR;
    }
    return out;
  }, [steps]);
  const totalMs = useMemo(
    () => steps.reduce((n, st) => n + (st.dur ?? DEFAULT_DUR), 0),
    [steps],
  );
  const startFrac = bounds[index] / totalMs;
  const endFrac = (bounds[index] + dur) / totalMs;

  /* The step we are leaving, held just long enough to fade it out under the
     one arriving. */
  const [prev, setPrev] = useState<number | null>(null);
  const lastIndex = useRef(index);
  useEffect(() => {
    if (lastIndex.current === index) return;
    const leaving = lastIndex.current;
    lastIndex.current = index;
    if (continuous) return;
    setPrev(leaving);
    const t = window.setTimeout(() => setPrev(null), 560);
    return () => window.clearTimeout(t);
  }, [index, continuous]);

  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  /* The playhead. One rAF while playing, writing a transform on the node —
     no state, so nothing re-renders at frame rate. */
  useEffect(() => {
    const fill = fillRef.current;
    if (!fill) return;
    if (!playing) {
      fill.style.transform = `scaleX(${endFrac})`;
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const k = Math.min(1, (now - t0) / dur);
      fill.style.transform = `scaleX(${startFrac + (endFrac - startFrac) * k})`;
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, index, dur, startFrac, endFrac]);

  /* Press anywhere on the track to jump to the step that owns that moment. */
  const seek = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const at = ((e.clientX - r.left) / r.width) * totalMs;
    let target = 0;
    for (let i = 0; i < bounds.length; i++) if (at >= bounds[i]) target = i;
    setPlaying(false);
    setIndex(target);
  };

  return (
    /* min-w-0: the transport row is intrinsically wide with thirteen step
       dots in it, and a grid or flex parent sizes its items to that unless
       told otherwise — which pushed the whole simulator 66px past a 768px
       viewport on the one portal that stacks three of them in a grid. */
    <div className={`if-sim min-w-0 ${className}`}>
      {/* Stage */}
      <div
        ref={stageRef}
        role="group"
        aria-roledescription="simulator"
        aria-label={step.label[lang]}
        tabIndex={0}
        onKeyDown={onKey}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
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
          {/* A continuous scene stays mounted and tweens; remounting it threw
              away the three.js rig and rebuilt renderer, lights and geometry
              on every step, which is what made a single flowing prayer read as
              a stack of cards. */}
          {continuous ? (
            <div className="absolute inset-0">
              <Scene step={step} index={index} playing={playing} lang={lang} />
            </div>
          ) : (
            <>
              {/* The outgoing drawing stays underneath while the new one
                  arrives. It used to be removed the instant the step changed
                  and the replacement faded up from nothing, so every step
                  flashed the empty stage — which is what made a sequence read
                  as cards being dealt rather than one thing moving. */}
              {prev !== null && prev !== index && (
                <div key={`out-${prev}`} className="if-sim-out absolute inset-0">
                  <Scene step={steps[prev]} index={prev} playing={false} lang={lang} />
                </div>
              )}
              <div key={index} className="if-sim-cut absolute inset-0">
                <Scene step={step} index={index} playing={playing} lang={lang} />
              </div>
            </>
          )}
        </div>

        {/* Caption strip: the least text that still tells you what you are
            looking at. The step's number is set as a plate on the left, so the
            strip has a fixed anchor and the title always starts in the same
            place however long the previous one was. */}
        {/* aria-live: the picture changing is the whole point of the control,
            and a screen-reader user was told nothing when it did. The caption
            carries the step name, so announcing it announces the change. */}
        <div
          key={`cap-${index}`}
          aria-live="polite"
          aria-atomic="true"
          className="if-sim-cap-in relative flex flex-wrap items-end gap-x-3 gap-y-1 sm:gap-x-4 border-t border-[var(--if-gold)]/20 bg-[#061c0d]/55 px-4 sm:px-6 pb-4 pt-3"
        >
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
            <div className="flex min-w-0 basis-full items-center justify-end gap-2 sm:basis-auto sm:max-w-[50%]">
              {step.arabic && canSpeak && (
                <button
                  type="button"
                  onClick={() => setSpoke(speakArabic(step.arabic!) ? "ok" : "none")}
                  aria-label={copy.listen[lang]}
                  title={copy.listen[lang]}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[var(--if-gold)]/70 transition-colors hover:bg-white/10 hover:text-[var(--if-gold-light)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]"
                >
                  <Volume2 aria-hidden="true" className="h-4 w-4" />
                </button>
              )}
              <div className="min-w-0 text-right">
                {step.arabic && (
                  <p lang="ar" dir="rtl" className="font-arabic text-xl sm:text-2xl text-[var(--if-gold-light)] leading-relaxed">
                    {step.arabic}
                  </p>
                )}
                {step.translit && (
                  <p className="text-[11px] sm:text-xs text-[var(--if-gold-pale)]/75 italic text-pretty">{step.translit}</p>
                )}
                {/* A tap that produces no sound needs to say why. */}
                {spoke === "none" && (
                  <p className="text-[11px] text-[var(--if-gold-pale)]/70 text-pretty" role="status">
                    {copy.noVoice[lang]}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* One timeline for the whole sequence rather than a bar that reset
            at every step, with a tick where each step begins. Seekable: press
            anywhere on it to jump. The fill is written straight to the node
            each frame, so a moving playhead costs no React renders. */}
        <div
          ref={trackRef}
          role="slider"
          tabIndex={0}
          aria-label={copy.timeline[lang]}
          aria-valuemin={1}
          aria-valuemax={steps.length}
          aria-valuenow={index + 1}
          aria-valuetext={step.label[lang]}
          onPointerDown={seek}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") { e.preventDefault(); setPlaying(false); go(index + 1); }
            else if (e.key === "ArrowLeft") { e.preventDefault(); setPlaying(false); go(index - 1); }
          }}
          className="absolute left-0 right-0 bottom-0 h-2.5 cursor-pointer bg-black/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]"
        >
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1">
            <div
              ref={fillRef}
              className="h-full origin-left bg-[var(--if-gold)] will-change-transform"
              style={{ transform: `scaleX(${startFrac})` }}
            />
            {steps.slice(1).map((st, i) => (
              <span
                key={st.id}
                aria-hidden="true"
                className="absolute top-0 h-full w-px bg-white/25"
                style={{ left: `${(bounds[i + 1] / totalMs) * 100}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Transport. Hidden entirely for a one-step scene — a 1/1 stepper with
          inert arrows told one audit persona the control was broken. pr-14 on
          phones keeps the right end clear of the fixed WhatsApp button, which
          sat exactly on the Practice toggle at 390px. */}
      {steps.length > 1 && (
      <div className="mt-3 flex items-center gap-2 pr-14 sm:pr-0">
        <button
          type="button"
          onClick={() => { setPlaying(false); go(index - 1); }}
          aria-label={copy.prev[lang]}
          disabled={index === 0 || practice}
          className="if-sim-btn disabled:opacity-35"
        >
          <ChevronLeft aria-hidden="true" className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => { if (atEnd && !playing) { setIndex(0); setPlaying(true); } else setPlaying((p) => !p); }}
          aria-label={playing ? copy.pause[lang] : atEnd ? copy.restart[lang] : copy.play[lang]}
          disabled={practice}
          className="if-sim-btn if-sim-btn-primary disabled:opacity-35"
        >
          {playing ? <Pause aria-hidden="true" className="h-5 w-5" /> : atEnd ? <RotateCcw aria-hidden="true" className="h-5 w-5" /> : <Play aria-hidden="true" className="h-5 w-5 translate-x-px" />}
        </button>
        <button
          type="button"
          onClick={() => { setPlaying(false); go(index + 1); }}
          aria-label={copy.next[lang]}
          disabled={atEnd || practice}
          className="if-sim-btn disabled:opacity-35"
        >
          <ChevronRight aria-hidden="true" className="h-5 w-5" />
        </button>

        {/* Step dots double as a scrubber. Below sm thirteen of them fall under
            the 24px target floor, so phones get prev/next and the counter. */}
        {/* min-w-11 on each dot holds the tap-target floor, so a thirteen-step
            sequence needs more room than the row has: it scrolls, with the
            same faded end the portal tab strips use. */}
        <ol className="if-tabstrip ml-2 hidden sm:flex min-w-0 flex-1 items-center gap-1 overflow-x-auto" aria-label={`${copy.step[lang]} ${index + 1} ${copy.of[lang]} ${steps.length}`}>
          {steps.map((s, i) => (
            <li key={s.id} className="flex-1">
              <button
                type="button"
                onClick={() => { setPlaying(false); setIndex(i); }}
                aria-label={`${copy.step[lang]} ${i + 1}: ${s.label[lang]}`}
                aria-current={i === index ? "step" : undefined}
                disabled={practice}
                className="block w-full min-w-11 min-h-11 py-4 group disabled:opacity-40"
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
        {steps.length >= 4 && (
          <button
            type="button"
            onClick={() => {
              setPlaying(false);
              setIndex(0);
              setPractice((v) => !v);
            }}
            aria-pressed={practice}
            className={`inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-xs font-bold transition-colors ${
              practice
                ? "border-transparent bg-[var(--if-green)] text-[var(--if-gold-light)]"
                : "border-[var(--if-gold)]/40 bg-white text-[var(--if-green)] hover:border-[var(--if-gold)]"
            }`}
          >
            <Gamepad2 aria-hidden="true" className="h-4 w-4" />
            {practice ? copy.watch[lang] : copy.practice[lang]}
          </button>
        )}
      </div>
      )}

      {practice && steps.length >= 4 && (
        <Practice steps={steps} seqId={seqId} index={index} onIndex={(i) => { setPlaying(false); setIndex(i); }} lang={lang} />
      )}
    </div>
  );
}
