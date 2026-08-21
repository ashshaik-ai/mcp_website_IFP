"use client";

import { ChevronRight } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import type { Bi, PortalEntry } from "@/content/portals";

const isBi = (v: unknown): v is Bi =>
  typeof v === "object" && v !== null && "te" in v && "en" in v;

/* Native <details> so the answers are in the DOM for search and for anyone
   using find-on-page, and so it works with JavaScript disabled. */
export function FaqList({
  items,
  questionKey = "q",
  answerKey = "a",
}: {
  items: PortalEntry[];
  questionKey?: string;
  answerKey?: string;
}) {
  const { lang } = useI18n();

  return (
    <div className="grid gap-2">
      {items.map((f, i) => {
        const q = f[questionKey];
        const a = f[answerKey];
        if (!isBi(q) || !isBi(a)) return null;
        return (
          <details
            key={i}
            className="group rounded-xl border border-[var(--if-gold)]/20 bg-white px-4"
          >
            <summary className="flex items-center gap-2 min-h-11 cursor-pointer font-semibold text-sm text-[var(--if-green)] list-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)] rounded">
              <ChevronRight
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-[var(--if-gold)] transition-transform group-open:rotate-90"
              />
              <span className="text-pretty">{q[lang]}</span>
            </summary>
            <p className="pb-4 pl-6 text-sm text-[var(--if-text-muted)] leading-relaxed text-pretty">
              {a[lang]}
            </p>
          </details>
        );
      })}
    </div>
  );
}
