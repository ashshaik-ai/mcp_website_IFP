"use client";

import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { PageShell } from "@/components/layout/PageShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { Marquee } from "@/components/ui/marquee";
import { NumberTicker } from "@/components/ui/number-ticker";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { events } from "@/content/events";
import { BorderBeam } from "@/components/ui/border-beam";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Meteors } from "@/components/ui/meteors";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { WordRotate } from "@/components/ui/word-rotate";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { MagicCard } from "@/components/ui/magic-card";
import { CheckCircle2, Clock, Circle, ChevronRight, Phone, Mail, MapPin, Calendar, Calculator, GraduationCap, Users, Building2, BookOpen, Heart, Moon } from "lucide-react";
import { ApplyActions } from "@/components/ApplyActions";

/* Bilingual copy for this file, hoisted out of the JSX so a translator
   can read and review it as one unit. */
/* This strip shipped as a hardcoded English array on a site whose default
   language is Telugu, so Telugu readers saw eleven English phrases scroll
   past under the hero. */
const marqueeItems = [
  { te: "కమ్యూనిటీ సంక్షేమం", en: "Community Welfare" },
  { te: "విద్యా సహాయం", en: "Education Support" },
  { te: "వైద్య సహాయం", en: "Medical Aid" },
  { te: "యువత కార్యక్రమాలు", en: "Youth Programs" },
  { te: "జకాత్ పంపిణీ", en: "Zakat Distribution" },
  { te: "మహిళా సాధికారత", en: "Women Empowerment" },
  { te: "వృద్ధుల సంరక్షణ", en: "Senior Care" },
  { te: "పౌర భాగస్వామ్యం", en: "Civic Engagement" },
  { te: "18 మసీదులు", en: "18 Mosques" },
  { te: "5 మదరసాలు", en: "5 Madrasas" },
  { te: "250+ కుటుంబాలకు సహాయం", en: "250+ Families Helped" },
] as const;

const copy = {
  our_mission: { te: "మా లక్ష్యం —", en: "Our mission —" },
  founder_team: { te: "వ్యవస్థాపకుడు & బృందం", en: "Founder & Team" },
  seats_label: { te: "సీట్లు", en: "seats" },
  team_hint: { te: "2023 ఎన్నికైన సభ్యులు", en: "Members elected in 2023" },
  action_plan_2023_2028: { te: "కార్యాచరణ ప్రణాళిక 2023–2028", en: "Action Plan 2023–2028" },
  n_10_point_plan_for_our: { te: "మా కమ్యూనిటీ కోసం 10-అంశాల ప్రణాళిక", en: "10-point plan for our community" },
  overall_completion: { te: "మొత్తం పురోగతి", en: "Overall completion" },
  n_4_of_10_completed: { te: "4 / 10 పూర్తయింది", en: "4 of 10 completed" },
  applicant_must_be_muslim_resident: { te: "దరఖాస్తుదారు మంగళగిరి ముస్లిం నివాసి అయి ఉండాలి", en: "Applicant must be Muslim resident of Mangalagiri" },
  family_unable_to_fund_funeral: { te: "కుటుంబం స్వంతంగా అంత్యక్రియలు నిర్వహించలేని స్థితిలో ఉండాలి", en: "Family unable to fund funeral independently" },
  aid_disbursed_directly_by_anjuman: { te: "సహాయం నేరుగా అంజుమన్ ద్వారా అందించబడుతుంది", en: "Aid disbursed directly by Anjuman" },
  no_bureaucratic_delay: { te: "ఎటువంటి అధికారిక ఆలస్యం లేదు", en: "No bureaucratic delay" },
  serving_the_most_vulnerable: { te: "అత్యంత అవసరమైన వారికి సేవ", en: "Serving the Most Vulnerable" },
  caring_for_the_deceased_is: { te: "మృతుల సంరక్షణ ఫర్జ్ కిఫాయా. మంగళగిరి స్థానికులకు మాత్రమే.", en: "Caring for the deceased is fard kifaya. Exclusively for Mangalagiri locals." },
  families_assisted: { te: "కుటుంబాలు సహాయం పొందాయి", en: "Families Assisted" },
  active_since: { te: "నుండి అమలులో ఉంది", en: "Active Since" },
  founded_by_janab_shaik_akram: { te: "జనాబ్ షేక్ అక్రమ్ స్థాపించిన ఇస్లామిక్ ఫ్రంట్, విశ్వాసం, సంక్షేమం మరియు పౌర భాగస్వామ్యం అనే మూడు స్తంభాలపై నిర్మించబడింది.", en: "Founded by Janab Shaik Akram, Islamic Front is built on three pillars: faith, welfare, and civic participation — working to build a stronger Muslim community in Mangalagiri." },
  janab_shaik_akram: { te: "జనాబ్ షేక్ అక్రమ్", en: "Janab Shaik Akram" },
  founder_islamic_front: { te: "వ్యవస్థాపకుడు · ఇస్లామిక్ ఫ్రంట్", en: "Founder · Islamic Front" },
  a_p_waqf_board_director: { te: "ఆ.ప్ర. వక్ఫ్ బోర్డు డైరెక్టర్", en: "A.P. Waqf Board Director" },
  phone: { te: "ఫోన్", en: "Phone" },
  email: { te: "ఇమెయిల్", en: "Email" },
  address: { te: "చిరునామా", en: "Address" },
  mon_sat_9am_6pm_sun: { te: "సోమ–శని 9am–6pm · ఆదివారం 10am–2pm · అత్యవసర అంత్యక్రియల సహాయం 24/7", en: "Mon–Sat 9am–6pm · Sun 10am–2pm · Emergency funeral aid 24/7" },
  free_multilingual_islamic_tools_and: { te: "ఉచిత, బహుభాషా ఇస్లామిక్ సాధనాలు మరియు వనరులు", en: "Free, multilingual Islamic tools and resources" },
  open: { te: "తెరవండి", en: "Open" },
} as const;

