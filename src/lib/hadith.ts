import { readFileSync } from "node:fs";
import { join } from "node:path";
import { hadithCollections, type HadithCollection } from "@/content/hadith-index";
import type { Hadith } from "./hadith-grade";

export type { Hadith, GradeTone } from "./hadith-grade";
export { gradeTone, GRADE_MEANING } from "./hadith-grade";

/* Reading the hadith books at build time.

   Same reasoning as the Quran loader: the narrations go into the HTML during
   the prerender rather than being fetched, so they arrive in the first
   response and work without JavaScript.

   Unlike the Quran, these are paginated. A surah is read from its first ayah
   to its last; a book of hadith is not. Abu Dawud's Book of Prayer holds 769
   narrations and nobody scrolls it -- they look something up. So a page holds
   fifty. A hundred came to 122 KB gzipped once the Arabic and the English of
   each narration were counted, which is not a page to hand someone on a phone
   in Mangalagiri; fifty halves it. */

export const PAGE_SIZE = 50;

export type Book = {
  c: string;
  b: number;
  name: string;
  hadiths: Hadith[];
};

const cache = new Map<string, Book>();

export function loadBook(collection: string, book: number): Book | null {
  const key = `${collection}/${book}`;
  const hit = cache.get(key);
  if (hit) return hit;
  try {
    const file = join(process.cwd(), "public", "hadith", collection, `${book}.json`);
    const parsed = JSON.parse(readFileSync(file, "utf8")) as Book;
    cache.set(key, parsed);
    return parsed;
  } catch {
    return null;
  }
}

export const collectionById = new Map<string, HadithCollection>(
  hadithCollections.map((c) => [c.id, c]),
);

export const pageCount = (total: number) => Math.max(1, Math.ceil(total / PAGE_SIZE));

