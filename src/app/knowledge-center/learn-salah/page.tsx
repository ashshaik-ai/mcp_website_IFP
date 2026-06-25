"use client";

import { useState } from "react";
import Link from "next/link";
import { I18nProvider, useI18n } from "@/lib/i18n/context";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

const prayers = [
  { name: { te: "ఫజ్ర్", en: "Fajr" }, ar: "الفجر", time: "Before sunrise", rakaat: "2 Fard + 2 Sunnah", color: "bg-indigo-900" },
  { name: { te: "జుహ్ర్", en: "Zuhr" }, ar: "الظهر", time: "After midday", rakaat: "4 Fard + 4+2 Sunnah", color: "bg-amber-700" },
  { name: { te: "అసర్", en: "Asr" }, ar: "العصر", time: "Afternoon", rakaat: "4 Fard + 4 Sunnah", color: "bg-orange-700" },
  { name: { te: "మఘ్రిబ్", en: "Maghrib" }, ar: "المغرب", time: "After sunset", rakaat: "3 Fard + 2 Sunnah", color: "bg-rose-800" },
  { name: { te: "ఇషా", en: "Isha" }, ar: "العشاء", time: "Night", rakaat: "4 Fard + 2+3 Sunnah/Witr", color: "bg-slate-800" },
];

const wuduSteps = [
  { n: 1, title: { te: "నియ్యత్ (ఉద్దేశం)", en: "Niyyah (Intention)" }, ar: "النية", desc: { te: "అల్లాహ్ కోసం వుజూ చేయాలని మనసులో నిర్ణయించుకోండి", en: "Make the intention in your heart to perform Wudu for the sake of Allah" } },
  { n: 2, title: { te: "బిస్మిల్లా చదవండి", en: "Say Bismillah" }, ar: "بسم الله", desc: { te: "\"బిస్మిల్లాహిర్ రహ్మానిర్ రహీమ్\" అని చదవండి", en: "Say \"Bismillahir Rahmanir Raheem\" before beginning" } },
  { n: 3, title: { te: "చేతులు కడగండి", en: "Wash Hands" }, ar: "غسل اليدين", desc: { te: "రెండు చేతులనూ మణికట్టు వరకు 3 సార్లు కడగండి", en: "Wash both hands up to wrists 3 times" } },
  { n: 4, title: { te: "నోరు కడగండి", en: "Rinse Mouth" }, ar: "المضمضة", desc: { te: "నోటిలో నీరు తీసుకుని 3 సార్లు శుభ్రం చేయండి", en: "Take water in mouth and rinse 3 times" } },
  { n: 5, title: { te: "ముక్కు శుభ్రం చేయండి", en: "Clean Nose" }, ar: "الاستنشاق", desc: { te: "ముక్కులోకి నీరు పీల్చి 3 సార్లు శుభ్రం చేయండి", en: "Inhale water into nostrils and clean 3 times" } },
  { n: 6, title: { te: "ముఖం కడగండి", en: "Wash Face" }, ar: "غسل الوجه", desc: { te: "నొసలు నుండి గడ్డం వరకు, చెవి నుండి చెవి వరకు 3 సార్లు", en: "From forehead to chin, ear to ear — 3 times" } },
  { n: 7, title: { te: "చేతులు కడగండి (మోచేయి వరకు)", en: "Wash Arms to Elbows" }, ar: "غسل الذراعين", desc: { te: "కుడి చేయి ముందు, మోచేయి వరకు 3 సార్లు. తర్వాత ఎడమ చేయి", en: "Right arm first, up to elbow, 3 times. Then left arm" } },
  { n: 8, title: { te: "తల మసహ్ చేయండి", en: "Wipe Head (Masah)" }, ar: "مسح الرأس", desc: { te: "తడి చేతులతో తల ముందు నుండి వెనకకు 1 సారి", en: "With wet hands, wipe head from front to back — 1 time" } },
  { n: 9, title: { te: "చెవులు మసహ్ చేయండి", en: "Wipe Ears" }, ar: "مسح الأذنين", desc: { te: "చూపుడు వేళ్ళతో లోపలి భాగం, బొటనవేళ్ళతో బయటి భాగం", en: "Index fingers inside, thumbs outside — 1 time" } },
  { n: 10, title: { te: "పాదాలు కడగండి", en: "Wash Feet" }, ar: "غسل الرجلين", desc: { te: "కుడి పాదం ముందు, గసగసాల వరకు 3 సార్లు. తర్వాత ఎడమ పాదం", en: "Right foot first, up to ankles, 3 times. Then left foot" } },
];

