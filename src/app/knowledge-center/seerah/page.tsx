"use client";

import { useState } from "react";
import Link from "next/link";
import { I18nProvider, useI18n } from "@/lib/i18n/context";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { ChevronLeft, ChevronRight } from "lucide-react";

const stages = [
  { num: 1, year: "570 CE", title: { te: "జన్మ & బాల్యం", en: "Birth & Early Years" }, arabic: "المولد والطفولة", desc: { te: "మక్కాలో జన్మించిన ప్రవక్త ముహమ్మద్ ﷺ — 'అల్-అమీన్' (విశ్వసనీయుడు) అని పిలువబడేవారు", en: "Prophet Muhammad ﷺ born in Makkah — known as 'Al-Amin' (the trustworthy)" }, color: "bg-amber-700" },
  { num: 2, year: "610 CE", title: { te: "మొదటి వహ్యీ", en: "First Revelation" }, arabic: "بدء الوحي", desc: { te: "గారె హిరాలో జిబ్రాయీల్ అలైహిస్సలామ్ వచ్చి 'ఇఖ్రా' అని మొదటి వచనాలు అవతరించాయి", en: "Jibreel came in cave Hira with first verses — 'Iqra' — Read in the name of your Lord" }, color: "bg-emerald-700" },
  { num: 3, year: "610–622 CE", title: { te: "మక్కా ప్రచారం", en: "Meccan Preaching" }, arabic: "الدعوة في مكة", desc: { te: "13 సంవత్సరాల తౌహీద్ సందేశం — హింస, నిరాకరణ మరియు సహనం", en: "13 years of Tawhid message — persecution, rejection and patience" }, color: "bg-rose-800" },
  { num: 4, year: "622 CE", title: { te: "మదీనాకు హిజ్రత్", en: "Migration to Madinah" }, arabic: "الهجرة إلى المدينة", desc: { te: "ఇస్లామిక్ క్యాలెండర్ ప్రారంభం — ముస్లిం సమాజ స్థాపన", en: "Start of Islamic calendar — establishment of Muslim community" }, color: "bg-blue-800" },
  { num: 5, year: "622–625 CE", title: { te: "సమాజ నిర్మాణం", en: "Building the Community" }, arabic: "بناء المجتمع", desc: { te: "మస్జిద్-అన్-నబవీ నిర్మాణం, మదీనా ఒడంబడిక, అన్సార్-ముహాజిరీన్ సోదరత్వం", en: "Masjid an-Nabawi built, Charter of Madinah, brotherhood of Ansar & Muhajireen" }, color: "bg-teal-800" },
  { num: 6, year: "624–627 CE", title: { te: "యుద్ధాలు & పరీక్షలు", en: "Battles & Trials" }, arabic: "الغزوات والابتلاءات", desc: { te: "బదర్, ఉహుద్, ఖందఖ్ — ఈమాన్‌ను నిరూపించిన పరీక్షలు", en: "Badr, Uhud, Khandaq — trials that tested and proved faith" }, color: "bg-gray-700" },
  { num: 7, year: "628–630 CE", title: { te: "విజయాలు & జయాలు", en: "Triumphs & Victories" }, arabic: "الفتوحات والانتصارات", desc: { te: "హుదైబియా సంధి, మక్కా ఫత్హ్ — 'ఇన్నా ఫతహ్నా లకా ఫత్హన్ ముబీనా'", en: "Treaty of Hudaybiyyah, Conquest of Makkah — 'Indeed We have opened for you a clear opening'" }, color: "bg-purple-800" },
  { num: 8, year: "632 CE", title: { te: "విదాయ్ హజ్జ్", en: "Farewell Pilgrimage" }, arabic: "حجة الوداع", desc: { te: "అరఫాత్ ఖుత్బా — ఇస్లామిక్ సూత్రాల చివరి ప్రకటన", en: "Sermon of Arafat — final declaration of Islamic principles" }, color: "bg-indigo-800" },
  { num: 9, year: "632 CE", title: { te: "వారసత్వం & బోధనలు", en: "Legacy & Teachings" }, arabic: "الإرث والتعاليم", desc: { te: "ఖురాన్ మరియు సున్నత్ — మానవజాతికి శాశ్వత మార్గదర్శి", en: "Quran and Sunnah — an eternal guide left for humanity" }, color: "bg-amber-800" },
  { num: 10, year: "Today", title: { te: "ఆధునిక జీవితంలో అనువర్తనం", en: "Application in Modern Life" }, arabic: "التطبيق في الحياة المعاصرة", desc: { te: "ప్రవక్త సీరత్ నుండి నేటి సవాళ్ళకు పరిష్కారాలు నేర్చుకోవడం", en: "Drawing lessons from the Prophet's biography for today's challenges" }, color: "bg-green-800" },
];

