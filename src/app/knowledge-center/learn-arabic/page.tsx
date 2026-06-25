"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { I18nProvider, useI18n } from "@/lib/i18n/context";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { ChevronLeft, ChevronRight, ChevronDown, Volume2, X } from "lucide-react";

/* ─── Data ─── */
const levels = [
  { num: 1, title: { te: "అరబిక్ అక్షరమాల", en: "The Arabic Alphabet" }, arabic: "الحروف الهجائية", desc: { te: "28 అక్షరాలు, వాటి రూపాలు మరియు ఉచ్చారణ", en: "28 letters, their forms and pronunciation" }, lessons: ["Alphabet Introduction", "Letter Forms (4 shapes)", "Connecting Letters", "Writing Practice"], available: true },
  { num: 2, title: { te: "హరకాత్ మరియు స్వరాలు", en: "Harakat and Vowels" }, arabic: "التشكيل والقراءة", desc: { te: "Fatha, Kasra, Damma మరియు పొడిగింపులు", en: "Fatha, Kasra, Damma and extensions" }, lessons: ["Short Vowels (Fatha/Kasra/Damma)", "Long Vowels (Madd)", "Tanween", "Reading Practice"], available: true },
  { num: 3, title: { te: "పదజాలం నిర్మాణం", en: "Building Vocabulary" }, arabic: "المفردات الأساسية", desc: { te: "ప్రాథమిక అరబిక్ పదాలు మరియు వాటి అర్థాలు", en: "Essential Arabic words and their meanings" }, lessons: ["Family Words", "Daily Objects", "Nature Words", "Islamic Vocabulary"], available: true },
  { num: 4, title: { te: "రోజువారీ అరబిక్", en: "Everyday Arabic" }, arabic: "العربية اليومية", desc: { te: "సాధారణ వాక్యాలు మరియు సంభాషణలు", en: "Common phrases and conversations" }, lessons: ["Greetings", "At the Mosque", "Basic Sentences", "Dialogues"], available: false },
  { num: 5, title: { te: "ఖురానిక్ అరబిక్", en: "Quranic Arabic" }, arabic: "عربية القرآن", desc: { te: "ఖురాన్‌లో తరచుగా వచ్చే పదాలు మరియు నమూనాలు", en: "Frequently occurring Quranic words and patterns" }, lessons: ["Top 100 Quranic Words", "Quranic Phrases", "Surah Vocabulary", "Root Words"], available: false },
  { num: 6, title: { te: "వ్యాకరణ ప్రాథమికాలు", en: "Grammar Basics" }, arabic: "قواعد النحو", desc: { te: "అరబిక్ వ్యాకరణం పరిచయం — నదమ్ మరియు సర్ఫ్", en: "Introduction to Arabic grammar — Nahw and Sarf" }, lessons: ["Nouns & Verbs", "Sentence Structure", "Gender in Arabic", "Plurals"], available: false },
];

