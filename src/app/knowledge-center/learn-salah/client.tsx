"use client";

import { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { Simulator } from "@/components/sim/Simulator";
import { SalahScene } from "@/components/sim/scenes3d/SalahScene";
import { WuduStage } from "@/components/sim/scenes3d/WuduStage";
import { salahSteps, wuduSteps as simWudu } from "@/content/simulations";

import { LessonIndex } from "@/components/learning/LessonIndex";
import { PortalJump } from "@/components/learning/PortalJump";
import { PortalWallpaper } from "@/components/learning/PortalWallpaper";
import { salahDhikr } from "@/content/salah-dhikr";
import { PageShell } from "@/components/layout/PageShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* Bilingual copy for this file, hoisted out of the JSX so a translator
   can read and review it as one unit. */
const copy = {
  knowledge_center: { te: "జ్ఞాన కేంద్రం", en: "Knowledge Center" },
  learn_salah: { te: "నమాజ్ నేర్చుకోండి", en: "Learn Salah" },
  from_wudu_to_salam_complete: { te: "వుజూ నుండి సలాం వరకు — పూర్తి నమాజ్ మార్గదర్శి, అరబిక్ పఠనాలు, తెలుగు అర్థాలతో", en: "From Wudu to Salam — complete prayer guide with Arabic recitations and translations" },
  the_5_obligatory_prayers: { te: "5 ఫర్జ్ నమాజులు", en: "The 5 Obligatory Prayers" },
  tap_each_card_to_expand: { te: "ప్రతి కార్డుపై నొక్కి వివరాలు చూడండి", en: "Tap each card to expand details" },
  fard: { te: "ఫర్జ్", en: "Fard" },
  rakaat: { te: "రకాతులు", en: "Rakaat" },
  witr_is_emphasized: { te: "విత్ర్ తప్పనిసరి", en: "Witr is emphasized" },
  note: { te: "గమనిక", en: "Note" },
  prayer_times_vary_by_location: { te: "🕌 నమాజు సమయాలు స్థానం మరియు ఋతువు ప్రకారం మారుతాయి. స్థానిక మస్జిద్ అజాన్ అనుసరించండి.", en: "🕌 Prayer times vary by location and season. Follow your local Masjid's adhan for accurate times." },
  wudu_ablution: { te: "వుజూ — పరిశుద్ధత", en: "Wudu — Ablution" },
  each_step_with_arabic_dua: { te: "అరబిక్ దువా మరియు అర్థంతో ప్రతి దశ", en: "Each step with Arabic dua and translation" },
  dua: { te: "దువా", en: "Dua" },
  back: { te: "వెనక", en: "Back" },
  next: { te: "తదుపరి", en: "Next" },
  salah_step_by_step: { te: "నమాజ్ — దశల వారీ మార్గదర్శి", en: "Salah — Step by Step" },
  salah_simulator: { te: "నమాజ్ సిమ్యులేటర్", en: "Salah Simulator" },
  from_takbeer_to_salam_what: { te: "తక్బీర్ నుండి సలాం వరకు — ఏం చేయాలి, ఏం చెప్పాలి, దాని అర్థం, తప్పులతో సహా", en: "From Takbeer to Salam — what to do, say, its meaning, and common mistake at each step" },
  action: { te: "ఏం చేయాలి", en: "Action" },
  recitation: { te: "ఏం చెప్పాలి", en: "Recitation" },
  common_mistake: { te: "సాధారణ తప్పు", en: "Common Mistake" },
  restart: { te: "మళ్ళీ ప్రారంభించు", en: "Restart" },
  common_mistakes: { te: "సాధారణ తప్పులు", en: "Common Mistakes" },
  recognise_each_mistake_and_correct: { te: "తప్పును గుర్తించి సరైన విధానంతో సరిదిద్దుకోండి", en: "Recognise each mistake and correct it the right way" },
} as const;

// ── Data ──────────────────────────────────────────────────────────────────────

const prayers = [
  {
    name: { te: "ఫజ్ర్", en: "Fajr" }, ar: "الفجر",
    time: { te: "సూర్యోదయానికి ముందు", en: "Before sunrise" },
    fard: 2, sunnah: "2 Sunnah (before)", witr: false,
    note: { te: "రోజులో మొదటి నమాజ్ — ఆత్మను మేల్కొలపడానికి", en: "First prayer of the day — to awaken the soul" },
    color: "from-[var(--if-green-mid)] to-[var(--if-green)]",
  },
  {
    name: { te: "జుహ్ర్", en: "Zuhr" }, ar: "الظهر",
    time: { te: "మధ్యాహ్నం తర్వాత", en: "After midday" },
    fard: 4, sunnah: "4 Sunnah (before) + 2 (after)", witr: false,
    note: { te: "మధ్యాహ్న విరామంలో అల్లాహ్‌ను స్మరించడం", en: "Remembering Allah in the midday pause" },
    color: "from-[var(--if-green-mid)] to-[var(--if-green)]",
  },
  {
    name: { te: "అసర్", en: "Asr" }, ar: "العصر",
    time: { te: "మధ్యాహ్నం తర్వాత", en: "Mid-afternoon" },
    fard: 4, sunnah: "4 Sunnah (before)", witr: false,
    note: { te: "ప్రవక్త ﷺ దీన్ని ప్రత్యేకంగా నొక్కి చెప్పారు", en: "The Prophet ﷺ emphasised this prayer especially" },
    color: "from-[var(--if-green-mid)] to-[var(--if-green)]",
  },
  {
    name: { te: "మఘ్రిబ్", en: "Maghrib" }, ar: "المغرب",
    time: { te: "సూర్యాస్తమయం తర్వాత", en: "After sunset" },
    fard: 3, sunnah: "2 Sunnah (after)", witr: false,
    note: { te: "సూర్యాస్తమయ కృతజ్ఞత నమాజ్", en: "Prayer of gratitude at sunset" },
    color: "from-[var(--if-green-mid)] to-[var(--if-green)]",
  },
  {
    name: { te: "ఇషా", en: "Isha" }, ar: "العشاء",
    time: { te: "రాత్రి", en: "Night" },
    fard: 4, sunnah: "2 Sunnah + 3 Witr", witr: true,
    note: { te: "రాత్రి నమాజ్, విత్ర్‌తో రోజు ముగించడం", en: "Night prayer, concluding the day with Witr" },
    color: "from-slate-900 to-slate-800",
  },
];

const wuduSteps = [
  {
    n: 1, title: { te: "నియ్యత్ (ఉద్దేశం)", en: "Niyyah (Intention)" }, ar: "النية",
    desc: { te: "అల్లాహ్ కోసం వుజూ చేయాలని మనసులో నిర్ణయించుకోండి", en: "Make the intention in your heart to perform Wudu for the sake of Allah" },
    dua: { ar: null, tr: null, te: "మనసులో సంకల్పం — ఉచ్చరించాల్సిన పని లేదు", en: "Intention is in the heart — no verbal dua required" },
  },
  {
    n: 2, title: { te: "బిస్మిల్లా", en: "Say Bismillah" }, ar: "بِسْمِ اللَّهِ",
    desc: { te: "ప్రారంభించే ముందు చదవండి", en: "Say before beginning" },
    dua: { ar: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", tr: "Bismillāhir-raḥmānir-raḥīm", te: "పరమ కరుణామయుడు, కృపాశీలుడైన అల్లాహ్ పేరుతో", en: "In the name of Allah, the Most Gracious, the Most Merciful" },
  },
  {
    n: 3, title: { te: "చేతులు కడగండి", en: "Wash Hands" }, ar: "غَسْلُ الْيَدَيْنِ",
    desc: { te: "రెండు చేతులనూ మణికట్టు వరకు 3 సార్లు కడగండి", en: "Wash both hands up to wrists 3 times" },
    dua: { ar: null, tr: null, te: "సున్నత్ — వుదూ ప్రారంభంలో", en: "Sunnah — at the start of Wudu" },
  },
  {
    n: 4, title: { te: "నోరు కడగండి", en: "Rinse Mouth" }, ar: "الْمَضْمَضَة",
    desc: { te: "నోటిలో నీరు తీసుకుని 3 సార్లు శుభ్రం చేయండి", en: "Take water in mouth and rinse 3 times" },
    dua: { ar: null, tr: null, te: "నోటిలోపలికి నీరు చేరేలా చేయండి", en: "Swirl water around the inside of the mouth" },
  },
  {
    n: 5, title: { te: "ముక్కు శుభ్రం చేయండి", en: "Clean Nose" }, ar: "الِاسْتِنْشَاق",
    desc: { te: "ముక్కులోకి నీరు పీల్చి 3 సార్లు శుభ్రం చేయండి", en: "Inhale water into nostrils and clean 3 times" },
    dua: { ar: null, tr: null, te: "ఎడమ చేతితో ముక్కు శుభ్రం చేయండి", en: "Use the left hand to clean the nose" },
  },
  {
    n: 6, title: { te: "ముఖం కడగండి", en: "Wash Face" }, ar: "غَسْلُ الْوَجْهِ",
    desc: { te: "నొసలు నుండి గడ్డం వరకు, చెవి నుండి చెవి వరకు 3 సార్లు", en: "From forehead to chin, ear to ear — 3 times" },
    dua: { ar: "اللَّهُمَّ بَيِّضْ وَجْهِي", tr: "Allāhumma bayyiḍ wajhī", te: "ఓ అల్లాహ్, నా ముఖాన్ని ప్రకాశింపజేయి", en: "O Allah, brighten my face" },
  },
  {
    n: 7, title: { te: "చేతులు కడగండి (మోచేయి వరకు)", en: "Wash Arms to Elbows" }, ar: "غَسْلُ الذِّرَاعَيْنِ",
    desc: { te: "కుడి చేయి ముందు, మోచేయి వరకు 3 సార్లు. తర్వాత ఎడమ చేయి", en: "Right arm first, up to elbow, 3 times. Then left arm" },
    dua: { ar: null, tr: null, te: "కుడి నుండి ఎడమకు — క్రమం తప్పనిసరి", en: "Right before left — the order is obligatory" },
  },
  {
    n: 8, title: { te: "తల మసహ్", en: "Wipe Head (Masah)" }, ar: "مَسْحُ الرَّأْسِ",
    desc: { te: "తడి చేతులతో తల ముందు నుండి వెనకకు 1 సారి", en: "With wet hands, wipe head from front to back — 1 time" },
    dua: { ar: "اللَّهُمَّ أَظِلَّنِي تَحْتَ ظِلِّ عَرْشِكَ", tr: "Allāhumma aẓillanī taḥta ẓilli ʿarshik", te: "ఓ అల్లాహ్, నీ సింహాసన నీడలో నన్ను ఆశ్రయించు", en: "O Allah, shelter me under the shade of Your Throne" },
  },
  {
    n: 9, title: { te: "చెవులు మసహ్", en: "Wipe Ears" }, ar: "مَسْحُ الْأُذُنَيْنِ",
    desc: { te: "చూపుడు వేళ్ళతో లోపలి భాగం, బొటనవేళ్ళతో బయటి భాగం", en: "Index fingers inside, thumbs outside — 1 time" },
    dua: { ar: null, tr: null, te: "తలతో పాటే — అదే నీటితో", en: "Part of head wipe — same water" },
  },
  {
    n: 10, title: { te: "పాదాలు కడగండి", en: "Wash Feet" }, ar: "غَسْلُ الرِّجْلَيْنِ",
    desc: { te: "కుడి పాదం ముందు, గసగసాల వరకు 3 సార్లు. తర్వాత ఎడమ పాదం", en: "Right foot first, up to ankles, 3 times. Then left foot" },
    dua: { ar: "اللَّهُمَّ ثَبِّتْ قَدَمَيَّ عَلَى الصِّرَاطِ", tr: "Allāhumma thabbit qadamayya ʿalaṣ-ṣirāṭ", te: "ఓ అల్లాహ్, న్యాయమార్గంపై నా పాదాలను స్థిరపరచు", en: "O Allah, keep my feet firm on the Straight Path" },
  },
];


const mistakes = [
  {
    cat: { te: "వుదూ తప్పులు", en: "Wudu Mistakes" },
    icon: "💧",
    items: [
      { bad: { te: "అవయవాలను తడపకుండా వదిలేయడం (పొడి మడమలు, మోచేతులు).", en: "Leaving body parts dry (dry heels, dry elbows)." }, good: { te: "ప్రతి అవయవంపై నీరు పూర్తిగా చేరేలా చూసుకోండి.", en: "Make sure water reaches every part of each limb." } },
      { bad: { te: "నీటిని వృథా చేయడం, అతిగా వాడటం.", en: "Wasting water and being excessive." }, good: { te: "మూడుసార్లకు మించకుండా, మితంగా వాడండి.", en: "Use moderately — no more than three washes." } },
      { bad: { te: "బిస్మిల్లాహ్ చదవకుండా వుదూ ప్రారంభించడం.", en: "Starting Wudu without saying Bismillah." }, good: { te: "ప్రతిసారీ 'బిస్మిల్లాహ్' తో ప్రారంభించండి.", en: "Begin every Wudu with 'Bismillah'." } },
    ],
  },
  {
    cat: { te: "నమాజ్ తప్పులు", en: "Salah Mistakes" },
    icon: "🕌",
    items: [
      { bad: { te: "రకాతుల మధ్య తొందరపడటం, స్థిరత్వం (తుమానీనా) లేకపోవడం.", en: "Rushing between positions without stillness (tuma'ninah)." }, good: { te: "ప్రతి దశలో శరీరం స్థిరపడేంత వరకు ఆగండి.", en: "Pause in each position until the body settles." } },
      { bad: { te: "ఇమామ్‌కు ముందుగా కదలడం.", en: "Moving ahead of the imam." }, good: { te: "ఇమామ్ తర్వాతే ప్రతి కదలికను అనుసరించండి.", en: "Follow the imam — move only after he does." } },
      { bad: { te: "సజ్దాలో ఏడు అవయవాలు నేలను తాకకపోవడం.", en: "The seven limbs not touching the ground in sujood." }, good: { te: "నుదురు, ముక్కు, రెండు చేతులు, మోకాళ్లు, కాలి వేళ్లు నేలపై ఉంచండి.", en: "Place forehead, nose, both hands, knees and toes on the ground." } },
    ],
  },
  {
    cat: { te: "పఠన తప్పులు", en: "Recitation Mistakes" },
    icon: "📖",
    items: [
      { bad: { te: "అర్థం మారిపోయేంత తప్పుగా ఉచ్చరించడం.", en: "Mispronouncing words so the meaning changes." }, good: { te: "అక్షరాలను నెమ్మదిగా, స్పష్టంగా, సరైన మఖ్‌రజ్‌తో పలకండి.", en: "Recite slowly and clearly with the correct letter sounds." } },
      { bad: { te: "ఫాతిహాను వదిలేయడం లేదా చాలా వేగంగా చదవడం.", en: "Skipping Al-Fatihah or reciting it too fast." }, good: { te: "ప్రతి రకాత్‌లో ఫాతిహాను స్పష్టంగా పూర్తిగా చదవండి.", en: "Recite Al-Fatihah fully and clearly in every unit." } },
      { bad: { te: "నమాజ్‌లో ఆలోచనలు ఎటో తిరగడం, యాంత్రికంగా చేయడం.", en: "Letting the mind wander; praying mechanically." }, good: { te: "మీరు పలికే మాటల అర్థాన్ని గుర్తుచేసుకుంటూ ఖుషూతో నిలబడండి.", en: "Stand with khushu, reflecting on the meaning of what you say." } },
    ],
  },
];

// ── Main Component ────────────────────────────────────────────────────────────

function LearnSalahPage() {
  const { lang } = useI18n();
  const [activeTab, setActiveTab] = useState<"times" | "wudu" | "salah" | "simulator" | "mistakes">("times");
  const [wuduStep, setWuduStep] = useState(0);
  const [expandedPrayer, setExpandedPrayer] = useState<number | null>(null);

  const tabs = [
    { id: "times" as const, te: "నమాజు సమయాలు", en: "Prayer Times" },
    { id: "wudu" as const, te: "వుజూ గైడ్", en: "Wudu Guide" },
    { id: "salah" as const, te: "నమాజ్ దశలు", en: "Salah Steps" },
    { id: "simulator" as const, te: "సిమ్యులేటర్", en: "Simulator" },
    { id: "mistakes" as const, te: "తప్పులు", en: "Mistakes" },
  ] as const;

  return (
    <PageShell>
      {/* Non-sticky, like the other portals that carry their own sticky tab
          bar: the flagship teaching portal was the one place a returning
          learner had no Start/Continue at all. */}
      <PortalJump portal="learn-salah" sticky={false} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-900 to-[var(--if-green)] text-[var(--if-gold-pale)] py-20 px-4">
        <PortalWallpaper portal="learn-salah" />
        <div className="mx-auto max-w-4xl text-center flex flex-col items-center gap-4">
          <BlurFade delay={0.05}>
            <Link href="/knowledge-center" className="inline-flex items-center min-h-11 gap-1 text-sm text-[var(--if-gold-pale)]/80 hover:text-[var(--if-gold-light)] transition-colors mb-1">
              <ChevronLeft className="h-4 w-4" />{copy.knowledge_center[lang]}
            </Link>
          </BlurFade>
          <BlurFade delay={0.1}><span className="font-arabic text-4xl text-[var(--if-gold-light)]" dir="rtl">الصَّلَاة</span></BlurFade>
          <BlurFade delay={0.15}>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-[var(--if-gold-light)]">
              {copy.learn_salah[lang]}
            </h1>
          </BlurFade>
          <BlurFade delay={0.2}>
            <p className="text-[var(--if-gold-pale)]/70 max-w-xl">
              {copy.from_wudu_to_salam_complete[lang]}
            </p>
          </BlurFade>
        </div>
      </section>

      {/* Tab bar */}
      <div className="if-tabstrip sticky top-[65px] z-10 bg-[var(--if-cream-light)] border-b border-[var(--if-gold)]/20 px-4 py-2 overflow-x-auto">
        <div className="mx-auto max-w-4xl flex gap-2 min-w-max">
          {tabs.map((tab) => (
            <button type="button" aria-pressed={activeTab === tab.id}
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 min-h-11 rounded-full text-sm font-semibold whitespace-nowrap transition-all whitespace-nowrap ${activeTab === tab.id ? "bg-[var(--if-green)] text-[var(--if-gold-light)]" : "text-[var(--if-text-muted)] hover:bg-[var(--if-gold)]/10"}`}
            >
              {lang === "te" ? tab.te : tab.en}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tab: Prayer Times ───────────────────────────────────────────────── */}
      {activeTab === "times" && (
        <section className="if-defer py-16 px-4">
          <div className="mx-auto max-w-4xl">
            <BlurFade delay={0.1}>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--if-green)] text-center mb-2">
                {copy.the_5_obligatory_prayers[lang]}
              </h2>
              <p className="text-center text-sm text-[var(--if-text-muted)] mb-8">
                {copy.tap_each_card_to_expand[lang]}
              </p>
            </BlurFade>
            <div className="flex flex-col gap-3">
              {prayers.map((p, i) => (
                <BlurFade key={p.ar} delay={0.07 * i}>
                  <div className={`rounded-2xl overflow-hidden bg-gradient-to-r ${p.color} text-white shadow-lg`}>
                    <button
                      onClick={() => setExpandedPrayer(expandedPrayer === i ? null : i)}
                      className="w-full flex items-center gap-4 p-4 text-left"
                      aria-expanded={expandedPrayer === i}
                    >
                      <span className="font-arabic text-2xl text-[var(--if-gold-light)] w-12 text-center shrink-0" dir="rtl">{p.ar}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-display font-bold text-lg">{p.name[lang]}</div>
                        <div className="text-xs text-white/70">{p.time[lang]}</div>
                      </div>
                      <div className="text-xs bg-white/15 rounded-full px-3 py-1 shrink-0">
                        {p.fard} {copy.fard[lang]}
                      </div>
                      <ChevronRight className={`h-4 w-4 text-white/60 shrink-0 transition-transform ${expandedPrayer === i ? "rotate-90" : ""}`} />
                    </button>
                    {expandedPrayer === i && (
                      <div className="px-5 pb-5 border-t border-white/10 pt-4 grid sm:grid-cols-2 gap-3 text-sm">
                        <div className="bg-white/10 rounded-xl p-3">
                          <div className="text-[var(--if-gold-light)] text-xs font-semibold uppercase tracking-wider mb-1">{copy.rakaat[lang]}</div>
                          <div>{p.fard} {copy.fard[lang]} · {p.sunnah}</div>
                          {p.witr && <div className="mt-1 text-[var(--if-gold-light)]">{copy.witr_is_emphasized[lang]}</div>}
                        </div>
                        <div className="bg-white/10 rounded-xl p-3">
                          <div className="text-[var(--if-gold-light)] text-xs font-semibold uppercase tracking-wider mb-1">{copy.note[lang]}</div>
                          <div>{p.note[lang]}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </BlurFade>
              ))}
            </div>
            <BlurFade delay={0.5}>
              <div className="mt-6 p-4 rounded-2xl bg-[var(--if-cream-light)] border border-[var(--if-gold)]/20 text-center text-sm text-[var(--if-text-muted)]">
                {copy.prayer_times_vary_by_location[lang]}
              </div>
            </BlurFade>
          </div>
        </section>
      )}

      {/* ── Tab: Wudu Guide ─────────────────────────────────────────────────── */}
      {activeTab === "wudu" && (
        <section className="if-defer py-16 px-4">
          <div className="mx-auto max-w-3xl mb-12">
            <Simulator steps={simWudu} scene={WuduStage} autoplay />
          </div>
          <div className="mx-auto max-w-2xl">
            <BlurFade delay={0.1}>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--if-green)] text-center mb-2">
                {copy.wudu_ablution[lang]}
              </h2>
              <p className="text-center text-sm text-[var(--if-text-muted)] mb-6">
                {copy.each_step_with_arabic_dua[lang]}
              </p>
            </BlurFade>
            <div className="relative overflow-hidden bg-white rounded-2xl border border-[var(--if-gold)]/20 p-6 mb-4">
              <BorderBeam size={200} duration={8} colorFrom="#c8922a" colorTo="#c8922a" />
              <div className="flex items-center gap-3 mb-4">
                <span className="w-9 h-9 rounded-full bg-[var(--if-green)] text-[var(--if-gold-light)] flex items-center justify-center font-bold">{wuduSteps[wuduStep].n}</span>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-bold text-[var(--if-green)]">{wuduSteps[wuduStep].title[lang]}</h3>
                </div>
                <span className="font-arabic text-xl text-[var(--if-gold-light)]" dir="rtl">{wuduSteps[wuduStep].ar}</span>
              </div>
              <p className="text-[var(--if-text-muted)] leading-relaxed mb-4">{wuduSteps[wuduStep].desc[lang]}</p>
              {wuduSteps[wuduStep].dua.ar && (
                <div className="mt-3 p-4 rounded-xl bg-[var(--if-cream-light)] border border-[var(--if-gold)]/20">
                  <div className="text-xs font-semibold text-[var(--if-gold-light)] uppercase tracking-wider mb-2">{copy.dua[lang]}</div>
                  <div className="font-arabic text-xl text-[var(--if-gold-light)] leading-relaxed text-right mb-2" dir="rtl">{wuduSteps[wuduStep].dua.ar}</div>
                  <div className="text-xs text-[var(--if-text-muted)] italic mb-1">{wuduSteps[wuduStep].dua.tr}</div>
                  <div className="text-sm text-[var(--if-text-muted)]">{wuduSteps[wuduStep].dua[lang]}</div>
                </div>
              )}
              {!wuduSteps[wuduStep].dua.ar && (
                <div className="mt-3 p-3 rounded-xl bg-[var(--if-cream-light)]/50 border border-[var(--if-gold)]/10">
                  <div className="text-sm text-[var(--if-text-muted)] italic">{wuduSteps[wuduStep].dua[lang]}</div>
                </div>
              )}
              <div className="flex items-center justify-between mt-6">
                <button disabled={wuduStep === 0} onClick={() => setWuduStep(s => s - 1)} className="inline-flex min-h-11 items-center gap-1 px-4 rounded-full border border-[var(--if-gold)]/30 text-sm text-[var(--if-green)] disabled:opacity-30 hover:bg-[var(--if-cream-light)] transition-colors">
                  <ChevronLeft className="h-4 w-4" />{copy.back[lang]}
                </button>
                <span className="text-xs text-[var(--if-text-muted)]">{wuduStep + 1} / {wuduSteps.length}</span>
                <button disabled={wuduStep === wuduSteps.length - 1} onClick={() => setWuduStep(s => s + 1)} className="inline-flex min-h-11 items-center gap-1 px-4 rounded-full bg-[var(--if-green)] text-[var(--if-gold-light)] text-sm disabled:opacity-30 hover:bg-[var(--if-green)]/90 transition-colors">
                  {copy.next[lang]}<ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {wuduSteps.map((s, i) => (
                <button key={s.n} onClick={() => setWuduStep(i)} className={`h-2 rounded-full transition-all ${i === wuduStep ? "bg-[var(--if-gold)]" : i < wuduStep ? "bg-emerald-400" : "bg-[var(--if-gold)]/20"}`} aria-label={`Step ${s.n}`} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Tab: Salah Steps ────────────────────────────────────────────────── */}
      {activeTab === "salah" && (
        <section className="if-defer py-16 px-4">
          <div className="mx-auto max-w-2xl">
            <BlurFade delay={0.1}>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--if-green)] text-center mb-8">
                {copy.salah_step_by_step[lang]}
              </h2>
            </BlurFade>
            <div className="flex flex-col gap-3">
              {salahDhikr.map((step, i) => (
                <BlurFade key={step.n} delay={0.05 * i}>
                  <div className="bg-white rounded-xl border border-[var(--if-gold)]/20 p-4 flex gap-4">
                    <span className="w-8 h-8 rounded-full bg-[var(--if-green)] text-[var(--if-gold-light)] flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">{step.n}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="font-display font-bold text-[var(--if-green)]">{step.name[lang]}</span>
                        <span className="text-xs text-[var(--if-text-muted)]">{step.pos[lang]}</span>
                      </div>
                      <div className="font-arabic text-lg text-[var(--if-gold-ink)] mb-1 text-right" dir="rtl">{step.ar}</div>
                      <div className="text-xs text-[var(--if-text-muted)] italic mb-1">{step.tr}</div>
                      <div className="text-sm text-[var(--if-text-muted)]">{step[lang]}</div>
                    </div>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Tab: Simulator ──────────────────────────────────────────────────── */}
      {activeTab === "simulator" && (
        <section className="py-16 px-4 bg-[var(--if-cream-light)]">
          <div className="mx-auto max-w-3xl">
            <BlurFade delay={0.05}>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--if-green)] text-center mb-2">{copy.salah_simulator[lang]}</h2>
              <p className="text-center text-sm text-[var(--if-text-muted)] mb-8">{lang === "te" ? "తక్బీర్ నుండి సలాం వరకు — చూసి నేర్చుకోండి" : "From Takbeer to Salam — watch, then follow"}</p>
            </BlurFade>
            <Simulator steps={salahSteps} scene={SalahScene} autoplay />
          </div>
        </section>
      )}

      {activeTab === "mistakes" && (
        <section className="if-defer py-16 px-4 bg-[var(--if-cream-light)]">
          <div className="mx-auto max-w-4xl">
            <BlurFade delay={0.1}>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--if-green)] text-center mb-2">
                {copy.common_mistakes[lang]}
              </h2>
              <p className="text-center text-sm text-[var(--if-text-muted)] mb-10">
                {copy.recognise_each_mistake_and_correct[lang]}
              </p>
            </BlurFade>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mistakes.map((m, mi) => (
                <BlurFade key={mi} delay={0.07 * mi}>
                  <div className="bg-white rounded-2xl border border-[var(--if-gold)]/20 p-5 h-full">
                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[var(--if-gold)]/10">
                      <span className="text-2xl">{m.icon}</span>
                      <h3 className="font-display font-bold text-[var(--if-green)]">{m.cat[lang]}</h3>
                    </div>
                    <div className="flex flex-col gap-4">
                      {m.items.map((item, ii) => (
                        <div key={ii} className="flex flex-col gap-1.5">
                          <div className="flex gap-2 text-sm text-[var(--if-text-muted)]">
                            <span className="text-red-500 font-bold shrink-0">✗</span>
                            <span>{item.bad[lang]}</span>
                          </div>
                          <div className="flex gap-2 text-sm text-emerald-700">
                            <span className="font-bold shrink-0">✓</span>
                            <span>{item.good[lang]}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>
      )}

      <LessonIndex portal="learn-salah" />

    </PageShell>
  );
}

export default function LearnSalah() {
  return <LearnSalahPage />;
}
