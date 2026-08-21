"use client";

import Link from "next/link";
import { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { PageShell } from "@/components/layout/PageShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { Marquee } from "@/components/ui/marquee";
import { BorderBeam } from "@/components/ui/border-beam";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { ChevronRight, Star, Clock, Users, BookOpen, Calculator, Calendar, Baby, Globe } from "lucide-react";

const portals = [
  {
    id: "learn-arabic",
    title: { te: "అరబిక్ నేర్చుకోండి", en: "Learn Arabic" },
    arabic: "تعلُّم العربية",
    desc: { te: "అక్షరాల నుండి ఖురానిక్ అరబిక్ వరకు — నిర్మాణాత్మక అభ్యాస మార్గం", en: "From alphabet to Quranic Arabic — structured learning roadmap" },
    meta: { te: "6 స్థాయిలు · 20+ పాఠాలు · ఉచితం", en: "6 Levels · 20+ Lessons · Free Always" },
    icon: BookOpen,
    color: "from-emerald-900 to-[var(--if-green)]",
  },
  {
    id: "learn-urdu",
    title: { te: "ఉర్దూ నేర్చుకోండి", en: "Learn Urdu" },
    arabic: "تعلُّم الأردو",
    desc: { te: "స్క్రిప్ట్ నుండి ఇస్లామిక్ ఉర్దూ వరకు — 6 స్థాయిలు", en: "From script to Islamic Urdu — 6 structured levels" },
    meta: { te: "6 స్థాయిలు · నస్తాలిఖ్ లిపి · ఉచితం", en: "6 Levels · Nastaliq Script · Free Always" },
    icon: Globe,
    color: "from-blue-900 to-[var(--if-green)]",
  },
  {
    id: "learn-quran",
    title: { te: "ఖురాన్ నేర్చుకోండి", en: "Learn Quran" },
    arabic: "تعلُّم القرآن",
    desc: { te: "చదవడం · తజ్వీద్ · తఫ్సీర్ · హిఫ్జ్ — 4 దశల ప్రయాణం", en: "Reading · Tajweed · Tafseer · Hifz — 4-stage journey" },
    meta: { te: "4 మాడ్యూళ్ళు · సూరా పాఠాలు · ఉచితం", en: "4 Modules · Surah Lessons · Free" },
    icon: BookOpen,
    color: "from-amber-900 to-[var(--if-green)]",
  },
  {
    id: "learn-salah",
    title: { te: "నమాజ్ నేర్చుకోండి", en: "Learn Salah" },
    arabic: "تعلُّم الصلاة",
    desc: { te: "వుజూ నుండి రక్అత్ వరకు · దువాలు · 6 మాడ్యూళ్ళు", en: "Wudu to Rakat · Duas · 6 complete modules" },
    meta: { te: "6 మాడ్యూళ్ళు · ఇంటరాక్టివ్ · ఉచితం", en: "6 Modules · Interactive · Free" },
    icon: Star,
    color: "from-teal-900 to-[var(--if-green)]",
  },
  {
    id: "seerah",
    title: { te: "సీరత్", en: "Seerah" },
    arabic: "السيرة النبوية",
    desc: { te: "ప్రవక్త ముహమ్మద్ ﷺ జీవిత చరిత్ర — 10 దశల కాలపట్టిక", en: "Life of Prophet Muhammad ﷺ — 10-stage visual timeline" },
    meta: { te: "10 దశలు · చారిత్రక కాలపట్టిక · ఉచితం", en: "10 Stages · Historical Timeline · Free" },
    icon: Clock,
    color: "from-slate-800 to-[var(--if-green)]",
  },
  {
    id: "islamic-history",
    title: { te: "ఇస్లామిక్ చరిత్ర", en: "Islamic History" },
    arabic: "التاريخ الإسلامي",
    desc: { te: "రాషిదూన్ నుండి ఆధునిక కాలం వరకు — 6 యుగాలు", en: "Rashidun to modern era — 6 historical epochs" },
    meta: { te: "6 యుగాలు · సామ్రాజ్యాలు · ఉచితం", en: "6 Eras · Empires · Free" },
    icon: Globe,
    color: "from-stone-800 to-[var(--if-green)]",
  },
  {
    id: "kids-islam",
    title: { te: "పిల్లల ఇస్లాం", en: "Kids Islam" },
    arabic: "الإسلام للأطفال",
    desc: { te: "వయస్సు 5–15 · విశ్వాసాలు · మర్యాదలు · ప్రవక్త కథలు · ఖురాన్", en: "Ages 5–15 · Beliefs · Manners · Prophet Stories · Quran" },
    meta: { te: "6 విభాగాలు · ఇంటరాక్టివ్ · ఉచితం", en: "6 Sections · Interactive · Free" },
    icon: Baby,
    color: "from-emerald-900 to-teal-900",
  },
  {
    id: "names-of-allah",
    title: { te: "అల్లాహ్ నామాలు", en: "Names of Allah" },
    arabic: "أسماء الله الحسنى",
    desc: { te: "99 దివ్య నామాలు — అర్థాలు, ప్రతిఫలాలు, ప్రతిదిన ధ్యానం", en: "99 beautiful names — meanings, virtues, daily reflection" },
    meta: { te: "99 నామాలు · అర్థాలు · ఉచితం", en: "99 Names · Meanings · Free" },
    icon: Star,
    color: "from-indigo-900 to-[var(--if-green)]",
  },
  {
    id: "islamic-calendar",
    title: { te: "ఇస్లామిక్ క్యాలెండర్", en: "Islamic Calendar" },
    arabic: "التقويم الإسلامي",
    desc: { te: "హిజ్రీ ↔ గ్రెగోరియన్ మార్పిడి · ముస్లిం పండుగలు · ముఖ్యమైన తేదీలు", en: "Hijri ↔ Gregorian conversion · Islamic festivals · Key dates" },
    meta: { te: "మార్పిడి సాధనం · పండుగలు · ఉచితం", en: "Conversion Tool · Festivals · Free" },
    icon: Calendar,
    color: "from-cyan-900 to-[var(--if-green)]",
  },
  {
    id: "hajj-umrah",
    title: { te: "హజ్జ్ & ఉమ్రా", en: "Hajj & Umrah" },
    arabic: "الحج والعمرة",
    desc: { te: "దశలవారీగా మార్గదర్శకం · ప్రతి అమల్ · దువాలు · తవాఫ్", en: "Step-by-step guide · Every ritual · Duas · Tawaf" },
    meta: { te: "పూర్తి మార్గదర్శకం · ఉచితం", en: "Complete Guide · Free" },
    icon: Users,
    color: "from-yellow-900 to-amber-900",
  },
  {
    id: "special-prayers",
    title: { te: "ప్రత్యేక నమాజులు", en: "Special Prayers" },
    arabic: "الصلوات الخاصة",
    desc: { te: "10 ప్రత్యేక ఇస్లామిక్ నమాజులు — తహజ్జుద్, ఇస్తిఖారా, జనాజా మరియు మరిన్ని", en: "10 special Islamic prayers — Tahajjud, Istikhara, Janaza and more" },
    meta: { te: "10 నమాజులు · దువాలు · ఉచితం", en: "10 Prayers · Duas · Free" },
    icon: Star,
    color: "from-slate-800 to-[var(--if-green)]",
  },
  {
    id: "womens-guidance",
    title: { te: "మహిళల మార్గదర్శకం", en: "Women's Guidance" },
    arabic: "أحكام المرأة",
    desc: { te: "హైద్ · నిఫాస్ · తహారా · గుస్ల్ · రమజాన్ — విశ్వసనీయ ఫిఖ్ మార్గదర్శకం", en: "Hayd · Nifas · Taharah · Ghusl · Ramadan — trusted fiqh guidance" },
    meta: { te: "పూర్తి మార్గదర్శకం · గోప్యం · ఉచితం", en: "Complete Guide · Private · Free" },
    icon: Users,
    color: "from-[#1a3a2a] to-[var(--if-green)]",
  },
];

const tools = [
  { label: { te: "జకాత్ కాలిక్యులేటర్", en: "Zakat Calculator" }, icon: Calculator, href: "/knowledge-center#zakat" },
  { label: { te: "నమాజు సమయాలు", en: "Prayer Times" }, icon: Clock, href: "/knowledge-center#prayer-times" },
];

function KCPage() {
  const { lang, t } = useI18n();
  const [filter, setFilter] = useState<"all" | "learning" | "tools">("all");

  const filtered = filter === "tools" ? [] : portals;

  return (
    <PageShell>

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--if-green)] text-[var(--if-gold-pale)] py-20 px-4">
        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMjgiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2M4OTIyYSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+')]" />
        <div className="relative mx-auto max-w-4xl text-center flex flex-col items-center gap-5">
          <BlurFade delay={0.05}>
            <span className="inline-block font-arabic text-3xl text-[var(--if-gold)]/70">بِسْمِ اللَّهِ</span>
          </BlurFade>
          <BlurFade delay={0.1}>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-[var(--if-gold-light)]">
              {lang === "te" ? "ఇస్లామిక్ జ్ఞాన కేంద్రం" : "Islamic Knowledge Center"}
            </h1>
          </BlurFade>
          <BlurFade delay={0.15}>
            <p className="text-[var(--if-gold-pale)]/70 max-w-xl text-lg">
              {lang === "te"
                ? "ఉచిత, బహుభాషా ఇస్లామిక్ అభ్యాసం — మీ స్వంత వేగంతో నేర్చుకోండి"
                : "Free, multilingual Islamic learning — study at your own pace"}
            </p>
          </BlurFade>
          <BlurFade delay={0.2} className="flex gap-4 flex-wrap justify-center text-sm">
            {[
              { n: "12", l: lang === "te" ? "పోర్టల్స్" : "Portals" },
              { n: "40+", l: lang === "te" ? "పాఠాలు" : "Lessons" },
              { n: "∞", l: lang === "te" ? "ఉచితం" : "Free Always" },
            ].map(({ n, l }) => (
              <div key={l} className="flex flex-col items-center px-5 py-3 rounded-xl bg-white/5 border border-[var(--if-gold)]/20">
                <span className="font-display text-2xl font-bold text-[var(--if-gold-light)]">{n}</span>
                <span className="text-xs text-[var(--if-gold-pale)]/60 mt-0.5">{l}</span>
              </div>
            ))}
          </BlurFade>
        </div>
      </section>

      {/* Marquee */}
      <div className="border-y border-[var(--if-gold)]/20 bg-[var(--if-cream-light)] py-2.5 overflow-hidden">
        <Marquee className="[--duration:35s] [--gap:1rem]">
          {portals.map((p) => (
            <span key={p.id} className="mx-5 text-sm text-[var(--if-text-muted)] font-medium whitespace-nowrap flex items-center gap-2">
              <span className="text-[var(--if-gold)]">✦</span>
              <span className="font-arabic text-base">{p.arabic}</span>
              <span>·</span>
              {p.title[lang]}
            </span>
          ))}
        </Marquee>
      </div>

      {/* Quick tools */}
      <section id="tools" className="py-12 px-4 bg-[var(--if-cream-light)]">
        <div className="mx-auto max-w-7xl">
          <BlurFade delay={0.1}>
            <h2 className="font-display text-2xl font-bold text-[var(--if-green)] mb-6">
              {lang === "te" ? "ఇస్లామిక్ సాధనాలు" : "Islamic Tools"}
            </h2>
          </BlurFade>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
            {tools.map(({ label, icon: Icon, href }) => (
              <BlurFade key={href} delay={0.1}>
                <Link
                  href={href}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-[var(--if-gold)]/15 hover:border-[var(--if-gold)]/50 transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-[var(--if-green)] flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-[var(--if-gold-light)]" />
                  </div>
                  <span className="font-semibold text-[var(--if-green)] group-hover:text-[var(--if-gold)] transition-colors">
                    {label[lang]}
                  </span>
                  <ChevronRight className="h-4 w-4 text-[var(--if-gold)]/50 ml-auto group-hover:text-[var(--if-gold)] transition-colors" />
                </Link>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Portals grid */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-7xl">
          <BlurFade delay={0.1}>
            <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
              <h2 className="font-display text-3xl font-bold text-[var(--if-green)]">
                {lang === "te" ? "అభ్యాస పోర్టల్స్" : "Learning Portals"}
              </h2>
              <div className="flex gap-2">
                {(["all", "learning"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors border ${
                      filter === f
                        ? "bg-[var(--if-green)] text-[var(--if-gold-light)] border-[var(--if-green)]"
                        : "border-[var(--if-gold)]/30 text-[var(--if-text-muted)] hover:border-[var(--if-gold)]"
                    }`}
                  >
                    {f === "all" ? (lang === "te" ? "అన్నీ" : "All") : (lang === "te" ? "అభ్యాసం" : "Learning")}
                  </button>
                ))}
              </div>
            </div>
          </BlurFade>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((portal, i) => {
              const Icon = portal.icon;
              return (
                <BlurFade key={portal.id} delay={0.05 * i}>
                  <Link
                    href={`/knowledge-center/${portal.id}`}
                    className="relative overflow-hidden group flex flex-col rounded-2xl border border-[var(--if-gold)]/15 hover:border-[var(--if-gold)]/50 transition-all hover:shadow-xl hover:shadow-[var(--if-gold)]/10 bg-white"
                  >
                    <BorderBeam size={120} duration={8} colorFrom="#c8922a" colorTo="#e8b84b" className="opacity-0 group-hover:opacity-100" />

                    {/* Header band */}
                    <div className={`bg-gradient-to-br ${portal.color} p-5 flex items-start justify-between`}>
                      <Icon className="h-7 w-7 text-[var(--if-gold-light)]" />
                      <span className="font-arabic text-2xl text-[var(--if-gold)]/60">{portal.arabic}</span>
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
                        <span className="text-xs text-[var(--if-gold)] font-medium">{portal.meta[lang]}</span>
                        <span className="flex items-center gap-1 text-xs font-semibold text-[var(--if-green)] group-hover:text-[var(--if-gold)] transition-colors">
                          {lang === "te" ? "తెరవండి" : "Open"} <ChevronRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </BlurFade>
              );
            })}
          </div>
        </div>
      </section>

      {/* Back to home CTA */}
      <section className="py-12 px-4 bg-[var(--if-cream-light)] text-center">
        <BlurFade delay={0.1}>
          <p className="text-[var(--if-text-muted)] mb-4">
            {lang === "te" ? "పార్టీ మరియు సంక్షేమ కార్యక్రమాల గురించి తెలుసుకోండి" : "Learn about the party and welfare programmes"}
          </p>
          <Link href="/">
            <ShimmerButton shimmerColor="#e8b84b" background="#0d3b1e" className="text-[var(--if-gold-light)] font-semibold">
              {lang === "te" ? "← హోమ్‌పేజీకి వెళ్ళండి" : "← Back to Homepage"}
            </ShimmerButton>
          </Link>
        </BlurFade>
      </section>

    </PageShell>
  );
}

export default function KnowledgeCenterPage() {
  return <KCPage />;
}
