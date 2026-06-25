"use client";

import { useState } from "react";
import Link from "next/link";
import { I18nProvider, useI18n } from "@/lib/i18n/context";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { ChevronLeft, ChevronRight } from "lucide-react";

const eras = [
  {
    num: 1, years: "632–661 CE", color: "bg-emerald-800",
    title: { te: "ఖులఫా-ఇ-రాషిదీన్", en: "Rightly Guided Caliphs" }, ar: "الخلفاء الراشدون",
    desc: { te: "అబూ బకర్, ఉమర్, ఉస్మాన్, అలీ రా. ఇస్లాం యొక్క స్వర్ణయుగం — ఆదర్శ పాలన", en: "Abu Bakr, Umar, Uthman, Ali RA — the golden age of ideal Islamic governance" },
    highlights: ["Quran compiled into one book", "Arabia unified under Islam", "Just and consultative governance", "Expansion into Persia & Levant"],
  },
  {
    num: 2, years: "661–750 CE", color: "bg-blue-800",
    title: { te: "ఉమయ్యా సామ్రాజ్యం", en: "Umayyad Dynasty" }, ar: "الأمويون",
    desc: { te: "ఇస్లాం స్పెయిన్ నుండి సింధ్ వరకు విస్తరించింది — దమాస్కస్ రాజధానిగా", en: "Islam spread from Spain to Sindh — capital at Damascus" },
    highlights: ["Islam reaches Spain (Al-Andalus)", "Islamic architecture flourished", "Arabic became official language", "Maritime expansion"],
  },
  {
    num: 3, years: "750–1258 CE", color: "bg-amber-800",
    title: { te: "అబ్బాసీ స్వర్ణయుగం", en: "Abbasid Golden Age" }, ar: "العصر الذهبي",
    desc: { te: "బాగ్దాద్ ప్రపంచ జ్ఞాన కేంద్రం — విజ్ఞాన, గణిత, వైద్య పురోగతి", en: "Baghdad was the world's knowledge centre — science, math, medicine flourished" },
    highlights: ["House of Wisdom (Bayt al-Hikmah)", "Algebra & Algorithms invented", "Medical Encyclopedia by Ibn Sina", "Paper & libraries spread"],
  },
  {
    num: 4, years: "1299–1924 CE", color: "bg-red-900",
    title: { te: "ఒట్టోమన్ సామ్రాజ్యం", en: "Ottoman Empire" }, ar: "الدولة العثمانية",
    desc: { te: "600 సంవత్సరాల ఇస్లామిక్ పాలన — కాన్స్టాంటినోపుల్ ఫతహ్, సుల్తాన్ సులేమాన్", en: "600 years of Islamic rule — Fall of Constantinople, Suleiman the Magnificent" },
    highlights: ["Constantinople conquered 1453", "Largest empire of its time", "Millet system for religious minorities", "Islamic arts and architecture"],
  },
  {
    num: 5, years: "18th–20th C", color: "bg-gray-700",
    title: { te: "వలసవాద కాలం", en: "Colonial Period" }, ar: "الحقبة الاستعمارية",
    desc: { te: "యూరోపియన్ వలసవాదం ముస్లిం ప్రపంచాన్ని విభజించింది — స్వాతంత్ర్య పోరాటాలు", en: "European colonialism divided the Muslim world — independence struggles" },
    highlights: ["British, French, Dutch occupation", "Abolition of Caliphate (1924)", "Independence movements", "Muslim scholars led resistance"],
  },
  {
    num: 6, years: "Today", color: "bg-[#0d3b1e]",
    title: { te: "నేటి ముస్లిం ప్రపంచం & పాఠాలు", en: "Modern Muslim World & Lessons" }, ar: "العالم الإسلامي المعاصر",
    desc: { te: "1.9 బిలియన్ ముస్లింలు 57+ దేశాలలో — ఏకత, న్యాయం మరియు ఇస్లామిక్ విలువలు", en: "1.9 billion Muslims in 57+ countries — unity, justice and Islamic values" },
    highlights: ["57 OIC member states", "Muslim Nobel laureates in all fields", "Islamic finance growing globally", "Dawah and revival movements"],
  },
];

