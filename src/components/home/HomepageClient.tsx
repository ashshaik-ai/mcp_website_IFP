"use client";

import Image from "next/image";
import { I18nProvider, useI18n } from "@/lib/i18n/context";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BlurFade } from "@/components/ui/blur-fade";
import { Marquee } from "@/components/ui/marquee";
import { NumberTicker } from "@/components/ui/number-ticker";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { BorderBeam } from "@/components/ui/border-beam";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Clock, Circle, ChevronRight, Phone, Mail, MapPin, Calendar, Users, Building2, BookOpen, Heart } from "lucide-react";

/* ── Data ── */
const achievements = [
  {
    title: { te: "కన్వెన్షన్ హాల్ పరివర్తన", en: "Convention Hall Transformation" },
    desc:  { te: "AC ఏర్పాటు, పూర్తి పునర్నిర్మాణం", en: "AC installation, complete remodeling" },
    evidence: ["Full AC", "Complete Remodeling", "2 Halls", "1,000+ Families"],
  },
  {
    title: { te: "అంజుమన్ ఆదాయం మెరుగుదల", en: "Improved Anjuman Revenue" },
    desc:  { te: "అద్దె వసూలు వ్యవస్థ", en: "Disciplined rent collection system" },
    evidence: ["Disciplined System", "Since 2023", "120+ Shops", "Significant Improvement"],
  },
  {
    title: { te: "షాప్ ఆడిట్ & సబ్లీజ్ పరిష్కారం", en: "Shop Audit & Sublease Resolution" },
    desc:  { te: "₹27 లక్షల అదనపు ఆదాయం", en: "₹27 lakh additional revenue" },
    evidence: ["120+ Audited", "Sublease Eliminated", "₹27L Additional"],
  },
  {
    title: { te: "అంత్యక్రియల ఆర్థిక సహాయ పథకం", en: "Funeral Financial Aid Scheme" },
    desc:  { te: "కుటుంబానికి ₹10,000", en: "₹10,000 per family" },
    evidence: ["Active Scheme", "250+ Families", "₹10,000", "Since 2023"],
  },
  {
    title: { te: "18 మసీదుల నిర్వహణ", en: "Managing 18 Mosques" },
    desc:  { te: "నిర్వహణ మరియు సంరక్షణ", en: "Maintenance and upkeep" },
    evidence: ["18 Mosques", "5 Madrasas", "3,000+ Voters"],
  },
  {
    title: { te: "మహిళా కుట్టు శిక్షణా కేంద్రం", en: "Women's Stitching Training Centre" },
    desc:  { te: "ఉపాధి అవకాశాలు", en: "Employment opportunities" },
    evidence: ["Centre Established", "Training Ongoing", "Women's Independence"],
  },
];

const manifesto = [
  { title: { te: "అనాథలకు అంజుమన్ షాదీ ఖానా ఉచితంగా", en: "Anjuman Shadi Khana free for orphans" }, status: "completed" },
  { title: { te: "పేద అమ్మాయిలకు జహాజ్ (వివాహ బహుమతి)", en: "Wedding gift (Jehaz) for poor girls" }, status: "completed" },
  { title: { te: "₹10,000 అంత్యక్రియల సహాయం", en: "₹10,000 funeral assistance" }, status: "completed" },
  { title: { te: "వార్షికంగా 10 మంది విద్యార్థులకు స్కాలర్‌షిప్", en: "Sponsor 10 students annually" }, status: "completed" },
  { title: { te: "టైలరింగ్ కేంద్రం + ఉచిత మెషీన్లు", en: "Tailoring centre + free machines" }, status: "in_progress" },
  { title: { te: "షాపింగ్ కాంప్లెక్స్", en: "Shopping complex" }, status: "in_progress" },
  { title: { te: "6 నెలలకు ఒకసారి వైద్య శిబిరం", en: "Medical camp every 6 months" }, status: "in_progress" },
  { title: { te: "స్కాలర్‌షిప్ మొత్తాలు పెంచడం", en: "Increase scholarship amounts" }, status: "in_progress" },
  { title: { te: "ఉచిత కంప్యూటర్ శిక్షణ కేంద్రం", en: "Free computer training centre" }, status: "upcoming" },
  { title: { te: "ఇమామ్/ముయజ్జిన్ జీతాలు పెంచడం", en: "Increase Imam/Muezzin salaries" }, status: "upcoming" },
];

const infra = [
  { icon: Building2, count: "18", label: { te: "క్రియాశీల మసీదులు", en: "Active Mosques" } },
  { icon: BookOpen,  count: "5",  label: { te: "మదరసాలు", en: "Madrasas" } },
  { icon: Building2, count: "2",  label: { te: "కన్వెన్షన్ హాళ్ళు", en: "Convention Halls" } },
  { icon: Heart,     count: "1",  label: { te: "కుట్టు శిక్షణ కేంద్రం", en: "Stitching Training Centre" } },
  { icon: Building2, count: "120+", label: { te: "అద్దె దుకాణాలు", en: "Rental Shops" } },
];

