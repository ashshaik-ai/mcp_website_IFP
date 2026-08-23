"use client";

import { ArrowDown } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { summariesByPortal } from "@/content/lesson-index";
import { useProgress } from "@/lib/progress";

/* A portal's lessons are the reason to be on the page, and on a phone they sat
   between seven and twenty-two screens below the fold — behind the timeline,
   the explorer, the dashboard and the simulator. Measured on a 390px viewport:
   kids-islam 21.8 screens, seerah 16.4, hadith 12.7, islamic-history 11.9,
   learn-quran 9.0.

   This is the shortcut: a slim bar under the header, always in reach, that
   says how much there is and takes you to it. It also carries the progress
   count, so a returning learner sees where they are without hunting for the
   dashboard. */
const copy = {
  lessons: { te: "పాఠాలు", en: "lessons" },
  go: { te: "పాఠాలకు వెళ్ళండి", en: "Go to lessons" },
  done: { te: "పూర్తయినవి", en: "done" },
} as const;

export function PortalJump({ portal }: { portal: string }) {
  const { lang } = useI18n();
  const { ready, countFor } = useProgress();
  const items = summariesByPortal(portal);
  if (!items.length) return null;

  const done = ready ? countFor(portal, items.map((l) => l.slug)) : 0;

  return (
    <div className="sticky top-16 z-30 border-b border-[var(--if-gold)]/20 bg-[var(--if-cream-light)]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-2">
        <p className="min-w-0 truncate text-xs font-semibold text-[var(--if-text-mid)] sm:text-sm">
          <span className="tabular-nums">{items.length}</span> {copy.lessons[lang]}
          {done > 0 && (
            <span className="ml-2 text-[var(--if-gold-ink)]">
              · <span className="tabular-nums">{done}</span> {copy.done[lang]}
            </span>
          )}
        </p>
        <a
          href="#lessons"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--if-gold)]/40 bg-white px-3 min-h-9 text-xs font-bold text-[var(--if-green)] transition-colors hover:border-[var(--if-gold)] hover:bg-[color-mix(in_srgb,var(--if-gold)_10%,white)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]"
        >
          {copy.go[lang]}
          <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