const personalities = [
  { name: "Umar ibn al-Khattab RA", ar: "عمر بن الخطاب", role: { te: "రెండవ ఖలీఫ — న్యాయం & పాలన", en: "2nd Caliph — justice and governance" } },
  { name: "Khalid ibn al-Walid RA", ar: "خالد بن الوليد", role: { te: "అపరాజిత సేనాపతి", en: "Undefeated military commander" } },
  { name: "Ibn Sina (Avicenna)", ar: "ابن سينا", role: { te: "వైద్య విజ్ఞాన పిత — Canon of Medicine", en: "Father of medicine — Canon of Medicine" } },
  { name: "Al-Khwarizmi", ar: "الخوارزمي", role: { te: "బీజగణిత పిత — Algorithms", en: "Father of Algebra — inventor of Algorithms" } },
  { name: "Sultan Saladin", ar: "صلاح الدين", role: { te: "జెరూసలేం విమోచన నాయకుడు", en: "Liberator of Jerusalem" } },
  { name: "Ibn Battuta", ar: "ابن بطوطة", role: { te: "ప్రపంచ పర్యాటకుడు — 75,000 miles", en: "World traveller — covered 75,000+ miles" } },
];

function IslamicHistoryPage() {
  const { lang } = useI18n();
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <section className="bg-gradient-to-br from-amber-950 to-[var(--if-green)] text-[var(--if-gold-pale)] py-20 px-4">
        <div className="mx-auto max-w-4xl text-center flex flex-col items-center gap-5">
          <BlurFade delay={0.05}>
            <Link href="/knowledge-center" className="inline-flex items-center gap-1 text-sm text-[var(--if-gold-pale)]/60 hover:text-[var(--if-gold-light)] transition-colors mb-2">
              <ChevronLeft className="h-4 w-4" />{lang === "te" ? "జ్ఞాన కేంద్రం" : "Knowledge Center"}
            </Link>
          </BlurFade>
          <BlurFade delay={0.1}>
            <span className="font-arabic text-4xl text-[var(--if-gold)]/70" dir="rtl">التاريخ الإسلامي</span>
          </BlurFade>
          <BlurFade delay={0.15}>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-[var(--if-gold-light)]">
              {lang === "te" ? "ఇస్లామిక్ చరిత్ర" : "Islamic History"}
            </h1>
          </BlurFade>
          <BlurFade delay={0.2}>
            <p className="text-[var(--if-gold-pale)]/70 max-w-xl">
              {lang === "te" ? "రాషిదీన్ నుండి నేటి వరకు — 6 యుగాల గొప్ప ఇస్లామిక్ నాగరికత" : "From Rashidun to today — 6 eras of great Islamic civilisation"}
            </p>
          </BlurFade>
        </div>
      </section>

      {/* Era timeline selector */}
      <section className="py-16 px-4 bg-[var(--if-cream-light)]">
        <div className="mx-auto max-w-5xl">
          <BlurFade delay={0.1}>
            <h2 className="font-display text-3xl font-bold text-[var(--if-green)] text-center mb-10">
              {lang === "te" ? "6-యుగాల చరిత్ర కాలపట్టిక" : "6-Era History Timeline"}
            </h2>
          </BlurFade>

          <div className="overflow-x-auto pb-4 mb-6">
            <div className="flex gap-3 min-w-max">
              {eras.map((era, i) => (
                <button key={era.num} onClick={() => setActive(i)}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all min-w-[100px] ${active === i ? "bg-[var(--if-green)] border-[var(--if-gold)]/40" : "bg-white border-[var(--if-gold)]/15 hover:border-[var(--if-gold)]/40"}`}>
                  <div className={`w-8 h-8 rounded-full ${era.color} flex items-center justify-center text-white text-xs font-bold`}>{era.num}</div>
                  <span className={`text-[10px] font-semibold text-center leading-tight ${active === i ? "text-[var(--if-gold-pale)]" : "text-[var(--if-text-muted)]"}`}>{era.years}</span>
                </button>
              ))}
            </div>
          </div>

          <BlurFade delay={0.05} key={active}>
            <div className="relative overflow-hidden bg-white rounded-2xl border border-[var(--if-gold)]/20 p-8">
              <BorderBeam size={200} duration={10} colorFrom="#0d3b1e" colorTo="#c8922a" />
              <div className="flex items-start gap-6 flex-wrap">
                <div className={`w-14 h-14 rounded-2xl ${eras[active].color} flex items-center justify-center text-white font-bold text-xl flex-shrink-0`}>{eras[active].num}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap mb-1">
                    <h3 className="font-display text-2xl font-bold text-[var(--if-green)]">{eras[active].title[lang]}</h3>
                    <span className="font-arabic text-lg text-[var(--if-gold)]/70" dir="rtl">{eras[active].ar}</span>
                  </div>
                  <span className="text-xs font-bold text-[var(--if-gold)] tracking-wider">{eras[active].years}</span>
                  <p className="text-[var(--if-text-muted)] mt-3 mb-5 leading-relaxed">{eras[active].desc[lang]}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {eras[active].highlights.map((h) => (
                      <div key={h} className="flex items-start gap-2 text-sm">
                        <span className="text-[var(--if-gold)] mt-0.5 flex-shrink-0">✦</span>
                        <span className="text-[var(--if-text)]">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-6 justify-end">
                <button disabled={active === 0} onClick={() => setActive(a => a - 1)} className="p-2 rounded-full border border-[var(--if-gold)]/30 disabled:opacity-30 hover:bg-[var(--if-cream-light)]"><ChevronLeft className="h-4 w-4 text-[var(--if-green)]" /></button>
                <span className="self-center text-xs text-[var(--if-text-muted)]">{active + 1} / {eras.length}</span>
                <button disabled={active === eras.length - 1} onClick={() => setActive(a => a + 1)} className="p-2 rounded-full border border-[var(--if-gold)]/30 disabled:opacity-30 hover:bg-[var(--if-cream-light)]"><ChevronRight className="h-4 w-4 text-[var(--if-green)]" /></button>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Personalities */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-5xl">
          <BlurFade delay={0.1}>
            <h2 className="font-display text-3xl font-bold text-[var(--if-green)] text-center mb-10">
              {lang === "te" ? "చారిత్రక వ్యక్తిత్వాలు" : "Historical Personalities"}
            </h2>
          </BlurFade>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {personalities.map((p, i) => (
              <BlurFade key={p.name} delay={0.07 * i}>
                <div className="relative overflow-hidden bg-white rounded-2xl border border-[var(--if-gold)]/15 p-5 hover:border-[var(--if-gold)]/50 transition-all group">
                  <BorderBeam size={80} duration={7} colorFrom="#c8922a" colorTo="#e8b84b" className="opacity-0 group-hover:opacity-100" />
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-[var(--if-green)] flex items-center justify-center text-[var(--if-gold-light)] font-bold">{p.name[0]}</div>
                    <div>
                      <h4 className="font-semibold text-[var(--if-green)] text-sm leading-snug">{p.name}</h4>
                      <span className="font-arabic text-sm text-[var(--if-gold)]/70" dir="rtl">{p.ar}</span>
                    </div>
                  </div>
                  <p className="text-xs text-[var(--if-text-muted)]">{p.role[lang]}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 px-4 bg-[var(--if-green)] text-center">
        <BlurFade delay={0.1}>
          <div className="font-arabic text-2xl text-[var(--if-gold-light)] mb-3 leading-relaxed" dir="rtl">كُنتُمْ خَيْرَ أُمَّةٍ أُخْرِجَتْ لِلنَّاسِ</div>
          <p className="text-sm text-[var(--if-gold-pale)]/70">
            {lang === "te" ? "\"మీరు మానవుల కోసం వెలువడిన ఉత్తమ జాతి\" — సూరహ్ ఆలె ఇమ్రాన్ 3:110" : "\"You are the best nation produced for mankind\" — Surah Ali Imran 3:110"}
          </p>
        </BlurFade>
      </section>

      <Footer />
    </div>
  );
}

export default function IslamicHistory() {
  return <I18nProvider><IslamicHistoryPage /></I18nProvider>;
}
