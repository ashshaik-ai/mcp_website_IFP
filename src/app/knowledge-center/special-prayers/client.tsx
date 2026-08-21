"use client";

import { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { PageShell } from "@/components/layout/PageShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* Bilingual copy for this file, hoisted out of the JSX so a translator
   can read and review it as one unit. */
const copy = {
  knowledge_center: { te: "జ్ఞాన కేంద్రం", en: "Knowledge Center" },
  special_prayers: { te: "ప్రత్యేక నమాజులు", en: "Special Prayers" },
  from_tahajjud_to_istikhara_5: { te: "తహజ్జుద్ నుండి ఈస్తిఖారా వరకు — 5 ముఖ్యమైన నఫిల్ & సాంఘిక నమాజులు", en: "From Tahajjud to Istikhara — 5 key voluntary and congregational prayers" },
  how_to_perform: { te: "ఎలా చేయాలి", en: "How to Perform" },
  key_du_a: { te: "ముఖ్యమైన దువా", en: "Key Du'a" },
  previous: { te: "వెనక", en: "Previous" },
  next: { te: "తదుపరి", en: "Next" },
} as const;

const prayers = [
  {
    id: "tahajjud",
    name: { te: "తహజ్జుద్", en: "Tahajjud" }, ar: "تهجد",
    time: { te: "అర్ధరాత్రి తర్వాత — ఫజ్ర్ ముందు", en: "After midnight — before Fajr" },
    rakaat: "2–8+ Raka'ah (voluntary)",
    importance: { te: "అల్లాహ్ ప్రతి రాత్రి దిగివచ్చే ముఖ్యమైన ప్రార్థన — దువాలు అంగీకరించే అవకాశం", en: "Allah descends to the lowest heaven every night — best time for du'a to be accepted" },
    steps: [
      { te: "రాత్రి మేల్కొని అబ్లూషన్ చేయండి", en: "Wake up at night and perform ablution" },
      { te: "2 లేదా 4 రక్అత్‌తో ప్రారంభించండి", en: "Begin with 2 or 4 raka'at" },
      { te: "తక్కువ గొంతుతో ఖురాన్ చదవండి", en: "Recite Quran in a low voice" },
      { te: "దువా-ఇ-ఖునూత్ చదవండి", en: "Recite Du'a al-Qunoot in witr" },
      { te: "విత్ర్‌తో ముగించండి", en: "End with Witr prayer" },
    ],
    dua: { ar: "اللّهُمَّ لَكَ الحَمدُ أنتَ قَيِّمُ السَّمواتِ والأرض", en: "O Allah, for You is all praise. You are the Sustainer of heavens and earth" },
    color: "bg-indigo-900",
  },
  {
    id: "juma",
    name: { te: "జుమా", en: "Jumu'ah (Friday)" }, ar: "الجمعة",
    time: { te: "శుక్రవారం జుహ్ర్ సమయం", en: "Friday at Zuhr time" },
    rakaat: "2 Fard (replaces Zuhr) + Sunnah",
    importance: { te: "ముస్లింల అత్యంత ముఖ్యమైన వారం సమావేశం. వెళ్ళడం ఫర్జ్ (పురుషులకు).", en: "Most important weekly gathering for Muslims. Attending is Fard (obligatory for men)." },
    steps: [
      { te: "శుక్రవారం ఉదయం స్నానం, పరిశుభ్రత", en: "Bathe on Friday morning, apply perfume" },
      { te: "సూరహ్ కహ్ఫ్ చదవండి (వారం మొత్తం నూర్)", en: "Read Surah Kahf (light for entire week)" },
      { te: "మసీద్‌కు ముందుగా వెళ్ళండి", en: "Go to Masjid early" },
      { te: "ఖతీబ్ ఖుత్బాను వినండి", en: "Listen attentively to the Khutbah" },
      { te: "జుమా 2 రక్అత్ చేయండి", en: "Perform 2 raka'at of Jumu'ah" },
    ],
    dua: { ar: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ", en: "O Allah, send blessings upon Muhammad and his family" },
    color: "bg-[#3d2800]",
  },
  {
    id: "eid",
    name: { te: "ఈద్ నమాజ్", en: "Eid Prayer" }, ar: "صلاة العيد",
    time: { te: "ఈద్ అల్-ఫిత్ర్ & ఈద్ అల్-అద్హా ఉదయం", en: "Eid al-Fitr & Eid al-Adha morning" },
    rakaat: "2 Raka'ah (with 7+5 extra Takbeerats)",
    importance: { te: "ఇస్లామిక్ సమాజం యొక్క అతిపెద్ద ఉత్సవ నమాజ్ — ఐక్యత & కృతజ్ఞత", en: "Greatest communal prayer in Islam — unity and gratitude" },
    steps: [
      { te: "ఫిత్ర్ కోసం: ఆహారం తిన్నాక వెళ్ళండి. అద్హా కోసం: ఖాళీ కడుపుతో వెళ్ళండి", en: "Eid al-Fitr: eat before; Eid al-Adha: go before eating" },
      { te: "ఈద్ గాహ్‌కు నడచి వెళ్ళండి (సాధ్యమైతే)", en: "Walk to the Eid prayer ground if possible" },
      { te: "తక్బీర్ చదవుతూ వెళ్ళండి", en: "Recite Takbeerats on the way" },
      { te: "మొదటి రక్అత్‌లో 7 తక్బీర్‌లు, రెండవలో 5 తక్బీర్‌లు", en: "7 extra Takbeers in 1st Raka'ah, 5 in 2nd" },
      { te: "2 ఖుత్బాలు వినండి. కుటుంబం & పొరుగువారిని కలవండి", en: "Listen to two Khutbahs. Meet family and neighbours" },
    ],
    dua: { ar: "تَقَبَّلَ اللهُ مِنَّا وَمِنْكُمْ", en: "May Allah accept from us and from you" },
    color: "bg-stone-800",
  },
  {
    id: "tarawih",
    name: { te: "తరావీహ్", en: "Tarawih" }, ar: "التراويح",
    time: { te: "రమజాన్ ఇషా తర్వాత ప్రతి రాత్రి", en: "Every night of Ramadan after Isha" },
    rakaat: "8 or 20 Raka'ah + Witr",
    importance: { te: "రమజాన్ నెల మొత్తం ప్రత్యేక ఇషా తర్వాత నమాజ్. సందేశం: ఖురాన్ పూర్తిగా పఠనం.", en: "Special night prayer throughout Ramadan. Tradition: complete Quran recitation" },
    steps: [
      { te: "ఇషా నమాజ్ తర్వాత మసీద్‌లో ఉండండి", en: "Stay at the Masjid after Isha" },
      { te: "2 రక్అత్ సలాం — 4 లేదా 10 సార్లు", en: "Perform 2 raka'at with Salam — 4 or 10 times" },
      { te: "ప్రతి 4 రక్అత్‌ల తర్వాత తక్బీర్ & విశ్రాంతి", en: "Rest and dhikr after every 4 raka'at" },
      { te: "విత్ర్ + దువా ఖునూత్‌తో ముగించండి", en: "End with Witr and Du'a Qunoot" },
    ],
    dua: { ar: "سُبْحَانَ الْمَلِكِ الْقُدُّوس", en: "Glory be to the King, the Holy" },
    color: "bg-teal-800",
  },
  {
    id: "istikhara",
    name: { te: "ఇస్తిఖారా", en: "Istikhara" }, ar: "صلاة الاستخارة",
    time: { te: "ఏ సమయంలోనైనా (నిషేధ సమయాలు తప్ప)", en: "Any time (except forbidden times)" },
    rakaat: "2 Raka'ah",
    importance: { te: "ముఖ్యమైన నిర్ణయాల కోసం అల్లాహ్ మార్గదర్శనం కోరడం — వివాహం, వ్యాపారం, ప్రయాణం", en: "Seeking Allah's guidance for important decisions — marriage, business, travel" },
    steps: [
      { te: "2 రక్అత్ నఫిల్ నమాజ్ చేయండి", en: "Perform 2 voluntary raka'at" },
      { te: "ఇస్తిఖారా దువా చదవండి (పూర్తి)", en: "Recite the full Du'a Istikhara" },
      { te: "అల్లాహ్‌పై విశ్వాసం ఉంచి నిద్రించండి", en: "Sleep with trust in Allah's decision" },
      { te: "హృదయ సాక్ష్యం అనుసరించండి — సంకేతం కోసం వేచి ఉండకండి", en: "Follow what your heart inclines to — don't wait for a dream" },
    ],
    dua: { ar: "اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ", en: "O Allah, I seek Your guidance by Your knowledge" },
    color: "bg-slate-800",
  },
];

function SpecialPrayersPage() {
  const { lang } = useI18n();
  const [active, setActive] = useState(0);

  const p = prayers[active];

  return (
    <PageShell>

      <section className={`${p.color} text-[var(--if-gold-pale)] py-20 px-4 transition-colors duration-500`}>
        <div className="mx-auto max-w-4xl text-center flex flex-col items-center gap-5">
          <BlurFade delay={0.05}>
            <Link href="/knowledge-center" className="inline-flex items-center min-h-6 gap-1 text-sm text-[var(--if-gold-pale)]/60 hover:text-[var(--if-gold-light)] transition-colors mb-2">
              <ChevronLeft className="h-4 w-4" />{copy.knowledge_center[lang]}
            </Link>
          </BlurFade>
          <BlurFade delay={0.1}>
            <span className="font-arabic text-4xl text-[var(--if-gold)]/70" dir="rtl">{p.ar}</span>
          </BlurFade>
          <BlurFade delay={0.15}>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-[var(--if-gold-light)]">
              {copy.special_prayers[lang]}
            </h1>
          </BlurFade>
          <BlurFade delay={0.2}>
            <p className="text-[var(--if-gold-pale)]/70 max-w-xl">
              {copy.from_tahajjud_to_istikhara_5[lang]}
            </p>
          </BlurFade>
        </div>
      </section>

      {/* Prayer selector */}
      <div className="sticky top-[68px] z-10 bg-[var(--if-cream-light)] border-b border-[var(--if-gold)]/15 px-4 py-2">
        <div className="mx-auto max-w-4xl overflow-x-auto flex gap-2 pb-1">
          {prayers.map((pr, i) => (
            <button key={pr.id} onClick={() => setActive(i)} className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${active === i ? "bg-[var(--if-green)] text-[var(--if-gold-light)]" : "text-[var(--if-text-muted)] hover:bg-[var(--if-gold)]/10"}`}>
              {pr.name[lang]}
            </button>
          ))}
        </div>
      </div>

      {/* Detail */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-3xl">
          <BlurFade delay={0.05} key={p.id}>
            <div className="relative overflow-hidden bg-white rounded-2xl border border-[var(--if-gold)]/20 p-8 mb-6">
              <BorderBeam size={200} duration={8} colorFrom="#0d3b1e" colorTo="#c8922a" />
              <div className="flex items-start gap-4 flex-wrap mb-5">
                <div>
                  <h2 className="font-display text-3xl font-bold text-[var(--if-green)]">{p.name[lang]}</h2>
                  <div className="font-arabic text-xl text-[var(--if-gold)]/70 mt-1" dir="rtl">{p.ar}</div>
                </div>
                <div className="ml-auto flex flex-col items-end gap-1">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[var(--if-gold)]/10 text-[var(--if-gold)] border border-[var(--if-gold)]/30">{p.rakaat}</span>
                  <span className="text-xs text-[var(--if-text-muted)]">{p.time[lang]}</span>
                </div>
              </div>
              <p className="text-[var(--if-text-muted)] leading-relaxed mb-6">{p.importance[lang]}</p>
              <h3 className="text-xs font-bold text-[var(--if-gold)] uppercase tracking-wider mb-3">{copy.how_to_perform[lang]}</h3>
              <ol className="space-y-2">
                {p.steps.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="w-6 h-6 rounded-full bg-[var(--if-green)] text-[var(--if-gold-light)] flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">{i + 1}</span>
                    <span className="text-[var(--if-text)]">{s[lang]}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Dua */}
            <div className="relative overflow-hidden bg-[var(--if-green)] rounded-2xl p-6 text-center">
              <BorderBeam size={150} duration={10} colorFrom="#c8922a" colorTo="#e8b84b" />
              <div className="text-[10px] font-bold text-[var(--if-gold)]/60 uppercase tracking-widest mb-3">{copy.key_du_a[lang]}</div>
              <div className="font-arabic text-xl text-[var(--if-gold-light)] leading-loose mb-2" dir="rtl">{p.dua.ar}</div>
              <div className="text-sm text-[var(--if-gold-pale)]/70">{p.dua.en}</div>
            </div>
          </BlurFade>

          {/* Prev / Next */}
          <div className="flex justify-between mt-6">
            <button disabled={active === 0} onClick={() => setActive(a => a - 1)} className="flex items-center gap-1 px-4 py-2 rounded-full border border-[var(--if-gold)]/30 text-sm text-[var(--if-green)] disabled:opacity-30 hover:bg-[var(--if-cream-light)]">
              <ChevronLeft className="h-4 w-4" />{copy.previous[lang]}
            </button>
            <button disabled={active === prayers.length - 1} onClick={() => setActive(a => a + 1)} className="flex items-center gap-1 px-4 py-2 rounded-full bg-[var(--if-green)] text-[var(--if-gold-light)] text-sm disabled:opacity-30">
              {copy.next[lang]}<ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

    </PageShell>
  );
}

export default function SpecialPrayers() {
  return <SpecialPrayersPage />;
}
