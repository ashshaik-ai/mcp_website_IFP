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
  scene?: "wudu" | "salah" | "moon" | "letters";
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

  /* ── Islamic Calendar ─────────────────────────────────────────────────
     The month is a shape in the sky, and the lessons describe it in words. */
  "islamic-calendar/how-it-works": {
    source: "moonSteps",
    steps: ["new", "crescent", "first-quarter", "full", "last-quarter", "old"],
    title: { te: "ఒక చాంద్రమాసం", en: "One lunar month" },
  },
  "islamic-calendar/moon-sighting": {
    source: "moonSteps",
    steps: ["new", "crescent"],
    title: { te: "అమావాస్య నుండి తొలి చంద్రవంక వరకు", en: "From the new moon to the first crescent" },
  },
  /* The four sacred months are Dhu al-Qa'dah, Dhu al-Hijjah, Muharram and
     Rajab. The visual used to show Ramadan, which is not one of them — the
     lesson's only picture contradicted the lesson. */
  "islamic-calendar/sacred-months": {
    source: "hijriMonthSteps",
    steps: ["month11", "month12", "month1", "month7"],
    title: { te: "నాలుగు పవిత్ర నెలలు", en: "The four sacred months" },
  },

  /* ── Islamic History ──────────────────────────────────────────────────
     Each era lesson shows its own extent on the map: where the rule reached,
     and which city was its capital. */
  "islamic-history/rashidun": { source: "historySteps", steps: ["rashidun"], title: { te: "రాషిదూన్ ఖిలాఫత్ — విస్తరణ", en: "The Rashidun Caliphate on the map" } },
  "islamic-history/umayyad": { source: "historySteps", steps: ["umayyad"], title: { te: "ఉమయ్యద్ ఖిలాఫత్ — విస్తరణ", en: "The Umayyad Caliphate on the map" } },
  "islamic-history/wisdom": { source: "historySteps", steps: ["abbasid"], title: { te: "అబ్బాసీద్ కాలం — బగ్దాద్ కేంద్రంగా", en: "The Abbasid age, centred on Baghdad" } },
  "islamic-history/andalus": { source: "historySteps", steps: ["andalus"], title: { te: "అల్-అందలుస్ — కార్డోబా", en: "Al-Andalus, from Cordoba" } },
  "islamic-history/ottoman": { source: "historySteps", steps: ["ottoman"], title: { te: "ఉస్మానీయ సామ్రాజ్యం", en: "The Ottoman Empire" } },
  "islamic-history/scholars": { source: "historySteps", steps: ["abbasid"], title: { te: "పండితులు పనిచేసిన నగరాలు", en: "The cities the scholars worked in" } },
  "islamic-history/colonial": { source: "historySteps", steps: ["colonial"], title: { te: "వలస కాలం — విడిపోయిన భూభాగాలు", en: "The colonial era, broken into pieces" } },
  "islamic-history/modern": { source: "historySteps", steps: ["modern"], title: { te: "నేటి ముస్లిం ప్రపంచం", en: "The Muslim world today" } },

  /* ── Kids Islam ───────────────────────────────────────────────────────
     Two of the eight lessons are about something the site already draws. The
     other six are manners, stories and character, and inventing a picture for
     those would be worse than leaving them as they are. */
  "kids-islam/salah-and-quran-basics": {
    source: "salahSteps",
    steps: [],
    scene: "salah",
    title: { te: "నమాజు ఎలా చేయాలి — చూడండి", en: "Watch how the prayer is performed" },
  },
  "kids-islam/ramadan-and-eid": {
    source: "moonSteps",
    steps: ["new", "crescent"],
    scene: "moon",
    title: { te: "చంద్రవంక చూసి రమజాన్ మొదలవుతుంది", en: "Ramadan begins when the crescent is seen" },
  },

  /* ── Learn Arabic and Learn Urdu ──────────────────────────────────────
     The alphabet lesson is about the shape of the letters and how a pen makes
     them, and the site draws exactly that. The other lessons are harakat,
     vocabulary, grammar and phrases, where the lesson's own tables and word
     lists are the visual content and a letter animation would be decoration. */
  "learn-arabic/alphabet": {
    source: "arabicLetterSteps",
    steps: [],
    scene: "letters",
    title: { te: "అక్షరాలు ఎలా రాస్తారు", en: "How the letters are written" },
  },
  "learn-urdu/alphabet": {
    source: "urduLetterSteps",
    steps: [],
    scene: "letters",
    title: { te: "అక్షరాలు ఎలా రాస్తారు", en: "How the letters are written" },
  },
  "learn-urdu/writing": {
    source: "urduLetterSteps",
    steps: [],
    scene: "letters",
    title: { te: "కలం ఎలా కదులుతుంది", en: "How the pen moves" },
  },

  /* ── Learn Quran ──────────────────────────────────────────────────────
     The tajweed lesson is about rules you can only point at on real text, and
     the site already highlights them word by word on the basmala. Reading
     word-by-word is also exactly what the "begin" lesson teaches. The rest —
     hifz method, tafseer, adab, daily habit — are practice lessons whose own
     lists carry them. */
  "learn-quran/tajweed": {
    source: "tajweedSteps",
    steps: [],
    title: { te: "నియమాలు పదాలపై — చూడండి", en: "The rules, on real words" },
  },
  "learn-quran/begin": {
    source: "tajweedSteps",
    steps: ["w0", "w1", "w2", "w3"],
    title: { te: "పదం వెంట పదం చదవడం", en: "Reading word by word" },
  },

  /* ── Learn Salah ──────────────────────────────────────────────────────
     The portal this whole idea was made for: wudu, ghusl and the prayer are
     physical sequences, and each lesson now shows its own. */
  "learn-salah/wudu": {
    source: "wuduSteps",
    steps: [],
    scene: "wudu",
    title: { te: "వుజూ — దశల వారీగా చూడండి", en: "Wudu, step by step" },
  },
  "learn-salah/ghusl": {
    source: "ghuslSteps",
    steps: [],
    scene: "wudu",
    title: { te: "గుస్ల్ — దశల వారీగా చూడండి", en: "Ghusl, step by step" },
  },
  "learn-salah/howtopray": {
    source: "salahSteps",
    steps: [],
    scene: "salah",
    title: { te: "నమాజు భంగిమలు — చూడండి", en: "The postures of the prayer" },
  },

  /* ── Seerah ───────────────────────────────────────────────────────────
     The journey map, era by era: each lesson lights the places its years
     happened in. The companions and applying-today lessons are about people
     and practice, not places, and show nothing. */
  "seerah/before-prophethood": { source: "seerahSteps", steps: ["birth"], title: { te: "మక్కా — జననం", en: "Makkah, where it begins" } },
  "seerah/beginning-of-revelation": { source: "seerahSteps", steps: ["revelation"], title: { te: "హిరా గుహ — తొలి వహీ", en: "The cave of Hira" } },
  "seerah/the-makkah-period": { source: "seerahSteps", steps: ["makkah", "taif"], title: { te: "మక్కా సంవత్సరాలు", en: "The Makkan years" } },
  "seerah/hijrah-and-madinah": { source: "seerahSteps", steps: ["hijrah"], title: { te: "హిజ్రత్ మార్గం", en: "The road of the Hijrah" } },
  "seerah/major-events-and-battles": { source: "seerahSteps", steps: ["badr", "uhud", "hudaybiyyah", "conquest"], title: { te: "ముఖ్య ఘటనలు — పటంపై", en: "The major events, on the map" } },
  "seerah/character-and-legacy": { source: "seerahSteps", steps: ["farewell", "legacy"], title: { te: "విదాయ్ హజ్ నుండి వారసత్వం వరకు", en: "From the Farewell Hajj to the legacy" } },

  /* ── Names of Allah ───────────────────────────────────────────────────
     The string of ninety-nine beads is the picture of the second lesson's
     subject. The first lesson meets the first names one at a time. */
  "names-of-allah/what-they-are": { source: "namesSteps", steps: ["n1", "n2", "n3"], title: { te: "మొదటి పేర్లు", en: "The first of the names" } },
  "names-of-allah/ninety-nine": { source: "namesSteps", steps: [], title: { te: "తొంభై తొమ్మిది పూసల దారం", en: "A string of ninety-nine" } },

  /* ── Special Prayers ──────────────────────────────────────────────────
     The night prayer is prayed with the ordinary postures, so it shows them.
     Janazah is the one prayer with no bowing and no prostration — standing,
     takbeers, and the salam — and showing only those steps is itself the
     lesson. Tarawih is about format and count; its tables carry it. */
  "special-prayers/night-prayer": {
    source: "salahSteps",
    steps: [],
    title: { te: "రాత్రి నమాజు భంగిమలు", en: "The postures of the night prayer" },
  },
  "special-prayers/janazah": {
    source: "janazahSteps",
    steps: [],
    title: { te: "జనాజా — నాలుగు తక్బీర్‌లు", en: "Janazah: the four takbirs" },
  },
};

export function lessonVisual(portal: string, slug: string): LessonVisualSpec | null {
  return visuals[`${portal}/${slug}`] ?? null;
}
