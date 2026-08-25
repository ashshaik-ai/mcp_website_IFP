"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { Simulator } from "@/components/sim/Simulator";
import { WuduScene } from "@/components/sim/scenes/WuduScene";
import { ghuslSteps } from "@/content/simulations";

import { ComparisonTable } from "@/components/learning/ComparisonTable";
import { FaqList } from "@/components/learning/FaqList";
import { womensWorship, womensFaqs } from "@/content/portals";
import { PageShell } from "@/components/layout/PageShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { LessonIndex } from "@/components/learning/LessonIndex";
import { PortalJump } from "@/components/learning/PortalJump";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* Bilingual copy for this file, hoisted out of the JSX so a translator
   can read and review it as one unit. */
const copy = {
  knowledge_center: { te: "జ్ఞాన కేంద్రం", en: "Knowledge Center" },
  women_s_guidance: { te: "మహిళల మార్గదర్శనం", en: "Women's Guidance" },
  rights_prayer_hijab_family_the: { te: "హక్కులు, నమాజ్, హిజాబ్, కుటుంబం — ఐదు విషయ మార్గదర్శికలు, నికాహ్ మరియు ఇద్దత్‌పై రెండు పూర్తి పాఠాలు", en: "Rights, prayer, hijab and family in five topic guides, plus full lessons on nikah and iddah" },
  previous: { te: "వెనక", en: "Previous" },
  next: { te: "తదుపరి", en: "Next" },
  paradise_lies_at_the_feet: { te: "\"జన్నత్ అమ్మల పాదాల కింద ఉంది\" — నసాయీ", en: "\"Paradise lies at the feet of mothers\" — Al-Nasai" },
} as const;

