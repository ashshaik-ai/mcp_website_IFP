/* Hadith portal content.

   Written by hand rather than extracted, since the legacy site had no hadith
   portal at all.

   Every hadith here is one of the widely known and agreed-upon narrations, and
   each carries its source. Where a narration is graded hasan rather than sahih
   that is stated, because presenting everything as equally established would be
   exactly the habit these lessons warn against.

   Collection counts are approximate and given as such. The figures differ
   between printed editions depending on whether repeated narrations are
   counted separately, and quoting one number as exact would be misleading. */

export type Bi = { te: string; en: string };

export type HadithBook = {
  id: string;
  name: Bi;
  arabic: string;
  /** The compiler, with the year they died in both calendars. */
  compiler: Bi;
  died: string;
  /** Roughly how many narrations, and what that number counts. */
  count: Bi;
  note: Bi;
};

export const hadithBooks: HadithBook[] = [
  {
    id: "bukhari",
    name: { te: "సహీహ్ అల్-బుఖారీ", en: "Sahih al-Bukhari" },
    arabic: "صحيح البخاري",
    compiler: { te: "ముహమ్మద్ ఇబ్న్ ఇస్మాయీల్ అల్-బుఖారీ", en: "Muhammad ibn Ismail al-Bukhari" },
    died: "256 AH / 870 CE",
    count: { te: "సుమారు 7,275 (పునరావృత్తులతో); పునరావృత్తులు తీసేస్తే సుమారు 2,600", en: "About 7,275 including repetitions; roughly 2,600 without them" },
    note: {
      te: "ఖురాన్ తర్వాత అత్యంత ప్రామాణికమైన గ్రంథంగా సున్నీ ముస్లింలు దీన్ని భావిస్తారు. అల్-బుఖారీ ఆరు లక్షలకు పైగా ఉల్లేఖనలను పరిశీలించి వాటిలో కొన్నింటినే ఎంచుకున్నారని చెబుతారు. ఆయన ఒక ఉల్లేఖనను స్వీకరించే ముందు దాని శృంఖలలోని ప్రతి వ్యక్తి గురించి విచారించేవారు.",
      en: "Sunni Muslims regard it as the most authentic book after the Quran. Al-Bukhari is said to have examined over six hundred thousand narrations and selected only a fraction. He investigated every person in a chain before accepting what they passed on.",
    },
  },
  {
    id: "muslim",
    name: { te: "సహీహ్ ముస్లిం", en: "Sahih Muslim" },
    arabic: "صحيح مسلم",
    compiler: { te: "ముస్లిం ఇబ్న్ అల్-హజ్జాజ్", en: "Muslim ibn al-Hajjaj" },
    died: "261 AH / 875 CE",
    count: { te: "సుమారు 7,500 (పునరావృత్తులతో)", en: "About 7,500 including repetitions" },
    note: {
      te: "బుఖారీ శిష్యుడు. ఆయన అమరిక బుఖారీ కంటే మెరుగైనదని చాలామంది పండితులు అంటారు — ఒకే విషయంపై ఉన్న అన్ని ఉల్లేఖనలను ఒకే చోట కూర్చారు. బుఖారీ, ముస్లిం రెండింటిలోనూ ఉన్న ఉల్లేఖనను 'ముత్తఫఖున్ అలైహి' — ఇద్దరూ అంగీకరించినది — అంటారు.",
      en: "A student of al-Bukhari. Many scholars consider his arrangement the better of the two, since he gathers every narration on a topic in one place. A hadith found in both is called muttafaqun alayh, agreed upon by the two.",
    },
  },
  {
    id: "abudawud",
    name: { te: "సునన్ అబూ దావూద్", en: "Sunan Abu Dawud" },
    arabic: "سنن أبي داود",
    compiler: { te: "అబూ దావూద్ అస్-సిజిస్తానీ", en: "Abu Dawud as-Sijistani" },
    died: "275 AH / 889 CE",
    count: { te: "సుమారు 5,270", en: "About 5,270" },
    note: {
      te: "ఇది ప్రధానంగా ఫిఖ్హ్ — ఆచరణ నియమాల — ఉల్లేఖనలపై దృష్టి పెడుతుంది. అబూ దావూద్ బలహీనమైన ఉల్లేఖనలను చేర్చినప్పుడు తరచూ వాటి బలహీనతను స్వయంగా సూచించారు.",
      en: "It concentrates on narrations bearing on fiqh, the rules of practice. Where Abu Dawud included a weak narration he often pointed out its weakness himself.",
    },
  },
  {
    id: "tirmidhi",
    name: { te: "జామిఅ అత్-తిర్మిజీ", en: "Jami at-Tirmidhi" },
    arabic: "جامع الترمذي",
    compiler: { te: "ముహమ్మద్ ఇబ్న్ ఈసా అత్-తిర్మిజీ", en: "Muhammad ibn Isa at-Tirmidhi" },
    died: "279 AH / 892 CE",
    count: { te: "సుమారు 3,950", en: "About 3,950" },
    note: {
      te: "తిర్మిజీ ప్రత్యేకత: ఆయన దాదాపు ప్రతి ఉల్లేఖన తర్వాత దాని స్థాయిని — సహీహ్, హసన్, లేదా జయీఫ్ — స్వయంగా చెప్పారు. 'హసన్' అనే వర్గాన్ని విస్తృతంగా వాడినది ఆయనే.",
      en: "His distinctive practice is that he states the grade of nearly every narration himself, whether sahih, hasan or weak. He is the one who made wide use of the category hasan.",
    },
  },
  {
    id: "nasai",
    name: { te: "సునన్ అన్-నసాయీ", en: "Sunan an-Nasa'i" },
    arabic: "سنن النسائي",
    compiler: { te: "అహ్మద్ ఇబ్న్ షుఐబ్ అన్-నసాయీ", en: "Ahmad ibn Shu'ayb an-Nasa'i" },
    died: "303 AH / 915 CE",
    count: { te: "సుమారు 5,760", en: "About 5,760" },
    note: {
      te: "ఆరు గ్రంథాలలో అత్యంత కఠినమైన ప్రమాణాలు వాడినది ఇదేనని చాలామంది పండితులు అంటారు — బుఖారీ, ముస్లిం తర్వాత.",
      en: "Many scholars hold it applies the strictest criteria of the six after Bukhari and Muslim.",
    },
  },
  {
    id: "ibnmajah",
    name: { te: "సునన్ ఇబ్న్ మాజా", en: "Sunan Ibn Majah" },
    arabic: "سنن ابن ماجه",
    compiler: { te: "ముహమ్మద్ ఇబ్న్ యజీద్ ఇబ్న్ మాజా", en: "Muhammad ibn Yazid ibn Majah" },
    died: "273 AH / 887 CE",
    count: { te: "సుమారు 4,340", en: "About 4,340" },
    note: {
      te: "ఆరవ గ్రంథంగా చేర్చడంపై ప్రాచీన పండితుల మధ్య కొంత చర్చ ఉండేది; కొందరు దాని స్థానంలో ఇమామ్ మాలిక్ 'మువత్తా'ను లెక్కించేవారు. ఇందులో ఇతర ఐదింటిలో లేని ఉల్లేఖనలు ఉన్నాయి, మరియు వాటిలో కొన్ని బలహీనమైనవి.",
      en: "Classical scholars debated including it as the sixth, and some counted Imam Malik's Muwatta in its place. It contains narrations found in none of the other five, and some of those are weak.",
    },
  },
];

