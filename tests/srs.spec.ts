import { test, expect } from "@playwright/test";
import { deckStats, dueCards, schedule, type Deck } from "../src/lib/srs";

/* The scheduler decides when a learner sees a card again, so it is worth
   testing directly rather than only through the UI. */

const DAY = 86_400_000;
const NOW = 1_700_000_000_000;

test.describe("spaced repetition scheduling", () => {
  test("a good answer widens the gap each time", async () => {
    let state = schedule(undefined, "good", NOW);
    const gaps: number[] = [];
    for (let i = 0; i < 6; i++) {
      gaps.push(Math.round((state.due - state.seen) / DAY));
      state = schedule(state, "good", state.due);
    }
    // Strictly increasing until the ceiling, never shrinking.
    for (let i = 1; i < gaps.length; i++) {
      expect(gaps[i], `gap ${i} should not shrink`).toBeGreaterThanOrEqual(gaps[i - 1]);
    }
    expect(gaps[gaps.length - 1]).toBeGreaterThan(gaps[0]);
  });

  test("again resets the streak and is due immediately", async () => {
    let state = schedule(undefined, "good", NOW);
    state = schedule(state, "good", NOW);
    expect(state.streak).toBeGreaterThan(0);

    const failed = schedule(state, "again", NOW);
    expect(failed.streak).toBe(0);
    // Due now, so it comes back in the same session — the point of failing.
    expect(failed.due).toBeLessThanOrEqual(NOW);
  });

  test("hard holds position rather than advancing or resetting", async () => {
    const first = schedule(undefined, "good", NOW);
    const second = schedule(first, "good", NOW);
    const held = schedule(second, "hard", NOW);
    expect(held.streak).toBe(second.streak);
  });

  test("only due cards are queued, and unseen cards come after reviews", async () => {
    const ids = ["a", "b", "c"];
    const deck: Deck = {
      a: { streak: 1, due: NOW - DAY, seen: NOW - 2 * DAY }, // overdue
      b: { streak: 3, due: NOW + 5 * DAY, seen: NOW }, // not due
    };
    const queue = dueCards(ids, deck, NOW);
    expect(queue).toContain("a");
    expect(queue).not.toContain("b");
    // "c" has never been seen, so it is introduced after the review is cleared.
    expect(queue.indexOf("c")).toBeGreaterThan(queue.indexOf("a"));
  });

  test("weaker cards are shown before stronger ones", async () => {
    const ids = ["weak", "strong"];
    const deck: Deck = {
      weak: { streak: 0, due: NOW - DAY, seen: NOW - DAY },
      strong: { streak: 4, due: NOW - DAY, seen: NOW - DAY },
    };
    expect(dueCards(ids, deck, NOW)[0]).toBe("weak");
  });

  test("stats count started, mastered and due separately", async () => {
    const ids = ["a", "b", "c", "d"];
    const deck: Deck = {
      a: { streak: 6, due: NOW + 90 * DAY, seen: NOW }, // mastered
      b: { streak: 1, due: NOW - DAY, seen: NOW - 2 * DAY }, // due
      c: { streak: 2, due: NOW + DAY, seen: NOW }, // started, not due
    };
    const s = deckStats(ids, deck, NOW);
    expect(s).toEqual({ total: 4, started: 3, mastered: 1, dueNow: 1 });
  });
});
