"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Check, HelpCircle, ListChecks } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
/* The generated summaries, not the full lessons module. See
   scripts/build-lesson-index.mjs for why. */
import { summariesByPortal } from "@/content/lesson-index";
import { useProgress } from "@/lib/progress";

const copy = {
  heading: { te: "పూర్తి పాఠాలు", en: "Full lessons" },
  blurb: {
    te: "ప్రతి పాఠంలో వివరణ, ముఖ్యాంశాలు, సాధారణ తప్పులు, ప్రశ్నోత్తరాలు మరియు ఒక చిన్న పరీక్ష.",
    en: "Each lesson has an explanation, key takeaways, common mistakes, FAQs and a short quiz.",
  },
  lessons: { te: "పాఠాలు", en: "lessons" },
  sections: { te: "విభాగాలు", en: "sections" },
  questions: { te: "ప్రశ్నలు", en: "questions" },
  faqs: { te: "ప్రశ్నోత్తరాలు", en: "FAQs" },
  start: { te: "పాఠం చదవండి", en: "Read lesson" },
  progress: { te: "పూర్తయినవి", en: "completed" },
  doneLabel: { te: "పూర్తయింది", en: "Completed" },
} as const;

export function LessonIndex({ portal }: { portal: string }) {
  const { lang } = useI18n();
  const { ready, isDone, countFor } = useProgress();
  const items = summariesByPortal(portal);
  const slugs = items.map((l) => l.slug);
  if (!items.length) return null;

  const totalSections = items.reduce((a, l) => a + l.sections, 0);
  const totalQuiz = items.reduce((a, l) => a + l.quiz, 0);
  const totalFaqs = items.reduce((a, l) => a + l.faqs, 0);

  return (
        /* scroll-mt-32, not 24: on the twelve portals with the jump bar the
       chrome is the 65px header plus a 53px bar, and at 96px the heading
       landed under it. */
    <section id="lessons" className="py-16 px-4 scroll-mt-32 bg-[var(--if-cream-light)]">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-2xl font-bold text-[var(--if-green)] mb-2">
          {copy.heading[lang]}
        </h2>
        <p className="text-[var(--if-text-muted)] mb-5 text-pretty max-w-2xl">
          {copy.blurb[lang]}
        </p>

        <dl className="flex flex-wrap gap-x-6 gap-y-2 mb-7 text-sm">
          {[
            [BookOpen, items.length, copy.lessons[lang]],
            [ListChecks, totalSections, copy.sections[lang]],
            [HelpCircle, totalQuiz + totalFaqs, `${copy.questions[lang]} + ${copy.faqs[lang]}`],
          ].map(([Icon, n, label], i) => {
            const I = Icon as typeof BookOpen;
            return (
              <div key={i} className="flex items-center gap-2">
                <I aria-hidden="true" className="h-4 w-4 text-[var(--if-gold-ink)]" />
                <dt className="sr-only">{String(label)}</dt>
                <dd className="tabular-nums">
                  <b className="text-[var(--if-green)]">{String(n)}</b>{" "}
                  <span className="text-[var(--if-text-muted)]">{String(label)}</span>
                </dd>
              </div>
            );
          })}
        </dl>

        {ready && countFor(portal, slugs) > 0 && (
          <p className="mb-5 text-sm font-semibold text-[var(--if-green)] tabular-nums">
            {countFor(portal, slugs)} / {items.length} {copy.progress[lang]}
          </p>
        )}

        <ol className="grid gap-3 sm:grid-cols-2">
          {items.map((l, i) => (
            <li key={l.slug} className="if-blur-fade" style={{ "--bf-delay": `${Math.min(0.05 * i, 0.4)}s` } as React.CSSProperties}>
              <Link
                href={`/knowledge-center/${portal}/${l.slug}`}
                className="group flex items-start gap-4 h-full rounded-2xl border border-[var(--if-gold)]/20 bg-white p-4 hover:border-[var(--if-gold)]/60 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]"
              >
                <span
                  aria-hidden="true"
                  className={`shrink-0 grid place-items-center w-9 h-9 rounded-full font-mono text-sm font-bold ${
                    ready && isDone(portal, l.slug)
                      ? "bg-[var(--if-gold)] text-[var(--if-green)]"
                      : "bg-[var(--if-green)] text-[var(--if-gold-light)]"
                  }`}
                >
                  {ready && isDone(portal, l.slug) ? <Check className="h-4 w-4" /> : i + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display font-bold text-[var(--if-green)] leading-tight text-pretty">
                    {l.title[lang]}
                  </span>
                  {l.intro && (
                    <span className="mt-1 block text-sm text-[var(--if-text-muted)] line-clamp-2 text-pretty">
                      {l.intro[lang]}
                    </span>
                  )}
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[var(--if-gold-ink)]">
                    {copy.start[lang]}
                    <ArrowRight
                      aria-hidden="true"
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
