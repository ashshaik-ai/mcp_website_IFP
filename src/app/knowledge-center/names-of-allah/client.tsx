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
} as const;

const names = [
  { n: 1,  ar: "اللَّهُ",        name: "Allah",        te: "అల్లాహ్",            en: "The One God" },
  { n: 2,  ar: "الرَّحْمَٰنُ",  name: "Ar-Rahman",    te: "అర్-రహ్మాన్",        en: "The Most Gracious" },
  { n: 3,  ar: "الرَّحِيمُ",    name: "Ar-Raheem",    te: "అర్-రహీమ్",          en: "The Most Merciful" },
  { n: 4,  ar: "الْمَلِكُ",     name: "Al-Malik",     te: "అల్-మలిక్",          en: "The King" },
  { n: 5,  ar: "الْقُدُّوسُ",   name: "Al-Quddus",    te: "అల్-ఖుద్దూస్",       en: "The Most Holy" },
  { n: 6,  ar: "السَّلَامُ",    name: "As-Salam",     te: "అస్-సలామ్",          en: "The Source of Peace" },
  { n: 7,  ar: "الْمُؤْمِنُ",   name: "Al-Mumin",     te: "అల్-ముమిన్",         en: "The Guardian of Faith" },
  { n: 8,  ar: "الْمُهَيْمِنُ", name: "Al-Muhaymin",  te: "అల్-ముహైమిన్",       en: "The Protector" },
  { n: 9,  ar: "الْعَزِيزُ",    name: "Al-Aziz",      te: "అల్-అజీజ్",          en: "The Almighty" },
  { n: 10, ar: "الْجَبَّارُ",   name: "Al-Jabbar",    te: "అల్-జబ్బార్",        en: "The Compeller" },
  { n: 11, ar: "الْمُتَكَبِّرُ",name: "Al-Mutakabbir",te: "అల్-ముతకబ్బిర్",    en: "The Supreme" },
  { n: 12, ar: "الْخَالِقُ",    name: "Al-Khaliq",    te: "అల్-ఖాలిఖ్",         en: "The Creator" },
  { n: 13, ar: "الْبَارِئُ",    name: "Al-Bari",      te: "అల్-బారీ",           en: "The Originator" },
  { n: 14, ar: "الْمُصَوِّرُ",  name: "Al-Musawwir",  te: "అల్-ముసవ్విర్",      en: "The Fashioner" },
  { n: 15, ar: "الْغَفَّارُ",   name: "Al-Ghaffar",   te: "అల్-ఘఫ్ఫార్",        en: "The Great Forgiver" },
  { n: 16, ar: "الْقَهَّارُ",   name: "Al-Qahhar",    te: "అల్-ఖహ్హార్",        en: "The Subduer" },
  { n: 17, ar: "الْوَهَّابُ",   name: "Al-Wahhab",    te: "అల్-వహ్హాబ్",        en: "The Bestower" },
  { n: 18, ar: "الرَّزَّاقُ",   name: "Ar-Razzaq",    te: "అర్-రజ్జాఖ్",        en: "The Provider" },
  { n: 19, ar: "الْفَتَّاحُ",   name: "Al-Fattah",    te: "అల్-ఫత్తాహ్",        en: "The Opener" },
  { n: 20, ar: "الْعَلِيمُ",    name: "Al-Alim",      te: "అల్-అలీమ్",          en: "The All-Knowing" },
  { n: 21, ar: "الْقَابِضُ",    name: "Al-Qabid",     te: "అల్-ఖాబిద్",         en: "The Constrictor" },
  { n: 22, ar: "الْبَاسِطُ",    name: "Al-Basit",     te: "అల్-బాసిత్",         en: "The Extender" },
  { n: 23, ar: "الْخَافِضُ",    name: "Al-Khafid",    te: "అల్-ఖాఫిద్",         en: "The Abaser" },
  { n: 24, ar: "الرَّافِعُ",    name: "Ar-Rafi",      te: "అర్-రాఫి",           en: "The Exalter" },
  { n: 25, ar: "الْمُعِزُّ",    name: "Al-Muizz",     te: "అల్-ముఇజ్జ్",        en: "The Honourer" },
  { n: 26, ar: "الْمُذِلُّ",    name: "Al-Mudhill",   te: "అల్-ముజిల్",         en: "The Dishonourer" },
  { n: 27, ar: "السَّمِيعُ",    name: "As-Sami",      te: "అస్-సమీ",            en: "The All-Hearing" },
  { n: 28, ar: "الْبَصِيرُ",    name: "Al-Basir",     te: "అల్-బసీర్",          en: "The All-Seeing" },
  { n: 29, ar: "الْحَكَمُ",     name: "Al-Hakam",     te: "అల్-హకమ్",           en: "The Judge" },
  { n: 30, ar: "الْعَدْلُ",     name: "Al-Adl",       te: "అల్-అద్ల్",          en: "The Just" },
  { n: 31, ar: "اللَّطِيفُ",    name: "Al-Latif",     te: "అల్-లతీఫ్",          en: "The Subtle One" },
  { n: 32, ar: "الْخَبِيرُ",    name: "Al-Khabir",    te: "అల్-ఖబీర్",          en: "The All-Aware" },
  { n: 33, ar: "الْحَلِيمُ",    name: "Al-Halim",     te: "అల్-హలీమ్",          en: "The Forbearing" },
  { n: 34, ar: "الْعَظِيمُ",    name: "Al-Azim",      te: "అల్-అజీమ్",          en: "The Magnificent" },
  { n: 35, ar: "الْغَفُورُ",    name: "Al-Ghafur",    te: "అల్-ఘఫూర్",          en: "The Forgiving" },
  { n: 36, ar: "الشَّكُورُ",    name: "Ash-Shakur",   te: "అష్-షకూర్",          en: "The Appreciative" },
  { n: 37, ar: "الْعَلِيُّ",    name: "Al-Ali",       te: "అల్-అలీ",            en: "The Most High" },
  { n: 38, ar: "الْكَبِيرُ",    name: "Al-Kabir",     te: "అల్-కబీర్",          en: "The Most Great" },
  { n: 39, ar: "الْحَفِيظُ",    name: "Al-Hafiz",     te: "అల్-హఫీజ్",          en: "The Preserver" },
  { n: 40, ar: "الْمُقِيتُ",    name: "Al-Muqit",     te: "అల్-ముఖీత్",         en: "The Sustainer" },
  { n: 41, ar: "الْحَسِيبُ",    name: "Al-Hasib",     te: "అల్-హసీబ్",          en: "The Reckoner" },
  { n: 42, ar: "الْجَلِيلُ",    name: "Al-Jalil",     te: "అల్-జలీల్",          en: "The Majestic" },
  { n: 43, ar: "الْكَرِيمُ",    name: "Al-Karim",     te: "అల్-కరీమ్",          en: "The Generous" },
  { n: 44, ar: "الرَّقِيبُ",    name: "Ar-Raqib",     te: "అర్-రఖీబ్",          en: "The Watchful" },
  { n: 45, ar: "الْمُجِيبُ",    name: "Al-Mujib",     te: "అల్-ముజీబ్",         en: "The Responsive" },
  { n: 46, ar: "الْوَاسِعُ",    name: "Al-Wasi",      te: "అల్-వాసి",           en: "The All-Encompassing" },
  { n: 47, ar: "الْحَكِيمُ",    name: "Al-Hakim",     te: "అల్-హకీమ్",          en: "The Wise" },
  { n: 48, ar: "الْوَدُودُ",    name: "Al-Wadud",     te: "అల్-వదూద్",          en: "The Loving" },
  { n: 49, ar: "الْمَجِيدُ",    name: "Al-Majid",     te: "అల్-మజీద్",          en: "The Glorious" },
  { n: 50, ar: "الْبَاعِثُ",    name: "Al-Baʿith",    te: "అల్-బాఇస్",          en: "The Resurrector" },
  { n: 51, ar: "الشَّهِيدُ",    name: "Ash-Shahid",   te: "అష్-షహీద్",          en: "The Witness" },
  { n: 52, ar: "الْحَقُّ",      name: "Al-Haqq",      te: "అల్-హఖ్",            en: "The Truth" },
  { n: 53, ar: "الْوَكِيلُ",    name: "Al-Wakil",     te: "అల్-వకీల్",          en: "The Trustee" },
  { n: 54, ar: "الْقَوِيُّ",    name: "Al-Qawiyy",    te: "అల్-ఖవీ",            en: "The All-Strong" },
  { n: 55, ar: "الْمَتِينُ",    name: "Al-Mateen",    te: "అల్-మతీన్",          en: "The Firm" },
  { n: 56, ar: "الْوَلِيُّ",    name: "Al-Waliyy",    te: "అల్-వలీ",            en: "The Protector" },
  { n: 57, ar: "الْحَمِيدُ",    name: "Al-Hamid",     te: "అల్-హమీద్",          en: "The Praiseworthy" },
  { n: 58, ar: "الْمُحْصِي",    name: "Al-Muhsi",     te: "అల్-ముహ్సీ",         en: "The Counter" },
  { n: 59, ar: "الْمُبْدِئُ",   name: "Al-Mubdi",     te: "అల్-ముబ్దీ",         en: "The Originator" },
  { n: 60, ar: "الْمُعِيدُ",    name: "Al-Mueid",     te: "అల్-ముఈద్",          en: "The Restorer" },
  { n: 61, ar: "الْمُحْيِي",    name: "Al-Muhyi",     te: "అల్-ముహ్యీ",         en: "The Giver of Life" },
  { n: 62, ar: "الْمُمِيتُ",    name: "Al-Mumit",     te: "అల్-ముమీత్",         en: "The Taker of Life" },
  { n: 63, ar: "الْحَيُّ",      name: "Al-Hayy",      te: "అల్-హయ్",            en: "The Ever-Living" },
  { n: 64, ar: "الْقَيُّومُ",   name: "Al-Qayyum",    te: "అల్-ఖయ్యూమ్",       en: "The Self-Sustaining" },
  { n: 65, ar: "الْوَاجِدُ",    name: "Al-Wajid",     te: "అల్-వాజిద్",         en: "The Finder" },
  { n: 66, ar: "الْمَاجِدُ",    name: "Al-Majid",     te: "అల్-మాజిద్",         en: "The Noble" },
  { n: 67, ar: "الْوَاحِدُ",    name: "Al-Wahid",     te: "అల్-వాహిద్",         en: "The One" },
  { n: 68, ar: "الْأَحَدُ",     name: "Al-Ahad",      te: "అల్-అహద్",           en: "The Unique" },
  { n: 69, ar: "الصَّمَدُ",     name: "As-Samad",     te: "అస్-సమద్",           en: "The Eternal" },
  { n: 70, ar: "الْقَادِرُ",    name: "Al-Qadir",     te: "అల్-ఖాదిర్",         en: "The Capable" },
  { n: 71, ar: "الْمُقْتَدِرُ", name: "Al-Muqtadir",  te: "అల్-ముఖ్తదిర్",     en: "The Powerful" },
  { n: 72, ar: "الْمُقَدِّمُ",  name: "Al-Muqaddim",  te: "అల్-ముఖద్దిమ్",     en: "The Expediter" },
  { n: 73, ar: "الْمُؤَخِّرُ",  name: "Al-Muakhkhir", te: "అల్-ముఆఖ్ఖిర్",     en: "The Delayer" },
  { n: 74, ar: "الْأَوَّلُ",    name: "Al-Awwal",     te: "అల్-అవ్వల్",         en: "The First" },
  { n: 75, ar: "الْآخِرُ",      name: "Al-Akhir",     te: "అల్-ఆఖిర్",          en: "The Last" },
  { n: 76, ar: "الظَّاهِرُ",    name: "Az-Zahir",     te: "అజ్-జాహిర్",         en: "The Manifest" },
  { n: 77, ar: "الْبَاطِنُ",    name: "Al-Batin",     te: "అల్-బాతిన్",         en: "The Hidden" },
  { n: 78, ar: "الْوَالِي",     name: "Al-Wali",      te: "అల్-వాలీ",           en: "The Governor" },
  { n: 79, ar: "الْمُتَعَالِي", name: "Al-Mutaali",   te: "అల్-ముతాలీ",         en: "The Self-Exalted" },
  { n: 80, ar: "الْبَرُّ",      name: "Al-Barr",      te: "అల్-బర్ర్",          en: "The Source of Goodness" },
  { n: 81, ar: "التَّوَّابُ",   name: "At-Tawwab",    te: "అత్-తవ్వాబ్",        en: "The Accepter of Repentance" },
  { n: 82, ar: "الْمُنْتَقِمُ", name: "Al-Muntaqim",  te: "అల్-ముంతఖిమ్",      en: "The Avenger" },
  { n: 83, ar: "الْعَفُوُّ",    name: "Al-Afu",       te: "అల్-అఫువ్వ్",        en: "The Pardoner" },
  { n: 84, ar: "الرَّؤُوفُ",    name: "Ar-Rauf",      te: "అర్-రఊఫ్",           en: "The Most Kind" },
  { n: 85, ar: "مَالِكُ الْمُلْكِ", name: "Maalik-ul-Mulk", te: "మాలికుల్-ముల్క్", en: "Owner of all Sovereignty" },
  { n: 86, ar: "ذُو الْجَلَالِ وَالْإِكْرَامِ", name: "Dhul-Jalali wal-Ikram",  te: "జుల్-జలాలి వల్-ఇక్రామ్",        en: "Lord of Majesty & Bounty" },
  { n: 87, ar: "الْمُقْسِطُ",   name: "Al-Muqsit",    te: "అల్-ముఖ్సిత్",      en: "The Equitable" },
  { n: 88, ar: "الْجَامِعُ",    name: "Al-Jami",      te: "అల్-జామి",           en: "The Gatherer" },
  { n: 89, ar: "الْغَنِيُّ",    name: "Al-Ghani",     te: "అల్-ఘనీ",           en: "The Self-Sufficient" },
  { n: 90, ar: "الْمُغْنِي",    name: "Al-Mughni",    te: "అల్-ముఘ్నీ",         en: "The Enricher" },
  { n: 91, ar: "الْمَانِعُ",    name: "Al-Mani",      te: "అల్-మానీ",           en: "The Preventer" },
  { n: 92, ar: "الضَّارُّ",     name: "Ad-Darr",      te: "అద్-దార్ర్",         en: "The Distresser" },
  { n: 93, ar: "النَّافِعُ",    name: "An-Nafi",      te: "అన్-నాఫి",           en: "The Propitious" },
  { n: 94, ar: "النُّورُ",      name: "An-Nur",       te: "అన్-నూర్",           en: "The Light" },
  { n: 95, ar: "الْهَادِي",     name: "Al-Hadi",      te: "అల్-హాదీ",           en: "The Guide" },
  { n: 96, ar: "الْبَدِيعُ",    name: "Al-Badi",      te: "అల్-బదీ",            en: "The Incomparable" },
  { n: 97, ar: "الْبَاقِي",     name: "Al-Baqi",      te: "అల్-బాఖీ",           en: "The Everlasting" },
  { n: 98, ar: "الْوَارِثُ",    name: "Al-Warith",    te: "అల్-వారిస్",         en: "The Inheritor" },
  { n: 99, ar: "الرَّشِيدُ",    name: "Ar-Rashid",    te: "అర్-రషీద్",          en: "The Guide to the Right Path" },
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
        back: lang === "te" ? n.te : n.en,
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
  const filtered = q
    ? names.filter(
        (n) =>
          foldSearch(n.name).includes(q) ||
          foldSearch(n.en).includes(q) ||
          n.te.includes(query.trim()) ||
          foldSearch(n.ar).includes(q),
      )
    : names;

  return (
    <PageShell>
      <PortalJump portal="names-of-allah" />

      <section className="bg-gradient-to-br from-[var(--if-green-mid)] to-[var(--if-green)] text-[var(--if-gold-pale)] py-20 px-4">
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
      <section className="if-defer py-10 px-4 bg-[var(--if-cream-light)]">
        <div className="mx-auto max-w-5xl">
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
                  onClick={() => { setSelected(selected?.n === name.n ? null : name); speak(name.ar); }}
                  className={`relative overflow-hidden w-full text-center p-3 rounded-xl border transition-all ${selected?.n === name.n ? "bg-[var(--if-green)] border-[var(--if-gold)]/40" : "bg-white border-[var(--if-gold)]/20 hover:border-[var(--if-gold)]/40"}`}
                >
                  {selected?.n === name.n && <BorderBeam size={80} duration={5} colorFrom="#c8922a" colorTo="#e8b84b" />}
                  <div className={`text-[10px] font-bold mb-1 ${selected?.n === name.n ? "text-[var(--if-gold-light)]" : "text-[var(--if-text-muted)]"}`}>{name.n}</div>
                  <div className={`font-arabic text-xl leading-relaxed ${selected?.n === name.n ? "text-[var(--if-gold-light)]" : "text-[var(--if-green)]"}`} dir="rtl">{name.ar}</div>
                  <div className={`text-xs font-semibold mt-1 ${selected?.n === name.n ? "text-[var(--if-gold-pale)]" : "text-[var(--if-green)]"}`}>{name.name}</div>
                  {/* Every name carries a Telugu meaning, but the grid rendered
                      the English one unconditionally, so a Telugu reader got
                      ninety-nine English cards. */}
                  {/* Telugu conjuncts and vowel marks collapse below about 12px. */}
                  <div className={`text-xs mt-0.5 leading-snug ${selected?.n === name.n ? "text-[var(--if-gold-pale)]/85" : "text-[var(--if-text-muted)]"}`}>{lang === "te" ? name.te : name.en}</div>
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
                <div className="font-display text-xl font-bold text-[var(--if-gold-light)] mb-1">{selected.name}</div>
                {/* Reading language first, the other underneath: a learner
                    benefits from seeing both, but not from being led with the
                    one they did not ask for. */}
                <div className="text-sm text-[var(--if-gold-pale)]/80 mb-1">{lang === "te" ? selected.te : selected.en}</div>
                <div className="text-sm text-[var(--if-gold-pale)]/70 mb-5">{lang === "te" ? selected.en : selected.te}</div>
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
