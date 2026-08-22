import { test, expect } from "@playwright/test";
import { lessons } from "../src/content/all-lessons";
import { readingLabelTe } from "../src/content/reading-labels";

/* Lesson `reading` labels are bare strings, so all 147 of them rendered in
   English under a Telugu heading. They are translated through a lookup rather
   than by widening the type in 147 places, and an unmapped label falls back to
   English — which is exactly the failure this test exists to catch, so that a
   new lesson cannot quietly reintroduce it. */
test.describe("further-reading labels are translated", () => {
  const labels = [...new Set(lessons.flatMap((l) => (l.reading ?? []).map((r) => r.label)))];

  test("there are labels to check", () => {
    expect(labels.length).toBeGreaterThan(20);
  });

  test("every label has Telugu", () => {
    const missing = labels.filter((l) => !readingLabelTe[l]);
    expect(
      missing,
      `add these to src/content/reading-labels.ts: ${missing.join(" | ")}`,
    ).toEqual([]);
  });

  test("no translation is left as its English source", () => {
    const untouched = labels.filter((l) => readingLabelTe[l] === l);
    expect(untouched, "these are mapped to themselves").toEqual([]);
  });
});