export type Hadith = {
  id: string;
  arabic: string;
  /** A plain transliteration, so a reader who cannot read Arabic can still say it. */
  translit: string;
  text: Bi;
  /** Where it is found, named plainly. */
  source: Bi;
  /** sahih or hasan, stated rather than assumed. */
  grade: Bi;
  /** Why it is here and what to do about it. */
  why: Bi;
  theme: "faith" | "character" | "worship" | "community" | "knowledge";
};

export const essentialHadith: Hadith[] = [
  {
    id: "intentions",
    arabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
    translit: "Innamal a'malu bin-niyyat, wa innama likullim-ri'in ma nawa",
    text: {
      te: "కర్మలు ఉద్దేశాలపైనే ఆధారపడి ఉంటాయి, మరియు ప్రతి వ్యక్తికి అతను ఉద్దేశించినదే లభిస్తుంది.",
      en: "Actions are but by intentions, and each person will have only what they intended.",
    },
    source: { te: "బుఖారీ 1, ముస్లిం 1907", en: "Bukhari 1, Muslim 1907" },
    grade: { te: "సహీహ్ — ఇద్దరూ అంగీకరించినది", en: "Sahih, agreed upon" },
    why: {
      te: "అల్-బుఖారీ తన గ్రంథాన్ని ఈ ఉల్లేఖనతోనే మొదలుపెట్టారు, మరియు అది యాదృచ్ఛికం కాదు. ఒకే పని రెండు వేర్వేరు ఉద్దేశాలతో రెండు వేర్వేరు విషయాలు అవుతుంది. బయటికి కనిపించేది ఒకటే, కానీ లెక్కించబడేది వేరు.",
      en: "Al-Bukhari opens his whole collection with this, and not by accident. The same act done with two different intentions is two different things. What is visible is identical; what is counted is not.",
    },
    theme: "faith",
  },
  {
    id: "five-pillars",
    arabic: "بُنِيَ الإِسْلاَمُ عَلَى خَمْسٍ",
    translit: "Buniyal Islamu ala khams",
    text: {
      te: "ఇస్లాం ఐదింటిపై నిర్మించబడింది: అల్లాహ్ తప్ప ఆరాధ్యుడు లేడని, ముహమ్మద్ ﷺ అల్లాహ్ ప్రవక్త అని సాక్ష్యమివ్వడం, నమాజ్ స్థాపించడం, జకాత్ ఇవ్వడం, హజ్ చేయడం, రమదాన్ ఉపవాసం.",
      en: "Islam is built on five: to testify that there is no god but Allah and that Muhammad ﷺ is the Messenger of Allah, to establish the prayer, to give zakat, to perform Hajj, and to fast Ramadan.",
    },
    source: { te: "బుఖారీ 8, ముస్లిం 16", en: "Bukhari 8, Muslim 16" },
    grade: { te: "సహీహ్ — ఇద్దరూ అంగీకరించినది", en: "Sahih, agreed upon" },
    why: {
      te: "'నిర్మించబడింది' అనే పదం ముఖ్యం. స్తంభాలు ఇల్లు కాదు — అవి ఇంటిని నిలబెడతాయి. ఐదు స్తంభాలు ఇస్లాం మొత్తం కాదు; అవి దానిపై మిగిలినదంతా నిలబడే ఆధారం.",
      en: "The word built matters. Pillars are not the house; they hold the house up. The five are not the whole of Islam but what everything else in it rests on.",
    },
    theme: "faith",
  },
  {
    id: "love-for-brother",
    arabic: "لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
    translit: "La yu'minu ahadukum hatta yuhibba li-akheehi ma yuhibbu li-nafsih",
    text: {
      te: "మీలో ఎవరూ తనకు ఇష్టపడేదాన్ని తన సోదరుడికి ఇష్టపడేవరకు విశ్వాసి కాడు.",
      en: "None of you truly believes until he loves for his brother what he loves for himself.",
    },
    source: { te: "బుఖారీ 13, ముస్లిం 45", en: "Bukhari 13, Muslim 45" },
    grade: { te: "సహీహ్ — ఇద్దరూ అంగీకరించినది", en: "Sahih, agreed upon" },
    why: {
      te: "ఇది ఒక కొలత. మీరు మీ కోసం కోరుకునేదాన్ని — మంచి ఉద్యోగం, ఆరోగ్యమైన పిల్లలు, గౌరవం — మీ పొరుగువాడి కోసం కూడా నిజంగా కోరుకుంటున్నారా? ఈ ఉల్లేఖన 'విశ్వాసం' అనేదాన్ని ఒక భావనగా కాక ఒక ప్రవర్తనగా నిర్వచిస్తుంది.",
      en: "This is a measure. What you want for yourself, a good job, healthy children, respect, do you actually want it for your neighbour? The hadith defines belief as conduct rather than as a feeling.",
    },
    theme: "character",
  },
  {
    id: "speak-good",
    arabic: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ",
    translit: "Man kana yu'minu billahi wal-yawmil aakhiri falyaqul khayran aw liyasmut",
    text: {
      te: "ఎవరైతే అల్లాహ్‌ను, అంతిమ దినాన్ని విశ్వసిస్తారో వారు మంచి మాట్లాడాలి లేదా మౌనంగా ఉండాలి.",
      en: "Whoever believes in Allah and the Last Day should speak good or remain silent.",
    },
    source: { te: "బుఖారీ 6018, ముస్లిం 47", en: "Bukhari 6018, Muslim 47" },
    grade: { te: "సహీహ్ — ఇద్దరూ అంగీకరించినది", en: "Sahih, agreed upon" },
    why: {
      te: "గమనించండి: మూడో ఎంపిక లేదు. 'మంచి మాట్లాడు' లేదా 'మౌనంగా ఉండు' — 'ఏదో ఒకటి మాట్లాడు' అనేది ఇందులో లేదు. ఇది వెనుకమాటలు, పుకార్లు, అనవసర విమర్శల గురించి ఒక పూర్తి నియమం, ఒక్క వాక్యంలో.",
      en: "Notice there is no third option. Speak good or be silent; talking for the sake of it is not among them. That is a complete rule about backbiting, gossip and needless criticism in a single sentence.",
    },
    theme: "character",
  },
  {
    id: "anger",
    arabic: "لَيْسَ الشَّدِيدُ بِالصُّرَعَةِ، إِنَّمَا الشَّدِيدُ الَّذِي يَمْلِكُ نَفْسَهُ عِنْدَ الْغَضَبِ",
    translit: "Laysash-shadeedu bis-sura'ah, innamash-shadeedul-ladhee yamliku nafsahu indal ghadab",
    text: {
      te: "బలవంతుడు అంటే కుస్తీలో గెలిచేవాడు కాదు; బలవంతుడు అంటే కోపంలో తనను తాను నిగ్రహించుకునేవాడు.",
      en: "The strong one is not the one who wrestles others down; the strong one is he who controls himself when angry.",
    },
    source: { te: "బుఖారీ 6114, ముస్లిం 2609", en: "Bukhari 6114, Muslim 2609" },
    grade: { te: "సహీహ్ — ఇద్దరూ అంగీకరించినది", en: "Sahih, agreed upon" },
    why: {
      te: "ఒక వ్యక్తి ప్రవక్త ﷺ వద్దకు వచ్చి 'నాకు ఉపదేశం ఇవ్వండి' అని అడిగినప్పుడు ఆయన 'కోపగించవద్దు' అన్నారు. ఆ వ్యక్తి పదేపదే అడిగాడు, ఆయన ప్రతిసారీ అదే చెప్పారు (బుఖారీ 6116). కోపాన్ని నిగ్రహించడం ఇస్లాంలో ఒక అంచు విషయం కాదు.",
      en: "A man asked the Prophet ﷺ for advice and he said do not become angry. The man asked again and again, and each time the answer was the same (Bukhari 6116). Restraining anger is not a marginal concern in Islam.",
    },
    theme: "character",
  },
  {
    id: "best-to-family",
    arabic: "خَيْرُكُمْ خَيْرُكُمْ لأَهْلِهِ",
    translit: "Khayrukum khayrukum li-ahlih",
    text: {
      te: "మీలో ఉత్తములు ఎవరంటే, తమ కుటుంబానికి ఉత్తమంగా ఉండేవారే.",
      en: "The best of you is the one who is best to his family.",
    },
    source: { te: "తిర్మిజీ 3895", en: "Tirmidhi 3895" },
    grade: { te: "సహీహ్ (అల్బానీ ప్రకారం)", en: "Graded sahih by al-Albani" },
    why: {
      te: "బయట గౌరవం సంపాదించడం సులభం. ఇంట్లో మీరు ఎలా ఉంటారో మీ కుటుంబానికి మాత్రమే తెలుసు, మరియు ఈ ఉల్లేఖన కొలతను అక్కడే పెడుతుంది. ప్రవక్త ﷺ ఇంట్లో పనుల్లో సహాయం చేసేవారని ఆయిషా (ర/అ) చెప్పారు.",
      en: "Earning respect outside is easy. Only your family knows how you are at home, and this hadith puts the measure exactly there. Aisha (RA) said the Prophet ﷺ helped with the housework.",
    },
    theme: "character",
  },
  {
    id: "naseeha",
    arabic: "الدِّينُ النَّصِيحَةُ",
    translit: "Ad-deenun-naseehah",
    text: {
      te: "ధర్మం అంటే నిష్కపటత్వం. 'ఎవరి పట్ల?' అని అడిగితే ఆయన అన్నారు: 'అల్లాహ్ పట్ల, ఆయన గ్రంథం పట్ల, ఆయన ప్రవక్త పట్ల, ముస్లిం నాయకుల పట్ల, మరియు సామాన్య ముస్లింల పట్ల'.",
      en: "The religion is sincerity. When asked to whom, he said: to Allah, to His Book, to His Messenger, to the leaders of the Muslims, and to the Muslims generally.",
    },
    source: { te: "ముస్లిం 55", en: "Muslim 55" },
    grade: { te: "సహీహ్", en: "Sahih" },
    why: {
      te: "'నసీహా' అనే అరబిక్ పదాన్ని అనువదించడం కష్టం — అందులో నిష్కపటత్వం, శ్రేయోభిలాష, నిజాయితీగా సలహా ఇవ్వడం అన్నీ ఉన్నాయి. చివరి భాగం గమనించండి: సామాన్య ముస్లింల పట్ల. అంటే మీ పొరుగువాడి పట్ల మీ నిజాయితీ కూడా ధర్మంలో భాగమే.",
      en: "The Arabic naseehah resists translation; it holds sincerity, wanting good for someone, and giving honest counsel all at once. Note the last item: to the Muslims generally. Your honesty towards your neighbour is part of the religion too.",
    },
    theme: "community",
  },
  {
    id: "mercy",
    arabic: "الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَنُ",
    translit: "Ar-rahimoona yarhamuhumur-Rahman",
    text: {
      te: "దయ చూపేవారిపై అపార కరుణామయుడు దయ చూపుతాడు. భూమిపై ఉన్నవారి పట్ల దయ చూపండి, ఆకాశంలో ఉన్నవాడు మీపై దయ చూపుతాడు.",
      en: "The merciful are shown mercy by the Most Merciful. Be merciful to those on earth, and the One above the heavens will be merciful to you.",
    },
    source: { te: "అబూ దావూద్ 4941, తిర్మిజీ 1924", en: "Abu Dawud 4941, Tirmidhi 1924" },
    grade: { te: "సహీహ్", en: "Sahih" },
    why: {
      te: "ఇందులో ఒక షరతు ఉంది, మరియు అది స్పష్టం: మీరు ఇచ్చేదే మీకు తిరిగి వస్తుంది. 'భూమిపై ఉన్నవారి పట్ల' అనే మాట విస్తృతమైనది — ముస్లింల పట్ల మాత్రమే కాదు, జంతువుల పట్ల కూడా.",
      en: "There is a condition in this, and it is plain: what you give is what comes back. Those on earth is deliberately wide. Not only Muslims, and not only people.",
    },
    theme: "character",
  },
  {
    id: "thank-people",
    arabic: "مَنْ لاَ يَشْكُرُ النَّاسَ لاَ يَشْكُرُ اللَّهَ",
    translit: "Man la yashkurun-nasa la yashkurullah",
    text: {
      te: "ఎవరైతే ప్రజలకు కృతజ్ఞత చెప్పరో, వారు అల్లాహ్‌కు కృతజ్ఞత చెప్పరు.",
      en: "Whoever does not thank people has not thanked Allah.",
    },
    source: { te: "అబూ దావూద్ 4811, తిర్మిజీ 1954", en: "Abu Dawud 4811, Tirmidhi 1954" },
    grade: { te: "సహీహ్", en: "Sahih" },
    why: {
      te: "కొందరు 'నేను అల్లాహ్‌కు మాత్రమే కృతజ్ఞత చెబుతాను, మనుషులకు కాదు' అంటారు. ఈ ఉల్లేఖన దాన్ని నేరుగా తిరస్కరిస్తుంది. మీకు సహాయం చేసిన వ్యక్తికి ధన్యవాదాలు చెప్పకపోవడం అల్లాహ్ పట్ల కృతజ్ఞత లోపమే.",
      en: "Some say they thank Allah alone and not people. This hadith refuses that directly. Failing to thank the person who helped you is a failure of gratitude to Allah.",
    },
    theme: "character",
  },
  {
    id: "leaving-what-does-not-concern",
    arabic: "مِنْ حُسْنِ إِسْلاَمِ الْمَرْءِ تَرْكُهُ مَا لاَ يَعْنِيهِ",
    translit: "Min husni islamil-mar'i tarkuhu ma la ya'neeh",
    text: {
      te: "ఒక వ్యక్తి ఇస్లాం చక్కగా ఉండటంలో భాగం, తనకు సంబంధం లేనిదాన్ని వదిలిపెట్టడం.",
      en: "Part of a person's good practice of Islam is leaving alone what does not concern him.",
    },
    source: { te: "తిర్మిజీ 2317, ఇబ్న్ మాజా 3976", en: "Tirmidhi 2317, Ibn Majah 3976" },
    grade: { te: "హసన్ — సహీహ్ కంటే ఒక మెట్టు కింద, కానీ ఆమోదయోగ్యం", en: "Hasan, a step below sahih but acceptable" },
    why: {
      te: "ఇది నేటి కాలానికి అసాధారణంగా సరిపోతుంది. ఇతరుల జీవితాలను చూడటం, వ్యాఖ్యానించడం, పంచుకోవడం ఇప్పుడు చాలా సులభం — మరియు ఈ ఉల్లేఖన అది మీ ఇస్లాం నాణ్యతను తగ్గిస్తుందని చెబుతుంది. దీని స్థాయి హసన్ అని గమనించండి; ఇక్కడ అది స్పష్టంగా చెప్పబడింది, ఎందుకంటే స్థాయిని దాచడం సరైనది కాదు.",
      en: "This sits oddly well against the present. Watching, commenting on and sharing other people's lives has never been easier, and this hadith says it reduces the quality of your Islam. Note that it is graded hasan; that is stated here plainly, because concealing a grade is not honest.",
    },
    theme: "character",
  },
  {
    id: "seeking-knowledge",
    arabic: "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ",
    translit: "Talabul ilmi fareedatun ala kulli muslim",
    text: {
      te: "జ్ఞానాన్వేషణ ప్రతి ముస్లింపైనా విధి.",
      en: "Seeking knowledge is an obligation upon every Muslim.",
    },
    source: { te: "ఇబ్న్ మాజా 224", en: "Ibn Majah 224" },
    grade: { te: "హసన్ — ఇతర శృంఖలల మద్దతుతో", en: "Hasan, strengthened by supporting chains" },
    why: {
      te: "దీని శృంఖలలపై ప్రాచీన పండితుల మధ్య చర్చ ఉంది, కానీ ఇతర మార్గాల మద్దతుతో దీన్ని హసన్‌గా చాలామంది స్వీకరించారు. ఇక్కడ 'జ్ఞానం' అంటే మొదట ఒక ముస్లిం తన ధర్మాన్ని ఆచరించడానికి తెలియవలసినది — నమాజ్ ఎలా చేయాలో, ఏది హలాల్ ఏది హరామో.",
      en: "Classical scholars discussed its chains, and most accepted it as hasan on the strength of supporting routes. Knowledge here means first what a Muslim needs in order to practise: how to pray, what is permitted and what is not.",
    },
    theme: "knowledge",
  },
  {
    id: "beauty",
    arabic: "إِنَّ اللَّهَ جَمِيلٌ يُحِبُّ الْجَمَالَ",
    translit: "Innallaha jameelun yuhibbul jamal",
    text: {
      te: "నిశ్చయంగా అల్లాహ్ సుందరుడు, ఆయన సౌందర్యాన్ని ప్రేమిస్తాడు.",
      en: "Allah is beautiful and He loves beauty.",
    },
    source: { te: "ముస్లిం 91", en: "Muslim 91" },
    grade: { te: "సహీహ్", en: "Sahih" },
    why: {
      te: "ఈ మాట ఒక సందర్భంలో వచ్చింది: ఒక వ్యక్తి 'మంచి బట్టలు, మంచి చెప్పులు ఇష్టపడటం గర్వమా?' అని అడిగినప్పుడు. ప్రవక్త ﷺ కాదని చెప్పి, గర్వం అంటే సత్యాన్ని తిరస్కరించడం, ప్రజలను తక్కువ చేయడం అని వివరించారు. ఇస్లాం అందాన్ని, శుభ్రతను, మంచి రుచిని వ్యతిరేకించదు.",
      en: "It was said in a particular setting: a man asked whether liking good clothes and good sandals was arrogance. The Prophet ﷺ said no, and explained that arrogance is rejecting the truth and looking down on people. Islam is not against beauty, cleanliness or good taste.",
    },
    theme: "faith",
  },
];