const alphabet = [
  { ar: "ا", name: "Alif",  en: "ā / '",  te: "అలిఫ్",           sun: false, example: { ar: "أَسَد",   te: "సింహం",     en: "Lion" } },
  { ar: "ب", name: "Ba",    en: "b",       te: "బా",              sun: false, example: { ar: "بَيْت",   te: "ఇల్లు",     en: "House" } },
  { ar: "ت", name: "Ta",    en: "t",       te: "తా",              sun: true,  example: { ar: "تُفَّاح", te: "ఆపిల్",     en: "Apple" } },
  { ar: "ث", name: "Tha",   en: "th",      te: "సా",              sun: true,  example: { ar: "ثَلَاثَة",te: "మూడు",      en: "Three" } },
  { ar: "ج", name: "Jim",   en: "j",       te: "జీమ్",             sun: false, example: { ar: "جَمَل",   te: "ఒంటె",      en: "Camel" } },
  { ar: "ح", name: "Ha",    en: "ḥ",       te: "హా (గొంతు)",      sun: false, example: { ar: "حِمَار",  te: "గాడిద",     en: "Donkey" } },
  { ar: "خ", name: "Kha",   en: "kh",      te: "ఖా",              sun: false, example: { ar: "خُبْز",   te: "రొట్టె",    en: "Bread" } },
  { ar: "د", name: "Dal",   en: "d",       te: "దాల్",             sun: true,  example: { ar: "دَرْس",   te: "పాఠం",      en: "Lesson" } },
  { ar: "ذ", name: "Dhal",  en: "dh",      te: "జాల్",             sun: true,  example: { ar: "ذِئْب",   te: "తోడేలు",    en: "Wolf" } },
  { ar: "ر", name: "Ra",    en: "r",       te: "రా",              sun: true,  example: { ar: "رَجُل",   te: "పురుషుడు",  en: "Man" } },
  { ar: "ز", name: "Zay",   en: "z",       te: "జే",              sun: true,  example: { ar: "زَهْرَة", te: "పువ్వు",    en: "Flower" } },
  { ar: "س", name: "Sin",   en: "s",       te: "సీన్",             sun: true,  example: { ar: "سَمَكَة", te: "చేప",       en: "Fish" } },
  { ar: "ش", name: "Shin",  en: "sh",      te: "షీన్",             sun: true,  example: { ar: "شَجَرَة", te: "చెట్టు",    en: "Tree" } },
  { ar: "ص", name: "Sad",   en: "ṣ",       te: "సాద్",             sun: true,  example: { ar: "صَبِيّ",  te: "అబ్బాయి",  en: "Boy" } },
  { ar: "ض", name: "Dad",   en: "ḍ",       te: "దాద్",             sun: true,  example: { ar: "ضَوْء",   te: "వెలుతురు",  en: "Light" } },
  { ar: "ط", name: "Ta'",   en: "ṭ",       te: "తా (వత్తడి)",     sun: true,  example: { ar: "طَائِر",  te: "పక్షి",     en: "Bird" } },
  { ar: "ظ", name: "Dha'",  en: "ẓ",       te: "జా (వత్తడి)",     sun: true,  example: { ar: "ظَبْي",   te: "జింక",      en: "Gazelle" } },
  { ar: "ع", name: "'Ayn",  en: "ʿ",       te: "ఐన్",             sun: false, example: { ar: "عَيْن",   te: "కన్ను",     en: "Eye" } },
  { ar: "غ", name: "Ghayn", en: "gh",      te: "గైన్",             sun: false, example: { ar: "غُرْفَة", te: "గది",       en: "Room" } },
  { ar: "ف", name: "Fa",    en: "f",       te: "ఫా",              sun: false, example: { ar: "فِيل",    te: "ఏనుగు",     en: "Elephant" } },
  { ar: "ق", name: "Qaf",   en: "q",       te: "కాఫ్",             sun: false, example: { ar: "قَمَر",   te: "చంద్రుడు", en: "Moon" } },
  { ar: "ك", name: "Kaf",   en: "k",       te: "కాఫ్ (మృదువు)",   sun: false, example: { ar: "كِتَاب",  te: "పుస్తకం",   en: "Book" } },
  { ar: "ل", name: "Lam",   en: "l",       te: "లామ్",             sun: true,  example: { ar: "لَيْل",   te: "రాత్రి",    en: "Night" } },
  { ar: "م", name: "Mim",   en: "m",       te: "మీమ్",             sun: false, example: { ar: "مَاء",    te: "నీరు",      en: "Water" } },
  { ar: "ن", name: "Nun",   en: "n",       te: "నూన్",             sun: true,  example: { ar: "نُور",    te: "వెలుతురు",  en: "Light" } },
  { ar: "ه", name: "Ha'",   en: "h",       te: "హా (మృదువు)",     sun: false, example: { ar: "هِلَال",  te: "నెలవంక",   en: "Crescent" } },
  { ar: "و", name: "Waw",   en: "w / ū",   te: "వావ్",             sun: false, example: { ar: "وَرْد",   te: "గులాబి",    en: "Rose" } },
  { ar: "ي", name: "Ya",    en: "y / ī",   te: "యా",              sun: false, example: { ar: "يَد",     te: "చేయి",      en: "Hand" } },
];

