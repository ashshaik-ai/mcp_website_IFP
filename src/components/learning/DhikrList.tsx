"use client";

import { useI18n } from "@/lib/i18n/context";
import { salahDhikr } from "@/content/salah-dhikr";
import { SpeakButton } from "./SpeakButton";

/* The recitations of the prayer, posture by posture.

   Every platform this was benchmarked against stacks the same three layers on
   each phrase — the Arabic as recited, a romanisation for readers who cannot
   yet read the script, and the meaning — and this portal had them in one tab
   of the hub only. The lesson that actually teaches the sequence showed the
   movements in Telugu prose and not one Arabic character.

   Rendered from the same records the hub tab uses, so the two can never drift
   apart. */
const copy = {
  heading: { te: "ఏ దశలో ఏమి చదవాలి", en: "What you say at each posture" },
  sub: {
    te: "అరబిక్, ఉచ్చారణ, అర్థం — ప్రతి భంగిమకు.",
    en: "The Arabic, how to say it, and what it means — for every posture.",
  },
} as const;

export function DhikrList() {
  const { lang } = useI18n();

  return (
    <section className="mt-10">
      <h2 className="font-display text-xl font-bold text-[var(--if-green)]">{copy.heading[lang]}</h2>
      <p className="mt-1 mb-4 text-sm text-[var(--if-text-muted)] text-pretty">{copy.sub[lang]}</p>
      <ol className="flex flex-col gap-3">
        {salahDhikr.map((step) => (
          <li key={step.n} className="flex gap-4 rounded-xl border border-[var(--if-gold)]/20 bg-white p-4">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--if-green)] text-sm font-bold text-[var(--if-gold-light)] tabular-nums">
              {step.n}
            </span>
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <span className="font-display font-bold text-[var(--if-green)]">{step.name}</span>
                <span className="text-xs text-[var(--if-text-muted)]">{step.pos[lang]}</span>
              </div>
              <div className="mb-1 flex items-center justify-end gap-1">
                <SpeakButton text={step.ar} label={step.name} className="-my-2" />
                <p lang="ar" dir="rtl" className="text-right font-arabic text-lg text-[var(--if-gold-ink)]">
                  {step.ar}
                </p>
              </div>
              <p className="mb-1 text-xs italic text-[var(--if-text-muted)]">{step.tr}</p>
              <p className="text-sm text-[var(--if-text-muted)] text-pretty">{lang === "te" ? step.te : step.en}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
