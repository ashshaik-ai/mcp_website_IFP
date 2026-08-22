import { test, expect } from "@playwright/test";
import { lessons } from "../src/content/all-lessons";
import { readFileSync } from "node:fs";

/* The Knowledge Center hub advertised "6 Levels · 20+ Lessons" for a portal
   holding six, and "10 Prayers … Tahajjud, Istikhara, Janaza" for a portal
   holding five, none of them Janaza. Nothing checked the claims against the
   content, so they drifted quietly.

   This asserts the numbers a reader is shown are numbers the site can back
   up. It is deliberately narrow: it reads the "N Lessons" claims out of the
   hub source and compares them with the catalog. */
test.describe("portal claims match the catalog", () => {
  const counts = lessons.reduce<Record<string, number>>((acc, l) => {
    acc[l.portal] = (acc[l.portal] ?? 0) + 1;
    return acc;
  }, {});

  const hub = readFileSync("src/app/knowledge-center/client.tsx", "utf8");

  // Each portal block: id, then the first `en:` string inside its meta.
  const blocks = [...hub.matchAll(/id:\s*"([a-z-]+)",[\s\S]*?meta:\s*\{[^}]*en:\s*"([^"]+)"/g)];

  test("the hub lists every portal that has lessons", () => {
    expect(blocks.length, "could not parse the portals array — has its shape changed?").toBeGreaterThan(5);
  });

  for (const [, id, meta] of blocks) {
    const claim = meta.match(/(\d+)\+?\s+Lessons?/i);
    if (!claim) continue;
    test(`${id} claims "${claim[0]}" and has ${counts[id] ?? 0}`, () => {
      const claimed = Number(claim[1]);
      const actual = counts[id] ?? 0;
      const plus = claim[0].includes("+");
      if (plus) {
        expect(actual, `"${meta}" promises more than ${claimed}`).toBeGreaterThanOrEqual(claimed);
      } else {
        expect(actual, `"${meta}" does not match the catalog`).toBe(claimed);
      }
    });
  }
});
