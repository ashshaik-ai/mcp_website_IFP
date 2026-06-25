"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { I18nProvider, useI18n } from "@/lib/i18n/context";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { ChevronLeft, ChevronRight, Volume2 } from "lucide-react";

const urduAlphabet = [
  { ur: "ا", name: "Alif",  roman: "a" }, { ur: "ب", name: "Be",    roman: "b" },
  { ur: "پ", name: "Pe",    roman: "p" }, { ur: "ت", name: "Te",    roman: "t" },
  { ur: "ٹ", name: "Tte",   roman: "ṭ" }, { ur: "ث", name: "Se",    roman: "s" },
  { ur: "ج", name: "Jim",   roman: "j" }, { ur: "چ", name: "Che",   roman: "ch" },
  { ur: "ح", name: "Badi He",roman: "h" },{ ur: "خ", name: "Khe",   roman: "kh" },
  { ur: "د", name: "Dal",   roman: "d" }, { ur: "ڈ", name: "Ddal",  roman: "ḍ" },
  { ur: "ذ", name: "Zal",   roman: "z" }, { ur: "ر", name: "Re",    roman: "r" },
  { ur: "ڑ", name: "Rre",   roman: "ṛ" }, { ur: "ز", name: "Ze",    roman: "z" },
  { ur: "ژ", name: "Zhe",   roman: "zh" },{ ur: "س", name: "Sin",   roman: "s" },
  { ur: "ش", name: "Shin",  roman: "sh" },{ ur: "ص", name: "Suad",  roman: "ṣ" },
  { ur: "ض", name: "Zuad",  roman: "ẓ" }, { ur: "ط", name: "Toe",   roman: "t" },
  { ur: "ظ", name: "Zoe",   roman: "z" }, { ur: "ع", name: "Ain",   roman: "ʿ" },
  { ur: "غ", name: "Ghain", roman: "gh" },{ ur: "ف", name: "Fe",    roman: "f" },
  { ur: "ق", name: "Qaf",   roman: "q" }, { ur: "ک", name: "Kaf",   roman: "k" },
  { ur: "گ", name: "Gaf",   roman: "g" }, { ur: "ل", name: "Lam",   roman: "l" },
  { ur: "م", name: "Mim",   roman: "m" }, { ur: "ن", name: "Nun",   roman: "n" },
  { ur: "ں", name: "Noon Ghunna", roman: "ñ" },{ ur: "و", name: "Wao", roman: "w/v" },
  { ur: "ہ", name: "Choti He", roman: "h" },{ ur: "ھ", name: "Do Chashmi He", roman: "h" },
  { ur: "ء", name: "Hamza", roman: "'" }, { ur: "ی", name: "Ye",    roman: "y/ī" },
  { ur: "ے", name: "Bari Ye", roman: "e/ai" },
];

const levels = [
  { num: 1, title: { te: "ఉర్దూ అక్షరమాల", en: "Urdu Alphabet" }, urdu: "اردو حروف تہجی", desc: { te: "39 అక్షరాలు — ఉచ్చారణ మరియు వ్రాత", en: "39 letters — pronunciation and writing" }, available: true },
  { num: 2, title: { te: "ఉర్దూ పదాలు", en: "Urdu Words" }, urdu: "اردو الفاظ", desc: { te: "ప్రాథమిక ఇస్లామిక్ మరియు నిత్య జీవిత పదాలు", en: "Basic Islamic and everyday words" }, available: true },
  { num: 3, title: { te: "ఉర్దూ వాక్యాలు", en: "Urdu Sentences" }, urdu: "اردو جملے", desc: { te: "సాధారణ సంభాషణ మరియు ఇస్లామిక్ ప్రార్థనలు", en: "Common conversation and Islamic supplications" }, available: false },
  { num: 4, title: { te: "ఖురాన్ ఉర్దూ అనువాదం", en: "Quranic Urdu Translation" }, urdu: "قرآنی اردو", desc: { te: "ఖురాన్ అనువాదాన్ని ఉర్దూలో చదవండి", en: "Read the Quran translation in Urdu" }, available: false },
];

