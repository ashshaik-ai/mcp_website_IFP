"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { Simulator } from "@/components/sim/Simulator";
import { LetterScene } from "@/components/sim/scenes/LetterScene";
import { urduLetterSteps } from "@/content/simulations";

import { LessonIndex } from "@/components/learning/LessonIndex";
import { PortalJump } from "@/components/learning/PortalJump";
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
  lessons: { te: "పాఠాలు", en: "Lessons" },
  free: { te: "ఉచితం", en: "Free" },
  urdu_alphabet: { te: "ఉర్దూ అక్షరమాల", en: "Urdu Alphabet" },
  click_to_hear: { te: "నొక్కండి వినడానికి 🔊", en: "Click to hear 🔊" },
  urdu_word_of_the_day: { te: "నేటి ఉర్దూ పదం", en: "Urdu Word of the Day" },
  listen: { te: "వినండి", en: "Listen" },
} as const;





function LearnUrduPage() {
  const { lang } = useI18n();
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
      <PortalJump portal="learn-urdu" />

      <section className="bg-gradient-to-br from-[var(--if-green-mid)] to-[var(--if-green)] text-[var(--if-gold-pale)] py-20 px-4">
        <div className="mx-auto max-w-4xl text-center flex flex-col items-center gap-5">
          <BlurFade delay={0.05}>
            <Link href="/knowledge-center" className="inline-flex items-center min-h-11 gap-1 text-sm text-[var(--if-gold-pale)]/80 hover:text-[var(--if-gold-light)] transition-colors mb-2">
              <ChevronLeft className="h-4 w-4" />{copy.knowledge_center[lang]}
            </Link>
          </BlurFade>
          <BlurFade delay={0.1}>
            <span className="text-4xl text-[var(--if-gold-light)]" style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }} dir="rtl">اردو سیکھیں</span>
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
            {[{ n: "39", l: copy.letters[lang] }, { n: "6", l: copy.lessons[lang] }, { n: "∞", l: copy.free[lang] }].map(({ n, l }) => (
              <div key={l} className="px-4 py-2.5 rounded-xl bg-white/5 border border-[var(--if-gold)]/20 text-center min-w-[70px]">
                <div className="font-display text-xl font-bold text-[var(--if-gold-light)]">{n}</div>
                <div className="text-xs text-[var(--if-gold-pale)]/80">{l}</div>
              </div>
            ))}
          </BlurFade>
        </div>
      </section>

      {/* Alphabet grid */}
      <section className="if-defer py-16 px-4 bg-[var(--if-cream-light)]">
        <div className="mx-auto max-w-5xl">
          <BlurFade delay={0.1}>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--if-green)] text-center mb-2">
              {copy.urdu_alphabet[lang]}
            </h2>
            <p className="text-center text-sm text-[var(--if-text-muted)] mb-8">
              {copy.click_to_hear[lang]}
            </p>
          </BlurFade>
          <AlphabetGrid letters={urduLetters} script="urdu" />
        </div>
      </section>


      {/* Word of the day */}
      <section className="if-defer py-16 px-4 bg-[var(--if-green)]">
        <div className="mx-auto max-w-md text-center">
          <BlurFade delay={0.1}>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--if-gold-light)] mb-8">{copy.urdu_word_of_the_day[lang]}</h2>
            <div className="relative overflow-hidden bg-white/5 border border-[var(--if-gold)]/20 rounded-2xl p-8">
              <BorderBeam size={200} duration={10} colorFrom="#c8922a" colorTo="#e8b84b" />
              <div className="text-5xl text-[var(--if-gold-light)] mb-2 leading-relaxed" style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }} dir="rtl">{w.glyph}</div>
              <div className="text-[var(--if-gold-light)] font-semibold">{w.translit}</div>
              <div className="text-[var(--if-gold-pale)]/70 text-sm mt-1">{w.meaning[lang]}</div>
              <button onClick={() => speak(w.glyph)} className="inline-flex min-h-11 items-center gap-2 mx-auto mt-4 px-4 rounded-full bg-[var(--if-gold)]/15 text-[var(--if-gold-light)] text-sm hover:bg-[var(--if-gold)]/25 transition-colors border border-[var(--if-gold)]/30">
                <Volume2 className="h-4 w-4" />{copy.listen[lang]}
              </button>
              <div className="flex justify-center gap-3 mt-5">
                <button type="button" aria-label={lang === "te" ? "మునుపటి పదం" : "Previous word"} onClick={() => setWordIdx((i) => (i - 1 + urduWords.length) % urduWords.length)} className="size-11 inline-flex items-center justify-center rounded-full border border-[var(--if-gold)]/30 hover:bg-white/10"><ChevronLeft className="h-4 w-4 text-[var(--if-gold-pale)]" /></button>
                <span className="self-center text-xs text-[var(--if-gold-pale)]/80">{wordIdx + 1}/{urduWords.length}</span>
                <button type="button" aria-label={lang === "te" ? "తదుపరి పదం" : "Next word"} onClick={() => setWordIdx((i) => (i + 1) % urduWords.length)} className="size-11 inline-flex items-center justify-center rounded-full border border-[var(--if-gold)]/30 hover:bg-white/10"><ChevronRight className="h-4 w-4 text-[var(--if-gold-pale)]" /></button>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      <section id="vocabulary" className="if-defer py-16 px-4 scroll-mt-32">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--if-green)] mb-2">
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
      {/* ── Simulator ── */}
      <section className="py-16 px-4 ">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--if-green)] text-center mb-8">{lang === "te" ? "చూడండి" : "Watch"}</h2>
          <Simulator steps={urduLetterSteps} scene={LetterScene} autoplay />
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
