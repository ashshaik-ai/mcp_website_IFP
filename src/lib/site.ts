/* One route catalog, used by per-page metadata, the sitemap, and JSON-LD.
   Titles and descriptions are the real on-page h1 and hero copy, so metadata
   and content cannot drift apart. Previously all 15 routes inherited a single
   metadata block, which read to a crawler as fifteen copies of one page. */

export const SITE_NAME = "Islamic Front Mangalagiri";

/* The origin canonicals, og:url and the sitemap are built from.

   This defaulted to islamicfrontmangalagiri.com, which was wrong in a way that
   actively hurt: that domain currently serves a different, much older static
   site, so every page here was telling crawlers the real version of itself
   lived somewhere else. A canonical pointing at other content is worse than
   no canonical at all.

   It now resolves to wherever the site is actually deployed. Vercel exposes
   the production domain at build time, so canonicals stay self-consistent
   without configuration. Set NEXT_PUBLIC_SITE_URL to override — that is the
   one line to change when the custom domain is pointed at this site. */
const deployedOrigin =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const SITE_URL = deployedOrigin.replace(/\/$/, "");

export type Bi = { te: string; en: string };

export type RouteMeta = {
  path: string;
  title: Bi;
  description: Bi;
  /** Sitemap weighting. The homepage and the two hubs carry the most. */
  priority: number;
};

export const routes: RouteMeta[] = [
  {
    path: "/",
    title: { te: "ఇస్లామిక్ ఫ్రంట్", en: "Islamic Front" },
    description: {
      te: "2011 నుండి మంగళగిరి ముస్లిం సమాజానికి సేవ చేస్తున్నాం — సమాజ సంక్షేమం, విద్య మరియు పౌర భాగస్వామ్యం.",
      en: "Serving the Muslim community of Mangalagiri since 2011 — community welfare, education and civic participation.",
    },
    priority: 1.0,
  },
  {
    path: "/knowledge-center",
    title: { te: "ఇస్లామిక్ జ్ఞాన కేంద్రం", en: "Islamic Knowledge Center" },
    description: {
      te: "ఉచిత, బహుభాషా ఇస్లామిక్ అభ్యాసం — ఖురాన్, నమాజ్, సీరహ్, చరిత్ర మరియు భాషలు మీ స్వంత వేగంతో నేర్చుకోండి.",
      en: "Free, multilingual Islamic learning — Quran, Salah, Seerah, history and languages, studied at your own pace.",
    },
    priority: 0.9,
  },
  {
    path: "/student-guidance",
    title: { te: "విద్యార్థి మార్గదర్శి", en: "Student Guidance" },
    description: {
      te: "10వ తరగతి తర్వాత మీ నిజమైన ఎంపికలు — 79 కెరీర్ మార్గాలు, ప్రవేశ పరీక్షలు, ప్రభుత్వ ఉద్యోగాలు మరియు స్కాలర్‌షిప్‌లు.",
      en: "Your real options after 10th — 79 career pathways, entrance exams, government jobs and scholarships.",
    },
    priority: 0.9,
  },
  {
    path: "/knowledge-center/kids-islam",
    title: { te: "పిల్లల ఇస్లాం", en: "Kids Islam" },
    description: {
      te: "వయస్సు 5–15 · ఆటాడుతూ నేర్చుకోండి — విశ్వాసాలు, మంచి అలవాట్లు, దుఆలు మరియు ప్రవక్తల కథలు.",
      en: "Ages 5–15 · learn through play — beliefs, manners, duas and prophet stories.",
    },
    priority: 0.8,
  },
  {
    path: "/knowledge-center/learn-quran",
    title: { te: "ఖురాన్ నేర్చుకోండి", en: "Learn Quran" },
    description: {
      te: "పఠనం → తజ్వీద్ → తఫ్సీర్ → హిఫ్జ్ — పూర్తి 4-దశల ప్రయాణం.",
      en: "Reading → Tajweed → Tafseer → Hifz — a complete four-stage journey.",
    },
    priority: 0.8,
  },
  {
    path: "/knowledge-center/learn-salah",
    title: { te: "నమాజ్ నేర్చుకోండి", en: "Learn Salah" },
    description: {
      te: "వుజూ నుండి సలాం వరకు — పూర్తి నమాజ్ మార్గదర్శి, అరబిక్ పఠనాలు మరియు తెలుగు అర్థాలతో.",
      en: "From Wudu to Salam — a complete prayer guide with Arabic recitations and translations.",
    },
    priority: 0.8,
  },
  {
    path: "/knowledge-center/seerah",
    title: { te: "సీరత్-అన్-నబవియ్యహ్", en: "Seerah an-Nabawiyyah" },
    description: {
      te: "ప్రవక్త ముహమ్మద్ ﷺ జీవిత చరిత్ర — 10-దశల దృశ్య కాలపట్టిక, స్వభావ అకాడమీ మరియు నాయకత్వ పాఠాలు.",
      en: "Life of Prophet Muhammad ﷺ — a 10-stage visual timeline, Character Academy and Leadership Lessons.",
    },
    priority: 0.8,
  },
  {
    path: "/knowledge-center/islamic-history",
    title: { te: "ఇస్లామిక్ చరిత్ర", en: "Islamic History" },
    description: {
      te: "రాషిదీన్ నుండి నేటి వరకు — 6 యుగాల ఇస్లామిక్ నాగరికత, పండితులు మరియు ఆధునిక పాఠాలు.",
      en: "From the Rashidun to today — six eras of Islamic civilisation, its scholars and modern lessons.",
    },
    priority: 0.8,
  },
  {
    path: "/knowledge-center/learn-arabic",
    title: { te: "అరబిక్ నేర్చుకోండి", en: "Learn Arabic" },
    description: {
      te: "అక్షరమాల నుండి ఖురానిక్ అరబిక్ వరకు — నిర్మాణాత్మక అభ్యాస మార్గం.",
      en: "From the alphabet to Quranic Arabic — a structured learning roadmap.",
    },
    priority: 0.8,
  },
  {
    path: "/knowledge-center/learn-urdu",
    title: { te: "ఉర్దూ నేర్చుకోండి", en: "Learn Urdu" },
    description: {
      te: "ఇస్లామిక్ సాహిత్యం మరియు ఖురాన్ అనువాదాల భాష — నస్తలీఖ్ లిపి నేర్చుకోండి.",
      en: "The language of Islamic literature and Quranic translation — learn the Nastaliq script.",
    },
    priority: 0.8,
  },
  {
    path: "/knowledge-center/names-of-allah",
    title: { te: "అల్లాహ్ యొక్క 99 పేర్లు", en: "99 Names of Allah" },
    description: {
      te: "అస్మాఉల్ హుస్నా — అల్లాహ్ యొక్క సుందర నామాలు, వాటి అర్థాలు మరియు కంఠస్థ సహాయం.",
      en: "Al-Asmaa ul-Husna — Allah's beautiful names, their meanings and memorisation support.",
    },
    priority: 0.7,
  },
  {
    path: "/knowledge-center/islamic-calendar",
    title: { te: "ఇస్లామిక్ కాలెండర్", en: "Islamic Calendar" },
    description: {
      te: "హిజ్రీ కాలెండర్ — 12 ఇస్లామిక్ నెలలు, ముఖ్యమైన తేదీలు మరియు వాటి అర్థాలు.",
      en: "The Hijri calendar — twelve Islamic months, key dates and what they mean.",
    },
    priority: 0.7,
  },
  {
    path: "/knowledge-center/hadith",
    title: { te: "హదీసు", en: "Hadith" },
    description: {
      te: "ప్రవక్త ﷺ మాటలు — ముఖ్యమైన హదీసులు మూలంతో, స్థాయితో; ఆరు గ్రంథాలు; ఉల్లేఖనలు ఎలా పరిశీలించబడ్డాయి.",
      en: "The words of the Prophet ﷺ: essential hadith with source and grade, the six collections, and how narrations were checked.",
    },
    priority: 0.7,
  },
  {
    path: "/knowledge-center/hajj-umrah",
    title: { te: "హజ్ మరియు ఉమ్రహ్", en: "Hajj and Umrah" },
    description: {
      te: "ఇస్లాం 5వ స్తంభం — పూర్తి హజ్ మార్గదర్శి, ఉమ్రహ్ వివరాలు మరియు ఇహ్రామ్ నియమాలు.",
      en: "The fifth pillar — a complete Hajj guide, Umrah details and the rules of Ihram.",
    },
    priority: 0.7,
  },
  {
    path: "/knowledge-center/special-prayers",
    title: { te: "ప్రత్యేక నమాజులు", en: "Special Prayers" },
    description: {
      te: "తహజ్జుద్ నుండి ఇస్తిఖారా వరకు — 5 ముఖ్యమైన నఫిల్ మరియు సాంఘిక నమాజులు.",
      en: "From Tahajjud to Istikhara — five key voluntary and congregational prayers.",
    },
    priority: 0.7,
  },
  {
    path: "/knowledge-center/womens-guidance",
    title: { te: "మహిళల మార్గదర్శనం", en: "Women's Guidance" },
    description: {
      te: "హక్కులు, నమాజ్, హిజాబ్ మరియు కుటుంబం — ఇస్లాంలో మహిళకు ఇచ్చిన గౌరవ స్థానం.",
      en: "Rights, prayer, hijab and family — the honoured status of women in Islam.",
    },
    priority: 0.7,
  },
];

