"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { ReviewDeck, type ReviewCard } from "./ReviewDeck";
import type { Letter } from "@/content/alphabets";
import type { VocabWord } from "@/content/vocabulary";

const copy = {
  heading: { te: "పునరావృత్తి", en: "Review" },
  letters: { te: "అక్షరాలు", en: "Letters" },
  words: { te: "పదాలు", en: "Words" },
} as const;

/* Two decks per portal, scheduled independently: letters and vocabulary are
   different recall tasks and mixing them would let progress on the easier one
   mask the harder. */
export function LetterReview({
  script,
  letters,
  words,
}: {
  script: "arabic" | "urdu";
  letters: Letter[];
  words: VocabWord[];
}) {
  const { lang } = useI18n();
  const [tab, setTab] = useState<"letters" | "words">("letters");

  const glyphFont = script === "urdu" ? "font-urdu" : "font-arabic";
  const glyphLang = script === "urdu" ? "ur" : "ar";

  const letterCards = useMemo<ReviewCard[]>(
    () =>
      letters.map((l) => ({
        id: `${script}-letter-${l.glyph}`,
        front: l.glyph,
        back: l.name[lang],
        hint: l.translit,
        audio: l.audio,
        frontClass: glyphFont,
        frontLang: glyphLang,
      })),
    [letters, lang, script, glyphFont, glyphLang],
  );

  const wordCards = useMemo<ReviewCard[]>(
    () =>
      words.map((w) => ({
        id: `${script}-word-${w.glyph}`,
        front: w.glyph,
        back: w.meaning[lang],
        hint: w.translit,
        frontClass: glyphFont,
        frontLang: glyphLang,
      })),
    [words, lang, script, glyphFont, glyphLang],
  );

  const tabs = [
    { key: "letters" as const, label: copy.letters[lang], count: letterCards.length },
    { key: "words" as const, label: copy.words[lang], count: wordCards.length },
  ];

  return (
    <section id="review" className="py-16 px-4 scroll-mt-24">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-display text-2xl font-bold text-[var(--if-green)] mb-4">
          {copy.heading[lang]}
        </h2>

        <div role="tablist" aria-label={copy.heading[lang]} className="flex gap-2 mb-5">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              role="tab"
              id={`review-tab-${t.key}`}
              aria-selected={tab === t.key}
              aria-controls={`review-panel-${t.key}`}
              onClick={() => setTab(t.key)}
              className={`min-h-11 px-4 rounded-full text-sm font-semibold border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)] ${
                tab === t.key
                  ? "bg-[var(--if-green)] text-[var(--if-gold-light)] border-transparent"
                  : "bg-white border-[var(--if-gold)]/20 text-[var(--if-text-muted)] hover:border-[var(--if-gold)]/60"
              }`}
            >
              {t.label}
              <span className="ml-1.5 text-xs">({t.count})</span>
            </button>
          ))}
        </div>

        {tabs.map((t) => (
          <div
            key={t.key}
            role="tabpanel"
            id={`review-panel-${t.key}`}
            aria-labelledby={`review-tab-${t.key}`}
            hidden={tab !== t.key}
          >
            {tab === t.key && (
              <ReviewDeck
                name={`${script}-${t.key}`}
                cards={t.key === "letters" ? letterCards : wordCards}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
