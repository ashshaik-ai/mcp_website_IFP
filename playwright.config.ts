import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PORT ?? 3111);
const BASE_URL = process.env.BASE_URL ?? `http://127.0.0.1:${PORT}`;

/* Tests run against a production build, not the dev server: metadata,
   prerendering and the service worker only behave correctly there. */
export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  /* A quarter of the cores, not the half Playwright takes by default.

     Every route is scanned twice by axe-core, once per viewport, and an axe
     run is a main-thread DOM walk -- the most CPU-hungry thing in the suite.
     At the default eight workers on a sixteen-core machine the suite passes
     268/268 in 1.4 minutes when the machine is idle, and fails about twenty
     of them on 60-second timeouts once the machine is also running an editor,
     a browser and a call. The failures look exactly like real breakage: axe
     never returns, so the error is a timeout with no violation attached.

     Measured on this repo, same commit, same afternoon: 8 workers busy = 20
     failed in 9.0m; 4 workers busy = 268 passed in 4.3m. A gate that only
     works when nobody is using the computer is not a gate. */
  workers: process.env.CI ? 2 : "25%",
  reporter: process.env.CI ? [["list"], ["github"]] : [["list"]],
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
  },
  projects: [
    { name: "mobile", use: { ...devices["Pixel 7"] } },
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: `npx next start -p ${PORT}`,
        url: BASE_URL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
});
