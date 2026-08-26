"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, MapPin, BookOpen } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { surahIndex, TOTAL_AYAHS } from "@/content/quran-index";

/* The list of all 114.

   Sorted by revelation order, by length, by juz -- every reader app offers
   those and almost nobody uses them. What a beginner actually does is one of
   two things: look for a surah they know the name of, or look for a short one
   they could finish today. So: a search box that matches Telugu, English and
   Arabic at once, and a filter for the short ones. */

const copy = {
  title: { te: "ఖురాన్ చదవండి", en: "Read the Quran" },
  sub: {
    te: "మొత్తం 114 సూరాలు, 6,236 ఆయతులు — అరబిక్, తెలుగు అర్థం, ఉచ్చారణతో",
    en: "All 114 surahs and 6,236 ayahs — Arabic, Telugu meaning and pronunciation",
  },
  search: { te: "సూరా పేరు లేదా సంఖ్య", en: "Surah name or number" },
  all: { te: "అన్నీ", en: "All" },
  short: { te: "చిన్నవి (20 ఆయతుల లోపు)", en: "Short (under 20 ayahs)" },
  makkah: { te: "మక్కా", en: "Makkan" },
  madinah: { te: "మదీనా", en: "Madinan" },
  ayahs: { te: "ఆయతులు", en: "ayahs" },
  none: { te: "ఏమీ దొరకలేదు", en: "Nothing matched" },
  showing: { te: "చూపిస్తున్నవి", en: "Showing" },
  of: { te: "మొత్తంలో", en: "of" },
};

type Filter = "all" | "short" | "makkah" | "madinah";

export function SurahList() {
  const { lang } = useI18n();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return surahIndex.filter((s) => {
      if (filter === "short" && s.ayahs >= 20) return false;
      if (filter === "makkah" && s.revealed !== "makkah") return false;
      if (filter === "madinah" && s.revealed !== "madinah") return false;
      if (!needle) return true;
      /* Number, Telugu, English, the meaning, and the Arabic all match. A
         reader who types "36" and a reader who types "యాసీన్" are looking for
         the same surah. */
      return (
        String(s.n) === needle ||
        s.te.toLowerCase().includes(needle) ||
        s.en.toLowerCase().includes(needle) ||
        s.meaning.toLowerCase().includes(needle) ||
        s.ar.includes(q.trim())
      );
    });
  }, [q, filter]);

  const filters: { id: Filter; label: { te: string; en: string } }[] = [
    { id: "all", label: copy.all },
    { id: "short", label: copy.short },
    { id: "makkah", label: copy.makkah },
    { id: "madinah", label: copy.madinah },
  ];

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--if-text-muted)]"
          />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={copy.search[lang]}
            aria-label={copy.search[lang]}
            className="min-h-11 w-full rounded-full border border-[var(--if-gold)]/30 bg-white pl-10 pr-4 text-sm text-[var(--if-text)] outline-none transition-colors placeholder:text-[var(--if-text-muted)] focus-visible:border-[var(--if-gold)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]"
          />
        </div>
        <div className="if-tabstrip flex gap-2 overflow-x-auto">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              aria-pressed={filter === f.id}
              className={`min-h-11 shrink-0 rounded-full px-4 text-sm font-semibold transition-colors ${
                filter === f.id
                  ? "bg-[var(--if-green)] text-[var(--if-gold-light)]"
                  : "bg-white text-[var(--if-text-mid)] hover:bg-[var(--if-cream)]"
              }`}
            >
              {f.label[lang]}
            </button>
          ))}
        </div>
      </div>

      <p className="mb-4 text-xs text-[var(--if-text-muted)]" aria-live="polite">
        {copy.showing[lang]} <span className="tabular-nums font-semibold">{shown.length}</span>{" "}
        {copy.of[lang]} <span className="tabular-nums">{surahIndex.length}</span> · {TOTAL_AYAHS.toLocaleString()}{" "}
        {copy.ayahs[lang]}
      </p>

      {shown.length === 0 ? (
        <p className="py-12 text-center text-[var(--if-text-muted)]">{copy.none[lang]}</p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((s) => (
            <li key={s.n}>
              <Link
                href={`/knowledge-center/learn-quran/read/${s.n}`}
                className="group flex h-full items-center gap-3 rounded-xl border border-[var(--if-gold)]/20 bg-white p-3 transition-colors hover:border-[var(--if-gold)]/60 hover:bg-[color-mix(in_srgb,var(--if-gold)_6%,white)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--if-green)] text-sm font-bold tabular-nums text-[var(--if-gold-light)]">
                  {s.n}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="truncate font-display font-bold text-[var(--if-green)]">
                      {lang === "te" ? s.te : s.en}
                    </span>
                    <span className="font-arabic shrink-0 text-lg text-[var(--if-gold-ink)]" lang="ar" dir="rtl">
                      {s.ar}
                    </span>
                  </span>
                  <span className="mt-0.5 flex items-center gap-2 text-xs text-[var(--if-text-muted)]">
                    <span className="inline-flex items-center gap-1">
                      <MapPin aria-hidden="true" className="h-3 w-3" />
                      {s.revealed === "makkah" ? copy.makkah[lang] : copy.madinah[lang]}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1 tabular-nums">
                      <BookOpen aria-hidden="true" className="h-3 w-3" />
                      {s.ayahs}
                    </span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
