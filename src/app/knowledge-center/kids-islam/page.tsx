"use client";

import { useState } from "react";
import Link from "next/link";
import { I18nProvider, useI18n } from "@/lib/i18n/context";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { ChevronLeft, Star } from "lucide-react";

// ── DATA ────────────────────────────────────────────────────────────────────

const sections = [
  { num: 1, emoji: "🌟", title: { te: "ఇస్లాం విశ్వాసాలు", en: "Islamic Beliefs" }, arabic: "أركان الإيمان", age: "5+", color: "bg-yellow-500", desc: { te: "అల్లాహ్, ఫరిష్తలు, కిత్తాబులు, రసూళ్ళు, ఆఖిరత్ — ఈమాన్‌లో ఆరు స్తంభాలు", en: "Allah, Angels, Books, Messengers, Hereafter — six pillars of Iman" }, topics: [{ te: "అల్లాహ్ ఎవరు?", en: "Who is Allah?" }, { te: "మన చుట్టూ ఉన్న ఫరిష్తలు", en: "Angels around us" }, { te: "మన పవిత్ర గ్రంథాలు", en: "Our Holy Books" }, { te: "ప్రవక్తలు & రసూళ్ళు", en: "Prophets & Messengers" }, { te: "తీర్పు దినం", en: "The Day of Judgement" }, { te: "ఖదర్ — విధి", en: "Qadar — Destiny" }] },
  { num: 2, emoji: "🤝", title: { te: "మర్యాదలు & అలవాట్లు", en: "Manners & Habits" }, arabic: "الأخلاق والآداب", age: "6+", color: "bg-green-500", desc: { te: "ఇస్లామిక్ మర్యాదలు — భోజనం, నిద్ర, తల్లిదండ్రుల పట్ల, స్నేహితుల పట్ల", en: "Islamic etiquette — eating, sleeping, with parents, with friends" }, topics: [{ te: "బిస్మిల్లాహ్ చెప్పడం", en: "Saying Bismillah" }, { te: "తల్లిదండ్రులతో అదబ్", en: "Adab with parents" }, { te: "ఇతరులపట్ల దయగా ఉండటం", en: "Being kind to others" }, { te: "నిజాయితీ & నమ్మకం", en: "Honesty & Trust" }, { te: "ఇస్లామిక్ శుభాకాంక్షలు", en: "Islamic greetings" }, { te: "ఇస్లాంలో పవిత్రత", en: "Cleanliness in Islam" }] },
  { num: 3, emoji: "🤲", title: { te: "దైనందిన దువాలు", en: "Daily Duas" }, arabic: "الأدعية اليومية", age: "5+", color: "bg-blue-500", desc: { te: "నిద్రపోయే ముందు, లేచినప్పుడు, తినే ముందు — ప్రతి సంఘటనకు దువా", en: "Before sleeping, waking up, eating — a dua for every moment" }, topics: [{ te: "నిద్రకు ముందు దువా", en: "Dua before sleeping" }, { te: "నిద్ర లేవడానికి దువా", en: "Dua on waking" }, { te: "తినే ముందు దువా", en: "Dua before eating" }, { te: "ఇంటి నుండి వెళ్లే దువా", en: "Dua leaving home" }, { te: "మస్జిద్ లోకి ప్రవేశించే దువా", en: "Dua entering masjid" }, { te: "తల్లిదండ్రుల కోసం దువా", en: "Dua for parents" }] },
  { num: 4, emoji: "📖", title: { te: "ప్రవక్త కథలు", en: "Prophet Stories" }, arabic: "قصص الأنبياء", age: "7+", color: "bg-purple-500", desc: { te: "ప్రవక్తల జీవిత కథలు — సహనం, విశ్వాసం మరియు ధైర్యం నేర్చుకోండి", en: "Stories of the Prophets — learn patience, faith and courage" }, topics: [{ te: "ఇబ్రాహీమ్ (అ.స) & అగ్ని", en: "Ibrahim AS & fire" }, { te: "యూసుఫ్ (అ.స) బావిలో", en: "Yusuf AS in the well" }, { te: "మూసా (అ.స) & ఫిర్ఔన్", en: "Musa AS & Pharaoh" }, { te: "ఈసా (అ.స) అద్భుతాలు", en: "Isa AS miracles" }, { te: "ముహమ్మద్ ﷺ బాల్యం", en: "Prophet Muhammad ﷺ childhood" }, { te: "నూహ్ (అ.స) & నావ", en: "Prophet Nuh AS & the ark" }] },
  { num: 5, emoji: "🕌", title: { te: "నమాజ్ & ఖురాన్", en: "Salah & Quran" }, arabic: "الصلاة والقرآن", age: "7+", color: "bg-teal-500", desc: { te: "నమాజ్ ఎలా చేయాలి · చిన్న సూరాలు · ఖురాన్ అక్షరాలు నేర్చుకోవడం", en: "How to pray Salah · Short Surahs · Learning Quran letters" }, topics: [{ te: "వుదూ చేయడం ఎలా", en: "How to make Wudu" }, { te: "నమాజ్ దశలు", en: "Steps of Salah" }, { te: "సూరహ్ అల్-ఫాతిహా", en: "Surah Al-Fatiha" }, { te: "సూరహ్ అల్-ఇఖ్లాస్", en: "Surah Al-Ikhlas" }, { te: "సూరహ్ అల్-ఫలఖ్ & అన్-నాస్", en: "Surah Al-Falaq & An-Nas" }, { te: "అరబిక్ అక్షరాలు", en: "Arabic letters" }] },
  { num: 6, emoji: "🏆", title: { te: "ఇస్లామిక్ నాయకత్వం", en: "Islamic Leadership" }, arabic: "القيادة الإسلامية", age: "10+", color: "bg-orange-500", desc: { te: "ముస్లిం యువతగా నాయకత్వం, ధైర్యం మరియు సమాజ సేవ", en: "As young Muslims — leadership, courage and community service" }, topics: [{ te: "యువ సహాబా కథలు", en: "Young Sahabah stories" }, { te: "బాధ్యతగా ఉండటం", en: "Being responsible" }, { te: "సమాజానికి సహాయపడటం", en: "Helping the community" }, { te: "నిజం చెప్పడం", en: "Speaking the truth" }, { te: "న్యాయం కోసం నిలబడడం", en: "Standing up for justice" }, { te: "మార్పు తీసుకురావడం", en: "Making a difference" }] },
];

