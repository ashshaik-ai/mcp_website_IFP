/* Spaced repetition scheduling.

   A simplified SM-2. The full algorithm tracks an easiness factor per card and
   grades recall on a six-point scale; for letters and vocabulary that is more
   bookkeeping than the material warrants, and a six-point self-grade is a
   worse question than a three-point one. Three grades, fixed intervals, and a
   per-card streak gets the same benefit — recall practice at widening gaps —
   without asking a learner to rate their own memory on a scale they will not
   apply consistently.

   Intervals in days, indexed by streak. A card answered "good" moves one step
   along; "hard" holds position; "again" resets to the start. */
const INTERVALS = [0, 1, 3, 7, 16, 35, 90];

/* "hard" holds the streak, but holding position 0 meant INTERVALS[0] — zero
   days — so a new card graded hard came back due immediately and, being the
   lowest streak in the queue, sorted straight back to the front. The deck
   locked on that one card and no unseen card was ever reached. Holding
   position is right; coming back in ten minutes rather than instantly is what
   makes it a review instead of a loop. */
const HARD_GAP = 10 * 60_000;

export type Grade = "again" | "hard" | "good";

export type CardState = {
  /** How many consecutive successful reviews. Indexes INTERVALS. */
  streak: number;
  /** Epoch ms when this card is next due. */
  due: number;
  /** Epoch ms of the last review, for showing progress. */
  seen: number;
};

export type Deck = Record<string, CardState>;

const DAY = 86_400_000;

export function schedule(prev: CardState | undefined, grade: Grade, now = Date.now()): CardState {
  const streak = prev?.streak ?? 0;

  let next: number;
  if (grade === "again") next = 0;
  else if (grade === "hard") next = Math.max(0, streak);
  else next = Math.min(streak + 1, INTERVALS.length - 1);

  /* "again" is due immediately so the card comes back in the same session —
     that is the point of getting it wrong. */
  const days = grade === "again" ? 0 : INTERVALS[next];
  const gap = grade === "hard" && days === 0 ? HARD_GAP : days * DAY;

  return { streak: next, due: now + gap, seen: now };
}

/** Cards due now, hardest first, with unseen cards introduced after reviews. */
export function dueCards(ids: string[], deck: Deck, now = Date.now()): string[] {
  const seen = ids.filter((id) => deck[id]);
  const unseen = ids.filter((id) => !deck[id]);

  const ready = seen
    .filter((id) => deck[id].due <= now)
    .sort((a, b) => deck[a].streak - deck[b].streak || deck[a].due - deck[b].due);

  return [...ready, ...unseen];
}

export type DeckStats = {
  total: number;
  /** Reviewed at least once. */
  started: number;
  /** Reached the longest interval. */
  mastered: number;
  dueNow: number;
};

export function deckStats(ids: string[], deck: Deck, now = Date.now()): DeckStats {
  const started = ids.filter((id) => deck[id]).length;
  const mastered = ids.filter((id) => (deck[id]?.streak ?? 0) >= INTERVALS.length - 1).length;
  return {
    total: ids.length,
    started,
    mastered,
    dueNow: dueCards(ids, deck, now).filter((id) => deck[id]).length,
  };
}

/** Human-readable gap until the next review, for feedback after grading. */
export function nextGapLabel(state: CardState, lang: "te" | "en"): string {
  const days = Math.round((state.due - state.seen) / DAY);
  if (days <= 0) return lang === "te" ? "ఈ సెషన్‌లో మళ్లీ" : "again this session";
  if (days === 1) return lang === "te" ? "రేపు" : "tomorrow";
  return lang === "te" ? `${days} రోజుల్లో` : `in ${days} days`;
}
