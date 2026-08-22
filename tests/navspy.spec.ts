import { test, expect } from "@playwright/test";

/* The navbar underline tracked the last click and nothing else, so it sat
   under the first item — "Victory" — however far down the homepage you
   scrolled. The active item is now driven by scroll position, and this holds
   it there. Desktop only: the spotlight nav is hidden below lg. */
test.describe("navbar follows the scroll", () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) < 1024, "desktop nav only");

  const current = async (page: import("@playwright/test").Page) =>
    page.locator('nav a[aria-current="true"]').first().textContent();

  test("the underline moves as sections pass under the header", async ({ page }) => {
    await page.goto("/");

    // Each section in turn should claim the nav as it reaches the top.
    const seen: string[] = [];
    for (const id of ["victory", "achievements", "manifesto", "schemes", "about", "contact"]) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await page.waitForTimeout(350);
      const label = await current(page);
      expect(label, `nothing marked current while #${id} was at the top`).toBeTruthy();
      seen.push(label!.trim());
    }

    // The point of the fix: it must not be the same item the whole way down.
    expect(new Set(seen).size, `the nav never changed — it stayed on "${seen[0]}"`).toBeGreaterThan(1);
  });

  test("no item is current at the very top of the page", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(350);
    await expect(page.locator('nav a[aria-current="true"]')).toHaveCount(0);
  });
});