const salahSteps = [
  { n: 1, pos: "🧍", title: { te: "నియ్యత్ & తక్బీర్", en: "Niyyah & Takbeer" }, ar: "اللَّهُ أَكْبَرُ", desc: { te: "నమాజ్ ఉద్దేశం మనసులో పెట్టుకుని \"అల్లాహు అక్బర్\" అని చెప్పండి", en: "Make intention then say 'Allahu Akbar' with raised hands" } },
  { n: 2, pos: "🧍", title: { te: "ఖియామ్ — నిలబడటం", en: "Qiyam — Standing" }, ar: "سورة الفاتحة", desc: { te: "సూరత్ ఫాతిహా + మరొక సూరహ్ చదవండి", en: "Recite Surah Al-Fatiha followed by another Surah" } },
  { n: 3, pos: "🙇", title: { te: "రుకూ — వంగడం", en: "Ruku — Bowing" }, ar: "سُبْحَانَ رَبِّيَ الْعَظِيمِ", desc: { te: "కమ్మరికి సమానంగా వంగి 3 సార్లు \"సుభాన రబ్బియ అల్-అజీమ్\" చదవండి", en: "Bow at waist level, say 'Subhana Rabbiya al-Azeem' 3 times" } },
  { n: 4, pos: "🧍", title: { te: "ఖౌమ — లేవడం", en: "Qawm — Rising" }, ar: "سَمِعَ اللهُ لِمَنْ حَمِدَهُ", desc: { te: "\"సమియల్లాహు లిమన్ హమిదహ్\" చదువుతూ నిటారుగా నిలబడండి", en: "Rise saying 'Sami'allahu liman hamidah'" } },
  { n: 5, pos: "🙏", title: { te: "సజ్దహ్ — సాష్టాంగపడటం", en: "Sujood — Prostration" }, ar: "سُبْحَانَ رَبِّيَ الْأَعْلَى", desc: { te: "7 భాగాలు నేలకు తాకాలి. 3 సార్లు \"సుభాన రబ్బియ అల్-అ'లా\" చదవండి", en: "7 body parts touch ground. Say 'Subhana Rabbiya al-A'la' 3 times" } },
  { n: 6, pos: "🪑", title: { te: "జల్సహ్ — కూర్చోవడం", en: "Jalsa — Sitting" }, ar: "رَبِّ اغْفِرْ لِي", desc: { te: "రెండు సజ్దహ్ల మధ్య కూర్చుని \"రబ్బిగ్ఫిర్లీ\" అని చదవండి", en: "Sit between two prostrations saying 'Rabbighfir li'" } },
  { n: 7, pos: "🙏", title: { te: "రెండవ సజ్దహ్", en: "Second Sujood" }, ar: "سُبْحَانَ رَبِّيَ الْأَعْلَى", desc: { te: "మళ్ళీ సాష్టాంగం 3 సార్లు చదవండి — ఇది ఒక రక్అత్ పూర్తవుతుంది", en: "Second prostration — this completes one Raka'ah" } },
  { n: 8, pos: "🪑", title: { te: "తషహ్హుద్ & సలాం", en: "Tashahhud & Salaam" }, ar: "السَّلَامُ عَلَيْكُمْ", desc: { te: "చివరి రక్అత్‌లో తషహ్హుద్, దరూద్, దువా చదివి \"అస్సలాము అలైకుమ్\" తో ముగించండి", en: "In final Raka'ah: Tashahhud, Darud, Du'a, then end with Salaam" } },
];

