"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { PageShell } from "@/components/layout/PageShell";
import { BookOpen, GraduationCap, Home, Search } from "lucide-react";

/* Bilingual copy for this file, hoisted out of the JSX so a translator can
   read and review it as one unit. */
const copy = {
  code: { te: "404", en: "404" },
  title: { te: "ఈ పేజీ దొరకలేదు", en: "This page is not here" },
  body: {
    te: "మీరు వెతుకుతున్న పేజీ తీసివేయబడి ఉండవచ్చు, లేదా చిరునామా తప్పుగా ఉండవచ్చు. కింది వాటిలో ఒకటి ప్రయత్నించండి.",
    en: "The page you were looking for may have moved, or the address may have a typo. Try one of these instead.",
  },
  search_hint: {
    te: "పైన ఉన్న శోధనలో వెతకవచ్చు.",
    en: "You can also search from the box in the header.",
  },
} as const;

const LINKS = [
  {
    href: "/",
    icon: Home,
    te: "హోమ్‌పేజీ",
    en: "Homepage",
    teSub: "సంఘం, పథకాలు, సంప్రదింపు",
    enSub: "Community, schemes, contact",
  },
  {
    href: "/knowledge-center",
    icon: BookOpen,
    te: "జ్ఞాన కేంద్రం",
    en: "Knowledge Center",
    teSub: "13 పోర్టల్స్, 75 పాఠాలు, జకాత్ కాలిక్యులేటర్",
    enSub: "13 portals, 75 lessons, Zakat calculator",
  },
  {
    href: "/student-guidance",
    icon: GraduationCap,
    te: "విద్యార్థి మార్గదర్శి",
    en: "Student Guidance",
    teSub: "కోర్సులు, కెరీర్లు, స్కాలర్‌షిప్‌లు",
    enSub: "Courses, careers, scholarships",
  },
] as const;

export function NotFoundClient() {
  const { lang } = useI18n();

  return (
    <PageShell>
      <section className="mx-auto max-w-3xl px-4 py-20 sm:py-28 text-center">
        <p className="font-display text-6xl sm:text-7xl font-bold text-[var(--if-gold)]/35 tabular-nums leading-none">
          {copy.code[lang]}
        </p>
        <h1 className="mt-4 font-display text-3xl sm:text-4xl font-bold text-[var(--if-green)] text-balance">
          {copy.title[lang]}
        </h1>
        <p className="mt-3 mx-auto max-w-[46ch] text-[var(--if-text-mid)] text-pretty">
          {copy.body[lang]}
        </p>

        <ul className="mt-10 grid gap-3 text-left sm:grid-cols-3">
          {LINKS.map(({ href, icon: Icon, ...l }) => (
            <li key={href}>
              <Link
                href={href}
                className="group flex h-full flex-col gap-2 rounded-2xl border border-[var(--if-gold)]/25 bg-[var(--if-cream-light)] p-5 transition-colors hover:border-[var(--if-gold)] hover:bg-[color-mix(in_srgb,var(--if-gold)_8%,var(--if-cream-light))] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]"
              >
                <Icon className="h-5 w-5 text-[var(--if-gold-ink)]" aria-hidden="true" />
                <span className="font-display font-bold text-[var(--if-green)]">
                  {lang === "te" ? l.te : l.en}
                </span>
                <span className="text-xs text-[var(--if-text-muted)] text-pretty">
                  {lang === "te" ? l.teSub : l.enSub}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-8 inline-flex items-center gap-2 text-sm text-[var(--if-text-muted)]">
          <Search className="h-4 w-4" aria-hidden="true" />
          {copy.search_hint[lang]}
        </p>
      </section>
    </PageShell>
  );
}
