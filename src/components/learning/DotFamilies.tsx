"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2 } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { arabicLetters } from "@/content/alphabets";
import { usePrefersReducedMotion } from "@/lib/reduced-motion";

/* The dots.

   Nine groups of Arabic letters are the same drawn shape, told apart only by
   dots: ب ت ث are one skeleton with a dot below, two above, three above. So
   are ج ح خ. So are د ذ, ر ز, س ش, ص ض, ط ظ, ع غ, ف ق.

   A beginner who does not know this is trying to memorise 28 unrelated
   squiggles. A beginner who does know it is memorising nine shapes and a
   counting rule, and it stops being hard. It is the single highest-value
   thing to teach first and the Qaida teaches it on page one, which is why
   this sits at the top of the page.

   The dots arrive one at a time rather than all at once, because the count is
   the whole point and a reader should see it counted. */

type Family = {
  /** What the shared shape is called, in plain words. */
  shape: { te: string; en: string };
  letters: string[];
  /** Where the dots sit, for the caption. */
  note: { te: string; en: string };
};

const FAMILIES: Family[] = [
  {
    shape: { te: "ఒకే \"పన్ను\" ఆకారం", en: "One tooth" },
    letters: ["ب", "ت", "ث"],
    note: { te: "కింద ఒకటి, పైన రెండు, పైన మూడు.", en: "One below, two above, three above." },
  },
  {
    shape: { te: "ఒకే గుండ్రని ఆకారం", en: "One bowl" },
    letters: ["ج", "ح", "خ"],
    note: { te: "లోపల ఒకటి, ఏమీ లేదు, పైన ఒకటి.", en: "One inside, none, one above." },
  },
  {
    shape: { te: "ఒకే వంపు", en: "One hook" },
    letters: ["د", "ذ"],
    note: { te: "చుక్క లేదు, పైన ఒక చుక్క.", en: "No dot, one dot above." },
  },
  {
    shape: { te: "ఒకే తోక", en: "One tail" },
    letters: ["ر", "ز"],
    note: { te: "చుక్క లేదు, పైన ఒక చుక్క.", en: "No dot, one dot above." },
  },
  {
    shape: { te: "మూడు పళ్ళు", en: "Three teeth" },
    letters: ["س", "ش"],
    note: { te: "చుక్కలు లేవు, పైన మూడు.", en: "No dots, three above." },
  },
  {
    shape: { te: "ఒకే ఉంగరం", en: "One loop" },
    letters: ["ص", "ض"],
    note: { te: "చుక్క లేదు, పైన ఒకటి.", en: "No dot, one above." },
  },
  {
    shape: { te: "నిలువు గీతతో", en: "With an upright" },
    letters: ["ط", "ظ"],
    note: { te: "చుక్క లేదు, పైన ఒకటి.", en: "No dot, one above." },
  },
  {
    shape: { te: "ఒకే కన్ను", en: "One eye" },
    letters: ["ع", "غ"],
    note: { te: "చుక్క లేదు, పైన ఒకటి.", en: "No dot, one above." },
  },
  {
    shape: { te: "ఒకే గిన్నె", en: "One cup" },
    letters: ["ف", "ق"],
    note: { te: "పైన ఒకటి, పైన రెండు.", en: "One above, two above." },
  },
];

const copy = {
  title: { te: "చుక్కలే తేడా", en: "The dots are the difference" },
  lead: {
    te: "28 అక్షరాలను వేరు వేరుగా గుర్తుపెట్టుకోవాల్సిన అవసరం లేదు. చాలా అక్షరాలు ఒకే ఆకారం — చుక్కలు మాత్రమే మారతాయి.",
    en: "You do not have to memorise 28 unrelated shapes. Most letters share a skeleton, and only the dots change.",
  },
  hear: { te: "వినండి", en: "Hear it" },
  same: { te: "ఒకే ఆకారం", en: "Same shape" },
};

/* How many dots a letter carries, and whether they sit above or below. Read
   off the letter itself so it cannot drift from the glyph shown. */
const DOTS: Record<string, { count: number; below?: true }> = {
  ب: { count: 1, below: true }, ت: { count: 2 }, ث: { count: 3 },
  ج: { count: 1, below: true }, ح: { count: 0 }, خ: { count: 1 },
  د: { count: 0 }, ذ: { count: 1 },
  ر: { count: 0 }, ز: { count: 1 },
  س: { count: 0 }, ش: { count: 3 },
  ص: { count: 0 }, ض: { count: 1 },
  ط: { count: 0 }, ظ: { count: 1 },
  ع: { count: 0 }, غ: { count: 1 },
  ف: { count: 1 }, ق: { count: 2 },
};

