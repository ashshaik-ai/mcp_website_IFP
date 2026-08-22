"use client";

import { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { PageShell } from "@/components/layout/PageShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { ChevronLeft } from "lucide-react";

/* Bilingual copy for this file, hoisted out of the JSX so a translator
   can read and review it as one unit. */
const copy = {
  knowledge_center: { te: "జ్ఞాన కేంద్రం", en: "Knowledge Center" },
  islamic_calendar: { te: "ఇస్లామిక్ కాలెండర్", en: "Islamic Calendar" },
  hijri_calendar_12_islamic_months: { te: "హిజ్రీ కాలెండర్ — 12 ఇస్లామిక్ నెలలు, ముఖ్యమైన తేదీలు మరియు వాటి అర్థాలు", en: "Hijri calendar — 12 Islamic months, key dates and their meanings" },
  months: { te: "నెలలు", en: "Months" },
  days_year: { te: "రోజులు/సంవత్సరం", en: "Days/Year" },
  since_hijra: { te: "హిజ్రా నుండి", en: "Since Hijra" },
  n_12_hijri_months: { te: "12 హిజ్రీ నెలలు", en: "12 Hijri Months" },
  click_a_month_for_details: { te: "నెల క్లిక్ చేయండి వివరాల కోసం", en: "Click a month for details" },
  key_dates: { te: "ముఖ్యమైన తేదీలు", en: "Key Dates" },
  no_specific_islamic_observances_this: { te: "ఈ నెలలో ప్రత్యేక ఇస్లామిక్ తేదీలు లేవు", en: "No specific Islamic observances this month" },
  key_islamic_dates: { te: "ముఖ్యమైన ఇస్లామిక్ తేదీలు", en: "Key Islamic Dates" },
  hijri_date: { te: "హిజ్రీ తేదీ", en: "Hijri Date" },
  event: { te: "సంఘటన", en: "Event" },
  telugu: { te: "తెలుగు", en: "Telugu" },
  the_hijri_year_is_10: { te: "🌙 హిజ్రీ సంవత్సరం సౌర సంవత్సరం కంటే 10-11 రోజులు తక్కువ. కాబట్టి ఇస్లామిక్ పండుగలు ప్రతి సంవత్సరం వేరే గ్రెగోరియన్ తేదీలలో వస్తాయి.", en: "🌙 The Hijri year is ~10-11 days shorter than the solar year. That is why Islamic occasions fall on different Gregorian dates each year." },
} as const;

const months = [
  { n: 1,  name: "Muharram",    ar: "مُحَرَّم",     te: "ముహర్రం",     days: 29, meaning: { te: "నిషేధించబడింది — పవిత్ర నెల", en: "Forbidden — Sacred month" }, events: ["Islamic New Year — 1 Muharram", "Day of Ashura (10 Muharram) — fasting recommended"] },
  { n: 2,  name: "Safar",       ar: "صَفَر",        te: "సఫర్",         days: 30, meaning: { te: "శూన్యమైన — ప్రాచీన ప్రయాణ నెల", en: "Empty — ancient travel month" }, events: [] },
  { n: 3,  name: "Rabi al-Awwal", ar: "رَبِيعُ الأَوَّل", te: "రబీ అల్-అవ్వల్", days: 29, meaning: { te: "మొదటి వసంతం", en: "First spring" }, events: ["Mawlid al-Nabawi — 12th: Prophet's Birthday ﷺ"] },
  { n: 4,  name: "Rabi al-Thani", ar: "رَبِيعُ الثَّانِي", te: "రబీ అల్-సానీ", days: 30, meaning: { te: "రెండవ వసంతం", en: "Second spring" }, events: [] },
  { n: 5,  name: "Jumada al-Awwal", ar: "جُمَادَى الأُولَى", te: "జుమాద అల్-ఉలా", days: 29, meaning: { te: "మొదటి శీతల నెల", en: "First dry/cold month" }, events: [] },
  { n: 6,  name: "Jumada al-Thani", ar: "جُمَادَى الثَّانِيَة", te: "జుమాద అల్-అఖిరా", days: 30, meaning: { te: "రెండవ శీతల నెల", en: "Second dry/cold month" }, events: [] },
  { n: 7,  name: "Rajab",       ar: "رَجَب",        te: "రజబ్",         days: 29, meaning: { te: "గౌరవించబడింది — పవిత్ర నెల", en: "Revered — Sacred month" }, events: ["Isra Wal Miraj — 27 Rajab: Night Journey of the Prophet ﷺ"] },
  { n: 8,  name: "Sha'ban",     ar: "شَعْبَان",     te: "షాబాన్",       days: 30, meaning: { te: "విస్తరించు — రమజాన్ ముందు నెల", en: "To spread — preparation month before Ramadan" }, events: ["Shab e Barat — 15th: Night of Forgiveness"] },
  { n: 9,  name: "Ramadan",     ar: "رَمَضَان",     te: "రమజాన్",       days: 29, meaning: { te: "మండే వేడి — రోజా & ఖురాన్ నెల", en: "Scorching heat — fasting and Quran month" }, events: ["Entire month: Fasting (Sawm) obligatory", "Laylat al-Qadr — last 10 odd nights: Night of Power", "Eid al-Fitr — 1 Shawwal: celebration"] },
  { n: 10, name: "Shawwal",     ar: "شَوَّال",      te: "షవ్వాల్",      days: 30, meaning: { te: "ఎత్తుకున్నది — ఈద్ నెల", en: "Raised — month of Eid" }, events: ["Eid al-Fitr — 1st Shawwal", "6 Shawwal fasts: Sunnah (as if fasted all year)"] },
  { n: 11, name: "Dhu al-Qadah", ar: "ذُو الْقَعْدَة", te: "జుల్ ఖాదా", days: 29, meaning: { te: "పవిత్ర — కూర్చునే నెల (యుద్ధం నిషేధం)", en: "Sacred month — sitting (fighting forbidden)" }, events: [] },
  { n: 12, name: "Dhu al-Hijjah", ar: "ذُو الْحِجَّة", te: "జుల్ హిజ్జా", days: 30, meaning: { te: "హజ్ నెల — అత్యంత పవిత్రమైన", en: "Month of Hajj — most sacred" }, events: ["1-9 Dhu al-Hijjah: Hajj season begins", "Arafah fast (9th) — sins of two years forgiven", "Eid al-Adha — 10th: Festival of Sacrifice", "Days of Tashreeq — 11-13th: feasting and Takbeer"] },
];

const specialDates = [
  { date: "1 Muharram",   name: "Islamic New Year",         ar: "رأس السنة الهجرية", te: "ఇస్లామిక్ నూతన సంవత్సరం" },
  { date: "10 Muharram",  name: "Day of Ashura",            ar: "يوم عاشوراء",       te: "ఆషూరా దినం" },
  { date: "12 Rabi I",    name: "Prophet's Birthday ﷺ",     ar: "المولد النبوي",     te: "నబీ జన్మదినం" },
  { date: "27 Rajab",     name: "Isra Wal Miraj",           ar: "الإسراء والمعراج",  te: "మేరాజ్" },
  { date: "15 Sha'ban",   name: "Shab e Barat",             ar: "شب البراءة",       te: "షబ్-ఎ-బారాత్" },
  { date: "1-30 Ramadan", name: "Month of Fasting",         ar: "شهر رمضان",        te: "రోజా మాసం" },
  { date: "27 Ramadan",   name: "Laylat al-Qadr",           ar: "ليلة القدر",       te: "లైలతుల్-ఖద్ర్" },
  { date: "1 Shawwal",    name: "Eid al-Fitr",              ar: "عيد الفطر",        te: "ఈద్-అల్-ఫిత్ర్" },
  { date: "9 Dhu al-Hijjah", name: "Day of Arafah",        ar: "يوم عرفة",         te: "అరఫా దినం" },
  { date: "10 Dhu al-Hijjah", name: "Eid al-Adha",         ar: "عيد الأضحى",      te: "ఈద్-అల్-అద్హా" },
];

function IslamicCalendarPage() {
  const { lang } = useI18n();
  const [active, setActive] = useState<number | null>(null);

  return (
    <PageShell>

      <section className="bg-gradient-to-br from-cyan-900 to-[var(--if-green)] text-[var(--if-gold-pale)] py-20 px-4">
        <div className="mx-auto max-w-4xl text-center flex flex-col items-center gap-5">
          <BlurFade delay={0.05}>
            <Link href="/knowledge-center" className="inline-flex items-center min-h-9 gap-1 text-sm text-[var(--if-gold-pale)]/80 hover:text-[var(--if-gold-light)] transition-colors mb-2">
              <ChevronLeft className="h-4 w-4" />{copy.knowledge_center[lang]}
            </Link>
          </BlurFade>
          <BlurFade delay={0.1}>
            <span className="font-arabic text-4xl text-[var(--if-gold-light)]" dir="rtl">التقويم الهجري</span>
          </BlurFade>
          <BlurFade delay={0.15}>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-[var(--if-gold-light)]">
              {copy.islamic_calendar[lang]}
            </h1>
          </BlurFade>
          <BlurFade delay={0.2}>
            <p className="text-[var(--if-gold-pale)]/70 max-w-xl">
              {copy.hijri_calendar_12_islamic_months[lang]}
            </p>
          </BlurFade>
          <BlurFade delay={0.25}>
            <div className="flex items-center gap-6 flex-wrap justify-center">
              {[{ n: "12", l: copy.months[lang] }, { n: "354/355", l: copy.days_year[lang] }, { n: "622 CE", l: copy.since_hijra[lang] }].map(({ n, l }) => (
                <div key={l} className="text-center">
                  <div className="font-display text-xl font-bold text-[var(--if-gold-light)]">{n}</div>
                  <div className="text-xs text-[var(--if-gold-pale)]/80">{l}</div>
                </div>
              ))}
            </div>
          </BlurFade>
        </div>
      </section>

      {/* 12 months grid */}
      <section className="py-16 px-4 bg-[var(--if-cream-light)]">
        <div className="mx-auto max-w-5xl">
          <BlurFade delay={0.1}>
            <h2 className="font-display text-3xl font-bold text-[var(--if-green)] text-center mb-3">
              {copy.n_12_hijri_months[lang]}
            </h2>
            <p className="text-center text-sm text-[var(--if-text-muted)] mb-10">
              {copy.click_a_month_for_details[lang]}
            </p>
          </BlurFade>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {months.map((m, i) => (
              <BlurFade key={m.n} delay={0.04 * i}>
                <button
                  onClick={() => setActive(active === m.n ? null : m.n)}
                  className={`relative overflow-hidden w-full text-left p-4 rounded-2xl border transition-all ${active === m.n ? "bg-[var(--if-green)] border-[var(--if-gold)]/40" : "bg-white border-[var(--if-gold)]/15 hover:border-[var(--if-gold)]/40"}`}
                >
                  {active === m.n && <BorderBeam size={80} duration={5} colorFrom="#c8922a" colorTo="#e8b84b" />}
                  <div className={`text-[10px] font-bold mb-1 ${active === m.n ? "text-[var(--if-gold-light)]" : "text-[var(--if-text-muted)]"}`}>Month {m.n}</div>
                  <div className={`font-arabic text-2xl leading-relaxed ${active === m.n ? "text-[var(--if-gold-light)]" : "text-[var(--if-green)]"}`} dir="rtl">{m.ar}</div>
                  <div className={`font-display font-semibold text-sm mt-1 ${active === m.n ? "text-[var(--if-gold-pale)]" : "text-[var(--if-green)]"}`}>{m.name}</div>
                  <div className={`text-[10px] ${active === m.n ? "text-[var(--if-gold-pale)]/80" : "text-[var(--if-text-muted)]"}`}>{m.te} · {m.days} days</div>
                  {m.events.length > 0 && (
                    <div className={`mt-2 w-2 h-2 rounded-full ${active === m.n ? "bg-[var(--if-gold)]" : "bg-[var(--if-gold)]/50"}`} />
                  )}
                </button>
              </BlurFade>
            ))}
          </div>

          {active !== null && (() => {
            const m = months.find(x => x.n === active)!;
            return (
              <BlurFade delay={0.05} key={active}>
                <div className="mt-6 bg-white rounded-2xl border border-[var(--if-gold)]/20 p-6">
                  <div className="flex items-center gap-4 mb-4 flex-wrap">
                    <div className="font-arabic text-3xl text-[var(--if-green)]" dir="rtl">{m.ar}</div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-[var(--if-green)]">{m.name}</h3>
                      <span className="text-sm text-[var(--if-text-muted)]">{m.te} · {m.days} days</span>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--if-text-muted)] mb-4">{m.meaning[lang]}</p>
                  {m.events.length > 0 ? (
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-[var(--if-gold-ink)] uppercase tracking-wider">{copy.key_dates[lang]}</h4>
                      {m.events.map(e => (
                        <div key={e} className="flex items-start gap-2 text-sm">
                          <span className="text-[var(--if-gold-ink)] mt-0.5">✦</span>
                          <span>{e}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-[var(--if-text-muted)] italic">{copy.no_specific_islamic_observances_this[lang]}</p>
                  )}
                </div>
              </BlurFade>
            );
          })()}
        </div>
      </section>

      {/* Important dates */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-4xl">
          <BlurFade delay={0.1}>
            <h2 className="font-display text-3xl font-bold text-[var(--if-green)] text-center mb-10">
              {copy.key_islamic_dates[lang]}
            </h2>
          </BlurFade>
          <div className="overflow-x-auto rounded-2xl border border-[var(--if-gold)]/15">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--if-green)] text-[var(--if-gold-light)]">
                  <th className="text-left p-4 font-semibold">{copy.hijri_date[lang]}</th>
                  <th className="text-left p-4 font-semibold">{copy.event[lang]}</th>
                  <th className="text-left p-4 font-semibold hidden sm:table-cell">{copy.telugu[lang]}</th>
                  <th className="text-right p-4 font-semibold hidden md:table-cell">عربي</th>
                </tr>
              </thead>
              <tbody>
                {specialDates.map((d, i) => (
                  <tr key={d.name} className={i % 2 === 0 ? "bg-white" : "bg-[var(--if-cream-light)]"}>
                    <td className="p-4 font-semibold text-[var(--if-gold-ink)] whitespace-nowrap">{d.date}</td>
                    <td className="p-4 text-[var(--if-text)]">{d.name}</td>
                    <td className="p-4 text-[var(--if-text-muted)] hidden sm:table-cell">{d.te}</td>
                    <td className="p-4 font-arabic text-right text-[var(--if-green)] hidden md:table-cell" dir="rtl">{d.ar}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-14 px-4 bg-[var(--if-green)] text-center">
        <BlurFade delay={0.1}>
          <p className="text-[var(--if-gold-pale)]/70 text-sm">
            {copy.the_hijri_year_is_10[lang]}
          </p>
        </BlurFade>
      </section>

    </PageShell>
  );
}

export default function IslamicCalendar() {
  return <IslamicCalendarPage />;
}
