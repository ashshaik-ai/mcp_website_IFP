"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ClipboardCheck, RotateCcw, X } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { buzz } from "@/lib/haptics";
import { celebrate } from "@/lib/celebrate";
import type { AssessmentQuestion } from "@/content/assessment-bank";
import { quizOrder } from "@/lib/quiz-order";

/* The bank inherits the site's `answer: 0` authoring convention, so without
   this the first option is always right — five audit personas passed 12/12
   without reading a question. Same seeded shuffle the lesson quizzes use. */
const shuffle = (qs: AssessmentQuestion[]): AssessmentQuestion[] =>
  qs.map((q) => {
    const { order, answer } = quizOrder(q.q.en, q.options.length, q.answer);
    return { ...q, options: order.map((i) => q.options[i]), answer };
  });

/* The end-of-portal assessment.

   Each lesson asked its own questions and the portal then stopped. Every
   platform this was benchmarked against closes a course with something that
   asks whether the whole thing landed — Coursera's graded quiz, edX's exam,
   Udemy's practice test — and answers it with a score you can act on.

   One question at a time, because a wall of twelve is a wall. The answer locks
   when you choose it, the way a graded quiz does, and what you get at the end
   is not just a number: every question you missed names the lesson it came
   from and links to it. That is the part that makes a score useful.

   The bank is loaded on demand. It is 82 KB of questions for the whole site
   and there is no reason for it to sit in the page of a reader who never opens
   the assessment. */
const PASS = 0.7;

const copy = {
  heading: { te: "చివరి పరీక్ష", en: "Final assessment" },
  blurb: {
    te: "ఈ పోర్టల్ మొత్తం నుండి ప్రశ్నలు. ఉత్తీర్ణతకు 70% కావాలి — ఎన్నిసార్లైనా ప్రయత్నించవచ్చు.",
    en: "Questions from across the whole portal. 70% to pass, and you can retake it as often as you like.",
  },
  questions: { te: "ప్రశ్నలు", en: "questions" },
  start: { te: "పరీక్ష మొదలుపెట్టండి", en: "Start the assessment" },
  retake: { te: "మళ్ళీ ప్రయత్నించండి", en: "Retake" },
  loading: { te: "లోడ్ అవుతోంది…", en: "Loading…" },
  question: { te: "ప్రశ్న", en: "Question" },
  of: { te: "/", en: "of" },
  next: { te: "తదుపరి", en: "Next" },
  finish: { te: "ముగించండి", en: "Finish" },
  yourScore: { te: "మీ స్కోరు", en: "Your score" },
  passed: { te: "ఉత్తీర్ణులయ్యారు", en: "Passed" },
  notYet: { te: "ఇంకా కాదు", en: "Not yet" },
  best: { te: "అత్యుత్తమ స్కోరు", en: "Best score" },
  review: { te: "తప్పిన ప్రశ్నలు", en: "What to look at again" },
  fromLesson: { te: "ఈ పాఠం నుండి", en: "From" },
  correctAnswer: { te: "సరైన సమాధానం", en: "Correct answer" },
  passNote: {
    te: "బాగుంది. ఈ పోర్టల్ మీకు అర్థమైంది.",
    en: "Well done — this portal has landed.",
  },
  failNote: {
    te: "కింద ఉన్న పాఠాలను ఒకసారి మళ్ళీ చూసి, తిరిగి ప్రయత్నించండి.",
    en: "Look at the lessons below once more, then try again.",
  },
} as const;

const BEST_KEY = "ifp-assessment-v1";

