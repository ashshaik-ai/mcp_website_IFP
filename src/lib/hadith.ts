import { readFileSync } from "node:fs";
import { join } from "node:path";
import { hadithCollections, type HadithCollection } from "@/content/hadith-index";

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

export type Hadith = {
  /** Number within its collection. */
  n: number;
  ar: string;
  en: string;
  /** Urdu, when the build was run with it switched on. */
  ur?: string;
  /** The weakest grade any of the graders gave it, and who gave it. */
  g?: string;
  gby?: string;
  /** Book and hadith-within-book, as printed editions cite it. */
  b?: number;
  i?: number;
};

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

/* How a grade should read to someone deciding whether to repeat a narration.

   Not a colour and a word: a colour, a word, and what it means. "Daif" tells
   a scholar something and tells everyone else nothing, and the whole point of
   showing the grade is that the reader understands what they are holding. */
export type GradeTone = "sahih" | "hasan" | "daif" | "mawdu" | "none";

export function gradeTone(grade?: string): GradeTone {
  if (!grade) return "none";
  const s = grade.toLowerCase();
  if (s.includes("mawdu") || s.includes("fabricat")) return "mawdu";
  if (s.includes("daif") || s.includes("da'if") || s.includes("weak")) return "daif";
  if (s.includes("hasan")) return "hasan";
  if (s.includes("sahih")) return "sahih";
  return "none";
}

export const GRADE_MEANING: Record<GradeTone, { te: string; en: string }> = {
  sahih: { te: "సహీహ్ — ప్రామాణికం", en: "Sahih — sound" },
  hasan: { te: "హసన్ — ఆమోదయోగ్యం", en: "Hasan — good" },
  daif: {
    te: "దయీఫ్ — బలహీనం. దీన్ని ప్రవక్త ﷺ మాటగా ఖచ్చితంగా చెప్పకండి.",
    en: "Daif — weak. Do not quote this as an established saying of the Prophet ﷺ.",
  },
  mawdu: {
    te: "మౌదూ — కల్పితం. దీన్ని ఉల్లేఖించకూడదు.",
    en: "Mawdu — fabricated. It should not be narrated.",
  },
  none: { te: "శ్రేణి ఇవ్వబడలేదు", en: "No grade recorded" },
};