const wordOfDay = [
  { ar: "رَحْمَة",    roman: "Rahmah",    en: "Mercy / Compassion",      te: "దయ / కరుణ" },
  { ar: "صَبْر",      roman: "Sabr",      en: "Patience / Perseverance", te: "సహనం / దృఢత" },
  { ar: "تَوَكُّل",  roman: "Tawakkul",  en: "Reliance on Allah",       te: "అల్లాహ్‌పై నమ్మకం" },
  { ar: "إِخْلَاص",  roman: "Ikhlas",    en: "Sincerity",               te: "నిష్కలంక ఉద్దేశం" },
  { ar: "شُكْر",     roman: "Shukr",     en: "Gratitude",               te: "కృతజ్ఞత" },
];

const whyLearn = [
  { ar: "وَقُرْآنًا عَرَبِيًّا", title: { te: "ఖురాన్‌ను అర్థం చేసుకోండి", en: "Understand the Quran" }, desc: { te: "దివ్య గ్రంథం అరబిక్‌లో అవతరించింది — నేరుగా అర్థం చేసుకోండి", en: "The divine book was revealed in Arabic — understand it directly" } },
  { ar: "قَدْ أَفْلَحَ الْمُؤْمِنُونَ", title: { te: "నమాజ్‌ను సుసంపన్నం చేయండి", en: "Enrich Your Salah" }, desc: { te: "మీరు చదివేది అర్థమైనప్పుడు నమాజ్ లోతుగా భావించబడుతుంది", en: "Prayer deepens when you understand what you recite" } },
  { ar: "طَلَبُ الْعِلْمِ فَرِيضَةٌ", title: { te: "ఇస్లామిక్ జ్ఞానాన్ని తెరవండి", en: "Unlock Islamic Knowledge" }, desc: { te: "1400 సంవత్సరాల విద్వత్ అరబిక్‌లో ఉంది — దానిలోకి ప్రవేశించండి", en: "1400 years of scholarship is in Arabic — access it directly" } },
];

type Letter = typeof alphabet[0];

