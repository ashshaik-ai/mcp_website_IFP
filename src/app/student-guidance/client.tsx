"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { PageShell } from "@/components/layout/PageShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { Marquee } from "@/components/ui/marquee";
import { ChevronRight, Search, X } from "lucide-react";
import {
  guidanceCards,
  guidanceSections,
  guidanceStreams,
  type GuidanceCard,
} from "@/content/student-guidance";

/* Bilingual copy for this file, hoisted out of the JSX so a translator
   can read and review it as one unit. */
const copy = {
  pros: { te: "అనుకూలతలు", en: "Pros" },
  cons: { te: "ప్రతికూలతలు", en: "Cons" },
  misconception: { te: "అపోహ", en: "Misconception" },
  student_guidance_hub: { te: "విద్యార్థి మార్గదర్శన కేంద్రం", en: "Student Guidance Hub" },
  student_guidance: { te: "విద్యార్థి మార్గదర్శి", en: "Student Guidance" },
  your_real_options_after_10th: { te: "10వ తరగతి తర్వాత మీ నిజమైన ఎంపికలు — మార్గాలు, ప్రవేశ పరీక్షలు, ప్రభుత్వ ఉద్యోగాలు మరియు స్కాలర్‌షిప్‌లు.", en: "Your real options after 10th — pathways, entrance exams, government jobs and scholarships." },
  pathways: { te: "మార్గాలు", en: "Pathways" },
  sections: { te: "విభాగాలు", en: "Sections" },
  streams: { te: "స్ట్రీమ్స్", en: "Streams" },
  search_careers: { te: "కెరీర్ వెతకండి", en: "Search careers" },
  e_g_doctor_engineer_ias: { te: "ఉదా: డాక్టర్, ఇంజినీర్, IAS…", en: "e.g. Doctor, Engineer, IAS…" },
  clear_search: { te: "వెతుకులాటను క్లియర్ చేయండి", en: "Clear search" },
  filter_by_stream: { te: "స్ట్రీమ్ ద్వారా ఫిల్టర్ చేయండి", en: "Filter by stream" },
  no_matches_try_a_different: { te: "ఫలితాలు లేవు. వేరే పదం ప్రయత్నించండి.", en: "No matches. Try a different term." },
  apply_for_a_scholarship: { te: "స్కాలర్‌షిప్ కోసం దరఖాస్తు చేయండి", en: "Apply for a Scholarship" },
  islamic_front_awards_scholarships_to: { te: "ఇస్లామిక్ ఫ్రంట్ ప్రతి సంవత్సరం 10 మంది విద్యార్థులకు స్కాలర్‌షిప్ అందిస్తుంది — మెరిట్ + అవసరం ఆధారంగా", en: "Islamic Front awards scholarships to 10 students annually — merit + need based" },
  scholarship_details: { te: "స్కాలర్‌షిప్ వివరాలు", en: "Scholarship Details" },
} as const;

const STREAM_COLORS: Record<string, string> = {
  all: "bg-[var(--if-green)]",
  mpc: "bg-blue-700",
  bipc: "bg-red-700",
  commerce: "bg-amber-700",
  arts: "bg-purple-700",
};