/* ── Data ── */
const achievements = [
  {
    title: { te: "కన్వెన్షన్ హాల్ పరివర్తన", en: "Convention Hall Transformation" },
    desc:  { te: "AC ఏర్పాటు, పూర్తి పునర్నిర్మాణం", en: "AC installation, complete remodeling" },
    evidence: [
      { te: "పూర్తి AC", en: "Full AC" },
      { te: "పూర్తి పునర్నిర్మాణం", en: "Complete Remodeling" },
      { te: "2 హాళ్లు", en: "2 Halls" },
      { te: "1,000+ కుటుంబాలు", en: "1,000+ Families" },
    ],
  },
  {
    title: { te: "అంజుమన్ ఆదాయం మెరుగుదల", en: "Improved Anjuman Revenue" },
    desc:  { te: "అద్దె వసూలు వ్యవస్థ", en: "Disciplined rent collection system" },
    evidence: [
      { te: "క్రమబద్ధ వ్యవస్థ", en: "Disciplined System" },
      { te: "2023 నుండి", en: "Since 2023" },
      { te: "120+ షాపులు", en: "120+ Shops" },
      { te: "గణనీయమైన మెరుగుదల", en: "Significant Improvement" },
    ],
  },
  {
    title: { te: "షాప్ ఆడిట్ & సబ్లీజ్ పరిష్కారం", en: "Shop Audit & Sublease Resolution" },
    desc:  { te: "₹27 లక్షల అదనపు ఆదాయం", en: "₹27 lakh additional revenue" },
    evidence: [
      { te: "120+ ఆడిట్ చేశాం", en: "120+ Audited" },
      { te: "సబ్‌లీజ్ తొలగింపు", en: "Sublease Eliminated" },
      { te: "₹27 లక్షలు అదనపు", en: "₹27L Additional" },
    ],
  },
  {
    title: { te: "అంత్యక్రియల ఆర్థిక సహాయ పథకం", en: "Funeral Financial Aid Scheme" },
    desc:  { te: "కుటుంబానికి ₹10,000", en: "₹10,000 per family" },
    evidence: [
      { te: "అమలులో ఉన్న పథకం", en: "Active Scheme" },
      { te: "250+ కుటుంబాలు", en: "250+ Families" },
      { te: "₹10,000", en: "₹10,000" },
      { te: "2023 నుండి", en: "Since 2023" },
    ],
  },
  {
    title: { te: "18 మసీదుల నిర్వహణ", en: "Managing 18 Mosques" },
    desc:  { te: "నిర్వహణ మరియు సంరక్షణ", en: "Maintenance and upkeep" },
    evidence: [
      { te: "18 మసీదులు", en: "18 Mosques" },
      { te: "5 మదర్సాలు", en: "5 Madrasas" },
      { te: "3,000+ ఓటర్లు", en: "3,000+ Voters" },
    ],
  },
  {
    title: { te: "మహిళా కుట్టు శిక్షణా కేంద్రం", en: "Women's Stitching Training Centre" },
    desc:  { te: "ఉపాధి అవకాశాలు", en: "Employment opportunities" },
    evidence: [
      { te: "కేంద్రం ఏర్పాటు", en: "Centre Established" },
      { te: "శిక్షణ కొనసాగుతోంది", en: "Training Ongoing" },
      { te: "మహిళల స్వావలంబన", en: "Women's Independence" },
    ],
  },
];

