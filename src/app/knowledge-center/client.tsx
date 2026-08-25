"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { PageShell } from "@/components/layout/PageShell";
import { PrayerTimesCard } from "@/components/tools/PrayerTimes";
import { QiblaCompass } from "@/components/tools/QiblaCompass";
import { Tilt } from "@/components/ui/tilt";
import { ZakatCalculator } from "@/components/tools/ZakatCalculator";
import { BlurFade } from "@/components/ui/blur-fade";
import { Marquee } from "@/components/ui/marquee";
import { BorderBeam } from "@/components/ui/border-beam";
import { ChevronRight, Star, Clock, Users, BookOpen, Calculator, Calendar, Baby, Globe, ScrollText } from "lucide-react";

/* Bilingual copy for this file, hoisted out of the JSX so a translator
   can read and review it as one unit. */
const copy = {
  islamic_knowledge_center: { te: "ఇస్లామిక్ జ్ఞాన కేంద్రం", en: "Islamic Knowledge Center" },
  free_multilingual_islamic_learning_study: { te: "ఉచిత, బహుభాషా ఇస్లామిక్ అభ్యాసం — మీ స్వంత వేగంతో నేర్చుకోండి", en: "Free, multilingual Islamic learning — study at your own pace" },
  portals: { te: "పోర్టల్స్", en: "Portals" },
  lessons: { te: "పాఠాలు", en: "Lessons" },
  free_always: { te: "ఉచితం", en: "Free Always" },
  islamic_tools: { te: "ఇస్లామిక్ సాధనాలు", en: "Islamic Tools" },
  today_s_prayer_times: { te: "నేటి నమాజు సమయాలు", en: "Today's prayer times" },
  calculate_your_zakat: { te: "మీ జకాత్ లెక్కించండి", en: "Calculate your Zakat" },
  learning_portals: { te: "అభ్యాస పోర్టల్స్", en: "Learning Portals" },
  all: { te: "అన్నీ", en: "All" },
  learning: { te: "అభ్యాసం", en: "Learning" },
  open: { te: "తెరవండి", en: "Open" },
  learn_about_the_party_and: { te: "పార్టీ మరియు సంక్షేమ కార్యక్రమాల గురించి తెలుసుకోండి", en: "Learn about the party and welfare programmes" },
  back_to_homepage: { te: "← హోమ్‌పేజీకి వెళ్ళండి", en: "← Back to Homepage" },
} as const;

