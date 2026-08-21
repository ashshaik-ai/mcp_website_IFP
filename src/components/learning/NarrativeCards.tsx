"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import type { Bi, PortalEntry } from "@/content/portals";

/* The legacy arrays use short field names (s, l, bio, leg, les, ap...). Each
   caller maps them onto these labelled slots rather than the component
   guessing, so the same card works for a timeline event, a caliph and a
   prophet story. */
export type FieldMap = {
  /** Small line above the title: a year, a period, a role, a region. */
  meta?: string;
  /** The body paragraph. */
  summary?: string;
  /** A closing callout — the lesson, the legacy, the application. */
  lesson?: string;
  /** Optional extra paragraph shown when expanded. */
  extra?: string;
};

const copy = {
  lesson: { te: "పాఠం", en: "Lesson" },
  more: { te: "మరింత చదవండి", en: "Read more" },
  less: { te: "తక్కువ చూపండి", en: "Show less" },
} as const;

const isBi = (v: unknown): v is Bi =>
  typeof v === "object" && v !== null && "te" in v && "en" in v;

function text(entry: PortalEntry, key: string | undefined, lang: "te" | "en"): string {
  if (!key) return "";
  const v = entry[key];
  return isBi(v) ? v[lang] : "";
}

export function NarrativeCards({
  entries,
  fields,
  numbered = false,
  lessonLabel,
}: {
  entries: PortalEntry[];
  fields: FieldMap;
  /** Only for genuine sequences — a timeline, a set of stages. */
  numbered?: boolean;
  lessonLabel?: Bi;
}) {
  const { lang } = useI18n();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <ol className={`grid gap-4 ${numbered ? "" : "sm:grid-cols-2"}`}>
      {entries.map((e, i) => {
        const title = isBi(e.title) ? e.title[lang] : "";
        const meta = text(e, fields.meta, lang);
        const summary = text(e, fields.summary, lang);
        const lesson = text(e, fields.lesson, lang);
        const extra = text(e, fields.extra, lang);
        const expanded = open === i;

        return (
          <li
            key={`${title}-${i}`}
            className="rounded-2xl border border-[var(--if-gold)]/15 bg-white p-5 hover:border-[var(--if-gold)]/40 transition-colors"
          >
            <div className="flex items-start gap-4">
              {numbered && (
                <span
                  aria-hidden="true"
                  className="shrink-0 grid place-items-center w-9 h-9 rounded-full bg-[var(--if-green)] text-[var(--if-gold-light)] font-mono text-sm font-bold"
                >
                  {i + 1}
                </span>
              )}
              <div className="min-w-0 flex-1">
                {meta && (
                  <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--if-gold)] mb-1">
                    {meta}
                  </p>
                )}
                <div className="flex items-baseline gap-3 flex-wrap">
                  <h3 className="font-display text-lg font-bold text-[var(--if-green)] leading-tight">
                    {title}
                  </h3>
                  {e.arabic && (
                    <span dir="rtl" lang="ar" className="font-arabic text-lg text-[var(--if-gold)]">
                      {e.arabic}
                    </span>
                  )}
                </div>
                {summary && (
                  <p className="mt-2 text-sm text-[var(--if-text)] text-pretty">{summary}</p>
                )}

                {extra && (
                  <>
                    {expanded && (
                      <p className="mt-2 text-sm text-[var(--if-text-muted)] text-pretty">{extra}</p>
                    )}
                    <button
                      type="button"
                      onClick={() => setOpen(expanded ? null : i)}
                      aria-expanded={expanded}
                      className="mt-2 inline-flex items-center gap-1 min-h-11 text-sm font-semibold text-[var(--if-gold)] hover:text-[var(--if-green)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)] rounded"
                    >
                      {expanded ? copy.less[lang] : copy.more[lang]}
                      <ChevronRight
                        aria-hidden="true"
                        className={`h-4 w-4 transition-transform ${expanded ? "rotate-90" : ""}`}
                      />
                    </button>
                  </>
                )}

                {lesson && (
                  <p className="mt-3 rounded-xl bg-[var(--if-green)]/5 border border-[var(--if-green)]/15 px-3 py-2.5 text-sm text-[var(--if-text)] text-pretty">
                    <b className="block text-[11px] uppercase tracking-wide text-[var(--if-green)] mb-0.5">
                      {(lessonLabel ?? copy.lesson)[lang]}
                    </b>
                    {lesson}
                  </p>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