const stories = [
  { name: "Fatima Begum", year: "2024", category: { te: "అంత్యక్రియల సహాయం", en: "Funeral Aid" }, desc: { te: "₹10,000 సహాయం అందింది", en: "Received ₹10,000 assistance" } },
  { name: "Sayeeda Khatoon", year: "2024", category: { te: "మహిళా సాధికారత", en: "Women's Empowerment" }, desc: { te: "కుట్టు శిక్షణ తర్వాత స్వంత వ్యాపారం", en: "Stitching training → own business" } },
  { name: "Mohammad Yusuf", year: "2024", category: { te: "విద్య", en: "Education" }, desc: { te: "పిల్లలు ఖురాన్ నేర్చుకుంటున్నారు", en: "Children learning Quran" } },
  { name: "Arif Hussain", year: "2023", category: { te: "విద్యార్థి", en: "Student" }, desc: { te: "స్కాలర్‌షిప్ → ఇంజినీరింగ్ గ్రాడ్యుయేట్", en: "Scholarship → Engineering Graduate" } },
];

const events = [
  { title: { te: "వైద్య శిబిరం", en: "Medical Camp" }, date: "Jan 2025", time: "9am–1pm", venue: { te: "అంజుమన్ హాల్", en: "Anjuman Hall" } },
  { title: { te: "మదరసా అడ్మిషన్లు 2026–27", en: "Madrasa Admissions 2026–27" }, date: "July 1", time: "Apply by", venue: { te: "ఆన్‌లైన్ / అంజుమన్", en: "Online / Anjuman" } },
  { title: { te: "కుట్టు శిక్షణ కొత్త బ్యాచ్", en: "Stitching Training New Batch" }, date: "Ongoing", time: "18+ మహిళలకు", venue: { te: "శిక్షణ కేంద్రం", en: "Training Centre" } },
  { title: { te: "స్కాలర్‌షిప్ దరఖాస్తులు 2026–27", en: "Scholarship Applications 2026–27" }, date: "Open Now", time: "10 సీట్లు", venue: { te: "అంజుమన్ కార్యాలయం", en: "Anjuman Office" } },
];

const kc_portals = [
  { title: "Learn Arabic", sub: "6 Levels · 20+ Lessons", href: "/knowledge-center/learn-arabic", arabic: "تعلُّم العربية" },
  { title: "Learn Quran",  sub: "4 Modules · Tajweed + Tafseer", href: "/knowledge-center/learn-quran", arabic: "تعلُّم القرآن" },
  { title: "Learn Salah",  sub: "6 Modules · Wudu to Duas", href: "/knowledge-center/learn-salah", arabic: "تعلُّم الصلاة" },
  { title: "Seerah",       sub: "10-Stage Prophet's biography", href: "/knowledge-center/seerah", arabic: "السيرة النبوية" },
  { title: "Islamic History", sub: "6 Eras from Rashidun to modern", href: "/knowledge-center/islamic-history", arabic: "التاريخ الإسلامي" },
  { title: "Kids Islam",   sub: "Ages 5–15 · 6 learning stages", href: "/knowledge-center/kids-islam", arabic: "الإسلام للأطفال" },
];

const leaders = [
  { name: "Janab Shaik Akram", te: "జనాబ్ షేక్ అక్రమ్", role: { te: "వ్యవస్థాపకుడు & అధ్యక్షుడు", en: "Founder & Chairman" }, img: "/assets/founder/shaik-akram-2.jpg" },
  { name: "Yaseen Shaik",      te: "యాసీన్ షేక్",       role: { te: "సభ్యుడు — 2023", en: "Member — 2023" }, img: "/assets/candidates/1.candidate.jpg" },
  { name: "Abdul Aleem",       te: "అబ్దుల్ అలీమ్",     role: { te: "సభ్యుడు — 2023", en: "Member — 2023" }, img: "/assets/candidates/2.candidate.jpg" },
  { name: "Akbar Basha Shaik", te: "అక్బర్ బాషా షేక్",  role: { te: "సభ్యుడు — 2023", en: "Member — 2023" }, img: "/assets/candidates/3.candidate.jpg" },
  { name: "Hazrat Ali Shaik",  te: "హజ్రత్ అలీ షేక్",   role: { te: "సభ్యుడు — 2023", en: "Member — 2023" }, img: "/assets/candidates/4.candidate.jpg" },
  { name: "Abdul Saleem",      te: "అబ్దుల్ సలీమ్",     role: { te: "సభ్యుడు — 2023", en: "Member — 2023" }, img: "/assets/candidates/5.candidate.jpg" },
  { name: "Hanifsha Shaik",    te: "హనీఫ్‌షా షేక్",     role: { te: "సభ్యుడు — 2023", en: "Member — 2023" }, img: "/assets/candidates/6.candidate.jpg" },
  { name: "Hafeez Shaik",      te: "హఫీజ్ షేక్",        role: { te: "సభ్యుడు — 2023", en: "Member — 2023" }, img: "/assets/candidates/7.candidate.jpg" },
];

