/* Build a compact search index over everything the site holds.

   The content modules total well over half a megabyte, so importing them into
   a search component would ship all of it to every page. Instead this emits a
   flat index to public/search-index.json, fetched once when a visitor first
   opens search.

   Run automatically before build via the prebuild script.
*/
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public/search-index.json");

const { routes } = await import("../src/lib/site.ts");
const { lessons } = await import("../src/content/lessons.ts");
const { arabicWords, urduWords, arabicPhrases, urduPhrases } = await import(
  "../src/content/vocabulary.ts"
);
const { arabicLetters, urduLetters } = await import("../src/content/alphabets.ts");
const {
  seerahEvents,
  seerahCharacter,
  historyPeople,
  historyEmpires,
  historyCities,
  kidsProphets,
} = await import("../src/content/portals.ts");
const { guidanceCards } = await import("../src/content/student-guidance.ts");

/** Trim to keep the payload small; the body is only used for matching. */
const clip = (s, n = 160) => (s || "").replace(/\s+/g, " ").trim().slice(0, n);

const entries = [];
const add = (e) => {
  if (e.title?.en || e.title?.te) entries.push(e);
};

for (const r of routes) {
  add({
    kind: "page",
    url: r.path,
    title: { te: r.title.te, en: r.title.en },
    body: { te: clip(r.description.te), en: clip(r.description.en) },
  });
}

/* Tools and named sections are not pages, so nothing else in this index
   reaches them — searching "zakat" returned nothing at all before this. */
const TOOLS = [
  {
    url: "/knowledge-center#zakat",
    title: { te: "జకాత్ కాలిక్యులేటర్", en: "Zakat Calculator" },
    body: {
      te: "బంగారం, వెండి, నగదు మీద నిసాబ్ మరియు 2.5% జకాత్ లెక్కించండి.",
      en: "Work out nisab and 2.5% Zakat on gold, silver, cash and business assets.",
    },
    extra: "zakat nisab gold silver cash charity sadaqah calculator",
  },
  {
    url: "/knowledge-center#prayer-times",
    title: { te: "నమాజు సమయాలు", en: "Prayer Times" },
    body: {
      te: "మంగళగిరి కోసం నేటి ఐదు నమాజ్ సమయాలు మరియు తదుపరి నమాజ్ కౌంట్‌డౌన్.",
      en: "Today's five prayer times for Mangalagiri with a next-prayer countdown.",
    },
    extra: "salah namaz fajr dhuhr asr maghrib isha prayer times qibla",
  },
  {
    url: "/student-guidance",
    title: { te: "కెరీర్ మార్గాలు వెతకండి", en: "Find career pathways" },
    body: {
      te: "10వ తరగతి తర్వాత 79 కెరీర్ మార్గాలు — ప్రవేశ పరీక్షలు మరియు స్కాలర్‌షిప్‌లతో.",
      en: "79 career pathways after 10th, with entrance exams and scholarships.",
    },
    extra: "career job course college mpc bipc commerce arts scholarship",
  },
];
for (const t of TOOLS) add({ kind: "tool", ...t });

for (const l of lessons) {
  add({
    kind: "lesson",
    url: `/knowledge-center/${l.portal}/${l.slug}`,
    title: l.title,
    body: {
      te: clip(l.intro?.te || l.summary?.te),
      en: clip(l.intro?.en || l.summary?.en),
    },
    // Section headings make a lesson findable by what it covers, not just its title.
    extra: l.sections
      .map((s) => `${s.heading?.en ?? ""} ${s.heading?.te ?? ""}`)
      .join(" ")
      .slice(0, 240),
  });
}

const vocab = [
  ["learn-arabic", arabicWords, arabicPhrases, arabicLetters],
  ["learn-urdu", urduWords, urduPhrases, urduLetters],
];
for (const [portal, words, phrases, letters] of vocab) {
  for (const w of words) {
    add({
      kind: "word",
      url: `/knowledge-center/${portal}#vocabulary`,
      title: { te: w.meaning.te, en: w.meaning.en },
      body: { te: clip(w.note.te, 110), en: clip(w.note.en, 110) },
      extra: `${w.glyph} ${w.translit}`,
    });
  }
  for (const p of phrases) {
    add({
      kind: "phrase",
      url: `/knowledge-center/${portal}#vocabulary`,
      title: { te: p.meaning.te, en: p.meaning.en },
      body: { te: "", en: "" },
      extra: `${p.glyph} ${p.translit.en}`,
    });
  }
  for (const l of letters) {
    add({
      kind: "letter",
      url: `/knowledge-center/${portal}`,
      title: { te: l.name.te, en: l.name.en },
      body: { te: clip(l.note.te, 110), en: clip(l.note.en, 110) },
      extra: `${l.glyph} ${l.translit}`,
    });
  }
}

const narrative = [
  ["seerah", seerahEvents],
  ["seerah", seerahCharacter],
  ["islamic-history", historyPeople],
  ["islamic-history", historyEmpires],
  ["islamic-history", historyCities],
  ["kids-islam", kidsProphets],
];
for (const [portal, set] of narrative) {
  for (const e of set) {
    const title = e.title;
    if (!title || typeof title === "string") continue;
    const body = e.s ?? e.bio ?? e.sum ?? e.imp ?? e.ex ?? e.rise ?? null;
    add({
      kind: "topic",
      url: `/knowledge-center/${portal}`,
      title,
      body: {
        te: clip(typeof body === "object" ? body.te : "", 120),
        en: clip(typeof body === "object" ? body.en : "", 120),
      },
      extra: typeof e.arabic === "string" ? e.arabic : "",
    });
  }
}

for (const c of guidanceCards) {
  add({
    kind: "career",
    url: `/student-guidance#${c.section}`,
    title: c.title,
    body: { te: clip(c.summary.te, 120), en: clip(c.summary.en, 120) },
    extra: c.search,
  });
}

/* A duplicate title pointing at the same URL is noise in a result list. */
const seen = new Set();
const deduped = entries.filter((e) => {
  const key = `${e.url}|${e.title.en}|${e.title.te}`;
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(deduped), "utf8");

const byKind = deduped.reduce((a, e) => ({ ...a, [e.kind]: (a[e.kind] ?? 0) + 1 }), {});
const kb = Math.round(fs.statSync(OUT).size / 1024);
console.log(`Wrote public/search-index.json — ${deduped.length} entries, ${kb} KB`);
console.log(
  "  " +
    Object.entries(byKind)
      .sort((a, b) => b[1] - a[1])
      .map(([k, n]) => `${k} ${n}`)
      .join(" · "),
);
