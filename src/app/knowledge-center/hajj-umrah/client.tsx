"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { Simulator } from "@/components/sim/Simulator";
import { HajjScene } from "@/components/sim/scenes/HajjScene";
import { hajjSteps as hajjSim, umrahSteps as umrahSim } from "@/content/simulations";

import { PageShell } from "@/components/layout/PageShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { LessonIndex } from "@/components/learning/LessonIndex";
import { PortalJump } from "@/components/learning/PortalJump";
import { ChevronLeft } from "lucide-react";

/* Bilingual copy for this file, hoisted out of the JSX so a translator
   can read and review it as one unit. */
const copy = {
  knowledge_center: { te: "జ్ఞాన కేంద్రం", en: "Knowledge Center" },
  hajj_umrah: { te: "హజ్ మరియు ఉమ్రహ్", en: "Hajj & Umrah" },
  n_5th_pillar_of_islam_complete: { te: "ఇస్లాం 5వ స్తంభం — హజ్ మార్గదర్శి. ఉమ్రహ్ వివరాలు. ఇహ్రామ్ నియమాలు.", en: "5th pillar of Islam — complete Hajj guide, Umrah details and Ihram rules" },
  hajj_steps: { te: "హజ్ దశలు", en: "Hajj Steps" },
  umrah_steps: { te: "ఉమ్రహ్ దశలు", en: "Umrah Steps" },
  ihram_rules: { te: "ఇహ్రామ్ నియమాలు", en: "Ihram Rules" },
  hajj_step_by_step: { te: "పదకొండు దశలు — ఇహ్రామ్ నుండి విదాయ్ తవాఫ్ వరకు. ఆడించండి, లేదా ఒక్కో దశ చూడండి.", en: "Eleven rites, from ihram to the farewell tawaf. Play it, or step through one at a time." },
  umrah_step_by_step: { te: "నాలుగు దశలు — ఇహ్రామ్, తవాఫ్, సఈ, హల్ఖ్.", en: "Four rites: ihram, tawaf, sa\u2019i, and cutting the hair." },
  back: { te: "వెనక", en: "Back" },
  next: { te: "తదుపరి", en: "Next" },
  step: { te: "దశ", en: "Step" },
  ihram_prohibitions: { te: "ఇహ్రామ్ — నిషేధాలు", en: "Ihram — Prohibitions" },
  permitted_in_ihram_eating_drinking: { te: "✅ ఇహ్రామ్‌లో అనుమతించబడినవి: తినడం, తాగడం, నిద్రించడం, నడవడం, వివాహేతర సంభాషణ, ప్రార్థనలు, ఖురాన్ పఠనం.", en: "✅ Permitted in Ihram: eating, drinking, sleeping, walking, speaking to non-mahram briefly, praying, reading Quran." },
  here_i_am_o_allah: { te: "\"నేను హాజరు, ఓ అల్లాహ్, నేను హాజరు!\" — తల్బియహ్", en: "\"Here I am, O Allah, here I am!\" — The Talbiyah" },
} as const;

/* The day chips shipped as plain English strings on a Telugu-default site. */


const ihramRules = [
  { rule: { te: "వేటాడడం నిషేధం", en: "No hunting" }, ar: "لا صيد" },
  { rule: { te: "సువాసన ఉపయోగించడం నిషేధం", en: "No perfume/fragrance" }, ar: "لا طيب" },
  { rule: { te: "శారీరక సంబంధం నిషేధం", en: "No marital relations" }, ar: "لا رفث" },
  { rule: { te: "గొడవ / వాదన నిషేధం", en: "No arguing or quarrelling" }, ar: "لا جدال" },
  { rule: { te: "జుట్టు, గోళ్ళు కత్తరించడం నిషేధం", en: "No cutting hair/nails" }, ar: "لا حلق" },
  { rule: { te: "కుట్టిన దుస్తులు నిషేధం (పురుషులు)", en: "No stitched clothing (men)" }, ar: "لا مخيط للرجال" },
];

const TABS = ["hajj", "umrah", "ihram"] as const;
type Tab = (typeof TABS)[number];
const TAB_KEY = "ifp-hajj-tab";
const subscribeNever = () => () => {};
const readStoredTab = (): Tab | null => {
  try {
    const t = sessionStorage.getItem(TAB_KEY);
    return TABS.includes(t as Tab) ? (t as Tab) : null;
  } catch {
    return null;
  }
};

