"use client";

import { ShieldCheck, AlertTriangle, HelpCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { gradeTone, GRADE_MEANING, type GradeTone, type Hadith } from "@/lib/hadith-grade";
import { HadithVersionPicker, useHadithView } from "./HadithVersions";

/* A page of narrations.

   A client component, unlike the Quran reader's ayah list, for one reason: the
   reader's choice of Arabic, English or both has to reach every card. The text
   itself is still prerendered into the HTML by the server page above -- this
   only decides which of it is shown, so a reader with no JavaScript gets both
   languages rather than a blank list.

   The grade is the load-bearing part. 5,048 of the 36,057 narrations here are
   graded weak by at least one grader, and a reader who repeats one of those as
   an established saying of the Prophet ﷺ has been failed by whoever showed it
   to them. So a grade is never a bare word: the badge carries what it means
   and what to do about it, in the reader's own language. */

const TONE_STYLE: Record<GradeTone, string> = {
  sahih: "bg-[var(--if-green)]/10 text-[var(--if-green)]",
  hasan: "bg-[var(--if-gold)]/15 text-[var(--if-gold-ink)]",
  daif: "bg-[#8a3b1e]/10 text-[#8a3b1e]",
  mawdu: "bg-[#7a1f1f]/12 text-[#7a1f1f]",
  none: "bg-[var(--if-text-muted)]/10 text-[var(--if-text-muted)]",
};

export function HadithList({
  hadiths,
  sahihThroughout,
}: {
  hadiths: Hadith[];
  sahihThroughout: boolean;
}) {
  const view = useHadithView();
  return (
    <>
      <HadithVersionPicker />
      <ol className="flex flex-col gap-5">
        {hadiths.map((h) => (
          <HadithCard key={h.n} h={h} sahihThroughout={sahihThroughout} view={view} />
        ))}
      </ol>
    </>
  );
}

function HadithCard({
  h,
  sahihThroughout,
  view,
}: {
  h: Hadith;
  sahihThroughout: boolean;
  view: "both" | "ar" | "en";
}) {
  const { lang } = useI18n();
  const tone = gradeTone(h.g);
  /* In Bukhari and Muslim an absent grade is not a gap: the compiler's whole
     criterion was that everything in the book is sound. Everywhere else it
     means nobody in this data graded it, and that is worth saying. */
  const effective: GradeTone = tone === "none" && sahihThroughout ? "sahih" : tone;
  const Icon = effective === "sahih" ? ShieldCheck : effective === "none" ? HelpCircle : AlertTriangle;

  return (
    <li className="rounded-xl border border-[var(--if-gold)]/20 bg-white p-4 sm:p-5">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-[var(--if-cream)] px-2.5 py-0.5 text-xs font-bold tabular-nums text-[var(--if-gold-ink)]">
          #{h.n}
        </span>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${TONE_STYLE[effective]}`}
        >
          <Icon aria-hidden="true" className="h-3 w-3" />
          {h.g ?? GRADE_MEANING[effective].en.split(" — ")[0]}
        </span>
        {h.gby && <span className="text-[11px] text-[var(--if-text-muted)]">— {h.gby}</span>}
      </div>

      {h.ar && view !== "en" && (
        <p className="font-arabic mb-4 text-right text-2xl leading-[2.2] text-[var(--if-text)]" lang="ar" dir="rtl">
          {h.ar}
        </p>
      )}

      {view !== "ar" && (
        <p className="leading-relaxed text-[var(--if-text-mid)]" style={{ textWrap: "pretty" }} lang="en">
          {h.en}
        </p>
      )}

      {/* What the grade means, for a reader who is not a scholar. Shown for
          anything that is not plainly sound, because that is when it matters. */}
      {(effective === "daif" || effective === "mawdu" || effective === "none") && (
        <p className="mt-3 rounded-lg bg-[var(--if-cream)] px-3 py-2 text-xs leading-relaxed text-[var(--if-text-mid)]">
          {GRADE_MEANING[effective][lang]}
        </p>
      )}
    </li>
  );
}
