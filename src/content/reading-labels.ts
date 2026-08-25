/* Telugu for the "Further reading" link labels.

   Lesson `reading` entries type their label as a bare string, so all 147 links
   across the 75 lesson pages rendered in English under a Telugu heading —
   the only untranslated body content left on the lesson route.

   A lookup keyed by the English label, rather than widening the type in 147
   places across the generated and authored lesson modules. An unmapped label
   falls back to English rather than breaking, and tests/reading.spec.ts fails
   the build when one is missing, so the fallback never ships silently. */

export const readingLabelTe: Record<string, string> = {
  // Quran
  "Learn Quran portal": "ఖురాన్ పోర్టల్",
  "How to begin reading": "పఠనం ఎలా ప్రారంభించాలి",
  "Arabic alphabet": "అరబిక్ వర్ణమాల",
  "Tajweed": "తజ్వీద్",
  "Tajweed Academy": "తజ్వీద్ అకాడమీ",
  "Harakat and vowels": "హరకాత్ మరియు అచ్చులు",
  "Understanding Quranic words": "ఖురాన్ పదాల అర్థం",
  "Roots and vocabulary": "మూలాలు మరియు పదజాలం",
  "Quranic Arabic": "ఖురాన్ అరబిక్",
  "Living with the Quran": "ఖురాన్‌తో జీవించడం",
  "Tajweed rules": "తజ్వీద్ నియమాలు",
  // Salah
  "Learn Salah portal": "నమాజ్ పోర్టల్",
  "Purity and wudu": "పరిశుద్ధత మరియు వుజూ",
  "Ghusl": "గుస్ల్",
  "Salah simulator": "నమాజ్ సిమ్యులేటర్",
  "The five daily prayers": "ఐదు పూటల నమాజులు",
  "Prayer times tool": "నమాజు సమయాల సాధనం",
  "How to pray": "నమాజ్ ఎలా చేయాలి",
  "Fixing common mistakes": "సాధారణ తప్పులను సరిదిద్దడం",
  "The night prayer": "రాత్రి నమాజ్ (తహజ్జుద్)",
  "Special Prayers portal": "ప్రత్యేక నమాజుల పోర్టల్",
  "Khushu": "ఖుషూ (ఏకాగ్రత)",
  // Seerah
  "Seerah portal": "సీరత్ పోర్టల్",
  "Beginning of revelation": "వహీ ప్రారంభం",
  "The Makkah period": "మక్కా కాలం",
  "Hijrah and Madinah": "హిజ్రత్ మరియు మదీనా",
  "Major events and battles": "ముఖ్య సంఘటనలు మరియు యుద్ధాలు",
  "Character and legacy": "స్వభావం మరియు వారసత్వం",
  "The companions": "సహాబా",
  "His character": "ఆయన స్వభావం",
  // History
  "Islamic History portal": "ఇస్లామిక్ చరిత్ర పోర్టల్",
  "The Rashidun Caliphate": "ఖిలాఫత్-ఇ-రాషిదా",
  "The Umayyad Caliphate": "ఉమయ్యద్ ఖిలాఫత్",
  "The Abbasid Golden Age": "అబ్బాసీ స్వర్ణయుగం",
  "Great Muslim scholars": "గొప్ప ముస్లిం విద్వాంసులు",
  "Islamic Spain": "ఇస్లామిక్ స్పెయిన్ (అల్-అందలుస్)",
  "The Colonial Era": "వలస పాలన కాలం",
  "The Ottoman Empire": "ఉస్మానీయ సామ్రాజ్యం",
  "The modern Muslim world": "ఆధునిక ముస్లిం ప్రపంచం",
  // Kids
  "Kids Islam portal": "పిల్లల ఇస్లాం పోర్టల్",
  "Good manners": "మంచి నడవడిక",
  "Daily duas": "రోజువారీ దుఆలు",
  "Prophet stories": "ప్రవక్తల కథలు",
  "Salah and Quran basics": "నమాజ్ మరియు ఖురాన్ మూలాలు",
  "Honesty and courage": "నిజాయితీ మరియు ధైర్యం",
  // Arabic
  "Learn Arabic portal": "అరబిక్ పోర్టల్",
  "Arabic alphabet with audio": "ఆడియోతో అరబిక్ వర్ణమాల",
  "The Arabic alphabet": "అరబిక్ వర్ణమాల",
  "Arabic vocabulary list": "అరబిక్ పదజాల జాబితా",
  "Everyday duas": "రోజువారీ దుఆలు",
  // Urdu
  "Learn Urdu portal": "ఉర్దూ పోర్టల్",
  "Urdu alphabet with audio": "ఆడియోతో ఉర్దూ వర్ణమాల",
  "The Urdu alphabet": "ఉర్దూ వర్ణమాల",
  "Reading basics": "పఠన మూలాలు",
  "Writing skills": "రాత నైపుణ్యాలు",
  "Everyday Urdu": "రోజువారీ ఉర్దూ",
  "Islamic Urdu": "ఇస్లామిక్ ఉర్దూ",
  // Hadith
  "Hadith portal": "హదీస్ పోర్టల్",
  "How hadith was checked": "హదీసులను ఎలా పరిశీలించారు",
  "The six collections": "ఆరు ప్రామాణిక గ్రంథాలు",
  "Living by hadith": "హదీసుల ప్రకారం జీవించడం",
  // Hajj
  "Hajj & Umrah portal": "హజ్ & ఉమ్రా పోర్టల్",
  "Islamic calendar — Dhu al-Hijjah": "ఇస్లామిక్ క్యాలెండర్ — జుల్‌హిజ్జా",
  "Why Hajj, and who it is due upon": "హజ్ ఎందుకు, ఎవరిపై విధి",
  "Ihram and the Miqat": "ఇహ్రామ్ మరియు మీఖాత్",
  "The three types of Hajj": "హజ్ మూడు రకాలు",
  "Tawaf and Sa'i": "తవాఫ్ మరియు సఈ",
  "The five days of Hajj": "హజ్ ఐదు రోజులు",
  // Names of Allah
  "99 Names portal": "99 నామాల పోర్టల్",
  "What the Beautiful Names are": "అస్మా-ఉల్-హుస్నా అంటే ఏమిటి",
  "The number ninety-nine": "తొంభై తొమ్మిది సంఖ్య",
  // Calendar
  "Islamic Calendar portal": "ఇస్లామిక్ క్యాలెండర్ పోర్టల్",
  "Islamic calendar": "ఇస్లామిక్ క్యాలెండర్",
  "How the Hijri calendar works": "హిజ్రీ క్యాలెండర్ ఎలా పనిచేస్తుంది",
  "Moon sighting and Eid dates": "చంద్ర దర్శనం మరియు ఈద్ తేదీలు",
  // Women's guidance
  "Women's Guidance portal": "మహిళల మార్గదర్శక పోర్టల్",
  "Women's guidance": "మహిళల మార్గదర్శనం",
  "Nikah: the contract and the mahr": "నికాహ్: ఒప్పందం మరియు మహర్",
};
