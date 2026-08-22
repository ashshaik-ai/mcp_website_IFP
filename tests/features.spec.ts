import { test, expect } from "@playwright/test";

/* Behaviour tests for the things that actually do something. Each covers a
   bug that shipped: dead tool links, a Zakat threshold that could silently
   drift, progress that did not persist, a search that could not find its own
   headline tool. */

test.describe("Zakat calculator", () => {
  test("computes against the live nisab and respects the threshold", async ({ page }) => {
    await page.goto("/knowledge-center#zakat");
    await page.waitForSelector("#zakat-gold");

    const rates = await page.evaluate(() => fetch("/rates.json").then((r) => r.json()));
    const nisab = Math.min(87.48 * rates.goldGramInr, 612.36 * rates.silverGramInr);

    // Just under nisab: nothing due.
    await page.fill("#zakat-cash", String(Math.floor(nisab - 1)));
    await expect(page.locator("#zakat")).toContainText(/below nisab|తక్కువ/);

    // Just over: 2.5%.
    const over = Math.ceil(nisab + 1000);
    await page.fill("#zakat-cash", String(over));
    const expected = Math.round(over * 0.025).toLocaleString("en-IN");
    await expect(page.locator("#zakat")).toContainText(expected);
  });

  test("clamps debts that exceed assets rather than going negative", async ({ page }) => {
    await page.goto("/knowledge-center#zakat");
    await page.waitForSelector("#zakat-cash");
    await page.fill("#zakat-cash", "1000");
    await page.fill("#zakat-liabilities", "999999");

    // Read the net wealth figure specifically. Asserting on the whole section
    // catches the em-dash in the Telugu disclaimer, not a negative number.
    const netWealth = await page.locator("#zakat dl > div").first().locator("dd").textContent();
    expect(netWealth?.replace(/[^\d-]/g, "")).toBe("0");
  });
});

test.describe("prayer times", () => {
  test("shows all five prayers and a countdown", async ({ page }) => {
    await page.goto("/knowledge-center#prayer-times");
    const card = page.locator("#prayer-times");
    await expect(card.locator("li")).toHaveCount(6); // five prayers plus sunrise
    await expect(card.locator("[aria-live]")).toContainText(/\d/);
    // Times must be real clock values, not placeholders.
    await expect(card).toContainText(/\d{1,2}:\d{2}\s?(AM|PM)/);
  });
});

