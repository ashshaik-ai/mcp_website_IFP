"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, ExternalLink, X } from "lucide-react";
import { quizOrder } from "@/lib/quiz-order";
import { useI18n } from "@/lib/i18n/context";
import type { Bi, Lesson, QuizItem } from "@/content/all-lessons";
import { LessonComplete } from "./LessonComplete";

const copy = {
  back: { te: "పోర్టల్‌కు తిరిగి", en: "Back to portal" },
  lesson: { te: "పాఠం", en: "Lesson" },
  of: { te: "లో", en: "of" },
  takeaways: { te: "ముఖ్యాంశాలు", en: "Key takeaways" },
  didYouKnow: { te: "మీకు తెలుసా?", en: "Did you know?" },
  mistakes: { te: "సాధారణ తప్పులు", en: "Common mistakes" },
  reflect: { te: "ఆలోచించండి", en: "Reflect" },
  faqs: { te: "తరచుగా అడిగే ప్రశ్నలు", en: "Frequently asked" },
  quiz: { te: "మీకు ఎంత గుర్తుంది?", en: "Check what you remember" },
  revision: { te: "పునశ్చరణ", en: "Revision" },
  summary: { te: "సారాంశం", en: "In summary" },
  apply: { te: "ఆచరణలో పెట్టండి", en: "Put it into practice" },
  reading: { te: "మరింత చదవడానికి", en: "Further reading" },
  check: { te: "అర్థమైందా?", en: "Quick check" },
  correct: { te: "సరైనది!", en: "Correct" },
  tryAgain: { te: "మళ్లీ ప్రయత్నించండి", en: "Not quite — try again" },
  prev: { te: "మునుపటి", en: "Previous" },
  next: { te: "తదుపరి", en: "Next" },
  score: { te: "మీ స్కోరు", en: "Your score" },
} as const;

