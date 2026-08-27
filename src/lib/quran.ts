import { readFileSync } from "node:fs";
import { join } from "node:path";
import { surahIndex } from "@/content/quran-index";

/* Reading the Quran text at build time.

   The surah files live in public/ because a reader may also want to fetch one
   directly — the Uthmani toggle does exactly that, client-side, for the one
   surah on screen. But the default text is read here, on the server, during
   the prerender, so the ayahs are in the HTML.

   That is the whole reason this is a file read and not a fetch. Someone in
   Mangalagiri on a slow connection should get the Quran in the first response,
   not a spinner that waits for JavaScript to boot and then asks for a second
   file. It also means the text is there for a crawler, and there for a reader
   whose JavaScript never arrives at all. */

export type Ayah = {
  /** Ayah number within its surah. */
  v: number;
  /** Indo-Pak Arabic. */
  ar: string;
  /** Phonetic transliteration, for a reader still learning the script. */
  tr: string;
  /** The Arabic written in Telugu letters, so it can be recited rather than
      only understood. Built by scripts/lib/telugu-translit.mjs; no published
      edition of this exists to fetch. */
  tt: string;
  /** Telugu translation, Abdul Raheem Mohammad Moulana. */
  te: string;
  /** English translation, Mufti Taqi Usmani. */
  en: string;
  /** A verse of prostration. Fifteen of them, by the classical count. */
  sajda?: true;
};

export type Surah = {
  n: number;
  ayahs: Ayah[];
  source: Record<string, string>;
};

const cache = new Map<number, Surah>();

export function loadSurah(n: number): Surah {
  const hit = cache.get(n);
  if (hit) return hit;
  const pad = String(n).padStart(3, "0");
  const file = join(process.cwd(), "public", "quran", `${pad}.json`);
  const surah = JSON.parse(readFileSync(file, "utf8")) as Surah;
  cache.set(n, surah);
  return surah;
}

/* The Bismillah is printed above a surah, EXCEPT twice.

   At-Tawbah (9) has none at all.

   Al-Fatihah (1) has one, but it is counted as ayah 1 in the numbering this
   text uses -- that is why Al-Fatihah has seven ayahs and not six. Printing
   the heading there too put the Bismillah on the page twice, one above the
   other, on the single most-read surah in the Quran. Anyone who knows it
   would see that instantly. */
export const BISMILLAH = "بِسۡمِ اللّٰهِ الرَّحۡمٰنِ الرَّحِيۡمِ";
export const hasBismillah = (n: number) => n !== 1 && n !== 9;

/* The number of a surah's first ayah counting from the start of the Quran.

   Every recitation archive keys its files 1 to 6,236 rather than by surah and
   verse, so Al-Baqarah's first ayah is file 8 and not file 2:1. Derived from
   the index rather than stored per ayah: it is a running total of numbers
   already on hand, and duplicating it into 6,236 records would be six thousand
   chances for it to disagree with itself. */
export function firstGlobalAyah(surah: number): number {
  let n = 1;
  for (let i = 0; i < surah - 1; i++) n += surahIndex[i].ayahs;
  return n;
}