const gallery = [
  { src: "/assets/gallery/convention-hall.webp",       title: { te: "కన్వెన్షన్ హాల్ పునరుద్ధరణ",    en: "Convention Hall Renovation" } },
  { src: "/assets/gallery/eid-celebration.webp",       title: { te: "ఈద్ వేడుక",                      en: "Eid Celebration" } },
  { src: "/assets/gallery/funeral-aid.webp",           title: { te: "అంత్యక్రియల సహాయం",             en: "Funeral Aid Program" } },
  { src: "/assets/gallery/madrasa-classes.webp",       title: { te: "మదరసా తరగతులు",                 en: "Madrasa Classes" } },
  { src: "/assets/gallery/medical-camp.webp",          title: { te: "వైద్య శిబిరం",                  en: "Medical Camp" } },
  { src: "/assets/gallery/mosque-renovation.webp",     title: { te: "మసీదు పునరుద్ధరణ",              en: "Mosque Renovation" } },
  { src: "/assets/gallery/ramadan-iftar.webp",         title: { te: "రంజాన్ ఇఫ్తార్",                en: "Ramadan Iftar" } },
  { src: "/assets/gallery/scholarship-distribution.webp", title: { te: "స్కాలర్‌షిప్ పంపిణీ",       en: "Scholarship Distribution" } },
  { src: "/assets/gallery/tailoring-center.webp",      title: { te: "కుట్టు శిక్షణా కేంద్రం",       en: "Tailoring Training Center" } },
];

/* ── Status helpers ── */
function StatusIcon({ status }: { status: string }) {
  if (status === "completed") return <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />;
  if (status === "in_progress") return <Clock className="h-5 w-5 text-amber-500 flex-shrink-0" />;
  return <Circle className="h-5 w-5 text-gray-400 flex-shrink-0" />;
}

function statusColor(status: string) {
  if (status === "completed") return "bg-emerald-100 text-emerald-800 border-emerald-200";
  if (status === "in_progress") return "bg-amber-100 text-amber-800 border-amber-200";
  return "bg-gray-100 text-gray-600 border-gray-200";
}

