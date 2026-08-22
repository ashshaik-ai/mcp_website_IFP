"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { RotateCcw, Volume2 } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { useDecks } from "@/lib/decks";
import { deckStats, dueCards, nextGapLabel, schedule, type Grade } from "@/lib/srs";

const copy = {
  heading: { te: "పునరావృత్తి", en: "Review" },
  blurb: {
    te: "గుర్తుకు తెచ్చుకోవడానికి ప్రయత్నించండి, తర్వాత తిప్పి చూడండి. మీరు కష్టపడిన కార్డులు త్వరగా, తెలిసినవి ఆలస్యంగా తిరిగి వస్తాయి.",
    en: "Try to recall it, then flip. Cards you struggle with come back sooner; ones you know come back later.",
  },
  reveal: { te: "సమాధానం చూపండి", en: "Show answer" },
  again: { te: "మళ్లీ", en: "Again" },
  hard: { te: "కష్టం", en: "Hard" },
  good: { te: "తెలుసు", en: "Got it" },
  play: { te: "ఉచ్చారణ వినండి", en: "Play pronunciation" },
  doneTitle: { te: "ఇప్పటికి అంతే", en: "Nothing due" },
  doneBody: {
    te: "ఈ డెక్‌లో ఇప్పుడు సమీక్షించాల్సినవి లేవు. తర్వాత తిరిగి రండి.",
    en: "No cards are due right now. Come back later.",
  },
  started: { te: "ప్రారంభించినవి", en: "started" },
  mastered: { te: "పూర్తిగా తెలిసినవి", en: "mastered" },
  due: { te: "ఇప్పుడు సిద్ధం", en: "due now" },
  reset: { te: "పురోగతిని రీసెట్ చేయండి", en: "Reset progress" },
  next: { te: "తదుపరి:", en: "Next:" },
  saved: { te: "ఈ బ్రౌజర్‌లో మాత్రమే సేవ్ అవుతుంది", en: "Saved in this browser only" },
} as const;

export type ReviewCard = {
  id: string;
  /** Shown first — the prompt to recall from. */
  front: string;
  /** Shown after flipping. */
  back: string;
  hint?: string;
  audio?: string | null;
  /** Font class for the front face, for Arabic and Urdu script. */
  frontClass?: string;
  frontLang?: string;
};

const GRADES: { key: Grade; tone: string }[] = [
  { key: "again", tone: "border-red-300 text-red-700 hover:bg-red-50" },
  { key: "hard", tone: "border-amber-300 text-amber-800 hover:bg-amber-50" },
  { key: "good", tone: "border-emerald-400 text-emerald-800 hover:bg-emerald-50" },
];