const pillars = [
  { emoji: "☝️", ar: "الشَّهَادَةُ", en: "Shahada", te: "షహాదా", desc_en: "Saying 'There is no god but Allah and Muhammad ﷺ is His Messenger' — the declaration of faith.", desc_te: "లా ఇలాహ ఇల్లల్లాహ్, ముహమ్మదుర్ రసూలుల్లాహ్ — ఇది ఇస్లాం మొదటి మరియు అతి ముఖ్యమైన స్తంభం." },
  { emoji: "🕌", ar: "الصَّلَاةُ", en: "Salah", te: "నమాజ్", desc_en: "Praying five times a day — Fajr, Dhuhr, Asr, Maghrib, and Isha — facing the Kaaba.", desc_te: "రోజూ ఐదు సార్లు నమాజ్ చేయడం — ఫజ్ర్, జుహ్ర్, అస్ర్, మగ్రిబ్, ఇషా — కాబా వైపు తిరిగి." },
  { emoji: "💰", ar: "الزَّكَاةُ", en: "Zakat", te: "జకాత్", desc_en: "Giving a small portion of savings to the poor every year — purifying your wealth.", desc_te: "ప్రతి సంవత్సరం మన సంపదలో ఒక చిన్న భాగాన్ని పేదలకు ఇవ్వడం — ఇది మన సంపదను పవిత్రం చేస్తుంది." },
  { emoji: "🌙", ar: "الصَّوْمُ", en: "Sawm", te: "రోజా", desc_en: "Fasting during the month of Ramadan — no eating or drinking from dawn to sunset.", desc_te: "రమజాన్ నెలలో ఉపవాసం ఉండటం — తెల్లవారు నుండి సూర్యాస్తమయం వరకు తినడం తాగడం మానుకోవడం." },
  { emoji: "🕋", ar: "الْحَجُّ", en: "Hajj", te: "హజ్జ్", desc_en: "Making a pilgrimage to Makkah once in a lifetime — for those who are able.", desc_te: "జీవితంలో ఒకసారైనా మక్కాకు పవిత్ర తీర్థయాత్ర చేయడం — శక్తి ఉన్నవారికి." },
];

const allahNames = [
  { ar: "اللَّهُ", tr: "Allah", desc_en: "The One God — Creator of all things.", desc_te: "ఒకే అల్లాహ్ — సమస్తాన్ని సృష్టించినవాడు." },
  { ar: "الرَّحْمَٰنُ", tr: "Ar-Rahman", desc_en: "The Most Gracious — whose mercy embraces everything.", desc_te: "అత్యంత కరుణామయుడు — ఆయన దయ సర్వత్రా ఉంది." },
  { ar: "الرَّحِيمُ", tr: "Ar-Raheem", desc_en: "The Most Merciful — especially to believers.", desc_te: "అత్యంత దయగలవాడు — ముఖ్యంగా విశ్వాసులపట్ల." },
  { ar: "الْمَلِكُ", tr: "Al-Malik", desc_en: "The King — He owns and rules all creation.", desc_te: "రాజు — ఆయన సమస్త సృష్టికి అధిపతి." },
  { ar: "السَّلَامُ", tr: "As-Salaam", desc_en: "The Source of Peace — He gives peace and safety.", desc_te: "శాంతి మూలం — ఆయన శాంతి మరియు భద్రత ఇస్తాడు." },
  { ar: "الْخَالِقُ", tr: "Al-Khaliq", desc_en: "The Creator — He creates from nothing.", desc_te: "సృష్టికర్త — ఆయన శూన్యం నుండి సృష్టిస్తాడు." },
  { ar: "الْعَلِيمُ", tr: "Al-Aleem", desc_en: "The All-Knowing — He knows everything, even our thoughts.", desc_te: "సర్వజ్ఞుడు — ఆయనకు అన్నీ తెలుసు, మన ఆలోచనలు కూడా." },
  { ar: "الْقَوِيُّ", tr: "Al-Qawiyy", desc_en: "The Most Strong — His power has no limit.", desc_te: "అత్యంత బలవంతుడు — ఆయన శక్తికి హద్దు లేదు." },
];

const characters = [
  { emoji: "✅", ar: "الصِّدْقُ", en: "Honesty", te: "నిజాయితీ", desc_en: "Always telling the truth, even when it's hard — that's what the Prophet ﷺ was known for.", desc_te: "కష్టంగా ఉన్నా సత్యమే చెప్పడం — ప్రవక్త ﷺ ఎల్లప్పుడూ నిజాయితీగా ఉండేవారు.", try_en: "Tell the truth today about something small.", try_te: "ఈరోజు ఒక చిన్న విషయంలో నిజం చెప్పు." },
  { emoji: "🌿", ar: "الصَّبْرُ", en: "Patience", te: "సహనం", desc_en: "Waiting calmly without complaining — Allah loves those who are patient.", desc_te: "ఫిర్యాదు చేయకుండా ప్రశాంతంగా ఉండటం — అల్లాహ్ సహనంగలవారిని ప్రేమిస్తాడు.", try_en: "Wait your turn without complaining today.", try_te: "ఈరోజు ఫిర్యాదు చేయకుండా నీ వంతు కోసం వేచి ఉండు." },
  { emoji: "🤗", ar: "الرَّحْمَةُ", en: "Kindness", te: "దయ", desc_en: "Being gentle and caring for others — even a smile is an act of charity.", desc_te: "ఇతరులపట్ల మృదువుగా, శ్రద్ధగా ఉండటం — చిరునవ్వు కూడా సదఖా.", try_en: "Smile and say a kind word to three people today.", try_te: "ఈరోజు ముగ్గురికి చిరునవ్వు చూపించి మంచి మాట చెప్పు." },
  { emoji: "🙏", ar: "الشُّكْرُ", en: "Gratitude", te: "కృతజ్ఞత", desc_en: "Saying Alhamdulillah and being thankful for all that Allah gave us.", desc_te: "అల్లాహ్ మనకు ఇచ్చిన అన్నింటికీ అల్‌హమ్దులిల్లాహ్ చెప్పడం.", try_en: "Name five things you are thankful for today.", try_te: "ఈరోజు నీవు కృతజ్ఞంగా ఉన్న ఐదు విషయాలను చెప్పు." },
  { emoji: "💪", ar: "الشَّجَاعَةُ", en: "Courage", te: "ధైర్యం", desc_en: "Doing the right thing even when it is scary — being brave for Allah's sake.", desc_te: "భయంగా ఉన్నా సరైన పని చేయడం — అల్లాహ్ కోసం ధైర్యంగా ఉండటం.", try_en: "Do one brave good deed today.", try_te: "ఈరోజు ఒక ధైర్యమైన మంచి పని చేయి." },
  { emoji: "🤝", ar: "الْكَرَمُ", en: "Generosity", te: "దానగుణం", desc_en: "Sharing what we have — even a little giving is beloved to Allah.", desc_te: "మనకున్నది పంచుకోవడం — చిన్న ఇవ్వడం కూడా అల్లాహ్‌కు ఇష్టం.", try_en: "Share something you love with someone today.", try_te: "ఈరోజు నీకు ఇష్టమైన ఏదైనా ఒక్కటి ఇతరులకు పంచుకో." },
];

