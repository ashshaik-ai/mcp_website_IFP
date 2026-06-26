"use client";

import { useState } from "react";
import Link from "next/link";
import { I18nProvider, useI18n } from "@/lib/i18n/context";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────

const prayers = [
  {
    name: { te: "ఫజ్ర్", en: "Fajr" }, ar: "الفجر",
    time: { te: "సూర్యోదయానికి ముందు", en: "Before sunrise" },
    fard: 2, sunnah: "2 Sunnah (before)", witr: false,
    note: { te: "రోజులో మొదటి నమాజ్ — ఆత్మను మేల్కొలపడానికి", en: "First prayer of the day — to awaken the soul" },
    color: "from-indigo-900 to-indigo-800",
  },
  {
    name: { te: "జుహ్ర్", en: "Zuhr" }, ar: "الظهر",
    time: { te: "మధ్యాహ్నం తర్వాత", en: "After midday" },
    fard: 4, sunnah: "4 Sunnah (before) + 2 (after)", witr: false,
    note: { te: "మధ్యాహ్న విరామంలో అల్లాహ్‌ను స్మరించడం", en: "Remembering Allah in the midday pause" },
    color: "from-amber-800 to-amber-700",
  },
  {
    name: { te: "అసర్", en: "Asr" }, ar: "العصر",
    time: { te: "మధ్యాహ్నం తర్వాత", en: "Mid-afternoon" },
    fard: 4, sunnah: "4 Sunnah (before)", witr: false,
    note: { te: "ప్రవక్త ﷺ దీన్ని ప్రత్యేకంగా నొక్కి చెప్పారు", en: "The Prophet ﷺ emphasised this prayer especially" },
    color: "from-orange-800 to-orange-700",
  },
  {
    name: { te: "మఘ్రిబ్", en: "Maghrib" }, ar: "المغرب",
    time: { te: "సూర్యాస్తమయం తర్వాత", en: "After sunset" },
    fard: 3, sunnah: "2 Sunnah (after)", witr: false,
    note: { te: "సూర్యాస్తమయ కృతజ్ఞత నమాజ్", en: "Prayer of gratitude at sunset" },
    color: "from-rose-900 to-rose-800",
  },
  {
    name: { te: "ఇషా", en: "Isha" }, ar: "العشاء",
    time: { te: "రాత్రి", en: "Night" },
    fard: 4, sunnah: "2 Sunnah + 3 Witr", witr: true,
    note: { te: "రాత్రి నమాజ్, విత్ర్‌తో రోజు ముగించడం", en: "Night prayer, concluding the day with Witr" },
    color: "from-slate-900 to-slate-800",
  },
];

