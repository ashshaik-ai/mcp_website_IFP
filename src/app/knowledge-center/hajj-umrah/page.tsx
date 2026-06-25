"use client";

import { useState } from "react";
import Link from "next/link";
import { I18nProvider, useI18n } from "@/lib/i18n/context";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { ChevronLeft, ChevronRight } from "lucide-react";

const hajjSteps = [
  { n: 1, day: "8 Dhu al-Hijjah", title: { te: "ఇహ్రామ్ & మిన", en: "Ihram & Mina" }, ar: "الإحرام - منى", desc: { te: "ఇహ్రామ్ (2 తెల్లని వస్త్రాలు) ధరించండి. తల్బియా చదవండి. మినాకు ప్రయాణించండి.", en: "Wear Ihram (2 white sheets), recite Talbiyah, travel to Mina and spend the day" } },
  { n: 2, day: "9 Dhu al-Hijjah", title: { te: "అరఫా — కేంద్రస్థలం", en: "Arafah — The Core" }, ar: "الوقوف بعرفة", desc: { te: "అరఫాత్ మైదానంలో తెల్లవారు నుండి సూర్యాస్తమయం వరకు నిలబడండి. దువా, జికర్. ఇది హజ్ యొక్క గుండె.", en: "Stand at the plain of Arafat from noon to sunset. Du'a, dhikr, repentance. This is the heart of Hajj." } },
  { n: 3, day: "9 Night", title: { te: "ముజ్దలిఫా — రాత్రి", en: "Muzdalifah — Night" }, ar: "المبيت بمزدلفة", desc: { te: "ముజ్దలిఫాకు ప్రయాణించండి. మఘ్రిబ్ + ఇషా కలిపి చదవండి. తెల్లవారే వరకు నిద్రించండి. రాళ్ళు సేకరించండి.", en: "Travel to Muzdalifah, combine Maghrib + Isha prayers, sleep, collect 70 pebbles for stoning" } },
  { n: 4, day: "10 Dhu al-Hijjah", title: { te: "రమీ, అజ్హియా, హలఖ్", en: "Rami, Sacrifice, Shave" }, ar: "رمي الجمرات - الأضحية - الحلق", desc: { te: "జమారత్ అల్-అఖబాను 7 రాళ్ళతో కొట్టండి. జంతు అర్పణ. తల శిరస్థానం/కత్తరించండి. ఇహ్రామ్ విప్పండి.", en: "Stone the largest Jamarat 7 times. Sacrifice an animal. Shave/cut hair. Remove Ihram." } },
  { n: 5, day: "10-12", title: { te: "తవాఫ్ అల్-ఇఫాదా & మినా", en: "Tawaf al-Ifadah & Mina" }, ar: "طواف الإفاضة - أيام التشريق", desc: { te: "కాబాను 7 సార్లు ప్రదక్షిణం చేయండి. సఫా-మర్వా స్వయి. మినాలో 3 రోజులు. జమారాత్ రమీ చేయండి.", en: "Circumambulate the Kaaba 7 times (Tawaf), Sa'i between Safa and Marwa, stone all 3 Jamaraat daily" } },
  { n: 6, day: "Final", title: { te: "తవాఫ్ అల్-విదా", en: "Farewell Tawaf" }, ar: "طواف الوداع", desc: { te: "వెళ్ళే ముందు కాబాను 7 సార్లు వీడ్కోలు ప్రదక్షిణం చేయండి. హజ్ పూర్తయింది!", en: "Perform the farewell circumambulation of the Kaaba 7 times before leaving. Hajj complete!" } },
];

const umrahSteps = [
  { n: 1, title: { te: "ఇహ్రామ్ ధరించండి", en: "Wear Ihram" }, ar: "الإحرام", desc: { te: "మీఖాత్ స్థానంలో ఇహ్రామ్ ధరించి తల్బియా ప్రారంభించండి", en: "Put on Ihram at the Miqat station and begin reciting Talbiyah" } },
  { n: 2, title: { te: "తవాఫ్", en: "Tawaf" }, ar: "الطواف", desc: { te: "కాబాను 7 సార్లు అపసవ్యంగా ప్రదక్షిణం చేయండి — బిస్మిల్లా & తక్బీర్", en: "Circumambulate the Kaaba 7 times anti-clockwise, starting from Hajar al-Aswad" } },
  { n: 3, title: { te: "సఫా-మర్వా స్వయి", en: "Sa'i between Safa-Marwa" }, ar: "السعي", desc: { te: "సఫా నుండి మర్వా వరకు 7 సార్లు నడవండి — హాజర్ RA యొక్క శ్రమ స్మరణ", en: "Walk 7 times between Safa and Marwa in remembrance of Hajar RA's search for water" } },
  { n: 4, title: { te: "హలఖ్ / తఖ్సీర్", en: "Halq / Taqsir (Hair)" }, ar: "الحلق أو التقصير", desc: { te: "తల షేవ్ (పురుషులు) లేదా వేళ్ళ పొడవు కత్తరించడం. ఉమ్రహ్ పూర్తయింది!", en: "Men shave head (preferred) or cut hair, women cut a finger's length. Umrah complete!" } },
];

