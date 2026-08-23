"use client";

import { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { Simulator } from "@/components/sim/Simulator";
import { EmpiresScene } from "@/components/sim/scenes/EmpiresScene";
import { historySteps } from "@/content/simulations";

import { LessonIndex } from "@/components/learning/LessonIndex";
import { PortalJump } from "@/components/learning/PortalJump";
import { NarrativeCards } from "@/components/learning/NarrativeCards";
import { historyEras, historyPeople, historyEmpires, historyCities } from "@/content/portals";
import { PageShell } from "@/components/layout/PageShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* Bilingual copy for this file, hoisted out of the JSX so a translator
   can read and review it as one unit. */
const copy = {
  knowledge_center: { te: "జ్ఞాన కేంద్రం", en: "Knowledge Center" },
  islamic_history: { te: "ఇస్లామిక్ చరిత్ర", en: "Islamic History" },
  from_rashidun_to_today_6: { te: "రాషిదీన్ నుండి నేటి వరకు — 6 యుగాల గొప్ప ఇస్లామిక్ నాగరికత", en: "From Rashidun to today — 6 eras of great Islamic civilisation" },
  n_6_era_history_timeline: { te: "6-యుగాల చరిత్ర కాలపట్టిక", en: "6-Era History Timeline" },
  lesson: { te: "పాఠం:", en: "Lesson:" },
  notable: { te: "ప్రముఖుడు:", en: "Notable:" },
  historical_personalities: { te: "చారిత్రక వ్యక్తిత్వాలు", en: "Historical Personalities" },
  great_figures_who_shaped_islamic: { te: "ఇస్లామిక్ చరిత్రను నిర్మించిన మహా వ్యక్తులు", en: "Great figures who shaped Islamic history" },
  legacy: { te: "వారసత్వం:", en: "Legacy:" },
  civilization_explorer: { te: "నాగరికత అన్వేషకుడు", en: "Civilization Explorer" },
  great_cities_of_history: { te: "చరిత్ర మహా నగరాలు", en: "Great Cities of History" },
  great_cities_that_powered_islamic: { te: "ఇస్లామిక్ నాగరికతను నడిపిన మహా నగరాలు — ప్రతి దాని ప్రాముఖ్యత మరియు విశిష్టత", en: "Great cities that powered Islamic civilisation — their importance and key achievement" },
  apply_today: { te: "నేటికి అన్వయించండి", en: "Apply Today" },
  lessons_from_history: { te: "చరిత్ర నుండి పాఠాలు", en: "Lessons from History" },
  six_timeless_lessons_history_teaches: { te: "చరిత్ర నేర్పే ఆరు కాలాతీత పాఠాలు — చారిత్రక ఉదాహరణ మరియు నేటి ఆచరణ", en: "Six timeless lessons history teaches — a historical example and modern application" },
  apply: { te: "ఆచరణ:", en: "Apply:" },
  you_are_the_best_nation: { te: "\"మీరు మానవుల కోసం వెలువడిన ఉత్తమ జాతి\" — సూరహ్ ఆలె ఇమ్రాన్ 3:110", en: "\"You are the best nation produced for mankind\" — Surah Ali Imran 3:110" },
} as const;

/* highlights were plain strings, so all 24 of them rendered in English inside
   the Telugu era panel. */
const eras = [
  {
    num: 1, years: { te: "క్రీ.శ. 632–661", en: "632–661 CE" }, color: "bg-[var(--if-green)]",
    title: { te: "ఖులఫా-ఇ-రాషిదీన్", en: "Rightly Guided Caliphs" }, ar: "الخلفاء الراشدون",
    desc: { te: "అబూ బక్ర్, ఉమర్, ఉస్మాన్, అలీ రా. ఇస్లాం యొక్క స్వర్ణయుగం — ఆదర్శ పాలన", en: "Abu Bakr, Umar, Uthman, Ali RA — the golden age of ideal Islamic governance" },
    highlights: [
      { te: "ఖురాన్ ఒకే గ్రంథంగా సంకలనం", en: "Quran compiled into one book" },
      { te: "ఇస్లాం కింద అరేబియా ఏకీకరణ", en: "Arabia unified under Islam" },
      { te: "న్యాయమైన, సంప్రదింపుల పాలన", en: "Just and consultative governance" },
      { te: "పర్షియా, లెవాంట్‌లోకి విస్తరణ", en: "Expansion into Persia & Levant" },
    ],
    lesson: { te: "న్యాయమైన నాయకత్వం బలమైన సమాజాన్ని నిర్మిస్తుంది", en: "Just leadership builds a strong society" },
    personality: "Umar ibn al-Khattab RA",
  },
  {
    num: 2, years: { te: "క్రీ.శ. 661–750", en: "661–750 CE" }, color: "bg-[var(--if-green)]",
    title: { te: "ఉమయ్యా సామ్రాజ్యం", en: "Umayyad Dynasty" }, ar: "الأمويون",
    desc: { te: "ఇస్లాం స్పెయిన్ నుండి సింధ్ వరకు విస్తరించింది — దమాస్కస్ రాజధానిగా", en: "Islam spread from Spain to Sindh — capital at Damascus" },
    highlights: [
      { te: "స్పెయిన్ (అల్-అందలుస్) చేరిన ఇస్లాం", en: "Islam reaches Spain (Al-Andalus)" },
      { te: "ఇస్లామిక్ వాస్తుశిల్పం వికసించింది", en: "Islamic architecture flourished" },
      { te: "అరబిక్ అధికార భాషగా మారింది", en: "Arabic became official language" },
      { te: "సముద్ర మార్గ విస్తరణ", en: "Maritime expansion" },
    ],
    lesson: { te: "బలమైన వ్యవస్థ నాగరికతను విస్తృతంగా వ్యాప్తి చేస్తుంది", en: "Strong organisation spreads civilisation widely" },
    personality: "Umar ibn Abdul-Aziz",
  },
  {
    num: 3, years: { te: "క్రీ.శ. 750–1258", en: "750–1258 CE" }, color: "bg-[var(--if-green)]",
    title: { te: "అబ్బాసీ స్వర్ణయుగం", en: "Abbasid Golden Age" }, ar: "العصر الذهبي",
    desc: { te: "బాగ్దాద్ ప్రపంచ జ్ఞాన కేంద్రం — విజ్ఞాన, గణిత, వైద్య పురోగతి", en: "Baghdad was the world's knowledge centre — science, math, medicine flourished" },
    highlights: [
      { te: "బైత్ అల్-హిక్మా (జ్ఞాన గృహం)", en: "House of Wisdom (Bayt al-Hikmah)" },
      { te: "బీజగణితం, అల్గారిథమ్‌ల ఆవిష్కరణ", en: "Algebra & Algorithms invented" },
      { te: "ఇబ్న్ సీనా వైద్య విజ్ఞాన సర్వస్వం", en: "Medical Encyclopedia by Ibn Sina" },
      { te: "కాగితం, గ్రంథాలయాల విస్తరణ", en: "Paper & libraries spread" },
    ],
    lesson: { te: "జ్ఞానంలో పెట్టుబడి ఒక నాగరికతనే నిర్మిస్తుంది", en: "Investing in knowledge builds a whole civilisation" },
    personality: "Al-Khwarizmi",
  },
  {
    num: 4, years: { te: "క్రీ.శ. 1299–1924", en: "1299–1924 CE" }, color: "bg-[var(--if-green)]",
    title: { te: "ఒట్టోమన్ సామ్రాజ్యం", en: "Ottoman Empire" }, ar: "الدولة العثمانية",
    desc: { te: "600 సంవత్సరాల ఇస్లామిక్ పాలన — కాన్స్టాంటినోపుల్ ఫతహ్, సుల్తాన్ సులేమాన్", en: "600 years of Islamic rule — Fall of Constantinople, Suleiman the Magnificent" },
    highlights: [
      { te: "1453లో కాన్‌స్టాంటినోపుల్ విజయం", en: "Constantinople conquered 1453" },
      { te: "ఆ కాలపు అతిపెద్ద సామ్రాజ్యం", en: "Largest empire of its time" },
      { te: "మతపరమైన మైనారిటీలకు మిల్లెత్ వ్యవస్థ", en: "Millet system for religious minorities" },
      { te: "ఇస్లామిక్ కళలు, వాస్తుశిల్పం", en: "Islamic arts and architecture" },
    ],
    lesson: { te: "దృష్టి, క్రమశిక్షణ సామ్రాజ్యాలను నిర్మిస్తాయి", en: "Vision and discipline build empires" },
    personality: "Mehmed II (the Conqueror)",
  },
  {
    num: 5, years: { te: "18–20 శతాబ్దాలు", en: "18th–20th C" }, color: "bg-gray-700",
    title: { te: "వలసవాద కాలం", en: "Colonial Period" }, ar: "الحقبة الاستعمارية",
    desc: { te: "యూరోపియన్ వలసవాదం ముస్లిం ప్రపంచాన్ని విభజించింది — స్వాతంత్ర్య పోరాటాలు", en: "European colonialism divided the Muslim world — independence struggles" },
    highlights: [
      { te: "బ్రిటిష్, ఫ్రెంచ్, డచ్ ఆక్రమణ", en: "British, French, Dutch occupation" },
      { te: "ఖిలాఫత్ రద్దు (1924)", en: "Abolition of Caliphate (1924)" },
      { te: "స్వాతంత్ర్య ఉద్యమాలు", en: "Independence movements" },
      { te: "ముస్లిం విద్వాంసుల నేతృత్వంలో ప్రతిఘటన", en: "Muslim scholars led resistance" },
    ],
    lesson: { te: "విభజన, పరాధీనత బలమైన నాగరికతలను కూడా బలహీనపరుస్తాయి", en: "Disunity weakens even strong civilisations" },
    personality: "Ibn Khaldun",
  },
  {
    num: 6, years: { te: "నేడు", en: "Today" }, color: "bg-[#0d3b1e]",
    title: { te: "నేటి ముస్లిం ప్రపంచం & పాఠాలు", en: "Modern Muslim World & Lessons" }, ar: "العالم الإسلامي المعاصر",
    desc: { te: "1.9 బిలియన్ ముస్లింలు 57+ దేశాలలో — ఏకత, న్యాయం మరియు ఇస్లామిక్ విలువలు", en: "1.9 billion Muslims in 57+ countries — unity, justice and Islamic values" },
    highlights: [
      { te: "57 OIC సభ్య దేశాలు", en: "57 OIC member states" },
      { te: "అన్ని రంగాల్లో ముస్లిం నోబెల్ గ్రహీతలు", en: "Muslim Nobel laureates in all fields" },
      { te: "ప్రపంచవ్యాప్తంగా పెరుగుతున్న ఇస్లామిక్ ఫైనాన్స్", en: "Islamic finance growing globally" },
      { te: "దావా, పునరుజ్జీవన ఉద్యమాలు", en: "Dawah and revival movements" },
    ],
    lesson: { te: "పునరుజ్జీవనం జ్ఞానం, మంచి స్వభావం, ఐక్యత ద్వారా వస్తుంది", en: "Renewal comes through knowledge, character, and unity" },
    personality: "Fatima al-Fihri",
  },
];



const lessons = [
  {
    title: { te: "నాయకత్వం", en: "Leadership" },
    example: { te: "ఉమర్ (రజి) సంప్రదింపులతో నడిపించారు, ప్రజల మధ్య తిరిగారు, తనను తాను జవాబుదారీగా ఉంచుకున్నారు.", en: "Umar (RA) led through consultation, walked among the people, and held himself accountable." },
    apply: { te: "సేవ చేస్తూ, వింటూ, మీ నిర్ణయాలకు జవాబుదారీగా ఉంటూ నడిపించండి.", en: "Lead by serving, listening, and answering for your decisions." },
  },
  {
    title: { te: "న్యాయం", en: "Justice" },
    example: { te: "ఇస్లామిక్ న్యాయస్థానాలు పాలకులను, పేదలను ఒకే చట్టానికి కట్టుబడేలా చేసి అందరి హక్కులను కాపాడాయి.", en: "Islamic courts held rulers and the poor to the same law, protecting the rights of all." },
    apply: { te: "మీతో విభేదించేవారికి కూడా న్యాయంగా ఉండండి.", en: "Be fair to everyone, even those who differ from you." },
  },
  {
    title: { te: "జ్ఞానం నాగరికతను నిర్మిస్తుంది", en: "Knowledge Builds Civilisation" },
    example: { te: "బైతుల్ హిక్మా ప్రతి నాగరికత జ్ఞానాన్ని సేకరించి అనువదించింది — స్వర్ణయుగానికి పునాది.", en: "The House of Wisdom gathered and translated the knowledge of every civilisation — the foundation of the Golden Age." },
    apply: { te: "జీవితాంతం నేర్చుకుంటూ ఉండండి — జ్ఞానం మిమ్మల్నీ, సమాజాన్నీ ఉన్నతం చేస్తుంది.", en: "Keep learning all your life — knowledge lifts both you and society." },
  },
  {
    title: { te: "ఐక్యత బలం", en: "Unity is Strength" },
    example: { te: "ఉమ్మత్ ఏకమైనప్పుడు వర్ధిల్లింది; విభజించబడినప్పుడు బలమైన రాజ్యాలు కూడా పతనమయ్యాయి.", en: "When the Ummah was united it flourished; when divided, even strong states fell." },
    apply: { te: "గోడలు కాదు, వంతెనలు నిర్మించండి — కలిసి నిలబడటంలోనే బలం.", en: "Build bridges, not walls — strength comes from standing together." },
  },
  {
    title: { te: "సమాజ నిర్మాణం", en: "Community Building" },
    example: { te: "ప్రవక్త ﷺ మదీనాను సోదరభావం, ఉమ్మడి నియమాలు, బలహీనుల పట్ల శ్రద్ధపై నిర్మించారు.", en: "The Prophet ﷺ built Madinah on brotherhood, shared rules, and care for the weak." },
    apply: { te: "మీ పొరుగువారిని పట్టించుకొని, న్యాయమైన, ఆహ్వానించే సమాజాలను నిర్మించండి.", en: "Care for your neighbours and build fair, welcoming communities." },
  },
  {
    title: { te: "ఆవిష్కరణ & పురోగతి", en: "Innovation & Progress" },
    example: { te: "ముస్లిం పండితులు బీజగణితాన్ని కనుగొని, ఆస్ట్రోలాబ్‌ను మెరుగుపరిచి, ఆధునిక వైద్యానికి ఆద్యులయ్యారు.", en: "Muslim scholars invented algebra, refined the astrolabe, and pioneered modern medicine." },
    apply: { te: "నిజమైన సమస్యలను పరిష్కరించండి — విశ్వాసం సృజనాత్మకత, పురోగతిని ప్రోత్సహిస్తుంది.", en: "Solve real problems — faith encourages creativity and progress." },
  },
];

function IslamicHistoryPage() {
  const { lang } = useI18n();
  const [active, setActive] = useState(0);

  return (
    <PageShell>
      <PortalJump portal="islamic-history" />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--if-green)] to-stone-800 text-[var(--if-gold-pale)] py-20 px-4">
        <div className="mx-auto max-w-4xl text-center flex flex-col items-center gap-5">
          <BlurFade delay={0.05}>
            <Link href="/knowledge-center" className="inline-flex items-center min-h-11 gap-1 text-sm text-[var(--if-gold-pale)]/80 hover:text-[var(--if-gold-light)] transition-colors mb-2">
              <ChevronLeft className="h-4 w-4" />{copy.knowledge_center[lang]}
            </Link>
          </BlurFade>
          <BlurFade delay={0.1}>
            <span className="font-arabic text-4xl text-[var(--if-gold-light)]" dir="rtl" lang="ar">التاريخ الإسلامي</span>
          </BlurFade>
          <BlurFade delay={0.15}>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-[var(--if-gold-light)]">
              {copy.islamic_history[lang]}
            </h1>
          </BlurFade>
          <BlurFade delay={0.2}>
            <p className="text-[var(--if-gold-pale)]/70 max-w-xl">
              {copy.from_rashidun_to_today_6[lang]}
            </p>
          </BlurFade>
        </div>
      </section>

      {/* Era timeline selector */}
      <section className="if-defer py-16 px-4 bg-[var(--if-cream-light)]">
        <div className="mx-auto max-w-5xl">
          <BlurFade delay={0.1}>
            <h2 className="font-display text-3xl font-bold text-[var(--if-green)] text-center mb-10">
              {copy.n_6_era_history_timeline[lang]}
            </h2>
          </BlurFade>

          <div className="overflow-x-auto pb-4 mb-6">
            <div className="flex gap-3 min-w-max">
              {eras.map((era, i) => (
                <button key={era.num} onClick={() => setActive(i)}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all min-w-[100px] ${active === i ? "bg-[var(--if-green)] border-[var(--if-gold)]/40" : "bg-white border-[var(--if-gold)]/15 hover:border-[var(--if-gold)]/40"}`}>
                  <div className={`w-8 h-8 rounded-full ${era.color} flex items-center justify-center text-white text-xs font-bold`}>{era.num}</div>
                  <span className={`text-[10px] font-semibold text-center leading-tight ${active === i ? "text-[var(--if-gold-pale)]" : "text-[var(--if-text-muted)]"}`}>{era.years[lang]}</span>
                </button>
              ))}
            </div>
          </div>

          <BlurFade delay={0.05} key={active}>
            <div className="relative overflow-hidden bg-white rounded-2xl border border-[var(--if-gold)]/20 p-8">
              <BorderBeam size={200} duration={10} colorFrom="#c8922a" colorTo="#c8922a" />
              <div className="flex items-start gap-6 flex-wrap">
                <div className={`w-14 h-14 rounded-2xl ${eras[active].color} flex items-center justify-center text-white font-bold text-xl flex-shrink-0`}>{eras[active].num}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap mb-1">
                    <h3 className="font-display text-2xl font-bold text-[var(--if-green)]">{eras[active].title[lang]}</h3>
                    <span className="font-arabic text-lg text-[var(--if-gold-light)]" dir="rtl" lang="ar">{eras[active].ar}</span>
                  </div>
                  <span className="text-xs font-bold text-[var(--if-gold-ink)] tracking-wider">{eras[active].years[lang]}</span>
                  <p className="text-[var(--if-text-muted)] mt-3 mb-5 leading-relaxed">{eras[active].desc[lang]}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                    {eras[active].highlights.map((h) => (
                      <div key={h.en} className="flex items-start gap-2 text-sm">
                        <span aria-hidden="true" className="text-[var(--if-gold-ink)] mt-0.5 flex-shrink-0">✦</span>
                        <span className="text-[var(--if-text)]">{h[lang]}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 mt-2">
                    <div className="flex items-start gap-2 text-xs bg-[var(--if-green)]/8 border border-[var(--if-green)]/18 rounded-lg px-3 py-2 flex-1">
                      <span className="font-bold text-[var(--if-green)] flex-shrink-0">{copy.lesson[lang]}</span>
                      <span className="text-[var(--if-text-muted)]">{eras[active].lesson[lang]}</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs bg-[var(--if-gold)]/6 border border-[var(--if-gold)]/20 rounded-lg px-3 py-2 flex-1">
                      <span className="font-bold text-[var(--if-gold-ink)] flex-shrink-0">{copy.notable[lang]}</span>
                      <span className="text-[var(--if-text-muted)]">{eras[active].personality}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-6 justify-end">
                <button type="button" aria-label={lang === "te" ? "మునుపటి యుగం" : "Previous era"} disabled={active === 0} onClick={() => setActive(a => a - 1)} className="size-11 inline-flex items-center justify-center rounded-full border border-[var(--if-gold)]/30 disabled:opacity-30 hover:bg-[var(--if-cream-light)]"><ChevronLeft className="h-4 w-4 text-[var(--if-green)]" /></button>
                <span className="self-center text-xs text-[var(--if-text-muted)]">{active + 1} / {eras.length}</span>
                <button type="button" aria-label={lang === "te" ? "తదుపరి యుగం" : "Next era"} disabled={active === eras.length - 1} onClick={() => setActive(a => a + 1)} className="size-11 inline-flex items-center justify-center rounded-full border border-[var(--if-gold)]/30 disabled:opacity-30 hover:bg-[var(--if-cream-light)]"><ChevronRight className="h-4 w-4 text-[var(--if-green)]" /></button>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* History Lessons */}
      <section className="if-defer py-16 px-4">
        <div className="mx-auto max-w-5xl">
          <BlurFade delay={0.1}>
            <p className="text-center text-xs font-bold uppercase tracking-widest text-[var(--if-gold-ink)] mb-2">{copy.apply_today[lang]}</p>
            <h2 className="font-display text-3xl font-bold text-[var(--if-green)] text-center mb-2">
              {copy.lessons_from_history[lang]}
            </h2>
            <p className="text-center text-[var(--if-text-muted)] text-sm mb-10">
              {copy.six_timeless_lessons_history_teaches[lang]}
            </p>
          </BlurFade>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {lessons.map((lesson, i) => (
              <BlurFade key={lesson.title.en} delay={0.07 * i}>
                <div className="relative overflow-hidden bg-white rounded-2xl border border-[var(--if-gold)]/15 p-5 hover:border-[var(--if-gold)]/40 transition-all group h-full flex flex-col">
                  <BorderBeam size={80} duration={8} colorFrom="#c8922a" colorTo="#c8922a" className="opacity-0 group-hover:opacity-100" />
                  <h3 className="font-display text-base font-bold text-[var(--if-green)] mb-3">{lesson.title[lang]}</h3>
                  <p className="text-xs text-[var(--if-text-muted)] leading-relaxed mb-4 flex-1">{lesson.example[lang]}</p>
                  <div className="flex items-start gap-2 text-xs bg-[var(--if-gold)]/7 border border-[var(--if-gold)]/18 rounded-lg px-2.5 py-2 mt-auto">
                    <span className="font-bold text-[var(--if-gold-ink)] flex-shrink-0">{copy.apply[lang]}</span>
                    <span className="text-[var(--if-text-muted)]">{lesson.apply[lang]}</span>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Quranic ayah footer band */}
      <section className="if-defer py-14 px-4 bg-[var(--if-green)] text-center">
        <BlurFade delay={0.1}>
          <div className="font-arabic text-2xl text-[var(--if-gold-light)] mb-3 leading-relaxed" dir="rtl" lang="ar">كُنتُمْ خَيْرَ أُمَّةٍ أُخْرِجَتْ لِلنَّاسِ</div>
          <p className="text-sm text-[var(--if-gold-pale)]/70">
            {copy.you_are_the_best_nation[lang]}
          </p>
        </BlurFade>
      </section>


      <section id="eras" className="if-defer py-16 px-4 scroll-mt-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-3xl font-bold text-[var(--if-green)] mb-2">
            {lang === "te" ? "ఇస్లామిక్ చరిత్ర యుగాలు" : "Eras of Islamic history"}
          </h2>
          <p className="text-[var(--if-text-muted)] mb-6 text-pretty">
            {lang === "te" ? "రాషిదూన్ నుండి ఆధునిక కాలం వరకు తొమ్మిది యుగాలు." : "Nine eras from the Rashidun to the modern age."}
          </p>
          <NarrativeCards
            entries={historyEras}
            fields={{ meta: "pr", summary: "s", lesson: "l" }}
            numbered
          />
        </div>
      </section>


      {/* The people, the empires and the cities each used to be rendered
          twice on this page — once as an upgrade card grid and once here. The
          anchored sections are what the portal sub-navigation links to and
          what draws from the shared content source, so they are what stayed. */}
      <section id="people" className="if-defer py-16 px-4 scroll-mt-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-3xl font-bold text-[var(--if-green)] mb-2">
            {lang === "te" ? "చరిత్రను మలిచిన వ్యక్తులు" : "The people who shaped it"}
          </h2>
          <p className="text-[var(--if-text-muted)] mb-6 text-pretty">
            {lang === "te" ? "ఖలీఫాలు, పండితులు మరియు నాయకులు — వారి జీవితం మరియు వారు వదిలిన వారసత్వం." : "Caliphs, scholars and leaders — their lives and what they left behind."}
          </p>
          <NarrativeCards
            entries={historyPeople}
            fields={{ meta: "role", summary: "bio", lesson: "leg" }}
            lessonLabel={{ te: "వారసత్వం", en: "Legacy" }}
          />
        </div>
      </section>


      <section id="empires" className="if-defer py-16 px-4 scroll-mt-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-3xl font-bold text-[var(--if-green)] mb-2">
            {lang === "te" ? "సామ్రాజ్యాలు" : "Empires"}
          </h2>
          <p className="text-[var(--if-text-muted)] mb-6 text-pretty">
            {lang === "te" ? "ఐదు సామ్రాజ్యాలు — ఎలా ఎదిగాయి, ఏమి సాధించాయి, ఏమి మిగిల్చాయి." : "Five empires — how they rose, what they achieved, what remains."}
          </p>
          <NarrativeCards
            entries={historyEmpires}
            fields={{ meta: "pr", summary: "rise", extra: "ach", lesson: "leg" }}
            lessonLabel={{ te: "వారసత్వం", en: "Legacy" }}
          />
        </div>
      </section>


      <section id="cities" className="if-defer py-16 px-4 scroll-mt-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-3xl font-bold text-[var(--if-green)] mb-2">
            {lang === "te" ? "నగరాలు" : "Cities"}
          </h2>
          <p className="text-[var(--if-text-muted)] mb-6 text-pretty">
            {lang === "te" ? "ఇస్లామిక్ నాగరికతను నిర్మించిన ఏడు నగరాలు." : "Seven cities that built Islamic civilisation."}
          </p>
          <NarrativeCards
            entries={historyCities}
            fields={{ meta: "reg", summary: "imp", lesson: "sig" }}
            lessonLabel={{ te: "ప్రాముఖ్యత", en: "Why it matters" }}
          />
        </div>
      </section>
      {/* ── Simulator ── */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl font-bold text-[var(--if-green)] text-center mb-8">{lang === "te" ? "చూడండి" : "Watch"}</h2>
          <Simulator steps={historySteps} scene={EmpiresScene} autoplay />
        </div>
      </section>


      <LessonIndex portal="islamic-history" />

    </PageShell>
  );
}

export default function IslamicHistory() {
  return <IslamicHistoryPage />;
}
