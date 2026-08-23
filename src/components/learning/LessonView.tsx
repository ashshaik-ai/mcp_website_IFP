"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, ExternalLink, X } from "lucide-react";
import { quizOrder } from "@/lib/quiz-order";
import { readingLabelTe } from "@/content/reading-labels";
import { useI18n } from "@/lib/i18n/context";
import type { Bi, Lesson, QuizItem } from "@/content/all-lessons";
import { LessonComplete } from "./LessonComplete";
import { LessonVisual } from "./LessonVisual";
import { useQuizResults } from "@/lib/quiz-results";

const copy = {
  back: { te: "పోర్టల్‌కు తిరిగి", en: "Back to portal" },
  lesson: { te: "పాఠం", en: "Lesson" },

  takeaways: { te: "ముఖ్యాంశాలు", en: "Key takeaways" },
  didYouKnow: { te: "మీకు తెలుసా?", en: "Did you know?" },
  mistakes: { te: "సాధారణ తప్పులు", en: "Common mistakes" },
  reflect: { te: "ఆలోచించండి", en: "Reflect" },
  faqs: { te: "తరచుగా అడిగే ప్రశ్నలు", en: "Frequently asked" },
  quiz: { te: "మీకు ఎంత గుర్తుంది?", en: "Check what you remember" },
  right: { te: "సరైనవి", en: "right" },
  revision: { te: "పునశ్చరణ", en: "Revision" },
  summary: { te: "సారాంశం", en: "In summary" },
  apply: { te: "ఆచరణలో పెట్టండి", en: "Put it into practice" },
  reading: { te: "మరింత చదవడానికి", en: "Further reading" },
  check: { te: "అర్థమైందా?", en: "Quick check" },
  correct: { te: "సరైనది!", en: "Correct" },
  tryAgain: { te: "మళ్లీ ప్రయత్నించండి", en: "Not quite — try again" },
  prev: { te: "మునుపటి", en: "Previous" },
  next: { te: "తదుపరి", en: "Next" },

} as const;

function Quiz({
  item,
  idPrefix,
  onCorrect,
  alreadyRight,
}: {
  item: QuizItem;
  idPrefix: string;
  onCorrect?: () => void;
  /** Answered correctly on a previous visit. */
  alreadyRight?: boolean;
}) {
  const { lang } = useI18n();
  const [picked, setPicked] = useState<number | null>(null);
  /* Options are shown in a seeded order, because every question on the site
     was authored with answer: 0. See src/lib/quiz-order.ts. */
  const { order, answer } = useMemo(
    () => quizOrder(item.question.en, item.options.length, item.answer),
    [item],
  );
  const right = picked === answer;

  /* Recorded the moment it lands, not on some later submit — there is no submit
     here, and a score nobody stores is a score nobody has. */
  useEffect(() => {
    if (right) onCorrect?.();
  }, [right, onCorrect]);

  return (
    <div className="rounded-xl border border-[var(--if-gold)]/20 bg-white p-4">
      <p id={`${idPrefix}-q`} className="font-semibold text-[var(--if-text)] text-pretty">
        {item.question[lang]}
      </p>
      {/* Declared as a radiogroup once, which promises roving focus and
          arrow-key movement that select as they go. Neither was here, and
          arrow-selection is wrong for a quiz anyway: it would mark whatever you
          arrowed past as a wrong answer. These are what they behave like — a
          group of answer buttons, one of which becomes pressed. */}
      <div role="group" aria-labelledby={`${idPrefix}-q`} className="mt-3 grid gap-2">
        {order.map((original, i) => {
          const o = item.options[original];
          const chosen = picked === i;
          const isAnswer = i === answer;
          /* Only reveal the answer once it has been found. Marking it green on
             a wrong pick and then saying "try again" left nothing to try. */
          const settled = (picked !== null && right) || Boolean(alreadyRight && picked === null && i === answer);
          const state = settled
            ? isAnswer
              ? "border-emerald-400 bg-emerald-50"
              : "border-[var(--if-gold)]/20 bg-white opacity-60"
            : chosen
              ? "border-red-300 bg-red-50"
              : "border-[var(--if-gold)]/20 hover:border-[var(--if-gold)]/60 bg-white";
          return (
            <div key={`${idPrefix}-${original}`}>
              <button
                type="button"
                /* Once it is right it stays right. Clicking another option
                   afterwards used to un-solve the question and mark the new
                   pick wrong. */
                onClick={() => { if (!settled) setPicked(i); }}
                aria-pressed={chosen}
                aria-disabled={settled || undefined}
                className={`w-full flex items-center gap-2.5 text-left min-h-11 px-3 rounded-lg border text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)] ${state}`}
              >
                {settled && isAnswer && (
                  <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-emerald-700" />
                )}
                {!settled && chosen && (
                  <X aria-hidden="true" className="h-4 w-4 shrink-0 text-red-500" />
                )}
                <span className="text-pretty">{o[lang]}</span>
              </button>
            </div>
          );
        })}
      </div>
      {/* The live region is always mounted. Creating the element and its text
          in the same tick generally does not announce -- the region has to be
          there first for the insertion to be noticed. */}
      <p
        aria-live="polite"
        className={`mt-2.5 min-h-5 text-sm font-semibold transition-opacity duration-200 ${picked === null ? "opacity-0" : right ? "opacity-100 text-emerald-700" : "opacity-100 text-red-600"}`}
      >
        {picked === null ? "" : right ? copy.correct[lang] : copy.tryAgain[lang]}
      </p>
    </div>
  );
}

