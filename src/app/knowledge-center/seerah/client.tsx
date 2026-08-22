"use client";

import { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { LessonIndex } from "@/components/learning/LessonIndex";
import { NarrativeCards } from "@/components/learning/NarrativeCards";
import { seerahEvents, seerahCharacter } from "@/content/portals";
import { PageShell } from "@/components/layout/PageShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ── TIMELINE STAGES ── */
const stages = [
  { num: 1, year: "570 CE", title: { te: "జన్మ & బాల్యం", en: "Birth & Early Years" }, arabic: "المولد والطفولة", desc: { te: "మక్కాలో జన్మించిన ప్రవక్త ముహమ్మద్ ﷺ — 'అల్-అమీన్' (విశ్వసనీయుడు) అని పిలువబడేవారు", en: "Prophet Muhammad ﷺ born in Makkah — known as 'Al-Ameen' (the trustworthy)" }, events: { te: ["బనూ హాషిం వంశంలో జననం", "తండ్రి అబ్దుల్లాహ్ జననానికి ముందే మరణించారు", "ఆరేళ్ళకు తల్లి ఆమినా మరణం", "తాత అబ్దుల్-ముత్తలిబ్, మామ అబూ తాలిబ్ సంరక్షణ"], en: ["Born into the noble Banu Hashim", "Father Abdullah died before his birth", "Mother Aminah died when he was six", "Raised by grandfather then uncle Abu Talib"] }, lesson: { te: "గొప్ప లక్ష్యాలు కష్టమైన ఆరంభాల నుండి మొదలవవచ్చు", en: "Great missions can begin from humble, difficult beginnings" }, color: "bg-amber-700" },
  { num: 2, year: "610 CE", title: { te: "మొదటి వహ్యీ", en: "First Revelation" }, arabic: "بدء الوحي", desc: { te: "గారె హిరాలో జిబ్రాయీల్ అలైహిస్సలామ్ వచ్చి 'ఇఖ్రా' అని మొదటి వచనాలు అవతరించాయి", en: "Jibreel came in cave Hira with first verses — 'Iqra' — Read in the name of your Lord" }, events: { te: ["ఆయన నలభైవ ఏట హిరా గుహలో ధ్యానం", "జిబ్రయీల్ మొదటి వహీ తీసుకువచ్చారు — 'ఇఖ్రా'", "ఖదీజా (ర/అ) మొట్టమొదట విశ్వసించారు", "మూడేళ్ళు రహస్యంగా దావత్"], en: ["Meditating in Cave Hira in his fortieth year", "Jibreel brought the first revelation — 'Iqra'", "Khadijah (RA) was first to believe", "Three years of secret dawah"] }, lesson: { te: "జ్ఞానం, పఠనమే మార్గదర్శనానికి మొట్టమొదటి అడుగు", en: "Knowledge and reading are the very first step of guidance" }, color: "bg-emerald-700" },
  { num: 3, year: "610–622 CE", title: { te: "మక్కా ప్రచారం", en: "Meccan Preaching" }, arabic: "الدعوة في مكة", desc: { te: "13 సంవత్సరాల తౌహీద్ సందేశం — హింస, నిరాకరణ మరియు సహనం", en: "13 years of Tawhid message — persecution, rejection and patience" }, events: { te: ["బహిరంగ దావత్ ప్రారంభం", "బిలాల్ (ర/అ)పై హింస — 'అహద్! అహద్!'", "అబిసీనియాకు తొలి వలస", "దుఃఖ సంవత్సరం — ఖదీజా, అబూ తాలిబ్ మరణం"], en: ["Public dawah begins", "Bilal (RA) tortured for faith — 'Ahad! Ahad!'", "First migration to Abyssinia", "Year of Sorrow — Khadijah and Abu Talib pass away"] }, lesson: { te: "సత్యం బలంతో కాదు, ఓర్పుతో స్థాపించబడుతుంది", en: "Truth is established through patience, not force" }, color: "bg-stone-700" },
  { num: 4, year: "622 CE", title: { te: "మదీనాకు హిజ్రత్", en: "Migration to Madinah" }, arabic: "الهجرة إلى المدينة", desc: { te: "ఇస్లామిక్ క్యాలెండర్ ప్రారంభం — ముస్లిం సమాజ స్థాపన", en: "Start of Islamic calendar — establishment of Muslim community" }, events: { te: ["అబూ బక్ర్ (ర/అ)తో సౌర్ గుహలో ఆశ్రయం", "ఇస్లామిక్ హిజ్రీ క్యాలెండర్ ఆరంభం", "మస్జిద్-అన్-నబవీ నిర్మాణం", "మదీనా ఒడంబడిక — అందరికీ హక్కులు"], en: ["Shelter in Cave Thawr with Abu Bakr (RA)", "Islamic Hijri calendar begins", "Masjid an-Nabawi built", "Constitution of Madinah — rights for all"] }, lesson: { te: "త్యాగం, అల్లాహ్‌పై నమ్మకం కొత్త ఆరంభానికి ద్వారం తెరుస్తాయి", en: "Sacrifice and trust in Allah open the door to a new beginning" }, color: "bg-blue-800" },
  { num: 5, year: "622–625 CE", title: { te: "సమాజ నిర్మాణం", en: "Building the Community" }, arabic: "بناء المجتمع", desc: { te: "మస్జిద్-అన్-నబవీ నిర్మాణం, మదీనా ఒడంబడిక, అన్సార్-ముహాజిరీన్ సోదరత్వం", en: "Masjid an-Nabawi built, Charter of Madinah, brotherhood of Ansar & Muhajireen" }, events: { te: ["ముహాజిర్-అన్సార్ సోదరభావం", "మస్జిద్ సమాజ కేంద్రంగా", "న్యాయమైన ఒడంబడిక", "తొలి ముస్లిం రాజ్యం స్థాపన"], en: ["Muhajir-Ansar brotherhood forged", "Mosque as community centre", "Just constitutional framework", "First Muslim state established"] }, lesson: { te: "బలమైన సమాజాలు సోదరభావం, న్యాయం, ఉమ్మడి నియమాలపై నిర్మించబడతాయి", en: "Strong communities are built on brotherhood, justice, and shared rules" }, color: "bg-teal-800" },
  { num: 6, year: "624–627 CE", title: { te: "యుద్ధాలు & పరీక్షలు", en: "Battles & Trials" }, arabic: "الغزوات والابتلاءات", desc: { te: "బదర్, ఉహుద్, ఖందఖ్ — ఈమాన్‌ను నిరూపించిన పరీక్షలు", en: "Badr, Uhud, Khandaq — trials that tested and proved faith" }, events: { te: ["బద్ర్ (624) — ఈమాన్‌తో విజయం", "ఉహుద్ (625) — క్రమశిక్షణలో పాఠం", "ఖందఖ్ (627) — సల్మాన్ ఫారిసీ కందక వ్యూహం", "విశ్వాసం అగ్నిపరీక్షలో బంగారమైంది"], en: ["Badr (624) — victory through faith", "Uhud (625) — lesson in discipline", "Khandaq (627) — Salman's trench strategy", "Faith proved in the furnace of trial"] }, lesson: { te: "అల్లాహ్ నిష్కపటులకు సహాయం చేస్తాడు; క్రమశిక్షణ, ప్రణాళిక నష్టం నుండి కాపాడతాయి", en: "Allah aids the sincere; discipline and planning protect us from loss" }, color: "bg-gray-700" },
  { num: 7, year: "628–630 CE", title: { te: "విజయాలు & జయాలు", en: "Triumphs & Victories" }, arabic: "الفتوحات والانتصارات", desc: { te: "హుదైబియా సంధి, మక్కా ఫత్హ్ — 'ఇన్నా ఫతహ్నా లకా ఫత్హన్ ముబీనా'", en: "Treaty of Hudaybiyyah, Conquest of Makkah — 'Indeed We have opened for you a clear opening'" }, events: { te: ["హుదైబియా ఒడంబడిక — ఖురాన్ 'స్పష్టమైన విజయం' అన్నది", "10,000 మందితో మక్కాలో శాంతియుత ప్రవేశం", "ప్రవక్త ﷺ శత్రువులందరినీ క్షమించారు", "కాబా విగ్రహాల శుద్ధి"], en: ["Hudaybiyyah treaty — Quran called it a 'clear victory'", "Peaceful entry into Makkah with 10,000", "Prophet ﷺ forgave all enemies", "Purification of the Kaaba from idols"] }, lesson: { te: "అధికారం చేతిలో ఉన్నప్పుడు క్షమించడమే నిజమైన బలం", en: "True strength is to forgive when you hold the power" }, color: "bg-[#1a2a3a]" },
  { num: 8, year: "632 CE", title: { te: "విదాయ్ హజ్జ్", en: "Farewell Pilgrimage" }, arabic: "حجة الوداع", desc: { te: "అరఫాత్ ఖుత్బా — ఇస్లామిక్ సూత్రాల చివరి ప్రకటన", en: "Sermon of Arafat — final declaration of Islamic principles" }, events: { te: ["లక్ష మందికి పైగా సాహబాలకు ఖుత్బా", "మానవ సమానత్వం ప్రకటించబడింది", "స్త్రీల హక్కులు ధృవీకరించబడ్డాయి", "ధర్మ పరిపూర్ణత ప్రకటించబడింది"], en: ["Khutbah to over 100,000 companions", "Equality of all people declared", "Rights of women affirmed", "Completion of religion declared"] }, lesson: { te: "మానవులందరూ సమానం; హక్కులను గౌరవించండి, సందేశం మీ ద్వారా సజీవంగా ఉంటుంది", en: "All people are equal; honour rights, and the message lives on through you" }, color: "bg-indigo-800" },
  { num: 9, year: "632 CE", title: { te: "వారసత్వం & బోధనలు", en: "Legacy & Teachings" }, arabic: "الإرث والتعاليم", desc: { te: "ఖురాన్ మరియు సున్నత్ — మానవజాతికి శాశ్వత మార్గదర్శి", en: "Quran and Sunnah — an eternal guide left for humanity" }, events: { te: ["ఖురాన్ — 23 సంవత్సరాల సంపూర్ణ వహీ", "సున్నత్ — ఆదర్శ జీవన విధానం", "ఉత్తమ స్వభావానికి సజీవ ఆదర్శం", "సాహబాల ద్వారా జ్ఞానం వ్యాపించింది"], en: ["Quran — 23 years of complete revelation", "Sunnah — a perfect way of life", "Living example of the best character", "Knowledge spread through companions"] }, lesson: { te: "ఆయన బంగారం కాదు, మార్గదర్శనాన్ని వదిలారు — ఇది ప్రతి విశ్వాసి మోసే అమానత్", en: "He left not gold, but guidance — a trust now carried by every believer" }, color: "bg-amber-800" },
  { num: 10, year: "Today", title: { te: "ఆధునిక జీవితంలో అనువర్తనం", en: "Application in Modern Life" }, arabic: "التطبيق في الحياة المعاصرة", desc: { te: "ప్రవక్త సీరత్ నుండి నేటి సవాళ్ళకు పరిష్కారాలు నేర్చుకోవడం", en: "Drawing lessons from the Prophet's biography for today's challenges" }, events: { te: ["సీరా పఠనంతో విశ్వాసం బలపడటం", "ఆయన స్వభావాన్ని కుటుంబంలో ఆచరించడం", "నాయకత్వ పాఠాలను పని స్థలంలో అనువర్తించడం", "తరచూ సలవాత్ పంపడం"], en: ["Strengthening faith through Seerah reading", "Practising his character in family life", "Applying leadership lessons at work", "Sending salawat frequently"] }, lesson: { te: "సున్నత్‌ను జీవించండి, నేర్చుకున్నది అందించండి — అదే వారసత్వం", en: "Live the Sunnah and pass on what you learn — that is the legacy" }, color: "bg-green-800" },
];

/* ── CHARACTER TRAITS ── */
const traits = [
  { ar: "الرَّحْمَة", en: "Mercy / Rahmah", te: "దయ / రహ్మత్", ex: { te: "ఆయన పిల్లలతో మృదువుగా, జంతువులపై దయగా ఉండేవారు; తాయిఫ్‌లో హాని చేసినవారికోసం కూడా దుఆ చేశారు.", en: "He was gentle with children, kind to animals, and prayed for those who harmed him at Taif." }, ap: { te: "కుటుంబంతో, చిన్నవారితో, బలహీనులతో మృదువుగా ఉండండి.", en: "Be gentle with family, the young, and the weak." } },
  { ar: "الأَمَانَة", en: "Honesty / Amanah", te: "నిజాయితీ / అమానహ్", ex: { te: "ప్రవక్తత్వానికి ముందే మక్కా ప్రజలు ఆయనను అల్-అమీన్ — నమ్మకస్థుడు — అని పిలిచేవారు.", en: "Even before prophethood the people of Makkah called him Al-Ameen — the Trustworthy." }, ap: { te: "ఎల్లప్పుడూ మాట నిలబెట్టుకోండి, మీకు అప్పగించినదాన్ని కాపాడండి.", en: "Always keep your word and guard what is entrusted to you." } },
  { ar: "الصَّبْر", en: "Patience / Sabr", te: "ఓర్పు / సబ్ర్", ex: { te: "ఆయన ఆశ కోల్పోకుండా ఏళ్ల తరబడి హింసను, ప్రియమైనవారిని కోల్పోవడాన్ని ఓర్చుకున్నారు.", en: "He endured years of persecution and the loss of loved ones without losing hope." }, ap: { te: "కష్ట సమయంలో స్థిరంగా ఉండండి, అల్లాహ్‌పై నమ్మకం ఉంచండి.", en: "Stay steadfast and trust Allah during hardship." } },
  { ar: "التَّوَاضُع", en: "Humility / Tawadu", te: "వినయం / తవాదు", ex: { te: "ఆయన తన దుస్తులను తానే కుట్టుకునేవారు, ఇంటి పనుల్లో సహాయం చేసేవారు, పేదలతో సమానంగా కూర్చునేవారు.", en: "He mended his own clothes, helped at home, and sat among the poor as an equal." }, ap: { te: "ఇతరులకు సంతోషంగా సేవ చేయండి, ఎవరినీ చిన్నచూపు చూడకండి.", en: "Serve others gladly and never look down on anyone." } },
  { ar: "الكَرَم", en: "Generosity / Karam", te: "దానశీలత / కరమ్", ex: { te: "ఆయన ఉదారంగా ఇచ్చేవారు; ఏదైనా అడిగినవారిని తిరస్కరించడం ఎన్నడూ తెలియదు.", en: "He gave freely and was never known to refuse a person who asked him for something." }, ap: { te: "మీ దగ్గర కొంచెమే ఉన్నా సంతోషంగా దానం చేయండి.", en: "Give cheerfully, even when you have little." } },
  { ar: "العَفْو", en: "Forgiveness / Afw", te: "క్షమాపణ / అఫ్వ్", ex: { te: "మక్కాలోకి ప్రవేశించినప్పుడు, ఆయనతో పోరాడి తరిమివేసిన ప్రజలనే ఆయన క్షమించారు.", en: "On entering Makkah he forgave the very people who had fought and driven him out." }, ap: { te: "మీకు అన్యాయం చేసినవారిని క్షమించండి, ద్వేషాన్ని వదిలేయండి.", en: "Pardon those who wrong you and let go of grudges." } },
  { ar: "الشَّجَاعَة", en: "Courage / Shajaaah", te: "ధైర్యం / షజాఅహ్", ex: { te: "ఆయన యుద్ధంలో స్థిరంగా నిలిచారు, ఒంటరిగా ఉన్నా సత్యాన్ని ధైర్యంగా పలికారు.", en: "He stood firm in battle and spoke the truth boldly, even when he stood alone." }, ap: { te: "కష్టమైనా సరే, సరైనదాని కోసం నిలబడండి.", en: "Stand for what is right, even when it is hard." } },
  { ar: "حُسْنُ العِشْرَة", en: "Family Care / Husn al-Ishrah", te: "కుటుంబ ప్రేమ", ex: { te: "ఆయన ఇంటి పనుల్లో సహాయం చేసేవారు, భార్యలతో మృదువుగా ఉండేవారు, మనవళ్ళతో ఆడుకునేవారు.", en: "He helped with housework, was tender with his wives, and played with his grandchildren." }, ap: { te: "మీ కుటుంబానికి ఉత్తమంగా ఉండండి — ఇంట్లో దయగా, చేరువగా, న్యాయంగా.", en: "Be the best to your family — kind, present, and fair at home." } },
];

/* ── LEADERSHIP LESSONS ── */
const leadership = [
  { label: { te: "నిర్ణయం తీసుకోవడం", en: "Decision Making" }, ex: { te: "బద్ర్, ఉహుద్‌కు ముందు ఆయన సహచరులను షూరా కోసం పిలిచి, నిర్ణయానికి ముందు ప్రతి అభిప్రాయాన్ని పరిశీలించేవారు.", en: "Before Badr and Uhud he gathered companions for shura, weighing every view before deciding." }, ap: { te: "నిర్ణయం తీసుకునే ముందు సమర్థులను సంప్రదించి, వాస్తవాలను సేకరించండి.", en: "Consult capable people and gather the facts before you decide." } },
  { label: { te: "వివాద పరిష్కారం", en: "Conflict Resolution" }, ex: { te: "కాబా వద్ద హజ్రే అస్వద్ వివాదాన్ని ఆయన పరిష్కరించి, ప్రతి తెగ దాన్ని ఎత్తే గౌరవాన్ని పంచుకునేలా చేశారు.", en: "At the Kaaba he settled the Black Stone dispute so every tribe shared the honour of lifting it." }, ap: { te: "అందరి గౌరవాన్ని కాపాడే ఇరువైపులా లాభదాయక పరిష్కారాలను వెతకండి.", en: "Look for win-win solutions that protect everyone's dignity." } },
  { label: { te: "జట్టు నిర్మాణం", en: "Team Building" }, ex: { te: "ప్రతి ముహాజిర్‌ను ఒక అన్సారీతో సోదరభావంలో జతచేసి, అపరిచితులను ఒకే ఐక్య సమాజంగా మార్చారు.", en: "He paired each Muhajir with an Ansari in brotherhood, turning strangers into one united community." }, ap: { te: "నమ్మకాన్ని పెంచి, ఒకరి బలం మరొకరిని పూరించేలా వ్యక్తులను జతచేయండి.", en: "Build trust and pair people so their strengths complete each other." } },
  { label: { te: "సంభాషణ", en: "Communication" }, ex: { te: "ఆయన స్పష్టంగా, క్లుప్తంగా మాట్లాడేవారు, ముఖ్య విషయాలను మూడుసార్లు పునరావృతం చేసేవారు, అందరినీ పూర్తిగా వినేవారు.", en: "He spoke clearly and briefly, repeated important points three times, and listened fully to everyone." }, ap: { te: "స్పష్టంగా మాట్లాడండి, ముఖ్యమైనది పునరావృతం చేయండి, బదులు చెప్పేముందు వినండి.", en: "Speak clearly, repeat what matters, and listen before you respond." } },
  { label: { te: "సమాజ నిర్మాణం", en: "Community Building" }, ex: { te: "మస్జిద్‌ను సమాజ కేంద్రంగా చేసి, అన్ని వర్గాల కోసం మదీనా ఒడంబడికను రూపొందించారు.", en: "He made the mosque the community's centre and drafted the Constitution of Madinah for all groups." }, ap: { te: "అందరూ తమదిగా భావించే ఉమ్మడి స్థలాలను, న్యాయమైన నియమాలను సృష్టించండి.", en: "Create shared spaces and fair rules that everyone feels they own." } },
  { label: { te: "వ్యూహాత్మక ఆలోచన", en: "Strategic Thinking" }, ex: { te: "ఖందఖ్ వద్ద కందకం, హుదైబియా ఒప్పందం స్వల్పకాలిక అహం కంటే దీర్ఘకాలిక దృష్టిని చూపాయి.", en: "The trench at Khandaq and the Hudaybiyyah treaty showed long-term vision over short-term ego." }, ap: { te: "దీర్ఘకాలికంగా ఆలోచించండి — ఓర్పు, ప్రణాళిక తరచుగా బలం కంటే ఎక్కువ సాధిస్తాయి.", en: "Think long-term — patience and planning often win more than force." } },
];

/* ── COMPANIONS ── */
const characters = [
  { name: "Khadijah RA", ar: "خديجة", role: { te: "మొదటి భార్య — ఇస్లామ్‌లో మొదటి విశ్వాసి", en: "First wife — first believer in Islam" }, event: { te: "ఆయన హిరాలో ప్రకంపించినప్పుడు ఓదార్చి, వెంటనే విశ్వసించారు", en: "Comforted him when he trembled at Hira and believed at once" }, era: "Makkah" },
  { name: "Abu Bakr RA", ar: "أبو بكر", role: { te: "అత్యంత సన్నిహిత తోడు — అస్-సిద్దీఖ్", en: "Closest companion — As-Siddiq (the truthful)" }, event: { te: "హిజ్రా సమయంలో సౌర్ గుహలో ఆయనతో ఉన్నారు", en: "Accompanied him in Cave Thawr during the Hijrah" }, era: "Both" },
  { name: "Umar ibn Khattab RA", ar: "عمر", role: { te: "ఇస్లాం బలోపేతానికి కారణమైన అల్-ఫారూఖ్", en: "Al-Farooq — whose embrace strengthened Islam" }, event: { te: "ఆయన ఇస్లాం స్వీకారం ముస్లింలలో ధైర్యాన్ని పెంచింది", en: "His conversion gave the Muslims new confidence to practise openly" }, era: "Makkah" },
  { name: "Ali ibn Abi Talib RA", ar: "علي", role: { te: "వ్యవస్థాపకుడి సోదరుడు — జ్ఞానపు ద్వారం", en: "Cousin and son-in-law — 'Gate of knowledge'" }, event: { te: "హిజ్రా రాత్రి ప్రవక్త ﷺ మంచంలో ప్రాణ ప్రమాదం ఉన్నా పడుకున్నారు", en: "Slept in the Prophet's ﷺ bed the night of Hijrah, risking his life" }, era: "Both" },
  { name: "Bilal ibn Rabah RA", ar: "بلال", role: { te: "మొదటి ముఆజ్జిన్ — సహనానికి చిహ్నం", en: "First Muezzin — symbol of patience and resilience" }, event: { te: "హింసలో 'అహద్! అహద్!' అని ఓర్చుకున్న నిష్కల విశ్వాసం", en: "Endured torture crying 'Ahad! Ahad!' — a symbol of unshakeable faith" }, era: "Makkah" },
  { name: "Fatimah RA", ar: "فاطمة", role: { te: "ప్రవక్త కుమార్తె — స్వర్గ మహిళలకు నాయకురాలు", en: "Prophet's daughter — leader of women in Paradise" }, event: { te: "ప్రవక్త ﷺ ఆమె వచ్చినప్పుడు లేచి నుదుటిపై ముద్దు పెట్టేవారు", en: "The Prophet ﷺ would rise and kiss her forehead whenever she came" }, era: "Madinah" },
];

/* ── SALAWAT ── */
const salawat = [
  {
    label: { te: "చిన్న సలవాత్", en: "Short Salawat" },
    ar: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِهِ",
    tr: { te: "అల్లాహుమ్మ సల్లి అలా ముహమ్మదిన్ వ అలా ఆలిహి", en: "Allahumma salli ala Muhammadin wa ala alihi" },
    meaning: { te: "ఓ అల్లాహ్, ముహమ్మద్ ﷺ పై, ఆయన కుటుంబంపై దయను పంపు. రోజులో ఎప్పుడైనా చెప్పగల చిన్న సలవాత్.", en: "O Allah, send blessings upon Muhammad ﷺ and his family. A short salawat we can say at any time of the day." },
  },
  {
    label: { te: "దురూద్ ఇబ్రాహీమ్", en: "Durood Ibrahim" },
    ar: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
    tr: { te: "అల్లాహుమ్మ సల్లి అలా ముహమ్మదిన్ వ అలా ఆలి ముహమ్మద్, కమా సల్లైత అలా ఇబ్రాహీమ వ అలా ఆలి ఇబ్రాహీమ్, ఇన్నక హమీదున్ మజీద్", en: "Allahumma salli ala Muhammadin wa ala ali Muhammad, kama sallayta ala Ibrahima wa ala ali Ibrahim, innaka Hamidun Majid" },
    meaning: { te: "ఓ అల్లాహ్, ఇబ్రాహీమ్‌పై దయ పంపినట్లే ముహమ్మద్ ﷺ పై దయ పంపు. ఇది మనం ప్రతి నమాజులో పఠించే సలవాత్.", en: "O Allah, send blessings upon Muhammad ﷺ and his family as You sent blessings upon Ibrahim and his family. This is the salawat recited in every prayer." },
  },
  {
    label: { te: "ప్రతిఫలం", en: "The Reward" },
    ar: "مَنْ صَلَّى عَلَيَّ وَاحِدَةً صَلَّى اللَّهُ عَلَيْهِ عَشْرًا",
    tr: { te: "హదీస్ — సహీహ్ ముస్లిం", en: "Hadith — Sahih Muslim" },
    meaning: { te: "ప్రవక్త ﷺ చెప్పారు: నాపై ఒక్కసారి దయ పంపేవాడిపై అల్లాహ్ పదిసార్లు దయ పంపుతాడు. కనుక తరచూ సలవాత్ పంపండి.", en: "The Prophet ﷺ said: Whoever sends one blessing upon me, Allah sends ten blessings upon him. So send salawat often." },
  },
];

function SeerahPage() {
  const { lang } = useI18n();
  const [active, setActive] = useState(0);

  const t = (te: string, en: string) => lang === "te" ? te : en;

  return (
    <PageShell>

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-800 to-[var(--if-green)] text-[var(--if-gold-pale)] py-20 px-4">
        <div className="mx-auto max-w-4xl text-center flex flex-col items-center gap-5">
          <BlurFade delay={0.05}>
            <Link href="/knowledge-center" className="inline-flex items-center min-h-9 gap-1 text-sm text-[var(--if-gold-pale)]/80 hover:text-[var(--if-gold-light)] transition-colors mb-2">
              <ChevronLeft className="h-4 w-4" />
              {t("జ్ఞాన కేంద్రం", "Knowledge Center")}
            </Link>
          </BlurFade>
          <BlurFade delay={0.1}>
            <span className="font-arabic text-4xl text-[var(--if-gold-light)]" dir="rtl" lang="ar">السِّيرَة النَّبَوِيَّة</span>
          </BlurFade>
          <BlurFade delay={0.15}>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-[var(--if-gold-light)]">
              {t("సీరత్-అన్-నబవియ్యహ్", "Seerah an-Nabawiyyah")}
            </h1>
          </BlurFade>
          <BlurFade delay={0.2}>
            <p className="text-[var(--if-gold-pale)]/70 max-w-xl">
              {t("ప్రవక్త ముహమ్మద్ ﷺ జీవిత చరిత్ర — 10-దశల దృశ్య కాలపట్టిక, స్వభావ అకాడమీ, నాయకత్వ పాఠాలు", "Life of Prophet Muhammad ﷺ — 10-stage visual timeline, Character Academy, and Leadership Lessons")}
            </p>
          </BlurFade>
          <BlurFade delay={0.25}>
            <div className="flex gap-8 justify-center mt-2">
              {[["10", t("ఘట్టాలు", "Stages")], ["8", t("స్వభావాలు", "Traits")], ["6", t("నాయకత్వ పాఠాలు", "Leadership")], [t("ఉచితం", "Free"), t("ఎల్లప్పుడూ", "Always")]].map(([n, l]) => (
                <div key={l} className="text-center">
                  <div className="font-display text-2xl font-bold text-[var(--if-gold-light)]">{n}</div>
                  <div className="text-xs text-[var(--if-gold-pale)]/80 uppercase tracking-wider mt-1">{l}</div>
                </div>
              ))}
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="py-16 px-4 bg-[var(--if-cream-light)]">
        <div className="mx-auto max-w-5xl">
          <BlurFade delay={0.1}>
            <h2 className="font-display text-3xl font-bold text-[var(--if-green)] text-center mb-10">
              {t("జీవిత కాలపట్టిక", "Life Timeline")}
            </h2>
          </BlurFade>

          {/* Stage selector */}
          <div className="overflow-x-auto pb-4 mb-6">
            <div className="flex gap-3 min-w-max px-1">
              {stages.map((s, i) => (
                <button
                  key={s.num}
                  onClick={() => setActive(i)}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all min-w-[90px] ${
                    active === i
                      ? "bg-[var(--if-green)] border-[var(--if-gold)]/40 text-[var(--if-gold-pale)]"
                      : "bg-white border-[var(--if-gold)]/15 text-[var(--if-text)] hover:border-[var(--if-gold)]/40"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full ${s.color} flex items-center justify-center text-white text-xs font-bold`}>
                    {s.num}
                  </div>
                  <span className="text-xs font-semibold text-center leading-tight">{s.year}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active stage card */}
          <BlurFade delay={0.05} key={active}>
            <div className="relative overflow-hidden bg-white rounded-2xl border border-[var(--if-gold)]/20 p-8">
              <BorderBeam size={200} duration={10} colorFrom="#0d3b1e" colorTo="#c8922a" />
              <div className="flex items-start gap-6 flex-wrap mb-6">
                <div className={`w-14 h-14 rounded-2xl ${stages[active].color} flex items-center justify-center text-white font-display text-xl font-bold flex-shrink-0`}>
                  {stages[active].num}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap mb-1">
                    <h3 className="font-display text-2xl font-bold text-[var(--if-green)]">
                      {stages[active].title[lang]}
                    </h3>
                    <span className="font-arabic text-lg text-[var(--if-gold-light)]" dir="rtl" lang="ar">{stages[active].arabic}</span>
                  </div>
                  <span className="text-xs font-bold text-[var(--if-gold-ink)] tracking-wider uppercase">{stages[active].year}</span>
                  <p className="text-[var(--if-text-muted)] mt-2 leading-relaxed">{stages[active].desc[lang]}</p>
                </div>
              </div>
              {/* Key events */}
              <div className="grid sm:grid-cols-2 gap-4 mb-5">
                <div className="bg-[var(--if-cream-light)] rounded-xl p-4">
                  <div className="text-xs font-bold text-[var(--if-gold-ink)] uppercase tracking-wider mb-3">{t("ముఖ్య ఘట్టాలు", "Key Events")}</div>
                  <ul className="space-y-1.5">
                    {stages[active].events[lang].map((ev, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[var(--if-text-muted)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--if-gold)] mt-1.5 flex-shrink-0" />
                        {ev}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[var(--if-green)]/5 border border-[var(--if-green)]/20 rounded-xl p-4 flex flex-col justify-center">
                  <div className="text-xs font-bold text-[var(--if-green)] uppercase tracking-wider mb-2">{t("కీలక పాఠం", "Key Lesson")}</div>
                  <p className="text-sm text-[var(--if-text-muted)] leading-relaxed italic">{stages[active].lesson[lang]}</p>
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <button onClick={() => setActive(a => Math.max(0, a - 1))} disabled={active === 0} className="p-2 rounded-full border border-[var(--if-gold)]/30 hover:bg-[var(--if-cream-light)] transition-colors disabled:opacity-30">
                  <ChevronLeft className="h-4 w-4 text-[var(--if-green)]" />
                </button>
                <span className="self-center text-xs text-[var(--if-text-muted)]">{active + 1} / {stages.length}</span>
                <button onClick={() => setActive(a => Math.min(stages.length - 1, a + 1))} disabled={active === stages.length - 1} className="p-2 rounded-full border border-[var(--if-gold)]/30 hover:bg-[var(--if-cream-light)] transition-colors disabled:opacity-30">
                  <ChevronRight className="h-4 w-4 text-[var(--if-green)]" />
                </button>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Character of the Prophet ﷺ */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-5xl">
          <BlurFade delay={0.1}>
            <div className="text-center mb-10">
              <div className="text-xs font-bold text-[var(--if-gold-ink)] uppercase tracking-widest mb-2">{t("స్వభావ అకాడమీ", "Character Academy")}</div>
              <h2 className="font-display text-3xl font-bold text-[var(--if-green)] mb-3">
                {t("ప్రవక్త ﷺ స్వభావం", "Character of the Prophet ﷺ")}
              </h2>
              <p className="text-[var(--if-text-muted)] max-w-xl mx-auto text-sm">
                {t("ఆయన స్వభావం నేర్చుకొని ఆచరించడమే నిజమైన సీరా అనుసరణ.", "Learning and practising his character is the truest way to follow the Seerah.")}
              </p>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {traits.map((tr, i) => (
              <BlurFade key={tr.ar} delay={0.06 * i}>
                <div className="relative overflow-hidden bg-white rounded-2xl border border-[var(--if-gold)]/15 p-5 hover:border-[var(--if-gold)]/50 hover:-translate-y-1 transition-all group flex flex-col h-full">
                  <BorderBeam size={80} duration={8} colorFrom="#c8922a" colorTo="#e8b84b" className="opacity-0 group-hover:opacity-100" />
                  <div className="font-arabic text-2xl text-[var(--if-gold-light)] mb-2 text-right" dir="rtl" lang="ar">{tr.ar}</div>
                  <h3 className="font-semibold text-[var(--if-green)] text-sm mb-3">{lang === "te" ? tr.te : tr.en}</h3>
                  <p className="text-xs text-[var(--if-text-muted)] leading-relaxed flex-1 mb-3">{tr.ex[lang]}</p>
                  <div className="flex gap-2 items-start bg-[var(--if-gold)]/6 border border-[var(--if-gold)]/20 rounded-lg p-2.5 mt-auto">
                    <span className="text-[var(--if-gold-ink)] font-bold text-xs flex-shrink-0">{t("ఆచరణ:", "Apply:")}</span>
                    <span className="text-xs text-[var(--if-text-muted)] leading-relaxed">{tr.ap[lang]}</span>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
          {/* Hadith callout */}
          <BlurFade delay={0.3}>
            <div className="mt-10 bg-[var(--if-green)] rounded-2xl p-6 text-center">
              <div className="font-arabic text-xl text-[var(--if-gold-light)] mb-2 leading-relaxed" dir="rtl" lang="ar">إِنَّمَا بُعِثْتُ لِأُتَمِّمَ مَكَارِمَ الْأَخْلَاقِ</div>
              <p className="text-sm text-[var(--if-gold-pale)]/80">{t("\"నేను ఉత్తమ స్వభావాన్ని పరిపూర్ణం చేయడానికే పంపబడ్డాను.\" — ప్రవక్త ﷺ (అహ్మద్)", '"I was only sent to perfect good character." — Prophet ﷺ (Ahmad)')}</p>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Leadership Lessons */}
      <section className="py-16 px-4 bg-[var(--if-cream-light)]">
        <div className="mx-auto max-w-5xl">
          <BlurFade delay={0.1}>
            <div className="text-center mb-10">
              <div className="text-xs font-bold text-[var(--if-gold-ink)] uppercase tracking-widest mb-2">{t("సీరా నుండి", "From the Seerah")}</div>
              <h2 className="font-display text-3xl font-bold text-[var(--if-green)] mb-3">
                {t("నాయకత్వ పాఠాలు", "Leadership Lessons")}
              </h2>
              <p className="text-[var(--if-text-muted)] max-w-xl mx-auto text-sm">
                {t("ప్రవక్త ﷺ జీవితం నుండి నేటి నాయకత్వానికి ఆచరణీయ పాఠాలు.", "Practical leadership lessons drawn from the Prophet's ﷺ life for today.")}
              </p>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {leadership.map((ls, i) => (
              <BlurFade key={ls.label.en} delay={0.07 * i}>
                <div className="relative overflow-hidden bg-white rounded-2xl border border-[var(--if-gold)]/15 p-5 hover:border-[var(--if-gold)]/50 hover:-translate-y-1 transition-all group flex flex-col h-full">
                  <BorderBeam size={80} duration={9} colorFrom="#0d3b1e" colorTo="#c8922a" className="opacity-0 group-hover:opacity-100" />
                  <div className="inline-flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--if-green)]/10 flex items-center justify-center text-[var(--if-green)] font-bold text-sm">{i + 1}</div>
                    <h3 className="font-semibold text-[var(--if-green)]">{ls.label[lang]}</h3>
                  </div>
                  <p className="text-xs text-[var(--if-text-muted)] leading-relaxed flex-1 mb-3">{ls.ex[lang]}</p>
                  <div className="flex gap-2 items-start bg-[var(--if-green)]/6 border border-[var(--if-green)]/20 rounded-lg p-2.5 mt-auto">
                    <span className="text-[var(--if-green)] font-bold text-xs flex-shrink-0">{t("ఆచరణ:", "Apply:")}</span>
                    <span className="text-xs text-[var(--if-text-muted)] leading-relaxed">{ls.ap[lang]}</span>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Companions */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-5xl">
          <BlurFade delay={0.1}>
            <h2 className="font-display text-3xl font-bold text-[var(--if-green)] text-center mb-10">
              {t("సహచరుల పరిచయం", "Meet the Companions")}
            </h2>
          </BlurFade>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {characters.map((c, i) => (
              <BlurFade key={c.name} delay={0.07 * i}>
                <div className="relative overflow-hidden bg-white rounded-2xl border border-[var(--if-gold)]/15 p-5 hover:border-[var(--if-gold)]/50 transition-all group flex flex-col">
                  <BorderBeam size={80} duration={7} colorFrom="#c8922a" colorTo="#e8b84b" className="opacity-0 group-hover:opacity-100" />
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-11 h-11 rounded-full bg-[var(--if-green)] flex items-center justify-center text-[var(--if-gold-light)] font-bold flex-shrink-0">
                      {c.name[0]}
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--if-green)] text-sm">{c.name}</h3>
                      <span className="font-arabic text-sm text-[var(--if-gold-light)]" dir="rtl" lang="ar">{c.ar}</span>
                    </div>
                    <span className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full bg-[var(--if-gold)]/10 text-[var(--if-gold-ink)] border border-[var(--if-gold)]/20">{c.era}</span>
                  </div>
                  <p className="text-xs text-[var(--if-green)] font-semibold mb-2">{c.role[lang]}</p>
                  <p className="text-xs text-[var(--if-text-muted)] leading-relaxed italic">{c.event[lang]}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Salawat */}
      <section className="py-16 px-4 bg-[var(--if-green)]">
        <div className="mx-auto max-w-4xl">
          <BlurFade delay={0.1}>
            <div className="text-center mb-10">
              <div className="text-xs font-bold text-[var(--if-gold-ink)] uppercase tracking-widest mb-2">{t("ప్రవక్త ﷺ పై", "Upon the Prophet ﷺ")}</div>
              <h2 className="font-display text-3xl font-bold text-[var(--if-gold-light)] mb-3">
                {t("సలవాత్ పంపడం", "Sending Salawat")}
              </h2>
              <p className="text-[var(--if-gold-pale)]/70 max-w-lg mx-auto text-sm">
                {t("ప్రవక్త ﷺ పై సలవాత్ పంపడం అల్లాహ్ ఆదేశం — ఖురాన్ 33:56.", "Sending salawat upon the Prophet ﷺ is a command of Allah — Quran 33:56.")}
              </p>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {salawat.map((s, i) => (
              <BlurFade key={s.label.en} delay={0.08 * i}>
                <div className="bg-white/5 border border-[var(--if-gold)]/25 rounded-2xl p-5 flex flex-col hover:-translate-y-1 transition-all">
                  <span className="inline-block text-xs font-bold text-[var(--if-gold-ink)] bg-[var(--if-gold)]/10 border border-[var(--if-gold)]/20 rounded-full px-3 py-1 mb-4 self-start">{s.label[lang]}</span>
                  <div className="font-arabic text-xl text-[var(--if-gold-light)] leading-loose mb-3 text-right" dir="rtl" lang="ar">{s.ar}</div>
                  <div className="text-xs font-semibold text-[var(--if-gold-light)] italic mb-3 leading-relaxed">{s.tr[lang]}</div>
                  <p className="text-sm text-[var(--if-gold-pale)]/80 leading-relaxed flex-1">{s.meaning[lang]}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Ayah */}
      <section className="py-16 px-4 bg-[var(--if-cream-light)] text-center">
        <BlurFade delay={0.1}>
          <div className="mx-auto max-w-xl">
            <div className="font-arabic text-3xl text-[var(--if-green)] mb-4 leading-relaxed" dir="rtl" lang="ar">
              لَقَدْ كَانَ لَكُمْ فِي رَسُولِ اللَّهِ أُسْوَةٌ حَسَنَةٌ
            </div>
            <p className="text-sm text-[var(--if-text-muted)]">
              {t("\"అల్లాహ్ రసూల్‌లో మీకు ఉత్తమ ఆదర్శం ఉంది\" — సూరహ్ అల్-అహ్జాబ్ 33:21", "\"Indeed in the Messenger of Allah you have an excellent example\" — Surah Al-Ahzab 33:21")}
            </p>
          </div>
        </BlurFade>
      </section>


      <section id="timeline" className="py-16 px-4 scroll-mt-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-2xl font-bold text-[var(--if-green)] mb-2">
            {lang === "te" ? "ప్రవక్త ﷺ జీవిత కాలక్రమం" : "Timeline of the Prophet's life ﷺ"}
          </h2>
          <p className="text-[var(--if-text-muted)] mb-6 text-pretty">
            {lang === "te" ? "పుట్టుక నుండి వీడ్కోలు ప్రసంగం వరకు పది దశలు — ప్రతి దశ నుండి ఒక పాఠం." : "Ten stages from birth to the Farewell Sermon, each with the lesson it carries."}
          </p>
          <NarrativeCards
            entries={seerahEvents}
            fields={{ meta: "yr", summary: "s", lesson: "l" }}
            numbered
          />
        </div>
      </section>


      <section id="character" className="py-16 px-4 scroll-mt-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-2xl font-bold text-[var(--if-green)] mb-2">
            {lang === "te" ? "ప్రవక్త ﷺ స్వభావం" : "The Prophet's character ﷺ"}
          </h2>
          <p className="text-[var(--if-text-muted)] mb-6 text-pretty">
            {lang === "te" ? "పది లక్షణాలు — ప్రతిదానికి ఆధారం మరియు నేటి జీవితంలో దాన్ని ఎలా ఆచరించాలో." : "Ten traits, each with its evidence and how to practise it today."}
          </p>
          <NarrativeCards
            entries={seerahCharacter}
            fields={{ summary: "ex", lesson: "ap" }}
            lessonLabel={{ te: "ఆచరణ", en: "Put it into practice" }}
          />
        </div>
      </section>

      <LessonIndex portal="seerah" />

    </PageShell>
  );
}

export default function Seerah() {
  return <SeerahPage />;
}