const sections = [
  {
    id: "rights",
    title: { te: "ఇస్లాంలో మహిళల హక్కులు", en: "Women's Rights in Islam" }, ar: "حقوق المرأة في الإسلام",
    color: "bg-[#1a3a2a]",
    icon: "⚖️",
    points: [
      { te: "ఆస్తి హక్కు — విక్రయించే, కొనే, వారసత్వ హక్కు", en: "Property rights — to buy, sell, and inherit in their own name" },
      { te: "విద్య హక్కు — 'జ్ఞాన సాధన ప్రతి ముస్లింపై ఫర్జ్' (హదీస్)", en: "Right to education — 'Seeking knowledge is an obligation on every Muslim' (Hadith)" },
      { te: "వివాహ సమ్మతి — బలవంతమైన వివాహం ఇస్లాంలో చెల్లదు", en: "Consent in marriage — forced marriage is invalid in Islam" },
      { te: "ఖుల్‌ హక్కు — అసంతృప్తికర వివాహాన్ని ముగించే హక్కు", en: "Right to Khul — to end an unsatisfactory marriage" },
      { te: "విద్య, వ్యాపారం, పనిలో భాగస్వామ్యం", en: "Right to participate in education, business, and work" },
      { te: "స్వంత అభిప్రాయం & మత సాక్ష్యం ఇవ్వడం", en: "Right to opinion and to give religious testimony" },
    ],
  },
  {
    id: "prayer",
    title: { te: "మహిళల నమాజ్ మార్గదర్శి", en: "Women's Prayer Guide" }, ar: "صلاة المرأة",
    color: "bg-teal-800",
    icon: "🤲",
    points: [
      { te: "5 ఫర్జ్ నమాజులు — పురుషులకు సమానంగా ఫర్జ్", en: "5 daily prayers — equally obligatory as for men" },
      { te: "ఇంట్లో నమాజ్ చేయడం ఆఫ్ఝల్ (శ్రేష్ఠం) — మసీద్ హక్కు నిషేధించబడదు", en: "Praying at home is most virtuous — but Masjid is not forbidden" },
      { te: "ఆవ్రత్ (అడుగు వేళ్ళు తప్ప పూర్తి శరీరం కప్పాలి)", en: "Cover entire body except face and hands (Awrah for prayer)" },
      { te: "హైద్ & నిఫాస్ సమయంలో నమాజ్, రోజా తప్పనిసరి కాదు", en: "Prayer and fasting are not obligatory during menses (Haidh) and post-natal bleeding (Nifas)" },
      { te: "హైద్ తర్వాత మిస్సయిన రోజాలు ఖజా (పరిహారం) చేయాలి", en: "Missed Ramadan fasts during menses must be made up (Qadha), but not the prayers" },
      { te: "జుమా నమాజ్ మహిళలకు ఫర్జ్ కాదు — జుహ్ర్ సరిపోతుంది", en: "Jumu'ah is not obligatory for women — Zuhr suffices" },
    ],
  },
  {
    id: "hijab",
    title: { te: "హిజాబ్ & స్కారఫ్", en: "Hijab & Modesty" }, ar: "الحجاب والحشمة",
    color: "bg-slate-800",
    icon: "🧕",
    points: [
      { te: "హిజాబ్ ఖురాన్ ఆదేశం — సూరహ్ నూర్ 24:31, సూరహ్ అహ్జాబ్ 33:59", en: "Hijab is a Quranic command — Surah An-Nur 24:31, Surah Al-Ahzab 33:59" },
      { te: "ముసుగు మహ్రం (ముఖ & చేతులు) ముందు అవసరం లేదు", en: "Veil is not required in front of mahrams (husband, father, brothers, sons)" },
      { te: "ఉద్దేశం: పవిత్రత, గౌరవం & హుందాతనం — శిక్ష కాదు", en: "Purpose: modesty, dignity and identity — not punishment" },
      { te: "ఔటర్ గార్మెంట్ సగటు పరిశీలకుడిని ఆకర్షించకూడదు", en: "Outer garment must not attract undue attention" },
      { te: "ముఖ కప్పడం (నిఖాబ్) — ఫర్జ్ కాదు, సున్నత్ అభిప్రాయం ఉంది", en: "Face veil (Niqab) — not obligatory; considered Sunnah by many scholars" },
      { te: "ముఖ్యంగా: అల్లాహ్‌కు ఇష్టమైనది — సమాజ ఒత్తిడికి లొంగడం కాదు", en: "Key: pleasing Allah — not pressure from society or trend" },
    ],
  },
  {
    id: "role-models",
    title: { te: "ముస్లిం మహిళా ఆదర్శాలు", en: "Muslim Women Role Models" }, ar: "نساء عظيمات في الإسلام",
    color: "bg-[#5c3d00]",
    icon: "⭐",
    points: [
      { te: "ఖదీజహ్ RA — ప్రవక్త ﷺ మొదటి భార్య, విజయవంతమైన వ్యాపారి, ఇస్లాంలో మొదటి మహిళ", en: "Khadijah RA — Prophet's ﷺ first wife, successful businesswoman, first woman in Islam" },
      { te: "ఆయేషా RA — ఇస్లాం యొక్క గొప్ప పండితురాలు, 2000+ హదీస్‌లు నివేదించారు", en: "Aisha RA — greatest Islamic scholar, narrated 2000+ Hadith" },
      { te: "ఫాతిమా RA — ప్రవక్త కుమార్తె, 'జన్నతులో మహిళలకు నేత'", en: "Fatimah RA — Prophet's daughter, 'leader of women in Jannah'" },
      { te: "మర్యమ్ AS — ఖురాన్‌లో అత్యధికంగా ప్రస్తావించబడిన మహిళ, ఒకే సూరహ్ ఆమె పేరిట", en: "Maryam AS — most mentioned woman in Quran; only woman with a Surah named after her" },
      { te: "సుమయ్యా RA — ఇస్లాం కోసం మొదటి అమరవీర, ధైర్యశాలి", en: "Sumayyah RA — first martyr of Islam, embodiment of strength and faith" },
      { te: "జైనబ్ బింత్ ముహమ్మద్ RA — ఇస్లాం కోసం ఎంతో త్యాగాలు చేసిన నిశ్చల ఆత్మ", en: "Zaynab bint Muhammad RA — steadfast in trials, great sacrifices for Islam" },
    ],
  },
  {
    id: "family",
    title: { te: "కుటుంబంలో మహిళ", en: "Women in Family & Society" }, ar: "المرأة في الأسرة والمجتمع",
    color: "bg-emerald-900",
    icon: "🏡",
    points: [
      { te: "'అమ్మ పాదాల కింద జన్నత్ ఉంది' — అత్యున్నత గౌరవం", en: "'Paradise lies beneath the mother's feet' — the highest honour in Islam" },
      { te: "మహ్ర్ (మెహర్) — వివాహంలో భర్త నుండి భార్యకు తప్పనిసరి బహుమతి", en: "Mahr — obligatory gift from husband to wife at marriage, hers to keep" },
      { te: "పిల్లల పోషణ — ఖర్చులు భర్త బాధ్యత, తల్లి కాదు", en: "Financial support — husband must provide; wife's income is her own" },
      { te: "విడాకుల తర్వాత: ఇద్దత్ కాలంలో పోషణ భర్త బాధ్యత", en: "After divorce: husband provides during Iddah period" },
      { te: "విధవలు & విడాకులు: ఇస్లాం రెండవ వివాహం ప్రోత్సహిస్తుంది", en: "Widows & divorcees: Islam encourages remarriage and societal support" },
      { te: "కమ్యూనిటీ పాత్ర: బోధించడం, చికిత్స, సహాయం — ప్రాచీన సంప్రదాయం", en: "Community roles: teaching, medicine, counselling — ancient Islamic tradition" },
    ],
  },
];

