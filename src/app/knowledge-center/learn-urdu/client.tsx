"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { LessonIndex } from "@/components/learning/LessonIndex";
import { AlphabetGrid } from "@/components/learning/AlphabetGrid";
import { LetterReview } from "@/components/learning/LetterReview";
import { VocabularyList } from "@/components/learning/VocabularyList";
import { urduWords, urduPhrases } from "@/content/vocabulary";
import { urduLetters } from "@/content/alphabets";
import { PageShell } from "@/components/layout/PageShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { ChevronLeft, ChevronRight, Volume2 } from "lucide-react";

/* Bilingual copy for this file, hoisted out of the JSX so a translator
   can read and review it as one unit. */
const copy = {
  knowledge_center: { te: "జ్ఞాన కేంద్రం", en: "Knowledge Center" },
  learn_urdu: { te: "ఉర్దూ నేర్చుకోండి", en: "Learn Urdu" },
  language_of_islamic_literature_and: { te: "ఇస్లామిక్ సాహిత్యం మరియు ఖురాన్ అనువాదాల భాష — ఉర్దూ స్క్రిప్ట్ నేర్చుకోండి", en: "Language of Islamic literature and Quranic translations — learn Urdu script" },
  letters: { te: "అక్షరాలు", en: "Letters" },
  levels: { te: "స్థాయిలు", en: "Levels" },
  free: { te: "ఉచితం", en: "Free" },
  urdu_alphabet: { te: "ఉర్దూ అక్షరమాల", en: "Urdu Alphabet" },
  click_to_hear: { te: "నొక్కండి వినడానికి 🔊", en: "Click to hear 🔊" },
  n_4_level_learning_path: { te: "4-స్థాయి అభ్యాస మార్గం", en: "4-Level Learning Path" },
  coming_soon: { te: "త్వరలో", en: "Coming Soon" },
  urdu_word_of_the_day: { te: "నేటి ఉర్దూ పదం", en: "Urdu Word of the Day" },
  listen: { te: "వినండి", en: "Listen" },
} as const;



const levels = [
  { num: 1, title: { te: "ఉర్దూ అక్షరమాల", en: "Urdu Alphabet" }, urdu: "اردو حروف تہجی", desc: { te: "39 అక్షరాలు — ఉచ్చారణ మరియు వ్రాత", en: "39 letters — pronunciation and writing" }, available: true },
  { num: 2, title: { te: "ఉర్దూ పదాలు", en: "Urdu Words" }, urdu: "اردو الفاظ", desc: { te: "ప్రాథమిక ఇస్లామిక్ మరియు నిత్య జీవిత పదాలు", en: "Basic Islamic and everyday words" }, available: true },
  { num: 3, title: { te: "ఉర్దూ వాక్యాలు", en: "Urdu Sentences" }, urdu: "اردو جملے", desc: { te: "సాధారణ సంభాషణ మరియు ఇస్లామిక్ ప్రార్థనలు", en: "Common conversation and Islamic supplications" }, available: false },
  { num: 4, title: { te: "ఖురాన్ ఉర్దూ అనువాదం", en: "Quranic Urdu Translation" }, urdu: "قرآنی اردو", desc: { te: "ఖురాన్ అనువాదాన్ని ఉర్దూలో చదవండి", en: "Read the Quran translation in Urdu" }, available: false },
];