function LearnSalahPage() {
  const { lang } = useI18n();
  const [activeTab, setActiveTab] = useState<"wudu" | "salah" | "times">("times");
  const [wuduStep, setWuduStep] = useState(0);
  const [salahStep, setSalahStep] = useState(0);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <section className="bg-gradient-to-br from-teal-900 to-[var(--if-green)] text-[var(--if-gold-pale)] py-20 px-4">
        <div className="mx-auto max-w-4xl text-center flex flex-col items-center gap-5">
          <BlurFade delay={0.05}>
            <Link href="/knowledge-center" className="inline-flex items-center gap-1 text-sm text-[var(--if-gold-pale)]/60 hover:text-[var(--if-gold-light)] transition-colors mb-2">
              <ChevronLeft className="h-4 w-4" />{lang === "te" ? "జ్ఞాన కేంద్రం" : "Knowledge Center"}
            </Link>
          </BlurFade>
          <BlurFade delay={0.1}>
            <span className="font-arabic text-4xl text-[var(--if-gold)]/70" dir="rtl">تعلُّم الصلاة</span>
          </BlurFade>
          <BlurFade delay={0.15}>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-[var(--if-gold-light)]">
              {lang === "te" ? "నమాజ్ నేర్చుకోండి" : "Learn Salah"}
            </h1>
          </BlurFade>
          <BlurFade delay={0.2}>
            <p className="text-[var(--if-gold-pale)]/70 max-w-xl">
              {lang === "te" ? "వుజూ నుండి సలాం వరకు — పూర్తి నమాజ్ మార్గదర్శి" : "From Wudu to Salaam — complete prayer guide"}
            </p>
          </BlurFade>
        </div>
      </section>

      {/* Tab selector */}
      <div className="sticky top-[68px] z-10 bg-[var(--if-cream-light)] border-b border-[var(--if-gold)]/15 px-4 py-2">
        <div className="mx-auto max-w-3xl flex gap-2">
          {(["times", "wudu", "salah"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeTab === tab ? "bg-[var(--if-green)] text-[var(--if-gold-light)]" : "text-[var(--if-text-muted)] hover:bg-[var(--if-gold)]/10"}`}
            >
              {tab === "times" ? (lang === "te" ? "నమాజు సమయాలు" : "Prayer Times") : tab === "wudu" ? (lang === "te" ? "వుజూ గైడ్" : "Wudu Guide") : (lang === "te" ? "నమాజ్ దశలు" : "Salah Steps")}
            </button>
          ))}
        </div>
      </div>

      {/* Prayer times */}
      {activeTab === "times" && (
        <section className="py-16 px-4">
          <div className="mx-auto max-w-4xl">
            <BlurFade delay={0.1}>
              <h2 className="font-display text-3xl font-bold text-[var(--if-green)] text-center mb-10">
                {lang === "te" ? "5 ఫర్జ్ నమాజులు" : "The 5 Obligatory Prayers"}
              </h2>
            </BlurFade>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {prayers.map((p, i) => (
                <BlurFade key={p.ar} delay={0.08 * i}>
                  <div className={`relative overflow-hidden ${p.color} rounded-2xl p-5 text-white text-center`}>
                    <BorderBeam size={80} duration={6} colorFrom="#c8922a" colorTo="#e8b84b" />
                    <div className="font-arabic text-2xl text-[var(--if-gold-light)] mb-2" dir="rtl">{p.ar}</div>
                    <h3 className="font-display font-bold text-lg">{p.name[lang]}</h3>
                    <p className="text-xs text-white/70 mt-1">{p.time}</p>
                    <div className="mt-3 px-2 py-1 rounded-full bg-white/10 text-xs font-semibold">{p.rakaat}</div>
                  </div>
                </BlurFade>
              ))}
            </div>
            <BlurFade delay={0.5}>
              <div className="mt-8 p-5 rounded-2xl bg-[var(--if-cream-light)] border border-[var(--if-gold)]/15">
                <p className="text-sm text-[var(--if-text-muted)] text-center">
                  {lang === "te"
                    ? "🕌 నమాజు సమయాలు స్థానం మరియు ఋతువు ప్రకారం మారుతాయి. ఆధిక్యత కోసం మస్జిద్ అజాన్ అనుసరించండి."
                    : "🕌 Prayer times vary by location and season. Follow your local Masjid's adhan for accurate times."}
                </p>
              </div>
            </BlurFade>
          </div>
        </section>
      )}

      {/* Wudu steps */}
      {activeTab === "wudu" && (
        <section className="py-16 px-4">
          <div className="mx-auto max-w-2xl">
            <BlurFade delay={0.1}>
              <h2 className="font-display text-3xl font-bold text-[var(--if-green)] text-center mb-8">
                {lang === "te" ? "వుజూ — అబ్లూషన్" : "Wudu — Ablution"}
              </h2>
            </BlurFade>
            <div className="relative overflow-hidden bg-white rounded-2xl border border-[var(--if-gold)]/20 p-6 mb-4">
              <BorderBeam size={200} duration={8} colorFrom="#0d3b1e" colorTo="#c8922a" />
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-8 rounded-full bg-[var(--if-green)] text-[var(--if-gold-light)] flex items-center justify-center font-bold text-sm">{wuduSteps[wuduStep].n}</span>
                <h3 className="font-display text-xl font-bold text-[var(--if-green)]">{wuduSteps[wuduStep].title[lang]}</h3>
                <span className="ml-auto font-arabic text-xl text-[var(--if-gold)]/70" dir="rtl">{wuduSteps[wuduStep].ar}</span>
              </div>
              <p className="text-[var(--if-text-muted)] leading-relaxed">{wuduSteps[wuduStep].desc[lang]}</p>
              <div className="flex items-center justify-between mt-6">
                <button disabled={wuduStep === 0} onClick={() => setWuduStep(s => s - 1)} className="flex items-center gap-1 px-4 py-2 rounded-full border border-[var(--if-gold)]/30 text-sm text-[var(--if-green)] disabled:opacity-30 hover:bg-[var(--if-cream-light)] transition-colors">
                  <ChevronLeft className="h-4 w-4" />{lang === "te" ? "వెనక" : "Back"}
                </button>
                <span className="text-xs text-[var(--if-text-muted)]">{wuduStep + 1} / {wuduSteps.length}</span>
                <button disabled={wuduStep === wuduSteps.length - 1} onClick={() => setWuduStep(s => s + 1)} className="flex items-center gap-1 px-4 py-2 rounded-full bg-[var(--if-green)] text-[var(--if-gold-light)] text-sm disabled:opacity-30 hover:bg-[var(--if-green)]/90 transition-colors">
                  {lang === "te" ? "తదుపరి" : "Next"}<ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {wuduSteps.map((s, i) => (
                <button key={s.n} onClick={() => setWuduStep(i)} className={`h-2 rounded-full transition-all ${i === wuduStep ? "bg-[var(--if-gold)]" : i < wuduStep ? "bg-emerald-400" : "bg-[var(--if-gold)]/20"}`} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Salah steps */}
      {activeTab === "salah" && (
        <section className="py-16 px-4">
          <div className="mx-auto max-w-2xl">
            <BlurFade delay={0.1}>
              <h2 className="font-display text-3xl font-bold text-[var(--if-green)] text-center mb-8">
                {lang === "te" ? "నమాజ్ — దశల వారీ మార్గదర్శి" : "Salah — Step by Step"}
              </h2>
            </BlurFade>
            <div className="relative overflow-hidden bg-white rounded-2xl border border-[var(--if-gold)]/20 p-6 mb-4">
              <BorderBeam size={200} duration={8} colorFrom="#0d3b1e" colorTo="#c8922a" />
              <div className="text-center text-5xl mb-4">{salahSteps[salahStep].pos}</div>
              <div className="flex items-center gap-2 justify-center mb-3">
                <span className="w-7 h-7 rounded-full bg-[var(--if-green)] text-[var(--if-gold-light)] flex items-center justify-center font-bold text-sm">{salahSteps[salahStep].n}</span>
                <h3 className="font-display text-xl font-bold text-[var(--if-green)]">{salahSteps[salahStep].title[lang]}</h3>
              </div>
              <div className="font-arabic text-lg text-[var(--if-gold)] text-center mb-3 leading-relaxed" dir="rtl">{salahSteps[salahStep].ar}</div>
              <p className="text-[var(--if-text-muted)] text-sm leading-relaxed text-center">{salahSteps[salahStep].desc[lang]}</p>
              <div className="flex items-center justify-between mt-6">
                <button disabled={salahStep === 0} onClick={() => setSalahStep(s => s - 1)} className="flex items-center gap-1 px-4 py-2 rounded-full border border-[var(--if-gold)]/30 text-sm text-[var(--if-green)] disabled:opacity-30 hover:bg-[var(--if-cream-light)] transition-colors">
                  <ChevronLeft className="h-4 w-4" />{lang === "te" ? "వెనక" : "Back"}
                </button>
                <span className="text-xs text-[var(--if-text-muted)]">{salahStep + 1} / {salahSteps.length}</span>
                <button disabled={salahStep === salahSteps.length - 1} onClick={() => setSalahStep(s => s + 1)} className="flex items-center gap-1 px-4 py-2 rounded-full bg-[var(--if-green)] text-[var(--if-gold-light)] text-sm disabled:opacity-30 hover:bg-[var(--if-green)]/90 transition-colors">
                  {lang === "te" ? "తదుపరి" : "Next"}<ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {salahSteps.map((s, i) => (
                <button key={s.n} onClick={() => setSalahStep(i)} className={`h-2 rounded-full transition-all ${i === salahStep ? "bg-[var(--if-gold)]" : i < salahStep ? "bg-emerald-400" : "bg-[var(--if-gold)]/20"}`} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}

export default function LearnSalah() {
  return <I18nProvider><LearnSalahPage /></I18nProvider>;
}