const portals = [
  {
    id: "hadith",
    title: { te: "హదీసు", en: "Hadith" },
    arabic: "الحديث الشريف",
    desc: { te: "ప్రవక్త ﷺ మాటలు — మూలంతో, స్థాయితో; ఆరు గ్రంథాలు; ఉల్లేఖనలు ఎలా పరిశీలించబడ్డాయి", en: "The words of the Prophet ﷺ with source and grade, the six collections, and how narrations were checked" },
    meta: { te: "12 హదీసులు · 6 గ్రంథాలు · 4 పాఠాలు", en: "12 hadith · 6 collections · 4 lessons" },
    icon: ScrollText,
    color: "from-[var(--if-green-mid)] to-[var(--if-green)]",
  },
  {
    id: "learn-arabic",
    title: { te: "అరబిక్ నేర్చుకోండి", en: "Learn Arabic" },
    arabic: "تعلُّم العربية",
    desc: { te: "అక్షరాల నుండి ఖురానిక్ అరబిక్ వరకు — నిర్మాణాత్మక అభ్యాస మార్గం", en: "From alphabet to Quranic Arabic — structured learning roadmap" },
    meta: { te: "6 పాఠాలు · 28 అక్షరాలు · ఉచితం", en: "6 Lessons · 28 Letters · Free Always" },
    icon: BookOpen,
    color: "from-[var(--if-green-mid)] to-[var(--if-green)]",
  },
  {
    id: "learn-urdu",
    title: { te: "ఉర్దూ నేర్చుకోండి", en: "Learn Urdu" },
    arabic: "تعلُّم الأردو",
    desc: { te: "స్క్రిప్ట్ నుండి ఇస్లామిక్ ఉర్దూ వరకు — 6 స్థాయిలు", en: "From script to Islamic Urdu — 6 structured levels" },
    meta: { te: "6 పాఠాలు · 39 అక్షరాలు · ఉచితం", en: "6 Lessons · 39 Letters · Free Always" },
    icon: Globe,
    color: "from-[var(--if-green-mid)] to-[var(--if-green)]",
  },
  {
    id: "learn-quran",
    title: { te: "ఖురాన్ నేర్చుకోండి", en: "Learn Quran" },
    arabic: "تعلُّم القرآن",
    desc: { te: "చదవడం · తజ్వీద్ · తఫ్సీర్ · హిఫ్జ్ — 4 దశల ప్రయాణం", en: "Reading · Tajweed · Tafseer · Hifz — 4-stage journey" },
    meta: { te: "4 మాడ్యూళ్ళు · సూరా పాఠాలు · ఉచితం", en: "4 Modules · Surah Lessons · Free" },
    icon: BookOpen,
    color: "from-[var(--if-green-mid)] to-[var(--if-green)]",
  },
  {
    id: "learn-salah",
    title: { te: "నమాజ్ నేర్చుకోండి", en: "Learn Salah" },
    arabic: "تعلُّم الصلاة",
    desc: { te: "వుజూ నుండి రక్అత్ వరకు · దువాలు · 6 మాడ్యూళ్ళు", en: "Wudu to Rakat · Duas · 6 complete modules" },
    meta: { te: "6 మాడ్యూళ్ళు · ఇంటరాక్టివ్ · ఉచితం", en: "6 Modules · Interactive · Free" },
    icon: Star,
    color: "from-[var(--if-green-mid)] to-[var(--if-green)]",
  },
  {
    id: "seerah",
    title: { te: "సీరత్", en: "Seerah" },
    arabic: "السيرة النبوية",
    desc: { te: "ప్రవక్త ముహమ్మద్ ﷺ జీవిత చరిత్ర — 10 దశల కాలపట్టిక", en: "Life of Prophet Muhammad ﷺ\u200E — 10-stage visual timeline" },
    meta: { te: "10 దశలు · చారిత్రక కాలపట్టిక · ఉచితం", en: "10 Stages · Historical Timeline · Free" },
    icon: Clock,
    color: "from-[var(--if-green-mid)] to-[var(--if-green)]",
  },
  {
    id: "islamic-history",
    title: { te: "ఇస్లామిక్ చరిత్ర", en: "Islamic History" },
    arabic: "التاريخ الإسلامي",
    desc: { te: "రాషిదూన్ నుండి ఆధునిక కాలం వరకు — 6 యుగాలు", en: "Rashidun to modern era — 6 historical epochs" },
    meta: { te: "6 యుగాలు · సామ్రాజ్యాలు · ఉచితం", en: "6 Eras · Empires · Free" },
    icon: Globe,
    color: "from-[var(--if-green-mid)] to-[var(--if-green)]",
  },
  {
    id: "kids-islam",
    title: { te: "పిల్లల ఇస్లాం", en: "Kids Islam" },
    arabic: "الإسلام للأطفال",
    desc: { te: "వయస్సు 5–15 · విశ్వాసాలు · మర్యాదలు · ప్రవక్త కథలు · ఖురాన్", en: "Ages 5–15 · Beliefs · Manners · Prophet Stories · Quran" },
    meta: { te: "6 విభాగాలు · ఇంటరాక్టివ్ · ఉచితం", en: "6 Sections · Interactive · Free" },
    icon: Baby,
    color: "from-[var(--if-green-mid)] to-[var(--if-green)]",
  },
  {
    id: "names-of-allah",
    title: { te: "అల్లాహ్ నామాలు", en: "Names of Allah" },
    arabic: "أسماء الله الحسنى",
    desc: { te: "99 దివ్య నామాలు — అర్థాలు, ప్రతిఫలాలు, ప్రతిదిన ధ్యానం", en: "99 beautiful names — meanings, virtues, daily reflection" },
    meta: { te: "99 నామాలు · అర్థాలు · ఉచితం", en: "99 Names · Meanings · Free" },
    icon: Star,
    color: "from-[var(--if-green-mid)] to-[var(--if-green)]",
  },
  {
    id: "islamic-calendar",
    title: { te: "ఇస్లామిక్ క్యాలెండర్", en: "Islamic Calendar" },
    arabic: "التقويم الإسلامي",
    desc: { te: "హిజ్రీ ↔ గ్రెగోరియన్ మార్పిడి · ముస్లిం పండుగలు · ముఖ్యమైన తేదీలు", en: "Hijri ↔ Gregorian converter · Islamic festivals · Key dates" },
    meta: { te: "మార్పిడి సాధనం · పండుగలు · ఉచితం", en: "Conversion Tool · Festivals · Free" },
    icon: Calendar,
    color: "from-[var(--if-green-mid)] to-[var(--if-green)]",
  },
  {
    id: "hajj-umrah",
    title: { te: "హజ్జ్ & ఉమ్రా", en: "Hajj & Umrah" },
    arabic: "الحج والعمرة",
    desc: { te: "దశలవారీగా మార్గదర్శకం · ప్రతి అమల్ · దువాలు · తవాఫ్", en: "Step-by-step guide · Every ritual · Duas · Tawaf" },
    meta: { te: "పూర్తి మార్గదర్శకం · ఉచితం", en: "Complete Guide · Free" },
    icon: Users,
    color: "from-[var(--if-green-mid)] to-[var(--if-green)]",
  },
  {
    id: "special-prayers",
    title: { te: "ప్రత్యేక నమాజులు", en: "Special Prayers" },
    arabic: "الصلوات الخاصة",
    desc: { te: "ప్రత్యేక ఇస్లామిక్ నమాజులు — తహజ్జుద్, జుముఆ, ఈద్, తరావీహ్, ఇస్తిఖారా", en: "Special Islamic prayers — Tahajjud, Jumu'ah, Eid, Tarawih, Istikhara" },
    meta: { te: "5 నమాజులు · దువాలు · ఉచితం", en: "5 Prayers · Duas · Free" },
    icon: Star,
    color: "from-[var(--if-green-mid)] to-[var(--if-green)]",
  },
  {
    id: "womens-guidance",
    title: { te: "మహిళల మార్గదర్శనం", en: "Women's Guidance" },
    arabic: "إرشادات المرأة",
    /* The card used to promise haid, nifas, taharah, ghusl and Ramadan —
       a different portal's subject. This is what the page actually covers. */
    desc: { te: "హక్కులు, నమాజ్, హిజాబ్, కుటుంబం — నికాహ్ మరియు ఇద్దత్ పాఠాలతో", en: "Rights, prayer, hijab, family — with lessons on nikah and iddah" },
    meta: { te: "పూర్తి మార్గదర్శకం · గోప్యం · ఉచితం", en: "Complete Guide · Private · Free" },
    icon: Users,
    color: "from-[var(--if-green-mid)] to-[var(--if-green)]",
  },
];