function BiList({ items, title, tone }: { items: Bi[]; title: Bi; tone: "gold" | "green" | "amber" }) {
  const { lang } = useI18n();
  if (!items.length) return null;
  const tones = {
    gold: "bg-[var(--if-gold)]/8 border-[var(--if-gold)]/20",
    green: "bg-[var(--if-green)]/5 border-[var(--if-green)]/20",
    amber: "bg-amber-50 border-amber-200",
  };
  return (
    <section className={`rounded-2xl border p-5 ${tones[tone]}`}>
      <h2 className="font-display text-lg font-bold text-[var(--if-green)] mb-3">{title[lang]}</h2>
      <ul className="grid gap-2">
        {items.map((t, i) => (
          <li key={i} className="flex gap-2.5 text-sm text-[var(--if-text)] text-pretty">
            <span aria-hidden="true" className="text-[var(--if-gold-ink)] shrink-0">
              &#8226;
            </span>
            {t[lang]}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function LessonView({
  lesson,
  index,
  total,
  prev,
  next,
  portalHref,
  portalTitle,
}: {
  lesson: Lesson;
  index: number;
  total: number;
  prev: { slug: string; title: Bi } | null;
  next: { slug: string; title: Bi } | null;
  portalHref: string;
  portalTitle: Bi;
}) {
  const { lang } = useI18n();
  const { ready: quizReady, scoreFor, record, answeredFor } = useQuizResults();
  const score = scoreFor(lesson.portal, lesson.slug);
  const answered = answeredFor(lesson.portal, lesson.slug);
  const recordAnswer = useCallback(
    (i: number) => record(lesson.portal, lesson.slug, i),
    [record, lesson.portal, lesson.slug],
  );
  const checkKey = `${lesson.slug}#check`;
  const checked = answeredFor(lesson.portal, checkKey);
  const recordCheck = useCallback(
    (i: number) => record(lesson.portal, checkKey, i),
    [record, lesson.portal, checkKey],
  );

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <Link
        href={portalHref}
        className="inline-flex items-center gap-1.5 min-h-11 text-sm font-semibold text-[var(--if-gold-ink)] hover:text-[var(--if-green)] transition-colors"
      >
        <ArrowLeft aria-hidden="true" className="h-4 w-4" />
        {copy.back[lang]} · {portalTitle[lang]}
      </Link>

      <p className="if-rise mt-4 text-xs font-bold uppercase tracking-widest text-[var(--if-gold-ink)]" style={{ animationDelay: "0.05s" }}>
        {lang === "te" ? `${total}లో ${copy.lesson.te} ${index + 1}` : `${copy.lesson.en} ${index + 1} of ${total}`}
      </p>
      <h1 className="if-rise mt-1 font-display text-3xl md:text-4xl font-bold text-[var(--if-green)] text-balance" style={{ animationDelay: "0.1s" }}>
        {lesson.title[lang]}
      </h1>

      {lesson.intro && (
        <p className="if-rise mt-4 text-lg text-[var(--if-text)] leading-relaxed text-pretty" style={{ animationDelay: "0.15s" }}>
          {lesson.intro[lang]}
        </p>
      )}

      <div className="mt-10 grid min-w-0 gap-8">
        {lesson.sections.map((s, i) => (
          <section key={i}>
            {s.heading && (
              <h2 className="font-display text-xl font-bold text-[var(--if-green)] mb-2 text-balance">
                {s.heading[lang]}
              </h2>
            )}
            {s.body && (
              <p className="text-[var(--if-text)] leading-relaxed text-pretty">{s.body[lang]}</p>
            )}
            {s.check && (
              <div className="mt-4">
                <p className="text-xs font-bold uppercase tracking-wide text-[var(--if-gold-ink)] mb-2">
                  {copy.check[lang]}
                </p>
                <Quiz
                    item={s.check}
                    idPrefix={`check-${i}`}
                    /* Kept under their own key: they are questions and should
                       be remembered, but they are not the numbered quiz and
                       must not inflate its score. */
                    alreadyRight={checked.includes(i)}
                    onCorrect={() => recordCheck(i)}
                  />
              </div>
            )}
          </section>
        ))}
      </div>

      <div className="mt-10 grid min-w-0 gap-6">
        <BiList items={lesson.takeaways} title={copy.takeaways} tone="gold" />
        <BiList items={lesson.didYouKnow} title={copy.didYouKnow} tone="green" />
        <BiList items={lesson.mistakes} title={copy.mistakes} tone="amber" />
        <BiList items={lesson.reflect} title={copy.reflect} tone="green" />

        {lesson.faqs.length > 0 && (
          <section>
            <h2 className="font-display text-lg font-bold text-[var(--if-green)] mb-3">
              {copy.faqs[lang]}
            </h2>
            <div className="grid gap-2">
              {lesson.faqs.map((f, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-[var(--if-gold)]/20 bg-white px-4"
                >
                  <summary className="flex items-center gap-2 min-h-11 cursor-pointer font-semibold text-sm text-[var(--if-green)] hover:text-[var(--if-gold-ink)] transition-colors list-none">
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 transition-transform group-open:rotate-90"
                    />
                    <span className="text-pretty">{f.question[lang]}</span>
                  </summary>
                  <p className="pb-4 pl-6 text-sm text-[var(--if-text-muted)] text-pretty">
                    {f.answer[lang]}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        <LessonVisual portal={lesson.portal} slug={lesson.slug} />

        {lesson.quiz.length > 0 && (
          <section>
            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4">
              <h2 className="font-display text-lg font-bold text-[var(--if-green)]">
                {copy.quiz[lang]}
              </h2>
              {/* Five questions used to be asked and nothing done with the
                  answers. The count is the whole point of asking. */}
              <p
                className="text-sm font-semibold text-[var(--if-gold-ink)] tabular-nums"
                aria-live="polite"
                style={{ visibility: quizReady ? "visible" : "hidden" }}
              >
                {score} / {lesson.quiz.length} {copy.right[lang]}
              </p>
            </div>
            <div className="grid gap-3">
              {lesson.quiz.map((q, i) => (
                <Quiz
                  key={i}
                  item={q}
                  idPrefix={`quiz-${i}`}
                  alreadyRight={answered.includes(i)}
                  onCorrect={() => recordAnswer(i)}
                />
              ))}
            </div>
          </section>
        )}

        <BiList items={lesson.revision} title={copy.revision} tone="gold" />

        {lesson.summary && (
          <section className="rounded-2xl bg-[var(--if-green)] p-6">
            <h2 className="font-display text-lg font-bold text-[var(--if-gold-light)] mb-2">
              {copy.summary[lang]}
            </h2>
            <p className="text-[var(--if-gold-pale)]/90 leading-relaxed text-pretty">
              {lesson.summary[lang]}
            </p>
          </section>
        )}

        {lesson.apply && (
          <section className="rounded-2xl border border-[var(--if-gold)]/30 bg-[var(--if-gold)]/8 p-5">
            <h2 className="font-display text-lg font-bold text-[var(--if-green)] mb-2">
              {copy.apply[lang]}
            </h2>
            <p className="text-[var(--if-text)] text-pretty">{lesson.apply[lang]}</p>
          </section>
        )}

        {lesson.reading.length > 0 && (
          <section>
            <h2 className="font-display text-lg font-bold text-[var(--if-green)] mb-3">
              {copy.reading[lang]}
            </h2>
            <ul className="grid gap-2">
              {lesson.reading.map((r) => {
                // Only send people off-site in a new tab; internal links stay put.
                const external = /^https?:/i.test(r.url);
                const className =
                  "inline-flex items-center gap-1.5 min-h-11 text-sm font-semibold text-[var(--if-gold-ink)] hover:text-[var(--if-green)] transition-colors";
                /* reading labels are bare strings in the lesson data, so every
                   one of them rendered in English under a Telugu heading. */
                const label = lang === "te" ? (readingLabelTe[r.label] ?? r.label) : r.label;
                return (
                  <li key={r.url}>
                    {external ? (
                      <a href={r.url} target="_blank" rel="noopener noreferrer" className={className}>
                        {label}
                        <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      <Link href={r.url} className={className}>
                        {label}
                        <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        )}
      </div>

      <LessonComplete portal={lesson.portal} slug={lesson.slug} quizScore={score} quizTotal={lesson.quiz.length} />

      <nav
        aria-label={copy.lesson[lang]}
        className="mt-12 grid gap-3 sm:grid-cols-2 border-t border-[var(--if-gold)]/20 pt-6"
      >
        {prev ? (
          <Link
            href={`${portalHref}/${prev.slug}`}
            className="flex min-w-0 items-center gap-2 min-h-11 px-4 rounded-xl border border-[var(--if-gold)]/20 hover:border-[var(--if-gold)]/60 transition-colors"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4 shrink-0 text-[var(--if-gold-ink)]" />
            <span className="min-w-0">
              <span className="block text-xs uppercase tracking-wide text-[var(--if-text-muted)]">
                {copy.prev[lang]}
              </span>
              <span className="block text-sm font-semibold text-[var(--if-green)] truncate">
                {prev.title[lang]}
              </span>
            </span>
          </Link>
        ) : (
          <span className="hidden sm:block" />
        )}
        {next && (
          <Link
            href={`${portalHref}/${next.slug}`}
            className="flex min-w-0 items-center gap-2 min-h-11 px-4 rounded-xl border border-[var(--if-gold)]/20 hover:border-[var(--if-gold)]/60 transition-colors sm:text-right sm:flex-row-reverse"
          >
            <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 text-[var(--if-gold-ink)]" />
            <span className="min-w-0">
              <span className="block text-xs uppercase tracking-wide text-[var(--if-text-muted)]">
                {copy.next[lang]}
              </span>
              <span className="block text-sm font-semibold text-[var(--if-green)] truncate">
                {next.title[lang]}
              </span>
            </span>
          </Link>
        )}
      </nav>
    </article>
  );
}
