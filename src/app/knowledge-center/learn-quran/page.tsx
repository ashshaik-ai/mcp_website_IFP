"use client";

import { useState } from "react";
import Link from "next/link";
import { I18nProvider, useI18n } from "@/lib/i18n/context";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { ChevronLeft, ChevronRight, ChevronDown, BookOpen, Mic, Brain, Heart } from "lucide-react";

const stages = [
  {
    num: 1,
    icon: BookOpen,
    title: { te: "ప్రాథమిక పఠనం", en: "Basic Reading" },
    arabic: "القراءة الأساسية",
    desc: { te: "ఖురానిక్ లిపి మరియు హరఫ్ల పరిచయం", en: "Quranic script and haroof introduction" },
    color: "bg-emerald-700",
    topics: [
      { te: "అరబిక్ అక్షరమాల పునశ్చరణ", en: "Arabic alphabet review" },
      { te: "హరకాత్ మరియు తన్వీన్", en: "Harakat and Tanween" },
      { te: "మద్ మరియు ఘున్నా", en: "Madd and Ghunna" },
      { te: "వక్ఫ్ సంకేతాలు", en: "Waqf (stop) signs" },
    ],
  },
  {
    num: 2,
    icon: Mic,
    title: { te: "తజ్వీద్", en: "Tajweed" },
    arabic: "علم التجويد",
    desc: { te: "ఖురాన్‌ను సరైన ఉచ్చారణతో చదవడం", en: "Reciting the Quran with correct pronunciation" },
    color: "bg-amber-700",
    topics: [
      { te: "మఖారిజ్ అల్-హురూఫ్ — అక్షర స్థానాలు", en: "Makharij al-Huroof — letter articulation points" },
      { te: "సిఫాత్ — అక్షర లక్షణాలు", en: "Sifat — letter characteristics" },
      { te: "నూన్ సాకిన్ నియమాలు", en: "Rules of Noon Sakin" },
      { te: "మీమ్ సాకిన్ నియమాలు", en: "Rules of Meem Sakin" },
      { te: "మద్ నియమాలు", en: "Rules of Madd" },
      { te: "వక్ఫ్ మరియు ఇబ్తిదా", en: "Waqf and Ibtida" },
      { te: "హమ్జా అల్-వస్ల్ & ఖత్ అ", en: "Hamzah al-Wasl & Qat'a" },
      { te: "లాఫ్జ్ అల్-జలాలా", en: "Lafz al-Jalalah" },
    ],
  },
  {
    num: 3,
    icon: Brain,
    title: { te: "తఫ్సీర్", en: "Tafseer" },
    arabic: "التفسير",
    desc: { te: "ఖురాన్ వచనాలు అర్థం చేసుకోవడం", en: "Understanding the meanings of Quranic verses" },
    color: "bg-blue-800",
    topics: [
      { te: "సూరహ్ ఫాతిహా వివరణ", en: "Tafseer of Surah Al-Fatiha" },
      { te: "చివరి 10 సూరాలు వివరణ", en: "Tafseer of last 10 Surahs" },
      { te: "ఖురాన్ ఇతివృత్తాలు", en: "Quranic themes" },
      { te: "అస్బాబ్ అన్-నుజూల్", en: "Asbab an-Nuzool (context of revelation)" },
    ],
  },
  {
    num: 4,
    icon: Heart,
    title: { te: "హిఫ్జ్", en: "Hifz" },
    arabic: "الحفظ",
    desc: { te: "ఖురాన్ హృదయంలో భద్రపరచడం", en: "Memorising the Quran by heart" },
    color: "bg-purple-800",
    topics: [
      { te: "హిఫ్జ్ టెక్నిక్స్ & రూటీన్", en: "Hifz techniques & daily routine" },
      { te: "జుజ్ అమ్మ — చివరి పారా", en: "Juz Amma — last Para" },
      { te: "రివిజన్ పద్ధతులు", en: "Revision methods" },
      { te: "ముతశాబిహాత్ — సారూప్య వచనాలు", en: "Mutashabihat — similar verses" },
    ],
  },
];

