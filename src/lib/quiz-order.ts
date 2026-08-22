/* Quiz option ordering.

   Every one of the 225 quiz questions on the site was authored with
   `answer: 0`, and the options render in array order, so the first option was
   always right. A reader could score full marks on every lesson without
   reading a word of it.

   Rather than re-index 225 hand-written questions and hope nobody adds a
   226th the same way, the order is derived here. The shuffle is seeded from
   the question text, which makes it:
     - stable between server render and hydration, so React sees no mismatch,
     - stable across reloads, so an answer does not move under the reader,
     - different from question to question, which is the point.

   Authors can keep writing `answer: 0`; it no longer means "first". */

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** mulberry32 — small, fast, and good enough to place four options. */
function rng(seed: number): () => number {
  return () => {
    seed = (seed + 0x6d2b79f5) >>> 0;
    let t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type QuizOrder = {
  /** Original option indices, in the order they should be shown. */
  order: number[];
  /** Where the correct option ended up, as a position in `order`. */
  answer: number;
};

export function quizOrder(seedText: string, count: number, answer: number): QuizOrder {
  const order = Array.from({ length: count }, (_, i) => i);
  const next = rng(hash(seedText));
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return { order, answer: order.indexOf(answer) };
}