test.describe("site search", () => {
  test("does not fetch its index until opened", async ({ page }) => {
    await page.goto("/");
    const before = await page.evaluate(
      () =>
        performance.getEntriesByType("resource").filter((r) => r.name.includes("search-index"))
          .length,
    );
    expect(before).toBe(0);
  });

  test("finds pages, lessons, words, careers and tools", async ({ page }) => {
    await page.goto("/");
    await page.locator("header button").filter({ hasNotText: /.+/ }).first().click();
    const input = page.locator('div[role=dialog] input[type=search]');
    await expect(input).toBeVisible();

    for (const [query, expected] of [
      ["zakat", /Zakat|జకాత్/],
      /* Telugu transliterates this as both హిజ్రా and హిజ్రత్, so match the stem
         they share rather than one spelling. */
      ["hijrah", /Hijrah|హిజ్ర/],
      /* The Telugu alternative has to cover both కరుణ and కారుణ్యం: the top hit
         for this query is now the Mercy and majesty lesson, whose Telugu title
         uses the longer stem. */
      ["mercy", /Mercy|కరుణ|కారుణ్య/],
    ] as const) {
      await input.fill(query);
      await expect(page.locator("#search-results li").first()).toContainText(expected);
    }
  });

  test("Enter navigates to the top result", async ({ page }) => {
    await page.goto("/");
    await page.locator("header button").filter({ hasNotText: /.+/ }).first().click();
    const input = page.locator('div[role=dialog] input[type=search]');
    await input.fill("hijrah");
    await expect(page.locator("#search-results li").first()).toBeVisible();
    await input.press("Enter");
    await expect(page).toHaveURL(/\/knowledge-center\/seerah\//);
  });
});

test.describe("lesson progress", () => {
  test("persists across a reload and clears when untoggled", async ({ page }) => {
    const lesson = "/knowledge-center/learn-quran/whatis";
    await page.goto(lesson);
    const mark = page.locator("button[aria-pressed][aria-label]").last();

    await expect(mark).toHaveAttribute("aria-pressed", "false");
    await mark.click();
    await expect(mark).toHaveAttribute("aria-pressed", "true");

    await page.reload();
    const after = page.locator("button[aria-pressed][aria-label]").last();
    await expect(after).toHaveAttribute("aria-pressed", "true");

    await after.click();
    await expect(after).toHaveAttribute("aria-pressed", "false");
    const stored = await page.evaluate(() => localStorage.getItem("if-progress-v1"));
    expect(stored).toBe("{}");
  });
});

test.describe("lessons", () => {
  test("quiz marks a correct answer", async ({ page }) => {
    await page.goto("/knowledge-center/learn-quran/whatis");
    const options = page.locator("#main button[aria-pressed]");
    await expect(options.first()).toBeVisible();
    // Try each option until the right one is found; the answer index varies.
    const count = await options.count();
    for (let i = 0; i < Math.min(count, 4); i++) {
      await options.nth(i).click();
      const feedback = await page.locator("[aria-live]").first().textContent();
      if (feedback && /Correct|సరైనది/.test(feedback)) return;
    }
    throw new Error("No option produced a correct-answer response");
  });

  test("prev/next navigation links to a real sibling", async ({ page }) => {
    await page.goto("/knowledge-center/learn-quran/begin");
    const nav = page.locator('nav[aria-label] a');
    await expect(nav.first()).toBeVisible();
    const href = await nav.first().getAttribute("href");
    expect(href).toMatch(/^\/knowledge-center\/learn-quran\//);
    const res = await page.request.get(href!);
    expect(res.status()).toBe(200);
  });
});

test.describe("language toggle", () => {
  test("switches content and survives navigation", async ({ page }) => {
    await page.goto("/student-guidance");
    // Matched on the visible label rather than an exact aria-label string:
    // the accessible name now leads with what the button says, so a voice
    // control user can act on what they see.
    const toggle = page.getByRole("button", { name: /switch language|భాష మార్చండి/ }).first();
    const heading = page.locator("h1");
    const before = await heading.textContent();
    await toggle.click();
    await expect(heading).not.toHaveText(before ?? "");

    await page.goto("/knowledge-center");
    // The choice is remembered rather than resetting on every page.
    await expect(page.locator("h1")).toContainText(/Knowledge Center/);
  });
});

test.describe("review deck", () => {
  test("flips, grades, advances, and persists across a reload", async ({ page }) => {
    await page.goto("/knowledge-center/learn-arabic#review");
    const review = page.locator("#review");
    await review.scrollIntoViewIfNeeded();

    const reveal = review.getByRole("button", { name: /Show answer|సమాధానం/ });
    await expect(reveal).toBeVisible();

    // The prompt is the script glyph; the answer is hidden until asked for.
    const firstFront = await review.locator(".font-arabic").first().textContent();
    expect(firstFront?.trim().length).toBeGreaterThan(0);

    await reveal.click();
    const good = review.getByRole("button", { name: /Got it|తెలుసు/ });
    await expect(good).toBeVisible();
    await good.click();

    // Grading advances to a different card and records the review.
    await expect(review.getByRole("button", { name: /Show answer|సమాధానం/ })).toBeVisible();
    const stored = await page.evaluate(() => localStorage.getItem("if-decks-v1"));
    expect(stored, "grading should be recorded").toContain("arabic-letters");

    await page.reload();
    await page.locator("#review").scrollIntoViewIfNeeded();
    const after = await page.evaluate(() => localStorage.getItem("if-decks-v1"));
    expect(after).toContain("arabic-letters");
  });

  test("switching decks keeps their schedules separate", async ({ page }) => {
    await page.goto("/knowledge-center/learn-urdu#review");
    const review = page.locator("#review");
    await review.scrollIntoViewIfNeeded();

    await review.getByRole("button", { name: /Show answer|సమాధానం/ }).click();
    await review.getByRole("button", { name: /Got it|తెలుసు/ }).click();

    await review.getByRole("tab", { name: /Words|పదాలు/ }).click();
    await expect(review.getByRole("button", { name: /Show answer|సమాధానం/ })).toBeVisible();

    const stored = await page.evaluate(() =>
      JSON.parse(localStorage.getItem("if-decks-v1") ?? "{}"),
    );
    expect(Object.keys(stored)).toContain("urdu-letters");
    // Grading letters must not have touched the words deck.
    expect(stored["urdu-words"] ?? {}).toEqual({});
  });
});
