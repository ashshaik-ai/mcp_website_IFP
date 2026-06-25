"use client";

import { useState } from "react";
import { I18nProvider, useI18n } from "@/lib/i18n/context";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { Marquee } from "@/components/ui/marquee";
import { ChevronRight, TrendingUp, Users, IndianRupee } from "lucide-react";

type Stream = "all" | "engineering" | "medical" | "commerce" | "humanities" | "creative";

const streams: { id: Stream; label: { te: string; en: string }; color: string }[] = [
  { id: "all",         label: { te: "అన్నీ",        en: "All" },          color: "bg-[var(--if-green)]" },
  { id: "engineering", label: { te: "ఇంజినీరింగ్",  en: "Engineering" },  color: "bg-blue-700" },
  { id: "medical",     label: { te: "వైద్య & ఆరోగ్య",en: "Medical & Health"},color: "bg-red-700" },
  { id: "commerce",    label: { te: "కామర్స్ & ఫైనాన్స్",en: "Commerce & Finance"},color: "bg-amber-700" },
  { id: "humanities",  label: { te: "మానవీయ శాస్త్రాలు",en: "Humanities"},   color: "bg-purple-700" },
  { id: "creative",    label: { te: "క్రియేటివ్ & డిజైన్",en: "Creative & Design"},color: "bg-teal-700" },
];