const ihramRules = [
  { rule: { te: "వేటాడడం నిషేధం", en: "No hunting" }, ar: "لا صيد" },
  { rule: { te: "సువాసన ఉపయోగించడం నిషేధం", en: "No perfume/fragrance" }, ar: "لا طيب" },
  { rule: { te: "శారీరక సంబంధం నిషేధం", en: "No marital relations" }, ar: "لا رفث" },
  { rule: { te: "గొడవ / వాదన నిషేధం", en: "No arguing or quarrelling" }, ar: "لا جدال" },
  { rule: { te: "జుట్టు, గోళ్ళు కత్తరించడం నిషేధం", en: "No cutting hair/nails" }, ar: "لا حلق" },
  { rule: { te: "కుట్టిన దుస్తులు నిషేధం (పురుషులు)", en: "No stitched clothing (men)" }, ar: "لا مخيط للرجال" },
];

function HajjUmrahPage() {
  const { lang } = useI18n();
  const [tab, setTab] = useState<"hajj" | "umrah" | "ihram">("hajj");
  const [step, setStep] = useState(0);
  const steps = tab === "hajj" ? hajjSteps : umrahSteps;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <section className="bg-gradient-to-br from-stone-900 to-[var(--if-green)] text-[var(--if-gold-pale)] py-20 px-4">
        <div className="mx-auto max-w-4xl text-center flex flex-col items-center gap-5">
          <BlurFade delay={0.05}>
            <Link href="/knowledge-center" className="inline-flex items-center gap-1 text-sm text-[var(--if-gold-pale)]/60 hover:text-[var(--if-gold-light)] transition-colors mb-2">
              <ChevronLeft className="h-4 w-4" />{lang === "te" ? "జ్ఞాన కేంద్రం" : "Knowledge Center"}
            </Link>
          </BlurFade>
          <BlurFade delay={0.1}>
            <span className="font-arabic text-4xl text-[var(--if-gold)]/70" dir="rtl">الحج والعمرة</span>
          </BlurFade>
          <BlurFade delay={0.15}>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-[var(--if-gold-light)]">
              {lang === "te" ? "హజ్ మరియు ఉమ్రహ్" : "Hajj & Umrah"}
            </h1>
          </BlurFade>
          <BlurFade delay={0.2}>
            <p className="text-[var(--if-gold-pale)]/70 max-w-xl">
              {lang === "te" ? "ఇస్లాం 5వ స్తంభం — హజ్ మార్గదర్శి. ఉమ్రహ్ వివరాలు. ఇహ్రామ్ నియమాలు." : "5th pillar of Islam — complete Hajj guide, Umrah details and Ihram rules"}
            </p>
          </BlurFade>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-[68px] z-10 bg-[var(--if-cream-light)] border-b border-[var(--if-gold)]/15 px-4 py-2">
        <div className="mx-auto max-w-3xl flex gap-2">
          {(["hajj", "umrah", "ihram"] as const).map((t) => (
            <button key={t} onClick={() => { setTab(t); setStep(0); }} className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${tab === t ? "bg-[var(--if-green)] text-[var(--if-gold-light)]" : "text-[var(--if-text-muted)] hover:bg-[var(--if-gold)]/10"}`}>
              {t === "hajj" ? (lang === "te" ? "హజ్ దశలు" : "Hajj Steps") : t === "umrah" ? (lang === "te" ? "ఉమ్రహ్ దశలు" : "Umrah Steps") : (lang === "te" ? "ఇహ్రామ్ నియమాలు" : "Ihram Rules")}
            </button>
          ))}
        </div>
      </div>

      {/* Step guide */}
      {(tab === "hajj" || tab === "umrah") && (
        <section className="py-16 px-4">
          <div className="mx-auto max-w-2xl">
            <BlurFade delay={0.1}>
              <h2 className="font-display text-3xl font-bold text-[var(--if-green)] text-center mb-8">
                {tab === "hajj" ? (lang === "te" ? "హజ్ — దశల వారీ మార్గదర్శి" : "Hajj — Step by Step") : (lang === "te" ? "ఉమ్రహ్ — దశల వారీ మార్గదర్శి" : "Umrah — Step by Step")}
              </h2>
            </BlurFade>
            <div className="relative overflow-hidden bg-white rounded-2xl border border-[var(--if-gold)]/20 p-6 mb-4">
              <BorderBeam size={200} duration={8} colorFrom="#0d3b1e" colorTo="#c8922a" />
              <div className="flex items-center gap-3 mb-1">
                <span className="w-8 h-8 rounded-full bg-[var(--if-green)] text-[var(--if-gold-light)] flex items-center justify-center font-bold text-sm flex-shrink-0">{steps[step].n}</span>
                <h3 className="font-display text-xl font-bold text-[var(--if-green)]">{steps[step].title[lang]}</h3>
                {"day" in steps[step] && <span className="ml-auto text-[10px] font-bold text-[var(--if-gold)] uppercase tracking-wide">{(steps[step] as typeof hajjSteps[0]).day}</span>}
              </div>
              <div className="font-arabic text-lg text-[var(--if-gold)]/70 mb-3" dir="rtl">{steps[step].ar}</div>
              <p className="text-[var(--if-text-muted)] leading-relaxed">{steps[step].desc[lang]}</p>
              <div className="flex items-center justify-between mt-6">
                <button disabled={step === 0} onClick={() => setStep(s => s - 1)} className="flex items-center gap-1 px-4 py-2 rounded-full border border-[var(--if-gold)]/30 text-sm disabled:opacity-30 hover:bg-[var(--if-cream-light)]">
                  <ChevronLeft className="h-4 w-4 text-[var(--if-green)]" />{lang === "te" ? "వెనక" : "Back"}
                </button>
                <span className="text-xs text-[var(--if-text-muted)]">{step + 1} / {steps.length}</span>
                <button disabled={step === steps.length - 1} onClick={() => setStep(s => s + 1)} className="flex items-center gap-1 px-4 py-2 rounded-full bg-[var(--if-green)] text-[var(--if-gold-light)] text-sm disabled:opacity-30">
                  {lang === "te" ? "తదుపరి" : "Next"}<ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex gap-1.5">
              {steps.map((_, i) => (
                <button key={i} onClick={() => setStep(i)} className={`h-2 flex-1 rounded-full transition-all ${i === step ? "bg-[var(--if-gold)]" : i < step ? "bg-emerald-400" : "bg-[var(--if-gold)]/20"}`} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Ihram rules */}
      {tab === "ihram" && (
        <section className="py-16 px-4">
          <div className="mx-auto max-w-3xl">
            <BlurFade delay={0.1}>
              <h2 className="font-display text-3xl font-bold text-[var(--if-green)] text-center mb-8">
                {lang === "te" ? "ఇహ్రామ్ — నిషేధాలు" : "Ihram — Prohibitions"}
              </h2>
            </BlurFade>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ihramRules.map((r, i) => (
                <BlurFade key={i} delay={0.07 * i}>
                  <div className="flex items-center gap-3 bg-white border border-[var(--if-gold)]/15 rounded-xl p-4">
                    <span className="text-xl flex-shrink-0">🚫</span>
                    <div>
                      <div className="font-semibold text-[var(--if-green)] text-sm">{r.rule[lang]}</div>
                      <div className="font-arabic text-sm text-[var(--if-gold)]/70" dir="rtl">{r.ar}</div>
                    </div>
                  </div>
                </BlurFade>
              ))}
            </div>
            <BlurFade delay={0.5}>
              <div className="mt-6 p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
                <p className="text-sm text-emerald-800">
                  {lang === "te"
                    ? "✅ ఇహ్రామ్‌లో అనుమతించబడినవి: తినడం, తాగడం, నిద్రించడం, నడవడం, వివాహేతర సంభాషణ, ప్రార్థనలు, ఖురాన్ పఠనం."
                    : "✅ Permitted in Ihram: eating, drinking, sleeping, walking, speaking to non-mahram briefly, praying, reading Quran."}
                </p>
              </div>
            </BlurFade>
          </div>
        </section>
      )}

      <section className="py-14 px-4 bg-[var(--if-green)] text-center">
        <BlurFade delay={0.1}>
          <div className="font-arabic text-2xl text-[var(--if-gold-light)] mb-3 leading-relaxed" dir="rtl">لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ</div>
          <p className="text-sm text-[var(--if-gold-pale)]/70">{lang === "te" ? "\"నేను హాజరు, ఓ అల్లాహ్, నేను హాజరు!\" — తల్బియహ్" : "\"Here I am, O Allah, here I am!\" — The Talbiyah"}</p>
        </BlurFade>
      </section>

      <Footer />
    </div>
  );
}

export default function HajjUmrah() {
  return <I18nProvider><HajjUmrahPage /></I18nProvider>;
}