function LearnArabicPage() {
  const { lang } = useI18n();
  const [openLevel, setOpenLevel] = useState<number | null>(1);
  const [wordIdx, setWordIdx] = useState(0);
  const [selected, setSelected] = useState<Letter | null>(null);

  const speak = useCallback((text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "ar-SA";
    utter.rate = 0.65;
    window.speechSynthesis.speak(utter);
  }, []);

  const w = wordOfDay[wordIdx];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-900 to-[var(--if-green)] text-[var(--if-gold-pale)] py-20 px-4">
        <div className="mx-auto max-w-4xl text-center flex flex-col items-center gap-5">
          <BlurFade delay={0.05}>
            <Link href="/knowledge-center" className="inline-flex items-center gap-1 text-sm text-[var(--if-gold-pale)]/60 hover:text-[var(--if-gold-light)] transition-colors mb-2">
              <ChevronLeft className="h-4 w-4" />
              {lang === "te" ? "జ్ఞాన కేంద్రం" : "Knowledge Center"}
            </Link>
          </BlurFade>
          <BlurFade delay={0.1}>
            <span className="font-arabic text-4xl text-[var(--if-gold)]/70" dir="rtl">تعلُّم العربية</span>
          </BlurFade>
          <BlurFade delay={0.15}>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-[var(--if-gold-light)]">
              {lang === "te" ? "అరబిక్ నేర్చుకోండి" : "Learn Arabic"}
            </h1>
          </BlurFade>
          <BlurFade delay={0.2}>
            <p className="text-[var(--if-gold-pale)]/70 max-w-xl">
              {lang === "te"
                ? "అక్షరమాల నుండి ఖురానిక్ అరబిక్ వరకు — నిర్మాణాత్మక అభ్యాస మార్గం"
                : "From alphabet to Quranic Arabic — structured learning roadmap"}
            </p>
          </BlurFade>
          <BlurFade delay={0.25} className="flex gap-4 flex-wrap justify-center text-sm">
            {[
              { n: "6", l: lang === "te" ? "స్థాయిలు" : "Levels" },
              { n: "20+", l: lang === "te" ? "పాఠాలు" : "Lessons" },
              { n: "28", l: lang === "te" ? "అక్షరాలు" : "Letters" },
              { n: "∞", l: lang === "te" ? "ఉచితం" : "Free" },
            ].map(({ n, l }) => (
              <div key={l} className="px-4 py-2.5 rounded-xl bg-white/5 border border-[var(--if-gold)]/20 text-center min-w-[70px]">
                <div className="font-display text-xl font-bold text-[var(--if-gold-light)]">{n}</div>
                <div className="text-xs text-[var(--if-gold-pale)]/60">{l}</div>
              </div>
            ))}
          </BlurFade>
        </div>
      </section>

      {/* Why learn */}
      <section className="py-16 px-4 bg-[var(--if-cream-light)]">
        <div className="mx-auto max-w-5xl">
          <BlurFade delay={0.1}>
            <h2 className="font-display text-3xl font-bold text-[var(--if-green)] text-center mb-10">
              {lang === "te" ? "అరబిక్ ఎందుకు నేర్చుకోవాలి?" : "Why Learn Arabic?"}
            </h2>
          </BlurFade>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyLearn.map((item, i) => (
              <BlurFade key={i} delay={0.08 * i}>
                <div className="relative overflow-hidden bg-white rounded-2xl border border-[var(--if-gold)]/15 p-6 text-center hover:border-[var(--if-gold)]/40 transition-colors group">
                  <BorderBeam size={80} duration={6} colorFrom="#0d3b1e" colorTo="#c8922a" className="opacity-0 group-hover:opacity-100" />
                  <div className="font-arabic text-2xl text-[var(--if-gold)]/70 mb-4 leading-relaxed" dir="rtl">{item.ar}</div>
                  <h3 className="font-semibold text-[var(--if-green)] mb-2">{item.title[lang]}</h3>
                  <p className="text-sm text-[var(--if-text-muted)]">{item.desc[lang]}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Alphabet — interactive grid */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-5xl">
          <BlurFade delay={0.1}>
            <h2 className="font-display text-3xl font-bold text-[var(--if-green)] text-center mb-2">
              {lang === "te" ? "అరబిక్ అక్షరమాల — 28 హురూఫ్" : "Arabic Alphabet — 28 Huroof"}
            </h2>
            <p className="text-center text-[var(--if-text-muted)] mb-3 text-sm">
              {lang === "te"
                ? "ప్రతి అక్షరాన్ని నొక్కండి వినడానికి · 🔊 ఆడియో ఉచ్చారణ"
                : "Click any letter to hear it · 🔊 Audio pronunciation"}
            </p>
            <div className="flex justify-center gap-4 text-xs mb-8">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />{lang === "te" ? "సూర్య అక్షరాలు (14)" : "Sun letters (14)"}</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[var(--if-green)] inline-block" />{lang === "te" ? "చంద్ర అక్షరాలు (14)" : "Moon letters (14)"}</span>
            </div>
          </BlurFade>

          {/* RTL alphabet grid */}
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-3" dir="rtl">
            {alphabet.map((letter) => (
              <BlurFade key={letter.name} delay={0.01}>
                <button
                  onClick={() => { setSelected(letter); speak(letter.ar); }}
                  className={`w-full flex flex-col items-center p-3 rounded-xl border transition-all group hover:scale-105 active:scale-95 ${
                    selected?.name === letter.name
                      ? "bg-[var(--if-green)] border-[var(--if-gold)]/60 shadow-lg"
                      : "bg-white border-[var(--if-gold)]/15 hover:border-[var(--if-gold)]/50 hover:shadow-md"
                  }`}
                >
                  <span className={`font-arabic text-3xl transition-colors ${selected?.name === letter.name ? "text-[var(--if-gold-light)]" : "text-[var(--if-green)] group-hover:text-[var(--if-gold)]"}`}>
                    {letter.ar}
                  </span>
                  <span className={`text-[10px] font-semibold mt-1 ${selected?.name === letter.name ? "text-[var(--if-gold-pale)]/80" : "text-[var(--if-text-muted)]"}`} dir="ltr">
                    {letter.name}
                  </span>
                  <span className={`text-[9px] ${selected?.name === letter.name ? "text-[var(--if-gold)]/70" : letter.sun ? "text-amber-600" : "text-[var(--if-green)]/60"}`} dir="ltr">
                    {letter.en}
                  </span>
                </button>
              </BlurFade>
            ))}
          </div>

          {/* Selected letter detail */}
          {selected && (
            <BlurFade delay={0.05}>
              <div className="relative overflow-hidden mt-8 bg-white rounded-2xl border border-[var(--if-gold)]/30 p-6 shadow-lg">
                <BorderBeam size={200} duration={8} colorFrom="#0d3b1e" colorTo="#c8922a" />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[var(--if-cream-light)] transition-colors"
                  aria-label="Close"
                >
                  <X className="h-4 w-4 text-[var(--if-text-muted)]" />
                </button>

                <div className="flex items-start gap-6 flex-wrap">
                  {/* Big letter */}
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-24 h-24 rounded-2xl bg-[var(--if-green)] flex items-center justify-center">
                      <span className="font-arabic text-5xl text-[var(--if-gold-light)]" dir="rtl">{selected.ar}</span>
                    </div>
                    <button
                      onClick={() => speak(selected.ar)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--if-gold)]/10 text-[var(--if-gold)] text-xs font-semibold hover:bg-[var(--if-gold)]/20 transition-colors border border-[var(--if-gold)]/30"
                    >
                      <Volume2 className="h-3.5 w-3.5" />
                      {lang === "te" ? "వినండి" : "Listen"}
                    </button>
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap mb-4">
                      <h3 className="font-display text-2xl font-bold text-[var(--if-green)]">{selected.name}</h3>
                      <span className="text-sm text-[var(--if-text-muted)]">/{selected.en}/</span>
                      <span className="text-sm text-[var(--if-text-muted)]">{selected.te}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${selected.sun ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-emerald-50 text-emerald-700 border-emerald-200"}`}>
                        {selected.sun ? (lang === "te" ? "☀️ సూర్య అక్షరం" : "☀️ Sun Letter") : (lang === "te" ? "🌙 చంద్ర అక్షరం" : "🌙 Moon Letter")}
                      </span>
                    </div>

                    {/* Forms table */}
                    <div className="mb-4">
                      <p className="text-xs font-bold text-[var(--if-text-muted)] uppercase tracking-wider mb-2">
                        {lang === "te" ? "అక్షర రూపాలు (4 స్థానాలు)" : "Letter Forms (4 Positions)"}
                      </p>
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          { pos: lang === "te" ? "ఏకాంత" : "Isolated", word: selected.ar },
                          { pos: lang === "te" ? "ప్రారంభ" : "Initial",  word: selected.ar + "ـ" },
                          { pos: lang === "te" ? "మధ్య" : "Medial",    word: "ـ" + selected.ar + "ـ" },
                          { pos: lang === "te" ? "చివర" : "Final",     word: "ـ" + selected.ar },
                        ].map(({ pos, word }) => (
                          <div key={pos} className="flex flex-col items-center p-2 rounded-lg bg-[var(--if-cream-light)] border border-[var(--if-gold)]/10">
                            <span className="font-arabic text-xl text-[var(--if-green)]" dir="rtl">{word}</span>
                            <span className="text-[9px] text-[var(--if-text-muted)] mt-1">{pos}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Example word */}
                    <div className="flex items-center gap-4 p-3 rounded-xl bg-[var(--if-cream-light)] border border-[var(--if-gold)]/15">
                      <button
                        onClick={() => speak(selected.example.ar)}
                        className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--if-gold)]/10 flex items-center justify-center hover:bg-[var(--if-gold)]/20 transition-colors"
                      >
                        <Volume2 className="h-3.5 w-3.5 text-[var(--if-gold)]" />
                      </button>
                      <div className="font-arabic text-2xl text-[var(--if-green)]" dir="rtl">{selected.example.ar}</div>
                      <div className="text-sm">
                        <p className="font-semibold text-[var(--if-green)]">{selected.example.en}</p>
                        <p className="text-[var(--if-text-muted)] text-xs">{selected.example.te}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </BlurFade>
          )}
        </div>
      </section>

      {/* Levels accordion */}
      <section className="py-16 px-4 bg-[var(--if-cream-light)]">
        <div className="mx-auto max-w-3xl">
          <BlurFade delay={0.1}>
            <h2 className="font-display text-3xl font-bold text-[var(--if-green)] text-center mb-10">
              {lang === "te" ? "అభ్యాస మార్గం — 6 స్థాయిలు" : "Learning Roadmap — 6 Levels"}
            </h2>
          </BlurFade>
          <div className="space-y-3">
            {levels.map((level) => (
              <BlurFade key={level.num} delay={0.05 * level.num}>
                <div className="bg-white rounded-2xl border border-[var(--if-gold)]/15 overflow-hidden">
                  <button
                    onClick={() => setOpenLevel(openLevel === level.num ? null : level.num)}
                    className="w-full flex items-center gap-4 p-5 text-left hover:bg-[var(--if-cream-light)] transition-colors"
                  >
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                      level.available
                        ? "bg-[var(--if-green)] text-[var(--if-gold-light)]"
                        : "bg-[var(--if-gold)]/20 text-[var(--if-text-muted)]"
                    }`}>
                      {level.num}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-[var(--if-green)]">{level.title[lang]}</span>
                        <span className="font-arabic text-sm text-[var(--if-gold)]/70" dir="rtl">{level.arabic}</span>
                        {!level.available && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200 font-semibold">
                            {lang === "te" ? "త్వరలో" : "Coming Soon"}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[var(--if-text-muted)] mt-0.5">{level.desc[lang]}</p>
                    </div>
                    {openLevel === level.num
                      ? <ChevronDown className="h-4 w-4 text-[var(--if-gold)] flex-shrink-0" />
                      : <ChevronRight className="h-4 w-4 text-[var(--if-gold)]/50 flex-shrink-0" />
                    }
                  </button>
                  {openLevel === level.num && (
                    <div className="px-5 pb-5 border-t border-[var(--if-gold)]/10">
                      <ul className="mt-4 space-y-2">
                        {level.lessons.map((lesson, i) => (
                          <li key={lesson} className="flex items-center gap-3 text-sm text-[var(--if-text)]">
                            <span className="w-6 h-6 rounded-full bg-[var(--if-gold)]/10 text-[var(--if-gold)] flex items-center justify-center text-xs font-bold flex-shrink-0">
                              {i + 1}
                            </span>
                            {lesson}
                            {level.available && (
                              <span className="ml-auto text-xs text-emerald-600 font-semibold">{lang === "te" ? "అందుబాటులో" : "Available"}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Word of the Day */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-md">
          <BlurFade delay={0.1}>
            <h2 className="font-display text-2xl font-bold text-[var(--if-green)] text-center mb-8">
              {lang === "te" ? "నేటి పదం" : "Word of the Day"}
            </h2>
            <div className="relative overflow-hidden bg-[var(--if-green)] rounded-2xl p-8 text-center text-[var(--if-gold-pale)]">
              <BorderBeam size={200} duration={10} colorFrom="#c8922a" colorTo="#e8b84b" />
              <div className="font-arabic text-6xl text-[var(--if-gold-light)] mb-2 leading-relaxed" dir="rtl">{w.ar}</div>
              <div className="text-[var(--if-gold)] font-semibold mb-1">{w.roman}</div>
              <div className="text-[var(--if-gold-pale)]/70 text-sm mb-1">{w.en}</div>
              <div className="text-[var(--if-gold-pale)]/60 text-sm mb-5">{w.te}</div>
              <button
                onClick={() => speak(w.ar)}
                className="flex items-center gap-2 mx-auto px-4 py-2 rounded-full bg-[var(--if-gold)]/15 text-[var(--if-gold-light)] text-sm font-medium hover:bg-[var(--if-gold)]/25 transition-colors border border-[var(--if-gold)]/30 mb-5"
              >
                <Volume2 className="h-4 w-4" />
                {lang === "te" ? "వినండి" : "Listen"}
              </button>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setWordIdx((i) => (i - 1 + wordOfDay.length) % wordOfDay.length)}
                  className="p-2 rounded-full border border-[var(--if-gold)]/30 hover:bg-white/10 transition-colors"
                >
                  <ChevronLeft className="h-4 w-4 text-[var(--if-gold-pale)]" />
                </button>
                <span className="self-center text-xs text-[var(--if-gold-pale)]/50">{wordIdx + 1}/{wordOfDay.length}</span>
                <button
                  onClick={() => setWordIdx((i) => (i + 1) % wordOfDay.length)}
                  className="p-2 rounded-full border border-[var(--if-gold)]/30 hover:bg-white/10 transition-colors"
                >
                  <ChevronRight className="h-4 w-4 text-[var(--if-gold-pale)]" />
                </button>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function LearnArabic() {
  return <I18nProvider><LearnArabicPage /></I18nProvider>;
}
