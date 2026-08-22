/* Upcoming events for the homepage.

   Lives outside the component so tests/content.spec.ts can import it without
   pulling in React. `on` is the machine-readable date behind the display
   string; nothing renders it. It exists so a dated event that has slipped into
   the past fails the build. This list carried a January 2025 medical camp and
   a July 2026 admissions deadline under "Upcoming Events" long after both had
   passed, and a guard is cheaper than remembering to check.

   Standing items with no fixed date use null and are exempt.

   The medical camp runs on a six-month cycle, which `repeats` states outright
   so the rhythm is legible even when a specific date drifts. */

type Bi = { te: string; en: string };

export type SiteEvent = {
  title: Bi;
  /** ISO date, or null for a standing item with no fixed date. */
  on: string | null;
  repeats: Bi | null;
  date: Bi;
  time: Bi;
  venue: Bi;
};

export const events: SiteEvent[] = [
  { title: { te: "వైద్య శిబిరం", en: "Medical Camp" }, on: "2026-09-20",
    repeats: { te: "ప్రతి 6 నెలలకు", en: "Every 6 months" },
    date: { te: "సెప్టెంబర్ 2026", en: "Sept 2026" }, time: { te: "ఉ. 9–మ. 1", en: "9am–1pm" }, venue: { te: "అంజుమన్ హాల్", en: "Anjuman Hall" } },
  { title: { te: "వైద్య శిబిరం", en: "Medical Camp" }, on: "2027-03-21",
    repeats: { te: "ప్రతి 6 నెలలకు", en: "Every 6 months" },
    date: { te: "మార్చి 2027", en: "March 2027" }, time: { te: "ఉ. 9–మ. 1", en: "9am–1pm" }, venue: { te: "అంజుమన్ హాల్", en: "Anjuman Hall" } },
  { title: { te: "మదరసా అడ్మిషన్లు 2027–28", en: "Madrasa Admissions 2027–28" }, on: "2027-07-01", repeats: null,
    date: { te: "జూలై 1, 2027", en: "July 1, 2027" }, time: { te: "దరఖాస్తు గడువు", en: "Apply by" }, venue: { te: "ఆన్‌లైన్ / అంజుమన్", en: "Online / Anjuman" } },
  { title: { te: "కుట్టు శిక్షణ కొత్త బ్యాచ్", en: "Stitching Training New Batch" }, on: null, repeats: null,
    date: { te: "కొనసాగుతోంది", en: "Ongoing" }, time: { te: "18+ మహిళలకు", en: "For women 18+" }, venue: { te: "శిక్షణ కేంద్రం", en: "Training Centre" } },
  { title: { te: "స్కాలర్‌షిప్ దరఖాస్తులు 2026–27", en: "Scholarship Applications 2026–27" }, on: null, repeats: null,
    date: { te: "ఇప్పుడు తెరిచి ఉంది", en: "Open Now" }, time: { te: "10 సీట్లు", en: "10 seats" }, venue: { te: "అంజుమన్ కార్యాలయం", en: "Anjuman Office" } },
];
