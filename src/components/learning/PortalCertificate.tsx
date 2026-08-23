"use client";

import { useEffect, useRef, useState } from "react";
import { Award, Printer, X } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

/* Something to keep at the end of a portal.

   Every platform this was benchmarked against issues one, and finishing all
   eight lessons of a portal here produced nothing at all — not a line of
   acknowledgement, let alone a record.

   It is deliberately not called a credential and does not pretend to be
   verifiable: there are no accounts on this site, nothing is checked against a
   server, and the name is whatever the learner types. It says so on the
   certificate itself. What it is, is a printable record of work done, which is
   what most of them amount to for a free course anyway. */
const copy = {
  cta: { te: "సర్టిఫికెట్ పొందండి", en: "Get your certificate" },
  title: { te: "పూర్తి చేసిన ధృవపత్రం", en: "Certificate of completion" },
  awarded: { te: "ఇది ఇవ్వబడింది", en: "Awarded to" },
  namePlaceholder: { te: "మీ పేరు", en: "Your name" },
  nameLabel: { te: "సర్టిఫికెట్‌పై కనిపించే పేరు", en: "Name to print on the certificate" },
  forCompleting: { te: "పూర్తి చేసినందుకు", en: "for completing" },
  lessons: { te: "పాఠాలు", en: "lessons" },
  org: { te: "ఇస్లామిక్ ఫ్రంట్, మంగళగిరి", en: "Islamic Front, Mangalagiri" },
  print: { te: "ప్రింట్ చేయండి", en: "Print" },
  close: { te: "మూసివేయండి", en: "Close" },
  disclaimer: {
    te: "ఇది స్వీయ-ధృవీకరణ రికార్డు — ఖాతా లేదా పరీక్ష ద్వారా ధృవీకరించబడలేదు.",
    en: "A self-recorded certificate. There are no accounts here and nothing is verified against a server.",
  },
} as const;

export function PortalCertificate({
  portalTitle,
  lessonCount,
}: {
  portalTitle: string;
  lessonCount: number;
}) {
  const { lang } = useI18n();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    dialogRef.current?.querySelector<HTMLInputElement>("input")?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  /* Focus goes back where it came from, not to the top of the document. */
  useEffect(() => {
    if (!open) opener.current?.focus({ preventScroll: true });
  }, [open]);

  const today = new Intl.DateTimeFormat(lang === "te" ? "te-IN" : "en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <>
      <button
        ref={opener}
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--if-green)] px-5 text-sm font-bold text-[var(--if-gold-light)] transition-colors hover:bg-[var(--if-green-mid)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]"
      >
        <Award aria-hidden="true" className="h-4 w-4" />
        {copy.cta[lang]}
      </button>

      {open && (
        <div
          className="if-cert-overlay fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto bg-black/50 p-4 py-10"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={copy.title[lang]}
            className="w-full max-w-2xl rounded-2xl bg-[var(--if-cream-light)] p-4 sm:p-6"
          >
            <div className="if-cert-controls mb-4 flex flex-wrap items-end justify-between gap-3">
              <label className="min-w-0 flex-1">
                <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-[var(--if-green)]">
                  {copy.nameLabel[lang]}
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={copy.namePlaceholder[lang]}
                  className="w-full min-h-11 rounded-xl border border-[var(--if-gold)]/40 bg-white px-3 text-base text-[var(--if-text)]"
                />
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--if-green)] px-4 text-sm font-bold text-[var(--if-gold-light)]"
                >
                  <Printer aria-hidden="true" className="h-4 w-4" />
                  {copy.print[lang]}
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={copy.close[lang]}
                  className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[var(--if-gold)]/40 text-[var(--if-green)]"
                >
                  <X aria-hidden="true" className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* The sheet itself — the only thing that survives into print. */}
            <div className="if-cert-sheet rounded-2xl border-2 border-[var(--if-gold)]/50 bg-white p-8 text-center sm:p-12">
              {/* Letter-spacing is for Latin. Telugu conjuncts come apart when
                  they are tracked out, so the eyebrow is only spaced in
                  English. */}
              <p
                className={`text-xs font-bold uppercase text-[var(--if-gold-ink)] ${
                  lang === "en" ? "tracking-[0.3em]" : ""
                }`}
              >
                {copy.title[lang]}
              </p>
              <p className="mt-8 text-sm text-[var(--if-text-muted)]">{copy.awarded[lang]}</p>
              <p className="mt-1 font-display text-3xl font-bold text-[var(--if-green)] sm:text-4xl">
                {name.trim() || copy.namePlaceholder[lang]}
              </p>
              <p className="mt-6 text-sm text-[var(--if-text-muted)]">{copy.forCompleting[lang]}</p>
              <p className="mt-1 font-display text-xl font-bold text-[var(--if-green)] text-balance">
                {portalTitle}
              </p>
              <p className="mt-1 text-sm text-[var(--if-text-muted)] tabular-nums">
                {lessonCount} {copy.lessons[lang]}
              </p>
              <div className="mt-10 flex items-end justify-between gap-4 border-t border-[var(--if-gold)]/30 pt-5 text-left">
                <span className="text-sm font-semibold text-[var(--if-green)]">{copy.org[lang]}</span>
                <span className="text-sm text-[var(--if-text-muted)] tabular-nums">{today}</span>
              </div>
              <p className="mt-5 text-[11px] text-[var(--if-text-muted)] text-pretty">
                {copy.disclaimer[lang]}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