const characters = [
  { name: "Khadijah RA", ar: "خديجة", role: { te: "మొదటి భార్య — ఇస్లామ్‌లో మొదటి విశ్వాసి", en: "First wife — first believer in Islam" } },
  { name: "Abu Bakr RA", ar: "أبو بكر", role: { te: "అత్యంత సన్నిహిత తోడు — సిద్దీఖ్", en: "Closest companion — As-Siddiq (the truthful)" } },
  { name: "Umar ibn Khattab RA", ar: "عمر", role: { te: "ఇస్లాం బలోపేతానికి కారణమైన ఆల్-ఫారూఖ్", en: "Al-Farooq — whose embrace strengthened Islam" } },
  { name: "Ali ibn Abi Talib RA", ar: "علي", role: { te: "వ్యవస్థాపకుడి సోదరుడు — జ్ఞానపు ద్వారం", en: "Cousin and son-in-law — 'Gate of knowledge'" } },
  { name: "Bilal ibn Rabah RA", ar: "بلال", role: { te: "మొదటి ముఆజ్జిన్ — సహనానికి చిహ్నం", en: "First Muezzin — symbol of patience and resilience" } },
  { name: "Fatimah RA", ar: "فاطمة", role: { te: "ప్రవక్త కుమార్తె — స్వర్గ మహిళలకు నాయకురాలు", en: "Prophet's daughter — leader of women in Paradise" } },
];

