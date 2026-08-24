"use client";

import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { buzz } from "@/lib/haptics";
import { celebrate } from "@/lib/celebrate";

/* A tasbih you can actually use.

   The 99 names portal taught the names and then left the reader nothing to do
   with them. This is the doing: the dhikr counter every practising visitor
   already runs as a phone app, on the page where the words it counts are
   taught. One thumb, a tick you can feel, a ring that fills to 33, and the
   day's total kept on the device.

   The count is per dhikr per day and resets at local midnight, because
   "how much did I do today" is the only question a tasbih answers. */
const DHIKRS = [
  { key: "subhanallah", ar: "سُبْحَانَ الله", te: "సుబ్హానల్లాహ్", en: "SubhanAllah" },
  { key: "alhamdulillah", ar: "الْحَمْدُ لِلَّه", te: "అల్హందులిల్లాహ్", en: "Alhamdulillah" },
  { key: "allahuakbar", ar: "اللَّهُ أَكْبَر", te: "అల్లాహు అక్బర్", en: "Allahu Akbar" },
] as const;

const KEY = "ifp-tasbih-v1";
const CYCLE = 33;

const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

type Store = { date: string; counts: Record<string, number> };

const read = (): Store => {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as Store) : null;
    if (parsed && parsed.date === today() && parsed.counts) return parsed;
  } catch {
    /* Blocked or corrupt: start the day at zero. */
  }
  return { date: today(), counts: {} };
};

const copy = {
  title: { te: "తస్బీహ్", en: "Tasbih" },
  todayLabel: { te: "ఈరోజు", en: "today" },
  reset: { te: "సున్నాకు", en: "Reset" },
  tap: { te: "లెక్కించడానికి నొక్కండి", en: "Tap to count" },
} as const;

export function Tasbih() {
  const { lang } = useI18n();
  const [dhikr, setDhikr] = useState(0);
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    setCounts(read().counts);
  }, []);

  const active = DHIKRS[dhikr];
  const count = counts[active.key] ?? 0;
  const inCycle = count % CYCLE;
  const ring = inCycle / CYCLE;

  const persist = (next: Record<string, number>) => {
    setCounts(next);
    try {
      localStorage.setItem(KEY, JSON.stringify({ date: today(), counts: next }));
    } catch {
      /* The count still stands for this visit. */
    }
  };

  const tap = () => {
    const next = { ...counts, [active.key]: count + 1 };
    persist(next);
    if ((count + 1) % CYCLE === 0) {
      buzz([20, 40, 20]);
      celebrate();
    } else {
      buzz(8);
    }
  };

  const reset = () => persist({ ...counts, [active.key]: 0 });

  const R = 84;
  const CIRC = 2 * Math.PI * R;

  return (
    <section className="rounded-2xl border border-[var(--if-gold)]/20 bg-white p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-display text-lg font-bold text-[var(--if-green)]">{copy.title[lang]}</h2>
        <div role="group" aria-label={copy.title[lang]} className="flex gap-1.5">
          {DHIKRS.map((d, i) => (
            <button
              key={d.key}
              type="button"
              aria-pressed={i === dhikr}
              onClick={() => setDhikr(i)}
              className={`min-h-11 rounded-full border px-3 text-xs font-bold transition-colors ${
                i === dhikr
                  ? "border-transparent bg-[var(--if-green)] text-[var(--if-gold-light)]"
                  : "border-[var(--if-gold)]/30 bg-white text-[var(--if-green)] hover:border-[var(--if-gold)]"
              }`}
            >
              {d[lang]}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={tap}
        aria-label={`${active[lang]} — ${copy.tap[lang]}`}
        className="group relative mx-auto block aspect-square w-56 max-w-full select-none rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--if-gold)]"
      >
        <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
          <circle cx="100" cy="100" r={R} fill="var(--if-cream-light)" stroke="var(--if-gold)" strokeOpacity="0.2" strokeWidth="8" />
          <circle
            cx="100"
            cy="100"
            r={R}
            fill="none"
            stroke="var(--if-gold)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            strokeDashoffset={CIRC * (1 - ring)}
            style={{ transition: "stroke-dashoffset 0.25s ease-out" }}
          />
          {/* 33 bead marks around the ring. */}
          {Array.from({ length: CYCLE }).map((_, i) => (
            <circle
              key={i}
              cx={100 + (R + 12) * Math.cos((i / CYCLE) * Math.PI * 2)}
              cy={100 + (R + 12) * Math.sin((i / CYCLE) * Math.PI * 2)}
              r="2"
              fill={i < inCycle || (inCycle === 0 && count > 0) ? "var(--if-gold)" : "var(--if-gold)"}
              opacity={i < inCycle ? 0.9 : 0.25}
            />
          ))}
        </svg>
        <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 transition-transform duration-100 group-active:scale-95">
          <span lang="ar" dir="rtl" className="font-arabic text-2xl text-[var(--if-green)]">
            {active.ar}
          </span>
          <span className="font-display text-5xl font-bold tabular-nums text-[var(--if-green)]" aria-live="polite">
            {inCycle === 0 && count > 0 ? CYCLE : inCycle}
          </span>
          <span className="text-xs text-[var(--if-text-muted)]">/ {CYCLE}</span>
        </span>
      </button>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-[var(--if-text-muted)] tabular-nums">
          {count} {copy.todayLabel[lang]}
        </p>
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-[var(--if-gold)]/30 px-3.5 text-xs font-bold text-[var(--if-green)] hover:border-[var(--if-gold)]"
        >
          <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
          {copy.reset[lang]}
        </button>
      </div>
    </section>
  );
}