const words = [
  { ur: "اللہ", roman: "Allah", te: "అల్లాహ్", en: "Allah (God)" },
  { ur: "رحمت", roman: "Rahmat", te: "దయ", en: "Mercy" },
  { ur: "نماز", roman: "Namaaz", te: "నమాజ్", en: "Prayer" },
  { ur: "روزہ", roman: "Roza", te: "ఉపవాసం", en: "Fast" },
  { ur: "قرآن", roman: "Quran", te: "ఖురాన్", en: "Quran" },
  { ur: "مسجد", roman: "Masjid", te: "మసీదు", en: "Mosque" },
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

  const w = words[wordIdx];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <section className="bg-gradient-to-br from-blue-900 to-[var(--if-green)] text-[var(--if-gold-pale)] py-20 px-4">
        <div className="mx-auto max-w-4xl text-center flex flex-col items-center gap-5">
          <BlurFade delay={0.05}>
            <Link href="/knowledge-center" className="inline-flex items-center gap-1 text-sm text-[var(--if-gold-pale)]/60 hover:text-[var(--if-gold-light)] transition-colors mb-2">
              <ChevronLeft className="h-4 w-4" />{lang === "te" ? "జ్ఞాన కేంద్రం" : "Knowledge Center"}
            </Link>
          </BlurFade>
          <BlurFade delay={0.1}>
            <span className="text-4xl text-[var(--if-gold)]/70" style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }} dir="rtl">سیکھیں اردو</span>
          </BlurFade>
          <BlurFade delay={0.15}>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-[var(--if-gold-light)]">
              {lang === "te" ? "ఉర్దూ నేర్చుకోండి" : "Learn Urdu"}
            </h1>
          </BlurFade>
          <BlurFade delay={0.2}>
            <p className="text-[var(--if-gold-pale)]/70 max-w-xl">
              {lang === "te"
                ? "ఇస్లామిక్ సాహిత్యం మరియు ఖురాన్ అనువాదాల భాష — ఉర్దూ స్క్రిప్ట్ నేర్చుకోండి"
                : "Language of Islamic literature and Quranic translations — learn Urdu script"}
            </p>
          </BlurFade>
          <BlurFade delay={0.25} className="flex gap-4 flex-wrap justify-center">
            {[{ n: "39", l: lang === "te" ? "అక్షరాలు" : "Letters" }, { n: "4", l: lang === "te" ? "స్థాయిలు" : "Levels" }, { n: "∞", l: lang === "te" ? "ఉచితం" : "Free" }].map(({ n, l }) => (
              <div key={l} className="px-4 py-2.5 rounded-xl bg-white/5 border border-[var(--if-gold)]/20 text-center min-w-[70px]">
                <div className="font-display text-xl font-bold text-[var(--if-gold-light)]">{n}</div>
                <div className="text-xs text-[var(--if-gold-pale)]/60">{l}</div>
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
              {lang === "te" ? "ఉర్దూ అక్షరమాల" : "Urdu Alphabet"}
            </h2>
            <p className="text-center text-sm text-[var(--if-text-muted)] mb-8">
              {lang === "te" ? "నొక్కండి వినడానికి 🔊" : "Click to hear 🔊"}
            </p>
          </BlurFade>
          <div className="grid grid-cols-5 sm:grid-cols-8 gap-2" dir="rtl">
            {urduAlphabet.map((letter) => (
              <button
                key={letter.name}
                onClick={() => speak(letter.name)}
                className="flex flex-col items-center p-2.5 rounded-xl bg-white border border-[var(--if-gold)]/15 hover:border-[var(--if-gold)]/50 hover:bg-[var(--if-cream-light)] transition-all group"
              >
                <span className="text-2xl text-[var(--if-green)] group-hover:text-[var(--if-gold)] transition-colors" style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}>{letter.ur}</span>
                <span className="text-[9px] text-[var(--if-text-muted)] mt-1" dir="ltr">{letter.name}</span>
                <span className="text-[9px] text-[var(--if-gold)]/70" dir="ltr">{letter.roman}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Levels */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-3xl">
          <BlurFade delay={0.1}>
            <h2 className="font-display text-3xl font-bold text-[var(--if-green)] text-center mb-8">
              {lang === "te" ? "4-స్థాయి అభ్యాస మార్గం" : "4-Level Learning Path"}
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
                        <span className="text-sm text-[var(--if-gold)]/70" style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }} dir="rtl">{lv.urdu}</span>
                        {!lv.available && <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200 font-semibold">{lang === "te" ? "త్వరలో" : "Coming Soon"}</span>}
                      </div>
                      <p className="text-sm text-[var(--if-text-muted)]">{lv.desc[lang]}</p>
                    </div>
                    <ChevronRight className={`h-4 w-4 text-[var(--if-gold)]/50 flex-shrink-0 transition-transform ${openLevel === lv.num ? "rotate-90" : ""}`} />
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
            <h2 className="font-display text-2xl font-bold text-[var(--if-gold-light)] mb-8">{lang === "te" ? "నేటి ఉర్దూ పదం" : "Urdu Word of the Day"}</h2>
            <div className="relative overflow-hidden bg-white/5 border border-[var(--if-gold)]/20 rounded-2xl p-8">
              <BorderBeam size={200} duration={10} colorFrom="#c8922a" colorTo="#e8b84b" />
              <div className="text-5xl text-[var(--if-gold-light)] mb-2 leading-relaxed" style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }} dir="rtl">{w.ur}</div>
              <div className="text-[var(--if-gold)] font-semibold">{w.roman}</div>
              <div className="text-[var(--if-gold-pale)]/70 text-sm mt-1">{w.en} · {w.te}</div>
              <button onClick={() => speak(w.ur)} className="flex items-center gap-2 mx-auto mt-4 px-4 py-2 rounded-full bg-[var(--if-gold)]/15 text-[var(--if-gold-light)] text-sm hover:bg-[var(--if-gold)]/25 transition-colors border border-[var(--if-gold)]/30">
                <Volume2 className="h-4 w-4" />{lang === "te" ? "వినండి" : "Listen"}
              </button>
              <div className="flex justify-center gap-3 mt-5">
                <button onClick={() => setWordIdx((i) => (i - 1 + words.length) % words.length)} className="p-2 rounded-full border border-[var(--if-gold)]/30 hover:bg-white/10"><ChevronLeft className="h-4 w-4 text-[var(--if-gold-pale)]" /></button>
                <span className="self-center text-xs text-[var(--if-gold-pale)]/50">{wordIdx + 1}/{words.length}</span>
                <button onClick={() => setWordIdx((i) => (i + 1) % words.length)} className="p-2 rounded-full border border-[var(--if-gold)]/30 hover:bg-white/10"><ChevronRight className="h-4 w-4 text-[var(--if-gold-pale)]" /></button>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function LearnUrdu() {
  return <I18nProvider><LearnUrduPage /></I18nProvider>;
}
