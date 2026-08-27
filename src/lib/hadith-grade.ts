/* Grades, and what they mean to somebody who is not a scholar.

   Split out of lib/hadith.ts so a client component can import it. That file
   reads the book JSON with node:fs at build time, and pulling it into the
   browser bundle would fail the build -- which is the correct failure, since
   the filesystem is not there.

   The vocabulary is the load-bearing part of the hadith pages: of the 36,057
   narrations carried here, 5,048 are graded weak by at least one of the
   scholars who graded them. "Daif" tells a scholar something and tells
   everyone else nothing. */

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
