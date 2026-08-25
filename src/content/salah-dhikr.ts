/* What is said at each posture of the prayer.

   Lifted out of the learn-salah portal page so the lesson that teaches the
   sequence can show the same records. It used to live inline in one tab of
   the hub, which meant a learner reading "how to pray" saw the movements
   described in Telugu and never the Arabic they were meant to say — a
   benchmark agent measured zero Arabic characters on that lesson. */

export type Bi = { te: string; en: string };

export type Dhikr = {
  n: number;
  /* Telugu-first: the hub tab and the lesson both printed the English
     transliteration as the step's name. */
  name: Bi;
  /** Vowelled Arabic, as recited. */
  ar: string;
  /** Romanised, for readers who cannot yet read the script. */
  tr: string;
  te: string;
  en: string;
  /** The posture it belongs to. */
  pos: Bi;
};

export const salahDhikr: Dhikr[] = [
{ n: 1, name: { te: "తక్బీర్", en: "Takbeer" }, ar: "اللَّهُ أَكْبَر", tr: "Allāhu Akbar", te: "అల్లాహ్ అందరికంటే గొప్పవాడు", en: "Allah is the Greatest", pos: { te: "నిలబడి, చేతులు చెవుల వరకు ఎత్తి", en: "Standing, raise hands to ears" } },
                { n: 2, name: { te: "సనా", en: "Thana" }, ar: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ", tr: "Subḥānaka Allāhumma wa biḥamdik", te: "ఓ అల్లాహ్, నీవు పరిశుద్ధుడవు, నీ స్తోత్రంతో", en: "O Allah, glory and praise be to You", pos: { te: "నిలబడి, కుడిచేయి ఎడమపై — నాభి కింద", en: "Standing, right hand over left, below the navel" } },
                { n: 3, name: { te: "సూరా ఫాతిహా", en: "Al-Fatihah" }, ar: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", tr: "Al-ḥamdu lillāhi rabbil-ʿālamīn", te: "సర్వలోక ప్రభువైన అల్లాహ్‌కే స్తోత్రాలు", en: "Praise be to Allah, Lord of all worlds", pos: { te: "నిలబడి, ఫాతిహా పఠించి", en: "Standing, recite Al-Fatihah" } },
                { n: 4, name: { te: "రుకూ", en: "Ruku" }, ar: "سُبْحَانَ رَبِّيَ الْعَظِيمِ", tr: "Subḥāna Rabbiyal-ʿAẓīm", te: "నా మహోన్నత ప్రభువు పరిశుద్ధుడు (×3)", en: "Glory to my Lord, the Most Great (×3)", pos: { te: "వంగి, చేతులు మోకాళ్లపై", en: "Bowing, hands on knees" } },
                { n: 5, name: { te: "సజ్దా", en: "Sujood" }, ar: "سُبْحَانَ رَبِّيَ الْأَعْلَى", tr: "Subḥāna Rabbiyal-Aʿlā", te: "నా అత్యున్నత ప్రభువు పరిశుద్ధుడు (×3)", en: "Glory to my Lord, the Most High (×3)", pos: { te: "సాష్టాంగం — 7 అవయవాలు నేలపై", en: "Prostration — 7 parts on ground" } },
                { n: 6, name: { te: "జల్సా", en: "Jalsa" }, ar: "رَبِّ اغْفِرْ لِي", tr: "Rabbighfir lī", te: "నా ప్రభూ, నన్ను క్షమించు", en: "My Lord, forgive me", pos: { te: "రెండు సజ్దాల మధ్య కూర్చొని", en: "Sitting between two prostrations" } },
                { n: 7, name: { te: "తషహ్హుద్", en: "Tashahhud" }, ar: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ", tr: "At-taḥiyyātu lillāhi waṣ-ṣalawāt", te: "అన్ని వందనాలు అల్లాహ్‌కే", en: "All greetings are for Allah", pos: { te: "చివరి రకాత్‌లో కూర్చొని", en: "Sitting in the final raka'ah" } },
                { n: 8, name: { te: "సలాం", en: "Salam" }, ar: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّه", tr: "As-salāmu ʿalaykum wa raḥmatullāh", te: "మీపై శాంతి మరియు అల్లాహ్ కరుణ", en: "Peace and mercy of Allah be upon you", pos: { te: "తలను కుడి, తర్వాత ఎడమకు తిప్పి", en: "Turn head right, then left" } },
];