export const routeByPath = new Map(routes.map((r) => [r.path, r]));

/* The site is Telugu-first (html lang="te"), so Telugu leads the title and the
   English name follows for search results and shares in either language. */
/* Titles and descriptions for a Telugu-first site.

   Both used to carry both languages in full, which put 81 of 94 titles over
   the 60-character limit and 64 of 94 descriptions over 155 — a search
   result showed the Telugu, then a truncated English, then nothing that
   said which page it was. The descriptions also led in English on a site
   whose default language is Telugu.

   So Telugu leads and English is appended only when the whole thing still
   fits. Every Telugu title on this site is distinct, so dropping the English
   half never makes two pages collide. */
const TITLE_LIMIT = 60;
const DESC_LIMIT = 155;

export function metaTitle(r: RouteMeta): string {
  const org = r.path === "/" ? "Mangalagiri" : SITE_NAME;
  const base = `${r.title.te} — ${org}`;
  const full = `${r.title.te} | ${r.title.en} — ${org}`;
  return full.length <= TITLE_LIMIT ? full : base;
}

export function metaDescription(r: RouteMeta): string {
  const te = r.description.te.trim();
  const both = `${te} ${r.description.en.trim()}`.trim();
  if (both.length <= DESC_LIMIT) return both;
  if (te.length <= DESC_LIMIT) return te;
  /* Cut on a word boundary rather than mid-word. */
  const cut = te.slice(0, DESC_LIMIT - 1);
  const sp = cut.lastIndexOf(" ");
  return `${sp > DESC_LIMIT * 0.6 ? cut.slice(0, sp) : cut}…`;
}