const dailyDuas = [
  { when_en: "Waking Up", when_te: "నిద్ర లేచినప్పుడు", emoji: "☀️", ar: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ", tr: "Alhamdu lillahil-ladhi ahyana ba'da ma amatana wa ilayhin-nushur", meaning_en: "All praise is for Allah who gave us life after sleep — and to Him is the resurrection.", meaning_te: "నిద్ర తర్వాత మనకు జీవితాన్ని ఇచ్చిన అల్లాహ్‌కు సకల స్తుతులు — ఆయన వద్దకే తిరిగి వెళ్తాం.", color: "#2e8b57" },
  { when_en: "Before Eating", when_te: "తినే ముందు", emoji: "🍽️", ar: "بِسْمِ اللَّهِ", tr: "Bismillah", meaning_en: "In the name of Allah — said before eating and drinking.", meaning_te: "అల్లాహ్ పేరుతో — తినే ముందు మరియు తాగే ముందు చెప్పండి.", color: "#f59e0b" },
  { when_en: "After Eating", when_te: "తిన్న తర్వాత", emoji: "😊", ar: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ", tr: "Alhamdu lillahil-ladhi at'amana wa saqana wa ja'alana muslimin", meaning_en: "Praise Allah who fed us, gave us drink, and made us Muslims.", meaning_te: "మనకు భోజనం, నీరు ఇచ్చి, ముస్లింలుగా చేసిన అల్లాహ్‌కు సకల స్తుతులు.", color: "#3b82f6" },
  { when_en: "Before Sleep", when_te: "నిద్రకు ముందు", emoji: "🌙", ar: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا", tr: "Bismika Allahumma amutu wa ahya", meaning_en: "In Your name, O Allah, I die and I live.", meaning_te: "అల్లాహ్ నీ పేరుతో నేను మరణిస్తాను మరియు జీవిస్తాను.", color: "#a855f7" },
  { when_en: "Leaving Home", when_te: "ఇంటి నుండి వెళ్లేటప్పుడు", emoji: "🚶", ar: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ", tr: "Bismillah tawakkaltu 'alallah wa la hawla wa la quwwata illa billah", meaning_en: "In Allah's name, I trust in Allah. There is no power except with Allah.", meaning_te: "అల్లాహ్ పేరుతో, నేను అల్లాహ్‌పై భరోసా ఉంచాను. అల్లాహ్ తప్ప శక్తి లేదు.", color: "#14b8a6" },
  { when_en: "For Parents", when_te: "తల్లిదండ్రుల కోసం", emoji: "❤️", ar: "رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا", tr: "Rabbir hamhuma kama rabbayani sagheera", meaning_en: "My Lord, have mercy on them both as they raised me when I was small.", meaning_te: "నా ప్రభువా! నన్ను చిన్నప్పటి నుండి పెంచినట్టుగా వారిద్దరిపై దయ చూపించు.", color: "#ec4899" },
];

const prophets = [
  { emoji: "🌍", ar: "آدَم", en: "Adam (AS)", te: "ఆదమ్ (అ.స)", color: "#2e8b57", sum_en: "Allah created Adam as the first human and first prophet, and honoured him above the angels.", sum_te: "అల్లాహ్ ఆదమ్ (అ.స)ను మొదటి మనిషిగా, మొదటి ప్రవక్తగా సృష్టించాడు, ఫరిష్తల కంటే ఆయనను గౌరవించాడు.", lesson_en: "Everyone makes mistakes — say sorry to Allah and He forgives.", lesson_te: "అందరూ తప్పులు చేస్తారు — అల్లాహ్‌ను క్షమాపణ కోరితే ఆయన క్షమిస్తాడు." },
  { emoji: "🚢", ar: "نُوح", en: "Nuh (AS)", te: "నూహ్ (అ.స)", color: "#3b82f6", sum_en: "Nuh called his people to Allah for many years and built a great ark to save the believers.", sum_te: "నూహ్ (అ.స) తన జనాన్ని చాలా సంవత్సరాలు అల్లాహ్ వైపుకు పిలిచాడు, విశ్వాసులను కాపాడటానికి నావ నిర్మించాడు.", lesson_en: "Be patient and keep trusting Allah, even when others laugh.", lesson_te: "ఇతరులు నవ్వినా అల్లాహ్‌పై నమ్మకం ఉంచి సహనంగా ఉండు." },
  { emoji: "🔥", ar: "إِبْرَاهِيم", en: "Ibrahim (AS)", te: "ఇబ్రాహీమ్ (అ.స)", color: "#f59e0b", sum_en: "Ibrahim broke the idols, was saved from fire by Allah, and built the Kaaba with his son.", sum_te: "ఇబ్రాహీమ్ (అ.స) విగ్రహాలను ముక్కలు చేశాడు, అల్లాహ్ అగ్ని నుండి కాపాడాడు, కుమారునితో కాబాను నిర్మించాడు.", lesson_en: "Stand up for the truth and trust Allah completely.", lesson_te: "సత్యం కోసం నిలబడు మరియు అల్లాహ్‌పై పూర్తి నమ్మకం ఉంచు." },
  { emoji: "⭐", ar: "يُوسُف", en: "Yusuf (AS)", te: "యూసుఫ్ (అ.స)", color: "#a855f7", sum_en: "Yusuf was treated badly by his brothers but stayed patient and became a great leader in Egypt.", sum_te: "యూసుఫ్ (అ.స)ను అన్నదమ్ములు హాని చేశారు, కానీ సహనంతో ఉండి ఈజిప్ట్‌లో గొప్ప నాయకుడయ్యారు.", lesson_en: "Be patient and forgive — Allah's plan is always best.", lesson_te: "సహనంతో ఉండి క్షమించు — అల్లాహ్ ప్రణాళిక ఎల్లప్పుడూ శ్రేష్ఠం." },
  { emoji: "🌊", ar: "مُوسَى", en: "Musa (AS)", te: "మూసా (అ.స)", color: "#14b8a6", sum_en: "Musa bravely stood up to the cruel Pharaoh and Allah parted the sea to save his people.", sum_te: "మూసా (అ.స) ధైర్యంగా ఫిర్ఔన్‌ను ఎదుర్కొన్నాడు, అల్లాహ్ సముద్రాన్ని చీల్చి ప్రజలను కాపాడాడు.", lesson_en: "Be brave with Allah's help — never give up on what is right.", lesson_te: "అల్లాహ్ సహాయంతో ధైర్యంగా ఉండు — సరైన పని వదులుకోకు." },
  { emoji: "🕋", ar: "مُحَمَّد", en: "Muhammad ﷺ", te: "ముహమ్మద్ ﷺ", color: "#c8922a", sum_en: "Muhammad ﷺ is the final prophet, known as Al-Ameen, sent as a mercy to the whole world with the Quran.", sum_te: "ముహమ్మద్ ﷺ చివరి ప్రవక్త, అల్-అమీన్ అని పిలవబడేవారు, ఖురాన్‌తో ప్రపంచానికి రహ్మతుగా పంపబడ్డారు.", lesson_en: "Be honest and kind, and follow his beautiful example.", lesson_te: "నిజాయితీగా, దయగా ఉండి ఆయన మంచి ఆదర్శాన్ని అనుసరించు." },
];

const wuduSteps = [
  { emoji: "🤲", ar: "النِّيَّةُ", en: "Intention (Niyyah)", te: "నియ్యత్ (సంకల్పం)", desc_en: "Say in your heart: 'I make wudu for the sake of Allah.'", desc_te: "హృదయంలో చెప్పుకో: 'అల్లాహ్ కోసం వుదూ చేస్తున్నాను.'", color: "#2e8b57" },
  { emoji: "🖐️", ar: "غَسْلُ الْيَدَيْنِ", en: "Wash hands 3×", te: "చేతులు 3 సార్లు కడగడం", desc_en: "Wash both hands up to the wrists three times.", desc_te: "రెండు చేతులు మణికట్టు వరకు మూడు సార్లు కడగాలి.", color: "#3b82f6" },
  { emoji: "👄", ar: "الْمَضْمَضَةُ", en: "Rinse mouth 3×", te: "నోరు 3 సార్లు పుక్కిలించడం", desc_en: "Rinse your mouth three times.", desc_te: "నోటిలో నీళ్లు ఉంచి మూడు సార్లు పుక్కిలించాలి.", color: "#f59e0b" },
  { emoji: "👃", ar: "الِاسْتِنْشَاقُ", en: "Wash nose 3×", te: "ముక్కు 3 సార్లు కడగడం", desc_en: "Sniff water into the nose and blow it out, three times.", desc_te: "ముక్కులో నీళ్లు చేర్చి మూడు సార్లు శుభ్రపరచాలి.", color: "#a855f7" },
  { emoji: "😊", ar: "غَسْلُ الْوَجْهِ", en: "Wash face 3×", te: "ముఖం 3 సార్లు కడగడం", desc_en: "Wash the face from forehead to chin, three times.", desc_te: "నుదురు నుండి గడ్డం వరకు ముఖం మూడు సార్లు కడగాలి.", color: "#14b8a6" },
  { emoji: "💪", ar: "غَسْلُ الذِّرَاعَيْنِ", en: "Wash arms 3×", te: "చేతులు మోచేయి వరకు 3 సార్లు", desc_en: "Wash the right arm then left arm up to the elbows, three times each.", desc_te: "మొదట కుడి చేయి, తర్వాత ఎడమ చేయి మోచేయి వరకు మూడు సార్లు కడగాలి.", color: "#ec4899" },
  { emoji: "✋", ar: "مَسْحُ الرَّأْسِ", en: "Wipe head 1×", te: "తలపై తడి చేయి తిప్పడం 1×", desc_en: "Wipe the head from front to back once with wet hands.", desc_te: "తడి చేత్తో తలపై ముందు నుండి వెనక వరకు ఒకసారి తిప్పాలి.", color: "#c8922a" },
  { emoji: "🦶", ar: "غَسْلُ الْقَدَمَيْنِ", en: "Wash feet 3×", te: "పాదాలు 3 సార్లు కడగడం", desc_en: "Wash the right foot then left foot up to the ankles, three times each.", desc_te: "మొదట కుడి పాదం, తర్వాత ఎడమ పాదం చీలమండ వరకు మూడు సార్లు కడగాలి.", color: "#2e8b57" },
];

const salahSteps = [
  { emoji: "🧘", ar: "الْقِيَامُ", en: "Stand (Qiyam)", te: "నిలబడటం (కియాం)", desc_en: "Stand upright, facing the Qibla (direction of the Kaaba).", desc_te: "ఖిబ్లా (కాబా దిశ) వైపు తిరిగి నిటారుగా నిలబడాలి.", color: "#2e8b57" },
  { emoji: "🙌", ar: "تَكْبِيرُ الْإِحْرَامِ", en: "Opening Takbeer", te: "ప్రారంభ తక్బీర్", desc_en: "Raise both hands to the ears and say 'Allahu Akbar' — Allah is the Greatest.", desc_te: "రెండు చేతులు చెవుల వరకు ఎత్తి 'అల్లాహు అక్బర్' చెప్పాలి.", color: "#3b82f6" },
  { emoji: "📖", ar: "قِرَاءَةُ الْفَاتِحَةِ", en: "Recite Al-Fatiha", te: "అల్-ఫాతిహా చదవడం", desc_en: "Recite Surah Al-Fatiha — the opening chapter of the Quran.", desc_te: "ఖురాన్ యొక్క మొదటి అధ్యాయం — సూరహ్ అల్-ఫాతిహా చదవాలి.", color: "#f59e0b" },
  { emoji: "🙇", ar: "الرُّكُوعُ", en: "Bow (Ruku)", te: "వంగడం (రుకూ)", desc_en: "Bow down, placing hands on knees, saying 'Subhana Rabbiyal Adheem'.", desc_te: "మోకాళ్ళపై చేతులు ఉంచి వంగి 'సుబ్హాన రబ్బియల్ అజీమ్' చెప్పాలి.", color: "#a855f7" },
  { emoji: "⬆️", ar: "الِاعْتِدَالُ", en: "Stand Up Again", te: "మళ్ళీ నిటారుగా నిలబడటం", desc_en: "Rise saying 'Sami'Allahu liman hamidah, Rabbana lakal hamd'.", desc_te: "'సమిఅల్లాహు లిమన్ హమిదహ్, రబ్బనా లకల్ హమ్ద్' చెప్పుతూ లేవాలి.", color: "#14b8a6" },
  { emoji: "🙏", ar: "السُّجُودُ", en: "Prostrate (Sujud)", te: "సాష్టాంగ పడటం (సుజూద్)", desc_en: "Prostrate with 7 body parts on the ground, saying 'Subhana Rabbiyal A'la' three times.", desc_te: "7 అవయవాలతో నేలపై సాష్టాంగ పడి 'సుబ్హాన రబ్బియల్ అ'లా' మూడు సార్లు చెప్పాలి.", color: "#ec4899" },
];

const quiz = [
  { q: { te: "ఖురాన్ ఏ భాషలో అవతరించింది?", en: "In which language was the Quran revealed?" }, options: ["Urdu", "Arabic / అరబిక్", "Persian"], correct: 1 },
  { q: { te: "ఇస్లాం ఐదు స్తంభాలు ఏమిటి?", en: "What are the Five Pillars of Islam?" }, options: ["Shahada, Salah, Zakat, Sawm, Hajj", "Prayer, Fasting, Zakat, Hajj, Jihad", "Iman, Prayer, Charity, Fasting, Hajj"], correct: 0 },
  { q: { te: "ముహమ్మద్ ﷺ ఏ నగరంలో జన్మించారు?", en: "In which city was Prophet Muhammad ﷺ born?" }, options: ["Madinah / మదీనా", "Jerusalem / జెరూసలేం", "Makkah / మక్కా"], correct: 2 },
  { q: { te: "మొదటి ప్రవక్త ఎవరు?", en: "Who was the very first prophet?" }, options: ["Nuh (AS) / నూహ్ (అ.స)", "Adam (AS) / ఆదమ్ (అ.స)", "Musa (AS) / మూసా (అ.స)"], correct: 1 },
  { q: { te: "ముస్లింలు రోజూ ఎన్ని సార్లు నమాజ్ చేస్తారు?", en: "How many times a day do Muslims pray?" }, options: ["3 times / 3 సార్లు", "5 times / 5 సార్లు", "7 times / 7 సార్లు"], correct: 1 },
  { q: { te: "నమాజ్ ముందు వుదూ ఎందుకు చేస్తాం?", en: "What do we do to become clean before Salah?" }, options: ["Wudu / వుదూ", "Sleep / నిద్ర", "Eat / తినడం"], correct: 0 },
  { q: { te: "పెద్ద నావ నిర్మించిన ప్రవక్త ఎవరు?", en: "Which prophet built a great ark (boat)?" }, options: ["Nuh (AS) / నూహ్ (అ.స)", "Yusuf (AS) / యూసుఫ్ (అ.స)", "Ibrahim (AS) / ఇబ్రాహీమ్ (అ.స)"], correct: 0 },
  { q: { te: "ఇస్లాం చివరి ప్రవక్త ఎవరు?", en: "Who is the final prophet of Islam?" }, options: ["Ibrahim (AS) / ఇబ్రాహీమ్ (అ.స)", "Isa (AS) / ఈసా (అ.స)", "Muhammad ﷺ / ముహమ్మద్ ﷺ"], correct: 2 },
];

// ── COMPONENT ────────────────────────────────────────────────────────────────

function KidsIslamPage() {
  const { lang } = useI18n();
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [quizIdx, setQuizIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === quiz[quizIdx].correct) setScore(s => s + 1);
  };

  const nextQ = () => {
    if (quizIdx < quiz.length - 1) { setQuizIdx(q => q + 1); setSelected(null); }
    else setDone(true);
  };

  const t = (te: string, en: string) => lang === "te" ? te : en;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-[var(--if-green)] via-teal-800 to-emerald-900 text-white py-20 px-4">
        <div className="mx-auto max-w-4xl text-center flex flex-col items-center gap-5">
          <BlurFade delay={0.05}>
            <Link href="/knowledge-center" className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-white transition-colors mb-2">
              <ChevronLeft className="h-4 w-4" /> {t("జ్ఞాన కేంద్రం", "Knowledge Center")}
            </Link>
          </BlurFade>
          <BlurFade delay={0.1}><div className="text-5xl mb-1">🌙⭐📖</div></BlurFade>
          <BlurFade delay={0.15}>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-yellow-300">
              {t("పిల్లల ఇస్లాం", "Kids Islam")}
            </h1>
          </BlurFade>
          <BlurFade delay={0.2}>
            <p className="text-white/80 max-w-md text-lg">
              {t("వయస్సు 5–15 · ఆటాడుతూ నేర్చుకోండి · ఇస్లాం అన్వేషణ ప్రారంభించండి!", "Ages 5–15 · Learn through play · Start your Islam adventure!")}
            </p>
          </BlurFade>
          <BlurFade delay={0.25} className="flex gap-3 flex-wrap justify-center">
            {[t("🌟 6 స్థాయిలు", "🌟 6 Levels"), t("📚 36+ విషయాలు", "📚 36+ Topics"), t("🎯 క్విజ్‌లు", "🎯 Quizzes"), t("✅ ఉచితం", "✅ Free")].map(item => (
              <span key={item} className="px-4 py-2 rounded-full bg-white/15 border border-white/20 text-sm font-semibold">{item}</span>
            ))}
          </BlurFade>
        </div>
      </section>

      {/* ── KALIMAH / SHAHADA ── */}
      <section className="py-16 px-4 bg-white">
        <div className="mx-auto max-w-3xl">
          <BlurFade delay={0.05}>
            <div className="text-xs font-bold tracking-widest uppercase text-[var(--if-gold)] mb-2 text-center">
              {t("మొదటి కలిమా", "The First Kalimah")}
            </div>
            <h2 className="font-display text-3xl font-bold text-[var(--if-green)] text-center mb-3">
              {t("మన విశ్వాస ప్రకటన", "Our Declaration of Faith")}
            </h2>
            <p className="text-sm text-center text-[var(--if-text-muted)] mb-8 max-w-lg mx-auto">
              {t("ప్రతి ముస్లిం నేర్చుకునే మొదటి, అతి ముఖ్యమైన మాటలు — వీటిని హృదయపూర్వకంగా చెప్పడమే మనల్ని ముస్లింగా చేస్తుంది.", "The first and most important words every Muslim learns — saying them sincerely from the heart makes us Muslim.")}
            </p>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--if-green)] to-emerald-800 p-10 text-center shadow-xl">
              <div className="absolute right-4 bottom-2 text-8xl text-white/10 select-none">☪</div>
              <p className="font-arabic text-4xl md:text-5xl text-[var(--if-gold-light)] leading-loose mb-4" dir="rtl" lang="ar">
                لَا إِلَٰهَ إِلَّا اللَّهُ مُحَمَّدٌ رَسُولُ اللَّهِ
              </p>
              <p className="italic text-white font-semibold text-lg mb-3">
                {t("లా ఇలాహ ఇల్లల్లాహ్, ముహమ్మదుర్ రసూలుల్లాహ్", "La ilaha illallah, Muhammadur Rasulullah")}
              </p>
              <p className="text-white/85 max-w-lg mx-auto">
                {t("అల్లాహ్ తప్ప వేరే ఆరాధ్యుడు లేడు, ముహమ్మద్ ﷺ అల్లాహ్ యొక్క ప్రవక్త.", "There is no god but Allah, and Muhammad ﷺ is the Messenger of Allah.")}
              </p>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* ── FIVE PILLARS ── */}
      <section className="py-16 px-4 bg-[var(--if-cream-light)]">
        <div className="mx-auto max-w-5xl">
          <BlurFade delay={0.05}>
            <div className="text-xs font-bold tracking-widest uppercase text-[var(--if-gold)] mb-2 text-center">{t("ఇస్లాం పునాదులు", "Foundations of Islam")}</div>
            <h2 className="font-display text-3xl font-bold text-[var(--if-green)] text-center mb-3">
              {t("ఇస్లాం ఐదు మూల స్తంభాలు", "The Five Pillars of Islam")}
            </h2>
            <p className="text-sm text-center text-[var(--if-text-muted)] mb-10 max-w-md mx-auto">
              {t("ఇస్లాం ఐదు స్తంభాలపై నిలుస్తుంది — ఒక ఇల్లు తన స్తంభాలపై నిలిచినట్లే.", "Islam stands on five pillars — like a house standing strong on its foundations.")}
            </p>
          </BlurFade>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {pillars.map((p, i) => (
              <BlurFade key={p.en} delay={0.07 * i}>
                <div className="bg-white rounded-2xl border border-[var(--if-gold)]/20 p-5 text-center hover:-translate-y-1 transition-transform">
                  <div className="text-4xl mb-3">{p.emoji}</div>
                  <div className="font-arabic text-2xl text-[var(--if-gold)] mb-1" dir="rtl" lang="ar">{p.ar}</div>
                  <div className="font-display font-bold text-[var(--if-green)] text-base mb-2">{lang === "te" ? p.te : p.en}</div>
                  <p className="text-xs text-[var(--if-text-muted)] leading-relaxed">{lang === "te" ? p.desc_te : p.desc_en}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* ── BEAUTIFUL NAMES OF ALLAH ── */}
      <section className="py-16 px-4 bg-white">
        <div className="mx-auto max-w-5xl">
          <BlurFade delay={0.05}>
            <div className="text-xs font-bold tracking-widest uppercase text-[var(--if-gold)] mb-2 text-center">{t("అస్మా-ఉల్-హుస్నా", "Asma ul-Husna")}</div>
            <h2 className="font-display text-3xl font-bold text-[var(--if-green)] text-center mb-3">
              {t("అల్లాహ్ అందమైన పేర్లు", "The Beautiful Names of Allah")}
            </h2>
            <p className="text-sm text-center text-[var(--if-text-muted)] mb-10 max-w-md mx-auto">
              {t("అల్లాహ్‌కు 99 అందమైన పేర్లు ఉన్నాయి — ఒక్కో పేరు ఆయన గొప్పతనాన్ని తెలియజేస్తుంది.", "Allah has 99 beautiful names — each one tells us how great and merciful He is.")}
            </p>
          </BlurFade>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {allahNames.map((n, i) => (
              <BlurFade key={n.tr} delay={0.05 * i}>
                <div className="bg-[var(--if-cream-light)] rounded-2xl border border-[var(--if-gold)]/20 p-5 text-center hover:-translate-y-1 transition-transform">
                  <div className="font-arabic text-3xl text-[var(--if-gold)] mb-2" dir="rtl" lang="ar">{n.ar}</div>
                  <div className="font-display font-bold text-[var(--if-green)] text-sm mb-1">{n.tr}</div>
                  <p className="text-xs text-[var(--if-text-muted)] leading-relaxed">{lang === "te" ? n.desc_te : n.desc_en}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHARACTER ACADEMY ── */}
      <section className="py-16 px-4 bg-[var(--if-cream-light)]">
        <div className="mx-auto max-w-5xl">
          <BlurFade delay={0.05}>
            <div className="text-xs font-bold tracking-widest uppercase text-[var(--if-gold)] mb-2 text-center">{t("మంచి స్వభావం", "Good Character")}</div>
            <h2 className="font-display text-3xl font-bold text-[var(--if-green)] text-center mb-3">
              {t("స్వభావ అకాడమీ", "Character Academy")}
            </h2>
            <p className="text-sm text-center text-[var(--if-text-muted)] mb-10 max-w-md mx-auto">
              {t("మంచి ముస్లిం పిల్లల ఆరు శక్తులు — ప్రతి ఒక్కటి ఏమిటో మరియు ఈరోజు ఏమి ప్రయత్నించాలో తెలుసుకో.", "Six superpowers of a good Muslim child — what each means and a little challenge for today.")}
            </p>
          </BlurFade>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {characters.map((c, i) => (
              <BlurFade key={c.en} delay={0.06 * i}>
                <div className="bg-white rounded-2xl border border-[var(--if-gold)]/20 p-6 hover:-translate-y-1 transition-transform">
                  <div className="text-3xl mb-3">{c.emoji}</div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-display font-bold text-[var(--if-green)]">{lang === "te" ? c.te : c.en}</span>
                    <span className="font-arabic text-sm text-[var(--if-gold)]/70" dir="rtl" lang="ar">{c.ar}</span>
                  </div>
                  <p className="text-sm text-[var(--if-text-muted)] leading-relaxed mb-3">{lang === "te" ? c.desc_te : c.desc_en}</p>
                  <div className="flex gap-2 items-start text-xs text-[var(--if-text-muted)] bg-[var(--if-gold)]/8 border border-[var(--if-gold)]/20 rounded-xl p-3">
                    <span className="font-bold text-[var(--if-gold)] flex-shrink-0">{t("ప్రయత్నించు:", "Try this:")}</span>
                    <span>{lang === "te" ? c.try_te : c.try_en}</span>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* ── DAILY DUAS ── */}
      <section className="py-16 px-4 bg-white">
        <div className="mx-auto max-w-5xl">
          <BlurFade delay={0.05}>
            <div className="text-xs font-bold tracking-widest uppercase text-[var(--if-gold)] mb-2 text-center">{t("రోజువారీ దువాలు", "Everyday Duas")}</div>
            <h2 className="font-display text-3xl font-bold text-[var(--if-green)] text-center mb-3">
              {t("రోజు కోసం చిన్న దువాలు", "Little Duas for the Day")}
            </h2>
            <p className="text-sm text-center text-[var(--if-text-muted)] mb-10 max-w-md mx-auto">
              {t("రోజంతా చెప్పగలిగే చిన్న దువాలు — అరబిక్, ఉచ్చారణ మరియు అర్థంతో. వీటిని నేర్చుకొని అల్లాహ్‌కు దగ్గరవ్వండి!", "Small duas you can say all through the day — with Arabic, pronunciation, and meaning. Learn them and feel close to Allah!")}
            </p>
          </BlurFade>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {dailyDuas.map((d, i) => (
              <BlurFade key={d.when_en} delay={0.06 * i}>
                <div className="relative bg-[var(--if-cream-light)] rounded-2xl border border-[var(--if-gold)]/20 p-5 overflow-hidden hover:-translate-y-1 transition-transform flex flex-col">
                  <div className="absolute top-0 left-0 right-0 h-1" style={{ background: d.color }} />
                  <div className="inline-flex items-center gap-2 self-start mb-3 bg-white border border-[var(--if-gold)]/20 rounded-full px-3 py-1.5 text-xs font-bold text-[var(--if-green)]">
                    <span className="text-lg">{d.emoji}</span>
                    {lang === "te" ? d.when_te : d.when_en}
                  </div>
                  <p className="font-arabic text-2xl leading-loose text-[var(--if-green)] mb-2 text-right" dir="rtl" lang="ar">{d.ar}</p>
                  <p className="italic text-xs text-emerald-700 font-semibold mb-2 leading-snug">{d.tr}</p>
                  <p className="text-sm text-[var(--if-text-muted)] leading-relaxed flex-1">{lang === "te" ? d.meaning_te : d.meaning_en}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROPHET STORIES ── */}
      <section className="py-16 px-4 bg-[var(--if-cream-light)]">
        <div className="mx-auto max-w-5xl">
          <BlurFade delay={0.05}>
            <div className="text-xs font-bold tracking-widest uppercase text-[var(--if-gold)] mb-2 text-center">{t("ప్రవక్తల కథలు", "Prophet Stories")}</div>
            <h2 className="font-display text-3xl font-bold text-[var(--if-green)] text-center mb-3">
              {t("ఇంటరాక్టివ్ ప్రవక్తల కథలు", "Interactive Prophet Stories")}
            </h2>
            <p className="text-sm text-center text-[var(--if-text-muted)] mb-10 max-w-md mx-auto">
              {t("ప్రతి ప్రవక్త కథలో ఒక నీతి పాఠం మరియు ఈరోజు ప్రయత్నించే ఒక సవాల్ ఉంది.", "Each prophet story has a lesson and a real challenge you can try today.")}
            </p>
          </BlurFade>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {prophets.map((p, i) => (
              <BlurFade key={p.en} delay={0.06 * i}>
                <div className="relative bg-white rounded-2xl border border-[var(--if-gold)]/20 p-5 overflow-hidden hover:-translate-y-1 transition-transform flex flex-col">
                  <div className="absolute top-0 left-0 right-0 h-1" style={{ background: p.color }} />
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl bg-[var(--if-cream-light)] border-2 mb-3 flex-shrink-0" style={{ borderColor: p.color }}>{p.emoji}</div>
                  <div className="font-display font-bold text-[var(--if-green)] text-base mb-0.5">{lang === "te" ? p.te : p.en}</div>
                  <div className="font-arabic text-sm mb-2" style={{ color: p.color }} dir="rtl" lang="ar">{p.ar}</div>
                  <p className="text-sm text-[var(--if-text-muted)] leading-relaxed mb-3 flex-1">{lang === "te" ? p.sum_te : p.sum_en}</p>
                  <div className="flex gap-1.5 items-start text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 mb-2">
                    <span className="font-bold flex-shrink-0">{t("పాఠం:", "Lesson:")}</span>
                    <span>{lang === "te" ? p.lesson_te : p.lesson_en}</span>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEARNING SECTIONS ── */}
      <section className="py-16 px-4 bg-white">
        <div className="mx-auto max-w-5xl">
          <BlurFade delay={0.05}>
            <h2 className="font-display text-3xl font-bold text-[var(--if-green)] text-center mb-10">
              {t("నా ఇస్లాం అన్వేషణ", "My Islam Adventure")}
            </h2>
          </BlurFade>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sections.map((sec, i) => (
              <BlurFade key={sec.num} delay={0.06 * i}>
                <button
                  onClick={() => setActiveSection(activeSection === sec.num ? null : sec.num)}
                  className={`relative overflow-hidden w-full text-left rounded-2xl border transition-all ${activeSection === sec.num ? "border-[var(--if-gold)]/50 shadow-lg shadow-[var(--if-gold)]/10" : "border-[var(--if-gold)]/15 hover:border-[var(--if-gold)]/40"} bg-white`}
                >
                  <BorderBeam size={100} duration={6} colorFrom="#c8922a" colorTo="#e8b84b" className={activeSection === sec.num ? "opacity-100" : "opacity-0"} />
                  <div className={`${sec.color} p-4 flex items-center justify-between`}>
                    <span className="text-3xl">{sec.emoji}</span>
                    <span className="text-xs font-bold text-white/80 bg-white/20 px-2 py-0.5 rounded-full">{sec.age} · {t("స్థాయి", "Level")} {sec.num}</span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-display font-bold text-[var(--if-green)]">{sec.title[lang]}</h3>
                      <span className="font-arabic text-sm text-[var(--if-gold)]/70" dir="rtl" lang="ar">{sec.arabic}</span>
                    </div>
                    <p className="text-sm text-[var(--if-text-muted)] leading-relaxed">{sec.desc[lang]}</p>
                    {activeSection === sec.num && (
                      <ul className="mt-4 space-y-2">
                        {sec.topics.map((tp, j) => (
                          <li key={j} className="flex items-center gap-2 text-sm text-[var(--if-text)]">
                            <Star className="h-3 w-3 text-[var(--if-gold)] flex-shrink-0" fill="currentColor" />
                            {typeof tp === "string" ? tp : tp[lang]}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </button>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* ── MY FIRST WUDU ── */}
      <section className="py-16 px-4 bg-[var(--if-green)]">
        <div className="mx-auto max-w-5xl">
          <BlurFade delay={0.05}>
            <div className="text-xs font-bold tracking-widest uppercase text-[var(--if-gold)] mb-2 text-center">{t("నమాజ్ కోసం పవిత్రత", "Purification for Prayer")}</div>
            <h2 className="font-display text-3xl font-bold text-white text-center mb-3">
              {t("నా మొదటి వుదూ", "My First Wudu")}
            </h2>
            <p className="text-sm text-center text-white/70 mb-10 max-w-md mx-auto">
              {t("నమాజ్ కోసం పవిత్రంగా తయారు చేసుకోవడం — 8 సులభ దశలు.", "Getting clean for prayer — 8 easy steps.")}
            </p>
          </BlurFade>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {wuduSteps.map((s, i) => (
              <BlurFade key={s.en} delay={0.05 * i}>
                <div className="relative bg-white/8 border border-white/15 rounded-2xl p-4 overflow-hidden hover:-translate-y-1 transition-transform">
                  <div className="absolute top-0 left-0 right-0 h-1" style={{ background: s.color }} />
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: s.color }}>{i + 1}</div>
                  <div className="text-2xl mb-2">{s.emoji}</div>
                  <div className="font-display font-bold text-white text-sm mb-1">{lang === "te" ? s.te : s.en}</div>
                  <div className="font-arabic text-xs text-[var(--if-gold-light)] mb-2" dir="rtl" lang="ar">{s.ar}</div>
                  <p className="text-xs text-white/65 leading-relaxed">{lang === "te" ? s.desc_te : s.desc_en}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* ── MY FIRST SALAH ── */}
      <section className="py-16 px-4 bg-[var(--if-cream-light)]">
        <div className="mx-auto max-w-5xl">
          <BlurFade delay={0.05}>
            <div className="text-xs font-bold tracking-widest uppercase text-[var(--if-gold)] mb-2 text-center">{t("నమాజ్ నేర్చుకోవడం", "Learning Prayer")}</div>
            <h2 className="font-display text-3xl font-bold text-[var(--if-green)] text-center mb-3">
              {t("నా మొదటి నమాజ్", "My First Salah")}
            </h2>
            <p className="text-sm text-center text-[var(--if-text-muted)] mb-10 max-w-md mx-auto">
              {t("నమాజ్ ఎలా చేయాలో సులభ దశలలో నేర్చుకోండి — ప్రతి దశలో అర్థం అర్థం చేసుకోండి.", "Learn how to pray step by step — understand the meaning of each movement.")}
            </p>
          </BlurFade>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {salahSteps.map((s, i) => (
              <BlurFade key={s.en} delay={0.06 * i}>
                <div className="relative bg-white rounded-2xl border border-[var(--if-gold)]/20 p-5 overflow-hidden hover:-translate-y-1 transition-transform">
                  <div className="absolute top-0 left-0 right-0 h-1" style={{ background: s.color }} />
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: s.color }}>{i + 1}</div>
                  <div className="text-3xl mb-2">{s.emoji}</div>
                  <div className="font-display font-bold text-[var(--if-green)] text-sm mb-1">{lang === "te" ? s.te : s.en}</div>
                  <div className="font-arabic text-xs text-[var(--if-gold)] mb-2" dir="rtl" lang="ar">{s.ar}</div>
                  <p className="text-xs text-[var(--if-text-muted)] leading-relaxed">{lang === "te" ? s.desc_te : s.desc_en}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* ── DAILY CHALLENGE ── */}
      <section className="py-16 px-4 bg-[var(--if-green)]">
        <div className="mx-auto max-w-3xl">
          <BlurFade delay={0.05}>
            <div className="text-xs font-bold tracking-widest uppercase text-[var(--if-gold)] mb-2 text-center">{t("నేటి సవాల్", "Daily Challenge")}</div>
            <h2 className="font-display text-3xl font-bold text-white text-center mb-3">
              {t("నేటి ఇస్లామిక్ సవాల్", "Today's Islamic Challenge")}
            </h2>
            <p className="text-sm text-center text-white/65 mb-8 max-w-md mx-auto">
              {t("ప్రతిరోజూ ఈ చిన్న పనులు చేయడం ద్వారా మంచి ముస్లింగా మారండి!", "Complete these small daily tasks to grow into a better Muslim!")}
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { emoji: "🤲", te: "ఫజ్ర్ నమాజ్ చేశాను", en: "Prayed Fajr on time" },
                { emoji: "📖", te: "ఒక ఆయత్ చదివాను", en: "Read one Ayah of Quran" },
                { emoji: "😊", te: "ఒకరికి మంచి చేశాను", en: "Did one kind deed" },
                { emoji: "🤲", te: "తల్లిదండ్రులకు సాయపడ్డాను", en: "Helped my parents today" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-white/6 border border-white/15 rounded-xl">
                  <div className="w-8 h-8 rounded-lg border-2 border-[var(--if-gold)]/40 flex-shrink-0" />
                  <span className="text-xl">{item.emoji}</span>
                  <span className="text-sm text-white/85">{lang === "te" ? item.te : item.en}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-center gap-3 flex-wrap">
              {["🌱", "⭐", "🏆", "👑"].map((badge, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl bg-white/5 border border-white/15 opacity-40">{badge}</div>
                  <span className="text-xs text-white/50">{["1", "3", "7", "30"][i]}d</span>
                </div>
              ))}
            </div>
          </BlurFade>
        </div>
      </section>

      {/* ── QUIZ ── */}
      <section className="py-16 px-4 bg-[var(--if-cream-light)]">
        <div className="mx-auto max-w-xl">
          <BlurFade delay={0.1}>
            <h2 className="font-display text-3xl font-bold text-[var(--if-green)] text-center mb-8">
              {t("🎯 ఇస్లాం క్విజ్", "🎯 Islam Quiz")}
            </h2>
            <div className="relative overflow-hidden bg-[var(--if-green)] rounded-2xl p-8">
              <BorderBeam size={250} duration={10} colorFrom="#c8922a" colorTo="#e8b84b" />
              {!done ? (
                <>
                  <div className="flex justify-between text-xs text-[var(--if-gold-pale)]/60 mb-4">
                    <span>{t("ప్రశ్న", "Question")} {quizIdx + 1}/{quiz.length}</span>
                    <span>{t("స్కోర్:", "Score:")} {score}</span>
                  </div>
                  <p className="text-[var(--if-gold-pale)] font-semibold text-lg mb-6 leading-snug">
                    {quiz[quizIdx].q[lang]}
                  </p>
                  <div className="space-y-3">
                    {quiz[quizIdx].options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleAnswer(i)}
                        className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                          selected === null
                            ? "border-[var(--if-gold)]/20 text-[var(--if-gold-pale)] hover:bg-white/10"
                            : i === quiz[quizIdx].correct
                              ? "border-emerald-400 bg-emerald-900/50 text-emerald-300"
                              : i === selected
                                ? "border-red-400 bg-red-900/50 text-red-300"
                                : "border-[var(--if-gold)]/10 text-[var(--if-gold-pale)]/40"
                        }`}
                      >
                        {String.fromCharCode(65 + i)}. {opt}
                      </button>
                    ))}
                  </div>
                  {selected !== null && (
                    <button onClick={nextQ} className="mt-5 w-full py-3 rounded-xl bg-[var(--if-gold)] text-[var(--if-green)] font-bold hover:bg-[var(--if-gold-light)] transition-colors text-sm">
                      {quizIdx < quiz.length - 1 ? t("తదుపరి ప్రశ్న →", "Next Question →") : t("ఫలితం చూడండి →", "See Result →")}
                    </button>
                  )}
                </>
              ) : (
                <div className="text-center py-4">
                  <div className="text-6xl mb-4">{score >= quiz.length * 0.8 ? "🏆" : score >= quiz.length * 0.5 ? "⭐" : "📚"}</div>
                  <h3 className="font-display text-2xl font-bold text-[var(--if-gold-light)] mb-2">
                    {score}/{quiz.length} {t("సరైనవి!", "Correct!")}
                  </h3>
                  <p className="text-[var(--if-gold-pale)]/70 text-sm mb-5">
                    {score >= quiz.length * 0.8
                      ? t("అద్భుతం! మీరు ఇస్లాం జ్ఞానవంతులు!", "Excellent! You are an Islam knowledge champion!")
                      : t("బాగుంది! మరింత నేర్చుకోండి!", "Good effort! Keep learning!")}
                  </p>
                  <button
                    onClick={() => { setQuizIdx(0); setSelected(null); setScore(0); setDone(false); }}
                    className="px-6 py-2.5 rounded-full bg-[var(--if-gold)] text-[var(--if-green)] font-bold hover:bg-[var(--if-gold-light)] transition-colors text-sm"
                  >
                    {t("మళ్ళీ ప్రయత్నించండి", "Try Again")}
                  </button>
                </div>
              )}
            </div>
          </BlurFade>
        </div>
      </section>

      {/* ── PARENT CORNER ── */}
      <section className="py-14 px-4 bg-[var(--if-green)]">
        <div className="mx-auto max-w-4xl">
          <BlurFade delay={0.05}>
            <div className="text-xs font-bold tracking-widest uppercase text-[var(--if-gold)] mb-2 text-center">{t("తల్లిదండ్రులు", "For Parents")}</div>
            <h2 className="font-display text-3xl font-bold text-white text-center mb-10">
              {t("తల్లిదండ్రుల మూల", "Parent Corner")}
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="bg-white/5 border border-[var(--if-gold)]/25 rounded-2xl p-6">
                <h3 className="font-display font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-xl">📊</span> {t("నా పురోగతి", "My Progress")}
                </h3>
                <div className="flex gap-3 flex-wrap">
                  {[{ num: "0/6", label: t("పాఠాలు", "Lessons") }, { num: "0", label: t("XP పాయింట్లు", "XP Points") }, { num: "0", label: t("మిషన్‌లు", "Missions") }].map((stat, i) => (
                    <div key={i} className="flex-1 min-w-[80px] bg-[var(--if-gold)]/8 border border-[var(--if-gold)]/22 rounded-xl p-3 text-center">
                      <div className="font-display text-2xl font-bold text-[var(--if-gold-light)] leading-none">{stat.num}</div>
                      <div className="text-xs text-white/55 uppercase tracking-wide mt-1.5">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/5 border border-[var(--if-gold)]/25 rounded-2xl p-6">
                <h3 className="font-display font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-xl">👨‍👩‍👧</span> {t("తల్లిదండ్రులకు చిట్కాలు", "Tips for Parents")}
                </h3>
                <ul className="space-y-2.5">
                  {[
                    { te: "స్థాయి 3 (రోజువారీ దువాలు) నుండి ప్రారంభించండి — చిన్న, సులభం.", en: "Start with Level 3 (Daily Duas) — short and easy." },
                    { te: "ప్రతి సరైన క్విజ్ జవాబును మెచ్చుకోండి, ఆత్మవిశ్వాసం పెరుగుతుంది.", en: "Praise every correct quiz answer to build confidence." },
                    { te: "రోజువారీ సవాల్‌ను పిల్లలతో కలిసి చేయండి.", en: "Do the daily challenge together with your child." },
                  ].map((tip, i) => (
                    <li key={i} className="flex gap-2 items-start text-sm text-white/80 leading-relaxed">
                      <span className="text-[var(--if-gold)] flex-shrink-0">✦</span>
                      {lang === "te" ? tip.te : tip.en}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function KidsIslam() {
  return <I18nProvider><KidsIslamPage /></I18nProvider>;
}
