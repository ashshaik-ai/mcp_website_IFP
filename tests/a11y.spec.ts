import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { routes as catalogRoutes } from "../src/lib/site";
import { lessons } from "../src/content/all-lessons";
import { surahIndex } from "../src/content/quran-index";

/* Automated WCAG checks with axe.

   The quality suite covers structure — landmarks, headings, target size — but
   it cannot see whether a button has an accessible name or whether text meets
   contrast. Those were found by a Lighthouse run that happened to be pointed
   at one page: an icon-only carousel control announcing as just "button", and
   a language toggle whose accessible name did not contain its visible label,
   so voice control users saying what they could see matched nothing.

   Finding those by luck is not a strategy, hence this. */

/* One page of each shape rather than all 69: axe is slow, and a violation is
   almost always in a shared component, so a representative sample catches it
   without adding four minutes to every run. */
const SAMPLE = [
  "/",
  "/knowledge-center",
  "/student-guidance",
  "/knowledge-center/learn-arabic",
  "/knowledge-center/learn-urdu",
  "/knowledge-center/islamic-history",
  "/knowledge-center/womens-guidance",
  `/knowledge-center/${lessons[0].portal}/${lessons[0].slug}`,
  /* The reader is two shapes of its own: a list of 114 links, and a page of
     Arabic, transliteration and Telugu with a row of toggles above it. */
  "/knowledge-center/learn-quran/read",
  "/knowledge-center/learn-quran/qaida",
  "/knowledge-center/learn-quran/read/1",
];

// Guard against a route being renamed out from under the sample.
const known = new Set([
  ...catalogRoutes.map((r) => r.path),
  ...lessons.map((l) => `/knowledge-center/${l.portal}/${l.slug}`),
  "/knowledge-center/learn-quran/read",
  "/knowledge-center/learn-quran/qaida",
  ...surahIndex.map((s) => `/knowledge-center/learn-quran/read/${s.n}`),
]);

for (const route of SAMPLE) {
  test(`no WCAG A/AA violations: ${route}`, async ({ page }) => {
    expect(known.has(route), `${route} is not a real route`).toBe(true);

    await page.goto(route, { waitUntil: "networkidle" });
    /* Below-fold entrances are held until scrolled into view, and a held
       element sits at its first keyframe — opacity 0 — which axe reads as
       text with no contrast. Sweep the page so everything has revealed, then
       let the last entrance finish before scanning. A reader who never
       scrolls never sees that content either; this evaluates what is seen. */
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.8;
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(1200);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const summary = results.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      help: v.help,
      nodes: v.nodes.slice(0, 3).map((n) => n.html.slice(0, 120)),
    }));

    expect(summary, `${route} axe violations`).toEqual([]);
  });
}