const cards = [
  { id: 1, stream: "engineering" as Stream, title: "Software Engineer", te: "సాఫ్ట్‌వేర్ ఇంజినీర్", desc: { te: "సాఫ్ట్‌వేర్ అభివృద్ధి, వెబ్ & మొబైల్ అప్లికేషన్లు", en: "Software development, web & mobile applications" }, salary: "₹5–25 LPA", demand: { te: "అధిక", en: "High" }, subjects: "Math, Physics, CS", roles: ["Developer", "Full Stack", "DevOps"] },
  { id: 2, stream: "engineering" as Stream, title: "Data Scientist", te: "డేటా సైంటిస్ట్", desc: { te: "మెషిన్ లెర్నింగ్, AI మరియు డేటా విశ్లేషణ", en: "Machine learning, AI and data analysis" }, salary: "₹8–35 LPA", demand: { te: "చాలా అధిక", en: "Very High" }, subjects: "Math, Statistics, CS", roles: ["ML Engineer", "Data Analyst", "AI Researcher"] },
  { id: 3, stream: "engineering" as Stream, title: "Civil Engineer", te: "సివిల్ ఇంజినీర్", desc: { te: "నిర్మాణాలు, రోడ్లు, వంతెనలు, నీటి వ్యవస్థలు", en: "Buildings, roads, bridges, water systems" }, salary: "₹4–18 LPA", demand: { te: "స్థిరం", en: "Stable" }, subjects: "Math, Physics", roles: ["Site Engineer", "Structural", "Urban Planner"] },
  { id: 4, stream: "engineering" as Stream, title: "Electrical Engineer", te: "ఎలక్ట్రికల్ ఇంజినీర్", desc: { te: "విద్యుత్ వ్యవస్థలు, నవీకరణీయ శక్తి, ఎలక్ట్రానిక్స్", en: "Power systems, renewable energy, electronics" }, salary: "₹4–20 LPA", demand: { te: "అధిక", en: "High" }, subjects: "Math, Physics", roles: ["Power Engineer", "Electronics", "Automation"] },
  { id: 5, stream: "engineering" as Stream, title: "Mechanical Engineer", te: "మెకానికల్ ఇంజినీర్", desc: { te: "యంత్రాలు, ఆటోమోటివ్, ఉత్పాదన పరిశ్రమ", en: "Machines, automotive, manufacturing industry" }, salary: "₹4–18 LPA", demand: { te: "స్థిరం", en: "Stable" }, subjects: "Math, Physics", roles: ["Design Engineer", "Production", "Automotive"] },
  { id: 6, stream: "engineering" as Stream, title: "Architect", te: "ఆర్కిటెక్ట్", desc: { te: "భవన రూపకల్పన, ఇంటీరియర్ & అర్బన్ ప్లానింగ్", en: "Building design, interior & urban planning" }, salary: "₹4–22 LPA", demand: { te: "పెరుగుతోంది", en: "Growing" }, subjects: "Math, Art, Physics", roles: ["Building Architect", "Interior", "Urban Designer"] },
  { id: 7, stream: "medical" as Stream, title: "Doctor (MBBS)", te: "డాక్టర్ (MBBS)", desc: { te: "వైద్యం, రోగుల చికిత్స, ప్రజారోగ్యం", en: "Medicine, patient care, public health" }, salary: "₹8–40 LPA", demand: { te: "చాలా అధిక", en: "Very High" }, subjects: "Biology, Chemistry, Physics", roles: ["General Physician", "Specialist", "Surgeon"] },
  { id: 8, stream: "medical" as Stream, title: "Pharmacist", te: "ఫార్మసిస్ట్", desc: { te: "మందుల అభివృద్ధి, పంపిణీ మరియు పరిశోధన", en: "Drug development, dispensing and research" }, salary: "₹4–15 LPA", demand: { te: "అధిక", en: "High" }, subjects: "Chemistry, Biology", roles: ["Hospital Pharmacist", "Research", "Industry"] },
  { id: 9, stream: "medical" as Stream, title: "Nurse / Paramedic", te: "నర్స్ / పారా మెడిక్", desc: { te: "రోగుల సంరక్షణ, అత్యవసర వైద్య సేవలు", en: "Patient care, emergency medical services" }, salary: "₹3–12 LPA", demand: { te: "చాలా అధిక", en: "Very High" }, subjects: "Biology, Chemistry", roles: ["Staff Nurse", "ICU Nurse", "Paramedic"] },
  { id: 10, stream: "medical" as Stream, title: "Dentist (BDS)", te: "దంత వైద్యుడు", desc: { te: "నోటి ఆరోగ్యం, దంత చికిత్స మరియు సర్జరీ", en: "Oral health, dental treatment and surgery" }, salary: "₹5–20 LPA", demand: { te: "పెరుగుతోంది", en: "Growing" }, subjects: "Biology, Chemistry", roles: ["General Dentist", "Orthodontist", "Oral Surgeon"] },
  { id: 11, stream: "commerce" as Stream, title: "Chartered Accountant", te: "చార్టర్డ్ అకౌంటెంట్", desc: { te: "ఆర్థిక నిర్వహణ, పన్ను, ఆడిటింగ్", en: "Financial management, taxation, auditing" }, salary: "₹7–30 LPA", demand: { te: "అధిక", en: "High" }, subjects: "Math, Commerce", roles: ["CA", "Tax Consultant", "CFO"] },
  { id: 12, stream: "commerce" as Stream, title: "Business Analyst", te: "బిజినెస్ అనలిస్ట్", desc: { te: "వ్యాపార వ్యూహం, మార్కెట్ పరిశోధన, MBA", en: "Business strategy, market research, MBA" }, salary: "₹6–25 LPA", demand: { te: "అధిక", en: "High" }, subjects: "Commerce, Math", roles: ["BA", "Management Consultant", "Strategy"] },
  { id: 13, stream: "commerce" as Stream, title: "Banking & Finance", te: "బ్యాంకింగ్ & ఫైనాన్స్", desc: { te: "బ్యాంకులు, పెట్టుబడులు, ఆర్థిక సేవలు", en: "Banks, investments, financial services" }, salary: "₹4–20 LPA", demand: { te: "స్థిరం", en: "Stable" }, subjects: "Commerce, Math", roles: ["Bank Manager", "Investment Banker", "Financial Advisor"] },
  { id: 14, stream: "humanities" as Stream, title: "Lawyer / Advocate", te: "న్యాయవాది", desc: { te: "న్యాయవ్యవస్థ, హక్కుల పరిరక్షణ, న్యాయం", en: "Justice system, rights protection, law" }, salary: "₹4–25 LPA", demand: { te: "స్థిరం", en: "Stable" }, subjects: "Any stream + LLB", roles: ["Civil Lawyer", "Criminal", "Corporate"] },
  { id: 15, stream: "humanities" as Stream, title: "Teacher / Professor", te: "ఉపాధ్యాయుడు / ప్రొఫెసర్", desc: { te: "విద్యాదానం, పరిశోధన, భావి తరాల నిర్మాణం", en: "Education, research, building future generations" }, salary: "₹4–18 LPA", demand: { te: "స్థిరం", en: "Stable" }, subjects: "Any stream", roles: ["School Teacher", "College Lecturer", "Researcher"] },
  { id: 16, stream: "humanities" as Stream, title: "IAS / Civil Services", te: "ఐఏఎస్ / సివిల్ సర్వీసెస్", desc: { te: "కేంద్ర & రాష్ట్ర ప్రభుత్వ పాలన, UPSC", en: "Central & state govt administration, UPSC" }, salary: "₹8–18 LPA + benefits", demand: { te: "స్పర్ధాత్మకం", en: "Competitive" }, subjects: "Any stream", roles: ["IAS", "IPS", "IFS", "State PSC"] },
  { id: 17, stream: "creative" as Stream, title: "Graphic Designer / UX", te: "గ్రాఫిక్ డిజైనర్ / UX", desc: { te: "దృశ్య కమ్యూనికేషన్, UI/UX, బ్రాండింగ్", en: "Visual communication, UI/UX design, branding" }, salary: "₹4–20 LPA", demand: { te: "పెరుగుతోంది", en: "Growing" }, subjects: "Art, Computer Skills", roles: ["Graphic Designer", "UX Designer", "Art Director"] },
  { id: 18, stream: "creative" as Stream, title: "Journalist / Media", te: "జర్నలిస్ట్ / మీడియా", desc: { te: "వార్తలు, డిజిటల్ మీడియా, కంటెంట్ సృష్టి", en: "News, digital media, content creation" }, salary: "₹3–15 LPA", demand: { te: "పెరుగుతోంది", en: "Growing" }, subjects: "Languages, Social Studies", roles: ["Reporter", "Editor", "Content Creator"] },
];