export function DotFamilies() {
  const { lang } = useI18n();
  const [openFamily, setOpenFamily] = useState(0);
  const [step, setStep] = useState(0);
  const audio = useRef<HTMLAudioElement | null>(null);
  const reduced = usePrefersReducedMotion();

  const family = FAMILIES[openFamily];

  /* Walk through the family, one letter at a time, so the dots are seen to be
     counted rather than appearing all at once. */
  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setStep((s) => (s + 1) % (family.letters.length + 1)), 1400);
    return () => window.clearInterval(id);
  }, [family.letters.length, reduced]);

  const play = (glyph: string) => {
    const meta = arabicLetters.find((l) => l.glyph === glyph);
    if (!meta?.audio) return;
    audio.current?.pause();
    const el = new Audio(meta.audio);
    audio.current = el;
    /* A blocked autoplay policy or a missing file should do nothing at all,
       not throw into the console. */
    el.play().catch(() => {});
  };

  return (
    <div className="rounded-2xl border border-[var(--if-gold)]/25 bg-white p-5 sm:p-8">
      <h2 className="font-display text-xl font-bold text-[var(--if-green)] sm:text-2xl">{copy.title[lang]}</h2>
      <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-[var(--if-text-mid)]" style={{ textWrap: "pretty" }}>
        {copy.lead[lang]}
      </p>

      <div className="my-6 flex flex-wrap gap-2">
        {FAMILIES.map((f, i) => (
          <button
            key={f.letters.join("")}
            type="button"
            onClick={() => {
              setOpenFamily(i);
              setStep(0);
            }}
            aria-pressed={i === openFamily}
            className={`font-arabic min-h-11 rounded-lg px-3 text-xl transition-colors ${
              i === openFamily
                ? "bg-[var(--if-green)] text-[var(--if-gold-light)]"
                : "border border-[var(--if-gold)]/20 text-[var(--if-text-mid)] hover:border-[var(--if-gold)]/50"
            }`}
            lang="ar"
            dir="rtl"
          >
            {f.letters.join(" ")}
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-[var(--if-cream)] px-4 py-8">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-wide text-[var(--if-text-muted)]">
          {copy.same[lang]} — {family.shape[lang]}
        </p>

        <ul className="flex flex-row-reverse flex-wrap items-end justify-center gap-6" dir="rtl">
          {family.letters.map((glyph, i) => {
            const meta = arabicLetters.find((l) => l.glyph === glyph);
            const dots = DOTS[glyph];
            /* Reduced motion shows them all, immediately. */
            const revealed = reduced || step === 0 || i < step;
            return (
              <li key={glyph} className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => play(glyph)}
                  aria-label={`${meta ? (lang === "te" ? meta.name.te : meta.name.en) : glyph} — ${copy.hear[lang]}`}
                  className="group flex flex-col items-center rounded-xl px-3 py-2 transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]"
                >
                  <span
                    className="font-arabic text-6xl text-[var(--if-green)] transition-opacity duration-500 sm:text-7xl"
                    lang="ar"
                    style={{ opacity: revealed ? 1 : 0.25 }}
                  >
                    {glyph}
                  </span>
                  <span className="mt-1 flex items-center gap-1 text-xs font-semibold text-[var(--if-text-mid)]" dir="ltr">
                    <Volume2 aria-hidden="true" className="h-3 w-3 opacity-50 transition-opacity group-hover:opacity-100" />
                    {meta ? (lang === "te" ? meta.name.te : meta.name.en) : glyph}
                  </span>
                  <span className="mt-0.5 text-[11px] tabular-nums text-[var(--if-text-muted)]" dir="ltr">
                    {dots?.count === 0
                      ? lang === "te" ? "చుక్కలు లేవు" : "no dots"
                      : `${dots?.count} ${
                          dots?.below
                            ? lang === "te" ? "కింద" : "below"
                            : lang === "te" ? "పైన" : "above"
                        }`}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <p className="mt-6 text-center text-sm text-[var(--if-text-mid)]">{family.note[lang]}</p>
      </div>
    </div>
  );
}
