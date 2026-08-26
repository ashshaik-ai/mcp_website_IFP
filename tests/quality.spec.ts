import { test, expect, type Page } from "@playwright/test";
import { routes as catalogRoutes } from "../src/lib/site";
import { lessons } from "../src/content/all-lessons";

/* The site-wide guarantees, checked on every route in the sitemap.

   These are not aspirational: every one of them was broken at some point and
   fixed, so each assertion is protecting a specific regression rather than
   stating a general hope. The sitemap is the source of truth for the route
   list, so a new lesson is covered the moment it is added. */

/* Read from the same modules the sitemap is generated from, rather than the
   built sitemap.xml — Next emits that as a route, not a file on disk, and a
   test that silently falls back to three routes is worse than no test. */
/* quran-sample: six of the 114 surah pages, not all of them.

   Every surah renders through one component, so the 114 differ in content and
   not in structure -- running all of them would add 228 tests to a suite that
   already takes minutes, to re-prove the same markup 114 times. These six are
   the ones that take a different path through the code: the shortest, the
   longest, the one whose Bismillah is ayah 1, the one that has no Bismillah at
   all, one carrying a sajda marker, and the last surah. */
const QURAN_SAMPLE = [1, 9, 32, 108, 2, 114].map(
  (n) => `/knowledge-center/learn-quran/read/${n}`,
);

const routes: string[] = [
  ...catalogRoutes.map((r) => r.path),
  ...lessons.map((l) => `/knowledge-center/${l.portal}/${l.slug}`),
  "/knowledge-center/learn-quran/read",
  "/knowledge-center/learn-quran/qaida",
  "/knowledge-center/hadith/collections",
  "/knowledge-center/hadith/collections/nawawi",
  "/knowledge-center/hadith/collections/nawawi/1",
  "/knowledge-center/hadith/collections/tirmidhi/1",
  "/knowledge-center/hadith/collections/bukhari/64/2",
  ...QURAN_SAMPLE,
];

async function settle(page: Page) {
  await page.evaluate(async () => {
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((r) => setTimeout(r, 250));
  });
}

test.describe("every route", () => {
  for (const route of routes) {
    test(`is sound: ${route}`, async ({ page }) => {
      const consoleErrors: string[] = [];
      const badResponses: string[] = [];
      page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text()));
      page.on("pageerror", (e) => consoleErrors.push(String(e)));
      page.on("response", (r) => {
        if (r.status() >= 400) badResponses.push(`${r.status()} ${r.url()}`);
      });

      const res = await page.goto(route, { waitUntil: "networkidle" });
      expect(res?.status(), `${route} should not error`).toBeLessThan(400);
      await settle(page);

      const audit = await page.evaluate(() => {
        const levels = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map(
          (h) => +h.tagName[1],
        );
        const skips: string[] = [];
        for (let i = 1; i < levels.length; i++) {
          if (levels[i] - levels[i - 1] > 1) skips.push(`h${levels[i - 1]} -> h${levels[i]}`);
        }

        // The skip link is sr-only until focused; that is the point of it.
        const small = [
          ...document.querySelectorAll("button,a,input,select,[role=button],summary"),
        ]
          .filter((el) => {
            const cs = getComputedStyle(el);
            const r = el.getBoundingClientRect();
            if (cs.display === "none" || cs.visibility === "hidden" || !r.width || !r.height)
              return false;
            if (el.matches('a[href="#main"]')) return false;
            return r.width < 24 || r.height < 24;
          })
          .map((el) => {
            const r = el.getBoundingClientRect();
            return `${el.tagName} "${el.textContent?.trim().slice(0, 20)}" ${Math.round(r.width)}x${Math.round(r.height)}`;
          });

        const deadFragments = [...document.querySelectorAll('a[href^="#"]')]
          .map((a) => a.getAttribute("href") as string)
          .filter((h) => h !== "#main")
          .filter((h) => h === "#" || !document.getElementById(h.slice(1)));

        return {
          skips,
          small,
          deadFragments,
          h1Count: document.querySelectorAll("h1").length,
          hasMain: !!document.querySelector("main#main"),
          hasSkipLink: !!document.querySelector('a[href="#main"]'),
          hasCanonical: !!document.querySelector("link[rel=canonical]"),
          jsonLd: document.querySelectorAll('script[type="application/ld+json"]').length,
          imagesWithoutAlt: [...document.images].filter((i) => !i.hasAttribute("alt")).length,
          overflows:
            document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
          title: document.title,
        };
      });

      expect(consoleErrors, `${route} console errors`).toEqual([]);
      expect(badResponses, `${route} failed requests`).toEqual([]);
      expect(audit.skips, `${route} heading levels must not skip`).toEqual([]);
      expect(audit.small, `${route} controls below the 24px WCAG floor`).toEqual([]);
      expect(audit.deadFragments, `${route} fragment links with no target`).toEqual([]);
      expect(audit.h1Count, `${route} needs exactly one h1`).toBe(1);
      expect(audit.hasMain, `${route} needs a main landmark`).toBe(true);
      expect(audit.hasSkipLink, `${route} needs a skip link`).toBe(true);
      expect(audit.hasCanonical, `${route} needs a canonical`).toBe(true);
      expect(audit.jsonLd, `${route} needs structured data`).toBeGreaterThan(0);
      expect(audit.imagesWithoutAlt, `${route} images missing alt`).toBe(0);
      expect(audit.overflows, `${route} must not scroll sideways`).toBe(false);
      expect(audit.title.length, `${route} needs a title`).toBeGreaterThan(5);
    });
  }
});

test("page titles are unique across the site", async ({ page }) => {
  const seen = new Map<string, string>();
  // A sample keeps this quick while still catching a template that forgets
  // to vary — the failure mode is every page sharing one title.
  const sample = routes.filter((_, i) => i % 4 === 0);
  for (const route of sample) {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    const title = await page.title();
    const clash = seen.get(title);
    expect(clash, `"${title}" is used by both ${clash} and ${route}`).toBeUndefined();
    seen.set(title, route);
  }
});