function Quiz({ item, idPrefix }: { item: QuizItem; idPrefix: string }) {
  const { lang } = useI18n();
  const [picked, setPicked] = useState<number | null>(null);
  /* Options are shown in a seeded order, because every question on the site
     was authored with answer: 0. See src/lib/quiz-order.ts. */
  const { order, answer } = useMemo(
    () => quizOrder(item.question.en, item.options.length, item.answer),
    [item],
  );
  const right = picked === answer;

  return (
    <div className="rounded-xl border border-[var(--if-gold)]/20 bg-white p-4">
      <p id={`${idPrefix}-q`} className="font-semibold text-[var(--if-text)] text-pretty">
        {item.question[lang]}
      </p>
      {/* A radiogroup, not a row of toggle buttons: these are one choice, and
          aria-pressed announced them as four independent switches. */}
      <div role="radiogroup" aria-labelledby={`${idPrefix}-q`} className="mt-3 grid gap-2">
        {order.map((original, i) => {
          const o = item.options[original];
          const chosen = picked === i;
          const isAnswer = i === answer;
          const state =
            picked === null
              ? "border-[var(--if-gold)]/25 hover:border-[var(--if-gold)]/60 bg-white"
              : isAnswer
                ? "border-emerald-400 bg-emerald-50"
                : chosen
                  ? "border-red-300 bg-red-50"
                  : "border-[var(--if-gold)]/15 bg-white opacity-60";
          return (
            <div key={`${idPrefix}-${original}`}>
              <button
                type="button"
                role="radio"
                onClick={() => setPicked(i)}
                aria-checked={chosen}
                className={`w-full flex items-center gap-2.5 text-left min-h-11 px-3 rounded-lg border text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)] ${state}`}
              >
                {picked !== null && isAnswer && (
                  <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-emerald-700" />
                )}
                {picked !== null && chosen && !isAnswer && (
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
        className={`mt-2.5 text-sm font-semibold ${picked === null ? "sr-only" : right ? "text-emerald-700" : "text-red-600"}`}
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
    gold: "bg-[var(--if-gold)]/8 border-[var(--if-gold)]/25",
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

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <Link
        href={portalHref}
        className="inline-flex items-center gap-1.5 min-h-11 text-sm font-semibold text-[var(--if-gold-ink)] hover:text-[var(--if-green)] transition-colors"
      >
        <ArrowLeft aria-hidden="true" className="h-4 w-4" />
        {copy.back[lang]} · {portalTitle[lang]}
      </Link>

      <p className="mt-4 text-[11px] font-bold uppercase tracking-widest text-[var(--if-gold-ink)]">
        {copy.lesson[lang]} {index + 1} {copy.of[lang]} {total}
      </p>
      <h1 className="mt-1 font-display text-3xl md:text-4xl font-bold text-[var(--if-green)] text-balance">
        {lesson.title[lang]}
      </h1>

      {lesson.intro && (
        <p className="mt-4 text-lg text-[var(--if-text)] leading-relaxed text-pretty">
          {lesson.intro[lang]}
        </p>
      )}

      <div className="mt-10 grid gap-8">
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
                <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--if-gold-ink)] mb-2">
                  {copy.check[lang]}
                </p>
                <Quiz item={s.check} idPrefix={`check-${i}`} />
              </div>
            )}
          </section>
        ))}
      </div>

      <div className="mt-10 grid gap-6">
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
                  <summary className="flex items-center gap-2 min-h-11 cursor-pointer font-semibold text-sm text-[var(--if-green)] list-none">
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

        {lesson.quiz.length > 0 && (
          <section>
            <h2 className="font-display text-lg font-bold text-[var(--if-green)] mb-3">
              {copy.quiz[lang]}
            </h2>
            <div className="grid gap-3">
              {lesson.quiz.map((q, i) => (
                <Quiz key={i} item={q} idPrefix={`quiz-${i}`} />
              ))}
            </div>
          </section>
        )}

        <BiList items={lesson.revision} title={copy.revision} tone="gold" />

        {lesson.summary && (
          <section className="if-defer rounded-2xl bg-[var(--if-green)] p-6">
            <h2 className="font-display text-lg font-bold text-[var(--if-gold-light)] mb-2">
              {copy.summary[lang]}
            </h2>
            <p className="text-[var(--if-gold-pale)]/90 leading-relaxed text-pretty">
              {lesson.summary[lang]}
            </p>
          </section>
        )}

        {lesson.apply && (
          <section className="if-defer rounded-2xl border border-[var(--if-gold)]/30 bg-[var(--if-gold)]/8 p-5">
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
                return (
                  <li key={r.url}>
                    {external ? (
                      <a href={r.url} target="_blank" rel="noopener noreferrer" className={className}>
                        {r.label}
                        <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      <Link href={r.url} className={className}>
                        {r.label}
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

      <LessonComplete portal={lesson.portal} slug={lesson.slug} />

      <nav
        aria-label={copy.lesson[lang]}
        className="mt-12 grid gap-3 sm:grid-cols-2 border-t border-[var(--if-gold)]/20 pt-6"
      >
        {prev ? (
          <Link
            href={`${portalHref}/${prev.slug}`}
            className="flex items-center gap-2 min-h-11 px-4 rounded-xl border border-[var(--if-gold)]/25 hover:border-[var(--if-gold)]/60 transition-colors"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4 shrink-0 text-[var(--if-gold-ink)]" />
            <span className="min-w-0">
              <span className="block text-[10px] uppercase tracking-wide text-[var(--if-text-muted)]">
                {copy.prev[lang]}
              </span>
              <span className="block text-sm font-semibold text-[var(--if-green)] truncate">
                {prev.title[lang]}
              </span>
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={`${portalHref}/${next.slug}`}
            className="flex items-center gap-2 min-h-11 px-4 rounded-xl border border-[var(--if-gold)]/25 hover:border-[var(--if-gold)]/60 transition-colors sm:text-right sm:flex-row-reverse"
          >
            <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 text-[var(--if-gold-ink)]" />
            <span className="min-w-0">
              <span className="block text-[10px] uppercase tracking-wide text-[var(--if-text-muted)]">
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
