"use client";

import Link from "next/link";
import { WifiOff } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { useI18n } from "@/lib/i18n/context";

const copy = {
  heading: { te: "మీరు ఆఫ్‌లైన్‌లో ఉన్నారు", en: "You are offline" },
  body: {
    te: "మీరు ఇంతకుముందు చూసిన పేజీలు ఇప్పటికీ అందుబాటులో ఉన్నాయి. కనెక్షన్ తిరిగి వచ్చాక మిగిలినవి లోడ్ అవుతాయి.",
    en: "Pages you have already visited are still available. The rest will load once your connection returns.",
  },
  retry: { te: "మళ్ళీ ప్రయత్నించండి", en: "Try again" },
  home: { te: "హోమ్‌కు వెళ్లండి", en: "Go to the homepage" },
} as const;

export default function OfflineClient() {
  const { lang } = useI18n();

  return (
    <PageShell>
      <section className="mx-auto max-w-lg px-4 py-24 text-center">
        <WifiOff aria-hidden="true" className="mx-auto h-10 w-10 text-[var(--if-gold-ink)]" />
        <h1 className="mt-5 font-display text-3xl font-bold text-[var(--if-green)] text-balance">
          {copy.heading[lang]}
        </h1>
        <p className="mt-3 text-[var(--if-text-muted)] text-pretty">{copy.body[lang]}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex items-center min-h-11 px-5 rounded-full bg-[var(--if-green)] text-[var(--if-gold-light)] font-semibold text-sm hover:bg-[var(--if-green)]/90 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]"
          >
            {copy.retry[lang]}
          </button>
          <Link
            href="/"
            className="inline-flex items-center min-h-11 px-5 rounded-full border border-[var(--if-gold)]/40 text-[var(--if-green)] font-semibold text-sm hover:border-[var(--if-gold)] transition-colors"
          >
            {copy.home[lang]}
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
