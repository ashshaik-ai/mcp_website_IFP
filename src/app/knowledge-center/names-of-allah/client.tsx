"use client";

import { Fragment, useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { foldSearch } from "@/lib/search-text";
import { Simulator } from "@/components/sim/Simulator";
import { Tasbih } from "@/components/tools/Tasbih";
import { ReviewDeck, type ReviewCard } from "@/components/learning/ReviewDeck";
import { NamesScene } from "@/components/sim/scenes/NamesScene";
import { namesSteps } from "@/content/simulations";

import { PageShell } from "@/components/layout/PageShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { LessonIndex } from "@/components/learning/LessonIndex";
import { PortalJump } from "@/components/learning/PortalJump";
import { PortalWallpaper } from "@/components/learning/PortalWallpaper";
import { ChevronLeft, Volume2, Search } from "lucide-react";

/* Bilingual copy for this file, hoisted out of the JSX so a translator
   can read and review it as one unit. */
const copy = {
  knowledge_center: { te: "జ్ఞాన కేంద్రం", en: "Knowledge Center" },
  n_99_names_of_allah: { te: "అల్లాహ్ యొక్క 99 పేర్లు", en: "99 Names of Allah" },
  al_asmaa_ul_husna_allah: { te: "అస్మాఉల్ హుస్నా — అల్లాహ్ యొక్క సుందర నామాలు మరియు వాటి అర్థాలు", en: "Al-Asmaa ul-Husna — Allah's beautiful names and their meanings" },
  search_a_name: { te: "పేరు వెతకండి...", en: "Search a name..." },
  no_results_found: { te: "ఫలితాలు కనుగొనబడలేదు", en: "No results found" },
  listen: { te: "వినండి", en: "Listen" },
  skipNames: { te: "99 పేర్లను దాటి ముందుకు వెళ్ళండి", en: "Skip past the 99 names" },
  whenToSay: { te: "ఎప్పుడు పిలవాలి", en: "When to call on it" },
  inQuran: { te: "ఖురాన్‌లో", en: "In the Quran" },
  surah: { te: "సూరా", en: "Surah" },
} as const;

const names = [
  { n: 1,  ar: "اللَّهُ",        name: "Allah",        te: "అల్లాహ్",            en: "The One God", mean: "ఏకైక నిజ దేవుడు", when: "అన్ని దుఆలకు మొదలు", ref: "1:1" },
  { n: 2,  ar: "الرَّحْمَٰنُ",  name: "Ar-Rahman",    te: "అర్-రహ్మాన్",        en: "The Most Gracious", mean: "అత్యంత కరుణామయుడు", when: "కరుణ కోరినప్పుడు", ref: "1:1" },
  { n: 3,  ar: "الرَّحِيمُ",    name: "Ar-Raheem",    te: "అర్-రహీమ్",          en: "The Most Merciful", mean: "అపార దయాళువు", when: "క్షమాపణ వేడుకున్నప్పుడు", ref: "1:1" },
  { n: 4,  ar: "الْمَلِكُ",     name: "Al-Malik",     te: "అల్-మలిక్",          en: "The King", mean: "సర్వాధిపతి రాజు", when: "అధికారం ముందు నిలబడినప్పుడు", ref: "59:23" },
  { n: 5,  ar: "الْقُدُّوسُ",   name: "Al-Quddus",    te: "అల్-ఖుద్దూస్",       en: "The Most Holy", mean: "పరమ పవిత్రుడు", when: "హృదయ శుద్ధి కోరినప్పుడు", ref: "59:23" },
  { n: 6,  ar: "السَّلَامُ",    name: "As-Salam",     te: "అస్-సలామ్",          en: "The Source of Peace", mean: "శాంతికి మూలం", when: "అశాంతిలో ఉన్నప్పుడు", ref: "59:23" },
  { n: 7,  ar: "الْمُؤْمِنُ",   name: "Al-Mumin",     te: "అల్-ముమిన్",         en: "The Guardian of Faith", mean: "విశ్వాసానికి రక్షకుడు", when: "భయం కలిగినప్పుడు", ref: "59:23" },
  { n: 8,  ar: "الْمُهَيْمِنُ", name: "Al-Muhaymin",  te: "అల్-ముహైమిన్",       en: "The Protector", mean: "సర్వ సంరక్షకుడు", when: "రక్షణ కోరినప్పుడు", ref: "59:23" },
  { n: 9,  ar: "الْعَزِيزُ",    name: "Al-Aziz",      te: "అల్-అజీజ్",          en: "The Almighty", mean: "సర్వశక్తిమంతుడు", when: "బలహీనంగా అనిపించినప్పుడు", ref: "59:23" },
  { n: 10, ar: "الْجَبَّارُ",   name: "Al-Jabbar",    te: "అల్-జబ్బార్",        en: "The Compeller", mean: "సర్వాన్ని లొంగదీసేవాడు", when: "అన్యాయాన్ని ఎదుర్కొన్నప్పుడు", ref: "59:23" },
  { n: 11, ar: "الْمُتَكَبِّرُ",name: "Al-Mutakabbir",te: "అల్-ముతకబ్బిర్",    en: "The Supreme", mean: "సర్వోన్నతుడు", when: "గర్వం తలెత్తినప్పుడు", ref: "59:23" },
  { n: 12, ar: "الْخَالِقُ",    name: "Al-Khaliq",    te: "అల్-ఖాలిఖ్",         en: "The Creator", mean: "సృష్టికర్త", when: "కొత్త ఆరంభంలో", ref: "59:24" },
  { n: 13, ar: "الْبَارِئُ",    name: "Al-Bari",      te: "అల్-బారీ",           en: "The Originator", mean: "శూన్యం నుండి రూపొందించేవాడు", when: "శూన్యం నుండి మొదలుపెట్టేటప్పుడు", ref: "59:24" },
  { n: 14, ar: "الْمُصَوِّرُ",  name: "Al-Musawwir",  te: "అల్-ముసవ్విర్",      en: "The Fashioner", mean: "ఆకృతి ఇచ్చేవాడు", when: "సృష్టిని చూసి ఆశ్చర్యపడినప్పుడు", ref: "59:24" },
  { n: 15, ar: "الْغَفَّارُ",   name: "Al-Ghaffar",   te: "అల్-ఘఫ్ఫార్",        en: "The Great Forgiver", mean: "మళ్ళీ మళ్ళీ క్షమించేవాడు", when: "పాపం చేసిన తర్వాత" },
  { n: 16, ar: "الْقَهَّارُ",   name: "Al-Qahhar",    te: "అల్-ఖహ్హార్",        en: "The Subduer", mean: "అన్నిటిపై ఆధిపత్యం కలవాడు", when: "అహంకారాన్ని వదిలేటప్పుడు" },
  { n: 17, ar: "الْوَهَّابُ",   name: "Al-Wahhab",    te: "అల్-వహ్హాబ్",        en: "The Bestower", mean: "ప్రతిఫలం ఆశించక ఇచ్చేవాడు", when: "అడగకుండానే లభించినప్పుడు" },
  { n: 18, ar: "الرَّزَّاقُ",   name: "Ar-Razzaq",    te: "అర్-రజ్జాఖ్",        en: "The Provider", mean: "ఉపాధి ప్రసాదించేవాడు", when: "ఉపాధి కోసం" },
  { n: 19, ar: "الْفَتَّاحُ",   name: "Al-Fattah",    te: "అల్-ఫత్తాహ్",        en: "The Opener", mean: "ద్వారాలు తెరిచేవాడు", when: "దారి మూసుకుపోయినట్టు అనిపించినప్పుడు" },
  { n: 20, ar: "الْعَلِيمُ",    name: "Al-Alim",      te: "అల్-అలీమ్",          en: "The All-Knowing", mean: "సర్వజ్ఞుడు", when: "సందేహంలో ఉన్నప్పుడు" },
  { n: 21, ar: "الْقَابِضُ",    name: "Al-Qabid",     te: "అల్-ఖాబిద్",         en: "The Constrictor", mean: "కుదించేవాడు", when: "సంపద తగ్గినప్పుడు" },
  { n: 22, ar: "الْبَاسِطُ",    name: "Al-Basit",     te: "అల్-బాసిత్",         en: "The Extender", mean: "విస్తరించేవాడు", when: "సమృద్ధి కోరినప్పుడు" },
  { n: 23, ar: "الْخَافِضُ",    name: "Al-Khafid",    te: "అల్-ఖాఫిద్",         en: "The Abaser", mean: "తగ్గించేవాడు", when: "గర్వాన్ని తగ్గించమని" },
  { n: 24, ar: "الرَّافِعُ",    name: "Ar-Rafi",      te: "అర్-రాఫి",           en: "The Exalter", mean: "హెచ్చించేవాడు", when: "గౌరవం కోరినప్పుడు" },
  { n: 25, ar: "الْمُعِزُّ",    name: "Al-Muizz",     te: "అల్-ముఇజ్జ్",        en: "The Honourer", mean: "గౌరవం ఇచ్చేవాడు", when: "అవమానం తర్వాత" },
  { n: 26, ar: "الْمُذِلُّ",    name: "Al-Mudhill",   te: "అల్-ముజిల్",         en: "The Dishonourer", mean: "అవమానం కలిగించేవాడు", when: "అహంకారుల ముందు" },
  { n: 27, ar: "السَّمِيعُ",    name: "As-Sami",      te: "అస్-సమీ",            en: "The All-Hearing", mean: "సర్వం వినేవాడు", when: "ఎవరూ వినని దుఃఖంలో" },
  { n: 28, ar: "الْبَصِيرُ",    name: "Al-Basir",     te: "అల్-బసీర్",          en: "The All-Seeing", mean: "సర్వం చూసేవాడు", when: "రహస్య బాధలో" },
  { n: 29, ar: "الْحَكَمُ",     name: "Al-Hakam",     te: "అల్-హకమ్",           en: "The Judge", mean: "తీర్పు ఇచ్చేవాడు", when: "న్యాయం కోరినప్పుడు" },
  { n: 30, ar: "الْعَدْلُ",     name: "Al-Adl",       te: "అల్-అద్ల్",          en: "The Just", mean: "పరమ న్యాయవంతుడు", when: "అన్యాయానికి గురైనప్పుడు" },
  { n: 31, ar: "اللَّطِيفُ",    name: "Al-Latif",     te: "అల్-లతీఫ్",          en: "The Subtle One", mean: "సూక్ష్మగ్రాహి, మృదువైనవాడు", when: "సున్నితమైన సహాయం కోసం" },
  { n: 32, ar: "الْخَبِيرُ",    name: "Al-Khabir",    te: "అల్-ఖబీర్",          en: "The All-Aware", mean: "అంతరంగం ఎరిగినవాడు", when: "ఎవరికీ తెలియని కష్టంలో" },
  { n: 33, ar: "الْحَلِيمُ",    name: "Al-Halim",     te: "అల్-హలీమ్",          en: "The Forbearing", mean: "సహనశీలుడు", when: "కోపం వచ్చినప్పుడు" },
  { n: 34, ar: "الْعَظِيمُ",    name: "Al-Azim",      te: "అల్-అజీమ్",          en: "The Magnificent", mean: "మహోన్నతుడు", when: "చిన్నగా అనిపించినప్పుడు" },
  { n: 35, ar: "الْغَفُورُ",    name: "Al-Ghafur",    te: "అల్-ఘఫూర్",          en: "The Forgiving", mean: "క్షమాశీలుడు", when: "క్షమాపణ కోరుతూ" },
  { n: 36, ar: "الشَّكُورُ",    name: "Ash-Shakur",   te: "అష్-షకూర్",          en: "The Appreciative", mean: "కృతజ్ఞతను మెచ్చేవాడు", when: "కృతజ్ఞత చెప్పేటప్పుడు" },
  { n: 37, ar: "الْعَلِيُّ",    name: "Al-Ali",       te: "అల్-అలీ",            en: "The Most High", mean: "అత్యున్నతుడు", when: "వినయం నేర్చుకుంటూ" },
  { n: 38, ar: "الْكَبِيرُ",    name: "Al-Kabir",     te: "అల్-కబీర్",          en: "The Most Great", mean: "అతి గొప్పవాడు", when: "భయం ఎక్కువైనప్పుడు" },
  { n: 39, ar: "الْحَفِيظُ",    name: "Al-Hafiz",     te: "అల్-హఫీజ్",          en: "The Preserver", mean: "కాపాడేవాడు", when: "ప్రయాణంలో" },
  { n: 40, ar: "الْمُقِيتُ",    name: "Al-Muqit",     te: "అల్-ముఖీత్",         en: "The Sustainer", mean: "పోషించేవాడు", when: "ఆహారం, ఆరోగ్యం కోసం" },
  { n: 41, ar: "الْحَسِيبُ",    name: "Al-Hasib",     te: "అల్-హసీబ్",          en: "The Reckoner", mean: "లెక్క తీసుకునేవాడు", when: "లెక్క గురించి ఆలోచించినప్పుడు" },
  { n: 42, ar: "الْجَلِيلُ",    name: "Al-Jalil",     te: "అల్-జలీల్",          en: "The Majestic", mean: "ఘనత కలవాడు", when: "గౌరవం ముందు" },
  { n: 43, ar: "الْكَرِيمُ",    name: "Al-Karim",     te: "అల్-కరీమ్",          en: "The Generous", mean: "ఉదారుడు", when: "అవసరం చెప్పుకునేటప్పుడు" },
  { n: 44, ar: "الرَّقِيبُ",    name: "Ar-Raqib",     te: "అర్-రఖీబ్",          en: "The Watchful", mean: "నిరంతరం గమనించేవాడు", when: "ఒంటరిగా ఉన్నప్పుడు" },
  { n: 45, ar: "الْمُجِيبُ",    name: "Al-Mujib",     te: "అల్-ముజీబ్",         en: "The Responsive", mean: "ప్రార్థనలకు జవాబిచ్చేవాడు", when: "దుఆ చేసిన తర్వాత" },
  { n: 46, ar: "الْوَاسِعُ",    name: "Al-Wasi",      te: "అల్-వాసి",           en: "The All-Encompassing", mean: "సర్వవ్యాప్తుడు", when: "ఇరుకుగా అనిపించినప్పుడు" },
  { n: 47, ar: "الْحَكِيمُ",    name: "Al-Hakim",     te: "అల్-హకీమ్",          en: "The Wise", mean: "వివేకవంతుడు", when: "నిర్ణయం తీసుకునేటప్పుడు" },
  { n: 48, ar: "الْوَدُودُ",    name: "Al-Wadud",     te: "అల్-వదూద్",          en: "The Loving", mean: "ప్రేమించేవాడు", when: "ప్రేమ కోరినప్పుడు" },
  { n: 49, ar: "الْمَجِيدُ",    name: "Al-Majid",     te: "అల్-మజీద్",          en: "The Glorious", mean: "మహిమాన్వితుడు", when: "మహిమను గుర్తు చేసుకుంటూ" },
  { n: 50, ar: "الْبَاعِثُ",    name: "Al-Baʿith",    te: "అల్-బాఇస్",          en: "The Resurrector", mean: "మృతులను లేపేవాడు", when: "మరణాన్ని గుర్తు చేసుకున్నప్పుడు" },
  { n: 51, ar: "الشَّهِيدُ",    name: "Ash-Shahid",   te: "అష్-షహీద్",          en: "The Witness", mean: "సర్వ సాక్షి", when: "సాక్ష్యం అవసరమైనప్పుడు" },
  { n: 52, ar: "الْحَقُّ",      name: "Al-Haqq",      te: "అల్-హఖ్",            en: "The Truth", mean: "పరమ సత్యం", when: "అబద్ధం చుట్టుముట్టినప్పుడు" },
  { n: 53, ar: "الْوَكِيلُ",    name: "Al-Wakil",     te: "అల్-వకీల్",          en: "The Trustee", mean: "భారం వహించేవాడు", when: "భారం మోయలేనప్పుడు" },
  { n: 54, ar: "الْقَوِيُّ",    name: "Al-Qawiyy",    te: "అల్-ఖవీ",            en: "The All-Strong", mean: "పరమ బలవంతుడు", when: "శక్తి కావాలన్నప్పుడు" },
  { n: 55, ar: "الْمَتِينُ",    name: "Al-Mateen",    te: "అల్-మతీన్",          en: "The Firm", mean: "స్థిరమైనవాడు", when: "స్థిరత్వం కోరినప్పుడు" },
  { n: 56, ar: "الْوَلِيُّ",    name: "Al-Waliyy",    te: "అల్-వలీ",            en: "The Protector", mean: "సన్నిహిత సహాయకుడు", when: "స్నేహితులు దూరమైనప్పుడు" },
  { n: 57, ar: "الْحَمِيدُ",    name: "Al-Hamid",     te: "అల్-హమీద్",          en: "The Praiseworthy", mean: "సర్వ స్తుతికి అర్హుడు", when: "స్తుతి చేస్తూ" },
  { n: 58, ar: "الْمُحْصِي",    name: "Al-Muhsi",     te: "అల్-ముహ్సీ",         en: "The Counter", mean: "అన్నిటినీ లెక్కించేవాడు", when: "లెక్కలేనన్ని అనుగ్రహాల ముందు" },
  { n: 59, ar: "الْمُبْدِئُ",   name: "Al-Mubdi",     te: "అల్-ముబ్దీ",         en: "The Originator", mean: "మొదట ఆరంభించేవాడు", when: "మళ్ళీ మొదలుపెట్టేటప్పుడు" },
  { n: 60, ar: "الْمُعِيدُ",    name: "Al-Mueid",     te: "అల్-ముఈద్",          en: "The Restorer", mean: "మళ్ళీ సృష్టించేవాడు", when: "కోల్పోయినది తిరిగి కోరుతూ" },
  { n: 61, ar: "الْمُحْيِي",    name: "Al-Muhyi",     te: "అల్-ముహ్యీ",         en: "The Giver of Life", mean: "జీవం ఇచ్చేవాడు", when: "ఆరోగ్యం కోసం" },
  { n: 62, ar: "الْمُمِيتُ",    name: "Al-Mumit",     te: "అల్-ముమీత్",         en: "The Taker of Life", mean: "మరణం ఇచ్చేవాడు", when: "మరణ భయంలో" },
  { n: 63, ar: "الْحَيُّ",      name: "Al-Hayy",      te: "అల్-హయ్",            en: "The Ever-Living", mean: "శాశ్వతంగా జీవించేవాడు", when: "జీవితం అర్థరహితంగా అనిపించినప్పుడు", ref: "2:255" },
  { n: 64, ar: "الْقَيُّومُ",   name: "Al-Qayyum",    te: "అల్-ఖయ్యూమ్",       en: "The Self-Sustaining", mean: "స్వయంభువుడు, సర్వాధారం", when: "ఆధారం లేనప్పుడు", ref: "2:255" },
  { n: 65, ar: "الْوَاجِدُ",    name: "Al-Wajid",     te: "అల్-వాజిద్",         en: "The Finder", mean: "కోరినది పొందేవాడు", when: "వెతుకుతున్నప్పుడు" },
  { n: 66, ar: "الْمَاجِدُ",    name: "Al-Maajid",     te: "అల్-మాజిద్",         en: "The Noble", mean: "ఘనుడు, ఉదాత్తుడు", when: "ఔదార్యం కోరుతూ" },
  { n: 67, ar: "الْوَاحِدُ",    name: "Al-Wahid",     te: "అల్-వాహిద్",         en: "The One", mean: "ఏకైకుడు", when: "ఏకత్వాన్ని ధ్యానిస్తూ", ref: "112:1" },
  { n: 68, ar: "الْأَحَدُ",     name: "Al-Ahad",      te: "అల్-అహద్",           en: "The Unique", mean: "అద్వితీయుడు", when: "తౌహీద్ ధ్యానంలో", ref: "112:1" },
  { n: 69, ar: "الصَّمَدُ",     name: "As-Samad",     te: "అస్-సమద్",           en: "The Eternal", mean: "అందరూ ఆశ్రయించేవాడు", when: "ఎవరూ లేనప్పుడు", ref: "112:2" },
  { n: 70, ar: "الْقَادِرُ",    name: "Al-Qadir",     te: "అల్-ఖాదిర్",         en: "The Capable", mean: "సమర్థుడు", when: "అసాధ్యం అనిపించినప్పుడు" },
  { n: 71, ar: "الْمُقْتَدِرُ", name: "Al-Muqtadir",  te: "అల్-ముఖ్తదిర్",     en: "The Powerful", mean: "సర్వ శక్తి కలవాడు", when: "పెద్ద పని ముందు" },
  { n: 72, ar: "الْمُقَدِّمُ",  name: "Al-Muqaddim",  te: "అల్-ముఖద్దిమ్",     en: "The Expediter", mean: "ముందుకు తెచ్చేవాడు", when: "అవకాశం కోరుతూ" },
  { n: 73, ar: "الْمُؤَخِّرُ",  name: "Al-Muakhkhir", te: "అల్-ముఆఖ్ఖిర్",     en: "The Delayer", mean: "వెనుకకు నెట్టేవాడు", when: "ఆలస్యం అనిపించినప్పుడు" },
  { n: 74, ar: "الْأَوَّلُ",    name: "Al-Awwal",     te: "అల్-అవ్వల్",         en: "The First", mean: "ఆదిమూలుడు", when: "ఆరంభాన్ని ధ్యానిస్తూ" },
  { n: 75, ar: "الْآخِرُ",      name: "Al-Akhir",     te: "అల్-ఆఖిర్",          en: "The Last", mean: "అంతిమమైనవాడు", when: "చివరిని గుర్తు చేసుకుంటూ" },
  { n: 76, ar: "الظَّاهِرُ",    name: "Az-Zahir",     te: "అజ్-జాహిర్",         en: "The Manifest", mean: "ప్రస్ఫుటమైనవాడు", when: "సాక్ష్యాలు చూసినప్పుడు" },
  { n: 77, ar: "الْبَاطِنُ",    name: "Al-Batin",     te: "అల్-బాతిన్",         en: "The Hidden", mean: "గోప్యమైనవాడు", when: "రహస్యాలు దాచినప్పుడు" },
  { n: 78, ar: "الْوَالِي",     name: "Al-Wali",      te: "అల్-వాలీ",           en: "The Governor", mean: "సర్వ పాలకుడు", when: "పాలన గురించి" },
  { n: 79, ar: "الْمُتَعَالِي", name: "Al-Mutaali",   te: "అల్-ముతాలీ",         en: "The Self-Exalted", mean: "అన్నిటికీ అతీతుడు", when: "ఉన్నతిని ధ్యానిస్తూ" },
  { n: 80, ar: "الْبَرُّ",      name: "Al-Barr",      te: "అల్-బర్ర్",          en: "The Source of Goodness", mean: "మేలుకు మూలం", when: "మేలు కోరుతూ" },
  { n: 81, ar: "التَّوَّابُ",   name: "At-Tawwab",    te: "అత్-తవ్వాబ్",        en: "The Accepter of Repentance", mean: "పశ్చాత్తాపాన్ని స్వీకరించేవాడు", when: "పశ్చాత్తాపంలో" },
  { n: 82, ar: "الْمُنْتَقِمُ", name: "Al-Muntaqim",  te: "అల్-ముంతఖిమ్",      en: "The Avenger", mean: "ప్రతీకారం తీర్చేవాడు", when: "అన్యాయం భరించలేనప్పుడు" },
  { n: 83, ar: "الْعَفُوُّ",    name: "Al-Afu",       te: "అల్-అఫువ్వ్",        en: "The Pardoner", mean: "పాపాలను తుడిచేవాడు", when: "క్షమాపణ వేడుకుంటూ" },
  { n: 84, ar: "الرَّؤُوفُ",    name: "Ar-Rauf",      te: "అర్-రఊఫ్",           en: "The Most Kind", mean: "అమిత దయగలవాడు", when: "దయ కోరుతూ" },
  { n: 85, ar: "مَالِكُ الْمُلْكِ", name: "Maalik-ul-Mulk", te: "మాలికుల్-ముల్క్", en: "Owner of all Sovereignty", mean: "సర్వ రాజ్యానికి యజమాని", when: "అధికారం గురించి ఆలోచిస్తూ" },
  { n: 86, ar: "ذُو الْجَلَالِ وَالْإِكْرَامِ", name: "Dhul-Jalali wal-Ikram",  te: "జుల్-జలాలి వల్-ఇక్రామ్",        en: "Lord of Majesty & Bounty", mean: "ఘనత, ఔదార్యం కలవాడు", when: "ఘనతను ధ్యానిస్తూ" },
  { n: 87, ar: "الْمُقْسِطُ",   name: "Al-Muqsit",    te: "అల్-ముఖ్సిత్",      en: "The Equitable", mean: "సమన్యాయం చేసేవాడు", when: "న్యాయం కోరుతూ" },
  { n: 88, ar: "الْجَامِعُ",    name: "Al-Jami",      te: "అల్-జామి",           en: "The Gatherer", mean: "అందరినీ సమీకరించేవాడు", when: "విడిపోయినవారి కోసం" },
  { n: 89, ar: "الْغَنِيُّ",    name: "Al-Ghani",     te: "అల్-ఘనీ",           en: "The Self-Sufficient", mean: "ఎవరిపైనా ఆధారపడనివాడు", when: "సంపద మోహంలో" },
  { n: 90, ar: "الْمُغْنِي",    name: "Al-Mughni",    te: "అల్-ముఘ్నీ",         en: "The Enricher", mean: "సంపన్నుడిగా చేసేవాడు", when: "అవసరంలో" },
  { n: 91, ar: "الْمَانِعُ",    name: "Al-Mani",      te: "అల్-మానీ",           en: "The Preventer", mean: "ఆపేవాడు", when: "హాని నుండి రక్షణకు" },
  { n: 92, ar: "الضَّارُّ",     name: "Ad-Darr",      te: "అద్-దార్ర్",         en: "The Distresser", mean: "కష్టాన్ని కలిగించగలవాడు", when: "కష్టాన్ని అర్థం చేసుకుంటూ" },
  { n: 93, ar: "النَّافِعُ",    name: "An-Nafi",      te: "అన్-నాఫి",           en: "The Propitious", mean: "మేలు చేకూర్చేవాడు", when: "మేలు కోరుతూ" },
  { n: 94, ar: "النُّورُ",      name: "An-Nur",       te: "అన్-నూర్",           en: "The Light", mean: "వెలుగు", when: "చీకటిలో" },
  { n: 95, ar: "الْهَادِي",     name: "Al-Hadi",      te: "అల్-హాదీ",           en: "The Guide", mean: "మార్గం చూపేవాడు", when: "దారి తప్పినప్పుడు" },
  { n: 96, ar: "الْبَدِيعُ",    name: "Al-Badi",      te: "అల్-బదీ",            en: "The Incomparable", mean: "సాటిలేని సృష్టికర్త", when: "సృష్టిని చూసినప్పుడు" },
  { n: 97, ar: "الْبَاقِي",     name: "Al-Baqi",      te: "అల్-బాఖీ",           en: "The Everlasting", mean: "శాశ్వతంగా నిలిచేవాడు", when: "నశ్వరతను గుర్తు చేసుకుంటూ" },
  { n: 98, ar: "الْوَارِثُ",    name: "Al-Warith",    te: "అల్-వారిస్",         en: "The Inheritor", mean: "అన్నిటికీ వారసుడు", when: "వారసత్వం గురించి" },
  { n: 99, ar: "الرَّشِيدُ",    name: "Ar-Rashid",    te: "అర్-రషీద్",          en: "The Guide to the Right Path", mean: "సన్మార్గం చూపేవాడు", when: "సరైన నిర్ణయం కోరుతూ" },
];

function NamesOfAllahPage() {
  const { lang } = useI18n();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<typeof names[0] | null>(null);

  /* One card per name: the Arabic to recall from, the meaning behind it. */
  const nameCards = useMemo<ReviewCard[]>(
    () =>
      names.map((n) => ({
        id: `name-${n.n}`,
        front: n.ar,
        back: lang === "te" ? n.mean : n.en,
        hint: n.name,
        frontClass: "font-arabic",
        frontLang: "ar",
      })),
    [lang],
  );

  const speak = useCallback((text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ar-SA"; u.rate = 0.65;
    window.speechSynthesis.speak(u);
  }, []);

  /* Folded on both sides, so a plain-keyboard الله finds اللَّهُ. */
  const q = foldSearch(query.trim());
  /* The Telugu meaning was not searchable, so a Telugu reader could see a
     name on screen and not find it by what it means. */
  const filtered = q
    ? names.filter(
        (n) =>
          foldSearch(n.name).includes(q) ||
          foldSearch(n.en).includes(q) ||
          n.te.includes(query.trim()) ||
          n.mean.includes(query.trim()) ||
          foldSearch(n.mean).includes(q) ||
          foldSearch(n.ar).includes(q),
      )
    : names;

  return (
    <PageShell>
      <PortalJump portal="names-of-allah" />

      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--if-green-mid)] to-[var(--if-green)] text-[var(--if-gold-pale)] py-20 px-4">
        <PortalWallpaper portal="names-of-allah" />
        <div className="mx-auto max-w-4xl text-center flex flex-col items-center gap-5">
          <BlurFade delay={0.05}>
            <Link href="/knowledge-center" className="inline-flex items-center min-h-11 gap-1 text-sm text-[var(--if-gold-pale)]/80 hover:text-[var(--if-gold-light)] transition-colors mb-2">
              <ChevronLeft className="h-4 w-4" />{copy.knowledge_center[lang]}
            </Link>
          </BlurFade>
          <BlurFade delay={0.1}>
            <span className="font-arabic text-4xl text-[var(--if-gold-light)]" dir="rtl">أسماء الله الحسنى</span>
          </BlurFade>
          <BlurFade delay={0.15}>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-[var(--if-gold-light)]">
              {copy.n_99_names_of_allah[lang]}
            </h1>
          </BlurFade>
          <BlurFade delay={0.2}>
            <p className="text-[var(--if-gold-pale)]/70 max-w-xl">
              {copy.al_asmaa_ul_husna_allah[lang]}
            </p>
          </BlurFade>
        </div>
      </section>

      {/* Search */}
      <section id="names" className="if-defer relative py-10 px-4 bg-[var(--if-cream-light)] scroll-mt-24">
        <div className="mx-auto max-w-5xl">
          {/* The portal's main content was the one section with no heading, so
              it did not appear in the outline a screen reader navigates by. */}
          <h2 className="mb-2 text-center font-display text-2xl font-bold text-[var(--if-green)] sm:text-3xl">
            {copy.n_99_names_of_allah[lang]}
          </h2>
          {/* Ninety-nine buttons with nothing past them: a keyboard user had
              to tab through every name to reach anything below the grid. */}
          {/* Parked off-screen with real dimensions rather than sr-only: a
              zero-height control trips the 24px target audit, and this is a
              real control the moment it takes focus. */}
          <a
            href="#review"
            className="absolute left-4 -top-96 z-20 inline-flex min-h-11 items-center rounded-full border border-[var(--if-gold)]/40 bg-white px-4 text-sm font-semibold text-[var(--if-gold-ink)] focus:top-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]"
          >
            {copy.skipNames[lang]}
          </a>
          <div className="relative max-w-sm mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--if-text-muted)]" />
            {/* type=search, 16px and 44px tall: at 14px iOS Safari zooms the
                page on focus, and at 42px it missed the tap-target floor. */}
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={copy.search_a_name[lang]}
              className="w-full min-h-11 pl-10 pr-4 py-2.5 rounded-full border border-[var(--if-gold)]/20 bg-white text-base text-[var(--if-text)] focus:outline-none focus:border-[var(--if-gold)]/60"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {filtered.map((name, i) => (
              <Fragment key={name.n}>
              <BlurFade delay={Math.min(0.02 * i, 0.4)}>
                <button
                  onClick={() => {
                    const closing = selected?.n === name.n;
                    setSelected(closing ? null : name);
                    /* Speaking on the way out made dismissing a card noisy. */
                    if (!closing) speak(name.ar);
                  }}
                  className={`relative overflow-hidden w-full text-center p-3 rounded-xl border transition-all ${selected?.n === name.n ? "bg-[var(--if-green)] border-[var(--if-gold)]/40" : "bg-white border-[var(--if-gold)]/20 hover:border-[var(--if-gold)]/40"}`}
                >
                  {selected?.n === name.n && <BorderBeam size={80} duration={5} colorFrom="#c8922a" colorTo="#e8b84b" />}
                  <div className={`text-[10px] font-bold mb-1 ${selected?.n === name.n ? "text-[var(--if-gold-light)]" : "text-[var(--if-text-muted)]"}`}>{name.n}</div>
                  <div className={`font-arabic text-xl leading-relaxed ${selected?.n === name.n ? "text-[var(--if-gold-light)]" : "text-[var(--if-green)]"}`} dir="rtl">{name.ar}</div>
                  <div className={`text-xs font-semibold mt-1 ${selected?.n === name.n ? "text-[var(--if-gold-pale)]" : "text-[var(--if-green)]"}`}>{lang === "te" ? name.te : name.name}</div>
                  {/* Every name carries a Telugu meaning, but the grid rendered
                      the English one unconditionally, so a Telugu reader got
                      ninety-nine English cards. */}
                  {/* Telugu conjuncts and vowel marks collapse below about 12px. */}
                  <div className={`text-xs mt-0.5 leading-snug ${selected?.n === name.n ? "text-[var(--if-gold-pale)]/85" : "text-[var(--if-text-muted)]"}`}>{lang === "te" ? name.mean : name.en}</div>
                </button>
              </BlurFade>
              {/* The detail opens inside the grid, right under the tapped
                  tile's row. A separate section below all ninety-nine cards
                  meant a long scroll away and back for every name — and a
                  detail that could outlive the search that hid its card. */}
              {selected?.n === name.n && (
              <div className="col-span-full">
            <BlurFade delay={0.05}>
              <div className="relative overflow-hidden bg-[var(--if-green)] rounded-2xl p-8 text-center text-[var(--if-gold-pale)] mx-auto max-w-md">
                <BorderBeam size={200} duration={8} colorFrom="#c8922a" colorTo="#e8b84b" />
                <div className="text-xs font-bold text-[var(--if-gold-light)] mb-2">#{selected.n}</div>
                <div className="font-arabic text-5xl text-[var(--if-gold-light)] mb-3 leading-relaxed" dir="rtl">{selected.ar}</div>
                <div className="font-display text-xl font-bold text-[var(--if-gold-light)] mb-1">{lang === "te" ? selected.te : selected.name}</div>
                {/* Reading language first, the other underneath: a learner
                    benefits from seeing both, but not from being led with the
                    one they did not ask for. */}
                <div className="text-sm text-[var(--if-gold-pale)]/80 mb-1">{lang === "te" ? selected.mean : selected.en}</div>
                <div className="text-sm text-[var(--if-gold-pale)]/70 mb-5">{lang === "te" ? selected.en : selected.mean}</div>
                {/* What the name is for, and where it sits in the Quran when
                    the place is beyond doubt. Names without a reference carry
                    none rather than a guessed one. */}
                <div className="mx-auto mb-5 flex max-w-xs flex-col gap-1.5 rounded-xl bg-black/15 px-4 py-3 text-sm">
                  <p className="text-[var(--if-gold-pale)]/85">
                    <span className="font-semibold text-[var(--if-gold-light)]">{copy.whenToSay[lang]}: </span>
                    {selected.when}
                  </p>
                  {selected.ref && (
                    <p className="text-[var(--if-gold-pale)]/70 tabular-nums">
                      <span className="font-semibold text-[var(--if-gold-light)]">{copy.inQuran[lang]}: </span>
                      {copy.surah[lang]} {selected.ref}
                    </p>
                  )}
                </div>
                <button onClick={() => speak(selected.ar)} className="inline-flex min-h-11 items-center gap-2 mx-auto px-4 rounded-full bg-[var(--if-gold)]/15 text-[var(--if-gold-light)] text-sm hover:bg-[var(--if-gold)]/25 transition-colors border border-[var(--if-gold)]/30">
                  <Volume2 className="h-4 w-4" />{copy.listen[lang]}
                </button>
              </div>
            </BlurFade>
              </div>
              )}
              </Fragment>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-[var(--if-text-muted)] mt-8">{copy.no_results_found[lang]}</p>
          )}
        </div>
      </section>

      {/* The grid teaches the names; these teach what to do with them. */}
      {/* Ninety-nine names is a memorisation task, and the grid only ever
          showed them. The same spaced-repetition deck the Arabic portal uses
          for letters and vocabulary schedules them here: names you stumble on
          come back sooner, names you know drop away. */}
      <section id="review" className="py-16 px-4 scroll-mt-24 bg-[var(--if-cream-light)]">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--if-green)] mb-2">
            {lang === "te" ? "కంఠస్థం చేయండి" : "Memorise them"}
          </h2>
          <p className="text-[var(--if-text-muted)] mb-6 text-pretty">
            {lang === "te"
              ? "పేరు చూసి అర్థం గుర్తుచేసుకోండి. కష్టమైనవి త్వరగా మళ్ళీ వస్తాయి."
              : "See the name, recall its meaning. The ones you find hard come back sooner."}
          </p>
          <ReviewDeck name="names-99" cards={nameCards} />
        </div>
      </section>

      {/* ── Simulator ── */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--if-green)] text-center mb-8">{lang === "te" ? "చూడండి" : "Watch"}</h2>
          <Simulator steps={namesSteps} scene={NamesScene} autoplay />
          {/* Learning the names is half; this is the doing half. */}
          <div className="mt-10">
            <Tasbih />
          </div>
        </div>
      </section>

      <LessonIndex portal="names-of-allah" />

    </PageShell>
  );
}

export default function NamesOfAllah() {
  return <NamesOfAllahPage />;
}