function SeerahPage() {
  const { lang } = useI18n();
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-900 to-[var(--if-green)] text-[var(--if-gold-pale)] py-20 px-4">
        <div className="mx-auto max-w-4xl text-center flex flex-col items-center gap-5">
          <BlurFade delay={0.05}>
            <Link href="/knowledge-center" className="inline-flex items-center gap-1 text-sm text-[var(--if-gold-pale)]/60 hover:text-[var(--if-gold-light)] transition-colors mb-2">
              <ChevronLeft className="h-4 w-4" />
              {lang === "te" ? "జ్ఞాన కేంద్రం" : "Knowledge Center"}
            </Link>
          </BlurFade>
          <BlurFade delay={0.1}>
            <span className="font-arabic text-4xl text-[var(--if-gold)]/70">السيرة النبوية</span>
          </BlurFade>
          <BlurFade delay={0.15}>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-[var(--if-gold-light)]">
              {lang === "te" ? "సీరత్-అన్-నబవియ్యహ్" : "Seerah an-Nabawiyyah"}
            </h1>
          </BlurFade>
          <BlurFade delay={0.2}>
            <p className="text-[var(--if-gold-pale)]/70 max-w-xl">
              {lang === "te"
                ? "ప్రవక్త ముహమ్మద్ ﷺ జీవిత చరిత్ర — 10-దశల దృశ్య కాలపట్టిక"
                : "Life of Prophet Muhammad ﷺ — 10-stage visual timeline"}
            </p>
          </BlurFade>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="py-16 px-4 bg-[var(--if-cream-light)]">
        <div className="mx-auto max-w-5xl">
          <BlurFade delay={0.1}>
            <h2 className="font-display text-3xl font-bold text-[var(--if-green)] text-center mb-10">
              {lang === "te" ? "జీవిత కాలపట్టిక" : "Life Timeline"}
            </h2>
          </BlurFade>

          {/* Stage selector — scrollable row */}
          <div className="overflow-x-auto pb-4 mb-6">
            <div className="flex gap-3 min-w-max px-1">
              {stages.map((s, i) => (
                <button
                  key={s.num}
                  onClick={() => setActive(i)}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all min-w-[90px] ${
                    active === i
                      ? "bg-[var(--if-green)] border-[var(--if-gold)]/40 text-[var(--if-gold-pale)]"
                      : "bg-white border-[var(--if-gold)]/15 text-[var(--if-text)] hover:border-[var(--if-gold)]/40"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full ${s.color} flex items-center justify-center text-white text-xs font-bold`}>
                    {s.num}
                  </div>
                  <span className="text-xs font-semibold text-center leading-tight">{s.year}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active stage card */}
          <BlurFade delay={0.05} key={active}>
            <div className="relative overflow-hidden bg-white rounded-2xl border border-[var(--if-gold)]/20 p-8">
              <BorderBeam size={200} duration={10} colorFrom="#0d3b1e" colorTo="#c8922a" />
              <div className="flex items-start gap-6 flex-wrap">
                <div className={`w-14 h-14 rounded-2xl ${stages[active].color} flex items-center justify-center text-white font-display text-xl font-bold flex-shrink-0`}>
                  {stages[active].num}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap mb-2">
                    <h3 className="font-display text-2xl font-bold text-[var(--if-green)]">
                      {stages[active].title[lang]}
                    </h3>
                    <span className="font-arabic text-lg text-[var(--if-gold)]/70">{stages[active].arabic}</span>
                  </div>
                  <span className="text-xs font-bold text-[var(--if-gold)] tracking-wider uppercase">{stages[active].year}</span>
                  <p className="text-[var(--if-text-muted)] mt-3 leading-relaxed">{stages[active].desc[lang]}</p>
                </div>
              </div>
              <div className="flex gap-3 mt-6 justify-end">
                <button
                  onClick={() => setActive(a => Math.max(0, a - 1))}
                  disabled={active === 0}
                  className="p-2 rounded-full border border-[var(--if-gold)]/30 hover:bg-[var(--if-cream-light)] transition-colors disabled:opacity-30"
                >
                  <ChevronLeft className="h-4 w-4 text-[var(--if-green)]" />
                </button>
                <span className="self-center text-xs text-[var(--if-text-muted)]">{active + 1} / {stages.length}</span>
                <button
                  onClick={() => setActive(a => Math.min(stages.length - 1, a + 1))}
                  disabled={active === stages.length - 1}
                  className="p-2 rounded-full border border-[var(--if-gold)]/30 hover:bg-[var(--if-cream-light)] transition-colors disabled:opacity-30"
                >
                  <ChevronRight className="h-4 w-4 text-[var(--if-green)]" />
                </button>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Character Academy */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-5xl">
          <BlurFade delay={0.1}>
            <h2 className="font-display text-3xl font-bold text-[var(--if-green)] text-center mb-10">
              {lang === "te" ? "సహచరుల పరిచయం" : "Meet the Companions"}
            </h2>
          </BlurFade>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {characters.map((c, i) => (
              <BlurFade key={c.name} delay={0.07 * i}>
                <div className="relative overflow-hidden bg-white rounded-2xl border border-[var(--if-gold)]/15 p-5 hover:border-[var(--if-gold)]/50 transition-all group">
                  <BorderBeam size={80} duration={7} colorFrom="#c8922a" colorTo="#e8b84b" className="opacity-0 group-hover:opacity-100" />
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-11 h-11 rounded-full bg-[var(--if-green)] flex items-center justify-center text-[var(--if-gold-light)] font-bold">
                      {c.name[0]}
                    </div>
                    <div>
                      <h4 className="font-semibold text-[var(--if-green)]">{c.name}</h4>
                      <span className="font-arabic text-sm text-[var(--if-gold)]/70">{c.ar}</span>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--if-text-muted)]">{c.role[lang]}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Closing quote */}
      <section className="py-16 px-4 bg-[var(--if-green)] text-center">
        <BlurFade delay={0.1}>
          <div className="mx-auto max-w-xl">
            <div className="font-arabic text-3xl text-[var(--if-gold-light)] mb-4 leading-relaxed">
              لَقَدْ كَانَ لَكُمْ فِي رَسُولِ اللَّهِ أُسْوَةٌ حَسَنَةٌ
            </div>
            <p className="text-sm text-[var(--if-gold-pale)]/70">
              {lang === "te"
                ? "\"అల్లాహ్ రసూల్‌లో మీకు ఉత్తమ ఆదర్శం ఉంది\" — సూరహ్ అల్-అహ్జాబ్ 33:21"
                : "\"Indeed in the Messenger of Allah you have an excellent example\" — Surah Al-Ahzab 33:21"}
            </p>
          </div>
        </BlurFade>
      </section>

      <Footer />
    </div>
  );
}

export default function Seerah() {
  return <I18nProvider><SeerahPage /></I18nProvider>;
}
