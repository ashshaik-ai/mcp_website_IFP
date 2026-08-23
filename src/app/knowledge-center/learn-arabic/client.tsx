"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { quizOrder } from "@/lib/quiz-order";
import { useI18n } from "@/lib/i18n/context";
import { Simulator } from "@/components/sim/Simulator";
import { LetterScene } from "@/components/sim/scenes/LetterScene";
import { arabicLetterSteps } from "@/content/simulations";

import { LessonIndex } from "@/components/learning/LessonIndex";
import { PortalJump } from "@/components/learning/PortalJump";
import { AlphabetGrid } from "@/components/learning/AlphabetGrid";
import { LetterReview } from "@/components/learning/LetterReview";
import { VocabularyList } from "@/components/learning/VocabularyList";
import { arabicWords, arabicPhrases } from "@/content/vocabulary";
import { arabicLetters } from "@/content/alphabets";
import { arabicExtras } from "@/content/arabic-extras";
import { PageShell } from "@/components/layout/PageShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { ChevronLeft, ChevronRight, Volume2, X } from "lucide-react";

/* Bilingual copy for this file, hoisted out of the JSX so a translator
   can read and review it as one unit. */
const copy = {
  knowledge_center: { te: "జ్ఞాన కేంద్రం", en: "Knowledge Center" },
  learn_arabic: { te: "అరబిక్ నేర్చుకోండి", en: "Learn Arabic" },
  from_alphabet_to_quranic_arabic: { te: "అక్షరమాల నుండి ఖురానిక్ అరబిక్ వరకు — నిర్మాణాత్మక అభ్యాస మార్గం", en: "From alphabet to Quranic Arabic — structured learning roadmap" },
  levels: { te: "స్థాయిలు", en: "Levels" },
  lessons: { te: "పాఠాలు", en: "Lessons" },
  letters: { te: "అక్షరాలు", en: "Letters" },
  free: { te: "ఉచితం", en: "Free" },
  why_learn_arabic: { te: "అరబిక్ ఎందుకు నేర్చుకోవాలి?", en: "Why Learn Arabic?" },
  arabic_alphabet_28_huroof: { te: "అరబిక్ అక్షరమాల — 28 హురూఫ్", en: "Arabic Alphabet — 28 Huroof" },
  click_any_letter_to_hear: { te: "ప్రతి అక్షరాన్ని నొక్కండి వినడానికి · 🔊 ఆడియో ఉచ్చారణ", en: "Click any letter to hear it · 🔊 Audio pronunciation" },
  sun_letters_14: { te: "సూర్య అక్షరాలు (14)", en: "Sun letters (14)" },
  moon_letters_14: { te: "చంద్ర అక్షరాలు (14)", en: "Moon letters (14)" },
  listen: { te: "వినండి", en: "Listen" },
  sun_letter: { te: "☀️ సూర్య అక్షరం", en: "☀️ Sun Letter" },
  moon_letter: { te: "🌙 చంద్ర అక్షరం", en: "🌙 Moon Letter" },
  letter_forms_4_positions: { te: "అక్షర రూపాలు (4 స్థానాలు)", en: "Letter Forms (4 Positions)" },
  isolated: { te: "ఏకాంత", en: "Isolated" },
  initial: { te: "ప్రారంభ", en: "Initial" },
  medial: { te: "మధ్య", en: "Medial" },
  final: { te: "చివర", en: "Final" },
  word_of_the_day: { te: "నేటి పదం", en: "Word of the Day" },
  letter_flashcards: { te: "అక్షర ఫ్లాష్ కార్డులు", en: "Letter Flashcards" },
  recognise_the_letter_tap_to: { te: "అక్షరాన్ని చూసి గుర్తించండి — తిప్పి పేరు చూడండి", en: "Recognise the letter — tap to flip and see its name" },
  tap_to_flip: { te: "తిప్పడానికి తాకండి", en: "Tap to flip" },
  arabic_quiz: { te: "అరబిక్ క్విజ్", en: "Arabic Quiz" },
  check_what_you_know_across: { te: "వర్ణమాల, హరకాత్, పదజాలంపై మీకు తెలిసింది పరీక్షించుకోండి", en: "Check what you know across the alphabet, harakat and vocabulary" },
  excellent_you_know_your_arabic: { te: "అద్భుతం! మీకు అరబిక్ బాగా తెలుసు.", en: "Excellent! You know your Arabic well." },
  keep_practising_repetition_is_the: { te: "మళ్ళీ ప్రయత్నించండి — అభ్యాసమే విజయం.", en: "Keep practising — repetition is the key." },
  try_again: { te: "మళ్ళీ ప్రయత్నించు", en: "Try Again" },
  next_question: { te: "తదుపరి ప్రశ్న →", en: "Next Question →" },
  see_results: { te: "ఫలితాలు చూడు", en: "See Results" },
} as const;