function WomensGuidancePage() {
  const { lang } = useI18n();
  const [active, setActive] = useState(0);

  /* Next/Previous move the selection; the pill strip follows, or past the
     third section the highlighted pill sat off-screen. */
  useEffect(() => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    document
      .getElementById(`if-wg-pill-${active}`)
      ?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", inline: "center", block: "nearest" });
  }, [active]);

  const s = sections[active];

  return (
    <PageShell>
      <PortalJump portal="womens-guidance" sticky={false} />

      <section className={`${s.color} text-[var(--if-gold-pale)] py-20 px-4 transition-colors duration-500`}>
        <div className="mx-auto max-w-4xl text-center flex flex-col items-center gap-5">
          <BlurFade delay={0.05}>
            <Link href="/knowledge-center" className="inline-flex items-center min-h-11 gap-1 text-sm text-[var(--if-gold-pale)]/80 hover:text-[var(--if-gold-light)] transition-colors mb-2">
              <ChevronLeft className="h-4 w-4" />{copy.knowledge_center[lang]}
            </Link>
          </BlurFade>
          <BlurFade delay={0.1}>
            <span className="font-arabic text-4xl text-[var(--if-gold-light)]" dir="rtl">إرشادات المرأة</span>
          </BlurFade>
          <BlurFade delay={0.15}>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-[var(--if-gold-light)]">
              {copy.women_s_guidance[lang]}
            </h1>
          </BlurFade>
          <BlurFade delay={0.2}>
            <p className="text-[var(--if-gold-pale)]/70 max-w-xl">
              {copy.rights_prayer_hijab_family_the[lang]}
            </p>
          </BlurFade>
        </div>
      </section>

      {/* Section selector */}
      <div className="sticky top-[65px] z-10 bg-[var(--if-cream-light)] border-b border-[var(--if-gold)]/20 px-4 py-2">
        <div className="if-tabstrip mx-auto max-w-5xl overflow-x-auto flex gap-2 pb-1">
          {sections.map((sec, i) => (
            <button key={sec.id} id={`if-wg-pill-${i}`} type="button" aria-pressed={active === i} onClick={() => setActive(i)} className={`flex-shrink-0 px-4 min-h-11 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${active === i ? "bg-[var(--if-green)] text-[var(--if-gold-light)]" : "text-[var(--if-text-muted)] hover:bg-[var(--if-gold)]/10"}`}>
              {sec.title[lang]}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <section className="if-defer py-16 px-4">
        <div className="mx-auto max-w-3xl">
          <BlurFade delay={0.05} key={s.id}>
            <div className="relative overflow-hidden bg-white rounded-2xl border border-[var(--if-gold)]/20 p-8 mb-6">
              <BorderBeam size={200} duration={8} colorFrom="#c8922a" colorTo="#c8922a" />
              <div className="flex items-center gap-3 mb-1">
                <span aria-hidden="true" className="text-3xl">{s.icon}</span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--if-green)]">{s.title[lang]}</h2>
              </div>
              <div className="font-arabic text-lg text-[var(--if-gold-light)] mb-6" dir="rtl">{s.ar}</div>
              <div className="space-y-3">
                {s.points.map((pt, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span aria-hidden="true" className="text-[var(--if-gold-ink)] mt-1 flex-shrink-0 text-lg">✦</span>
                    <p className="text-[var(--if-text)] leading-relaxed">{pt[lang]}</p>
                  </div>
                ))}
              </div>
            </div>
          </BlurFade>

          <div className="flex justify-between">
            <button disabled={active === 0} onClick={() => setActive(a => a - 1)} className="inline-flex min-h-11 items-center gap-1 px-4 rounded-full border border-[var(--if-gold)]/30 text-sm text-[var(--if-green)] disabled:opacity-30 hover:bg-[var(--if-cream-light)]">
              <ChevronLeft className="h-4 w-4" />{copy.previous[lang]}
            </button>
            <span className="self-center text-xs text-[var(--if-text-muted)]">{active + 1} / {sections.length}</span>
            <button disabled={active === sections.length - 1} onClick={() => setActive(a => a + 1)} className="inline-flex min-h-11 items-center gap-1 px-4 rounded-full bg-[var(--if-green)] text-[var(--if-gold-light)] text-sm disabled:opacity-30">
              {copy.next[lang]}<ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <section className="if-defer py-14 px-4 bg-[var(--if-green)] text-center">
        <BlurFade delay={0.1}>
          <div className="font-arabic text-2xl text-[var(--if-gold-light)] mb-3 leading-relaxed" dir="rtl">الْجَنَّةُ تَحْتَ أَقْدَامِ الْأُمَّهَاتِ</div>
          <p className="text-sm text-[var(--if-gold-pale)]/70">
            {copy.paradise_lies_at_the_feet[lang]}
          </p>
        </BlurFade>
      </section>

      <section id="worship" className="if-defer py-16 px-4 scroll-mt-32 bg-[var(--if-cream-light)]">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--if-green)] mb-2">
            {lang === "te" ? "హైద్ సమయంలో ఆరాధన" : "Worship during Hayd"}
          </h2>
          <p className="text-[var(--if-text-muted)] mb-6 text-pretty">
            {lang === "te"
              ? "ఏది అనుమతించబడింది, ఏది కాదు, మరియు తర్వాత ఏది పూరించాలి."
              : "What is permitted, what is not, and what needs making up afterwards."}
          </p>
          <ComparisonTable
            rows={womensWorship}
            columns={[
              { key: "practice", label: { te: "ఆచరణ", en: "Practice" } },
              { key: "hayd", label: { te: "హైద్ సమయంలో", en: "During Hayd" } },
              { key: "note", label: { te: "గమనిక", en: "Note" } },
            ]}
          />
        </div>
      </section>

      <section id="faqs" className="if-defer py-16 px-4 scroll-mt-32">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--if-green)] mb-6">
            {lang === "te" ? "తరచుగా అడిగే ప్రశ్నలు" : "Frequently asked"}
          </h2>
          <FaqList items={womensFaqs} />
        </div>
      </section>

      {/* The tabs cover worship; these cover the contract and the iddah. */}
      {/* ── Simulator ── */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--if-green)] text-center mb-2">
            {lang === "te" ? "ఘుస్ల్ — దశలవారీగా చూడండి" : "Ghusl — step by step"}
          </h2>
          <p className="text-center text-sm text-[var(--if-text-muted)] mb-8 text-pretty">
            {lang === "te"
              ? "హైద్ లేదా జనాబత్ తర్వాత పూర్తి స్నానం ఎలా చేయాలో ఈ సిమ్యులేటర్ చూపిస్తుంది."
              : "How the full purifying bath is performed after hayd or janabah, played through."}
          </p>
          <Simulator steps={ghuslSteps} scene={WuduScene} autoplay />
        </div>
      </section>

      <LessonIndex portal="womens-guidance" />

    </PageShell>
  );
}

export default function WomensGuidance() {
  return <WomensGuidancePage />;
}