const manifesto = [
  { title: { te: "అనాథలకు అంజుమన్ షాదీ ఖానా ఉచితంగా", en: "Anjuman Shadi Khana free for orphans" }, status: "completed" },
  { title: { te: "పేద అమ్మాయిలకు జహేజ్ (వివాహ బహుమతి)", en: "Wedding gift (Jehaz) for poor girls" }, status: "in_progress" },
  { title: { te: "₹10,000 అంత్యక్రియల సహాయం", en: "₹10,000 funeral assistance" }, status: "completed" },
  { title: { te: "వార్షికంగా 10 మంది విద్యార్థులకు స్కాలర్‌షిప్", en: "Sponsor 10 students annually" }, status: "upcoming" },
  { title: { te: "టైలరింగ్ కేంద్రం + ఉచిత మెషీన్లు", en: "Tailoring centre + free machines" }, status: "in_progress" },
  { title: { te: "షాపింగ్ కాంప్లెక్స్", en: "Shopping complex" }, status: "upcoming" },
  { title: { te: "6 నెలలకు ఒకసారి వైద్య శిబిరం", en: "Medical camp every 6 months" }, status: "completed" },
  { title: { te: "స్కాలర్‌షిప్ మొత్తాలు పెంచడం", en: "Increase scholarship amounts" }, status: "in_progress" },
  { title: { te: "ఉచిత కంప్యూటర్ శిక్షణ కేంద్రం", en: "Free computer training centre" }, status: "in_progress" },
  { title: { te: "ఇమామ్/ముయజ్జిన్ జీతాలు పెంచడం", en: "Increase Imam/Muezzin salaries" }, status: "completed" },
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

/* These were English-only, so the whole promo grid stayed untranslated on the
   Telugu default. Hadith is listed here too -- the Knowledge Center carries
   seven portals and the homepage was still advertising six. */
const kc_portals = [
  { title: { te: "అరబిక్ నేర్చుకోండి", en: "Learn Arabic" }, sub: { te: "6 స్థాయిలు · అక్షరాల నుండి పఠనం వరకు", en: "6 Levels · Letters to reading" }, href: "/knowledge-center/learn-arabic", arabic: "تعلُّم العربية" },
  { title: { te: "ఉర్దూ నేర్చుకోండి", en: "Learn Urdu" }, sub: { te: "6 స్థాయిలు · లిపి నుండి పఠనం వరకు", en: "6 Levels · Script to reading" }, href: "/knowledge-center/learn-urdu", arabic: "اردو سیکھیں" },
  { title: { te: "ఖురాన్ నేర్చుకోండి", en: "Learn Quran" }, sub: { te: "4 మాడ్యూల్స్ · తజ్వీద్ + తఫ్సీర్", en: "4 Modules · Tajweed + Tafseer" }, href: "/knowledge-center/learn-quran", arabic: "تعلُّم القرآن" },
  { title: { te: "నమాజ్ నేర్చుకోండి", en: "Learn Salah" }, sub: { te: "6 మాడ్యూల్స్ · వుజూ నుండి దుఆల వరకు", en: "6 Modules · Wudu to Duas" }, href: "/knowledge-center/learn-salah", arabic: "تعلُّم الصلاة" },
  { title: { te: "హదీస్", en: "Hadith" }, sub: { te: "6 గ్రంథాలు · 12 ముఖ్య హదీసులు", en: "6 books · 12 essential hadith" }, href: "/knowledge-center/hadith", arabic: "الحديث الشريف" },
  { title: { te: "సీరత్", en: "Seerah" }, sub: { te: "10 దశల్లో ప్రవక్త జీవిత చరిత్ర", en: "10-Stage Prophet's biography" }, href: "/knowledge-center/seerah", arabic: "السيرة النبوية" },
  { title: { te: "ఇస్లామిక్ చరిత్ర", en: "Islamic History" }, sub: { te: "6 యుగాలు · రాషిదూన్ నుండి ఆధునికం", en: "6 Eras · Rashidun to modern" }, href: "/knowledge-center/islamic-history", arabic: "التاريخ الإسلامي" },
  { title: { te: "పిల్లల ఇస్లాం", en: "Kids Islam" }, sub: { te: "5–15 ఏళ్లు · 6 అభ్యాస దశలు", en: "Ages 5–15 · 6 learning stages" }, href: "/knowledge-center/kids-islam", arabic: "الإسلام للأطفال" },
];

const leaders = [
  { name: "Janab Shaik Akram", te: "జనాబ్ షేక్ అక్రమ్", role: { te: "వ్యవస్థాపకుడు", en: "Founder" }, img: "/assets/founder/shaik-akram-cutout.webp" },
  { name: "Yaseen Shaik",      te: "యాసీన్ షేక్",       role: { te: "సభ్యుడు — 2023", en: "Member — 2023" }, img: "/assets/candidates/1.candidate.jpg" },
  { name: "Abdul Aleem",       te: "అబ్దుల్ అలీమ్",     role: { te: "సభ్యుడు — 2023", en: "Member — 2023" }, img: "/assets/candidates/2.candidate.jpg" },
  { name: "Akbar Basha Shaik", te: "అక్బర్ బాషా షేక్",  role: { te: "సభ్యుడు — 2023", en: "Member — 2023" }, img: "/assets/candidates/3.candidate.jpg" },
  { name: "Hazrat Ali Shaik",  te: "హజ్రత్ అలీ షేక్",   role: { te: "సభ్యుడు — 2023", en: "Member — 2023" }, img: "/assets/candidates/4.candidate.jpg" },
  { name: "Abdul Saleem",      te: "అబ్దుల్ సలీమ్",     role: { te: "సభ్యుడు — 2023", en: "Member — 2023" }, img: "/assets/candidates/5.candidate.jpg" },
  { name: "Hanifsha Shaik",    te: "హనీఫ్‌షా షేక్",     role: { te: "సభ్యుడు — 2023", en: "Member — 2023" }, img: "/assets/candidates/6.candidate.jpg" },
  { name: "Hafeez Shaik",      te: "హఫీజ్ షేక్",        role: { te: "సభ్యుడు — 2023", en: "Member — 2023" }, img: "/assets/candidates/7.candidate.jpg" },
];

/* The founder heads the list and is presented on his own; the rest are the
   2023 members and ride the marquee together. */
const [founder, ...members] = leaders;


/* ── Status helpers ── */
function StatusIcon({ status }: { status: string }) {
  if (status === "completed") return <CheckCircle2 className="h-5 w-5 text-emerald-700 flex-shrink-0" />;
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
    <PageShell>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[var(--if-green)] text-[var(--if-gold-pale)] py-24 md:py-32 px-4">
        {/* The organisation's seal, watermarked. This was a tiled circle
            pattern -- decoration that could have belonged to any site. */}
        <div className="if-emblem if-emblem-hero" aria-hidden="true" />
        <Meteors number={9} minDuration={5} maxDuration={12} className="text-[var(--if-gold)]/45" />

        <div className="relative mx-auto max-w-5xl text-center flex flex-col items-center gap-6">
          {/* Above the fold these rise into place without fading. The h1 is the
              LCP element, and any opacity-0 start delays the paint Lighthouse
              measures by the full length of the animation. */}
          <span className="if-rise inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--if-gold)]/40 text-sm font-medium">
            <Moon aria-hidden="true" className="h-3.5 w-3.5 text-[var(--if-gold-light)]" />
            <span className="text-sm font-medium text-[var(--if-gold-light)]">{t("hero_badge")}</span>
          </span>

          <h1 className="if-rise font-display text-5xl md:text-7xl font-bold text-[var(--if-gold-light)] leading-tight">
            {t("hero_title")}
          </h1>

          <p className="if-rise text-[var(--if-gold-pale)]/80 max-w-xl text-lg md:text-xl leading-relaxed">
            {t("hero_sub")}
          </p>

          <BlurFade delay={0.18}>
            <div className="flex items-center justify-center gap-2 text-sm">
              <span className="text-[var(--if-gold-pale)]/80">{copy.our_mission[lang]}</span>
              {lang === "te" ? (
                <WordRotate
                  words={["కమ్యూనిటీ సంక్షేమం", "నాణ్యమైన విద్య", "పౌర భాగస్వామ్యం", "ముస్లిం ఐక్యత"]}
                  className="text-[var(--if-gold-light)] font-semibold text-sm m-0 leading-relaxed"
                  duration={2400}
                />
              ) : (
                <WordRotate
                  words={["Community Welfare", "Quality Education", "Civic Participation", "Muslim Unity"]}
                  className="text-[var(--if-gold-light)] font-semibold text-sm m-0 leading-relaxed"
                  duration={2400}
                />
              )}
            </div>
          </BlurFade>

          {/* Stats chips */}
          <BlurFade delay={0.2} className="flex gap-4 flex-wrap justify-center">
            <div className="if-panel flex flex-col items-center px-6 py-3 rounded-2xl min-w-[140px]">
              <span className="font-display text-3xl font-bold text-[var(--if-gold-light)] flex items-baseline gap-0.5">
                <NumberTicker value={7} className="font-display text-3xl font-bold text-[var(--if-gold-light)]" />/9
              </span>
              <span className="text-xs text-[var(--if-gold-pale)]/70 mt-1">{t("hero_seats")}</span>
            </div>
            <div className="if-panel flex flex-col items-center px-6 py-3 rounded-2xl min-w-[140px]">
              <span className="font-display text-3xl font-bold text-[var(--if-gold-light)] flex items-baseline gap-0.5">
                <NumberTicker value={15} className="font-display text-3xl font-bold text-[var(--if-gold-light)]" />+
              </span>
              <span className="text-xs text-[var(--if-gold-pale)]/70 mt-1">{t("hero_years")}</span>
            </div>
          </BlurFade>

          <BlurFade delay={0.25} className="flex gap-3 flex-wrap justify-center">
            {/* ShimmerButton composites its spark gradient behind the backdrop,
                so the background has to be opaque. This passed a 15%-alpha gold
                and the spark bled through as a blotch across the lower right.
                Solid gold also gives the hero a primary the eye lands on first. */}
            <ShimmerButton
              href="#achievements"
              shimmerColor="#fff6df"
              background="var(--if-gold-light)"
              className="border-transparent text-[var(--if-green)] font-semibold shadow-[0_8px_24px_-8px_rgba(200,146,42,0.7)] hover:shadow-[0_10px_30px_-8px_rgba(200,146,42,0.9)]"
            >
              {t("hero_cta")}
            </ShimmerButton>
            <Link
              href="/knowledge-center"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--if-gold-pale)]/30 text-[var(--if-gold-pale)]/80 hover:bg-white/5 transition-colors text-sm font-medium"
            >
              {t("nav_kc")} <ChevronRight className="h-4 w-4" />
            </Link>
          </BlurFade>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      {/* aria-hidden: Marquee repeats its children to loop, so every item was
          announced four times. A decorative ticker; the sections it names are
          all reachable from the navigation. */}
      <div aria-hidden="true" className="border-y border-[var(--if-gold)]/20 bg-[var(--if-cream-light)] py-3 overflow-hidden">
        {/* No pauseOnHover: the strip stopped dead whenever the pointer crossed
            it, which on a laptop is most of the time it is on screen. */}
        <Marquee className="[--duration:30s] [--gap:1rem]">
          {marqueeItems.map((item) => (
            <span key={item.en} className="mx-4 flex items-center gap-2 text-sm text-[var(--if-text-muted)] font-medium whitespace-nowrap">
              <span className="text-[var(--if-gold-ink)]" aria-hidden="true">✦</span> {item[lang]}
            </span>
          ))}
        </Marquee>
      </div>

      {/* ── VICTORY ── */}
      <section id="victory" className="if-defer py-20 px-4 scroll-mt-20">
        <div className="mx-auto max-w-7xl">
          <BlurFade delay={0.1}>
            <div className="text-center mb-12">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--if-gold-ink)]">
                {t("section_victory_tag")}
              </span>
              <h2 className="if-heading font-display text-3xl sm:text-4xl font-bold text-[var(--if-green)] mt-3 mb-3">
                {t("section_victory_title")}
              </h2>
              <p className="text-[var(--if-text-muted)] max-w-xl mx-auto">
                {t("section_victory_desc")}
              </p>
              <p className="text-xs text-[var(--if-text-muted)] mt-2">
                {lang === "te" ? "అంజుమన్-ఎ-హిమాయతుల్ ఇస్లాం, మంగళగిరి · 522503, ఆం.ప్ర." : "Anjuman-e-Himayatul Islam, Mangalagiri · 522503, A.P."}
              </p>
            </div>
          </BlurFade>

          <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto mb-12">
            {[
              { n: "7/9", label: { te: "ఎన్నికైన వార్డ్ సీట్లు", en: "Ward Seats Won" } },
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

          {/* Leadership rail */}
          <div>
            <h3 className="text-center font-semibold text-[var(--if-green)] mb-2">
              {copy.founder_team[lang]}
            </h3>
            <p className="text-center text-sm text-[var(--if-text-muted)] mb-7">
              {copy.team_hint[lang]}
            </p>

            {/* The founder is not one of the members, so he sits still while
                they pass. Splitting them also lets his portrait be larger,
                which states the hierarchy without a label doing it. */}
            <figure className="group m-0 flex flex-col items-center mb-10">
              {/* The cutout on the site's own green, rather than the studio's
                  lime backdrop inside a gold ring. */}
              <span className="if-portrait if-founder relative block mx-auto mb-3 rounded-full overflow-hidden bg-gradient-to-b from-[var(--if-green-mid)] to-[var(--if-green)]">
                {/* The cutout starts at the crown, so object-top put his head
                    on the ring. An inner box leaves 8% of headroom. */}
                <span className="absolute inset-x-0 bottom-0 top-[8%]">
                  <Image
                    src="/assets/founder/shaik-akram-cutout.webp"
                    alt={founder.name}
                    fill
                    className="object-cover object-top"
                    sizes="(min-width: 640px) 200px, 176px"
                  />
                </span>
              </span>
              <figcaption className="text-center">
                <p className="font-display text-lg font-bold text-[var(--if-green)] leading-relaxed">
                  {lang === "te" ? founder.te : founder.name}
                </p>
                <p className="text-sm text-[var(--if-gold-ink)] mt-0.5">{founder.role[lang]}</p>
              </figcaption>
            </figure>

            {/* The members scroll on their own. Marquee renders its children
                several times over to loop seamlessly, so the whole strip is
                hidden from assistive tech and the real list follows below it,
                once, for anyone who is not looking at it. */}
            <div aria-hidden="true" className="if-fade-x -mx-4">
              <Marquee className="[--duration:45s] [--gap:1.75rem] py-1" repeat={3}>
                {members.map((m) => (
                  <figure key={m.name} className="group m-0 w-32 sm:w-36 text-center shrink-0">
                    <span className="if-portrait relative block w-32 h-32 sm:w-36 sm:h-36 mx-auto mb-3 rounded-full overflow-hidden">
                      <Image
                        src={m.img}
                        alt=""
                        fill
                        className="object-cover object-top"
                        sizes="(min-width: 640px) 144px, 128px"
                      />
                    </span>
                    <figcaption>
                      <p className="text-sm font-semibold text-[var(--if-green)] leading-relaxed text-pretty">
                        {lang === "te" ? m.te : m.name}
                      </p>
                      <p className="text-xs text-[var(--if-gold-ink)] mt-1">{m.role[lang]}</p>
                    </figcaption>
                  </figure>
                ))}
              </Marquee>
            </div>
            <ul className="sr-only">
              {members.map((m) => (
                <li key={m.name}>{`${lang === "te" ? m.te : m.name} — ${m.role[lang]}`}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Separator className="bg-[var(--if-gold)]/15" />

      {/* ── ACHIEVEMENTS ── */}
      <section id="achievements" className="if-defer py-20 px-4 bg-[var(--if-cream-light)] scroll-mt-20">
        <div className="mx-auto max-w-7xl">
          <BlurFade delay={0.1}>
            <h2 className="if-heading font-display text-3xl sm:text-4xl font-bold text-center mb-12">
              <span className="text-[var(--if-green)]">{t("section_achievements")}</span>
            </h2>
          </BlurFade>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((a, i) => (
              <BlurFade key={i} delay={0.05 * i}>
                <MagicCard
                  className="h-full rounded-2xl cursor-default"
                  gradientFrom="#c8922a"
                  gradientTo="#e8b84b"
                  gradientColor="rgba(200,146,42,0.05)"
                  gradientSize={260}
                >
                  <div className="p-6 h-full">
                    <h3 className="font-semibold text-[var(--if-green)] mb-2">{a.title[lang]}</h3>
                    <p className="text-sm text-[var(--if-text-muted)] mb-4">{a.desc[lang]}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {/* Chips that carry a figure are the evidence; the rest are
                          descriptors. Filling the quantified ones lets the number
                          land first instead of six identical rows of pills. */}
                      {a.evidence.map((e) => (
                        <span
                          key={e.en}
                          className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                            /^[₹\d]/.test(e.en)
                              ? "bg-[var(--if-gold)]/22 text-[var(--if-gold-ink)] border-[var(--if-gold)]/40 tabular-nums"
                              : "bg-[var(--if-gold)]/8 text-[var(--if-gold-ink)]/85 border-[var(--if-gold)]/18"
                          }`}
                        >
                          {e[lang]}
                        </span>
                      ))}
                    </div>
                  </div>
                </MagicCard>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* ── MANIFESTO ── */}
      <section id="manifesto" className="if-defer py-20 px-4 scroll-mt-20 overflow-hidden">
        <div className="mx-auto max-w-5xl">

          {/* Header */}
          <BlurFade delay={0.05}>
            <div className="text-center mb-8">
              <span className="text-xs font-bold tracking-[0.22em] uppercase text-[var(--if-gold-ink)]">
                {copy.action_plan_2023_2028[lang]}
              </span>
              <h2 className="if-heading font-display text-3xl sm:text-4xl font-bold mt-2">
                <span className="text-[var(--if-green)]">{t("section_manifesto")}</span>
              </h2>
              <p className="text-[var(--if-text-muted)] mt-2 text-sm">
                {copy.n_10_point_plan_for_our[lang]}
              </p>
            </div>
          </BlurFade>

          {/* Premium progress card */}
          <BlurFade delay={0.1}>
            <div className="relative overflow-hidden mb-8 rounded-2xl bg-[var(--if-green)] p-6 md:p-8">
              <BorderBeam size={300} duration={14} colorFrom="#c8922a" colorTo="#e8b84b" />
              <div className="absolute inset-0 opacity-[0.04]"
                style={{ backgroundImage: "radial-gradient(ellipse at 20% 50%, #e8b84b 0%, transparent 65%), radial-gradient(ellipse at 80% 50%, #c8922a 0%, transparent 65%)" }}
              />
              <div className="relative">
                {/* Stat counters */}
                <div className="grid grid-cols-3 gap-2 text-center mb-6">
                  {[
                    { value: 4, label: t("completed"),  color: "text-emerald-400", ring: "border-emerald-500/30 bg-emerald-900/20" },
                    { value: 4, label: t("in_progress"), color: "text-amber-400",   ring: "border-amber-500/30 bg-amber-900/20" },
                    { value: 2, label: t("upcoming"),    color: "text-[var(--if-gold-pale)]/80", ring: "border-white/10 bg-white/5" },
                  ].map(({ value, label, color, ring }) => (
                    <div key={label} className={`rounded-xl border ${ring} py-4 px-2`}>
                      <div className={`font-display text-3xl md:text-4xl font-bold ${color}`}>
                        <NumberTicker value={value} className={`font-display text-3xl md:text-4xl font-bold ${color}`} />
                      </div>
                      <div className="text-xs text-[var(--if-gold-pale)]/80 mt-1 leading-tight">{label}</div>
                    </div>
                  ))}
                </div>

                {/* Animated progress bar */}
                <div>
                  <div className="flex justify-between text-xs text-[var(--if-gold-pale)]/80 mb-2">
                    <span>{copy.overall_completion[lang]}</span>
                    <span className="text-[var(--if-gold-light)] font-semibold">40%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="if-bar-grow h-full w-[40%] rounded-full"
                      style={{ background: "linear-gradient(90deg, #10b981 0%, #c8922a 70%, #e8b84b 100%)" }}
                    />
                  </div>
                  <p className="text-xs text-[var(--if-gold-pale)]/80 mt-1.5 text-right">
                    {copy.n_4_of_10_completed[lang]}
                  </p>
                </div>
              </div>
            </div>
          </BlurFade>

          {/* The rows carried status four times over: a left accent strip, a
              pastel gradient fill, the icon and the pill. The strip is a dated
              side-tab tell and the fills turned ten rows into a pastel ladder.
              Status now lives in the icon and the pill; the surface only varies
              enough to push what is still in progress forward. */}
          <ol className="space-y-2">
            {/* BlurFade renders a div, so it has to sit inside the li -- an
                ol may only contain li directly. */}
            {manifesto.map((item, i) => (
              <li key={i}>
                <BlurFade delay={i * 0.065} className={`if-row group relative flex items-center gap-3 md:gap-4 py-4 pl-4 pr-4 rounded-xl border ${
                  item.status === "in_progress"
                    ? "bg-[var(--if-cream-light)] border-[var(--if-gold)]/35 shadow-[0_1px_2px_rgb(13_59_30/0.05)]"
                    : "bg-[var(--if-cream-light)]/60 border-[var(--if-green)]/10"
                }`}>
                  <span className="flex-shrink-0 font-display text-base font-bold text-[var(--if-gold-ink)] w-5 text-right tabular-nums">
                    {i + 1}
                  </span>

                  <StatusIcon status={item.status} />

                  <span className="flex-1 text-[var(--if-text)] font-medium leading-relaxed text-sm md:text-base text-pretty">
                    {item.title[lang]}
                  </span>

                  <span className={`flex-shrink-0 text-xs px-2.5 py-1 rounded-full border font-semibold whitespace-nowrap ${statusColor(item.status)}`}>
                    {item.status === "completed" ? t("completed") : item.status === "in_progress" ? t("in_progress") : t("upcoming")}
                  </span>
                </BlurFade>
              </li>
            ))}
          </ol>

          {/* Premium download */}
          <BlurFade delay={0.35} className="text-center mt-10">
            <a
              /* Both language editions are built and shipped; the button
                 served the same combined file to everyone regardless. */
              href={lang === "en" ? "/manifesto-en.pdf" : "/manifesto-te.pdf"}
              download
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[var(--if-green)] text-[var(--if-gold-light)] font-semibold shadow-lg shadow-[var(--if-green)]/25 hover:shadow-xl hover:shadow-[var(--if-green)]/35 hover:-translate-y-1 transition-all duration-300"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 group-hover:translate-y-0.5 transition-transform duration-300" aria-hidden="true">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span>{t("download_manifesto")}</span>
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </BlurFade>
        </div>
      </section>

      {/* ── SCHEMES ── */}
      <section id="schemes" className="if-defer py-20 px-4 bg-[var(--if-green)] scroll-mt-20">
        <div className="mx-auto max-w-5xl">
          <BlurFade delay={0.1}>
            <h2 className="if-heading font-display text-3xl sm:text-4xl font-bold text-[var(--if-gold-light)] text-center mb-12">
              {t("section_schemes")}
            </h2>
          </BlurFade>
          {/* items-start left the short right column floating with a quarter of
              the section height as empty ground beneath it. Both columns stretch
              now, and the statement card takes up the slack. */}
          <div className="grid md:grid-cols-2 gap-8">
            <BlurFade delay={0.15} direction="left">
              <div className="if-panel rounded-2xl p-8 h-full">
                <h3 className="font-display text-xl text-[var(--if-gold-light)] font-bold mb-2">
                  {t("scheme_title")}
                </h3>
                <div className="font-display text-6xl font-bold my-4">
                  <AnimatedGradientText colorFrom="#c8922a" colorTo="#e8b84b" speed={0.4} className="font-display text-6xl font-bold">
                    {t("scheme_amount")}
                  </AnimatedGradientText>
                </div>
                <p className="text-[var(--if-gold-pale)]/70 text-sm mb-6">{t("scheme_sub")}</p>
                <p className="text-[var(--if-gold-pale)]/80 text-sm mb-6">{t("scheme_desc")}</p>
                <ul className="space-y-3">
                  {[
                    copy.applicant_must_be_muslim_resident[lang],
                    copy.family_unable_to_fund_funeral[lang],
                    copy.aid_disbursed_directly_by_anjuman[lang],
                    copy.no_bureaucratic_delay[lang],
                  ].map((c) => (
                    <li key={c} className="flex items-start gap-3 text-sm text-[var(--if-gold-pale)]/80">
                      <CheckCircle2 className="h-4 w-4 text-[var(--if-gold-light)] flex-shrink-0 mt-0.5" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </BlurFade>
            <BlurFade delay={0.2} direction="right">
              <div className="flex flex-col gap-6 h-full">
                <div className="if-panel rounded-2xl p-8 flex-1 flex flex-col justify-center">
                  <h3 className="font-display text-2xl text-[var(--if-gold-light)] font-bold mb-4 text-balance">
                    {copy.serving_the_most_vulnerable[lang]}
                  </h3>
                  <p className="text-base text-[var(--if-gold-pale)]/75 leading-relaxed text-pretty">
                    {copy.caring_for_the_deceased_is[lang]}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="if-panel rounded-xl p-5 text-center">
                    <div className="font-display text-3xl font-bold text-[var(--if-gold-light)]">250+</div>
                    <div className="text-xs text-[var(--if-gold-pale)]/80 mt-1">
                      {copy.families_assisted[lang]}
                    </div>
                  </div>
                  <div className="if-panel rounded-xl p-5 text-center">
                    <div className="font-display text-3xl font-bold text-[var(--if-gold-light)]">2023</div>
                    <div className="text-xs text-[var(--if-gold-pale)]/80 mt-1">
                      {copy.active_since[lang]}
                    </div>
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>

          {/* The scheme described itself and stopped. There is no form to post
              to on a static site, but there is a number that answers. */}
          <BlurFade delay={0.25}>
            <div className="mt-10 rounded-2xl border border-[var(--if-gold)]/20 bg-[var(--if-green-mid)]/25 p-6 sm:p-8">
              <p className="font-display text-lg font-bold text-[var(--if-gold-light)] text-balance">
                {lang === "te" ? "సహాయం కావాలా? నేరుగా మమ్మల్ని సంప్రదించండి." : "Need this help? Reach us directly."}
              </p>
              <p className="mt-1 mb-5 max-w-[60ch] text-sm text-[var(--if-gold-pale)]/75 text-pretty">
                {lang === "te"
                  ? "దరఖాస్తు ఫారం లేదు. ఫోన్ చేయండి లేదా వాట్సాప్‌లో సందేశం పంపండి — అంజుమన్ నేరుగా స్పందిస్తుంది."
                  : "There is no application form. Call or send a WhatsApp message and the Anjuman responds directly."}
              </p>
              <ApplyActions topic={{ te: "అంత్యక్రియల సహాయ పథకం", en: "the funeral aid programme" }} />
            </div>
          </BlurFade>
        </div>
      </section>

      {/* ── INFRASTRUCTURE ── */}
      <section className="if-defer py-20 px-4 scroll-mt-20">
        <div className="mx-auto max-w-5xl">
          <BlurFade delay={0.1}>
            <h2 className="if-heading font-display text-3xl sm:text-4xl font-bold text-[var(--if-green)] text-center mb-12">
              {t("section_infra")}
            </h2>
          </BlurFade>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
            {infra.map(({ icon: Icon, count, label }, i) => (
              <BlurFade key={i} delay={0.08 * i}>
                <div className="relative overflow-hidden text-center p-6 rounded-2xl bg-[var(--if-cream-light)] border border-[var(--if-gold)]/20 hover:border-[var(--if-gold)]/40 transition-colors group">
                  <BorderBeam size={60} duration={5} colorFrom="#c8922a" colorTo="#e8b84b" className="opacity-0 group-hover:opacity-100" />
                  <Icon className="h-7 w-7 mx-auto mb-3 text-[var(--if-gold-ink)]" />
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
      <section id="about" className="if-defer py-20 px-4 bg-[var(--if-cream-light)] scroll-mt-20">
        <div className="mx-auto max-w-5xl grid md:grid-cols-2 gap-12 items-center">
          <BlurFade delay={0.1} direction="left">
            <div>
              <AnimatedShinyText shimmerWidth={120} className="text-xs font-bold tracking-[0.2em] uppercase !text-[var(--if-gold-ink)]">
                {lang === "te" ? "స్థాపన 26-08-2011" : "Est. 26-08-2011"}
              </AnimatedShinyText>
              <h2 className="if-heading if-heading-left font-display text-3xl sm:text-4xl font-bold text-[var(--if-green)] mt-3 mb-4">
                {t("section_about")}
              </h2>
              <p className="text-[var(--if-text-muted)] mb-6 leading-relaxed">
                {copy.founded_by_janab_shaik_akram[lang]}
              </p>
              <ul className="space-y-4">
                {/* year was a bare string, so three of the four rows read English
                    down the left rail of an otherwise Telugu timeline. */}
                {[
                  { year: { te: "2011", en: "2011" }, event: { te: "ఇస్లామిక్ ఫ్రంట్ స్థాపన", en: "Islamic Front established" } },
                  { year: { te: "కొనసాగుతోంది", en: "Ongoing" }, event: { te: "ఆ.ప్ర. వక్ఫ్ బోర్డు డైరెక్టర్‌గా సేవలు", en: "Serves as A.P. Waqf Board Director" } },
                  { year: { te: "జూలై 2023", en: "July 2023" }, event: { te: "7/9 సీట్లతో చారిత్రాత్మక విజయం", en: "Landslide victory (7/9 seats)" } },
                  { year: { te: "2023 – ఇప్పటివరకు", en: "2023–Now" }, event: { te: "కన్వెన్షన్ అప్‌గ్రేడ్, అంత్యక్రియల సహాయం, అద్దె సంస్కరణలు", en: "Convention upgrades, funeral aid, rent reforms, stitching centre" } },
                ].map(({ year, event }) => (
                  <li key={year.en} className="flex gap-4">
                    <span className="text-xs font-bold text-[var(--if-gold-ink)] min-w-[104px] pt-0.5">{year[lang]}</span>
                    <span className="text-sm text-[var(--if-text)]">{event[lang]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </BlurFade>
          <BlurFade delay={0.2} direction="right">
            <div className="relative overflow-hidden rounded-2xl bg-[var(--if-green)] p-8 text-center text-[var(--if-gold-pale)]">
              <BorderBeam size={200} duration={10} colorFrom="#c8922a" colorTo="#e8b84b" />
              {/* The same seal, sized to the card. The founder's photograph was
                  taken in front of it, and the crop that makes him a portrait
                  cuts it out; this puts it back behind him. */}
              {/* The founder's studio portrait, cut out, standing in front of
                  the seal — the emblem he was photographed against at the
                  podium. The shirt dissolves into the card so it reads as a
                  figure rising from the mark rather than a sticker on it. */}
              <div className="relative w-60 h-60 mx-auto mb-2">
                <div className="if-emblem if-emblem-card" aria-hidden="true" />
                <Image
                  src="/assets/founder/shaik-akram-cutout.webp"
                  alt="జనాబ్ షేక్ అక్రమ్"
                  fill
                  className="if-cutout object-contain object-bottom"
                  sizes="240px"
                  loading="lazy"
                />
              </div>
              <h3 className="font-display text-xl text-[var(--if-gold-light)] font-bold">
                {copy.janab_shaik_akram[lang]}
              </h3>
              <p className="text-sm text-[var(--if-gold-pale)]/70 mt-1">
                {copy.founder_islamic_front[lang]}
              </p>
              <p className="text-sm text-[var(--if-gold-pale)]/80 mt-0.5">
                {copy.a_p_waqf_board_director[lang]}
              </p>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* ── STORIES ── */}
      <section className="if-defer py-20 px-4 scroll-mt-20">
        <div className="mx-auto max-w-7xl">
          <BlurFade delay={0.1}>
            <h2 className="if-heading font-display text-3xl sm:text-4xl font-bold text-[var(--if-green)] text-center mb-12">
              {t("section_stories")}
            </h2>
          </BlurFade>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stories.map((s, i) => (
              <BlurFade key={i} delay={0.08 * i}>
                <div className="bg-[var(--if-cream-light)] rounded-2xl border border-[var(--if-gold)]/20 p-6 hover:border-[var(--if-gold)]/40 transition-colors h-full">
                  <div className="w-10 h-10 rounded-full bg-[var(--if-green)] flex items-center justify-center text-[var(--if-gold-light)] font-bold mb-3">
                    {s.name[0]}
                  </div>
                  <h3 className="font-semibold text-[var(--if-green)]">{s.name}</h3>
                  <span className="text-xs text-[var(--if-gold-ink)] font-medium">{s.year} · {s.category[lang]}</span>
                  <p className="text-sm text-[var(--if-text-muted)] mt-2">{s.desc[lang]}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* The gallery is gone. Its nine images were generated, not taken:
          a Western ballroom, an Ottoman mosque under scaffolding, a scholarship
          handshake under a "St. Augustine School" banner. Fabricated evidence of
          work done is the one thing a political organisation must never publish.
          Reinstate the section when there are real photographs. */}
      {/* ── EVENTS ── */}
      <section id="events" className="if-defer py-20 px-4 scroll-mt-20">
        <div className="mx-auto max-w-5xl">
          <BlurFade delay={0.1}>
            <h2 className="if-heading font-display text-3xl sm:text-4xl font-bold text-[var(--if-green)] text-center mb-12">
              {t("section_events")}
            </h2>
          </BlurFade>
          <div className="space-y-4">
            {events.map((ev, i) => (
              <BlurFade key={i} delay={0.07 * i}>
                {/* Title, venue and date were one run-on line down the left, which
                    left the right half of every row empty. The date is the thing
                    a reader scans for, so it gets its own column. */}
                <div className="if-row flex items-center gap-4 p-5 bg-[var(--if-cream-light)] rounded-2xl border border-[var(--if-gold)]/20">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[var(--if-green)] flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-[var(--if-gold-light)]" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[var(--if-green)] text-pretty flex items-center gap-2 flex-wrap">
                      {ev.title[lang]}
                      {ev.repeats && (
                        <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--if-gold)]/12 text-[var(--if-gold-ink)] border border-[var(--if-gold)]/20">
                          {ev.repeats[lang]}
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-[var(--if-text-muted)]">{ev.venue[lang]}</p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <div className="font-semibold text-sm text-[var(--if-gold-ink)]">{ev.date[lang]}</div>
                    <div className="text-xs text-[var(--if-text-muted)] mt-0.5">{ev.time[lang]}</div>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>

          <BlurFade delay={0.3}>
            <div className="mt-8 flex flex-col items-center gap-3 text-center">
              <p className="text-sm text-[var(--if-text-mid)] text-pretty">
                {lang === "te"
                  ? "ఏదైనా కార్యక్రమంలో పాల్గొనాలనుకుంటున్నారా, లేదా వివరాలు కావాలా?"
                  : "Want to take part in one of these, or need the details?"}
              </p>
              <ApplyActions
                tone="light"
                topic={{ te: "రాబోయే కార్యక్రమం", en: "an upcoming event" }}
                className="justify-center"
              />
            </div>
          </BlurFade>
        </div>
      </section>

      {/* ── VOLUNTEER ── */}
      <section id="volunteer" className="if-defer py-20 px-4 scroll-mt-20">
        <div className="mx-auto max-w-5xl">
          <BlurFade delay={0.1}>
            <h2 className="if-heading font-display text-3xl sm:text-4xl font-bold text-[var(--if-green)] text-center mb-12">
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
                <div className="p-5 rounded-2xl bg-[var(--if-cream-light)] border border-[var(--if-gold)]/20 hover:border-[var(--if-gold)]/40 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-[var(--if-green)]">{role[lang]}</h3>
                    {seats > 0 && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--if-gold)]/10 text-[var(--if-green)] font-semibold border border-[var(--if-gold)]/20">
                        {seats} {copy.seats_label[lang]}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[var(--if-text-muted)] mt-1">{desc[lang]}</p>
                </div>
              </BlurFade>
            ))}
          </div>
          <BlurFade delay={0.4} className="flex justify-center">
            <ShimmerButton
              href="#contact"
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
      <section id="contact" className="if-defer py-20 px-4 bg-[var(--if-green)] scroll-mt-20">
        <div className="mx-auto max-w-5xl">
          <BlurFade delay={0.1}>
            <h2 className="if-heading font-display text-3xl sm:text-4xl font-bold text-[var(--if-gold-light)] text-center mb-12">
              {t("section_contact")}
            </h2>
          </BlurFade>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {[
              { icon: Phone, label: copy.phone[lang], value: "+91 90329 06677", href: "tel:+919032906677" },
              { icon: Mail,  label: copy.email[lang], value: "islamicfrontmangalagiri@gmail.com", href: "mailto:islamicfrontmangalagiri@gmail.com" },
              // No href: an address is not a destination. Rendered as plain text
              // rather than an anchor that looks clickable and does nothing.
              { icon: MapPin,label: copy.address[lang], value: lang === "te" ? "మంగళగిరి, గుంటూరు జిల్లా, ఆం.ప్ర. 522503" : "Mangalagiri, Guntur District, A.P. 522503" },
            ].map(({ icon: Icon, label, value, href }) => {
              const inner = (
                <>
                  <Icon aria-hidden="true" className="h-7 w-7 text-[var(--if-gold-light)] mb-3" />
                  <span className="text-xs text-[var(--if-gold-pale)]/80 uppercase tracking-widest mb-1">{label}</span>
                  <span className="text-sm text-[var(--if-gold-pale)]/90">{value}</span>
                </>
              );
              const base = "if-panel flex flex-col items-center text-center p-6 rounded-2xl h-full";
              return (
                <BlurFade key={label} delay={0.1}>
                  {href ? (
                    <a href={href} className={base}>{inner}</a>
                  ) : (
                    <div className={base}>{inner}</div>
                  )}
                </BlurFade>
              );
            })}
          </div>
          <BlurFade delay={0.3}>
            <p className="text-center text-sm text-[var(--if-gold-pale)]/80">
              {copy.mon_sat_9am_6pm_sun[lang]}
            </p>
          </BlurFade>
        </div>
      </section>

      {/* ── KNOWLEDGE CENTER PROMO ── */}
      {/* Not deferred: it sits directly above the footer. */}
      <section className="py-20 px-4 scroll-mt-20">
        <div className="mx-auto max-w-7xl">
          <BlurFade delay={0.1}>
            <div className="text-center mb-12">
              <h2 className="if-heading font-display text-3xl sm:text-4xl font-bold">
                <span className="text-[var(--if-green)]">{t("section_kc_promo")}</span>
              </h2>
              <p className="text-[var(--if-text-muted)] mt-2">
                {copy.free_multilingual_islamic_tools_and[lang]}
              </p>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {kc_portals.map((portal, i) => (
              <BlurFade key={portal.href} delay={0.06 * i}>
                <MagicCard
                  className="h-full rounded-2xl cursor-pointer group"
                  gradientFrom="#c8922a"
                  gradientTo="#e8b84b"
                  gradientColor="rgba(200,146,42,0.04)"
                  gradientSize={220}
                >
                  <a href={portal.href} className="flex flex-col p-6 h-full">
                    <span lang="ar" dir="rtl" className="font-arabic text-2xl text-[var(--if-gold-light)] mb-3 self-end">{portal.arabic}</span>
                    <h3 className="font-semibold text-[var(--if-green)] text-lg">{portal.title[lang]}</h3>
                    <p className="text-sm text-[var(--if-text-muted)] mt-1 text-pretty">{portal.sub[lang]}</p>
                    <span className="mt-4 text-xs font-semibold text-[var(--if-gold-ink)] flex items-center gap-1">
                      {copy.open[lang]} <ChevronRight className="h-3 w-3" />
                    </span>
                  </a>
                </MagicCard>
              </BlurFade>
            ))}
          </div>
          {/* Three of the site's most-used things were reachable only by
              guessing: the Zakat calculator and the prayer times live inside
              the Knowledge Center, and Student Guidance — one of the three
              top-level products — was not named anywhere on this page. */}
          <BlurFade delay={0.45}>
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {[
                {
                  href: "/student-guidance",
                  icon: GraduationCap,
                  title: { te: "విద్యార్థి మార్గదర్శి", en: "Student Guidance" },
                  sub: { te: "79 కెరీర్ మార్గాలు", en: "79 career pathways" },
                },
                {
                  href: "/knowledge-center#zakat",
                  icon: Calculator,
                  title: { te: "జకాత్ కాలిక్యులేటర్", en: "Zakat calculator" },
                  sub: { te: "నేటి బంగారం, వెండి ధరలతో", en: "With today's gold and silver rates" },
                },
                {
                  href: "/knowledge-center#prayer-times",
                  icon: Clock,
                  title: { te: "నమాజు సమయాలు", en: "Prayer times" },
                  sub: { te: "మంగళగిరి — ప్రతిరోజూ", en: "Mangalagiri — every day" },
                },
              ].map(({ href, icon: Icon, title, sub }) => (
                <Link
                  key={href}
                  href={href}
                  className="group flex items-center gap-3 rounded-2xl border border-[var(--if-gold)]/20 bg-[var(--if-cream-light)] px-5 py-4 transition-colors hover:border-[var(--if-gold)]/60"
                >
                  <Icon aria-hidden="true" className="h-5 w-5 shrink-0 text-[var(--if-gold-ink)]" />
                  <span className="min-w-0">
                    <span className="block font-semibold text-[var(--if-green)]">{title[lang]}</span>
                    <span className="block text-xs text-[var(--if-text-muted)] text-pretty">{sub[lang]}</span>
                  </span>
                  <ChevronRight
                    aria-hidden="true"
                    className="ml-auto h-4 w-4 shrink-0 text-[var(--if-gold-ink)] transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              ))}
            </div>
          </BlurFade>

          <BlurFade delay={0.5} className="text-center">
            <Link
              href="/knowledge-center"
              className="mt-10 inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[var(--if-green)] text-[var(--if-gold-light)] font-semibold hover:bg-[var(--if-green)]/90 transition-colors"
            >
              {t("open_kc")} <ChevronRight className="h-4 w-4" />
            </Link>
          </BlurFade>
        </div>
      </section>

    </PageShell>
  );
}

/* ── Wrapped export ── */
export function HomepageClient() {
  return (
    <Homepage />
  );
}