/* ─── Data ─── */
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



const whyLearn = [
  { ar: "وَقُرْآنًا عَرَبِيًّا", title: { te: "ఖురాన్‌ను అర్థం చేసుకోండి", en: "Understand the Quran" }, desc: { te: "దివ్య గ్రంథం అరబిక్‌లో అవతరించింది — నేరుగా అర్థం చేసుకోండి", en: "The divine book was revealed in Arabic — understand it directly" } },
  { ar: "قَدْ أَفْلَحَ الْمُؤْمِنُونَ", title: { te: "నమాజ్‌ను సుసంపన్నం చేయండి", en: "Enrich Your Salah" }, desc: { te: "మీరు చదివేది అర్థమైనప్పుడు నమాజ్ లోతుగా భావించబడుతుంది", en: "Prayer deepens when you understand what you recite" } },
  { ar: "طَلَبُ الْعِلْمِ فَرِيضَةٌ", title: { te: "ఇస్లామిక్ జ్ఞానాన్ని తెరవండి", en: "Unlock Islamic Knowledge" }, desc: { te: "1400 సంవత్సరాల విద్వత్ అరబిక్‌లో ఉంది — దానిలోకి ప్రవేశించండి", en: "1400 years of scholarship is in Arabic — access it directly" } },
];

/* Every question here was authored with ans: 0 and the options render in
   array order, so the first option was always right — 5/5 without reading the
   portal. Same defect the lesson quizzes had; same fix. */
const quizQuestions = [
  { q: { te: "అరబిక్ వర్ణమాలలో ఎన్ని అక్షరాలు ఉన్నాయి?", en: "How many letters are in the Arabic alphabet?" }, opts: [{ te: "28", en: "28" }, { te: "26", en: "26" }, { te: "39", en: "39" }], ans: 0 },
  { q: { te: "అరబిక్ ఏ దిశలో రాస్తారు?", en: "In which direction is Arabic written?" }, opts: [{ te: "కుడి నుండి ఎడమకు", en: "Right to left" }, { te: "ఎడమ నుండి కుడికి", en: "Left to right" }, { te: "పై నుండి కిందకు", en: "Top to bottom" }], ans: 0 },
  { q: { te: "ఫత్‌హా, కస్రా, దమ్మా దేన్ని సూచిస్తాయి?", en: "What do fatha, kasra and damma represent?" }, opts: [{ te: "హ్రస్వ అచ్చులు", en: "Short vowels" }, { te: "అక్షరాలు", en: "Letters" }, { te: "సంఖ్యలు", en: "Numbers" }], ans: 0 },
  { q: { te: "చాలా అరబిక్ పదాలు ఎన్ని అక్షరాల మూలాల నుండి ఏర్పడతాయి?", en: "Most Arabic words are built from roots of how many letters?" }, opts: [{ te: "మూడు", en: "Three" }, { te: "రెండు", en: "Two" }, { te: "ఐదు", en: "Five" }], ans: 0 },
  { q: { te: "ఖురాన్ శాస్త్రీయ అరబిక్‌ను ఏమంటారు?", en: "The classical Arabic of the Quran is called?" }, opts: [{ te: "ఫుస్‌హా", en: "Fus-ha" }, { te: "మాండలికం", en: "A dialect" }, { te: "వాడుక భాష", en: "Slang" }], ans: 0 },
];

type Letter = typeof alphabet[0];