function CardTile({ card, open, onToggle }: { card: GuidanceCard; open: boolean; onToggle: () => void }) {
  const { lang } = useI18n();
  const bodyId = `gx-body-${card.id}`;
  const hasDetail = card.fields.length > 0 || card.pros[lang] || card.cons[lang] || card.myth[lang];

  return (
    <div
      className={`relative overflow-hidden bg-white rounded-2xl border transition-colors ${
        open
          ? "border-[var(--if-gold)]/50 shadow-lg shadow-[var(--if-gold)]/10"
          : "border-[var(--if-gold)]/15 hover:border-[var(--if-gold)]/40"
      }`}
    >
      {open && <BorderBeam size={150} duration={8} colorFrom="#0d3b1e" colorTo="#c8922a" />}

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={hasDetail ? bodyId : undefined}
        className="w-full text-left p-5 min-h-11 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-display font-bold text-[var(--if-green)] text-lg leading-tight">
              {card.title[lang]}
            </h3>
            {card.tag[lang] && (
              <span className="inline-block mt-1.5 text-[11px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-[var(--if-gold)]/10 text-[var(--if-gold)] border border-[var(--if-gold)]/20">
                {card.tag[lang]}
              </span>
            )}
          </div>
          {hasDetail && (
            <ChevronRight
              aria-hidden="true"
              className={`h-4 w-4 text-[var(--if-gold)]/50 shrink-0 mt-1 transition-transform ${open ? "rotate-90" : ""}`}
            />
          )}
        </div>

        {card.summary[lang] && (
          <p className="text-sm text-[var(--if-text-muted)] mt-3 text-pretty">{card.summary[lang]}</p>
        )}
      </button>

      {open && hasDetail && (
        <div id={bodyId} className="px-5 pb-5 -mt-1 space-y-3">
          {card.fields.length > 0 && (
            <dl className="border-t border-[var(--if-gold)]/10 pt-3 space-y-2">
              {card.fields.map((f, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <dt className="w-28 shrink-0 text-[11px] font-bold uppercase tracking-wide text-[var(--if-green)] pt-0.5">
                    {f.k[lang]}
                  </dt>
                  <dd className="text-[var(--if-text)] text-pretty">{f.v[lang]}</dd>
                </div>
              ))}
            </dl>
          )}

          {(card.pros[lang] || card.cons[lang]) && (
            <div className="grid sm:grid-cols-2 gap-2">
              {card.pros[lang] && (
                <p className="text-sm rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-emerald-900 text-pretty">
                  <b className="block text-[11px] uppercase tracking-wide mb-1">
                    {copy.pros[lang]}
                  </b>
                  {card.pros[lang]}
                </p>
              )}
              {card.cons[lang] && (
                <p className="text-sm rounded-lg bg-amber-50 border border-amber-200 p-3 text-amber-900 text-pretty">
                  <b className="block text-[11px] uppercase tracking-wide mb-1">
                    {copy.cons[lang]}
                  </b>
                  {card.cons[lang]}
                </p>
              )}
            </div>
          )}

          {card.myth[lang] && (
            <p className="text-sm rounded-lg bg-[var(--if-green)]/5 border border-[var(--if-green)]/15 p-3 text-[var(--if-text)] text-pretty">
              <b className="block text-[11px] uppercase tracking-wide mb-1 text-[var(--if-green)]">
                {copy.misconception[lang]}
              </b>
              {card.myth[lang]}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function StudentGuidancePage() {
  const { lang } = useI18n();
  const [stream, setStream] = useState("all");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return guidanceCards.filter((c) => {
      if (stream !== "all" && c.stream !== stream) return false;
      if (!q) return true;
      return (
        c.search.includes(q) ||
        c.title.te.toLowerCase().includes(q) ||
        c.title.en.toLowerCase().includes(q) ||
        c.summary.te.toLowerCase().includes(q) ||
        c.summary.en.toLowerCase().includes(q)
      );
    });
  }, [stream, query]);

  const grouped = useMemo(
    () =>
      guidanceSections
        .map((s) => ({ ...s, cards: filtered.filter((c) => c.section === s.id) }))
        .filter((s) => s.cards.length > 0),
    [filtered],
  );

  return (
    <PageShell>

      <section className="bg-[var(--if-green)] text-[var(--if-gold-pale)] py-20 px-4">
        <div className="mx-auto max-w-4xl text-center flex flex-col items-center gap-5">
          <BlurFade delay={0.1}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--if-gold)]/40 text-[var(--if-gold-light)] text-sm font-medium">
              {copy.student_guidance_hub[lang]}
            </span>
          </BlurFade>
          <BlurFade delay={0.15}>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-[var(--if-gold-light)]">
              {copy.student_guidance[lang]}
            </h1>
          </BlurFade>
          <BlurFade delay={0.2}>
            <p className="text-[var(--if-gold-pale)]/70 max-w-xl text-lg text-pretty">
              {copy.your_real_options_after_10th[lang]}
            </p>
          </BlurFade>
          <BlurFade delay={0.25} className="flex gap-4 flex-wrap justify-center">
            {[
              { n: String(guidanceCards.length), l: copy.pathways[lang] },
              { n: String(guidanceSections.length), l: copy.sections[lang] },
              { n: String(guidanceStreams.length - 1), l: copy.streams[lang] },
            ].map(({ n, l }) => (
              <div key={l} className="px-5 py-3 rounded-xl bg-white/5 border border-[var(--if-gold)]/20 text-center">
                <div className="font-display text-2xl font-bold text-[var(--if-gold-light)]">{n}</div>
                <div className="text-xs text-[var(--if-gold-pale)]/60">{l}</div>
              </div>
            ))}
          </BlurFade>
        </div>
      </section>

      <div className="border-y border-[var(--if-gold)]/20 bg-[var(--if-cream-light)] py-2.5 overflow-hidden">
        <Marquee className="[--duration:40s]">
          {guidanceCards.slice(0, 30).map((c) => (
            <span key={c.id} className="mx-5 text-sm text-[var(--if-text-muted)] font-medium whitespace-nowrap">
              <span className="text-[var(--if-gold)]" aria-hidden="true">&#10022;</span> {c.title[lang]}
            </span>
          ))}
        </Marquee>
      </div>

      <section className="py-10 px-4 bg-[var(--if-cream-light)]">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 mb-10">
            <label className="relative block max-w-md">
              <span className="sr-only">{copy.search_careers[lang]}</span>
              <Search
                aria-hidden="true"
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--if-text-muted)]"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={copy.e_g_doctor_engineer_ias[lang]}
                className="w-full min-h-11 pl-9 pr-9 rounded-full bg-white border border-[var(--if-gold)]/25 text-sm text-[var(--if-text)] placeholder:text-[var(--if-text-muted)]/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label={copy.clear_search[lang]}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-[var(--if-gold)]/10"
                >
                  <X aria-hidden="true" className="h-4 w-4 text-[var(--if-text-muted)]" />
                </button>
              )}
            </label>

            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label={copy.filter_by_stream[lang]}
            >
              {guidanceStreams.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setStream(s.id)}
                  aria-pressed={stream === s.id}
                  className={`min-h-11 px-4 rounded-full text-sm font-semibold border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)] ${
                    stream === s.id
                      ? `${STREAM_COLORS[s.id] ?? "bg-[var(--if-green)]"} text-white border-transparent`
                      : "bg-white border-[var(--if-gold)]/25 text-[var(--if-text-muted)] hover:border-[var(--if-gold)]/50"
                  }`}
                >
                  {s.label[lang]}
                  <span className="ml-1.5 text-xs opacity-70">({s.count})</span>
                </button>
              ))}
            </div>
          </div>

          {grouped.length === 0 ? (
            <p className="text-center text-[var(--if-text-muted)] py-16">
              {copy.no_matches_try_a_different[lang]}
            </p>
          ) : (
            grouped.map((section) => (
              <section key={section.id} id={section.id} className="mb-12 scroll-mt-28">
                <h2 className="font-display text-xl md:text-2xl font-bold text-[var(--if-green)] mb-5 text-pretty">
                  {section.label[lang]}
                  <span className="ml-2 text-sm font-normal text-[var(--if-text-muted)]">
                    ({section.cards.length})
                  </span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
                  {section.cards.map((card, i) => (
                    <BlurFade key={card.id} delay={Math.min(0.04 * i, 0.4)}>
                      <CardTile
                        card={card}
                        open={open === card.id}
                        onToggle={() => setOpen(open === card.id ? null : card.id)}
                      />
                    </BlurFade>
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
      </section>

      <section className="py-16 px-4 bg-[var(--if-green)] text-center">
        <BlurFade delay={0.1}>
          <div className="mx-auto max-w-xl">
            <h2 className="font-display text-2xl font-bold text-[var(--if-gold-light)] mb-3 text-pretty">
              {copy.apply_for_a_scholarship[lang]}
            </h2>
            <p className="text-[var(--if-gold-pale)]/70 text-sm mb-6 text-pretty">
              {copy.islamic_front_awards_scholarships_to[lang]}
            </p>
            <Link
              href="/#schemes"
              className="inline-flex items-center gap-2 min-h-11 px-6 rounded-full bg-[var(--if-gold)] text-[var(--if-green)] font-bold hover:bg-[var(--if-gold-light)] transition-colors text-sm"
            >
              {copy.scholarship_details[lang]}
              <ChevronRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </BlurFade>
      </section>

    </PageShell>
  );
}

export default function StudentGuidance() {
  return <StudentGuidancePage />;
}