function demandColor(demand: { te: string; en: string }, lang: "te" | "en") {
  const v = demand.en;
  if (v === "Very High") return "text-emerald-700 bg-emerald-50 border-emerald-200";
  if (v === "High") return "text-blue-700 bg-blue-50 border-blue-200";
  if (v === "Growing") return "text-amber-700 bg-amber-50 border-amber-200";
  return "text-gray-600 bg-gray-50 border-gray-200";
}

function StudentGuidancePage() {
  const { lang } = useI18n();
  const [active, setActive] = useState<Stream>("all");
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = active === "all" ? cards : cards.filter(c => c.stream === active);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-[var(--if-green)] text-[var(--if-gold-pale)] py-20 px-4">
        <div className="mx-auto max-w-4xl text-center flex flex-col items-center gap-5">
          <BlurFade delay={0.1}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--if-gold)]/40 text-[var(--if-gold-light)] text-sm font-medium">
              🎓 {lang === "te" ? "విద్యార్థి మార్గదర్శన కేంద్రం" : "Student Guidance Hub"}
            </span>
          </BlurFade>
          <BlurFade delay={0.15}>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-[var(--if-gold-light)]">
              {lang === "te" ? "విద్యార్థి మార్గదర్శి" : "Student Guidance"}
            </h1>
          </BlurFade>
          <BlurFade delay={0.2}>
            <p className="text-[var(--if-gold-pale)]/70 max-w-xl text-lg">
              {lang === "te"
                ? "మీ కెరీర్ నిర్ణయించుకోండి — 18 కెరీర్ మార్గాలు, జీతాలు, సబ్జెక్టులు మరియు అవకాశాలు"
                : "Choose your career path — 18 careers with salaries, subjects required and opportunities"}
            </p>
          </BlurFade>
          <BlurFade delay={0.25} className="flex gap-4 flex-wrap justify-center">
            {[
              { n: "18", l: lang === "te" ? "కెరీర్లు" : "Careers" },
              { n: "5", l: lang === "te" ? "స్ట్రీమ్స్" : "Streams" },
              { n: "∞", l: lang === "te" ? "అవకాశాలు" : "Opportunities" },
            ].map(({ n, l }) => (
              <div key={l} className="px-5 py-3 rounded-xl bg-white/5 border border-[var(--if-gold)]/20 text-center">
                <div className="font-display text-2xl font-bold text-[var(--if-gold-light)]">{n}</div>
                <div className="text-xs text-[var(--if-gold-pale)]/60">{l}</div>
              </div>
            ))}
          </BlurFade>
        </div>
      </section>

      {/* Marquee */}
      <div className="border-y border-[var(--if-gold)]/20 bg-[var(--if-cream-light)] py-2.5 overflow-hidden">
        <Marquee className="[--duration:30s]">
          {cards.map(c => (
            <span key={c.id} className="mx-5 text-sm text-[var(--if-text-muted)] font-medium whitespace-nowrap">
              <span className="text-[var(--if-gold)]">✦</span> {c.title}
            </span>
          ))}
        </Marquee>
      </div>

      {/* Stream filter */}
      <section className="py-10 px-4 bg-[var(--if-cream-light)]">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-2 mb-10">
            {streams.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                  active === s.id
                    ? `${s.color} text-white border-transparent`
                    : "bg-white border-[var(--if-gold)]/25 text-[var(--if-text-muted)] hover:border-[var(--if-gold)]/50"
                }`}
              >
                {s.label[lang]}
                {active !== s.id && (
                  <span className="ml-1.5 text-xs opacity-60">
                    ({s.id === "all" ? cards.length : cards.filter(c => c.stream === s.id).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((card, i) => (
              <BlurFade key={card.id} delay={0.04 * i}>
                <div
                  className={`relative overflow-hidden bg-white rounded-2xl border transition-all cursor-pointer ${
                    expanded === card.id
                      ? "border-[var(--if-gold)]/50 shadow-lg shadow-[var(--if-gold)]/10"
                      : "border-[var(--if-gold)]/15 hover:border-[var(--if-gold)]/40"
                  }`}
                  onClick={() => setExpanded(expanded === card.id ? null : card.id)}
                >
                  {expanded === card.id && (
                    <BorderBeam size={150} duration={8} colorFrom="#0d3b1e" colorTo="#c8922a" />
                  )}

                  <div className="p-5">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="font-display font-bold text-[var(--if-green)] text-lg leading-tight">
                          {card.title}
                        </h3>
                        <p className="text-sm text-[var(--if-text-muted)] font-telugu mt-0.5">{card.te}</p>
                      </div>
                      <ChevronRight className={`h-4 w-4 text-[var(--if-gold)]/50 flex-shrink-0 mt-1 transition-transform ${expanded === card.id ? "rotate-90" : ""}`} />
                    </div>

                    <p className="text-sm text-[var(--if-text-muted)] mb-4">{card.desc[lang]}</p>

                    {/* Stats row */}
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="flex items-center gap-1 text-xs font-semibold text-[var(--if-green)]">
                        <IndianRupee className="h-3 w-3" />
                        {card.salary}
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${demandColor(card.demand, lang)}`}>
                        <TrendingUp className="h-3 w-3 inline mr-1" />
                        {card.demand[lang]}
                      </span>
                    </div>

                    {/* Expanded */}
                    {expanded === card.id && (
                      <div className="mt-4 pt-4 border-t border-[var(--if-gold)]/10 space-y-3">
                        <div>
                          <span className="text-xs font-bold text-[var(--if-text-muted)] uppercase tracking-wider">
                            {lang === "te" ? "అవసరమైన సబ్జెక్టులు" : "Required Subjects"}
                          </span>
                          <p className="text-sm text-[var(--if-text)] mt-1">{card.subjects}</p>
                        </div>
                        <div>
                          <span className="text-xs font-bold text-[var(--if-text-muted)] uppercase tracking-wider">
                            {lang === "te" ? "కెరీర్ పాత్రలు" : "Career Roles"}
                          </span>
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            {card.roles.map(r => (
                              <span key={r} className="text-xs px-2 py-0.5 rounded-full bg-[var(--if-gold)]/10 text-[var(--if-gold)] border border-[var(--if-gold)]/20 font-medium">
                                {r}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Scholarship CTA */}
      <section className="py-16 px-4 bg-[var(--if-green)] text-center">
        <BlurFade delay={0.1}>
          <div className="mx-auto max-w-xl">
            <div className="text-4xl mb-4">🎓</div>
            <h2 className="font-display text-2xl font-bold text-[var(--if-gold-light)] mb-3">
              {lang === "te" ? "స్కాలర్‌షిప్ కోసం దరఖాస్తు చేయండి" : "Apply for a Scholarship"}
            </h2>
            <p className="text-[var(--if-gold-pale)]/70 text-sm mb-6">
              {lang === "te"
                ? "ఇస్లామిక్ ఫ్రంట్ ప్రతి సంవత్సరం 10 మంది విద్యార్థులకు స్కాలర్‌షిప్ అందిస్తుంది — మెరిట్ + అవసరం ఆధారంగా"
                : "Islamic Front awards scholarships to 10 students annually — merit + need based"}
            </p>
            <a
              href="/#schemes"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--if-gold)] text-[var(--if-green)] font-bold hover:bg-[var(--if-gold-light)] transition-colors text-sm"
            >
              {lang === "te" ? "స్కాలర్‌షిప్ వివరాలు" : "Scholarship Details"} <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </BlurFade>
      </section>

      <Footer />
    </div>
  );
}

export default function StudentGuidance() {
  return <I18nProvider><StudentGuidancePage /></I18nProvider>;
}
