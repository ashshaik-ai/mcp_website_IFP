/* Which drawing belongs in which lesson.

   Hand-curated, not generated: a lesson on tawaf should show the circuit
   around the Kaaba and nothing else, and no script can work that out. Each
   entry names the simulation array to draw from and the step ids to keep, so
   the lesson gets its own part of the sequence rather than the whole thing.

   `steps: []` means the whole sequence, which is right where the lesson is
   about the sequence itself.

   Portals are filled in as each one is audited. A lesson with no entry simply
   shows no visual, which is what every lesson did before. */

export type Bi = { te: string; en: string };

export type LessonVisualSpec = {
  /** An exported array from src/content/simulations.ts. */
  source: string;
  /** Step ids to keep, in the order the array has them. Empty means all. */
  steps: string[];
  /** Overrides the portal's default scene, where a portal has two. */
  scene?: "wudu" | "salah";
  /** Heading above the player, when "Watch it" is not specific enough. */
  title?: Bi;
};

const visuals: Record<string, LessonVisualSpec> = {
  /* ── Hadith ────────────────────────────────────────────────────────────
     The chain is the subject of the second lesson, and the sixth-books lesson
     is where the collectors at the end of that chain are named. */
  "hadith/how-it-was-checked": {
    source: "isnadSteps",
    steps: [],
    title: { te: "ఉల్లేఖన శృంఖల — చూడండి", en: "The chain of narration" },
  },
  "hadith/the-six-books": {
    source: "isnadSteps",
    steps: [],
    title: { te: "ప్రవక్త ﷺ నుండి గ్రంథకర్త వరకు", en: "From the Prophet ﷺ to the compiler" },
  },

  /* ── Hajj & Umrah ─────────────────────────────────────────────────────
     Each lesson gets the rites it teaches, not the whole journey. */
  "hajj-umrah/ihram": {
    source: "hajjSteps",
    steps: ["ihram"],
    title: { te: "ఇహ్రామ్", en: "Entering ihram" },
  },
  "hajj-umrah/tawaf-sai": {
    source: "hajjSteps",
    steps: ["tawaf", "sai"],
    title: { te: "తవాఫ్ మరియు సఈ", en: "Tawaf and Sa'i" },
  },
  "hajj-umrah/days-of-hajj": {
    source: "hajjSteps",
    steps: ["mina", "arafah", "muzdalifah", "rami", "sacrifice", "halq", "tawaf-ifadah", "tawaf-wida"],
    title: { te: "ఐదు రోజులు — దశల వారీగా", en: "The five days, rite by rite" },
  },
  "hajj-umrah/umrah": {
    source: "umrahSteps",
    steps: [],
    title: { te: "ఉమ్రహ్ — నాలుగు దశలు", en: "Umrah, in four rites" },
  },
};

export function lessonVisual(portal: string, slug: string): LessonVisualSpec | null {
  return visuals[`${portal}/${slug}`] ?? null;
}