/* ── Inner component (needs i18n hook) ── */
function Homepage() {
  const { t, lang } = useI18n();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[var(--if-green)] text-[var(--if-gold-pale)] py-24 md:py-32 px-4">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMjgiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2M4OTIyYSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+')]" />

        <div className="relative mx-auto max-w-5xl text-center flex flex-col items-center gap-6">
          <BlurFade delay={0.05}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--if-gold)]/40 text-[var(--if-gold-light)] text-sm font-medium">
              🌙 {t("hero_badge")}
            </span>
          </BlurFade>

          <BlurFade delay={0.1}>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-[var(--if-gold-light)] leading-tight">
              {t("hero_title")}
            </h1>
          </BlurFade>

          <BlurFade delay={0.15}>
            <p className="text-[var(--if-gold-pale)]/80 max-w-xl text-lg md:text-xl leading-relaxed">
              {t("hero_sub")}
            </p>
          </BlurFade>

          {/* Stats chips */}
          <BlurFade delay={0.2} className="flex gap-4 flex-wrap justify-center">
            <div className="flex flex-col items-center px-6 py-3 rounded-2xl bg-white/5 border border-[var(--if-gold)]/20 min-w-[140px]">
              <span className="font-display text-3xl font-bold text-[var(--if-gold-light)]">7/9</span>
              <span className="text-xs text-[var(--if-gold-pale)]/70 mt-1">{t("hero_seats")}</span>
            </div>
            <div className="flex flex-col items-center px-6 py-3 rounded-2xl bg-white/5 border border-[var(--if-gold)]/20 min-w-[140px]">
              <span className="font-display text-3xl font-bold text-[var(--if-gold-light)]">15+</span>
              <span className="text-xs text-[var(--if-gold-pale)]/70 mt-1">{t("hero_years")}</span>
            </div>
          </BlurFade>

          <BlurFade delay={0.25} className="flex gap-3 flex-wrap justify-center">
            <ShimmerButton
              shimmerColor="#e8b84b"
              background="rgba(200,146,42,0.15)"
              className="border border-[var(--if-gold)]/50 text-[var(--if-gold-light)] font-semibold"
            >
              {t("hero_cta")}
            </ShimmerButton>
            <a
              href="/knowledge-center"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--if-gold-pale)]/30 text-[var(--if-gold-pale)]/80 hover:bg-white/5 transition-colors text-sm font-medium"
            >
              {t("nav_kc")} <ChevronRight className="h-4 w-4" />
            </a>
          </BlurFade>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="border-y border-[var(--if-gold)]/20 bg-[var(--if-cream-light)] py-3 overflow-hidden">
        <Marquee pauseOnHover className="[--duration:30s] [--gap:1rem]">
          {["Community Welfare", "Education Support", "Medical Aid", "Youth Programs",
            "Zakat Distribution", "Women Empowerment", "Senior Care", "Civic Engagement",
            "18 Mosques", "5 Madrasas", "250+ Families Helped"].map((item) => (
            <span key={item} className="mx-4 flex items-center gap-2 text-sm text-[var(--if-text-muted)] font-medium whitespace-nowrap">
              <span className="text-[var(--if-gold)]">✦</span> {item}
            </span>
          ))}
        </Marquee>
      </div>

      {/* ── VICTORY ── */}
      <section id="victory" className="py-20 px-4 scroll-mt-20">
        <div className="mx-auto max-w-7xl">
          <BlurFade delay={0.1}>
            <div className="text-center mb-12">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--if-gold)]">
                {t("section_victory_tag")}
              </span>
              <h2 className="font-display text-4xl font-bold text-[var(--if-green)] mt-3 mb-3">
                {t("section_victory_title")}
              </h2>
              <p className="text-[var(--if-text-muted)] max-w-xl mx-auto">
                {t("section_victory_desc")}
              </p>
              <p className="text-xs text-[var(--if-text-muted)]/70 mt-2">
                Anjuman-e-Himayatul Islam, Mangalagiri · 522503, A.P.
              </p>
            </div>
          </BlurFade>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
            {[
              { n: "7", label: { te: "ఎన్నికైన సభ్యులు", en: "Elected Members" } },
              { n: "15+", label: { te: "సేవా సంవత్సరాలు", en: "Years of Service" } },
              { n: "2023", label: { te: "ఎన్నికలు", en: "Elections" } },
            ].map(({ n, label }) => (
              <BlurFade key={n} delay={0.1}>
                <div className="relative overflow-hidden text-center p-6 rounded-2xl bg-[var(--if-green)] text-[var(--if-gold-pale)]">
                  <BorderBeam size={80} duration={6} colorFrom="#c8922a" colorTo="#e8b84b" />
                  <div className="font-display text-4xl font-bold text-[var(--if-gold-light)]">{n}</div>
                  <div className="text-sm mt-1 text-[var(--if-gold-pale)]/70">{label[lang]}</div>
                </div>
              </BlurFade>
            ))}
          </div>

          {/* Leadership cards */}
          <div>
            <h3 className="text-center font-semibold text-[var(--if-green)] mb-6">
              {lang === "te" ? "వ్యవస్థాపకుడు & నాయకత్వం" : "Founder & Leadership"}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto">
              {leaders.map((leader) => (
                <BlurFade key={leader.name} delay={0.05}>
                  <div className="text-center p-4 rounded-xl bg-[var(--if-cream-light)] border border-[var(--if-gold)]/15 hover:border-[var(--if-gold)]/40 transition-colors group">
                    <div className="relative w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden border-2 border-[var(--if-gold)]/30 group-hover:border-[var(--if-gold)]/70 transition-colors">
                      <Image
                        src={leader.img}
                        alt={leader.name}
                        fill
                        className="object-cover object-top"
                        sizes="64px"
                      />
                    </div>
                    <p className="text-xs font-semibold text-[var(--if-green)] leading-snug">
                      {lang === "te" ? leader.te : leader.name}
                    </p>
                    <p className="text-[10px] text-[var(--if-gold)] mt-0.5">{leader.role[lang]}</p>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Separator className="bg-[var(--if-gold)]/15" />

      {/* ── ACHIEVEMENTS ── */}
      <section id="achievements" className="py-20 px-4 bg-[var(--if-cream-light)] scroll-mt-20">
        <div className="mx-auto max-w-7xl">
          <BlurFade delay={0.1}>
            <h2 className="font-display text-4xl font-bold text-[var(--if-green)] text-center mb-12">
              {t("section_achievements")}
            </h2>
          </BlurFade>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((a, i) => (
              <BlurFade key={i} delay={0.05 * i}>
                <div className="relative overflow-hidden bg-white rounded-2xl border border-[var(--if-gold)]/15 p-6 h-full hover:border-[var(--if-gold)]/40 transition-colors group">
                  <BorderBeam size={100} duration={8} colorFrom="#0d3b1e" colorTo="#c8922a" className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  <h3 className="font-semibold text-[var(--if-green)] mb-2">{a.title[lang]}</h3>
                  <p className="text-sm text-[var(--if-text-muted)] mb-4">{a.desc[lang]}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {a.evidence.map((e) => (
                      <span key={e} className="text-xs px-2 py-0.5 rounded-full bg-[var(--if-gold)]/10 text-[var(--if-gold)] border border-[var(--if-gold)]/20 font-medium">
                        {e}
                      </span>
                    ))}
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* ── MANIFESTO ── */}
      <section id="manifesto" className="py-20 px-4 scroll-mt-20">
        <div className="mx-auto max-w-4xl">
          <BlurFade delay={0.1}>
            <div className="text-center mb-4">
              <h2 className="font-display text-4xl font-bold text-[var(--if-green)]">
                {t("section_manifesto")}
              </h2>
            </div>
            {/* Progress summary */}
            <div className="flex justify-center gap-6 mb-10 flex-wrap">
              <div className="flex items-center gap-2 text-sm font-medium text-emerald-700">
                <CheckCircle2 className="h-5 w-5" />
                <span>4 {t("completed")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-amber-600">
                <Clock className="h-5 w-5" />
                <span>4 {t("in_progress")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                <Circle className="h-5 w-5" />
                <span>2 {t("upcoming")}</span>
              </div>
            </div>
          </BlurFade>

          <div className="space-y-3">
            {manifesto.map((item, i) => (
              <BlurFade key={i} delay={0.04 * i}>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-[var(--if-gold)]/10 hover:border-[var(--if-gold)]/30 transition-colors">
                  <StatusIcon status={item.status} />
                  <span className="flex-1 text-[var(--if-text)] font-medium">{item.title[lang]}</span>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold ${statusColor(item.status)}`}>
                    {item.status === "completed" ? t("completed") : item.status === "in_progress" ? t("in_progress") : t("upcoming")}
                  </span>
                </div>
              </BlurFade>
            ))}
          </div>

          <BlurFade delay={0.5} className="text-center mt-8">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--if-green)] text-[var(--if-gold-light)] font-semibold hover:bg-[var(--if-green)]/90 transition-colors"
            >
              📥 {t("download_manifesto")}
            </a>
          </BlurFade>
        </div>
      </section>

      {/* ── SCHEMES ── */}
      <section id="schemes" className="py-20 px-4 bg-[var(--if-green)] scroll-mt-20">
        <div className="mx-auto max-w-5xl">
          <BlurFade delay={0.1}>
            <h2 className="font-display text-4xl font-bold text-[var(--if-gold-light)] text-center mb-12">
              {t("section_schemes")}
            </h2>
          </BlurFade>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <BlurFade delay={0.15}>
              <div className="bg-white/5 border border-[var(--if-gold)]/25 rounded-2xl p-8">
                <h3 className="font-display text-xl text-[var(--if-gold-light)] font-bold mb-2">
                  {t("scheme_title")}
                </h3>
                <div className="font-display text-6xl font-bold text-[var(--if-gold)] my-4">
                  {t("scheme_amount")}
                </div>
                <p className="text-[var(--if-gold-pale)]/70 text-sm mb-6">{t("scheme_sub")}</p>
                <p className="text-[var(--if-gold-pale)]/60 text-sm mb-6">{t("scheme_desc")}</p>
                <ul className="space-y-3">
                  {[
                    lang === "te" ? "దరఖాస్తుదారు మంగళగిరి ముస్లిం నివాసి అయి ఉండాలి" : "Applicant must be Muslim resident of Mangalagiri",
                    lang === "te" ? "కుటుంబం స్వంతంగా అంత్యక్రియలు నిర్వహించలేని స్థితిలో ఉండాలి" : "Family unable to fund funeral independently",
                    lang === "te" ? "సహాయం నేరుగా అంజుమన్ ద్వారా అందించబడుతుంది" : "Aid disbursed directly by Anjuman",
                    lang === "te" ? "ఎటువంటి అధికారిక ఆలస్యం లేదు" : "No bureaucratic delay",
                  ].map((c) => (
                    <li key={c} className="flex items-start gap-3 text-sm text-[var(--if-gold-pale)]/80">
                      <CheckCircle2 className="h-4 w-4 text-[var(--if-gold)] flex-shrink-0 mt-0.5" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </BlurFade>
            <BlurFade delay={0.2}>
              <div className="space-y-6">
                <div className="bg-white/5 border border-[var(--if-gold)]/20 rounded-2xl p-6">
                  <h4 className="font-display text-lg text-[var(--if-gold-light)] font-bold mb-3">
                    {lang === "te" ? "అత్యంత అవసరమైన వారికి సేవ" : "Serving the Most Vulnerable"}
                  </h4>
                  <p className="text-sm text-[var(--if-gold-pale)]/70 leading-relaxed">
                    {lang === "te"
                      ? "మృతుల సంరక్షణ ఫర్జ్ కిఫాయా. మంగళగిరి స్థానికులకు మాత్రమే."
                      : "Caring for the deceased is fard kifaya. Exclusively for Mangalagiri locals."}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-[var(--if-gold)]/20 rounded-xl p-4 text-center">
                    <div className="font-display text-3xl font-bold text-[var(--if-gold)]">250+</div>
                    <div className="text-xs text-[var(--if-gold-pale)]/60 mt-1">
                      {lang === "te" ? "కుటుంబాలు సహాయం పొందాయి" : "Families Assisted"}
                    </div>
                  </div>
                  <div className="bg-white/5 border border-[var(--if-gold)]/20 rounded-xl p-4 text-center">
                    <div className="font-display text-3xl font-bold text-[var(--if-gold)]">2023</div>
                    <div className="text-xs text-[var(--if-gold-pale)]/60 mt-1">
                      {lang === "te" ? "నుండి అమలులో ఉంది" : "Active Since"}
                    </div>
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* ── INFRASTRUCTURE ── */}
      <section className="py-20 px-4 scroll-mt-20">
        <div className="mx-auto max-w-5xl">
          <BlurFade delay={0.1}>
            <h2 className="font-display text-4xl font-bold text-[var(--if-green)] text-center mb-12">
              {t("section_infra")}
            </h2>
          </BlurFade>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {infra.map(({ icon: Icon, count, label }, i) => (
              <BlurFade key={i} delay={0.08 * i}>
                <div className="relative overflow-hidden text-center p-6 rounded-2xl bg-[var(--if-cream-light)] border border-[var(--if-gold)]/15 hover:border-[var(--if-gold)]/40 transition-colors group">
                  <BorderBeam size={60} duration={5} colorFrom="#c8922a" colorTo="#e8b84b" className="opacity-0 group-hover:opacity-100" />
                  <Icon className="h-7 w-7 mx-auto mb-3 text-[var(--if-gold)]" />
                  <div className="font-display text-3xl font-bold text-[var(--if-green)]">
                    <NumberTicker value={parseInt(count) || 0} />
                    {count.includes("+") ? "+" : ""}
                  </div>
                  <div className="text-xs text-[var(--if-text-muted)] mt-1">{label[lang]}</div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <Separator className="bg-[var(--if-gold)]/15" />

      {/* ── ABOUT / FOUNDER ── */}
      <section id="about" className="py-20 px-4 bg-[var(--if-cream-light)] scroll-mt-20">
        <div className="mx-auto max-w-5xl grid md:grid-cols-2 gap-12 items-center">
          <BlurFade delay={0.1}>
            <div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--if-gold)]">Est. 26-08-2011</span>
              <h2 className="font-display text-4xl font-bold text-[var(--if-green)] mt-3 mb-4">
                {t("section_about")}
              </h2>
              <p className="text-[var(--if-text-muted)] mb-6 leading-relaxed">
                {lang === "te"
                  ? "జనాబ్ షేక్ అక్రమ్ స్థాపించిన ఇస్లామిక్ ఫ్రంట్, విశ్వాసం, సంక్షేమం మరియు పౌర భాగస్వామ్యం అనే మూడు స్తంభాలపై నిర్మించబడింది."
                  : "Founded by Janab Shaik Akram, Islamic Front is built on three pillars: faith, welfare, and civic participation — working to build a stronger Muslim community in Mangalagiri."}
              </p>
              <ul className="space-y-4">
                {[
                  { year: "2011", event: { te: "ఇస్లామిక్ ఫ్రంట్ స్థాపన", en: "Islamic Front established" } },
                  { year: "Ongoing", event: { te: "జనాబ్ ఆ.ప్ర. వక్ఫ్ బోర్డు డైరెక్టర్‌గా సేవ", en: "Janab serves as A.P. Waqf Board Director" } },
                  { year: "July 2023", event: { te: "7/9 సీట్లతో చారిత్రాత్మక విజయం", en: "Landslide victory (7/9 seats)" } },
                  { year: "2023–Now", event: { te: "కన్వెన్షన్ అప్‌గ్రేడ్, అంత్యక్రియల సహాయం, అద్దె సంస్కరణలు", en: "Convention upgrades, funeral aid, rent reforms, stitching centre" } },
                ].map(({ year, event }) => (
                  <li key={year} className="flex gap-4">
                    <span className="text-xs font-bold text-[var(--if-gold)] min-w-[72px] pt-0.5">{year}</span>
                    <span className="text-sm text-[var(--if-text)]">{event[lang]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </BlurFade>
          <BlurFade delay={0.2}>
            <div className="relative overflow-hidden rounded-2xl bg-[var(--if-green)] p-8 text-center text-[var(--if-gold-pale)]">
              <BorderBeam size={200} duration={10} colorFrom="#c8922a" colorTo="#e8b84b" />
              <div className="relative w-40 h-40 mx-auto mb-5 rounded-full overflow-hidden border-4 border-[var(--if-gold)]/50 shadow-2xl shadow-black/40">
                <Image
                  src="/assets/founder/shaik-akram-2.jpg"
                  alt="జనాబ్ షేక్ అక్రమ్"
                  fill
                  className="object-cover object-top"
                  sizes="160px"
                  priority
                />
              </div>
              <h3 className="font-display text-xl text-[var(--if-gold-light)] font-bold">
                {lang === "te" ? "జనాబ్ షేక్ అక్రమ్" : "Janab Shaik Akram"}
              </h3>
              <p className="text-sm text-[var(--if-gold-pale)]/70 mt-1">
                {lang === "te" ? "వ్యవస్థాపకుడు · ఇస్లామిక్ ఫ్రంట్" : "Founder · Islamic Front"}
              </p>
              <p className="text-sm text-[var(--if-gold-pale)]/60 mt-0.5">
                {lang === "te" ? "ఆ.ప్ర. వక్ఫ్ బోర్డు డైరెక్టర్" : "A.P. Waqf Board Director"}
              </p>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* ── STORIES ── */}
      <section className="py-20 px-4 scroll-mt-20">
        <div className="mx-auto max-w-7xl">
          <BlurFade delay={0.1}>
            <h2 className="font-display text-4xl font-bold text-[var(--if-green)] text-center mb-12">
              {t("section_stories")}
            </h2>
          </BlurFade>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stories.map((s, i) => (
              <BlurFade key={i} delay={0.08 * i}>
                <div className="bg-white rounded-2xl border border-[var(--if-gold)]/15 p-6 hover:border-[var(--if-gold)]/40 transition-colors h-full">
                  <div className="w-10 h-10 rounded-full bg-[var(--if-green)] flex items-center justify-center text-[var(--if-gold-light)] font-bold mb-3">
                    {s.name[0]}
                  </div>
                  <h4 className="font-semibold text-[var(--if-green)]">{s.name}</h4>
                  <span className="text-xs text-[var(--if-gold)] font-medium">{s.year} · {s.category[lang]}</span>
                  <p className="text-sm text-[var(--if-text-muted)] mt-2">{s.desc[lang]}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="py-20 px-4 bg-[var(--if-cream-light)]">
        <div className="mx-auto max-w-7xl">
          <BlurFade delay={0.1}>
            <h2 className="font-display text-4xl font-bold text-[var(--if-green)] text-center mb-3">
              {lang === "te" ? "మా కార్యక్రమాలు" : "Our Programs in Action"}
            </h2>
            <p className="text-[var(--if-text-muted)] text-center mb-10 text-sm">
              {lang === "te" ? "సేవ, విద్య మరియు సమాజ నిర్మాణం" : "Service, education and community building"}
            </p>
          </BlurFade>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {gallery.map((item, i) => (
              <BlurFade key={item.src} delay={0.04 * i}>
                <div className="group relative overflow-hidden rounded-2xl aspect-video border border-[var(--if-gold)]/15 hover:border-[var(--if-gold)]/50 transition-all shadow-sm hover:shadow-lg hover:shadow-[var(--if-gold)]/10">
                  <Image
                    src={item.src}
                    alt={item.title.en}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, 33vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <p className="absolute bottom-2 left-3 right-3 text-white text-xs font-semibold leading-snug">
                    {item.title[lang]}
                  </p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVENTS ── */}
      <section id="events" className="py-20 px-4 scroll-mt-20">
        <div className="mx-auto max-w-4xl">
          <BlurFade delay={0.1}>
            <h2 className="font-display text-4xl font-bold text-[var(--if-green)] text-center mb-12">
              {t("section_events")}
            </h2>
          </BlurFade>
          <div className="space-y-4">
            {events.map((ev, i) => (
              <BlurFade key={i} delay={0.07 * i}>
                <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-[var(--if-gold)]/15 hover:border-[var(--if-gold)]/40 transition-colors">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[var(--if-green)] flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-[var(--if-gold-light)]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-[var(--if-green)]">{ev.title[lang]}</h4>
                    <p className="text-sm text-[var(--if-text-muted)]">
                      {ev.date} · {ev.time} · {ev.venue[lang]}
                    </p>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* ── VOLUNTEER ── */}
      <section id="volunteer" className="py-20 px-4 scroll-mt-20">
        <div className="mx-auto max-w-4xl">
          <BlurFade delay={0.1}>
            <h2 className="font-display text-4xl font-bold text-[var(--if-green)] text-center mb-12">
              {t("section_volunteer")}
            </h2>
          </BlurFade>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {[
              { role: { te: "యూత్ వింగ్ (18–35)", en: "Youth Wing (18–35)" }, seats: 0, desc: { te: "నాయకత్వ శిక్షణ", en: "Leadership training" } },
              { role: { te: "మహిళా వింగ్", en: "Women's Wing" }, seats: 20, desc: { te: "20 సీట్లు అందుబాటులో ఉన్నాయి", en: "20 seats available" } },
              { role: { te: "ఆరోగ్య సేవ", en: "Health Service" }, seats: 0, desc: { te: "వైద్య నిపుణులు అవసరం", en: "Medical professionals needed" } },
              { role: { te: "విద్యా వాలంటీర్", en: "Educational Volunteer" }, seats: 0, desc: { te: "ఉపాధ్యాయులు ఆహ్వానించబడ్డారు", en: "Teachers welcome" } },
            ].map(({ role, seats, desc }, i) => (
              <BlurFade key={i} delay={0.07 * i}>
                <div className="p-5 rounded-2xl bg-[var(--if-cream-light)] border border-[var(--if-gold)]/15 hover:border-[var(--if-gold)]/40 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-[var(--if-green)]">{role[lang]}</h4>
                    {seats > 0 && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--if-gold)]/10 text-[var(--if-gold)] font-semibold border border-[var(--if-gold)]/20">
                        {seats} seats
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[var(--if-text-muted)] mt-1">{desc[lang]}</p>
                </div>
              </BlurFade>
            ))}
          </div>
          <BlurFade delay={0.4} className="text-center">
            <ShimmerButton
              shimmerColor="#c8922a"
              background="#0d3b1e"
              className="text-[var(--if-gold-light)] font-semibold"
            >
              <Users className="h-4 w-4 mr-2 inline" />
              {t("join_us")}
            </ShimmerButton>
          </BlurFade>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-20 px-4 bg-[var(--if-green)] scroll-mt-20">
        <div className="mx-auto max-w-4xl">
          <BlurFade delay={0.1}>
            <h2 className="font-display text-4xl font-bold text-[var(--if-gold-light)] text-center mb-12">
              {t("section_contact")}
            </h2>
          </BlurFade>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {[
              { icon: Phone, label: lang === "te" ? "ఫోన్" : "Phone", value: "+91 90329 06677", href: "tel:+919032906677" },
              { icon: Mail,  label: lang === "te" ? "ఇమెయిల్" : "Email", value: "info@islamicfront.in", href: "mailto:info@islamicfront.in" },
              { icon: MapPin,label: lang === "te" ? "చిరునామా" : "Address", value: "Mangalagiri, Guntur District, A.P. 522503", href: "#" },
            ].map(({ icon: Icon, label, value, href }) => (
              <BlurFade key={label} delay={0.1}>
                <a
                  href={href}
                  className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-[var(--if-gold)]/20 hover:bg-white/10 transition-colors"
                >
                  <Icon className="h-7 w-7 text-[var(--if-gold)] mb-3" />
                  <span className="text-xs text-[var(--if-gold-pale)]/50 uppercase tracking-widest mb-1">{label}</span>
                  <span className="text-sm text-[var(--if-gold-pale)]/90">{value}</span>
                </a>
              </BlurFade>
            ))}
          </div>
          <BlurFade delay={0.3}>
            <p className="text-center text-sm text-[var(--if-gold-pale)]/50">
              {lang === "te" ? "సోమ–శని 9am–6pm · ఆదివారం 10am–2pm · అత్యవసర అంత్యక్రియల సహాయం 24/7" : "Mon–Sat 9am–6pm · Sun 10am–2pm · Emergency funeral aid 24/7"}
            </p>
          </BlurFade>
        </div>
      </section>

      {/* ── KNOWLEDGE CENTER PROMO ── */}
      <section className="py-20 px-4 scroll-mt-20">
        <div className="mx-auto max-w-7xl">
          <BlurFade delay={0.1}>
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl font-bold text-[var(--if-green)]">{t("section_kc_promo")}</h2>
              <p className="text-[var(--if-text-muted)] mt-2">
                {lang === "te" ? "ఉచిత, బహుభాషా ఇస్లామిక్ సాధనాలు మరియు వనరులు" : "Free, multilingual Islamic tools and resources"}
              </p>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {kc_portals.map((portal, i) => (
              <BlurFade key={portal.href} delay={0.06 * i}>
                <a
                  href={portal.href}
                  className="relative overflow-hidden group flex flex-col p-6 rounded-2xl bg-[var(--if-cream-light)] border border-[var(--if-gold)]/15 hover:border-[var(--if-gold)]/50 transition-all hover:shadow-lg hover:shadow-[var(--if-gold)]/10"
                >
                  <BorderBeam size={100} duration={6} colorFrom="#c8922a" colorTo="#e8b84b" className="opacity-0 group-hover:opacity-100" />
                  <span className="font-arabic text-2xl text-[var(--if-gold)]/60 mb-3 self-end">{portal.arabic}</span>
                  <h3 className="font-semibold text-[var(--if-green)] text-lg">{portal.title}</h3>
                  <p className="text-sm text-[var(--if-text-muted)] mt-1">{portal.sub}</p>
                  <span className="mt-4 text-xs font-semibold text-[var(--if-gold)] flex items-center gap-1">
                    {lang === "te" ? "తెరవండి" : "Open"} <ChevronRight className="h-3 w-3" />
                  </span>
                </a>
              </BlurFade>
            ))}
          </div>
          <BlurFade delay={0.5} className="text-center">
            <a
              href="/knowledge-center"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[var(--if-green)] text-[var(--if-gold-light)] font-semibold hover:bg-[var(--if-green)]/90 transition-colors"
            >
              {t("open_kc")} <ChevronRight className="h-4 w-4" />
            </a>
          </BlurFade>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ── Wrapped export ── */
export function HomepageClient() {
  return (
    <I18nProvider>
      <Homepage />
    </I18nProvider>
  );
}
