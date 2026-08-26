/* Build the Quran into static files the site can serve.

   Run by hand, not in prebuild: it fetches ~7 MB over the network and the
   result never changes. `npm run quran:build`.

   WHAT IT WRITES

   public/quran/001.json .. 114.json
     One file per surah: Indo-Pak Arabic, phonetic transliteration, Telugu.
     Fetched when a reader opens that surah, so nobody downloads the whole
     Quran to read Al-Ikhlas.

   public/quran/001-uthmani.json .. 114-uthmani.json
     The Uthmani script, in its own file. Kept separate on purpose: it is a
     toggle most of this audience will never touch, and putting it in the main
     file would make every reader pay for it.

   src/content/quran-index.ts
     Metadata for all 114 -- names, ayah counts, where revealed. Small enough
     to bundle, and the surah list needs it before any surah is opened.

   WHY INDO-PAK IS THE DEFAULT

   Quran.com and most apps serve Uthmani. South Asia learns from the Indo-Pak
   mushaf, and the two differ exactly where a beginner is most fragile:
   Uthmani ٱلرَّحۡمَٰنِ against Indo-Pak الرَّحۡمٰنِ. Someone taught from an
   Indo-Pak Qaida who is shown Uthmani does not see a font change, they see
   letters they were never taught.

   LICENCE

   Tanzil's text is CC-BY-ND: verbatim copies with attribution, no changes.
   This script must never "clean up" the Arabic -- not a stray space, not a
   normalised alif. It copies bytes and records where they came from, and the
   reader shows the attribution. */

