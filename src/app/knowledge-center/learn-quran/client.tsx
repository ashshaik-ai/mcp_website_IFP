"use client";

import { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { LessonIndex } from "@/components/learning/LessonIndex";
import { PageShell } from "@/components/layout/PageShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { ChevronLeft, ChevronRight, ChevronDown, BookOpen, Mic, Brain, Heart } from "lucide-react";

/* Bilingual copy for this file, hoisted out of the JSX so a translator
   can read and review it as one unit. */
const copy = {
  knowledge_center: { te: "జ్ఞాన కేంద్రం", en: "Knowledge Center" },
  learn_quran: { te: "ఖురాన్ నేర్చుకోండి", en: "Learn Quran" },
  reading_tajweed_tafseer_hifz_complete: { te: "పఠనం → తజ్వీద్ → తఫ్సీర్ → హిఫ్జ్ — పూర్తి 4-దశల ప్రయాణం", en: "Reading → Tajweed → Tafseer → Hifz — complete 4-stage journey" },
  stages: { te: "దశలు", en: "Stages" },
  tajweed_rules: { te: "తజ్వీద్ నియమాలు", en: "Tajweed Rules" },
  rabbana_duas: { te: "రబ్బనా దువాలు", en: "Rabbana Duas" },
  free: { te: "ఉచితం", en: "Free" },
  n_4_stage_learning_journey: { te: "4-దశల అభ్యాస ప్రయాణం", en: "4-Stage Learning Journey" },
  what_you_ll_learn: { te: "మీరు నేర్చుకునేది", en: "What you'll learn" },
  stage_goal: { te: "స్థాయి లక్ష్యం", en: "Stage Goal" },
  flagship_section: { te: "ఫ్లాగ్‌షిప్ విభాగం", en: "Flagship Section" },
  tajweed_academy: { te: "తజ్వీద్ అకాడమీ", en: "Tajweed Academy" },
  n_8_essential_tajweed_rules_explanation: { te: "8 ముఖ్య తజ్వీద్ నియమాలు — వివరణ, ఉదాహరణ, సాధారణ తప్పు", en: "8 essential tajweed rules — explanation, example, common mistake" },
  rule: { te: "నియమం", en: "Rule" },
  tajweed_rule: { te: "తజ్వీద్ నియమం", en: "Tajweed rule" },
  explanation: { te: "వివరణ", en: "Explanation" },
  example: { te: "ఉదాహరణ", en: "Example" },
  common_mistake: { te: "సాధారణ తప్పు: ", en: "Common mistake: " },
  back: { te: "వెనుకకు", en: "Back" },
  next: { te: "తదుపరి", en: "Next" },
  quran_duas: { te: "ఖురాన్ దువాలు", en: "Quran Duas" },
  the_rabbana_duas: { te: "'రబ్బనా' దువాలు", en: "The Rabbana Duas" },
  supplications_from_the_quran_beginning: { te: "ఖురాన్ నుండి 'మా ప్రభూ' తో మొదలయ్యే నేర్చుకోవలసిన దువాలు", en: "Supplications from the Quran beginning with 'Our Lord'" },
  key_surah_lessons: { te: "ముఖ్య సూరా పాఠాలు", en: "Key Surah Lessons" },
  lesson: { te: "పాఠం:", en: "Lesson:" },
  ayah_of_the_day: { te: "రోజువారీ ఆయత్", en: "Ayah of the Day" },
  daily_quran_challenge: { te: "రోజువారీ ఖురాన్ సవాల్", en: "Daily Quran Challenge" },
  reflection_prompt: { te: "ఆలోచన ప్రశ్న", en: "Reflection Prompt" },
  n_7_ayahs_one_changes_with: { te: "7 ఆయత్లు — వారంలో ఒక్కొక్కటి మారుతాయి", en: "7 ayahs — one changes with each day of the week" },
  will_they_not_reflect_upon: { te: "\"వారు ఖురాన్‌ను ఆలోచించరా?\" — సూరహ్ అన్-నిసా 4:82", en: "\"Will they not reflect upon the Quran?\" — Surah An-Nisa 4:82" },
  explore_all_portals: { te: "అన్ని పోర్టల్స్ చూడండి", en: "Explore All Portals" },
} as const;

// ── DATA ──────────────────────────────────────────────────────────────────────

const stages = [
  {
    num: 1, icon: BookOpen,
    title: { te: "ప్రాథమిక పఠనం", en: "Basic Reading" },
    arabic: "القراءة الأساسية",
    desc: { te: "ఖురానిక్ లిపి మరియు హరఫ్ల పరిచయం", en: "Quranic script and haroof introduction" },
    color: "bg-emerald-700",
    goal: { te: "లక్ష్యం: అరబిక్ అక్షరాలు చదివి సాధారణ వచనాలు పఠించగలగడం", en: "Goal: Read Arabic letters and recite simple Quranic text" },
    topics: [
      { te: "అరబిక్ అక్షరమాల పునశ్చరణ", en: "Arabic alphabet review" },
      { te: "హరకాత్ మరియు తన్వీన్", en: "Harakat and Tanween" },
      { te: "అక్షర రూపాలు", en: "Letter forms" },
      { te: "వక్ఫ్ సంకేతాలు", en: "Waqf stop signs" },
      { te: "అదబ్ — ఖురాన్ పట్ల మర్యాద", en: "Adab — etiquette with the Quran" },
    ],
  },
  {
    num: 2, icon: Mic,
    title: { te: "తజ్వీద్", en: "Tajweed" },
    arabic: "علم التجويد",
    desc: { te: "ఖురాన్‌ను సరైన ఉచ్చారణతో చదవడం", en: "Reciting the Quran with correct pronunciation" },
    color: "bg-amber-700",
    goal: { te: "లక్ష్యం: మూల తజ్వీద్ నియమాలతో చదవడం", en: "Goal: Read with basic tajweed rules" },
    topics: [
      { te: "మఖారిజ్ అల్-హురూఫ్ — అక్షర స్థానాలు", en: "Makharij al-Huroof — articulation points" },
      { te: "నూన్ సాకిన్ నియమాలు", en: "Rules of Noon Sakin" },
      { te: "మీమ్ సాకిన్ నియమాలు", en: "Rules of Meem Sakin" },
      { te: "మద్ నియమాలు", en: "Rules of Madd (elongation)" },
      { te: "ఖల్‌ఖలా — 5 అక్షరాల ప్రతిధ్వని", en: "Qalqalah — echo on 5 letters" },
    ],
  },
  {
    num: 3, icon: Brain,
    title: { te: "తఫ్సీర్", en: "Tafseer" },
    arabic: "التفسير",
    desc: { te: "ఖురాన్ వచనాలు అర్థం చేసుకోవడం", en: "Understanding the meanings of Quranic verses" },
    color: "bg-blue-800",
    goal: { te: "లక్ష్యం: ముఖ్య సూరాల అర్థాలు అర్థం చేసుకోవడం", en: "Goal: Understand meanings of key Surahs" },
    topics: [
      { te: "సూరహ్ ఫాతిహా వివరణ", en: "Tafseer of Surah Al-Fatiha" },
      { te: "చివరి 10 సూరాలు వివరణ", en: "Tafseer of last 10 Surahs" },
      { te: "అస్బాబ్ అన్-నుజూల్", en: "Asbab an-Nuzool — context of revelation" },
      { te: "ఖురాన్ ఇతివృత్తాలు", en: "Quranic themes" },
    ],
  },
  {
    num: 4, icon: Heart,
    title: { te: "హిఫ్జ్", en: "Hifz" },
    arabic: "الحفظ",
    desc: { te: "ఖురాన్ హృదయంలో భద్రపరచడం", en: "Memorising the Quran by heart" },
    color: "bg-purple-800",
    goal: { te: "లక్ష్యం: జుజ్ అమ్మ పూర్తిగా కంఠస్థం చేయడం", en: "Goal: Complete memorisation of Juz Amma" },
    topics: [
      { te: "హిఫ్జ్ టెక్నిక్స్ & రూటీన్", en: "Hifz techniques & daily routine" },
      { te: "జుజ్ అమ్మ — చివరి పారా", en: "Juz Amma — last Para" },
      { te: "రివిజన్ పద్ధతులు", en: "Revision methods" },
      { te: "ముతశాబిహాత్ — సారూప్య వచనాలు", en: "Mutashabihat — similar verses" },
    ],
  },
];

const tajweedSteps = [
  {
    glyph: "تَجْوِيد", ar: "التجويد",
    name: { te: "తజ్వీద్ అంటే ఏమిటి?", en: "What is Tajweed?" },
    expl: { te: "తజ్వీద్ అంటే ప్రతి అక్షరానికి దాని హక్కును ఇవ్వడం — సరైన స్థానం నుండి, సరైన లక్షణాలతో, ఖురాన్ అవతరించిన విధంగా పలకడం.", en: "Tajweed means giving every letter its right — pronouncing it from its correct point with its proper qualities, as the Quran was revealed." },
    example_ar: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    note: { te: "తజ్వీద్ నియమాలతో నెమ్మదిగా, సరిగ్గా పఠించబడింది.", en: "Recited slowly and correctly with the rules of Tajweed." },
    mistake: { te: "వేగంగా పఠించి నియమాలను విస్మరించడం, ఇది అక్షరాలను, అర్థాలను మార్చవచ్చు.", en: "Reciting fast and ignoring the rules, which can change letters and meanings." },
  },
  {
    glyph: "ع ح خ", ar: "المخارج",
    name: { te: "మఖారిజ్ (ఉచ్చారణ స్థానాలు)", en: "Makharij (Articulation Points)" },
    expl: { te: "ప్రతి అక్షరానికి ఖచ్చితమైన నిష్క్రమణ స్థానం ఉంది — గొంతు, నాలుక, పెదవులు. వాటిని తెలుసుకోవడం ప్రతి అక్షరాన్ని వేరుగా ఉంచుతుంది.", en: "Every letter has a precise exit point — the throat, the tongue, the lips. Knowing them keeps each letter distinct." },
    example_ar: "ع · ح · خ",
    note: { te: "ఇవి గొంతు అక్షరాలు, ఒక్కొక్కటీ గొంతులోని వేర్వేరు భాగం నుండి.", en: "These are throat letters, each from a different part of the throat." },
    mistake: { te: "'ఐన్ (ع)ను హంజాలా, లేదా హా (ح)ను ఆంగ్ల h లా పలకడం.", en: "Pronouncing ʿain (ع) like a hamza, or ḥa (ح) like the English h." },
  },
  {
    glyph: "نْ ـًـٍـٌ", ar: "النون الساكنة",
    name: { te: "నూన్ సాకినా & తన్వీన్", en: "Noon Sakinah & Tanween" },
    expl: { te: "నిశ్శబ్ద నూన్ లేదా తన్వీన్ నాలుగు నియమాలను అనుసరిస్తుంది: ఇజ్‌హార్ (స్పష్టం), ఇద్‌గామ్ (కలయిక), ఇఖ్‌లాబ్ (మార్పు), ఇఖ్‌ఫా (దాపు).", en: "A silent noon or tanween follows four rules: Izhar (clear), Idgham (merge), Iqlab (convert), and Ikhfa (hide)." },
    example_ar: "مِنْ بَعْدِ",
    note: { te: "ఇఖ్‌లాబ్: బా (ب) అక్షరం ముందు నూన్ మీమ్ ధ్వనిగా మారుతుంది.", en: "Iqlab: the noon turns into a meem sound before the letter ba (ب)." },
    mistake: { te: "ఇజ్‌హార్ (స్పష్టం) అవసరమైన చోట ఇఖ్‌ఫా (దాపు) వర్తింపజేయడం.", en: "Applying ikhfa (hiding) where the rule actually requires izhar (clear)." },
  },
  {
    glyph: "مْ", ar: "الميم الساكنة",
    name: { te: "మీమ్ సాకినా", en: "Meem Sakinah" },
    expl: { te: "నిశ్శబ్ద మీమ్ మూడు నియమాలను అనుసరిస్తుంది: ఇఖ్‌ఫా షఫవీ, ఇద్‌గామ్ షఫవీ, ఇజ్‌హార్ షఫవీ.", en: "A silent meem follows three rules: Ikhfa Shafawi, Idgham Shafawi, and Izhar Shafawi." },
    example_ar: "لَهُم مَّا",
    note: { te: "ఇద్‌గామ్ షఫవీ: మీమ్ గున్నా (నాసిక ధ్వని)తో మీమ్‌లో కలుస్తుంది.", en: "Idgham Shafawi: meem merges into meem with a ghunnah (nasal sound)." },
    mistake: { te: "గున్నాను వదిలేయడం, లేదా బా, మీమ్ తప్ప ఇతర అక్షరాల ముందు మీమ్‌ను దాచడం.", en: "Dropping the ghunnah, or hiding the meem before letters other than ba and meem." },
  },
  {
    glyph: "نّ مّ", ar: "الغُنّة",
    name: { te: "గున్నా (నాసిక ధ్వని)", en: "Ghunnah (Nasalization)" },
    expl: { te: "గున్నా అనేది సుమారు రెండు మాత్రల పాటు పట్టి ఉంచే నాసిక ధ్వని, షద్దా గల నూన్ లేదా మీమ్‌పై బలంగా ఉంటుంది.", en: "Ghunnah is a nasal sound held for about two counts, strongest on a noon or meem carrying a shaddah." },
    example_ar: "إِنَّ · ثُمَّ",
    note: { te: "ద్విత్వ అక్షరంపై నాసిక ధ్వనిని స్పష్టంగా పట్టి ఉంచండి.", en: "Hold the nasal sound clearly on the doubled letter." },
    mistake: { te: "గున్నాను తగినంత సేపు పట్టుకోకపోవడం, లేదా పూర్తిగా వదిలేయడం.", en: "Not holding the ghunnah long enough, or skipping it altogether." },
  },
  {
    glyph: "ق ط ب ج د", ar: "القلقلة",
    name: { te: "ఖల్‌ఖలా (ప్రతిధ్వని)", en: "Qalqalah (Echoing)" },
    expl: { te: "ఖల్‌ఖలా అనేది ఐదు అక్షరాలు (ق ط ب ج د) సుకూన్‌తో ఉన్నప్పుడు వాటిపై వచ్చే ప్రతిధ్వని.", en: "Qalqalah is a bouncing echo on five letters (ق ط ب ج د) when they carry a sukoon." },
    example_ar: "قُلْ · أَحَدْ",
    note: { te: "చివర దాల్ (د)పై స్వరం చేర్చకుండా తేలికైన ప్రతిధ్వని.", en: "A light bounce on the daal (د) at the end without adding a vowel." },
    mistake: { te: "ఏ ప్రతిధ్వనీ ఇవ్వకపోవడం, లేదా అక్షరానికి పూర్తి స్వరం చేర్చడం.", en: "Giving no echo at all, or adding a full vowel sound to the letter." },
  },
  {
    glyph: "ا و ي", ar: "المُدود",
    name: { te: "మద్ద్ (దీర్ఘీకరణ)", en: "Madd (Elongation)" },
    expl: { te: "మద్ద్ అంటే స్వరాన్ని దీర్ఘం చేయడం. సహజ మద్ద్ రెండు మాత్రలు; ఇతర రకాలు నియమం ప్రకారం ఎక్కువ సేపు ఉంచబడతాయి.", en: "Madd is the elongation of a vowel. Natural madd is two counts; other types are held longer by rule." },
    example_ar: "قَالَ · الضَّالِّينَ",
    note: { te: "ఇక్కడ అవసరమైన మద్ద్ సుమారు ఆరు మాత్రల పాటు ఉంచబడుతుంది.", en: "Required madd here is held for about six counts." },
    mistake: { te: "అవసరమైన మద్ద్‌ను కుదించడం, లేదా సహజ రెండు-మాత్రల మద్ద్‌ను అతిగా సాగదీయడం.", en: "Shortening a required madd, or over-stretching a natural two-count madd." },
  },
  {
    glyph: "ۚ ۖ ۗ", ar: "الوقف",
    name: { te: "వఖఫ్ (ఆపే నియమాలు)", en: "Waqf (Stopping Rules)" },
    expl: { te: "వఖఫ్ అంటే ఎక్కడ ఆపాలి, ఎక్కడ కొనసాగాలి అని తెలుసుకోవడం. వచనం పైన ఉన్న చిన్న గుర్తులు మీకు దారి చూపుతాయి.", en: "Waqf is knowing where to stop and where to continue. Small signs above the text guide you." },
    example_ar: "ۗ ۚ ۖ",
    note: { te: "ఈ గుర్తులు సిఫారసు చేసిన ఆపు, అనుమతించిన ఆపు, కొనసాగడం మేలైన చోటును సూచిస్తాయి.", en: "These signs mark a recommended stop, a permissible stop, and where it is better to continue." },
    mistake: { te: "పదం మధ్యలో ఆపడం, లేదా అర్థం చెడిపోయే చోట ఆపడం.", en: "Stopping in the middle of a word, or stopping where the meaning breaks." },
  },
];

const rabbanaDuas = [
  {
    ref: { te: "ఖురాన్ 2:201", en: "Quran 2:201" },
    ar: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    tr: { te: "రబ్బనా ఆతినా ఫిద్-దున్యా హసనతన్ వ ఫిల్-ఆఖిరతి హసనతన్ వ ఖినా అజాబన్-నార్", en: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina adhaban-nar" },
    meaning: { te: "ఓ మా ప్రభూ, మాకు ఇహలోకంలో మేలు, పరలోకంలో మేలు ప్రసాదించు, నరకాగ్ని శిక్ష నుండి మమ్మల్ని కాపాడు.", en: "Our Lord, give us good in this world and good in the Hereafter, and save us from the punishment of the Fire." },
  },
  {
    ref: { te: "ఖురాన్ 3:8", en: "Quran 3:8" },
    ar: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا",
    tr: { te: "రబ్బనా లా తుజిగ్ ఖులూబనా బఅద ఇజ్ హదైతనా", en: "Rabbana la tuzigh qulubana bada idh hadaytana" },
    meaning: { te: "ఓ మా ప్రభూ, నీవు మాకు సన్మార్గం చూపిన తర్వాత మా హృదయాలను తప్పుదోవ పట్టించకు.", en: "Our Lord, do not let our hearts turn away after You have guided us." },
  },
  {
    ref: { te: "ఖురాన్ 25:74", en: "Quran 25:74" },
    ar: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ",
    tr: { te: "రబ్బనా హబ్ లనా మిన్ అజ్వాజినా వ జుర్రియ్యాతినా ఖుర్రత అఅయున్", en: "Rabbana hab lana min azwajina wa dhurriyyatina qurrata ayun" },
    meaning: { te: "ఓ మా ప్రభూ, మా జీవిత భాగస్వాములు, సంతానంలో మాకు కంటి చలువను ప్రసాదించు.", en: "Our Lord, grant us joy in our spouses and children." },
  },
  {
    ref: { te: "ఖురాన్ 2:286", en: "Quran 2:286" },
    ar: "رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا",
    tr: { te: "రబ్బనా లా తుఆఖిజ్నా ఇన్ నసీనా అవ్ అఖ్తానా", en: "Rabbana la tu-akhidhna in nasina aw akhtana" },
    meaning: { te: "ఓ మా ప్రభూ, మేము మరచిపోయినా, తప్పు చేసినా మమ్మల్ని నిందించకు.", en: "Our Lord, do not hold us to account if we forget or make a mistake." },
  },
  {
    ref: { te: "ఖురాన్ 20:114", en: "Quran 20:114" },
    ar: "رَبِّ زِدْنِي عِلْمًا",
    tr: { te: "రబ్బి జిద్నీ ఇల్మా", en: "Rabbi zidni ilma" },
    meaning: { te: "ఓ నా ప్రభూ, నా జ్ఞానాన్ని పెంచు.", en: "My Lord, increase me in knowledge." },
  },
  {
    ref: { te: "ఖురాన్ 20:25-26", en: "Quran 20:25-26" },
    ar: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي",
    tr: { te: "రబ్బి ష్రహ్ లీ సద్రీ వ యస్సిర్ లీ అమ్రీ", en: "Rabbi-shrah li sadri wa yassir li amri" },
    meaning: { te: "ఓ నా ప్రభూ, నా హృదయాన్ని విశాలం చేయి, నా పనిని సులభం చేయి.", en: "My Lord, open up my heart for me and make my task easy for me." },
  },
];

const surahs = [
  { no: 1,   ar: "الفاتحة",  en: "Al-Fatihah", meaning: { te: "ఆరంభం", en: "The Opening" },
    virtue: { te: "అత్యంత గొప్ప సూరా — ప్రతి నమాజ్ రకాత్‌లో పఠించబడుతుంది.", en: "The greatest Surah — recited in every unit of every prayer." },
    lesson: { te: "పూర్తి రోజువారీ ప్రార్థన: స్తుతి, భక్తి, మార్గదర్శనం కోరడం.", en: "A complete daily prayer: praise, devotion, and asking for guidance." },
    tip: { te: "ప్రతి నమాజ్‌లో పఠిస్తారు కాబట్టి ఇది మొదట కంఠస్థం చేయండి.", en: "Memorise this first — it is recited in every prayer." } },
  { no: 112, ar: "الإخلاص", en: "Al-Ikhlas", meaning: { te: "నిష్కాపట్యం", en: "Sincerity" },
    virtue: { te: "ప్రతిఫలంలో ఖురాన్‌లో మూడింట ఒక వంతు; తౌహీద్ సారాంశం.", en: "Equals one-third of the Quran in reward; the essence of Tawheed." },
    lesson: { te: "అల్లాహ్ ఏకైకుడు, భాగస్వామి లేడు — స్వచ్ఛ విశ్వాసం హృదయం.", en: "Allah is One, with no partner — the heart of pure faith." },
    tip: { te: "కేవలం 4 వచనాలు — ప్రారంభకుల కోసం ఆదర్శం.", en: "Only 4 verses — ideal for beginners to memorise first." } },
  { no: 113, ar: "الفلق",   en: "Al-Falaq", meaning: { te: "ఉదయం", en: "The Daybreak" },
    virtue: { te: "అన్ని హానుల నుండి శరణు కోసం పఠించే రక్షణ సూరా.", en: "A protection (muʿawwidhat) recited for refuge from all harm." },
    lesson: { te: "ప్రతి బాహ్య హాని నుండి అల్లాహ్ రక్షణను కోరండి.", en: "Seek Allah's protection from every outward harm." },
    tip: { te: "అల్-ఫలఖ్ మరియు అన్-నాస్ రాత్రి నిద్రపోయే ముందు కలిపి చదవండి.", en: "Recite Al-Falaq and An-Nas together before sleeping each night." } },
  { no: 114, ar: "الناس",   en: "An-Nas", meaning: { te: "మానవజాతి", en: "Mankind" },
    virtue: { te: "చెడు గుసగుసలాడేవాడి నుండి అల్లాహ్ శరణు కోరుతుంది.", en: "Seeks refuge in Allah from the whisperer of evil." },
    lesson: { te: "లోపలి గుసగుసలు, సందేహాల నుండి అల్లాహ్ రక్షణను కోరండి.", en: "Seek Allah's protection from inner whispers and doubt." },
    tip: { te: "ఈ సూరా ఉదయం మరియు సాయంత్రం రక్షణ కోసం పఠించండి.", en: "Recite morning and evening for daily protection." } },
  { no: 103, ar: "العصر",   en: "Al-Asr", meaning: { te: "కాలం", en: "Time" },
    virtue: { te: "ఇమామ్ షాఫయీ: ఇది ఒక్కటే అవతరించినా ప్రజలకు సరిపోయేది.", en: "Imam Shafiʿi: had only this been revealed, it would suffice." },
    lesson: { te: "విశ్వాసం, సత్కర్మలు, సత్యం, ఓర్పు నష్టం నుండి కాపాడతాయి.", en: "Faith, good deeds, truth, and patience save us from loss." },
    tip: { te: "3 వచనాలలో సమగ్ర జీవిత మార్గదర్శనం — ముందుగా కంఠస్థం చేయండి.", en: "Complete life guidance in 3 verses — memorise early." } },
  { no: 67,  ar: "الملك",   en: "Al-Mulk", meaning: { te: "సార్వభౌమత్వం", en: "The Sovereignty" },
    virtue: { te: "పఠించేవారికి సిఫారసు చేస్తుంది, సమాధి శిక్ష నుండి కాపాడుతుంది.", en: "Intercedes for its reciter and guards from the punishment of the grave." },
    lesson: { te: "సర్వాధికారం అల్లాహ్‌దే, ఆయన ప్రతిదీ చూస్తాడు, పరీక్షిస్తాడు.", en: "All power belongs to Allah, who sees and tests everything." },
    tip: { te: "రాత్రి నిద్రపోయే ముందు ప్రతిరోజూ పఠించడం సున్నత్.", en: "Sunnah to recite every night before sleeping." } },
];

const ayatOfWeek = [
  { ar: "إِنَّ مَعَ الْعُسْرِ يُسْرًا", ref: "Ash-Sharh 94:6",
    te: "నిశ్చయంగా, కష్టంతో పాటు సౌలభ్యం ఉంది.",
    en: "Indeed, with hardship comes ease.",
    reflect: { te: "ఏ కష్టంలో సౌలభ్యం దగ్గరలో ఉందని మీరు నమ్మగలరు?", en: "Which hardship are you facing where you can trust that ease is near?" } },
  { ar: "وَاذْكُرُوا اللَّهَ كَثِيرًا", ref: "Al-Anfal 8:45",
    te: "మరియు అల్లాహ్‌ను అధికంగా స్మరించండి.",
    en: "And remember Allah often.",
    reflect: { te: "బిజీ రోజులో అల్లాహ్ ఎన్నిసార్లు మీ మనసులో మెదులుతాడు?", en: "How often does Allah cross your mind during a busy day?" } },
  { ar: "فَاذْكُرُونِي أَذْكُرْكُمْ", ref: "Al-Baqarah 2:152",
    te: "కావున నన్ను స్మరించండి; నేను మిమ్మల్ని స్మరిస్తాను.",
    en: "So remember Me; I will remember you.",
    reflect: { te: "మీరు స్మరిస్తే అల్లాహ్ మిమ్మల్ని స్మరిస్తాడని తెలిస్తే ఏం మారుతుంది?", en: "What would change if you knew Allah remembers you when you remember Him?" } },
  { ar: "وَقُل رَّبِّ زِدْنِي عِلْمًا", ref: "Ta-Ha 20:114",
    te: "మరియు ఇలా అను: నా ప్రభూ, నా జ్ఞానాన్ని పెంచు.",
    en: "And say: My Lord, increase me in knowledge.",
    reflect: { te: "ఖురాన్ గురించి మీరు మరింత బాగా అర్థం చేసుకోవాలనుకునే ఒక విషయం ఏది?", en: "What is one thing about the Quran you want to understand better?" } },
  { ar: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ", ref: "Al-Baqarah 2:153",
    te: "నిశ్చయంగా అల్లాహ్ సహనం గలవారితో ఉంటాడు.",
    en: "Indeed, Allah is with the patient.",
    reflect: { te: "మీ జీవితంలో ప్రస్తుతం ఓర్పు ఎక్కడ పరీక్షించబడుతోంది?", en: "Where in your life is patience being tested right now?" } },
  { ar: "وَتَوَكَّلْ عَلَى اللَّهِ", ref: "Al-Ahzab 33:3",
    te: "మరియు అల్లాహ్‌పై నమ్మకం ఉంచు.",
    en: "And put your trust in Allah.",
    reflect: { te: "మీరు అల్లాహ్‌కు అప్పగించగల ఏ చింతను మోస్తున్నారు?", en: "What worry are you carrying that you could hand over to Allah?" } },
  { ar: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً", ref: "Al-Baqarah 2:201",
    te: "మా ప్రభూ, ఇహలోకంలో మాకు మేలును ప్రసాదించు.",
    en: "Our Lord, give us good in this world.",
    reflect: { te: "మీరు కోరే 'మేలు' ఏది — అది పరలోకానికీ మేలు కలిగిస్తుందా?", en: "What 'good' are you seeking — and is it good for your next life too?" } },
];

// Day 0=Sun … 6=Sat — static pick
function getTodayAyah() {
  return ayatOfWeek[new Date().getDay()];
}

// ── COMPONENTS ────────────────────────────────────────────────────────────────

function LearnQuranPage() {
  const { lang } = useI18n();
  const [openStage, setOpenStage] = useState<number | null>(1);
  const [tjIdx, setTjIdx] = useState(0);

  const todayAyah = getTodayAyah();
  const step = tajweedSteps[tjIdx];

  return (
    <PageShell>

      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-900 to-[var(--if-green)] text-[var(--if-gold-pale)] py-20 px-4">
        <div className="mx-auto max-w-4xl text-center flex flex-col items-center gap-5">
          <BlurFade delay={0.05}>
            <Link href="/knowledge-center" className="inline-flex items-center min-h-9 gap-1 text-sm text-[var(--if-gold-pale)]/80 hover:text-[var(--if-gold-light)] transition-colors mb-2">
              <ChevronLeft className="h-4 w-4" />
              {copy.knowledge_center[lang]}
            </Link>
          </BlurFade>
          <BlurFade delay={0.1}>
            <span className="font-arabic text-4xl text-[var(--if-gold-light)]">تعلُّم القرآن</span>
          </BlurFade>
          <BlurFade delay={0.15}>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-[var(--if-gold-light)]">
              {copy.learn_quran[lang]}
            </h1>
          </BlurFade>
          <BlurFade delay={0.2}>
            <p className="text-[var(--if-gold-pale)]/70 max-w-xl">
              {copy.reading_tajweed_tafseer_hifz_complete[lang]}
            </p>
          </BlurFade>
          <BlurFade delay={0.25} className="flex gap-4 flex-wrap justify-center text-sm">
            {[
              { n: "4",   l: copy.stages[lang] },
              { n: "8",   l: copy.tajweed_rules[lang] },
              { n: "6",   l: copy.rabbana_duas[lang] },
              { n: "∞",   l: copy.free[lang] },
            ].map(({ n, l }) => (
              <div key={l} className="px-4 py-2.5 rounded-xl bg-white/5 border border-[var(--if-gold)]/20 text-center min-w-[70px]">
                <div className="font-display text-xl font-bold text-[var(--if-gold-light)]">{n}</div>
                <div className="text-xs text-[var(--if-gold-pale)]/80">{l}</div>
              </div>
            ))}
          </BlurFade>
        </div>
      </section>

      {/* Journey stages */}
      <section className="py-16 px-4 bg-[var(--if-cream-light)]">
        <div className="mx-auto max-w-3xl">
          <BlurFade delay={0.1}>
            <h2 className="font-display text-3xl font-bold text-[var(--if-green)] text-center mb-10">
              {copy.n_4_stage_learning_journey[lang]}
            </h2>
          </BlurFade>

          <div className="relative mb-10">
            <div className="hidden md:block absolute top-6 left-8 right-8 h-0.5 bg-[var(--if-gold)]/20" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stages.map((s) => {
                const Icon = s.icon;
                return (
                  <button
                    key={s.num}
                    onClick={() => setOpenStage(openStage === s.num ? null : s.num)}
                    className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${
                      openStage === s.num
                        ? "bg-[var(--if-green)] border-[var(--if-gold)]/40 text-[var(--if-gold-pale)]"
                        : "bg-white border-[var(--if-gold)]/15 text-[var(--if-text)] hover:border-[var(--if-gold)]/40"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full ${s.color} flex items-center justify-center`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-semibold text-sm text-center leading-snug">{s.title[lang]}</span>
                    <span className={`font-arabic text-xs ${openStage === s.num ? "text-[var(--if-gold-light)]" : "text-[var(--if-text-muted)]"}`}>{s.arabic}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {openStage !== null && (() => {
            const stage = stages.find(s => s.num === openStage)!;
            return (
              <BlurFade delay={0.05}>
                <div className="bg-white rounded-2xl border border-[var(--if-gold)]/20 p-6">
                  <h3 className="font-display text-xl font-bold text-[var(--if-green)] mb-1">{stage.title[lang]}</h3>
                  <p className="text-sm text-[var(--if-text-muted)] mb-5">{stage.desc[lang]}</p>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[var(--if-gold-ink)] mb-3">
                    {copy.what_you_ll_learn[lang]}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {stage.topics.map((t, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-[var(--if-gold)]/8 border border-[var(--if-gold)]/20 text-[var(--if-text)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--if-gold)] flex-shrink-0" />
                        {t[lang]}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200/60">
                    <span className="text-lg leading-none mt-0.5">🎯</span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-emerald-700 mb-1">
                        {copy.stage_goal[lang]}
                      </p>
                      <p className="text-sm text-emerald-900">{stage.goal[lang]}</p>
                    </div>
                  </div>
                </div>
              </BlurFade>
            );
          })()}
        </div>
      </section>

      {/* Tajweed Academy */}
      <section className="py-16 px-4 bg-[var(--if-green)]">
        <div className="mx-auto max-w-4xl">
          <BlurFade delay={0.1}>
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--if-gold-ink)] mb-2">
              {copy.flagship_section[lang]}
            </p>
            <h2 className="font-display text-3xl font-bold text-white mb-2">
              {copy.tajweed_academy[lang]}
              <span className="font-arabic text-[var(--if-gold-ink)] ml-3 font-normal">علم التجويد</span>
            </h2>
            <p className="text-[var(--if-gold-pale)]/70 text-sm mb-8">
              {copy.n_8_essential_tajweed_rules_explanation[lang]}
            </p>
          </BlurFade>

          {/* Step dots */}
          <div className="flex gap-2 flex-wrap mb-3">
            {tajweedSteps.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setTjIdx(i)}
                aria-label={`${copy.rule[lang]} ${i + 1}`}
                aria-current={i === tjIdx ? "step" : undefined}
                className="flex-1 min-w-[14px] min-h-6 flex items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]"
              >
                {/* 24px hit box (WCAG 2.2 AA), 8px visual bar inside. */}
                <span
                  aria-hidden="true"
                  className={`h-2 w-full rounded-full transition-colors ${
                    i === tjIdx ? "bg-[var(--if-gold)]" : i < tjIdx ? "bg-[var(--if-gold)]/50" : "bg-white/15"
                  }`}
                />
              </button>
            ))}
          </div>
          <p className="text-xs text-[var(--if-gold-pale)]/80 mb-6">
            {copy.rule[lang]} <span className="font-bold text-[var(--if-gold-light)]">{tjIdx + 1}</span> / {tajweedSteps.length}
          </p>

          <div className="grid md:grid-cols-[1fr_1.4fr] gap-6 items-start">
            {/* Glyph panel */}
            <div className="rounded-2xl border border-[var(--if-gold)]/25 bg-white/5 p-6 flex flex-col items-center justify-center min-h-[220px] gap-4">
              <div className="font-arabic text-5xl text-[var(--if-gold-light)] leading-relaxed" dir="rtl" lang="ar">
                {step.glyph}
              </div>
              <div className="font-arabic text-base text-[var(--if-gold-light)]" dir="rtl" lang="ar">{step.ar}</div>
              <p className="text-xs uppercase tracking-widest text-[var(--if-gold-pale)]/80">
                {copy.tajweed_rule[lang]}
              </p>
            </div>

            {/* Detail panel */}
            <div className="rounded-2xl border border-[var(--if-gold)]/25 bg-white/5 p-6 space-y-4">
              <h3 className="text-lg font-bold text-white">
                {step.name[lang]}
              </h3>

              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--if-gold-ink)] mb-1.5">
                  {copy.explanation[lang]}
                </p>
                <p className="text-sm text-[var(--if-gold-pale)]/85 leading-relaxed">{step.expl[lang]}</p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--if-gold-ink)] mb-2">
                  {copy.example[lang]}
                </p>
                <div className="font-arabic text-2xl text-[var(--if-gold-light)] bg-[var(--if-gold)]/10 border border-[var(--if-gold)]/20 rounded-xl px-4 py-3 text-center leading-relaxed mb-1.5" dir="rtl" lang="ar">
                  {step.example_ar}
                </div>
                <p className="text-xs italic text-[var(--if-gold-pale)]/65">{step.note[lang]}</p>
              </div>

              <div className="flex gap-2.5 items-start bg-red-900/20 border border-red-400/25 rounded-xl p-3">
                <span className="text-sm mt-0.5">⚠</span>
                <p className="text-sm text-[var(--if-gold-pale)]/85 leading-snug">
                  <span className="font-semibold text-red-300">{copy.common_mistake[lang]}</span>
                  {step.mistake[lang]}
                </p>
              </div>
            </div>
          </div>

          {/* Prev / Next */}
          <div className="flex justify-between mt-6 gap-3">
            <button
              onClick={() => setTjIdx(i => Math.max(0, i - 1))}
              disabled={tjIdx === 0}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[var(--if-gold)]/40 text-[var(--if-gold-light)] text-sm font-semibold disabled:opacity-30 hover:bg-[var(--if-gold)]/12 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              {copy.back[lang]}
            </button>
            <button
              onClick={() => setTjIdx(i => Math.min(tajweedSteps.length - 1, i + 1))}
              disabled={tjIdx === tajweedSteps.length - 1}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--if-gold)] text-[var(--if-green)] text-sm font-bold disabled:opacity-30 hover:bg-[var(--if-gold-light)] transition-colors"
            >
              {copy.next[lang]}
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Rabbana Duas */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-5xl">
          <BlurFade delay={0.1}>
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--if-gold-ink)] mb-2 text-center">
              {copy.quran_duas[lang]}
            </p>
            <h2 className="font-display text-3xl font-bold text-[var(--if-green)] text-center mb-2">
              {copy.the_rabbana_duas[lang]}
            </h2>
            <p className="text-sm text-[var(--if-text-muted)] text-center mb-10">
              {copy.supplications_from_the_quran_beginning[lang]}
            </p>
          </BlurFade>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rabbanaDuas.map((d, i) => (
              <BlurFade key={i} delay={0.06 * i}>
                <div className="relative overflow-hidden bg-[var(--if-cream-light)] border border-[var(--if-gold)]/20 rounded-2xl p-5 flex flex-col hover:-translate-y-1 transition-transform group">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--if-gold)]" />
                  <span className="self-start text-xs font-bold uppercase tracking-widest text-[var(--if-gold-ink)] bg-[var(--if-gold)]/10 border border-[var(--if-gold)]/20 rounded-full px-3 py-1 mb-4">
                    {d.ref[lang]}
                  </span>
                  <p className="font-arabic text-2xl text-[var(--if-green)] leading-relaxed text-right mb-3" dir="rtl" lang="ar">
                    {d.ar}
                  </p>
                  <p className="text-sm italic text-emerald-700 font-medium mb-2 leading-snug">{d.tr[lang]}</p>
                  <p className="text-sm text-[var(--if-text-muted)] leading-relaxed flex-1">{d.meaning[lang]}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Key Surahs */}
      <section className="py-16 px-4 bg-[var(--if-cream-light)]">
        <div className="mx-auto max-w-5xl">
          <BlurFade delay={0.1}>
            <h2 className="font-display text-3xl font-bold text-[var(--if-green)] text-center mb-10">
              {copy.key_surah_lessons[lang]}
            </h2>
          </BlurFade>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {surahs.map((s, i) => (
              <BlurFade key={s.no} delay={0.06 * i}>
                <div className="relative overflow-hidden bg-white rounded-2xl border border-[var(--if-gold)]/15 p-5 hover:border-[var(--if-gold)]/50 transition-all group flex flex-col gap-3">
                  <BorderBeam size={80} duration={6} colorFrom="#c8922a" colorTo="#e8b84b" className="opacity-0 group-hover:opacity-100" />
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-[var(--if-green)]">{s.en}</h3>
                      <p className="text-xs text-emerald-700 font-medium">{s.meaning[lang]}</p>
                    </div>
                    <span className="font-arabic text-3xl text-[var(--if-gold-light)]" dir="rtl" lang="ar">{s.ar}</span>
                  </div>
                  <p className="text-xs text-[var(--if-text-muted)] leading-relaxed">{s.virtue[lang]}</p>
                  <div className="flex gap-1.5 items-start bg-emerald-50 border border-emerald-200/60 rounded-lg p-2.5">
                    <span className="text-xs font-bold text-emerald-700 flex-shrink-0">
                      {copy.lesson[lang]}
                    </span>
                    <span className="text-xs text-emerald-800 leading-relaxed">{s.lesson[lang]}</span>
                  </div>
                  <p className="text-xs text-[var(--if-gold-ink)] italic">{s.tip[lang]}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Ayah Challenge */}
      <section className="py-16 px-4 bg-[var(--if-green)]">
        <div className="mx-auto max-w-2xl">
          <BlurFade delay={0.1}>
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--if-gold-ink)] mb-2 text-center">
              {copy.ayah_of_the_day[lang]}
            </p>
            <h2 className="font-display text-3xl font-bold text-white text-center mb-10">
              {copy.daily_quran_challenge[lang]}
            </h2>
          </BlurFade>

          <BlurFade delay={0.15}>
            <div className="relative overflow-hidden rounded-2xl border border-[var(--if-gold)]/25 bg-[var(--if-gold)]/8 p-7 text-center">
              <BorderBeam size={300} duration={12} colorFrom="#c8922a" colorTo="#e8b84b" />
              <p className="font-arabic text-3xl text-[var(--if-gold-light)] leading-relaxed mb-5" dir="rtl" lang="ar">
                {todayAyah.ar}
              </p>
              <p className="text-sm italic text-[var(--if-gold-pale)]/80 mb-2 leading-relaxed">
                {lang === "te" ? todayAyah.te : todayAyah.en}
              </p>
              <p className="text-xs text-[var(--if-gold-ink)] font-semibold mb-7">{todayAyah.ref}</p>

              <div className="border-t border-[var(--if-gold)]/20 pt-6 text-left">
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--if-gold-ink)] mb-2">
                  {copy.reflection_prompt[lang]}
                </p>
                <p className="text-sm text-[var(--if-gold-pale)]/80 leading-relaxed">{todayAyah.reflect[lang]}</p>
              </div>
            </div>
          </BlurFade>

          <BlurFade delay={0.2}>
            <p className="text-xs text-[var(--if-gold-pale)]/80 text-center mt-4">
              {copy.n_7_ayahs_one_changes_with[lang]}
            </p>
          </BlurFade>
        </div>
      </section>

      {/* Reflection CTA */}
      <section className="py-16 px-4">
        <BlurFade delay={0.1}>
          <div className="relative overflow-hidden mx-auto max-w-2xl text-center text-[var(--if-gold-pale)] px-6 py-10 rounded-2xl border border-[var(--if-gold)]/20 bg-[var(--if-green)]">
            <BorderBeam size={300} duration={12} colorFrom="#c8922a" colorTo="#e8b84b" />
            <div className="font-arabic text-3xl text-[var(--if-gold-light)] mb-4 leading-relaxed" dir="rtl" lang="ar">
              أَفَلَا يَتَدَبَّرُونَ الْقُرْآنَ
            </div>
            <p className="text-sm text-[var(--if-gold-pale)]/70 mb-6">
              {copy.will_they_not_reflect_upon[lang]}
            </p>
            <Link href="/knowledge-center" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--if-gold)] text-[var(--if-green)] font-bold hover:bg-[var(--if-gold-light)] transition-colors text-sm">
              {copy.explore_all_portals[lang]} <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </BlurFade>
      </section>

      <LessonIndex portal="learn-quran" />

    </PageShell>
  );
}

export default function LearnQuran() {
  return <LearnQuranPage />;
}