function HajjUmrahPage() {
  const { lang } = useI18n();
  /* Coming Back to this page reset the tab to Hajj whatever the reader had
     open. The stored choice reads through useSyncExternalStore so the server
     render stays "hajj" and the restore lands post-hydration mismatch-free. */
  const stored = useSyncExternalStore(subscribeNever, readStoredTab, () => null);
  const [picked, setPicked] = useState<Tab | null>(null);
  const tab = picked ?? stored ?? "hajj";
  const setTab = (t: Tab) => {
    setPicked(t);
    try {
      sessionStorage.setItem(TAB_KEY, t);
    } catch {
      /* Storage blocked; the tab still switches for this page view. */
    }
  };

  return (
    <PageShell>
      <PortalJump portal="hajj-umrah" sticky={false} />

      <section className="bg-gradient-to-br from-[var(--if-green-mid)] to-[var(--if-green)] text-[var(--if-gold-pale)] py-20 px-4">
        <div className="mx-auto max-w-4xl text-center flex flex-col items-center gap-5">
          <BlurFade delay={0.05}>
            <Link href="/knowledge-center" className="inline-flex items-center min-h-11 gap-1 text-sm text-[var(--if-gold-pale)]/80 hover:text-[var(--if-gold-light)] transition-colors mb-2">
              <ChevronLeft className="h-4 w-4" />{copy.knowledge_center[lang]}
            </Link>
          </BlurFade>
          <BlurFade delay={0.1}>
            <span className="font-arabic text-4xl text-[var(--if-gold-light)]" dir="rtl">الحج والعمرة</span>
          </BlurFade>
          <BlurFade delay={0.15}>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-[var(--if-gold-light)]">
              {copy.hajj_umrah[lang]}
            </h1>
          </BlurFade>
          <BlurFade delay={0.2}>
            <p className="text-[var(--if-gold-pale)]/70 max-w-xl">
              {copy.n_5th_pillar_of_islam_complete[lang]}
            </p>
          </BlurFade>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-[65px] z-10 bg-[var(--if-cream-light)] border-b border-[var(--if-gold)]/20 px-4 py-2">
        <div className="if-tabstrip mx-auto max-w-3xl flex gap-2 overflow-x-auto min-w-0">
          {(["hajj", "umrah", "ihram"] as const).map((t) => (
            <button key={t} type="button" aria-pressed={tab === t} onClick={() => { setTab(t); }} className={`px-4 min-h-11 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${tab === t ? "bg-[var(--if-green)] text-[var(--if-gold-light)]" : "text-[var(--if-text-muted)] hover:bg-[var(--if-gold)]/10"}`}>
              {t === "hajj" ? (copy.hajj_steps[lang]) : t === "umrah" ? (copy.umrah_steps[lang]) : (copy.ihram_rules[lang])}
            </button>
          ))}
        </div>
      </div>

      {/* Step guide */}
      {(tab === "hajj" || tab === "umrah") && (
        <section className="if-defer py-16 px-4">
          <div className="mx-auto max-w-3xl mb-12">
            {/* Without this the Hajj and Umrah panels had no heading at all
                and simply were not in the page outline. */}
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--if-green)] text-center mb-8">
              {tab === "hajj" ? copy.hajj_steps[lang] : copy.umrah_steps[lang]}
            </h2>
            <Simulator key={tab} steps={tab === "hajj" ? hajjSim : umrahSim} scene={HajjScene} autoplay />
          </div>
          <p className="mx-auto max-w-2xl text-center text-sm text-[var(--if-text-muted)] text-pretty">
            {tab === "hajj" ? copy.hajj_step_by_step[lang] : copy.umrah_step_by_step[lang]}
          </p>
        </section>
      )}

      {/* Ihram rules */}
      {tab === "ihram" && (
        <section className="if-defer py-16 px-4">
          <div className="mx-auto max-w-3xl">
            <BlurFade delay={0.1}>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--if-green)] text-center mb-8">
                {copy.ihram_prohibitions[lang]}
              </h2>
            </BlurFade>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ihramRules.map((r, i) => (
                <BlurFade key={i} delay={0.07 * i}>
                  <div className="flex items-center gap-3 bg-white border border-[var(--if-gold)]/20 rounded-xl p-4">
                    <span aria-hidden="true" className="text-xl flex-shrink-0">🚫</span>
                    <div>
                      <div className="font-semibold text-[var(--if-green)] text-sm">{r.rule[lang]}</div>
                      <div className="font-arabic text-sm text-[var(--if-gold-ink)]" dir="rtl">{r.ar}</div>
                    </div>
                  </div>
                </BlurFade>
              ))}
            </div>
            <BlurFade delay={0.5}>
              <div className="mt-6 p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
                <p className="text-sm text-emerald-800">
                  {copy.permitted_in_ihram_eating_drinking[lang]}
                </p>
              </div>
            </BlurFade>
          </div>
        </section>
      )}

      {/* Without this the six lessons are reachable only from the sitemap. */}
      <LessonIndex portal="hajj-umrah" />

      <section className="if-defer py-14 px-4 bg-[var(--if-green)] text-center">
        <BlurFade delay={0.1}>
          <div className="font-arabic text-2xl text-[var(--if-gold-light)] mb-3 leading-relaxed" dir="rtl">لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ</div>
          <p className="text-sm text-[var(--if-gold-pale)]/70">{copy.here_i_am_o_allah[lang]}</p>
        </BlurFade>
      </section>

    </PageShell>
  );
}

export default function HajjUmrah() {
  return <HajjUmrahPage />;
}