import { mkdirSync, writeFileSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const CDN = "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1";
const CACHE = join("node_modules", ".cache", "quran");
const OUT = join("public", "quran");

const EDITIONS = {
  indopak: "ara-quranindopak",
  uthmani: "ara-quranuthmanihaf",
  translit: "ara-quranphoneticst",
  telugu: "tel-abdulraheemmoha",
};

const SOURCES = {
  arabic: "Tanzil.net / King Fahad Quran Complex (CC BY-ND)",
  telugu: "Abdul Raheem Mohammad Moulana",
  translit: "Quran phonetic transliteration",
};

async function grab(name, url) {
  const cached = join(CACHE, `${name}.json`);
  if (existsSync(cached)) {
    process.stdout.write(`  ${name}: cached\n`);
    return JSON.parse(readFileSync(cached, "utf8"));
  }
  process.stdout.write(`  ${name}: fetching…`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${name}: HTTP ${res.status}`);
  const json = await res.json();
  mkdirSync(CACHE, { recursive: true });
  writeFileSync(cached, JSON.stringify(json));
  process.stdout.write(` ${Math.round(JSON.stringify(json).length / 1024)} KB\n`);
  return json;
}

/* Telugu spellings for the surah names.

   Transliterated from the Arabic rather than translated: a Telugu reader
   looking for سورة البقرة is looking for "అల్-బఖరా", the sound, not "the
   cow". The well-known ones are spelled the way the portal already spells
   them, so the new list and the old pages agree. */
const TE_NAMES = {
  1: "అల్-ఫాతిహా", 2: "అల్-బఖరా", 3: "ఆల్-ఇమ్రాన్", 4: "అన్-నిసా", 5: "అల్-మాయిదా",
  6: "అల్-అన్ఆమ్", 7: "అల్-అఅరాఫ్", 8: "అల్-అన్ఫాల్", 9: "అత్-తౌబా", 10: "యూనుస్",
  11: "హూద్", 12: "యూసుఫ్", 13: "అర్-రఅద్", 14: "ఇబ్రాహీమ్", 15: "అల్-హిజ్ర్",
  16: "అన్-నహ్ల్", 17: "అల్-ఇస్రా", 18: "అల్-కహ్ఫ్", 19: "మర్యమ్", 20: "తా-హా",
  21: "అల్-అంబియా", 22: "అల్-హజ్", 23: "అల్-మూమినూన్", 24: "అన్-నూర్", 25: "అల్-ఫుర్ఖాన్",
  26: "అష్-షుఅరా", 27: "అన్-నమ్ల్", 28: "అల్-ఖసస్", 29: "అల్-అన్కబూత్", 30: "అర్-రూమ్",
  31: "లుఖ్మాన్", 32: "అస్-సజ్దా", 33: "అల్-అహ్జాబ్", 34: "సబా", 35: "ఫాతిర్",
  36: "యాసీన్", 37: "అస్-సాఫ్ఫాత్", 38: "సాద్", 39: "అజ్-జుమర్", 40: "ఘాఫిర్",
  41: "ఫుస్సిలత్", 42: "అష్-షూరా", 43: "అజ్-జుఖ్రుఫ్", 44: "అద్-దుఖాన్", 45: "అల్-జాసియా",
  46: "అల్-అహ్ఖాఫ్", 47: "ముహమ్మద్", 48: "అల్-ఫత్హ్", 49: "అల్-హుజురాత్", 50: "ఖాఫ్",
  51: "అజ్-జారియాత్", 52: "అత్-తూర్", 53: "అన్-నజ్మ్", 54: "అల్-ఖమర్", 55: "అర్-రహ్మాన్",
  56: "అల్-వాఖియా", 57: "అల్-హదీద్", 58: "అల్-ముజాదిలా", 59: "అల్-హష్ర్", 60: "అల్-ముమ్తహినా",
  61: "అస్-సఫ్", 62: "అల్-జుముఆ", 63: "అల్-మునాఫిఖూన్", 64: "అత్-తగాబున్", 65: "అత్-తలాఖ్",
  66: "అత్-తహ్రీమ్", 67: "అల్-ముల్క్", 68: "అల్-ఖలమ్", 69: "అల్-హాఖ్ఖా", 70: "అల్-మఆరిజ్",
  71: "నూహ్", 72: "అల్-జిన్న్", 73: "అల్-ముజ్జమ్మిల్", 74: "అల్-ముద్దస్సిర్", 75: "అల్-ఖియామా",
  76: "అల్-ఇన్సాన్", 77: "అల్-ముర్సలాత్", 78: "అన్-నబా", 79: "అన్-నాజిఆత్", 80: "అబస",
  81: "అత్-తక్వీర్", 82: "అల్-ఇన్ఫితార్", 83: "అల్-ముతఫ్ఫిఫీన్", 84: "అల్-ఇన్షిఖాఖ్", 85: "అల్-బురూజ్",
  86: "అత్-తారిఖ్", 87: "అల్-అఅలా", 88: "అల్-గాషియా", 89: "అల్-ఫజ్ర్", 90: "అల్-బలద్",
  91: "అష్-షమ్స్", 92: "అల్-లైల్", 93: "అద్-దుహా", 94: "అష్-షర్హ్", 95: "అత్-తీన్",
  96: "అల్-అలఖ్", 97: "అల్-ఖద్ర్", 98: "అల్-బయ్యినా", 99: "అజ్-జల్జలా", 100: "అల్-ఆదియాత్",
  101: "అల్-ఖారిఆ", 102: "అత్-తకాసుర్", 103: "అల్-అస్ర్", 104: "అల్-హుమజా", 105: "అల్-ఫీల్",
  106: "ఖురైష్", 107: "అల్-మాఊన్", 108: "అల్-కౌసర్", 109: "అల్-కాఫిరూన్", 110: "అన్-నస్ర్",
  111: "అల్-మసద్", 112: "అల్-ఇఖ్లాస్", 113: "అల్-ఫలఖ్", 114: "అన్-నాస్",
};

/* English surah names in the spelling this site already uses.

   The source data transliterates with doubled long vowels -- Al-Faatiha,
   Al-Ikhlaas, An-Naas -- and the portal's own pages say Al-Fatihah, Al-Ikhlas,
   An-Nas. Two spellings of one surah on one site is the kind of small
   inconsistency that makes a reader wonder which page to trust, and the name
   is how people find a surah at all. All 114 are listed rather than the three
   that happen to collide today, so a page added later cannot reintroduce it. */
const EN_NAMES = {
  1: "Al-Fatihah", 2: "Al-Baqarah", 3: "Aal-Imran", 4: "An-Nisa", 5: "Al-Ma'idah",
  6: "Al-An'am", 7: "Al-A'raf", 8: "Al-Anfal", 9: "At-Tawbah", 10: "Yunus",
  11: "Hud", 12: "Yusuf", 13: "Ar-Ra'd", 14: "Ibrahim", 15: "Al-Hijr",
  16: "An-Nahl", 17: "Al-Isra", 18: "Al-Kahf", 19: "Maryam", 20: "Ta-Ha",
  21: "Al-Anbiya", 22: "Al-Hajj", 23: "Al-Mu'minun", 24: "An-Nur", 25: "Al-Furqan",
  26: "Ash-Shu'ara", 27: "An-Naml", 28: "Al-Qasas", 29: "Al-Ankabut", 30: "Ar-Rum",
  31: "Luqman", 32: "As-Sajdah", 33: "Al-Ahzab", 34: "Saba", 35: "Fatir",
  36: "Ya-Sin", 37: "As-Saffat", 38: "Sad", 39: "Az-Zumar", 40: "Ghafir",
  41: "Fussilat", 42: "Ash-Shura", 43: "Az-Zukhruf", 44: "Ad-Dukhan", 45: "Al-Jathiyah",
  46: "Al-Ahqaf", 47: "Muhammad", 48: "Al-Fath", 49: "Al-Hujurat", 50: "Qaf",
  51: "Adh-Dhariyat", 52: "At-Tur", 53: "An-Najm", 54: "Al-Qamar", 55: "Ar-Rahman",
  56: "Al-Waqi'ah", 57: "Al-Hadid", 58: "Al-Mujadilah", 59: "Al-Hashr", 60: "Al-Mumtahanah",
  61: "As-Saff", 62: "Al-Jumu'ah", 63: "Al-Munafiqun", 64: "At-Taghabun", 65: "At-Talaq",
  66: "At-Tahrim", 67: "Al-Mulk", 68: "Al-Qalam", 69: "Al-Haqqah", 70: "Al-Ma'arij",
  71: "Nuh", 72: "Al-Jinn", 73: "Al-Muzzammil", 74: "Al-Muddaththir", 75: "Al-Qiyamah",
  76: "Al-Insan", 77: "Al-Mursalat", 78: "An-Naba", 79: "An-Nazi'at", 80: "Abasa",
  81: "At-Takwir", 82: "Al-Infitar", 83: "Al-Mutaffifin", 84: "Al-Inshiqaq", 85: "Al-Buruj",
  86: "At-Tariq", 87: "Al-A'la", 88: "Al-Ghashiyah", 89: "Al-Fajr", 90: "Al-Balad",
  91: "Ash-Shams", 92: "Al-Layl", 93: "Ad-Duha", 94: "Ash-Sharh", 95: "At-Tin",
  96: "Al-Alaq", 97: "Al-Qadr", 98: "Al-Bayyinah", 99: "Az-Zalzalah", 100: "Al-Adiyat",
  101: "Al-Qari'ah", 102: "At-Takathur", 103: "Al-Asr", 104: "Al-Humazah", 105: "Al-Fil",
  106: "Quraysh", 107: "Al-Ma'un", 108: "Al-Kawthar", 109: "Al-Kafirun", 110: "An-Nasr",
  111: "Al-Masad", 112: "Al-Ikhlas", 113: "Al-Falaq", 114: "An-Nas",
};

function byAyah(edition) {
  const map = new Map();
  for (const a of edition.quran) map.set(`${a.chapter}:${a.verse}`, a.text);
  return map;
}

const main = async () => {
  console.log("Quran build");
  const [indopak, uthmani, translit, telugu, info] = await Promise.all([
    grab("indopak", `${CDN}/editions/${EDITIONS.indopak}.min.json`),
    grab("uthmani", `${CDN}/editions/${EDITIONS.uthmani}.min.json`),
    grab("translit", `${CDN}/editions/${EDITIONS.translit}.min.json`),
    grab("telugu", `${CDN}/editions/${EDITIONS.telugu}.min.json`),
    grab("info", `${CDN}/info.json`),
  ]);

  const ip = byAyah(indopak);
  const ut = byAyah(uthmani);
  const tl = byAyah(translit);
  const te = byAyah(telugu);

  mkdirSync(OUT, { recursive: true });

  const index = [];
  let bytes = 0;
  let uthBytes = 0;

  for (const ch of info.chapters) {
    const n = ch.chapter;
    const pad = String(n).padStart(3, "0");

    const ayahs = ch.verses.map((v) => {
      const key = `${n}:${v.verse}`;
      const row = { v: v.verse, ar: ip.get(key), tr: tl.get(key), te: te.get(key) };
      /* A missing ayah must stop the build. A Quran with a hole in it that
         renders as "undefined" is the worst possible failure here. */
      for (const [k, val] of Object.entries(row)) {
        if (val === undefined) throw new Error(`${key}: ${k} missing`);
      }
      if (v.sajda) row.sajda = true;
      return row;
    });

    const file = JSON.stringify({ n, ayahs, source: SOURCES });
    writeFileSync(join(OUT, `${pad}.json`), file);
    bytes += file.length;

    const uthFile = JSON.stringify({
      n,
      ayahs: ch.verses.map((v) => ({ v: v.verse, ar: ut.get(`${n}:${v.verse}`) })),
    });
    writeFileSync(join(OUT, `${pad}-uthmani.json`), uthFile);
    uthBytes += uthFile.length;

    index.push({
      n,
      ar: ch.arabicname,
      en: EN_NAMES[n],
      te: TE_NAMES[n],
      meaning: ch.englishname,
      ayahs: ch.verses.length,
      revealed: ch.revelation === "Mecca" ? "makkah" : "madinah",
      /* Which page of a standard mushaf it opens on, so a reader holding a
         paper Quran can find their place. */
      page: ch.verses[0].page,
      juz: ch.verses[0].juz,
    });
  }

  const ts = `/* Generated by scripts/build-quran.mjs -- do not edit.

   Metadata for all 114 surahs. The text itself is not here: it lives in
   public/quran/NNN.json and is fetched when a surah is opened. This file is
   bundled, so it has to stay small enough to be worth bundling.

   Arabic text: ${SOURCES.arabic}
   Telugu: ${SOURCES.telugu} */

export type SurahMeta = {
  n: number;
  /** Arabic name, as written on the surah heading of a mushaf. */
  ar: string;
  en: string;
  te: string;
  /** What the name means, in English. */
  meaning: string;
  ayahs: number;
  revealed: "makkah" | "madinah";
  /** Opening page and juz in a standard 604-page mushaf. */
  page: number;
  juz: number;
};

export const surahIndex: SurahMeta[] = ${JSON.stringify(index, null, 0).replace(/\},\{/g, "},\n  {").replace(/^\[/, "[\n  ").replace(/\]$/, ",\n]")};

export const TOTAL_AYAHS = ${index.reduce((n, s) => n + s.ayahs, 0)};

export const QURAN_SOURCES = ${JSON.stringify(SOURCES, null, 2)};
`;
  writeFileSync(join("src", "content", "quran-index.ts"), ts);

  console.log(
    `\n  114 surahs, ${index.reduce((n, s) => n + s.ayahs, 0)} ayahs` +
      `\n  ${OUT}/NNN.json         ${Math.round(bytes / 1024)} KB total` +
      `\n  ${OUT}/NNN-uthmani.json ${Math.round(uthBytes / 1024)} KB total` +
      `\n  src/content/quran-index.ts written`,
  );
};

main().catch((err) => {
  console.error("\nquran build failed:", err.message);
  process.exit(1);
});
