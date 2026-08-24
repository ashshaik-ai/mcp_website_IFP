/* Step data for the simulators. Minimal text by design: a label, the Arabic
   where there is something to say, one line of transliteration, and at most
   one short caption. The lessons explain; these show. */

import type { SimStep } from "@/components/sim/Simulator";

export const salahSteps: SimStep[] = [
  { id: "niyyah", label: { te: "నియ్యత్", en: "Niyyah" }, caption: { te: "ఖిబ్లా వైపు నిలబడి, మనసులో ఉద్దేశం", en: "Face the qibla; intend in the heart" }, dur: 2600 },
  { id: "takbeer", label: { te: "తక్బీర్", en: "Takbeer" }, arabic: "اللَّهُ أَكْبَر", translit: "Allāhu Akbar", dur: 2600 },
  { id: "qiyam", label: { te: "ఖియామ్ — సూరా ఫాతిహా", en: "Qiyam — Al-Fatiha" }, arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", translit: "Bismillāhir-Raḥmānir-Raḥīm", dur: 3600 },
  { id: "ruku", label: { te: "రుకూ", en: "Ruku" }, arabic: "سُبْحَانَ رَبِّيَ الْعَظِيم", translit: "Subḥāna Rabbiyal-ʿAẓīm", count: 3, dur: 3200 },
  { id: "itidal", label: { te: "ఇతిదాల్", en: "I'tidal" }, arabic: "سَمِعَ اللَّهُ لِمَنْ حَمِدَه", translit: "Samiʿallāhu liman ḥamidah", dur: 2800 },
  { id: "sujud1", label: { te: "సజ్దా", en: "Sujud" }, arabic: "سُبْحَانَ رَبِّيَ الأَعْلَى", translit: "Subḥāna Rabbiyal-Aʿlā", count: 3, dur: 3200 },
  { id: "jalsa", label: { te: "జల్సా", en: "Jalsa" }, arabic: "رَبِّ اغْفِرْ لِي", translit: "Rabbighfir lī", dur: 2400 },
  { id: "sujud2", label: { te: "రెండవ సజ్దా", en: "Second Sujud" }, arabic: "سُبْحَانَ رَبِّيَ الأَعْلَى", translit: "Subḥāna Rabbiyal-Aʿlā", count: 3, dur: 3200 },
  { id: "tashahhud", label: { te: "తషహ్హుద్", en: "Tashahhud" }, arabic: "التَّحِيَّاتُ لِلَّهِ", translit: "At-taḥiyyātu lillāh…", dur: 3600 },
  { id: "salam", label: { te: "సలాం — కుడి", en: "Salam — right" }, arabic: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّه", translit: "As-salāmu ʿalaykum wa raḥmatullāh", dur: 2400 },
  { id: "salam2", label: { te: "సలాం — ఎడమ", en: "Salam — left" }, arabic: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّه", translit: "As-salāmu ʿalaykum wa raḥmatullāh", dur: 2400 },
];

/* The funeral prayer, which is not the five-times prayer with parts removed:
   no ruku, no sujud, no adhan, four takbirs standing, each followed by its
   own recitation. The lesson teaches that structure and the visual used to
   contradict it by borrowing four steps out of salahSteps. */
export const janazahSteps: SimStep[] = [
  { id: "niyyah", label: { te: "నియ్యత్", en: "Niyyah" }, caption: { te: "మృతదేహం ముందు, ఇమామ్ వెనుక వరుసలు", en: "The body in front, rows behind the imam" }, dur: 2600 },
  { id: "takbeer", label: { te: "1వ తక్బీర్", en: "1st takbir" }, arabic: "اللَّهُ أَكْبَر", translit: "Allāhu Akbar", dur: 2400 },
  { id: "fatiha", label: { te: "సూరా ఫాతిహా", en: "Al-Fatihah" }, arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِين", translit: "Al-ḥamdu lillāhi rabbil-ʿālamīn", caption: { te: "హనఫీ మజ్‌హబ్‌లో ఇక్కడ సనా", en: "In the Hanafi school, the thana here" }, dur: 3600 },
  { id: "takbeer2", label: { te: "2వ తక్బీర్", en: "2nd takbir" }, arabic: "اللَّهُ أَكْبَر", translit: "Allāhu Akbar", dur: 2200 },
  { id: "durood", label: { te: "దురూద్", en: "Durood" }, arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّد", translit: "Allāhumma ṣalli ʿalā Muḥammad", caption: { te: "నమాజులో చదివేదే", en: "The same durood as in prayer" }, dur: 3200 },
  { id: "takbeer3", label: { te: "3వ తక్బీర్", en: "3rd takbir" }, arabic: "اللَّهُ أَكْبَر", translit: "Allāhu Akbar", dur: 2200 },
  { id: "dua", label: { te: "మృతుని కోసం దుఆ", en: "Dua for the deceased" }, arabic: "اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْه", translit: "Allāhumma-ghfir lahu warḥamh", caption: { te: "ఈ నమాజు మొత్తం ఇదే దుఆ కోసం", en: "This supplication is the whole point of the prayer" }, dur: 3600 },
  { id: "takbeer4", label: { te: "4వ తక్బీర్", en: "4th takbir" }, arabic: "اللَّهُ أَكْبَر", translit: "Allāhu Akbar", caption: { te: "కొద్దిసేపు ఆగండి", en: "Pause briefly" }, dur: 2400 },
  { id: "salam", label: { te: "సలాం — కుడి", en: "Salam — right" }, arabic: "السَّلَامُ عَلَيْكُم", translit: "As-salāmu ʿalaykum", dur: 2400 },
  { id: "salam2", label: { te: "సలాం — ఎడమ", en: "Salam — left" }, arabic: "السَّلَامُ عَلَيْكُم", translit: "As-salāmu ʿalaykum", dur: 2400 },
];

export const wuduSteps: SimStep[] = [
  { id: "niyyah", label: { te: "నియ్యత్", en: "Niyyah" }, caption: { te: "మనసులో ఉద్దేశం", en: "Intend in the heart" }, dur: 2200 },
  { id: "bismillah", label: { te: "బిస్మిల్లాహ్", en: "Bismillah" }, arabic: "بِسْمِ اللَّهِ", translit: "Bismillāh", dur: 2200 },
  { id: "hands", label: { te: "చేతులు", en: "Hands" }, count: 3, caption: { te: "మణికట్టు వరకు", en: "To the wrists" }, dur: 3000 },
  { id: "mouth", label: { te: "నోరు", en: "Mouth" }, count: 3, dur: 2800 },
  { id: "nose", label: { te: "ముక్కు", en: "Nose" }, count: 3, dur: 2800 },
  { id: "face", label: { te: "ముఖం", en: "Face" }, count: 3, caption: { te: "నుదుటి నుండి గడ్డం వరకు", en: "Hairline to chin, ear to ear" }, dur: 3000 },
  { id: "armR", label: { te: "కుడి చేయి", en: "Right arm" }, count: 3, caption: { te: "మోచేతి వరకు", en: "To the elbow" }, dur: 3000 },
  { id: "armL", label: { te: "ఎడమ చేయి", en: "Left arm" }, count: 3, caption: { te: "మోచేతి వరకు", en: "To the elbow" }, dur: 3000 },
  { id: "head", label: { te: "తల మసహ్", en: "Head — masah" }, count: 1, caption: { te: "తడి చేతులతో ఒకసారి", en: "Once, with wet hands" }, dur: 2800 },
  { id: "ears", label: { te: "చెవులు", en: "Ears" }, count: 1, dur: 2400 },
  { id: "footR", label: { te: "కుడి పాదం", en: "Right foot" }, count: 3, caption: { te: "చీలమండ వరకు", en: "To the ankle" }, dur: 3000 },
  { id: "footL", label: { te: "ఎడమ పాదం", en: "Left foot" }, count: 3, caption: { te: "చీలమండ వరకు", en: "To the ankle" }, dur: 3000 },
  { id: "dua", label: { te: "దుఆ", en: "Dua" }, arabic: "أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّه", translit: "Ashhadu an lā ilāha illallāh…", dur: 3400 },
];

export const seerahSteps: SimStep[] = [
  { id: "birth", label: { te: "జన్మ — మక్కా", en: "Birth — Makkah" }, caption: { te: "క్రీ.శ. 570", en: "570 CE" }, dur: 3000 },
  { id: "revelation", label: { te: "మొదటి వహీ — హిరా గుహ", en: "First revelation — Cave of Hira" }, arabic: "اقْرَأْ", translit: "Iqra", caption: { te: "క్రీ.శ. 610", en: "610 CE" }, dur: 3400 },
  { id: "makkah", label: { te: "మక్కా కాలం", en: "The Makkan years" }, caption: { te: "క్రీ.శ. 610–622", en: "610–622 CE" }, dur: 3000 },
  { id: "taif", label: { te: "తాయిఫ్ ప్రయాణం", en: "Journey to Ta'if" }, caption: { te: "క్రీ.శ. 619", en: "619 CE" }, dur: 3000 },
  { id: "hijrah", label: { te: "హిజ్రత్ — మదీనాకు", en: "Hijrah — to Madinah" }, caption: { te: "క్రీ.శ. 622", en: "622 CE" }, dur: 3800 },
  { id: "badr", label: { te: "బద్ర్", en: "Badr" }, caption: { te: "క్రీ.శ. 624", en: "624 CE" }, dur: 3000 },
  { id: "uhud", label: { te: "ఉహుద్", en: "Uhud" }, caption: { te: "క్రీ.శ. 625", en: "625 CE" }, dur: 3000 },
  { id: "hudaybiyyah", label: { te: "హుదైబియా ఒప్పందం", en: "Treaty of Hudaybiyyah" }, caption: { te: "క్రీ.శ. 628", en: "628 CE" }, dur: 3000 },
  { id: "conquest", label: { te: "మక్కా విజయం", en: "Conquest of Makkah" }, caption: { te: "క్రీ.శ. 630", en: "630 CE" }, dur: 3200 },
  { id: "farewell", label: { te: "విదాయ్ హజ్", en: "Farewell Hajj" }, caption: { te: "క్రీ.శ. 632", en: "632 CE" }, dur: 3000 },
  { id: "legacy", label: { te: "వారసత్వం — మదీనా", en: "Legacy — Madinah" }, caption: { te: "క్రీ.శ. 632", en: "632 CE" }, dur: 3000 },
];

export const hajjSteps: SimStep[] = [
  { id: "ihram", label: { te: "ఇహ్రామ్", en: "Ihram" }, arabic: "لَبَّيْكَ اللَّهُمَّ لَبَّيْك", translit: "Labbayk Allāhumma labbayk", caption: { te: "ఇహ్రామ్ (2 తెల్లని వస్త్రాలు) ధరించి తల్బియా చదవండి", en: "Wear ihram — two white cloths — and begin the Talbiyah" }, dur: 3200 },
  { id: "tawaf", label: { te: "తవాఫ్", en: "Tawaf" }, count: 7, caption: { te: "కాబా చుట్టూ అపసవ్య దిశలో", en: "Anticlockwise around the Kaaba" }, dur: 4200 },
  { id: "sai", label: { te: "సఈ", en: "Sa'i" }, count: 7, caption: { te: "సఫా నుండి మర్వా వరకు", en: "Safa to Marwa and back" }, dur: 4200 },
  { id: "mina", label: { te: "మినా", en: "Mina" }, caption: { te: "జుల్‌హిజ్జా 8 — మినాలో ఆ రోజు గడపండి", en: "8 Dhu al-Hijjah — spend the day at Mina" }, dur: 2800 },
  { id: "arafah", label: { te: "అరఫా", en: "Arafah" }, caption: { te: "జుల్‌హిజ్జా 9 — మధ్యాహ్నం నుండి సూర్యాస్తమయం వరకు నిలబడటం; దుఆ, జిక్ర్, తౌబా", en: "9 Dhu al-Hijjah — stand from noon to sunset: dua, dhikr, repentance" }, dur: 3400 },
  { id: "muzdalifah", label: { te: "ముజ్దలిఫా", en: "Muzdalifah" }, caption: { te: "మగ్రిబ్ + ఇషా కలిపి, రాత్రి బస, 70 గులకరాళ్ళు సేకరించడం", en: "Combine Maghrib and Isha, rest the night, gather seventy pebbles" }, dur: 3200 },
  { id: "rami", label: { te: "రమీ", en: "Rami" }, count: 7, caption: { te: "పెద్ద జమరా వద్ద 7 గులకరాళ్ళు", en: "Seven pebbles at the largest Jamarat" }, dur: 3600 },
  { id: "sacrifice", label: { te: "ఖుర్బానీ", en: "Sacrifice" }, caption: { te: "జుల్‌హిజ్జా 10 — జంతువును ఖుర్బానీ చేయడం", en: "10 Dhu al-Hijjah — an animal is sacrificed" }, dur: 2600 },
  { id: "halq", label: { te: "హల్ఖ్ / తఖ్సీర్", en: "Halq / Taqsir" }, caption: { te: "తల గొరిగించడం లేదా జుట్టు కత్తిరించడం — తరువాత ఇహ్రామ్ తీసివేయవచ్చు", en: "Shave or cut the hair; ihram may then be removed" }, dur: 2400 },
  { id: "tawaf-ifadah", label: { te: "తవాఫ్ అల్-ఇఫాదా", en: "Tawaf al-Ifadah" }, count: 7, caption: { te: "జుల్‌హిజ్జా 10–12 — తవాఫ్, సఈ, ప్రతిరోజూ మూడు జమరాత్‌లకు రమీ", en: "10–12 Dhu al-Hijjah — tawaf, sa’i, and stoning all three Jamarat daily" }, dur: 3600 },
  { id: "tawaf-wida", label: { te: "విదాయ్ తవాఫ్", en: "Farewell Tawaf" }, count: 7, caption: { te: "బయలుదేరే ముందు చివరి తవాఫ్ — హజ్ పూర్తయింది", en: "The last tawaf before leaving — the Hajj is complete" }, dur: 3400 },
];

export const umrahSteps: SimStep[] = [
  hajjSteps[0],
  hajjSteps[1],
  hajjSteps[2],
  hajjSteps[8],
];

export const tajweedSteps: SimStep[] = [
  { id: "w0", label: { te: "బిస్మి", en: "Bismi" }, arabic: "بِسْمِ", translit: "Bismi", dur: 2400 },
  { id: "w1", label: { te: "అల్లాహ్ — లఫ్జ్ అల్-జలాలా", en: "Allah — Lafz al-Jalalah" }, arabic: "اللَّهِ", translit: "llāhi", caption: { te: "లామ్ మందంగా (తఫ్ఖీమ్)", en: "The lām is heavy (tafkhīm)" }, dur: 3000 },
  { id: "w2", label: { te: "అర్-రహ్మాన్ — మద్", en: "Ar-Rahman — Madd" }, arabic: "الرَّحْمَٰنِ", translit: "r-Raḥmāni", caption: { te: "అలిఫ్‌ను రెండు హరకాత్ పొడిగించండి", en: "Stretch the alif two counts" }, dur: 3000 },
  { id: "w3", label: { te: "అర్-రహీమ్ — మద్", en: "Ar-Raheem — Madd" }, arabic: "الرَّحِيمِ", translit: "r-Raḥīm", caption: { te: "ఆగేటప్పుడు యా పొడిగించండి", en: "Stretch the yā when stopping" }, dur: 3000 },
  { id: "all", label: { te: "పూర్తి ఆయత్", en: "The whole ayah" }, arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", translit: "Bismillāhir-Raḥmānir-Raḥīm", dur: 3600 },
];

/* The chain for the first hadith in Sahih al-Bukhari, "actions are by
   intentions". Step index is how far down the chain we have followed. */
export const isnadSteps: SimStep[] = [
  { id: "c0", label: { te: "ప్రవక్త ﷺ చెప్పారు", en: "The Prophet ﷺ said" }, arabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ", translit: "Innamal-aʿmālu bin-niyyāt", dur: 3200 },
  { id: "c1", label: { te: "ఉమర్ రజి. విన్నారు", en: "Umar heard it" }, caption: { te: "సహాబీ", en: "Companion" }, dur: 2200 },
  { id: "c2", label: { te: "అల్ఖమా", en: "Alqamah" }, caption: { te: "తాబిఈ", en: "Successor" }, dur: 2000 },
  { id: "c3", label: { te: "ముహమ్మద్ ఇబ్న్ ఇబ్రాహీమ్", en: "Muhammad ibn Ibrahim" }, dur: 2000 },
  { id: "c4", label: { te: "యహ్యా ఇబ్న్ సఈద్", en: "Yahya ibn Sa'id" }, dur: 2000 },
  { id: "c5", label: { te: "సుఫ్యాన్", en: "Sufyan" }, dur: 2000 },
  { id: "c6", label: { te: "అల్-హుమైదీ", en: "Al-Humaydi" }, dur: 2000 },
  { id: "c7", label: { te: "ఇమామ్ బుఖారీ రాశారు", en: "Imam al-Bukhari wrote it down" }, arabic: "صحيح البخاري", translit: "Sahih al-Bukhari, hadith 1", caption: { te: "క్రీ.శ. 846", en: "846 CE" }, dur: 3400 },
];

export const moonSteps: SimStep[] = [
  { id: "new", label: { te: "అమావాస్య", en: "New moon" }, caption: { te: "నెల మొదలు — చంద్రదర్శనం", en: "The month begins — moon sighting" }, dur: 2800 },
  { id: "crescent", label: { te: "హిలాల్", en: "Hilal — the crescent" }, arabic: "الهلال", translit: "al-hilāl", dur: 2800 },
  { id: "first-quarter", label: { te: "మొదటి పాదం", en: "First quarter" }, caption: { te: "7వ రోజు", en: "Day 7" }, dur: 2400 },
  { id: "full", label: { te: "పౌర్ణమి", en: "Full moon" }, caption: { te: "14వ రోజు — అయ్యామ్ అల్-బీద్", en: "Day 14 — the white days" }, dur: 2800 },
  { id: "last-quarter", label: { te: "చివరి పాదం", en: "Last quarter" }, caption: { te: "21వ రోజు", en: "Day 21" }, dur: 2400 },
  { id: "old", label: { te: "క్షీణ చంద్రుడు", en: "Waning crescent" }, caption: { te: "29–30 రోజులు", en: "29 or 30 days" }, dur: 2400 },
  { id: "month9", label: { te: "రమజాన్", en: "Ramadan" }, arabic: "رمضان", caption: { te: "9వ నెల", en: "The 9th month" }, dur: 2800 },
  { id: "month12", label: { te: "జుల్‌హిజ్జా", en: "Dhu al-Hijjah" }, arabic: "ذو الحجة", caption: { te: "12వ నెల — హజ్", en: "The 12th month — Hajj" }, dur: 2800 },
];

/* Letters: the id is the glyph; meta carries the four positional forms
   (isolated initial medial final); arabic "ur" flags the Urdu face. */
const ar = (g: string, te: string, en: string, forms: string): SimStep => ({ id: g, label: { te, en }, meta: forms, dur: 2600 });
export const arabicLetterSteps: SimStep[] = [
  ar("ا", "అలిఫ్", "Alif", "ا ا ـا ـا"),
  ar("ب", "బా", "Ba", "ب بـ ـبـ ـب"),
  ar("ت", "తా", "Ta", "ت تـ ـتـ ـت"),
  ar("ج", "జీమ్", "Jeem", "ج جـ ـجـ ـج"),
  ar("ح", "హా", "Ha", "ح حـ ـحـ ـح"),
  ar("د", "దాల్", "Dal", "د د ـد ـد"),
  ar("ر", "రా", "Ra", "ر ر ـر ـر"),
  ar("س", "సీన్", "Seen", "س سـ ـسـ ـس"),
  ar("ع", "ఐన్", "Ain", "ع عـ ـعـ ـع"),
  ar("ق", "ఖాఫ్", "Qaf", "ق قـ ـقـ ـق"),
  ar("م", "మీమ్", "Meem", "م مـ ـمـ ـم"),
  ar("ي", "యా", "Ya", "ي يـ ـيـ ـي"),
];
const ur = (g: string, te: string, en: string, forms: string): SimStep => ({ id: g, label: { te, en }, meta: forms + " ur", dur: 2600 });
export const urduLetterSteps: SimStep[] = [
  ur("ا", "అలిఫ్", "Alif", "ا ا ـا ـا"),
  ur("ب", "బే", "Be", "ب بـ ـبـ ـب"),
  ur("پ", "పే", "Pe", "پ پـ ـپـ ـپ"),
  ur("ٹ", "టే", "Te", "ٹ ٹـ ـٹـ ـٹ"),
  ur("چ", "చే", "Che", "چ چـ ـچـ ـچ"),
  ur("ڈ", "డాల్", "Dal", "ڈ ڈ ـڈ ـڈ"),
  ur("ڑ", "ఱే", "Rre", "ڑ ڑ ـڑ ـڑ"),
  ur("ک", "కాఫ్", "Kaf", "ک کـ ـکـ ـک"),
  ur("گ", "గాఫ్", "Gaf", "گ گـ ـگـ ـگ"),
  ur("ں", "నూన్ గున్నా", "Noon ghunna", "ں ں ـں ـں"),
  ur("ہ", "హే", "He", "ہ ہـ ـہـ ـہ"),
  ur("ے", "బడీ యే", "Bari ye", "ے ے ـے ـے"),
];

export const ghuslSteps: SimStep[] = [
  { id: "g-niyyah", label: { te: "నియ్యత్", en: "Niyyah" }, caption: { te: "పెద్ద అపవిత్రత నుండి శుద్ధి కావాలనే ఉద్దేశం", en: "Intend to purify from major impurity" }, dur: 2400 },
  { id: "g-hands", label: { te: "చేతులు", en: "Hands" }, count: 3, dur: 2600 },
  { id: "g-wudu", label: { te: "వుజూ", en: "Wudu" }, caption: { te: "నమాజ్ వుజూ లాగే", en: "As for prayer" }, dur: 3200 },
  { id: "g-head", label: { te: "తలపై నీరు", en: "Water over the head" }, count: 3, caption: { te: "జుట్టు మూలాల వరకు", en: "To the roots of the hair" }, dur: 3000 },
  { id: "g-right", label: { te: "కుడి వైపు", en: "Right side" }, caption: { te: "భుజం నుండి పాదం వరకు", en: "Shoulder to foot" }, dur: 3000 },
  { id: "g-left", label: { te: "ఎడమ వైపు", en: "Left side" }, caption: { te: "భుజం నుండి పాదం వరకు", en: "Shoulder to foot" }, dur: 3000 },
  { id: "g-all", label: { te: "పూర్తి శరీరం", en: "The whole body" }, caption: { te: "ఏ భాగం పొడిగా మిగలకూడదు", en: "No part left dry" }, dur: 3400 },
];

export const historySteps: SimStep[] = [
  { id: "rashidun", label: { te: "ఖులఫా-ఇ-రాషిదీన్", en: "The Rightly Guided Caliphs" }, arabic: "الخلفاء الراشدون", caption: { te: "క్రీ.శ. 632–661", en: "632–661 CE" }, dur: 3400 },
  { id: "umayyad", label: { te: "ఉమయ్యద్ ఖిలాఫత్ — డమాస్కస్", en: "The Umayyads — Damascus" }, arabic: "الأمويون", caption: { te: "క్రీ.శ. 661–750", en: "661–750 CE" }, dur: 3400 },
  { id: "abbasid", label: { te: "అబ్బాసీ స్వర్ణయుగం — బగ్దాద్", en: "The Abbasid golden age — Baghdad" }, arabic: "العباسيون", caption: { te: "క్రీ.శ. 750–1258", en: "750–1258 CE" }, dur: 3400 },
  { id: "andalus", label: { te: "అల్-అందలుస్ — కొర్డోబా", en: "Al-Andalus — Córdoba" }, arabic: "الأندلس", caption: { te: "క్రీ.శ. 711–1492", en: "711–1492 CE" }, dur: 3200 },
  { id: "ottoman", label: { te: "ఉస్మానియా సామ్రాజ్యం — ఇస్తాంబుల్", en: "The Ottomans — Istanbul" }, arabic: "العثمانيون", caption: { te: "క్రీ.శ. 1299–1924", en: "1299–1924 CE" }, dur: 3400 },
  { id: "mughal", label: { te: "మొఘల్ సామ్రాజ్యం — ఢిల్లీ", en: "The Mughals — Delhi" }, arabic: "المغول", caption: { te: "క్రీ.శ. 1526–1857", en: "1526–1857 CE" }, dur: 3200 },
  { id: "colonial", label: { te: "వలస పాలన", en: "The colonial era" }, caption: { te: "18–20 శతాబ్దాలు", en: "18th–20th centuries" }, dur: 3000 },
  { id: "modern", label: { te: "ఆధునిక ముస్లిం ప్రపంచం", en: "The modern Muslim world" }, caption: { te: "57 దేశాలు · 200 కోట్ల మంది", en: "57 nations · 2 billion people" }, dur: 3600 },
];

export const namesSteps: SimStep[] = [
  { id: "n1", meta: "1", label: { te: "అల్లాహ్", en: "Allah" }, arabic: "اللّٰه", translit: "Allāh", caption: { te: "ఒకే నిజమైన దేవుడు", en: "The one true God" }, dur: 3200 },
  { id: "n2", meta: "2", label: { te: "అర్-రహ్మాన్", en: "Ar-Rahman" }, arabic: "الرَّحْمَٰن", translit: "Ar-Raḥmān", caption: { te: "అత్యంత కరుణామయుడు", en: "The Most Merciful" }, dur: 3000 },
  { id: "n3", meta: "3", label: { te: "అర్-రహీమ్", en: "Ar-Raheem" }, arabic: "الرَّحِيم", translit: "Ar-Raḥīm", caption: { te: "అత్యంత దయగలవాడు", en: "The Especially Merciful" }, dur: 3000 },
  { id: "n4", meta: "4", label: { te: "అల్-మలిక్", en: "Al-Malik" }, arabic: "الْمَلِك", translit: "Al-Malik", caption: { te: "రాజు", en: "The King" }, dur: 3000 },
  { id: "n5", meta: "5", label: { te: "అల్-ఖుద్దూస్", en: "Al-Quddus" }, arabic: "الْقُدُّوس", translit: "Al-Quddūs", caption: { te: "పరమ పవిత్రుడు", en: "The Most Holy" }, dur: 3000 },
  { id: "n6", meta: "6", label: { te: "అస్-సలాం", en: "As-Salam" }, arabic: "السَّلَام", translit: "As-Salām", caption: { te: "శాంతి మూలం", en: "The Source of Peace" }, dur: 3000 },
  { id: "n7", meta: "7", label: { te: "అల్-ముఅమిన్", en: "Al-Mumin" }, arabic: "الْمُؤْمِن", translit: "Al-Muʾmin", caption: { te: "భద్రత ఇచ్చేవాడు", en: "The Giver of Security" }, dur: 3000 },
  { id: "n8", meta: "9", label: { te: "అల్-అజీజ్", en: "Al-Aziz" }, arabic: "الْعَزِيز", translit: "Al-ʿAzīz", caption: { te: "సర్వశక్తిమంతుడు", en: "The Almighty" }, dur: 3000 },
  { id: "n9", meta: "12", label: { te: "అల్-ఖాలిఖ్", en: "Al-Khaliq" }, arabic: "الْخَالِق", translit: "Al-Khāliq", caption: { te: "సృష్టికర్త", en: "The Creator" }, dur: 3000 },
  { id: "n10", meta: "15", label: { te: "అల్-గఫ్ఫార్", en: "Al-Ghaffar" }, arabic: "الْغَفَّار", translit: "Al-Ghaffār", caption: { te: "మళ్ళీ మళ్ళీ క్షమించేవాడు", en: "The Ever-Forgiving" }, dur: 3000 },
  { id: "n11", meta: "18", label: { te: "అర్-రజ్జాఖ్", en: "Ar-Razzaq" }, arabic: "الرَّزَّاق", translit: "Ar-Razzāq", caption: { te: "ఉపాధి ఇచ్చేవాడు", en: "The Provider" }, dur: 3000 },
  { id: "n12", meta: "20", label: { te: "అల్-అలీమ్", en: "Al-Alim" }, arabic: "الْعَلِيم", translit: "Al-ʿAlīm", caption: { te: "సర్వజ్ఞుడు", en: "The All-Knowing" }, dur: 3000 },
];
