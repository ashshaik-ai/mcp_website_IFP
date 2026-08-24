"use client";

import { useEffect, useState } from "react";
import { buzz } from "@/lib/haptics";
import { celebrate } from "@/lib/celebrate";

/* The four tasks used to be plain divs with a square border drawn on them:
   they looked exactly like checkboxes, a child tapped one, and nothing at all
   happened. Underneath sat four streak badges at 40% opacity that no code
   could ever light. These are real toggles now, remembered for the day they
   were ticked, and the row beneath them is the honest thing it can be: how
   many of today's four are done. */
const CHALLENGE = [
  { emoji: "\u{1F932}", te: "\u0c2b\u0c1c\u0c4d\u0c30\u0c4d \u0c28\u0c2e\u0c3e\u0c1c\u0c4d \u0c1a\u0c47\u0c36\u0c3e\u0c28\u0c41", en: "Prayed Fajr on time" },
  { emoji: "\u{1F4D6}", te: "\u0c12\u0c15 \u0c06\u0c2f\u0c24\u0c4d \u0c1a\u0c26\u0c3f\u0c35\u0c3e\u0c28\u0c41", en: "Read one Ayah of Quran" },
  { emoji: "\u{1F60A}", te: "\u0c12\u0c15\u0c30\u0c3f\u0c15\u0c3f \u0c2e\u0c02\u0c1a\u0c3f \u0c1a\u0c47\u0c36\u0c3e\u0c28\u0c41", en: "Did one kind deed" },
  { emoji: "\u{1F932}", te: "\u0c24\u0c32\u0c4d\u0c32\u0c3f\u0c26\u0c02\u0c21\u0c4d\u0c30\u0c41\u0c32\u0c15\u0c41 \u0c38\u0c3e\u0c2f\u0c2a\u0c21\u0c4d\u0c21\u0c3e\u0c28\u0c41", en: "Helped my parents today" },
] as const;

const CHALLENGE_KEY = "ifp-kids-challenge";
/* The local day, not the UTC one. toISOString rolls over at 05:30 in IST, so
   a child ticking a task after 11pm found it already cleared, and midnight
   itself changed nothing. */
const todayKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

/* A stored array from an older, shorter task list would otherwise leave the
   tasks past its end stuck: done[i] read undefined and the toggle wrote back
   a hole. */
const normalise = (v: unknown, n: number) =>
  Array.from({ length: n }, (_, i) => (Array.isArray(v) ? Boolean(v[i]) : false));

export function DailyChallenge({ lang }: { lang: "te" | "en" }) {
  const [done, setDone] = useState<boolean[]>([false, false, false, false]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CHALLENGE_KEY);
      const saved = raw ? JSON.parse(raw) : null;
      /* Yesterday's ticks are yesterday's. */
      if (saved && saved.date === todayKey()) setDone(normalise(saved.done, CHALLENGE.length));
    } catch {
      /* Storage blocked: the checklist still works for this visit. */
    }
  }, []);

  const toggle = (i: number) =>
    setDone((d) => {
      const next = d.map((v, j) => (j === i ? !v : v));
      buzz(10);
      if (next.every(Boolean) && !d.every(Boolean)) celebrate();
      try {
        localStorage.setItem(CHALLENGE_KEY, JSON.stringify({ date: todayKey(), done: next }));
      } catch {
        /* Nothing to do; the state still holds for this visit. */
      }
      return next;
    });

  const count = done.filter(Boolean).length;

  return (
    <>
      <ul className="grid sm:grid-cols-2 gap-4">
        {CHALLENGE.map((item, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => toggle(i)}
              aria-pressed={done[i]}
              className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)] ${
                done[i]
                  ? "border-[var(--if-gold)]/70 bg-[var(--if-gold)]/20"
                  : "border-white/15 bg-white/6 hover:border-white/35"
              }`}
            >
              <span
                aria-hidden="true"
                className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border-2 transition-colors ${
                  done[i] ? "border-[var(--if-gold-light)] bg-[var(--if-gold-light)]" : "border-[var(--if-gold)]/40"
                }`}
              >
                {done[i] && (
                  <svg viewBox="0 0 20 20" className="h-5 w-5 text-[var(--if-green)]" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 10.5 8 14.5 16 6" />
                  </svg>
                )}
              </span>
              <span className="text-xl" aria-hidden="true">{item.emoji}</span>
              <span className={done[i] ? "text-sm text-white" : "text-sm text-white/85"}>
                {lang === "te" ? item.te : item.en}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-center text-sm font-semibold text-[var(--if-gold-light)]" aria-live="polite">
        {lang === "te"
          ? `\u0c08\u0c30\u0c4b\u0c1c\u0c41 ${count} / ${CHALLENGE.length} \u0c2a\u0c42\u0c30\u0c4d\u0c24\u0c2f\u0c3f\u0c02\u0c26\u0c3f`
          : `${count} of ${CHALLENGE.length} done today`}
      </p>
      <div className="mt-3 mx-auto h-2 w-full max-w-xs overflow-hidden rounded-full bg-white/15">
        <div
          className="h-full rounded-full bg-[var(--if-gold-light)] transition-[width] duration-500"
          style={{ width: `${(count / CHALLENGE.length) * 100}%` }}
        />
      </div>
    </>
  );
}
