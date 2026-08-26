/* Build the hadith collections into static files the site can serve.

   Run by hand, like the Quran build: `npm run hadith:build`. It fetches tens
   of megabytes and the result does not change.

   WHAT IT WRITES

   public/hadith/<collection>/<book>.json
     One file per book of each collection, so opening the Book of Belief does
     not download the Book of Sales. Each hadith carries its Arabic, its
     English, its Urdu where one exists, its grades, and its reference.

   src/content/hadith-index.ts
     Collections, their books, and how many narrations each holds. Bundled,
     because the browse page needs it before anything is opened.

   GRADES ARE NOT OPTIONAL

   Bukhari and Muslim are sahih throughout, so their hadiths carry no grade and
   need none. The four Sunan do not work that way: of Tirmidhi's 3,998
   narrations, 2,162 are graded daif -- weak -- by at least one of the scholars
   who graded them. Showing those without the grade would turn a reference into
   a hazard, and would contradict the portal's own lessons, which say in as
   many words that presenting everything as equally established is the habit to
   avoid.

   So a hadith without a grade in a collection that grades is kept, and marked
   as ungraded rather than silently presented as sound.

   THERE IS NO TELUGU

   Not in this dataset and, as far as I can find, not anywhere as open data.
   The collections come in Arabic, English, Urdu, Bengali, Turkish, Indonesian,
   French, Russian and Tamil. Urdu is carried because a good number of older
   Telugu-speaking Muslims read it.

   Telugu is deliberately left empty rather than machine-translated. A bad
   translation of an ayah is a bad translation of a text whose Arabic is fixed
   and printed beside it. A bad translation of a hadith puts words in the
   Prophet's mouth. The shape of the data has a slot for Telugu so a human
   translation can be dropped in per hadith whenever one exists. */

