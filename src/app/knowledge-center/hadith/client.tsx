"use client";

import { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { Simulator } from "@/components/sim/Simulator";
import { IsnadScene } from "@/components/sim/scenes/IsnadScene";
import { isnadSteps } from "@/content/simulations";

import { PageShell } from "@/components/layout/PageShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { LessonIndex } from "@/components/learning/LessonIndex";
import { PortalJump } from "@/components/learning/PortalJump";
import { PortalWallpaper } from "@/components/learning/PortalWallpaper";
import { ChevronLeft } from "lucide-react";
import { essentialHadith, hadithBooks, hadithGrades } from "@/content/hadith";

/* Bilingual copy for this file, hoisted out of the JSX so a translator can
   read and review it as one unit. */
const copy = {
  knowledge_center: { te: "జ్ఞాన కేంద్రం", en: "Knowledge Center" },
  hadith: { te: "హదీసు", en: "Hadith" },
  subtitle: {
    te: "ప్రవక్త ﷺ మాటలు, ఆచరణ — మూలంతో, స్థాయితో సహా",
    en: "The words and practice of the Prophet ﷺ, with the source and the grade given",
  },
  all: { te: "అన్నీ", en: "All" },
  theme_faith: { te: "విశ్వాసం", en: "Faith" },
  theme_character: { te: "స్వభావం", en: "Character" },
  theme_worship: { te: "ఆరాధన", en: "Worship" },
  theme_community: { te: "సమాజం", en: "Community" },
  theme_knowledge: { te: "జ్ఞానం", en: "Knowledge" },
  essential: { te: "ముఖ్యమైన హదీసులు", en: "Essential hadith" },
  essential_blurb: {
    te: "ప్రతిదానికీ దాని మూలం, దాని స్థాయి ఇక్కడ ఇవ్వబడ్డాయి. స్థాయి తెలియకుండా ఒక ఉల్లేఖనను ముందుకు పంపడం ఈ పోర్టల్ హెచ్చరించే అలవాటే.",
    en: "Each one carries its source and its grade. Passing a narration on without knowing its grade is exactly the habit this portal warns about.",
  },
  source: { te: "మూలం", en: "Source" },
  grade: { te: "స్థాయి", en: "Grade" },
  why_here: { te: "ఇది ఎందుకు ముఖ్యం", en: "Why this one" },
  six_books: { te: "ఆరు గ్రంథాలు", en: "The six books" },
  six_books_blurb: {
    te: "సున్నీ సంప్రదాయంలో ప్రధాన హదీసు సంకలనాలు 'అల్-కుతుబ్ అస్-సిత్తా' — ఆరు గ్రంథాలు. అవన్నీ ఒకే స్థాయివి కావు, మరియు ఆ తేడా తెలియడం ముఖ్యం.",
    en: "The main collections in the Sunni tradition are al-kutub as-sittah, the six books. They are not all of the same standing, and knowing that difference matters.",
  },
  compiled_by: { te: "సంకలనకర్త", en: "Compiled by" },
  died: { te: "మరణం", en: "Died" },
  roughly: { te: "సుమారు", en: "Roughly" },
  grades_heading: { te: "స్థాయిలు ఏమి చెబుతాయి", en: "What the grades mean" },
  grades_blurb: {
    te: "ప్రతి ఉల్లేఖనా సమానం కాదు. ఒక సందేశాన్ని పంచుకునే ముందు దాని స్థాయి ఏమిటో అడగడం ఒక అలవాటుగా మారాలి.",
    en: "Not every narration carries the same weight. Asking what a message's grade is, before passing it on, is worth making a habit.",
  },
} as const;

const themes = ["all", "faith", "character", "community", "knowledge"] as const;
type Theme = (typeof themes)[number];

const themeLabel: Record<Theme, keyof typeof copy> = {
  all: "all",
  faith: "theme_faith",
  character: "theme_character",
  worship: "theme_worship",
  community: "theme_community",
  knowledge: "theme_knowledge",
} as Record<Theme, keyof typeof copy>;

function HadithPage() {
  const { lang } = useI18n();
  const [theme, setTheme] = useState<Theme>("all");

  const shown = theme === "all" ? essentialHadith : essentialHadith.filter((h) => h.theme === theme);

  return (
    <PageShell>
      <PortalJump portal="hadith" sticky={false} />
      <section className="relative overflow-hidden bg-[var(--if-green)] text-[var(--if-gold-pale)] py-20 px-4">
        <PortalWallpaper portal="hadith" />
        <div className="mx-auto max-w-4xl text-center flex flex-col items-center gap-5">
          <BlurFade delay={0.05}>
            <Link
              href="/knowledge-center"
              className="inline-flex items-center min-h-11 gap-1 text-sm text-[var(--if-gold-pale)]/80 hover:text-[var(--if-gold-light)] transition-colors mb-2"
            >
              <ChevronLeft aria-hidden="true" className="h-4 w-4" />
              {copy.knowledge_center[lang]}
            </Link>
          </BlurFade>
          <BlurFade delay={0.1}>
            <span className="font-arabic text-4xl text-[var(--if-gold-light)]" dir="rtl">
              الحديث الشريف
            </span>
          </BlurFade>
          <BlurFade delay={0.15}>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-[var(--if-gold-light)]">
              {copy.hadith[lang]}
            </h1>
          </BlurFade>
          <BlurFade delay={0.2}>
            <p className="text-[var(--if-gold-pale)]/70 max-w-xl text-pretty">{copy.subtitle[lang]}</p>
          </BlurFade>
        </div>
      </section>

      {/* Theme filter */}
      <div className="sticky top-[65px] z-10 bg-[var(--if-cream-light)] border-b border-[var(--if-gold)]/20 px-4 py-2">
        {/* These filter one list; they do not switch panels. Declaring the tab
            pattern promised a tabpanel, aria-controls and arrow-key movement
            that were never there, so a screen-reader user was told to expect
            behaviour the page does not have. A pressed toggle is what they
            actually are. */}
        <div
          role="group"
          aria-label={copy.essential[lang]}
          className="if-tabstrip mx-auto max-w-4xl overflow-x-auto flex gap-2 pb-1"
        >
          {themes.map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={theme === t}
              onClick={() => setTheme(t)}
              className={`flex-shrink-0 min-h-11 px-4 rounded-full text-sm font-semibold transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)] ${
                theme === t
                  ? "bg-[var(--if-green)] text-[var(--if-gold-light)]"
                  : "text-[var(--if-text-muted)] hover:bg-[var(--if-gold)]/10"
              }`}
            >
              {copy[themeLabel[t]][lang]}
            </button>
          ))}
        </div>
      </div>

      <section id="essential" className="if-defer py-16 px-4 scroll-mt-32">
        <div className="mx-auto max-w-3xl">
          <BlurFade delay={0.05}>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--if-green)] mb-2">
              {copy.essential[lang]}
            </h2>
            <p className="text-[var(--if-text-muted)] mb-8 text-pretty max-w-2xl">
              {copy.essential_blurb[lang]}
            </p>
          </BlurFade>

          <ol className="space-y-5">
            {shown.map((h, i) => (
              <li key={h.id}>
                <BlurFade delay={Math.min(0.04 * i, 0.3)}>
                  <article className="relative overflow-hidden bg-white rounded-2xl border border-[var(--if-gold)]/20 p-6 sm:p-8">
                    {i === 0 && (
                      <BorderBeam size={200} duration={10} colorFrom="#c8922a" colorTo="#c8922a" />
                    )}
                    <p
                      dir="rtl"
                      lang="ar"
                      className="font-arabic text-2xl sm:text-3xl text-[var(--if-green)] leading-loose mb-4 text-right"
                    >
                      {h.arabic}
                    </p>
                    <p className="text-sm italic text-[var(--if-text-muted)] mb-4">{lang === "te" ? h.translit_te : h.translit}</p>
                    <p className="text-lg text-[var(--if-text)] leading-relaxed text-pretty mb-5">
                      {h.text[lang]}
                    </p>

                    <dl className="flex flex-wrap gap-x-6 gap-y-2 text-sm mb-5">
                      <div className="flex gap-2">
                        <dt className="text-[var(--if-text-muted)]">{copy.source[lang]}:</dt>
                        <dd className="font-semibold text-[var(--if-green)]">{h.source[lang]}</dd>
                      </div>
                      <div className="flex gap-2">
                        <dt className="text-[var(--if-text-muted)]">{copy.grade[lang]}:</dt>
                        <dd className="font-semibold text-[var(--if-gold-ink)]">{h.grade[lang]}</dd>
                      </div>
                    </dl>

                    <div className="border-t border-[var(--if-gold)]/20 pt-4">
                      <h3 className="text-xs font-bold text-[var(--if-gold-ink)] uppercase tracking-widest mb-2">
                        {copy.why_here[lang]}
                      </h3>
                      <p className="text-sm text-[var(--if-text-muted)] leading-relaxed text-pretty">
                        {h.why[lang]}
                      </p>
                    </div>
                  </article>
                </BlurFade>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="grades" className="if-defer py-16 px-4 bg-[var(--if-cream-light)] scroll-mt-32">
        <div className="mx-auto max-w-3xl">
          <BlurFade delay={0.05}>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--if-green)] mb-2">
              {copy.grades_heading[lang]}
            </h2>
            <p className="text-[var(--if-text-muted)] mb-7 text-pretty max-w-2xl">
              {copy.grades_blurb[lang]}
            </p>
          </BlurFade>
          {/* No BlurFade wrapper on these. A dl allows one level of div between
              itself and its dt/dd pairs, and BlurFade adds a second, which axe
              reports as a malformed definition list. */}
          <dl className="grid gap-4 sm:grid-cols-2">
            {hadithGrades.map((g) => (
              <div
                key={g.id}
                className="if-rise h-full rounded-2xl border border-[var(--if-gold)]/20 bg-white p-5"
              >
                <dt className="font-display text-lg font-bold text-[var(--if-green)] mb-1">
                  {g.name[lang]}
                </dt>
                <dd className="text-sm text-[var(--if-text-muted)] leading-relaxed text-pretty">
                  {g.meaning[lang]}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="books" className="if-defer py-16 px-4 scroll-mt-32">
        <div className="mx-auto max-w-4xl">
          <BlurFade delay={0.05}>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--if-green)] mb-2">
              {copy.six_books[lang]}
            </h2>
            <p className="text-[var(--if-text-muted)] mb-8 text-pretty max-w-2xl">
              {copy.six_books_blurb[lang]}
            </p>
          </BlurFade>

          <ol className="grid gap-4 sm:grid-cols-2">
            {hadithBooks.map((b, i) => (
              <li key={b.id}>
                <BlurFade delay={Math.min(0.05 * i, 0.3)}>
                  <div className="h-full rounded-2xl border border-[var(--if-gold)]/20 bg-white p-6">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="font-display text-lg font-bold text-[var(--if-green)] leading-tight">
                        {b.name[lang]}
                      </h3>
                      <span className="font-arabic text-lg text-[var(--if-gold-ink)] shrink-0" dir="rtl">
                        {b.arabic}
                      </span>
                    </div>
                    <dl className="text-sm space-y-1 mb-4">
                      <div className="flex flex-wrap gap-x-2">
                        <dt className="text-[var(--if-text-muted)]">{copy.compiled_by[lang]}:</dt>
                        <dd className="text-[var(--if-text)]">{b.compiler[lang]}</dd>
                      </div>
                      <div className="flex flex-wrap gap-x-2">
                        <dt className="text-[var(--if-text-muted)]">{copy.died[lang]}:</dt>
                        <dd className="text-[var(--if-text)] tabular-nums">{b.died}</dd>
                      </div>
                      <div className="flex flex-wrap gap-x-2">
                        <dt className="text-[var(--if-text-muted)]">{copy.roughly[lang]}:</dt>
                        <dd className="text-[var(--if-text)]">{b.count[lang]}</dd>
                      </div>
                    </dl>
                    <p className="text-sm text-[var(--if-text-muted)] leading-relaxed text-pretty border-t border-[var(--if-gold)]/20 pt-3">
                      {b.note[lang]}
                    </p>
                  </div>
                </BlurFade>
              </li>
            ))}
          </ol>
        </div>
      </section>
      {/* ── Simulator ── */}
      <section className="py-16 px-4 ">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--if-green)] text-center mb-8">{lang === "te" ? "ఉల్లేఖన శృంఖల — చూడండి" : "The chain of narration"}</h2>
          <p className="mx-auto mb-8 max-w-2xl text-center text-sm text-[var(--if-text-muted)] text-pretty">
            {lang === "te"
              ? "సహీహ్ బుఖారీలోని మొదటి హదీసు ప్రవక్త ﷺ నుండి గ్రంథకర్త వరకు ఎలా చేరిందో ఈ శృంఖల చూపిస్తుంది."
              : "How the first hadith in Sahih al-Bukhari travelled from the Prophet ﷺ to the compiler, one narrator at a time."}
          </p>
          <Simulator steps={isnadSteps} scene={IsnadScene} autoplay />
        </div>
      </section>


      <LessonIndex portal="hadith" />
    </PageShell>
  );
}

export default function Hadith() {
  return <HadithPage />;
}
