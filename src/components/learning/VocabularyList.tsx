"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import type { Phrase, VocabWord } from "@/content/vocabulary";
import { foldSearch } from "@/lib/search-text";

const copy = {
  searchLabel: { te: "పదం వెతకండి", en: "Search words" },
  placeholder: { te: "ఉదా: కరుణ, rahmat, صبر", en: "e.g. mercy, sabr, صبر" },
  clear: { te: "క్లియర్ చేయండి", en: "Clear search" },
  words: { te: "పదాలు", en: "words" },
  none: { te: "ఫలితాలు లేవు. వేరే పదం ప్రయత్నించండి.", en: "No matches. Try a different term." },
  phrases: { te: "రోజువారీ వాక్యాలు", en: "Everyday phrases" },
} as const;

export function VocabularyList({
  words,
  phrases,
  script,
}: {
  words: VocabWord[];
  phrases?: Phrase[];
  script: "arabic" | "urdu";
}) {
  const { lang } = useI18n();
  const [query, setQuery] = useState("");

  const glyphFont = script === "urdu" ? "font-urdu" : "font-arabic";
  const glyphLang = script === "urdu" ? "ur" : "ar";

  const filtered = useMemo(() => {
    /* Folded on both sides: the glyphs carry harakat and queries do not. */
    const q = foldSearch(query.trim());
    if (!q) return words;
    return words.filter((w) =>
      foldSearch([w.glyph, w.translit, w.meaning.te, w.meaning.en, w.note.te, w.note.en].join(" ")).includes(q),
    );
  }, [words, query]);

  return (
    <div>
      <label className="relative block max-w-md mb-6">
        <span className="sr-only">{copy.searchLabel[lang]}</span>
        <Search
          aria-hidden="true"
          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--if-text-muted)]"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={copy.placeholder[lang]}
          /* 16px minimum, or iOS Safari zooms the page on focus. */
          className="w-full min-h-11 pl-9 pr-10 text-base rounded-full bg-white border border-[var(--if-gold)]/25 text-[var(--if-text)] placeholder:text-[var(--if-text-muted)]/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label={copy.clear[lang]}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 inline-flex items-center justify-center min-h-9 min-w-9 rounded-full hover:bg-[var(--if-gold)]/10"
          >
            <X aria-hidden="true" className="h-4 w-4 text-[var(--if-text-muted)]" />
          </button>
        )}
      </label>

      <p className="text-sm text-[var(--if-text-muted)] mb-4" aria-live="polite">
        {filtered.length} {copy.words[lang]}
      </p>

      {filtered.length === 0 ? (
        <p className="text-center text-[var(--if-text-muted)] py-12">{copy.none[lang]}</p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {filtered.map((w) => (
            <li
              key={`${w.glyph}-${w.translit}`}
              className="rounded-2xl border border-[var(--if-gold)]/15 bg-white p-4 hover:border-[var(--if-gold)]/40 transition-colors"
            >
              <div className="flex items-baseline justify-between gap-3 flex-wrap">
                <span
                  dir="rtl"
                  lang={glyphLang}
                  className={`${glyphFont} text-2xl text-[var(--if-green)] leading-tight`}
                >
                  {w.glyph}
                </span>
                <span className="font-mono text-xs text-[var(--if-text-muted)]">{w.translit}</span>
              </div>
              <p className="mt-1.5 font-semibold text-[var(--if-text)]">{w.meaning[lang]}</p>
              {w.note[lang] && (
                <p className="mt-2 text-sm text-[var(--if-text-muted)] text-pretty">
                  {w.note[lang]}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}

      {phrases && phrases.length > 0 && !query && (
        <div className="mt-10">
          <h3 className="font-display text-lg font-bold text-[var(--if-green)] mb-4">
            {copy.phrases[lang]}
          </h3>
          <ul className="grid gap-3">
            {phrases.map((p) => (
              <li
                key={p.glyph}
                className="rounded-2xl border border-[var(--if-gold)]/15 bg-[var(--if-cream-light)] p-4"
              >
                <span
                  dir="rtl"
                  lang={glyphLang}
                  className={`${glyphFont} block text-xl text-[var(--if-green)] leading-relaxed`}
                >
                  {p.glyph}
                </span>
                <p className="mt-1 font-mono text-xs text-[var(--if-text-muted)]">
                  {p.translit[lang]}
                </p>
                <p className="mt-1.5 text-sm text-[var(--if-text)] text-pretty">
                  {p.meaning[lang]}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