/** Ways a narration is graded, in the order a reader meets them. */
export const hadithGrades: { id: string; name: Bi; meaning: Bi }[] = [
  {
    id: "sahih",
    name: { te: "సహీహ్", en: "Sahih" },
    meaning: {
      te: "ప్రామాణికం. శృంఖల అవిచ్ఛిన్నం, ప్రతి ఉల్లేఖకుడు నమ్మదగినవాడు, జ్ఞాపకశక్తి ఖచ్చితమైనది, మరియు ఇతర ఆధారాలతో వైరుధ్యం లేదు.",
      en: "Authentic. The chain is unbroken, every narrator is trustworthy with accurate memory, and it does not contradict stronger evidence.",
    },
  },
  {
    id: "hasan",
    name: { te: "హసన్", en: "Hasan" },
    meaning: {
      te: "మంచిది. సహీహ్ షరతులన్నీ ఉన్నాయి కానీ ఒక ఉల్లేఖకుడి జ్ఞాపకశక్తి కొంచెం తక్కువ. ఇది ఆమోదయోగ్యం, ఆచరణకు వాడవచ్చు.",
      en: "Good. It meets the conditions of sahih except that a narrator's memory is slightly less exact. It is acceptable and may be acted upon.",
    },
  },
  {
    id: "daif",
    name: { te: "జయీఫ్", en: "Da'if" },
    meaning: {
      te: "బలహీనం. శృంఖలలో ఒక తెగుడు ఉంది, లేదా ఒక ఉల్లేఖకుడు బలహీనుడు. దీని ఆధారంగా ధర్మ నియమాలను నిర్ధారించరు.",
      en: "Weak. There is a break in the chain, or a narrator is unreliable. Rulings are not established on this basis.",
    },
  },
  {
    id: "mawdu",
    name: { te: "మౌదూఅ", en: "Mawdu" },
    meaning: {
      te: "కల్పితం. ఇది ప్రవక్త ﷺ మాట కాదు; ఎవరో దాన్ని తయారుచేశారు. దీన్ని ప్రవక్త ﷺ మాటగా చెప్పడం తీవ్రమైన పాపం.",
      en: "Fabricated. It is not the Prophet's speech at all; someone invented it. Attributing it to him is a grave sin.",
    },
  },
];