function LearnArabicPage() {
  const { lang } = useI18n();
  const [wordIdx, setWordIdx] = useState(0);
  const [selected, setSelected] = useState<Letter | null>(null);
  const [fcIdx, setFcIdx] = useState(0);
  const [fcFlipped, setFcFlipped] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);
  const quizOrders = useMemo(
    () => quizQuestions.map((q) => quizOrder(q.q.en, q.opts.length, q.ans)),
    [],
  );
  const [quizAns, setQuizAns] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  const speak = useCallback((text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "ar-SA";
    utter.rate = 0.65;
    window.speechSynthesis.speak(utter);
  }, []);

  const w = arabicWords[wordIdx];

  return (
    <PageShell>
      <PortalJump portal="learn-arabic" />

      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-900 to-[var(--if-green)] text-[var(--if-gold-pale)] py-20 px-4">
        <div className="mx-auto max-w-4xl text-center flex flex-col items-center gap-5">
          <BlurFade delay={0.05}>
            <Link href="/knowledge-center" className="inline-flex items-center min-h-11 gap-1 text-sm text-[var(--if-gold-pale)]/80 hover:text-[var(--if-gold-light)] transition-colors mb-2">
              <ChevronLeft className="h-4 w-4" />
              {copy.knowledge_center[lang]}
            </Link>
          </BlurFade>
          <BlurFade delay={0.1}>
            <span className="font-arabic text-4xl text-[var(--if-gold-light)]" dir="rtl">تعلُّم العربية</span>
          </BlurFade>
          <BlurFade delay={0.15}>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-[var(--if-gold-light)]">
              {copy.learn_arabic[lang]}
            </h1>
          </BlurFade>
          <BlurFade delay={0.2}>
            <p className="text-[var(--if-gold-pale)]/70 max-w-xl">
              {copy.from_alphabet_to_quranic_arabic[lang]}
            </p>
          </BlurFade>
          <BlurFade delay={0.25} className="flex gap-4 flex-wrap justify-center text-sm">
            {[
              { n: "6", l: copy.lessons[lang] },
              { n: "28", l: copy.letters[lang] },
              { n: "∞", l: copy.free[lang] },
            ].map(({ n, l }) => (
              <div key={l} className="px-4 py-2.5 rounded-xl bg-white/5 border border-[var(--if-gold)]/20 text-center min-w-[70px]">
                <div className="font-display text-xl font-bold text-[var(--if-gold-light)]">{n}</div>
                <div className="text-xs text-[var(--if-gold-pale)]/80">{l}</div>
              </div>
            ))}
          </BlurFade>
        </div>
      </section>

      {/* Why learn */}
      <section className="if-defer py-16 px-4 bg-[var(--if-cream-light)]">
        <div className="mx-auto max-w-5xl">
          <BlurFade delay={0.1}>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--if-green)] text-center mb-10">
              {copy.why_learn_arabic[lang]}
            </h2>
          </BlurFade>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyLearn.map((item, i) => (
              <BlurFade key={i} delay={0.08 * i}>
                <div className="relative overflow-hidden bg-white rounded-2xl border border-[var(--if-gold)]/20 p-6 text-center hover:border-[var(--if-gold)]/40 transition-colors group">
                  <BorderBeam size={80} duration={6} colorFrom="#c8922a" colorTo="#c8922a" className="opacity-0 group-hover:opacity-100" />
                  <div className="font-arabic text-2xl text-[var(--if-gold-light)] mb-4 leading-relaxed" dir="rtl">{item.ar}</div>
                  <h3 className="font-semibold text-[var(--if-green)] mb-2">{item.title[lang]}</h3>
                  <p className="text-sm text-[var(--if-text-muted)]">{item.desc[lang]}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Alphabet — interactive grid */}
      <section className="if-defer py-16 px-4">
        <div className="mx-auto max-w-5xl">
          <BlurFade delay={0.1}>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--if-green)] text-center mb-2">
              {copy.arabic_alphabet_28_huroof[lang]}
            </h2>
            <p className="text-center text-[var(--if-text-muted)] mb-3 text-sm">
              {copy.click_any_letter_to_hear[lang]}
            </p>
            <div className="flex justify-center gap-4 text-xs mb-8">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />{copy.sun_letters_14[lang]}</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[var(--if-green)] inline-block" />{copy.moon_letters_14[lang]}</span>
            </div>
          </BlurFade>

          {/* RTL alphabet grid */}
          <AlphabetGrid letters={arabicLetters} script="arabic" extras={arabicExtras} />

          {/* Selected letter detail */}
          {selected && (
            <BlurFade delay={0.05}>
              <div className="relative overflow-hidden mt-8 bg-white rounded-2xl border border-[var(--if-gold)]/30 p-6 shadow-lg">
                <BorderBeam size={200} duration={8} colorFrom="#c8922a" colorTo="#c8922a" />
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
                      className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--if-gold)]/10 text-[var(--if-gold-light)] text-xs font-semibold hover:bg-[var(--if-gold)]/20 transition-colors border border-[var(--if-gold)]/30"
                    >
                      <Volume2 className="h-3.5 w-3.5" />
                      {copy.listen[lang]}
                    </button>
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap mb-4">
                      <h3 className="font-display text-2xl font-bold text-[var(--if-green)]">{selected.name}</h3>
                      <span className="text-sm text-[var(--if-text-muted)]">/{selected.en}/</span>
                      <span className="text-sm text-[var(--if-text-muted)]">{selected.te}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${selected.sun ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-emerald-50 text-emerald-700 border-emerald-200"}`}>
                        {selected.sun ? (copy.sun_letter[lang]) : (copy.moon_letter[lang])}
                      </span>
                    </div>

                    {/* Forms table */}
                    <div className="mb-4">
                      <p className="text-xs font-bold text-[var(--if-text-muted)] uppercase tracking-wider mb-2">
                        {copy.letter_forms_4_positions[lang]}
                      </p>
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          { pos: copy.isolated[lang], word: selected.ar },
                          { pos: copy.initial[lang],  word: selected.ar + "ـ" },
                          { pos: copy.medial[lang],    word: "ـ" + selected.ar + "ـ" },
                          { pos: copy.final[lang],     word: "ـ" + selected.ar },
                        ].map(({ pos, word }) => (
                          <div key={pos} className="flex flex-col items-center p-2 rounded-lg bg-[var(--if-cream-light)] border border-[var(--if-gold)]/10">
                            <span className="font-arabic text-xl text-[var(--if-green)]" dir="rtl">{word}</span>
                            <span className="text-[9px] text-[var(--if-text-muted)] mt-1">{pos}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Example word */}
                    <div className="flex items-center gap-4 p-3 rounded-xl bg-[var(--if-cream-light)] border border-[var(--if-gold)]/20">
                      <button
                        onClick={() => speak(selected.example.ar)}
                        className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--if-gold)]/10 flex items-center justify-center hover:bg-[var(--if-gold)]/20 transition-colors"
                      >
                        <Volume2 className="h-3.5 w-3.5 text-[var(--if-gold-ink)]" />
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


      {/* Word of the Day */}
      <section className="if-defer py-16 px-4">
        <div className="mx-auto max-w-md">
          <BlurFade delay={0.1}>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--if-green)] text-center mb-8">
              {copy.word_of_the_day[lang]}
            </h2>
            <div className="relative overflow-hidden bg-[var(--if-green)] rounded-2xl p-8 text-center text-[var(--if-gold-pale)]">
              <BorderBeam size={200} duration={10} colorFrom="#c8922a" colorTo="#e8b84b" />
              <div className="font-arabic text-6xl text-[var(--if-gold-light)] mb-2 leading-relaxed" dir="rtl">{w.glyph}</div>
              <div className="text-[var(--if-gold-ink)] font-semibold mb-1">{w.translit}</div>
              <div className="text-[var(--if-gold-pale)]/70 text-sm mb-1">{w.meaning[lang]}</div>
              <div className="text-[var(--if-gold-pale)]/80 text-sm mb-5 text-pretty">{w.note[lang]}</div>
              <button
                onClick={() => speak(w.glyph)}
                className="flex items-center gap-2 mx-auto px-4 py-2 rounded-full bg-[var(--if-gold)]/15 text-[var(--if-gold-light)] text-sm font-medium hover:bg-[var(--if-gold)]/25 transition-colors border border-[var(--if-gold)]/30 mb-5"
              >
                <Volume2 className="h-4 w-4" />
                {copy.listen[lang]}
              </button>
              <div className="flex justify-center gap-3">
                <button
                  type="button"
                  aria-label={lang === "te" ? "మునుపటి పదం" : "Previous word"}
                  onClick={() => setWordIdx((i) => (i - 1 + arabicWords.length) % arabicWords.length)}
                  className="size-11 inline-flex items-center justify-center rounded-full border border-[var(--if-gold)]/30 hover:bg-white/10 transition-colors"
                >
                  <ChevronLeft aria-hidden="true" className="h-4 w-4 text-[var(--if-gold-pale)]" />
                </button>
                <span className="self-center text-xs text-[var(--if-gold-pale)]/80">{wordIdx + 1}/{arabicWords.length}</span>
                <button
                  type="button"
                  aria-label={lang === "te" ? "తదుపరి పదం" : "Next word"}
                  onClick={() => setWordIdx((i) => (i + 1) % arabicWords.length)}
                  className="size-11 inline-flex items-center justify-center rounded-full border border-[var(--if-gold)]/30 hover:bg-white/10 transition-colors"
                >
                  <ChevronRight aria-hidden="true" className="h-4 w-4 text-[var(--if-gold-pale)]" />
                </button>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* ── VOCABULARY ── */}
      <section id="vocabulary" className="if-defer py-16 px-4 scroll-mt-32">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--if-green)] mb-2">
            {lang === "te" ? "పదజాలం" : "Vocabulary"}
          </h2>
          <p className="text-[var(--if-text-muted)] mb-6 text-pretty">
            {lang === "te"
              ? "ప్రతి పదానికి అర్థం, ఉచ్చారణ మరియు అది ఖురాన్‌లో ఎందుకు ముఖ్యమో వివరణ."
              : "Every word with its meaning, pronunciation, and why it matters in the Quran."}
          </p>
          <VocabularyList words={arabicWords} phrases={arabicPhrases} script="arabic" />
        </div>
      </section>

      {/* ── FLASHCARDS ── */}
      <section className="if-defer py-16 px-4 bg-[var(--if-cream-light)]">
        <div className="mx-auto max-w-md">
          <BlurFade delay={0.1}>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--if-green)] text-center mb-1">
              {copy.letter_flashcards[lang]}
            </h2>
            <p className="text-sm text-[var(--if-text-muted)] text-center mb-8">
              {copy.recognise_the_letter_tap_to[lang]}
            </p>
            <div
              className="relative overflow-hidden bg-[var(--if-green)] rounded-3xl p-10 text-center cursor-pointer select-none min-h-[180px] flex items-center justify-center"
              onClick={() => setFcFlipped(f => !f)}
            >
              <BorderBeam size={200} duration={10} colorFrom="#c8922a" colorTo="#e8b84b" />
              {!fcFlipped ? (
                <span className="font-arabic text-8xl text-[var(--if-gold-light)]" dir="rtl">{alphabet[fcIdx].ar}</span>
              ) : (
                <div className="text-[var(--if-gold-pale)]">
                  <div className="font-arabic text-5xl text-[var(--if-gold-light)] mb-3" dir="rtl">{alphabet[fcIdx].ar}</div>
                  <div className="text-2xl font-bold mb-1">{alphabet[fcIdx].name}</div>
                  <div className="text-lg text-[var(--if-gold-light)] mb-0.5">/{alphabet[fcIdx].en}/</div>
                  <div className="text-sm text-[var(--if-gold-pale)]/70 mb-3">{alphabet[fcIdx].te}</div>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${alphabet[fcIdx].sun ? "bg-amber-400/30 text-amber-200" : "bg-emerald-400/20 text-emerald-200"}`}>
                    {alphabet[fcIdx].sun ? (copy.sun_letter[lang]) : (copy.moon_letter[lang])}
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between mt-4">
              <button
                type="button"
                aria-label={lang === "te" ? "మునుపటి కార్డు" : "Previous card"}
                onClick={() => { setFcIdx(i => (i - 1 + alphabet.length) % alphabet.length); setFcFlipped(false); }}
                className="p-2.5 rounded-full border border-[var(--if-gold)]/30 hover:bg-white transition-colors"
              >
                <ChevronLeft aria-hidden="true" className="h-4 w-4 text-[var(--if-green)]" />
              </button>
              <span className="text-xs text-[var(--if-text-muted)]">
                {fcIdx + 1} / {alphabet.length} · {copy.tap_to_flip[lang]}
              </span>
              <button
                type="button"
                aria-label={lang === "te" ? "తదుపరి కార్డు" : "Next card"}
                onClick={() => { setFcIdx(i => (i + 1) % alphabet.length); setFcFlipped(false); }}
                className="p-2.5 rounded-full border border-[var(--if-gold)]/30 hover:bg-white transition-colors"
              >
                <ChevronRight aria-hidden="true" className="h-4 w-4 text-[var(--if-green)]" />
              </button>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* ── QUIZ ── */}
      <section className="if-defer py-16 px-4">
        <div className="mx-auto max-w-lg">
          <BlurFade delay={0.1}>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--if-green)] text-center mb-1">
              {copy.arabic_quiz[lang]}
            </h2>
            <p className="text-sm text-[var(--if-text-muted)] text-center mb-8">
              {copy.check_what_you_know_across[lang]}
            </p>
            {quizDone ? (
              <div className="text-center p-8 bg-[var(--if-cream-light)] rounded-2xl border border-[var(--if-gold)]/20">
                <div className="text-5xl mb-4">{quizScore >= 4 ? "🌟" : quizScore >= 3 ? "✅" : "📖"}</div>
                <p className="font-bold text-[var(--if-green)] text-xl mb-2">
                  {lang === "te" ? `${quizScore}/${quizQuestions.length} సరైనవి!` : `${quizScore}/${quizQuestions.length} correct!`}
                </p>
                <p className="text-sm text-[var(--if-text-muted)] mb-6">
                  {quizScore >= 4
                    ? (copy.excellent_you_know_your_arabic[lang])
                    : (copy.keep_practising_repetition_is_the[lang])}
                </p>
                <button
                  onClick={() => { setQuizIdx(0); setQuizAns(null); setQuizScore(0); setQuizDone(false); }}
                  className="px-6 py-2.5 rounded-full bg-[var(--if-green)] text-[var(--if-gold-light)] font-semibold text-sm hover:bg-[var(--if-green)]/90 transition-colors"
                >
                  {copy.try_again[lang]}
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-[var(--if-gold)]/20 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-semibold text-[var(--if-gold-ink)] uppercase tracking-wider">
                    {lang === "te" ? `ప్రశ్న ${quizIdx + 1}/${quizQuestions.length}` : `Question ${quizIdx + 1}/${quizQuestions.length}`}
                  </span>
                  <div className="flex gap-1.5">
                    {quizQuestions.map((_, i) => (
                      <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i < quizIdx ? "bg-[var(--if-green)]" : i === quizIdx ? "bg-[var(--if-gold)]" : "bg-gray-200"}`} />
                    ))}
                  </div>
                </div>
                <p className="font-semibold text-[var(--if-text)] mb-5 leading-snug text-base">{quizQuestions[quizIdx].q[lang]}</p>
                <div className="space-y-2">
                  {quizOrders[quizIdx].order.map((originalIdx, i) => {
                    const opt = quizQuestions[quizIdx].opts[originalIdx];
                    const answered = quizAns !== null;
                    const correct = i === quizOrders[quizIdx].answer;
                    const chosen = i === quizAns;
                    return (
                      <button
                        key={i}
                        disabled={answered}
                        onClick={() => { setQuizAns(i); if (i === quizOrders[quizIdx].answer) setQuizScore(s => s + 1); }}
                        className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                          answered
                            ? correct ? "bg-emerald-50 border-emerald-400 text-emerald-700"
                              : chosen ? "bg-red-50 border-red-300 text-red-600"
                              : "bg-gray-50 border-gray-100 text-gray-400"
                            : "border-[var(--if-gold)]/20 hover:border-[var(--if-gold)] hover:bg-[var(--if-cream-light)] text-[var(--if-text)]"
                        }`}
                      >
                        {opt[lang]}
                      </button>
                    );
                  })}
                </div>
                {quizAns !== null && (
                  <button
                    className="mt-5 w-full py-2.5 rounded-full bg-[var(--if-green)] text-[var(--if-gold-light)] font-semibold text-sm hover:bg-[var(--if-green)]/90 transition-colors"
                    onClick={() => {
                      if (quizIdx < quizQuestions.length - 1) { setQuizIdx(i => i + 1); setQuizAns(null); }
                      else setQuizDone(true);
                    }}
                  >
                    {quizIdx < quizQuestions.length - 1
                      ? (copy.next_question[lang])
                      : (copy.see_results[lang])}
                  </button>
                )}
              </div>
            )}
          </BlurFade>
        </div>
      </section>
      {/* ── Simulator ── */}
      <section className="py-16 px-4 ">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--if-green)] text-center mb-8">{lang === "te" ? "చూడండి" : "Watch"}</h2>
          <Simulator steps={arabicLetterSteps} scene={LetterScene} autoplay />
        </div>
      </section>


      <LessonIndex portal="learn-arabic" />

      <LetterReview script="arabic" letters={arabicLetters} words={arabicWords} />

    </PageShell>
  );
}

export default function LearnArabic() {
  return <LearnArabicPage />;
}