const wuduSteps = [
  {
    n: 1, title: { te: "నియ్యత్ (ఉద్దేశం)", en: "Niyyah (Intention)" }, ar: "النية",
    desc: { te: "అల్లాహ్ కోసం వుజూ చేయాలని మనసులో నిర్ణయించుకోండి", en: "Make the intention in your heart to perform Wudu for the sake of Allah" },
    dua: { ar: null, tr: null, te: "మనసులో సంకల్పం — ఉచ్చరించాల్సిన పని లేదు", en: "Intention is in the heart — no verbal dua required" },
  },
  {
    n: 2, title: { te: "బిస్మిల్లా", en: "Say Bismillah" }, ar: "بِسْمِ اللَّهِ",
    desc: { te: "ప్రారంభించే ముందు చదవండి", en: "Say before beginning" },
    dua: { ar: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", tr: "Bismillāhir-raḥmānir-raḥīm", te: "పరమ కరుణామయుడు, కృపాశీలుడైన అల్లాహ్ పేరుతో", en: "In the name of Allah, the Most Gracious, the Most Merciful" },
  },
  {
    n: 3, title: { te: "చేతులు కడగండి", en: "Wash Hands" }, ar: "غَسْلُ الْيَدَيْنِ",
    desc: { te: "రెండు చేతులనూ మణికట్టు వరకు 3 సార్లు కడగండి", en: "Wash both hands up to wrists 3 times" },
    dua: { ar: null, tr: null, te: "సున్నత్ — వుదూ ప్రారంభంలో", en: "Sunnah — at the start of Wudu" },
  },
  {
    n: 4, title: { te: "నోరు కడగండి", en: "Rinse Mouth" }, ar: "الْمَضْمَضَة",
    desc: { te: "నోటిలో నీరు తీసుకుని 3 సార్లు శుభ్రం చేయండి", en: "Take water in mouth and rinse 3 times" },
    dua: { ar: null, tr: null, te: "నోటిలోపలికి నీరు చేరేలా చేయండి", en: "Swirl water around the inside of the mouth" },
  },
  {
    n: 5, title: { te: "ముక్కు శుభ్రం చేయండి", en: "Clean Nose" }, ar: "الِاسْتِنْشَاق",
    desc: { te: "ముక్కులోకి నీరు పీల్చి 3 సార్లు శుభ్రం చేయండి", en: "Inhale water into nostrils and clean 3 times" },
    dua: { ar: null, tr: null, te: "ఎడమ చేతితో ముక్కు శుభ్రం చేయండి", en: "Use the left hand to clean the nose" },
  },
  {
    n: 6, title: { te: "ముఖం కడగండి", en: "Wash Face" }, ar: "غَسْلُ الْوَجْهِ",
    desc: { te: "నొసలు నుండి గడ్డం వరకు, చెవి నుండి చెవి వరకు 3 సార్లు", en: "From forehead to chin, ear to ear — 3 times" },
    dua: { ar: "اللَّهُمَّ بَيِّضْ وَجْهِي", tr: "Allāhumma bayyiḍ wajhī", te: "ఓ అల్లాహ్, నా ముఖాన్ని ప్రకాశింపజేయి", en: "O Allah, brighten my face" },
  },
  {
    n: 7, title: { te: "చేతులు కడగండి (మోచేయి వరకు)", en: "Wash Arms to Elbows" }, ar: "غَسْلُ الذِّرَاعَيْنِ",
    desc: { te: "కుడి చేయి ముందు, మోచేయి వరకు 3 సార్లు. తర్వాత ఎడమ చేయి", en: "Right arm first, up to elbow, 3 times. Then left arm" },
    dua: { ar: null, tr: null, te: "కుడి నుండి ఎడమకు — క్రమం తప్పనిసరి", en: "Right before left — the order is obligatory" },
  },
  {
    n: 8, title: { te: "తల మసహ్", en: "Wipe Head (Masah)" }, ar: "مَسْحُ الرَّأْسِ",
    desc: { te: "తడి చేతులతో తల ముందు నుండి వెనకకు 1 సారి", en: "With wet hands, wipe head from front to back — 1 time" },
    dua: { ar: "اللَّهُمَّ أَظِلَّنِي تَحْتَ ظِلِّ عَرْشِكَ", tr: "Allāhumma aẓillanī taḥta ẓilli ʿarshik", te: "ఓ అల్లాహ్, నీ సింహాసన నీడలో నన్ను ఆశ్రయించు", en: "O Allah, shelter me under the shade of Your Throne" },
  },
  {
    n: 9, title: { te: "చెవులు మసహ్", en: "Wipe Ears" }, ar: "مَسْحُ الْأُذُنَيْنِ",
    desc: { te: "చూపుడు వేళ్ళతో లోపలి భాగం, బొటనవేళ్ళతో బయటి భాగం", en: "Index fingers inside, thumbs outside — 1 time" },
    dua: { ar: null, tr: null, te: "తలతో పాటే — అదే నీటితో", en: "Part of head wipe — same water" },
  },
  {
    n: 10, title: { te: "పాదాలు కడగండి", en: "Wash Feet" }, ar: "غَسْلُ الرِّجْلَيْنِ",
    desc: { te: "కుడి పాదం ముందు, గసగసాల వరకు 3 సార్లు. తర్వాత ఎడమ పాదం", en: "Right foot first, up to ankles, 3 times. Then left foot" },
    dua: { ar: "اللَّهُمَّ ثَبِّتْ قَدَمَيَّ عَلَى الصِّرَاطِ", tr: "Allāhumma thabbit qadamayya ʿalaṣ-ṣirāṭ", te: "ఓ అల్లాహ్, న్యాయమార్గంపై నా పాదాలను స్థిరపరచు", en: "O Allah, keep my feet firm on the Straight Path" },
  },
];

const simSteps = [
  {
    n: 1, pos: { te: "నిలబడి, చేతులు చెవుల వరకు ఎత్తి", en: "Standing, raise hands to ears" },
    name: "Takbeer-ul-Ihraam", nameAr: "تَكْبِيرَةُ الْإِحْرَام",
    ar: "اللَّهُ أَكْبَر",
    tr: "Allāhu Akbar",
    mean: { te: "అల్లాహ్ అందరికంటే గొప్పవాడు — ఈ తక్బీర్‌తో నమాజ్ ప్రారంభమవుతుంది. ఇప్పటి నుండి నమాజ్ ముగిసే వరకు లౌకిక విషయాలు నిషేధం.", en: "Allah is the Greatest — the prayer begins with this Takbeer. From now until Salam, worldly matters are forbidden." },
    warn: { te: "తక్బీర్ ముందు నియ్యత్ (ఉద్దేశం) మనసులో పెట్టుకోవడం తప్పనిసరి.", en: "Making the intention (niyyah) before Takbeer is obligatory." },
  },
  {
    n: 2, pos: { te: "నిలబడి, కుడిచేతిని ఎడమచేతిపై ఉంచి", en: "Standing, right hand over left on chest" },
    name: "Thana (Opening Dua)", nameAr: "الثَّنَاء",
    ar: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَىٰ جَدُّكَ وَلَا إِلَٰهَ غَيْرُكَ",
    tr: "Subḥānaka Allāhumma wa biḥamdika wa tabārakasmuka wa taʿālā jadduka wa lā ilāha ghayruk",
    mean: { te: "ఓ అల్లాహ్, నీవు పరిశుద్ధుడవు, నీ స్తోత్రంతో నిండివున్నావు. నీ నామం శుభకరమైనది, నీ ఘనత ఉన్నతమైనది, నీవు తప్ప వేరే ఇలాహ్ లేడు.", en: "O Allah, glory and praise be to You. Blessed is Your Name, Exalted is Your Majesty, and there is no god but You." },
    warn: { te: "ఈ దువా మొదటి రకాత్‌లో మాత్రమే చదివే తెరిచే సనా; ప్రతి రకాత్‌లో కాదు.", en: "Thana is recited only in the first raka'ah — not repeated in subsequent units." },
  },
  {
    n: 3, pos: { te: "నిలబడి, ఫాతిహా పఠించి", en: "Standing, recite Al-Fatihah" },
    name: "Surah Al-Fatihah", nameAr: "الْفَاتِحَة",
    ar: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    tr: "Al-ḥamdu lillāhi rabbil-ʿālamīn",
    mean: { te: "సర్వలోక ప్రభువైన అల్లాహ్‌కే సర్వస్తోత్రాలు — ప్రతి రకాత్‌లో ఫాతిహా చదవాలి. ఇది లేకుండా నమాజ్ చెల్లదు.", en: "All praise is for Allah, Lord of all worlds — Al-Fatihah is recited in every unit. The prayer is invalid without it." },
    warn: { te: "ఫాతిహాను చాలా వేగంగా, అర్థాన్ని గమనించకుండా చదవడం సాధారణ తప్పు.", en: "Rushing through Al-Fatihah without reflecting on its meaning is a common mistake." },
  },
  {
    n: 4, pos: { te: "వంగి, చేతులు మోకాళ్లపై ఉంచి", en: "Bowing, hands gripping the knees" },
    name: "Ruku", nameAr: "الرُّكُوع",
    ar: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
    tr: "Subḥāna Rabbiyal-ʿAẓīm",
    mean: { te: "నా మహోన్నత ప్రభువు పరిశుద్ధుడు — మూడుసార్లు చెప్పాలి. వీపు నేలకు సమాంతరంగా ఉండాలి.", en: "Glory to my Lord, the Most Great — said three times. The back should be parallel to the ground." },
    warn: { te: "రుకూలో వీపు పూర్తిగా వంచకపోవడం, తొందరగా లేవడం — రుకూ అందులో శరీరం స్థిరపడాలి (తుమానీనా).", en: "Not straightening the back fully in ruku, or rising too quickly — the body must be still (tuma'ninah)." },
  },
  {
    n: 5, pos: { te: "రుకూ నుండి లేచి నిటారుగా నిలబడి", en: "Rising from Ruku to stand upright" },
    name: "Qawm", nameAr: "الْقَوْم",
    ar: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ · رَبَّنَا وَلَكَ الْحَمْد",
    tr: "Samiʿallāhu liman ḥamidah · Rabbanā wa lakal-ḥamd",
    mean: { te: "అల్లాహ్ ఆయనను కొనియాడిన వారి మాటలు వింటాడు · మా ప్రభూ, సర్వస్తోత్రాలు నీకే — లేచేటప్పుడు మొదటిది, నిటారుగా నిలబడినప్పుడు రెండవది.", en: "Allah hears those who praise Him · Our Lord, all praise is for You — first said while rising, second when standing upright." },
    warn: { te: "రుకూ నుండి లేవకుండా నేరుగా సజ్దాకు వెళ్లడం తప్పు — ఖౌమ్ తప్పనిసరి దశ.", en: "Going directly from ruku to sujood without standing is wrong — Qawm is an obligatory position." },
  },
  {
    n: 6, pos: { te: "సాష్టాంగం — 7 అవయవాలు నేలపై", en: "Prostration — 7 body parts on ground" },
    name: "Sujood", nameAr: "السُّجُود",
    ar: "سُبْحَانَ رَبِّيَ الْأَعْلَى",
    tr: "Subḥāna Rabbiyal-Aʿlā",
    mean: { te: "నా అత్యున్నత ప్రభువు పరిశుద్ధుడు — మూడుసార్లు. ఇది బానిస అల్లాహ్‌కు అత్యంత దగ్గరగా ఉండే స్థానం.", en: "Glory to my Lord, the Most High — three times. This is the closest a servant is to Allah." },
    warn: { te: "నుదురు + ముక్కు + రెండు చేతులు + రెండు మోకాళ్లు + రెండు పాదాల వేళ్లు — ఏడు అవయవాలూ నేలను తాకాలి.", en: "Forehead + nose + both hands + both knees + toes of both feet — all seven must touch the ground." },
  },
  {
    n: 7, pos: { te: "రెండు సజ్దాల మధ్య కూర్చొని", en: "Sitting between the two prostrations" },
    name: "Jalsa", nameAr: "الْجَلْسَة",
    ar: "رَبِّ اغْفِرْ لِي وَارْحَمْنِي",
    tr: "Rabbi-ghfir lī warḥamnī",
    mean: { te: "నా ప్రభూ, నన్ను క్షమించు మరియు నాపై దయ చూపించు — రెండు సజ్దాల మధ్య స్వల్ప కూర్చున్నప్పుడు చదవాలి.", en: "My Lord, forgive me and have mercy on me — recited during the brief sitting between two prostrations." },
    warn: { te: "జల్సాను వదిలేయడం లేదా చాలా వేగంగా సజ్దాకు వెళ్లడం — రెండు సజ్దాల మధ్య ఈ కూర్చుండటం తప్పనిసరి.", en: "Skipping Jalsa or rushing into the second sujood — this brief sitting is obligatory." },
  },
  {
    n: 8, pos: { te: "చివరి రకాత్‌లో కూర్చొని", en: "Sitting in the final raka'ah" },
    name: "Tashahhud", nameAr: "التَّشَهُّد",
    ar: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ · السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ",
    tr: "At-taḥiyyātu lillāhi waṣ-ṣalawātu waṭ-ṭayyibāt · As-salāmu ʿalayka ayyuhan-nabiyy",
    mean: { te: "అన్ని వందనాలు, నమాజులు మరియు పవిత్ర విషయాలు అల్లాహ్‌కే — తర్వాత దురూద్ ఇబ్రాహీమ్ చదవాలి, ఆపై దువా.", en: "All greetings, prayers, and pure things are for Allah — followed by Durood Ibrahim and then a du'a." },
    warn: { te: "తషహ్హుద్‌లో 'అష్హదు అల్లా ఇలాహ ఇల్లల్లాహ్' చదివేటప్పుడు చూపుడువేలు ఎత్తడం సున్నత్.", en: "Raising the index finger at 'ashhadu allā ilāha illallāh' is sunnah." },
  },
  {
    n: 9, pos: { te: "తలను కుడివైపు, తర్వాత ఎడమవైపు తిప్పి", en: "Turn head right, then left" },
    name: "Salam", nameAr: "السَّلَام",
    ar: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّه",
    tr: "As-salāmu ʿalaykum wa raḥmatullāh",
    mean: { te: "మీపై శాంతి మరియు అల్లాహ్ కరుణ కురియుగాక — ఈ రెండు సలాంలతో నమాజ్ ముగుస్తుంది. ఒక్కో సలాంలో తల తగినంత తిప్పాలి.", en: "Peace and mercy of Allah be upon you — the prayer ends with these two salams. Turn the head fully for each." },
    warn: { te: "ఒక్క సలాంతో ముగించడం, లేదా రెండవ సలాంను వదిలేయడం తప్పు.", en: "Ending with only one salam or omitting the second salam is incorrect." },
  },
];

const mistakes = [
  {
    cat: { te: "వుదూ తప్పులు", en: "Wudu Mistakes" },
    icon: "💧",
    items: [
      { bad: { te: "అవయవాలను తడపకుండా వదిలేయడం (పొడి మడమలు, మోచేతులు).", en: "Leaving body parts dry (dry heels, dry elbows)." }, good: { te: "ప్రతి అవయవంపై నీరు పూర్తిగా చేరేలా చూసుకోండి.", en: "Make sure water reaches every part of each limb." } },
      { bad: { te: "నీటిని వృథా చేయడం, అతిగా వాడటం.", en: "Wasting water and being excessive." }, good: { te: "మూడుసార్లకు మించకుండా, మితంగా వాడండి.", en: "Use moderately — no more than three washes." } },
      { bad: { te: "బిస్మిల్లాహ్ చదవకుండా వుదూ ప్రారంభించడం.", en: "Starting Wudu without saying Bismillah." }, good: { te: "ప్రతిసారీ 'బిస్మిల్లాహ్' తో ప్రారంభించండి.", en: "Begin every Wudu with 'Bismillah'." } },
    ],
  },
  {
    cat: { te: "నమాజ్ తప్పులు", en: "Salah Mistakes" },
    icon: "🕌",
    items: [
      { bad: { te: "రకాతుల మధ్య తొందరపడటం, స్థిరత్వం (తుమానీనా) లేకపోవడం.", en: "Rushing between positions without stillness (tuma'ninah)." }, good: { te: "ప్రతి దశలో శరీరం స్థిరపడేంత వరకు ఆగండి.", en: "Pause in each position until the body settles." } },
      { bad: { te: "ఇమామ్‌కు ముందుగా కదలడం.", en: "Moving ahead of the imam." }, good: { te: "ఇమామ్ తర్వాతే ప్రతి కదలికను అనుసరించండి.", en: "Follow the imam — move only after he does." } },
      { bad: { te: "సజ్దాలో ఏడు అవయవాలు నేలను తాకకపోవడం.", en: "The seven limbs not touching the ground in sujood." }, good: { te: "నుదురు, ముక్కు, రెండు చేతులు, మోకాళ్లు, కాలి వేళ్లు నేలపై ఉంచండి.", en: "Place forehead, nose, both hands, knees and toes on the ground." } },
    ],
  },
  {
    cat: { te: "పఠన తప్పులు", en: "Recitation Mistakes" },
    icon: "📖",
    items: [
      { bad: { te: "అర్థం మారిపోయేంత తప్పుగా ఉచ్చరించడం.", en: "Mispronouncing words so the meaning changes." }, good: { te: "అక్షరాలను నెమ్మదిగా, స్పష్టంగా, సరైన మఖ్‌రజ్‌తో పలకండి.", en: "Recite slowly and clearly with the correct letter sounds." } },
      { bad: { te: "ఫాతిహాను వదిలేయడం లేదా చాలా వేగంగా చదవడం.", en: "Skipping Al-Fatihah or reciting it too fast." }, good: { te: "ప్రతి రకాత్‌లో ఫాతిహాను స్పష్టంగా పూర్తిగా చదవండి.", en: "Recite Al-Fatihah fully and clearly in every unit." } },
      { bad: { te: "నమాజ్‌లో ఆలోచనలు ఎటో తిరగడం, యాంత్రికంగా చేయడం.", en: "Letting the mind wander; praying mechanically." }, good: { te: "మీరు పలికే మాటల అర్థాన్ని గుర్తుచేసుకుంటూ ఖుషూతో నిలబడండి.", en: "Stand with khushu, reflecting on the meaning of what you say." } },
    ],
  },
];

// ── Main Component ────────────────────────────────────────────────────────────

function LearnSalahPage() {
  const { lang } = useI18n();
  const [activeTab, setActiveTab] = useState<"times" | "wudu" | "salah" | "simulator" | "mistakes">("times");
  const [wuduStep, setWuduStep] = useState(0);
  const [salahStep, setSalahStep] = useState(0);
  const [simStep, setSimStep] = useState(0);
  const [expandedPrayer, setExpandedPrayer] = useState<number | null>(null);

  const tabs = [
    { id: "times" as const, te: "నమాజు సమయాలు", en: "Prayer Times" },
    { id: "wudu" as const, te: "వుజూ గైడ్", en: "Wudu Guide" },
    { id: "salah" as const, te: "నమాజ్ దశలు", en: "Salah Steps" },
    { id: "simulator" as const, te: "సిమ్యులేటర్", en: "Simulator" },
    { id: "mistakes" as const, te: "తప్పులు", en: "Mistakes" },
  ] as const;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-900 to-[var(--if-green)] text-[var(--if-gold-pale)] py-20 px-4">
        <div className="mx-auto max-w-4xl text-center flex flex-col items-center gap-4">
          <BlurFade delay={0.05}>
            <Link href="/knowledge-center" className="inline-flex items-center gap-1 text-sm text-[var(--if-gold-pale)]/60 hover:text-[var(--if-gold-light)] transition-colors mb-1">
              <ChevronLeft className="h-4 w-4" />{lang === "te" ? "జ్ఞాన కేంద్రం" : "Knowledge Center"}
            </Link>
          </BlurFade>
          <BlurFade delay={0.1}><span className="font-arabic text-4xl text-[var(--if-gold)]/70" dir="rtl">الصَّلَاة</span></BlurFade>
          <BlurFade delay={0.15}>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-[var(--if-gold-light)]">
              {lang === "te" ? "నమాజ్ నేర్చుకోండి" : "Learn Salah"}
            </h1>
          </BlurFade>
          <BlurFade delay={0.2}>
            <p className="text-[var(--if-gold-pale)]/70 max-w-xl">
              {lang === "te" ? "వుజూ నుండి సలాం వరకు — పూర్తి నమాజ్ మార్గదర్శి, అరబిక్ పఠనాలు, తెలుగు అర్థాలతో" : "From Wudu to Salam — complete prayer guide with Arabic recitations and translations"}
            </p>
          </BlurFade>
        </div>
      </section>

      {/* Tab bar */}
      <div className="sticky top-[68px] z-10 bg-[var(--if-cream-light)] border-b border-[var(--if-gold)]/15 px-4 py-2 overflow-x-auto">
        <div className="mx-auto max-w-4xl flex gap-2 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${activeTab === tab.id ? "bg-[var(--if-green)] text-[var(--if-gold-light)]" : "text-[var(--if-text-muted)] hover:bg-[var(--if-gold)]/10"}`}
            >
              {lang === "te" ? tab.te : tab.en}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tab: Prayer Times ───────────────────────────────────────────────── */}
      {activeTab === "times" && (
        <section className="py-16 px-4">
          <div className="mx-auto max-w-4xl">
            <BlurFade delay={0.1}>
              <h2 className="font-display text-3xl font-bold text-[var(--if-green)] text-center mb-2">
                {lang === "te" ? "5 ఫర్జ్ నమాజులు" : "The 5 Obligatory Prayers"}
              </h2>
              <p className="text-center text-sm text-[var(--if-text-muted)] mb-8">
                {lang === "te" ? "ప్రతి కార్డుపై నొక్కి వివరాలు చూడండి" : "Tap each card to expand details"}
              </p>
            </BlurFade>
            <div className="flex flex-col gap-3">
              {prayers.map((p, i) => (
                <BlurFade key={p.ar} delay={0.07 * i}>
                  <div className={`rounded-2xl overflow-hidden bg-gradient-to-r ${p.color} text-white shadow-lg`}>
                    <button
                      onClick={() => setExpandedPrayer(expandedPrayer === i ? null : i)}
                      className="w-full flex items-center gap-4 p-4 text-left"
                      aria-expanded={expandedPrayer === i}
                    >
                      <span className="font-arabic text-2xl text-[var(--if-gold-light)] w-12 text-center shrink-0" dir="rtl">{p.ar}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-display font-bold text-lg">{p.name[lang]}</div>
                        <div className="text-xs text-white/70">{p.time[lang]}</div>
                      </div>
                      <div className="text-xs bg-white/15 rounded-full px-3 py-1 shrink-0">
                        {p.fard} {lang === "te" ? "ఫర్జ్" : "Fard"}
                      </div>
                      <ChevronRight className={`h-4 w-4 text-white/60 shrink-0 transition-transform ${expandedPrayer === i ? "rotate-90" : ""}`} />
                    </button>
                    {expandedPrayer === i && (
                      <div className="px-5 pb-5 border-t border-white/10 pt-4 grid sm:grid-cols-2 gap-3 text-sm">
                        <div className="bg-white/10 rounded-xl p-3">
                          <div className="text-[var(--if-gold-light)] text-xs font-semibold uppercase tracking-wider mb-1">{lang === "te" ? "రకాతులు" : "Rakaat"}</div>
                          <div>{p.fard} {lang === "te" ? "ఫర్జ్" : "Fard"} · {p.sunnah}</div>
                          {p.witr && <div className="mt-1 text-[var(--if-gold-light)]">{lang === "te" ? "విత్ర్ తప్పనిసరి" : "Witr is emphasized"}</div>}
                        </div>
                        <div className="bg-white/10 rounded-xl p-3">
                          <div className="text-[var(--if-gold-light)] text-xs font-semibold uppercase tracking-wider mb-1">{lang === "te" ? "గమనిక" : "Note"}</div>
                          <div>{p.note[lang]}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </BlurFade>
              ))}
            </div>
            <BlurFade delay={0.5}>
              <div className="mt-6 p-4 rounded-2xl bg-[var(--if-cream-light)] border border-[var(--if-gold)]/15 text-center text-sm text-[var(--if-text-muted)]">
                {lang === "te"
                  ? "🕌 నమాజు సమయాలు స్థానం మరియు ఋతువు ప్రకారం మారుతాయి. స్థానిక మస్జిద్ అజాన్ అనుసరించండి."
                  : "🕌 Prayer times vary by location and season. Follow your local Masjid's adhan for accurate times."}
              </div>
            </BlurFade>
          </div>
        </section>
      )}

      {/* ── Tab: Wudu Guide ─────────────────────────────────────────────────── */}
      {activeTab === "wudu" && (
        <section className="py-16 px-4">
          <div className="mx-auto max-w-2xl">
            <BlurFade delay={0.1}>
              <h2 className="font-display text-3xl font-bold text-[var(--if-green)] text-center mb-2">
                {lang === "te" ? "వుజూ — పరిశుద్ధత" : "Wudu — Ablution"}
              </h2>
              <p className="text-center text-sm text-[var(--if-text-muted)] mb-6">
                {lang === "te" ? "అరబిక్ దువా మరియు అర్థంతో ప్రతి దశ" : "Each step with Arabic dua and translation"}
              </p>
            </BlurFade>
            <div className="relative overflow-hidden bg-white rounded-2xl border border-[var(--if-gold)]/20 p-6 mb-4">
              <BorderBeam size={200} duration={8} colorFrom="#0d3b1e" colorTo="#c8922a" />
              <div className="flex items-center gap-3 mb-4">
                <span className="w-9 h-9 rounded-full bg-[var(--if-green)] text-[var(--if-gold-light)] flex items-center justify-center font-bold">{wuduSteps[wuduStep].n}</span>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-bold text-[var(--if-green)]">{wuduSteps[wuduStep].title[lang]}</h3>
                </div>
                <span className="font-arabic text-xl text-[var(--if-gold)]/70" dir="rtl">{wuduSteps[wuduStep].ar}</span>
              </div>
              <p className="text-[var(--if-text-muted)] leading-relaxed mb-4">{wuduSteps[wuduStep].desc[lang]}</p>
              {wuduSteps[wuduStep].dua.ar && (
                <div className="mt-3 p-4 rounded-xl bg-[var(--if-cream-light)] border border-[var(--if-gold)]/20">
                  <div className="text-xs font-semibold text-[var(--if-gold)] uppercase tracking-wider mb-2">{lang === "te" ? "దువా" : "Dua"}</div>
                  <div className="font-arabic text-xl text-[var(--if-gold)] leading-relaxed text-right mb-2" dir="rtl">{wuduSteps[wuduStep].dua.ar}</div>
                  <div className="text-xs text-[var(--if-text-muted)] italic mb-1">{wuduSteps[wuduStep].dua.tr}</div>
                  <div className="text-sm text-[var(--if-text-muted)]">{wuduSteps[wuduStep].dua[lang]}</div>
                </div>
              )}
              {!wuduSteps[wuduStep].dua.ar && (
                <div className="mt-3 p-3 rounded-xl bg-[var(--if-cream-light)]/50 border border-[var(--if-gold)]/10">
                  <div className="text-sm text-[var(--if-text-muted)] italic">{wuduSteps[wuduStep].dua[lang]}</div>
                </div>
              )}
              <div className="flex items-center justify-between mt-6">
                <button disabled={wuduStep === 0} onClick={() => setWuduStep(s => s - 1)} className="flex items-center gap-1 px-4 py-2 rounded-full border border-[var(--if-gold)]/30 text-sm text-[var(--if-green)] disabled:opacity-30 hover:bg-[var(--if-cream-light)] transition-colors">
                  <ChevronLeft className="h-4 w-4" />{lang === "te" ? "వెనక" : "Back"}
                </button>
                <span className="text-xs text-[var(--if-text-muted)]">{wuduStep + 1} / {wuduSteps.length}</span>
                <button disabled={wuduStep === wuduSteps.length - 1} onClick={() => setWuduStep(s => s + 1)} className="flex items-center gap-1 px-4 py-2 rounded-full bg-[var(--if-green)] text-[var(--if-gold-light)] text-sm disabled:opacity-30 hover:bg-[var(--if-green)]/90 transition-colors">
                  {lang === "te" ? "తదుపరి" : "Next"}<ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {wuduSteps.map((s, i) => (
                <button key={s.n} onClick={() => setWuduStep(i)} className={`h-2 rounded-full transition-all ${i === wuduStep ? "bg-[var(--if-gold)]" : i < wuduStep ? "bg-emerald-400" : "bg-[var(--if-gold)]/20"}`} aria-label={`Step ${s.n}`} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Tab: Salah Steps ────────────────────────────────────────────────── */}
      {activeTab === "salah" && (
        <section className="py-16 px-4">
          <div className="mx-auto max-w-2xl">
            <BlurFade delay={0.1}>
              <h2 className="font-display text-3xl font-bold text-[var(--if-green)] text-center mb-8">
                {lang === "te" ? "నమాజ్ — దశల వారీ మార్గదర్శి" : "Salah — Step by Step"}
              </h2>
            </BlurFade>
            <div className="flex flex-col gap-3">
              {[
                { n: 1, name: "Takbeer", ar: "اللَّهُ أَكْبَر", tr: "Allāhu Akbar", te: "అల్లాహ్ అందరికంటే గొప్పవాడు", en: "Allah is the Greatest", pos: { te: "నిలబడి, చేతులు చెవుల వరకు ఎత్తి", en: "Standing, raise hands to ears" } },
                { n: 2, name: "Thana", ar: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ", tr: "Subḥānaka Allāhumma wa biḥamdik", te: "ఓ అల్లాహ్, నీవు పరిశుద్ధుడవు, నీ స్తోత్రంతో", en: "O Allah, glory and praise be to You", pos: { te: "నిలబడి, కుడిచేయి ఎడమపై", en: "Standing, right hand over left" } },
                { n: 3, name: "Al-Fatihah", ar: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", tr: "Al-ḥamdu lillāhi rabbil-ʿālamīn", te: "సర్వలోక ప్రభువైన అల్లాహ్‌కే స్తోత్రాలు", en: "Praise be to Allah, Lord of all worlds", pos: { te: "నిలబడి, ఫాతిహా పఠించి", en: "Standing, recite Al-Fatihah" } },
                { n: 4, name: "Ruku", ar: "سُبْحَانَ رَبِّيَ الْعَظِيمِ", tr: "Subḥāna Rabbiyal-ʿAẓīm", te: "నా మహోన్నత ప్రభువు పరిశుద్ధుడు (×3)", en: "Glory to my Lord, the Most Great (×3)", pos: { te: "వంగి, చేతులు మోకాళ్లపై", en: "Bowing, hands on knees" } },
                { n: 5, name: "Sujood", ar: "سُبْحَانَ رَبِّيَ الْأَعْلَى", tr: "Subḥāna Rabbiyal-Aʿlā", te: "నా అత్యున్నత ప్రభువు పరిశుద్ధుడు (×3)", en: "Glory to my Lord, the Most High (×3)", pos: { te: "సాష్టాంగం — 7 అవయవాలు నేలపై", en: "Prostration — 7 parts on ground" } },
                { n: 6, name: "Jalsa", ar: "رَبِّ اغْفِرْ لِي", tr: "Rabbighfir lī", te: "నా ప్రభూ, నన్ను క్షమించు", en: "My Lord, forgive me", pos: { te: "రెండు సజ్దాల మధ్య కూర్చొని", en: "Sitting between two prostrations" } },
                { n: 7, name: "Tashahhud", ar: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ", tr: "At-taḥiyyātu lillāhi waṣ-ṣalawāt", te: "అన్ని వందనాలు అల్లాహ్‌కే", en: "All greetings are for Allah", pos: { te: "చివరి రకాత్‌లో కూర్చొని", en: "Sitting in the final raka'ah" } },
                { n: 8, name: "Salam", ar: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّه", tr: "As-salāmu ʿalaykum wa raḥmatullāh", te: "మీపై శాంతి మరియు అల్లాహ్ కరుణ", en: "Peace and mercy of Allah be upon you", pos: { te: "తలను కుడి, తర్వాత ఎడమకు తిప్పి", en: "Turn head right, then left" } },
              ].map((step, i) => (
                <BlurFade key={step.n} delay={0.05 * i}>
                  <div className="bg-white rounded-xl border border-[var(--if-gold)]/15 p-4 flex gap-4">
                    <span className="w-8 h-8 rounded-full bg-[var(--if-green)] text-[var(--if-gold-light)] flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">{step.n}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="font-display font-bold text-[var(--if-green)]">{step.name}</span>
                        <span className="text-xs text-[var(--if-text-muted)]">{step.pos[lang]}</span>
                      </div>
                      <div className="font-arabic text-lg text-[var(--if-gold)] mb-1 text-right" dir="rtl">{step.ar}</div>
                      <div className="text-xs text-[var(--if-text-muted)] italic mb-1">{step.tr}</div>
                      <div className="text-sm text-[var(--if-text-muted)]">{step[lang]}</div>
                    </div>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Tab: Simulator ──────────────────────────────────────────────────── */}
      {activeTab === "simulator" && (
        <section className="py-16 px-4 bg-[var(--if-green)]">
          <div className="mx-auto max-w-2xl">
            <BlurFade delay={0.1}>
              <div className="text-center mb-8">
                <h2 className="font-display text-3xl font-bold text-[var(--if-gold-light)] mb-2">
                  {lang === "te" ? "నమాజ్ సిమ్యులేటర్" : "Salah Simulator"}
                </h2>
                <p className="text-[var(--if-gold-pale)]/70 text-sm">
                  {lang === "te" ? "తక్బీర్ నుండి సలాం వరకు — ఏం చేయాలి, ఏం చెప్పాలి, దాని అర్థం, తప్పులతో సహా" : "From Takbeer to Salam — what to do, say, its meaning, and common mistake at each step"}
                </p>
              </div>
            </BlurFade>

            {/* Progress dots */}
            <div className="flex gap-1.5 mb-4">
              {simSteps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSimStep(i)}
                  className={`flex-1 h-1.5 rounded-full transition-all ${i === simStep ? "bg-[var(--if-gold)]" : i < simStep ? "bg-[var(--if-gold)]/50" : "bg-white/15"}`}
                  aria-label={`Step ${i + 1}`}
                />
              ))}
            </div>
            <p className="text-xs text-[var(--if-gold-pale)]/50 mb-5 text-center">{lang === "te" ? `దశ ${simStep + 1} / ${simSteps.length}` : `Step ${simStep + 1} of ${simSteps.length}`}</p>

            <div className="relative overflow-hidden bg-white/5 border border-[var(--if-gold)]/25 rounded-2xl p-6">
              <div className="mb-5">
                <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">{simSteps[simStep].pos[lang]}</div>
                <h3 className="font-display text-2xl font-bold text-white">{simSteps[simStep].name}</h3>
                <div className="font-arabic text-sm text-[var(--if-gold-light)]/60 mt-0.5" dir="rtl">{simSteps[simStep].nameAr}</div>
              </div>

              {/* What to do */}
              <div className="flex gap-3 bg-white/5 border border-[var(--if-gold)]/15 rounded-xl p-4 mb-5">
                <span className="text-lg shrink-0">🤲</span>
                <div>
                  <div className="text-xs font-semibold text-[var(--if-gold)] uppercase tracking-wider mb-1">{lang === "te" ? "ఏం చేయాలి" : "Action"}</div>
                  <p className="text-sm text-[var(--if-gold-pale)]/90">{simSteps[simStep].pos[lang]}</p>
                </div>
              </div>

              {/* What to say */}
              <div className="mb-4">
                <div className="text-xs font-semibold text-[var(--if-gold)] uppercase tracking-wider mb-3">{lang === "te" ? "ఏం చెప్పాలి" : "Recitation"}</div>
                <div className="font-arabic text-2xl text-[var(--if-gold-light)] leading-loose text-right mb-2" dir="rtl">{simSteps[simStep].ar}</div>
                <div className="text-sm text-[var(--if-gold-pale)]/80 italic mb-1">{simSteps[simStep].tr}</div>
                <div className="text-sm text-[var(--if-gold-pale)]/60">{simSteps[simStep].mean[lang]}</div>
              </div>

              {/* Common mistake */}
              <div className="flex gap-3 bg-red-900/20 border border-red-500/30 rounded-xl p-4">
                <span className="text-base shrink-0">⚠️</span>
                <div>
                  <div className="text-xs font-semibold text-red-300 uppercase tracking-wider mb-1">{lang === "te" ? "సాధారణ తప్పు" : "Common Mistake"}</div>
                  <p className="text-sm text-[var(--if-gold-pale)]/80">{simSteps[simStep].warn[lang]}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-6 gap-3">
                <button
                  disabled={simStep === 0}
                  onClick={() => setSimStep(s => s - 1)}
                  className="flex items-center gap-1 px-5 py-2.5 rounded-lg border border-[var(--if-gold)]/40 text-sm text-[var(--if-gold-light)] disabled:opacity-30 hover:bg-white/10 transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />{lang === "te" ? "వెనక" : "Back"}
                </button>
                {simStep === simSteps.length - 1 ? (
                  <button
                    onClick={() => setSimStep(0)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--if-gold)] text-[var(--if-green)] text-sm font-bold"
                  >
                    <CheckCircle2 className="h-4 w-4" />{lang === "te" ? "మళ్ళీ ప్రారంభించు" : "Restart"}
                  </button>
                ) : (
                  <button
                    onClick={() => setSimStep(s => s + 1)}
                    className="flex items-center gap-1 px-5 py-2.5 rounded-lg bg-[var(--if-gold)] text-[var(--if-green)] text-sm font-bold hover:bg-[var(--if-gold-light)] transition-colors"
                  >
                    {lang === "te" ? "తదుపరి" : "Next"}<ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Tab: Mistakes ───────────────────────────────────────────────────── */}
      {activeTab === "mistakes" && (
        <section className="py-16 px-4 bg-[var(--if-cream-light)]">
          <div className="mx-auto max-w-4xl">
            <BlurFade delay={0.1}>
              <h2 className="font-display text-3xl font-bold text-[var(--if-green)] text-center mb-2">
                {lang === "te" ? "సాధారణ తప్పులు" : "Common Mistakes"}
              </h2>
              <p className="text-center text-sm text-[var(--if-text-muted)] mb-10">
                {lang === "te" ? "తప్పును గుర్తించి సరైన విధానంతో సరిదిద్దుకోండి" : "Recognise each mistake and correct it the right way"}
              </p>
            </BlurFade>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mistakes.map((m, mi) => (
                <BlurFade key={mi} delay={0.07 * mi}>
                  <div className="bg-white rounded-2xl border border-[var(--if-gold)]/15 p-5 h-full">
                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[var(--if-gold)]/10">
                      <span className="text-2xl">{m.icon}</span>
                      <h3 className="font-display font-bold text-[var(--if-green)]">{m.cat[lang]}</h3>
                    </div>
                    <div className="flex flex-col gap-4">
                      {m.items.map((item, ii) => (
                        <div key={ii} className="flex flex-col gap-1.5">
                          <div className="flex gap-2 text-sm text-[var(--if-text-muted)]">
                            <span className="text-red-500 font-bold shrink-0">✗</span>
                            <span>{item.bad[lang]}</span>
                          </div>
                          <div className="flex gap-2 text-sm text-emerald-700">
                            <span className="font-bold shrink-0">✓</span>
                            <span>{item.good[lang]}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}

export default function LearnSalah() {
  return <I18nProvider><LearnSalahPage /></I18nProvider>;
}