const readBest = (): Record<string, number> => {
  try {
    const raw = localStorage.getItem(BEST_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
};

export function PortalAssessment({ portal }: { portal: string }) {
  const { lang } = useI18n();
  const [bank, setBank] = useState<AssessmentQuestion[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [at, setAt] = useState(-1);
  const [picks, setPicks] = useState<(number | null)[]>([]);
  const [best, setBest] = useState<number | null>(null);
  const [count, setCount] = useState(0);

  /* Only the count is needed before anyone starts, and that is cheap enough to
     fetch up front so the panel can say how long this is. */
  useEffect(() => {
    let live = true;
    import("@/content/assessment-bank").then((m) => {
      if (live) setCount(m.assessmentFor(portal).length);
    });
    setBest(readBest()[portal] ?? null);
    return () => {
      live = false;
    };
  }, [portal]);

  const start = useCallback(async () => {
    setLoading(true);
    const m = await import("@/content/assessment-bank");
    const qs = shuffle(m.assessmentFor(portal));
    setBank(qs);
    setPicks(Array(qs.length).fill(null));
    setAt(0);
    setLoading(false);
  }, [portal]);

  if (!count) return null;

  const done = bank !== null && at >= bank.length;
  const score = bank ? picks.filter((p, i) => p === bank[i].answer).length : 0;
  const ratio = bank && bank.length ? score / bank.length : 0;

  if (done && bank) {
    const missed = bank.map((q, i) => ({ q, i })).filter(({ q, i }) => picks[i] !== q.answer);
    const passed = ratio >= PASS;
    return (
      <div className="rounded-2xl border border-[var(--if-gold)]/20 bg-white p-6">
        <p className="text-xs font-bold uppercase text-[var(--if-gold-ink)]">{copy.yourScore[lang]}</p>
        <p className="mt-1 flex items-baseline gap-3">
          <span className="font-display text-4xl font-bold text-[var(--if-green)] tabular-nums">
            {score}/{bank.length}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-bold ${
              passed ? "bg-[var(--if-green)] text-[var(--if-gold-light)]" : "bg-[var(--if-gold)]/15 text-[var(--if-gold-ink)]"
            }`}
          >
            {passed ? <Check aria-hidden="true" className="h-4 w-4" /> : <X aria-hidden="true" className="h-4 w-4" />}
            {passed ? copy.passed[lang] : copy.notYet[lang]}
          </span>
        </p>
        <p className="mt-2 text-sm text-[var(--if-text-muted)] text-pretty">
          {passed ? copy.passNote[lang] : copy.failNote[lang]}
        </p>

        {missed.length > 0 && (
          <div className="mt-6">
            <p className="mb-2 text-sm font-bold text-[var(--if-green)]">{copy.review[lang]}</p>
            <ul className="grid gap-2">
              {missed.map(({ q, i }) => (
                <li key={i} className="rounded-xl border border-[var(--if-gold)]/20 bg-[var(--if-cream-light)] p-3">
                  <p className="text-sm font-semibold text-[var(--if-text)] text-pretty">{q.q[lang]}</p>
                  <p className="mt-1 text-sm text-[var(--if-green)]">
                    <span className="text-[var(--if-text-muted)]">{copy.correctAnswer[lang]}: </span>
                    {q.options[q.answer][lang]}
                  </p>
                  <Link
                    href={`/knowledge-center/${portal}/${q.from.slug}`}
                    className="mt-2 inline-flex min-h-11 items-center gap-1.5 text-xs font-bold text-[var(--if-gold-ink)]"
                  >
                    {copy.fromLesson[lang]}: {q.from.title[lang]}
                    <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          type="button"
          onClick={start}
          className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--if-gold)]/40 bg-white px-5 text-sm font-bold text-[var(--if-green)] transition-colors hover:border-[var(--if-gold)]"
        >
          <RotateCcw aria-hidden="true" className="h-4 w-4" />
          {copy.retake[lang]}
        </button>
      </div>
    );
  }

  if (bank && at >= 0) {
    const q = bank[at];
    const picked = picks[at];
    const locked = picked !== null;
    return (
      <div className="rounded-2xl border border-[var(--if-gold)]/20 bg-white p-6">
        <div className="mb-4 flex items-center gap-3">
          <p className="text-xs font-bold uppercase text-[var(--if-gold-ink)] tabular-nums">
            {copy.question[lang]} {at + 1} {copy.of[lang]} {bank.length}
          </p>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--if-gold)]/20">
            <div
              className="h-full rounded-full bg-[var(--if-gold)] transition-[width] duration-300"
              style={{ width: `${((at + (locked ? 1 : 0)) / bank.length) * 100}%` }}
            />
          </div>
        </div>

        <p className="font-semibold text-[var(--if-text)] text-pretty">{q.q[lang]}</p>

        <div role="group" aria-label={copy.question[lang]} className="mt-3 grid gap-2">
          {q.options.map((o, i) => {
            const isPick = picked === i;
            const isAnswer = i === q.answer;
            const tone = !locked
              ? "border-[var(--if-gold)]/20 bg-white hover:border-[var(--if-gold)]/60"
              : isAnswer
                ? "border-emerald-400 bg-emerald-50"
                : isPick
                  ? "border-red-300 bg-red-50"
                  : "border-[var(--if-gold)]/20 bg-white opacity-60";
            return (
              <button
                key={i}
                type="button"
                aria-pressed={isPick}
                aria-disabled={locked || undefined}
                onClick={() => {
                  if (locked) return;
                  buzz(i === q.answer ? 12 : [10, 40, 10]);
                  setPicks((p) => p.map((v, j) => (j === at ? i : v)));
                }}
                className={`flex min-h-11 w-full items-center gap-2.5 rounded-lg border px-3 text-left text-sm transition-colors ${tone}`}
              >
                {locked && isAnswer && <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-emerald-700" />}
                {locked && isPick && !isAnswer && <X aria-hidden="true" className="h-4 w-4 shrink-0 text-red-500" />}
                <span className="text-pretty">{o[lang]}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          disabled={!locked}
          onClick={() => {
            const next = at + 1;
            setAt(next);
            if (next >= bank.length) {
              const final = picks.map((p, i) => (i === at ? picked : p)).filter((p, i) => p === bank[i].answer).length;
              const pct = Math.round((final / bank.length) * 100);
              if (final / bank.length >= PASS) celebrate();
              setBest((b) => {
                const nextBest = Math.max(b ?? 0, pct);
                try {
                  localStorage.setItem(BEST_KEY, JSON.stringify({ ...readBest(), [portal]: nextBest }));
                  /* The certificate sits on the same page and unlocks on a
                     pass; without this it would keep its lock until reload. */
                  window.dispatchEvent(new Event("ifp-assessment-changed"));
                } catch {
                  /* Storage blocked; the score still stands for this visit. */
                }
                return nextBest;
              });
            }
          }}
          className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--if-green)] px-5 text-sm font-bold text-[var(--if-gold-light)] transition-opacity disabled:opacity-40"
        >
          {at + 1 === bank.length ? copy.finish[lang] : copy.next[lang]}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-4 rounded-2xl border border-[var(--if-gold)]/20 bg-white p-6 sm:flex-row sm:items-center">
      <div className="min-w-0 flex-1">
        <p className="inline-flex items-center gap-2 font-display text-lg font-bold text-[var(--if-green)]">
          <ClipboardCheck aria-hidden="true" className="h-5 w-5 text-[var(--if-gold-ink)]" />
          {copy.heading[lang]}
        </p>
        <p className="mt-1 max-w-[60ch] text-sm text-[var(--if-text-muted)] text-pretty">
          {count} {copy.questions[lang]} · {copy.blurb[lang]}
        </p>
        {best !== null && (
          <p className="mt-2 text-sm font-semibold text-[var(--if-gold-ink)] tabular-nums">
            {copy.best[lang]}: {best}%
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={start}
        className="inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-full bg-[var(--if-green)] px-5 text-sm font-bold text-[var(--if-gold-light)] transition-colors hover:bg-[var(--if-green-mid)] sm:w-auto"
      >
        {loading ? copy.loading[lang] : best !== null ? copy.retake[lang] : copy.start[lang]}
        <ArrowRight aria-hidden="true" className="h-4 w-4" />
      </button>
    </div>
  );
}