export function ReviewDeck({ name, cards }: { name: string; cards: ReviewCard[] }) {
  const { lang } = useI18n();
  const { ready, deck, grade, reset } = useDecks();
  const [flipped, setFlipped] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  /* Reading the clock during render is impure and can disagree between the
     server pass and hydration. It is captured once after mount and refreshed
     on each grade, which is the only time the due set can change. */
  const [now, setNow] = useState(0);
  useEffect(() => setNow(Date.now()), []);
  const bump = useCallback(() => setNow(Date.now()), []);

  const ids = useMemo(() => cards.map((c) => c.id), [cards]);
  const current = deck(name);

  const queue = useMemo(
    () => (ready && now ? dueCards(ids, current, now) : []),
    [ids, current, ready, now],
  );

  const stats = useMemo(
    () => deckStats(ids, current, now || 0),
    [ids, current, now],
  );

  const card = cards.find((c) => c.id === queue[0]) ?? null;

  const play = useCallback((src?: string | null) => {
    if (!src) return;
    new Audio(src).play().catch(() => {});
  }, []);

  const onGrade = (g: Grade) => {
    if (!card) return;
    const projected = schedule(current[card.id], g);
    setFeedback(`${copy.next[lang]} ${nextGapLabel(projected, lang)}`);
    grade(name, card.id, g);
    setFlipped(false);
    bump();
  };

  if (!ready) {
    return <div className="min-h-[19rem] rounded-2xl border border-[var(--if-gold)]/20 bg-white" />;
  }

  return (
    <div>
      <p className="text-[var(--if-text-muted)] mb-4 text-pretty max-w-2xl">{copy.blurb[lang]}</p>

      <dl className="flex flex-wrap gap-x-6 gap-y-1 mb-5 text-sm tabular-nums">
        {[
          [stats.started, copy.started[lang]],
          [stats.mastered, copy.mastered[lang]],
          [stats.dueNow, copy.due[lang]],
        ].map(([n, label]) => (
          <div key={String(label)} className="flex items-baseline gap-1.5">
            <dt className="sr-only">{String(label)}</dt>
            <dd>
              <b className="text-[var(--if-green)]">{String(n)}</b>{" "}
              <span className="text-[var(--if-text-muted)]">{String(label)}</span>
            </dd>
          </div>
        ))}
        <div className="flex items-baseline gap-1.5">
          <dd className="text-[var(--if-text-muted)]">/ {stats.total}</dd>
        </div>
      </dl>

      {!card ? (
        <div className="rounded-2xl border border-[var(--if-gold)]/20 bg-white p-10 text-center">
          <h3 className="font-display text-xl font-bold text-[var(--if-green)]">
            {copy.doneTitle[lang]}
          </h3>
          <p className="mt-2 text-sm text-[var(--if-text-muted)] text-pretty">
            {copy.doneBody[lang]}
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border border-[var(--if-gold)]/25 bg-white overflow-hidden">
          <div className="p-8 min-h-[13rem] flex flex-col items-center justify-center gap-3 text-center">
            <span
              dir={card.frontLang ? "rtl" : undefined}
              lang={card.frontLang}
              className={`${card.frontClass ?? "font-display"} text-5xl text-[var(--if-green)] leading-none`}
            >
              {card.front}
            </span>

            {card.audio && (
              <button
                type="button"
                onClick={() => play(card.audio)}
                aria-label={copy.play[lang]}
                className="inline-flex items-center gap-2 min-h-11 px-4 rounded-full border border-[var(--if-gold)]/40 text-sm font-semibold text-[var(--if-green)] hover:bg-[var(--if-gold)]/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]"
              >
                <Volume2 aria-hidden="true" className="h-4 w-4" />
                {copy.play[lang]}
              </button>
            )}

            <div aria-live="polite" className="min-h-[3.5rem] flex flex-col justify-center">
              {flipped ? (
                <>
                  <span className="text-xl font-semibold text-[var(--if-text)]">{card.back}</span>
                  {card.hint && (
                    <span className="mt-1 block text-sm text-[var(--if-text-muted)]">
                      {card.hint}
                    </span>
                  )}
                </>
              ) : (
                <span className="text-sm text-[var(--if-text-muted)]">{feedback ?? " "}</span>
              )}
            </div>
          </div>

          <div className="border-t border-[var(--if-gold)]/15 p-4">
            {!flipped ? (
              <button
                type="button"
                onClick={() => setFlipped(true)}
                className="w-full min-h-11 rounded-full bg-[var(--if-green)] text-[var(--if-gold-light)] font-semibold text-sm hover:bg-[var(--if-green)]/90 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]"
              >
                {copy.reveal[lang]}
              </button>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {GRADES.map((g) => (
                  <button
                    key={g.key}
                    type="button"
                    onClick={() => onGrade(g.key)}
                    className={`min-h-11 rounded-full border bg-white font-semibold text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)] ${g.tone}`}
                  >
                    {copy[g.key][lang]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <span className="text-xs text-[var(--if-text-muted)]">{copy.saved[lang]}</span>
        {stats.started > 0 && (
          <button
            type="button"
            onClick={() => {
              reset(name);
              setFlipped(false);
              setFeedback(null);
              bump();
            }}
            className="inline-flex items-center gap-1.5 min-h-11 text-xs font-semibold text-[var(--if-text-muted)] hover:text-[var(--if-green)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)] rounded"
          >
            <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
            {copy.reset[lang]}
          </button>
        )}
      </div>
    </div>
  );
}