const surahs = [
  { name: "Al-Fatiha", ar: "الفاتحة", verses: 7, lesson: { te: "ప్రార్థన & మార్గదర్శకత్వం", en: "Prayer & Guidance" } },
  { name: "Al-Ikhlas", ar: "الإخلاص", verses: 4, lesson: { te: "అల్లాహ్ ఏకత్వం", en: "Tawhid — Oneness of Allah" } },
  { name: "Al-Falaq", ar: "الفلق", verses: 5, lesson: { te: "చెడు నుండి రక్షణ", en: "Seeking refuge from evil" } },
  { name: "An-Nas", ar: "الناس", verses: 6, lesson: { te: "మానవ హృదయ రక్షణ", en: "Protection of the human heart" } },
  { name: "Al-Kawthar", ar: "الكوثر", verses: 3, lesson: { te: "అల్లాహ్ అనుగ్రహాలు", en: "Blessings of Allah" } },
  { name: "Al-Asr", ar: "العصر", verses: 3, lesson: { te: "సమయం & మానవ నష్టం", en: "Time & human loss" } },
];

function LearnQuranPage() {
  const { lang } = useI18n();
  const [openStage, setOpenStage] = useState<number | null>(1);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-900 to-[var(--if-green)] text-[var(--if-gold-pale)] py-20 px-4">
        <div className="mx-auto max-w-4xl text-center flex flex-col items-center gap-5">
          <BlurFade delay={0.05}>
            <Link href="/knowledge-center" className="inline-flex items-center gap-1 text-sm text-[var(--if-gold-pale)]/60 hover:text-[var(--if-gold-light)] transition-colors mb-2">
              <ChevronLeft className="h-4 w-4" />
              {lang === "te" ? "జ్ఞాన కేంద్రం" : "Knowledge Center"}
            </Link>
          </BlurFade>
          <BlurFade delay={0.1}>
            <span className="font-arabic text-4xl text-[var(--if-gold)]/70">تعلُّم القرآن</span>
          </BlurFade>
          <BlurFade delay={0.15}>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-[var(--if-gold-light)]">
              {lang === "te" ? "ఖురాన్ నేర్చుకోండి" : "Learn Quran"}
            </h1>
          </BlurFade>
          <BlurFade delay={0.2}>
            <p className="text-[var(--if-gold-pale)]/70 max-w-xl">
              {lang === "te"
                ? "పఠనం → తజ్వీద్ → తఫ్సీర్ → హిఫ్జ్ — పూర్తి 4-దశల ప్రయాణం"
                : "Reading → Tajweed → Tafseer → Hifz — complete 4-stage journey"}
            </p>
          </BlurFade>
          <BlurFade delay={0.25} className="flex gap-4 flex-wrap justify-center text-sm">
            {[
              { n: "4", l: lang === "te" ? "దశలు" : "Stages" },
              { n: "8", l: lang === "te" ? "తజ్వీద్ నియమాలు" : "Tajweed Rules" },
              { n: "114", l: lang === "te" ? "సూరాలు" : "Surahs" },
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

      {/* Journey stages */}
      <section className="py-16 px-4 bg-[var(--if-cream-light)]">
        <div className="mx-auto max-w-3xl">
          <BlurFade delay={0.1}>
            <h2 className="font-display text-3xl font-bold text-[var(--if-green)] text-center mb-10">
              {lang === "te" ? "4-దశల అభ్యాస ప్రయాణం" : "4-Stage Learning Journey"}
            </h2>
          </BlurFade>

          {/* Stage timeline */}
          <div className="relative mb-10">
            <div className="hidden md:block absolute top-6 left-8 right-8 h-0.5 bg-[var(--if-gold)]/20" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stages.map((s) => {
                const Icon = s.icon;
                return (
                  <button
                    key={s.num}
                    onClick={() => setOpenStage(openStage === s.num ? null : s.num)}
                    className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${
                      openStage === s.num
                        ? "bg-[var(--if-green)] border-[var(--if-gold)]/40 text-[var(--if-gold-pale)]"
                        : "bg-white border-[var(--if-gold)]/15 text-[var(--if-text)] hover:border-[var(--if-gold)]/40"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full ${s.color} flex items-center justify-center`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-semibold text-sm text-center leading-snug">{s.title[lang]}</span>
                    <span className={`font-arabic text-xs ${openStage === s.num ? "text-[var(--if-gold)]/70" : "text-[var(--if-text-muted)]"}`}>{s.arabic}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active stage content */}
          {openStage !== null && (() => {
            const stage = stages.find(s => s.num === openStage)!;
            return (
              <BlurFade delay={0.05}>
                <div className="bg-white rounded-2xl border border-[var(--if-gold)]/20 p-6">
                  <h3 className="font-display text-xl font-bold text-[var(--if-green)] mb-1">{stage.title[lang]}</h3>
                  <p className="text-sm text-[var(--if-text-muted)] mb-5">{stage.desc[lang]}</p>
                  <ul className="space-y-2">
                    {stage.topics.map((t, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <span className="w-6 h-6 rounded-full bg-[var(--if-gold)]/10 text-[var(--if-gold)] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                        <span className="text-[var(--if-text)]">{t[lang]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </BlurFade>
            );
          })()}
        </div>
      </section>

      {/* Key Surahs */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-5xl">
          <BlurFade delay={0.1}>
            <h2 className="font-display text-3xl font-bold text-[var(--if-green)] text-center mb-10">
              {lang === "te" ? "ముఖ్య సూరాల పాఠాలు" : "Key Surah Lessons"}
            </h2>
          </BlurFade>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {surahs.map((s, i) => (
              <BlurFade key={s.name} delay={0.06 * i}>
                <div className="relative overflow-hidden bg-white rounded-2xl border border-[var(--if-gold)]/15 p-5 hover:border-[var(--if-gold)]/50 transition-all group">
                  <BorderBeam size={80} duration={6} colorFrom="#c8922a" colorTo="#e8b84b" className="opacity-0 group-hover:opacity-100" />
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-[var(--if-green)]">{s.name}</h3>
                      <span className="text-xs text-[var(--if-text-muted)]">{s.verses} {lang === "te" ? "వచనాలు" : "verses"}</span>
                    </div>
                    <span className="font-arabic text-2xl text-[var(--if-gold)]/70">{s.ar}</span>
                  </div>
                  <p className="text-sm text-[var(--if-text-muted)]">{s.lesson[lang]}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Quran reflection CTA */}
      <section className="py-16 px-4 bg-[var(--if-green)]">
        <BlurFade delay={0.1}>
          <div className="relative overflow-hidden mx-auto max-w-2xl text-center text-[var(--if-gold-pale)] px-6 py-10 rounded-2xl border border-[var(--if-gold)]/20">
            <BorderBeam size={300} duration={12} colorFrom="#c8922a" colorTo="#e8b84b" />
            <div className="font-arabic text-3xl text-[var(--if-gold-light)] mb-4 leading-relaxed">
              أَفَلَا يَتَدَبَّرُونَ الْقُرْآنَ
            </div>
            <p className="text-sm text-[var(--if-gold-pale)]/70 mb-6">
              {lang === "te"
                ? "\"వారు ఖురాన్‌ను ఆలోచించరా?\" — సూరహ్ అన్-నిసా 4:82"
                : "\"Will they not reflect upon the Quran?\" — Surah An-Nisa 4:82"}
            </p>
            <Link href="/knowledge-center" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--if-gold)] text-[var(--if-green)] font-bold hover:bg-[var(--if-gold-light)] transition-colors text-sm">
              {lang === "te" ? "అన్ని పోర్టల్స్ చూడండి" : "Explore All Portals"} <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </BlurFade>
      </section>

      <Footer />
    </div>
  );
}

export default function LearnQuran() {
  return <I18nProvider><LearnQuranPage /></I18nProvider>;
}
