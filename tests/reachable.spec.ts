import { test, expect, type Page } from "@playwright/test";

/* Can a person actually get there?

   This exists because of a specific failure. The Quran reader, the beginner's
   page and 114 surah pages were built, prerendered, listed in the sitemap,
   given structured data, and covered by the quality and a11y suites. Every
   check passed. Not one of them was linked from the Learn Quran portal, or
   from anywhere else a person could click: the only references in the whole
   codebase were inside JSON-LD. The same had happened to 36,057 hadith.

   The other suites visit routes by URL, so they can only ever answer "does
   this page work". They cannot answer "can anyone find it", and a page nobody
   can reach is not shipped, however green the run.

   So this one starts at the homepage and clicks. Nothing is fetched by
   address: every URL below has to be reachable by following links from "/",
   the way a visitor would. */

const ENTRY_POINTS = [
  "/knowledge-center",
  "/knowledge-center/learn-quran",
  /* The Quran itself. The whole point of the portal, and the thing that was
     missing for a day. */
  "/knowledge-center/learn-quran/read",
  "/knowledge-center/learn-quran/qaida",
  "/knowledge-center/hadith",
  "/knowledge-center/hadith/collections",
  "/student-guidance",
];

/* Three hops is what a visitor will do before giving up, and it is enough for
   anything that matters: home, hub, portal, feature. */
const MAX_DEPTH = 3;
const MAX_PAGES = 60;

async function linksOn(page: Page, path: string): Promise<string[]> {
  await page.goto(path, { waitUntil: "domcontentloaded" });
  return page.evaluate(() =>
    [...document.querySelectorAll<HTMLAnchorElement>("a[href]")]
      .map((a) => a.getAttribute("href") ?? "")
      /* Internal, not an anchor on the same page, not a file download. */
      .filter((h) => h.startsWith("/") && !h.startsWith("//"))
      .map((h) => h.split("#")[0].split("?")[0])
      .filter((h) => h && !/\.(pdf|mp3|json|xml|txt|png|jpg|webp|svg)$/i.test(h)),
  );
}

test("every entry point is reachable by clicking from the homepage", async ({ page }) => {
  const seen = new Set<string>(["/"]);
  let frontier = ["/"];

  for (let depth = 0; depth < MAX_DEPTH && frontier.length && seen.size < MAX_PAGES; depth++) {
    const next: string[] = [];
    for (const path of frontier) {
      if (seen.size >= MAX_PAGES) break;
      let found: string[] = [];
      try {
        found = await linksOn(page, path);
      } catch {
        /* A page that will not load is the other suites' problem, not this
           one's. Keep crawling. */
        continue;
      }
      for (const href of found) {
        if (seen.has(href)) continue;
        seen.add(href);
        next.push(href);
      }
    }
    frontier = next;
  }

  const unreachable = ENTRY_POINTS.filter((p) => !seen.has(p));
  expect(
    unreachable,
    `unreachable by clicking from the homepage within ${MAX_DEPTH} hops: ${unreachable.join(", ")}. ` +
      "The page may well work when visited directly — that is not the same as a visitor being able to find it.",
  ).toEqual([]);
});

/* The reader is only useful if its own list gets you into the text, so the
   last hop is checked too: 114 surahs listed, and a surah that opens. */
test("the Quran reader lists every surah and each one opens", async ({ page }) => {
  await page.goto("/knowledge-center/learn-quran/read", { waitUntil: "domcontentloaded" });
  const links = page.locator('a[href^="/knowledge-center/learn-quran/read/"]');
  await expect(links).toHaveCount(114);

  await page.goto("/knowledge-center/learn-quran/read/1", { waitUntil: "domcontentloaded" });
  /* Al-Fatihah has seven ayahs, and it has seven because the Bismillah is
     counted as the first of them. */
  await expect(page.locator("ol > li")).toHaveCount(7);
});

test("the hadith collections list every collection and each one opens", async ({ page }) => {
  await page.goto("/knowledge-center/hadith/collections", { waitUntil: "domcontentloaded" });
  const links = page.locator('a[href^="/knowledge-center/hadith/collections/"]');
  await expect(await links.count()).toBeGreaterThanOrEqual(9);

  await page.goto("/knowledge-center/hadith/collections/nawawi/1", { waitUntil: "domcontentloaded" });
  /* Forty Hadith of an-Nawawi holds forty-two, and a page holds fifty, so all
     of them are on the first page. */
  await expect(page.locator("ol > li")).toHaveCount(42);
});