import { mkdirSync, writeFileSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const CDN = "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1";
const CACHE = join("node_modules", ".cache", "hadith");
const OUT = join("public", "hadith");

/* The six canonical books, the Muwatta, and the three famous forties. The
   forties are first because they are where a beginner should start: Nawawi's
   is the traditional first collection anyone is given. */
const COLLECTIONS = [
  { id: "nawawi", te: "నవవీ 40 హదీసులు", en: "Forty Hadith of an-Nawawi", urdu: false, beginner: true },
  { id: "qudsi", te: "40 హదీస్ ఖుద్సీ", en: "Forty Hadith Qudsi", urdu: false, beginner: true },
  { id: "bukhari", te: "సహీహ్ అల్-బుఖారీ", en: "Sahih al-Bukhari", urdu: false },
  { id: "muslim", te: "సహీహ్ ముస్లిం", en: "Sahih Muslim", urdu: false },
  { id: "abudawud", te: "సునన్ అబూ దావూద్", en: "Sunan Abu Dawud", urdu: false },
  { id: "tirmidhi", te: "జామి అత్-తిర్మిజీ", en: "Jami at-Tirmidhi", urdu: false },
  { id: "nasai", te: "సునన్ అన్-నసాయీ", en: "Sunan an-Nasai", urdu: false },
  { id: "ibnmajah", te: "సునన్ ఇబ్న్ మాజా", en: "Sunan Ibn Majah", urdu: false },
  { id: "malik", te: "ముఅత్తా మాలిక్", en: "Muwatta Malik", urdu: false },
];

/* Urdu is switched off in the committed output.

   The Urdu editions are excellent and 15.8 MB of them, against 18.5 MB of
   Arabic and 14.3 MB of English. Carrying all three put 50 MB of JSON in the
   repository for a translation most of this audience does not read. Flip a
   collection's `urdu` back to true and rerun if that changes; the merge code
   is still here and still works. */

/* Bukhari and Muslim are sahih by the compiler's own criterion, so a missing
   grade there means "sahih", not "unknown". Everywhere else it means the
   dataset has no grading for that narration and we must say so. */
const SAHIH_THROUGHOUT = new Set(["bukhari", "muslim", "nawawi", "qudsi"]);

async function grab(name) {
  const cached = join(CACHE, `${name}.json`);
  if (existsSync(cached)) return JSON.parse(readFileSync(cached, "utf8"));
  const res = await fetch(`${CDN}/editions/${name}.min.json`);
  if (!res.ok) return null;
  const json = await res.json();
  mkdirSync(CACHE, { recursive: true });
  writeFileSync(cached, JSON.stringify(json));
  return json;
}

const byNumber = (edition) => {
  const map = new Map();
  if (edition) for (const h of edition.hadiths) map.set(h.hadithnumber, h);
  return map;
};

/* One grade per hadith for the badge, chosen as the weakest any of the graders
   gave it. If one scholar calls a narration sahih and another calls it daif, a
   reader deciding whether to repeat it should be told the lower of the two. */
function worstGrade(grades) {
  if (!grades?.length) return null;
  const rank = (g) => {
    const s = String(g).toLowerCase();
    if (s.includes("mawdu") || s.includes("fabricat")) return 0;
    if (s.includes("daif") || s.includes("da'if") || s.includes("weak")) return 1;
    if (s.includes("hasan")) return 2;
    if (s.includes("sahih")) return 3;
    return 2;
  };
  let worst = grades[0];
  for (const g of grades) if (rank(g.grade) < rank(worst.grade)) worst = g;
  return { by: worst.name, grade: worst.grade };
}

const main = async () => {
  console.log("Hadith build\n");
  mkdirSync(OUT, { recursive: true });

  const index = [];
  let totalBytes = 0;
  let totalHadith = 0;
  let emptyDropped = 0;

  for (const col of COLLECTIONS) {
    process.stdout.write(`  ${col.id.padEnd(10)}`);
    const [ar, en, ur] = await Promise.all([
      grab(`ara-${col.id}`),
      grab(`eng-${col.id}`),
      col.urdu ? grab(`urd-${col.id}`) : Promise.resolve(null),
    ]);
    if (!en) {
      console.log(" no English edition, skipped");
      continue;
    }

    emptyDropped += en.hadiths.filter((h) => !(h.text ?? "").trim()).length;

    const arMap = byNumber(ar);
    const urMap = byNumber(ur);
    const sections = en.metadata.sections ?? {};

    mkdirSync(join(OUT, col.id), { recursive: true });

    /* Group by each hadith's own reference.book, not by the declared number
       range of each section.

       The ranges lie. In Sahih Muslim four of them overlap, so filtering by
       range put the same narration in two books and turned 7,563 hadiths into
       16,041. Tirmidhi has the same problem, and its range bounds are not even
       whole numbers -- it numbers some narrations 1234.1. Every hadith carries
       reference.book, which is one hadith's own answer to which book it is in,
       and cannot double-count by construction. */
    const grouped = new Map();
    for (const h of en.hadiths) {
      const book = h.reference?.book ?? null;
      if (book == null) continue;
      if (!grouped.has(book)) grouped.set(book, []);
      grouped.get(book).push(h);
    }

    /* Section 0 has no name in the data, and skipping it silently threw away
       720 real narrations: 306 in Bukhari, 148 in Muslim's Muqaddimah, and 266
       in Ibn Majah, among them "whatever I have commanded you, do it". They are
       hadiths that the dataset's chapter map does not place, not padding, so
       they are kept under a plain label. An-Nasai's 82 really are empty and
       drop out on the text check below. */
    const named = (num, name) =>
      name || (num === "0" ? (col.id === "muslim" ? "Introduction" : "Additional narrations") : "");

    const books = [];
    for (const [num, rawName] of Object.entries(sections)) {
      const name = named(num, rawName);
      if (!name) continue;

      const rows = (grouped.get(Number(num)) ?? [])
        /* A hadith with no text is not a hadith. */
        .filter((h) => (h.text ?? "").trim())
        .sort((a, b) => a.hadithnumber - b.hadithnumber)
        .map((h) => {
          const grade = worstGrade(h.grades);
          return {
            n: h.hadithnumber,
            ar: arMap.get(h.hadithnumber)?.text ?? "",
            en: h.text,
            ...(urMap.get(h.hadithnumber)?.text ? { ur: urMap.get(h.hadithnumber).text } : {}),
            ...(grade ? { g: grade.grade, gby: grade.by } : {}),
            ...(h.reference ? { b: h.reference.book, i: h.reference.hadith } : {}),
          };
        });
      if (!rows.length) continue;

      const file = JSON.stringify({ c: col.id, b: Number(num), name, hadiths: rows });
      writeFileSync(join(OUT, col.id, `${num}.json`), file);
      totalBytes += file.length;
      totalHadith += rows.length;

      books.push({
        n: Number(num),
        name,
        count: rows.length,
        /* How many of this book's narrations nobody in the dataset has graded.
           Shown to the reader rather than hidden. */
        ungraded: SAHIH_THROUGHOUT.has(col.id) ? 0 : rows.filter((r) => !r.g).length,
      });
    }

    index.push({
      id: col.id,
      te: col.te,
      en: col.en,
      arabic: en.metadata.name,
      beginner: col.beginner === true,
      sahihThroughout: SAHIH_THROUGHOUT.has(col.id),
      hasUrdu: Boolean(ur),
      books,
      count: books.reduce((n, b) => n + b.count, 0),
    });
    console.log(` ${books.length} books, ${index.at(-1).count} hadiths`);
  }

  const ts = `/* Generated by scripts/build-hadith.mjs -- do not edit.

   Collections and their books. The narrations themselves live in
   public/hadith/<collection>/<book>.json and are fetched when a book is
   opened.

   No Telugu: see the note at the top of the build script. The collections are
   carried in Arabic, English, and Urdu where an Urdu edition exists. */

export type HadithBookMeta = {
  n: number;
  name: string;
  count: number;
  /** Narrations in this book that no grader in the dataset has graded. */
  ungraded: number;
};

export type HadithCollection = {
  id: string;
  te: string;
  en: string;
  arabic: string;
  /** A short collection meant to be worked through, not browsed. */
  beginner: boolean;
  /** Sahih by the compiler's own criterion, so an absent grade is not a gap. */
  sahihThroughout: boolean;
  hasUrdu: boolean;
  books: HadithBookMeta[];
  count: number;
};

export const hadithCollections: HadithCollection[] = ${JSON.stringify(index, null, 0)
    .replace(/\},\{"id"/g, '},\n  {"id"')
    .replace(/^\[/, "[\n  ")
    .replace(/\]$/, ",\n]")};

export const TOTAL_HADITH = ${totalHadith};
`;
  writeFileSync(join("src", "content", "hadith-index.ts"), ts);

  console.log(
    `\n  ${index.length} collections, ${totalHadith.toLocaleString()} narrations` +
      `\n  ${Math.round(totalBytes / 1024 / 1024)} MB across ${index.reduce((n, c) => n + c.books.length, 0)} book files` +
      `\n  src/content/hadith-index.ts written`,
  );
};

main().catch((err) => {
  console.error("\nhadith build failed:", err.message);
  process.exit(1);
});
