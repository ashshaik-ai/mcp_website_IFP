import { test, expect } from "@playwright/test";
import { events } from "../src/content/events";

/* Content that names a date goes stale on its own. The homepage shipped a
   January 2025 medical camp and a July 2026 admissions deadline under
   "Upcoming Events" months after both had passed, and nothing caught it
   because nothing was looking. This is that guard: dated events must still be
   ahead of the build. When it fails, the fix is to move the date forward, not
   to loosen the test. */
test.describe("upcoming events stay upcoming", () => {
  const dated = events.filter((e) => e.on !== null);

  test("at least one event carries a real date", () => {
    expect(dated.length, "every event went dateless — the guard would pass vacuously").toBeGreaterThan(0);
  });

  for (const e of dated) {
    test(`${e.title.en} (${e.on}) has not already passed`, () => {
      const on = new Date(`${e.on}T23:59:59Z`);
      expect(Number.isNaN(on.getTime()), `${e.on} is not a valid ISO date`).toBe(false);
      expect(
        on.getTime(),
        `"${e.title.en}" is dated ${e.on}, which is in the past. Update src/content/events.ts.`,
      ).toBeGreaterThan(Date.now());
    });
  }

  test("the displayed date agrees with the machine-readable one", () => {
    for (const e of dated) {
      const year = String(new Date(`${e.on}T00:00:00Z`).getUTCFullYear());
      expect(
        `${e.date.en} ${e.date.te}`,
        `"${e.title.en}" shows "${e.date.en}" but is dated ${e.on}`,
      ).toContain(year);
    }
  });
});
