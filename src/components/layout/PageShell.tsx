"use client";

import { useI18n } from "@/lib/i18n/context";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

/* Bilingual copy for this file, hoisted out of the JSX so a translator
   can read and review it as one unit. */
const copy = {
  skip_to_content: { te: "ప్రధాన విషయానికి వెళ్లండి", en: "Skip to content" },
} as const;

/* Every page repeated the same shell and each one re-wrapped I18nProvider,
   which ClientProviders already supplies. None of them had a <main> landmark
   or a skip link, so keyboard and screen-reader users traversed the whole
   navigation on every page. One shell means one place to get that right. */
export function PageShell({ children }: { children: React.ReactNode }) {
  const { lang } = useI18n();

  return (
    <div className="flex flex-col min-h-screen">
      <a
        href="#main"
        className="if-skip-link"
      >
        {copy.skip_to_content[lang]}
      </a>

      <Navbar />

      <main id="main" className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}