const tools = [
  { label: { te: "జకాత్ కాలిక్యులేటర్", en: "Zakat Calculator" }, icon: Calculator, href: "#zakat" },
  { label: { te: "నమాజు సమయాలు", en: "Prayer Times" }, icon: Clock, href: "#prayer-times" },
];

function KCPage({ lessonCount }: { lessonCount: number }) {
  const { lang, t } = useI18n();

  const filtered = portals;

  return (
    <PageShell>

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--if-green)] text-[var(--if-gold-pale)] py-20 px-4">
        {/* The seal, as on the homepage hero, in place of a tiled texture
            that could have belonged to any site. */}
        <div className="if-emblem if-emblem-hero" aria-hidden="true" />
        <div className="relative mx-auto max-w-4xl text-center flex flex-col items-center gap-5">
          <BlurFade delay={0.05}>
            <span lang="ar" dir="rtl" className="inline-block font-arabic text-3xl text-[var(--if-gold-light)]">بِسْمِ اللَّهِ</span>
          </BlurFade>
          <BlurFade delay={0.1}>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-[var(--if-gold-light)]">
              {copy.islamic_knowledge_center[lang]}
            </h1>
          </BlurFade>
          <BlurFade delay={0.15}>
            <p className="text-[var(--if-gold-pale)]/70 max-w-xl text-lg">
              {copy.free_multilingual_islamic_learning_study[lang]}
            </p>
          </BlurFade>
          <BlurFade delay={0.2} className="flex gap-4 flex-wrap justify-center text-sm">
            {[
              /* Derived, not typed in. These read 12 and 40+ while the site had
                 13 portals and 71 lessons, because a hardcoded count is wrong
                 the moment anything is added. */
              { n: String(portals.length), l: copy.portals[lang] },
              { n: String(lessonCount), l: copy.lessons[lang] },
              { n: "∞", l: copy.free_always[lang] },
            ].map(({ n, l }) => (
              <div key={l} className="flex flex-col items-center px-5 py-3 rounded-xl bg-white/5 border border-[var(--if-gold)]/20">
                <span className="font-display text-2xl font-bold text-[var(--if-gold-light)]">{n}</span>
                <span className="text-xs text-[var(--if-gold-pale)]/80 mt-0.5">{l}</span>
              </div>
            ))}
          </BlurFade>
        </div>
      </section>

      {/* aria-hidden: Marquee repeats its children to loop seamlessly, so a
          screen reader met every item four times over. The strip is a
          decorative ticker and everything in it is listed properly further
          down the page, so hiding it loses nothing. */}
      {/* Marquee */}
      <div aria-hidden="true" className="border-y border-[var(--if-gold)]/20 bg-[var(--if-cream-light)] py-2.5 overflow-hidden">
        <Marquee className="[--duration:35s] [--gap:1rem]">
          {portals.map((p) => (
            <span key={p.id} className="mx-5 text-sm text-[var(--if-text-muted)] font-medium whitespace-nowrap flex items-center gap-2">
              <span className="text-[var(--if-gold-ink)]">✦</span>
              <span lang="ar" dir="rtl" className="font-arabic text-base">{p.arabic}</span>
              <span>·</span>
              {p.title[lang]}
            </span>
          ))}
        </Marquee>
      </div>

      {/* Quick tools */}
      <section id="tools" className="if-defer py-12 px-4 bg-[var(--if-cream-light)]">
        <div className="mx-auto max-w-7xl">
          <BlurFade delay={0.1}>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--if-green)] mb-6">
              {copy.islamic_tools[lang]}
            </h2>
          </BlurFade>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
            {tools.map(({ label, icon: Icon, href }) => (
              <BlurFade key={href} delay={0.1}>
                <Link
                  href={href}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-[var(--if-gold)]/20 hover:border-[var(--if-gold)]/50 transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-[var(--if-green)] flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-[var(--if-gold-light)]" />
                  </div>
                  <span className="font-semibold text-[var(--if-green)] group-hover:text-[var(--if-gold-ink)] transition-colors">
                    {label[lang]}
                  </span>
                  <ChevronRight className="h-4 w-4 text-[var(--if-gold-light)] ml-auto group-hover:text-[var(--if-gold-ink)] transition-colors" />
                </Link>
              </BlurFade>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2 mt-10">
            <section id="prayer-times" className="if-defer scroll-mt-24">
              <h3 className="font-display text-lg font-bold text-[var(--if-green)] mb-3">
                {copy.today_s_prayer_times[lang]}
              </h3>
              <PrayerTimesCard />
              <div className="mt-6">
                <QiblaCompass />
              </div>
            </section>

            <section id="zakat" className="if-defer scroll-mt-24">
              <h3 className="font-display text-lg font-bold text-[var(--if-green)] mb-3">
                {copy.calculate_your_zakat[lang]}
              </h3>
              <ZakatCalculator />
            </section>
          </div>
        </div>
      </section>

      {/* Portals grid */}
      <section className="if-defer py-16 px-4">
        <div className="mx-auto max-w-7xl">
          <BlurFade delay={0.1}>
            <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--if-green)]">
                {copy.learning_portals[lang]}
              </h2>
            </div>
          </BlurFade>

          {/* Thirteen cards in three columns leaves one alone on the last row;
              it spans the row instead, at a reading width. */}
          <div /* Thirteen cards leave one alone on the last row. Putting it in the middle
              column keeps it on the grid at exactly a sibling's width — the old rule
              spanned all three columns and capped it at max-w-md, which came out 35px
              wider than its twelve siblings and off the column rhythm. */
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 [&>*:last-child:nth-child(3n+1)]:lg:col-start-2 [&>*:last-child:nth-child(odd)]:sm:max-lg:col-span-2 [&>*:last-child:nth-child(odd)]:sm:max-lg:mx-auto [&>*:last-child:nth-child(odd)]:sm:max-lg:w-[calc(50%-0.625rem)]">
            {filtered.map((portal, i) => {
              const Icon = portal.icon;
              return (
                <BlurFade key={portal.id} delay={0.05 * i}>
                  <Tilt className="h-full">
                  <Link
                    href={`/knowledge-center/${portal.id}`}
                    className="relative overflow-hidden group flex flex-col h-full rounded-2xl border border-[var(--if-gold)]/20 hover:border-[var(--if-gold)]/50 transition-all hover:shadow-xl hover:shadow-[var(--if-gold)]/10 bg-white"
                  >
                    <BorderBeam size={120} duration={8} colorFrom="#c8922a" colorTo="#e8b84b" className="opacity-0 group-hover:opacity-100" />

                    {/* Header band */}
                    <div className={`bg-gradient-to-br ${portal.color} p-5 flex items-start justify-between`}>
                      <Icon className="h-7 w-7 text-[var(--if-gold-light)]" />
                      <span lang="ar" dir="rtl" className="font-arabic text-2xl text-[var(--if-gold-light)]">{portal.arabic}</span>
                    </div>

                    {/* Body */}
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-display text-lg font-bold text-[var(--if-green)] mb-1">
                        {portal.title[lang]}
                      </h3>
                      <p className="text-sm text-[var(--if-text-muted)] leading-relaxed flex-1">
                        {portal.desc[lang]}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs text-[var(--if-gold-ink)] font-medium">{portal.meta[lang]}</span>
                        <span className="flex items-center gap-1 text-xs font-semibold text-[var(--if-green)] group-hover:text-[var(--if-gold-ink)] transition-colors">
                          {copy.open[lang]} <ChevronRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                  </Tilt>
                </BlurFade>
              );
            })}
          </div>
        </div>
      </section>

      {/* The page used to end by offering to send you back to the homepage —
          the one place every reader here has already been. Student Guidance is
          the site's third product and is mentioned nowhere else on this page,
          so this is where it belongs. */}
      <section className="if-defer px-4 py-16 bg-[var(--if-cream-light)]">
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2">
          <Link
            href="/student-guidance"
            className="group flex flex-col gap-2 rounded-2xl border border-[var(--if-gold)]/20 bg-white p-7 transition-colors hover:border-[var(--if-gold)]/60"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--if-gold-ink)]">
              {lang === "te" ? "తర్వాత ఏమిటి" : "Next"}
            </span>
            <span className="font-display text-xl font-bold text-[var(--if-green)]">
              {lang === "te" ? "విద్యార్థి మార్గదర్శి" : "Student Guidance"}
            </span>
            <span className="text-sm text-[var(--if-text-muted)] text-pretty">
              {lang === "te"
                ? "79 కెరీర్ మార్గాలు — ఇంటర్ తర్వాత ఏ కోర్సు, ఏ పరీక్ష, ఏ స్కాలర్‌షిప్."
                : "79 career pathways — which course after intermediate, which exam, which scholarship."}
            </span>
            <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-bold text-[var(--if-green)]">
              {lang === "te" ? "చూడండి" : "Open"}
              <ChevronRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>

          <Link
            href="/"
            className="group flex flex-col gap-2 rounded-2xl border border-[var(--if-gold)]/20 bg-white p-7 transition-colors hover:border-[var(--if-gold)]/60"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--if-gold-ink)]">
              {lang === "te" ? "సంస్థ గురించి" : "The organisation"}
            </span>
            <span className="font-display text-xl font-bold text-[var(--if-green)]">
              {lang === "te" ? "ఇస్లామిక్ ఫ్రంట్, మంగళగిరి" : "Islamic Front, Mangalagiri"}
            </span>
            <span className="text-sm text-[var(--if-text-muted)] text-pretty">
              {copy.learn_about_the_party_and[lang]}
            </span>
            <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-bold text-[var(--if-green)]">
              {copy.back_to_homepage[lang]}
              <ChevronRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>
      </section>

    </PageShell>
  );
}

export default function KnowledgeCenterPage({ lessonCount }: { lessonCount: number }) {
  return <KCPage lessonCount={lessonCount} />;
}