function LearnUrduPage() {
  const { lang } = useI18n();
  const [openLevel, setOpenLevel] = useState<number | null>(1);
  const [wordIdx, setWordIdx] = useState(0);

  const speak = useCallback((text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "ur-PK";
    utter.rate = 0.7;
    window.speechSynthesis.speak(utter);
  }, []);

  const w = urduWords[wordIdx];

  return (
    <PageShell>

      <section className="bg-gradient-to-br from-blue-900 to-[var(--if-green)] text-[var(--if-gold-pale)] py-20 px-4">
        <div className="mx-auto max-w-4xl text-center flex flex-col items-center gap-5">
          <BlurFade delay={0.05}>
            <Link href="/knowledge-center" className="inline-flex items-center min-h-9 gap-1 text-sm text-[var(--if-gold-pale)]/80 hover:text-[var(--if-gold-light)] transition-colors mb-2">
              <ChevronLeft className="h-4 w-4" />{copy.knowledge_center[lang]}
            </Link>
          </BlurFade>
          <BlurFade delay={0.1}>
            <span className="text-4xl text-[var(--if-gold-light)]" style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }} dir="rtl">سیکھیں اردو</span>
          </BlurFade>
          <BlurFade delay={0.15}>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-[var(--if-gold-light)]">
              {copy.learn_urdu[lang]}
            </h1>
          </BlurFade>
          <BlurFade delay={0.2}>
            <p className="text-[var(--if-gold-pale)]/70 max-w-xl">
              {copy.language_of_islamic_literature_and[lang]}
            </p>
          </BlurFade>
          <BlurFade delay={0.25} className="flex gap-4 flex-wrap justify-center">
            {[{ n: "39", l: copy.letters[lang] }, { n: "4", l: copy.levels[lang] }, { n: "∞", l: copy.free[lang] }].map(({ n, l }) => (
              <div key={l} className="px-4 py-2.5 rounded-xl bg-white/5 border border-[var(--if-gold)]/20 text-center min-w-[70px]">
                <div className="font-display text-xl font-bold text-[var(--if-gold-light)]">{n}</div>
                <div className="text-xs text-[var(--if-gold-pale)]/80">{l}</div>
              </div>
            ))}
          </BlurFade>
        </div>
      </section>

      {/* Alphabet grid */}
      <section className="py-16 px-4 bg-[var(--if-cream-light)]">
        <div className="mx-auto max-w-5xl">
          <BlurFade delay={0.1}>
            <h2 className="font-display text-3xl font-bold text-[var(--if-green)] text-center mb-2">
              {copy.urdu_alphabet[lang]}
            </h2>
            <p className="text-center text-sm text-[var(--if-text-muted)] mb-8">
              {copy.click_to_hear[lang]}
            </p>
          </BlurFade>
          <AlphabetGrid letters={urduLetters} script="urdu" />
        </div>
      </section>

      {/* Levels */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-3xl">
          <BlurFade delay={0.1}>
            <h2 className="font-display text-3xl font-bold text-[var(--if-green)] text-center mb-8">
              {copy.n_4_level_learning_path[lang]}
            </h2>
          </BlurFade>
          <div className="space-y-3">
            {levels.map((lv) => (
              <BlurFade key={lv.num} delay={0.07 * lv.num}>
                <div className="bg-white rounded-2xl border border-[var(--if-gold)]/15 overflow-hidden">
                  <button
                    onClick={() => setOpenLevel(openLevel === lv.num ? null : lv.num)}
                    className="w-full flex items-center gap-4 p-5 text-left hover:bg-[var(--if-cream-light)] transition-colors"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${lv.available ? "bg-[var(--if-green)] text-[var(--if-gold-light)]" : "bg-[var(--if-gold)]/20 text-[var(--if-text-muted)]"}`}>{lv.num}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-[var(--if-green)]">{lv.title[lang]}</span>
                        <span className="text-sm text-[var(--if-gold-light)]" style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }} dir="rtl">{lv.urdu}</span>
                        {!lv.available && <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200 font-semibold">{copy.coming_soon[lang]}</span>}
                      </div>
                      <p className="text-sm text-[var(--if-text-muted)]">{lv.desc[lang]}</p>
                    </div>
                    <ChevronRight className={`h-4 w-4 text-[var(--if-gold-light)] flex-shrink-0 transition-transform ${openLevel === lv.num ? "rotate-90" : ""}`} />
                  </button>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Word of the day */}
      <section className="py-16 px-4 bg-[var(--if-green)]">
        <div className="mx-auto max-w-md text-center">
          <BlurFade delay={0.1}>
            <h2 className="font-display text-2xl font-bold text-[var(--if-gold-light)] mb-8">{copy.urdu_word_of_the_day[lang]}</h2>
            <div className="relative overflow-hidden bg-white/5 border border-[var(--if-gold)]/20 rounded-2xl p-8">
              <BorderBeam size={200} duration={10} colorFrom="#c8922a" colorTo="#e8b84b" />
              <div className="text-5xl text-[var(--if-gold-light)] mb-2 leading-relaxed" style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }} dir="rtl">{w.glyph}</div>
              <div className="text-[var(--if-gold-light)] font-semibold">{w.translit}</div>
              <div className="text-[var(--if-gold-pale)]/70 text-sm mt-1">{w.meaning[lang]}</div>
              <button onClick={() => speak(w.glyph)} className="flex items-center gap-2 mx-auto mt-4 px-4 py-2 rounded-full bg-[var(--if-gold)]/15 text-[var(--if-gold-light)] text-sm hover:bg-[var(--if-gold)]/25 transition-colors border border-[var(--if-gold)]/30">
                <Volume2 className="h-4 w-4" />{copy.listen[lang]}
              </button>
              <div className="flex justify-center gap-3 mt-5">
                <button type="button" aria-label={lang === "te" ? "మునుపటి పదం" : "Previous word"} onClick={() => setWordIdx((i) => (i - 1 + urduWords.length) % urduWords.length)} className="p-2 rounded-full border border-[var(--if-gold)]/30 hover:bg-white/10"><ChevronLeft className="h-4 w-4 text-[var(--if-gold-pale)]" /></button>
                <span className="self-center text-xs text-[var(--if-gold-pale)]/80">{wordIdx + 1}/{urduWords.length}</span>
                <button type="button" aria-label={lang === "te" ? "తదుపరి పదం" : "Next word"} onClick={() => setWordIdx((i) => (i + 1) % urduWords.length)} className="p-2 rounded-full border border-[var(--if-gold)]/30 hover:bg-white/10"><ChevronRight className="h-4 w-4 text-[var(--if-gold-pale)]" /></button>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      <section id="vocabulary" className="py-16 px-4 scroll-mt-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-2xl font-bold text-[var(--if-green)] mb-2">
            {lang === "te" ? "పదజాలం" : "Vocabulary"}
          </h2>
          <p className="text-[var(--if-text-muted)] mb-6 text-pretty">
            {lang === "te"
              ? "ప్రతి పదానికి అర్థం, ఉచ్చారణ మరియు అది ఎందుకు ముఖ్యమో వివరణ."
              : "Every word with its meaning, pronunciation, and why it matters."}
          </p>
          <VocabularyList words={urduWords} phrases={urduPhrases} script="urdu" />
        </div>
      </section>

      <LessonIndex portal="learn-urdu" />

      <LetterReview script="urdu" letters={urduLetters} words={urduWords} />

    </PageShell>
  );
}

export default function LearnUrdu() {
  return <LearnUrduPage />;
}
