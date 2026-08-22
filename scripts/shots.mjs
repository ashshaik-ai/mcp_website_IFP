/* Full-page screenshots of every important route, for before/after comparison
   when making a change that CSS-level tests cannot catch.

   Usage:
     node scripts/shots.mjs before
     node scripts/shots.mjs after
     node scripts/shots.mjs diff      # compares the two sets
*/
import { chromium } from "@playwright/test";
import { mkdir, readdir, readFile } from "node:fs/promises";
import { startServer } from "./lh-server.mjs";

const PORT = 3305;
const mode = process.argv[2] || "before";

const ROUTES = [
  ["home", "/"],
  ["kc", "/knowledge-center"],
  ["sg", "/student-guidance"],
  ["arabic", "/knowledge-center/learn-arabic"],
  ["urdu", "/knowledge-center/learn-urdu"],
  ["quran", "/knowledge-center/learn-quran"],
  ["salah", "/knowledge-center/learn-salah"],
  ["seerah", "/knowledge-center/seerah"],
  ["history", "/knowledge-center/islamic-history"],
  ["kids", "/knowledge-center/kids-islam"],
  ["names", "/knowledge-center/names-of-allah"],
  ["hajj", "/knowledge-center/hajj-umrah"],
  ["special", "/knowledge-center/special-prayers"],
  ["calendar", "/knowledge-center/islamic-calendar"],
  ["womens", "/knowledge-center/womens-guidance"],
  ["lesson", "/knowledge-center/learn-quran/tajweed"],
];

if (mode === "diff") {
  /* Compares decoded pixels, not file bytes. Two runs of identical code do not
     produce byte-identical PNGs -- font rasterisation and animation phase vary
     -- so a byte comparison reports every screenshot as changed and tells you
     nothing. A pixel is "different" only if a channel moves by more than 8/255,
     and a page is flagged only if more than 0.1% of its pixels move. */
  const sharp = (await import("sharp")).default;
  const CHANNEL_TOLERANCE = 8;
  const PIXEL_FRACTION = 0.001;

  const [a, b] = await Promise.all([readdir(".shots/before"), readdir(".shots/after")]);
  const common = a.filter((f) => b.includes(f));
  let changed = 0;

  for (const f of common) {
    const load = (p) => sharp(p).raw().toBuffer({ resolveWithObject: true });
    const [x, y] = await Promise.all([load(`.shots/before/${f}`), load(`.shots/after/${f}`)]);

    if (x.info.width !== y.info.width || x.info.height !== y.info.height) {
      changed++;
      console.log(`RESIZED  ${f}  ${x.info.width}x${x.info.height} -> ${y.info.width}x${y.info.height}`);
      continue;
    }

    const n = Math.min(x.data.length, y.data.length);
    const perPixel = x.info.channels;
    let diff = 0;
    for (let i = 0; i < n; i += perPixel) {
      for (let c = 0; c < perPixel; c++) {
        if (Math.abs(x.data[i + c] - y.data[i + c]) > CHANNEL_TOLERANCE) { diff++; break; }
      }
    }
    const total = n / perPixel;
    const frac = diff / total;
    if (frac > PIXEL_FRACTION) {
      changed++;
      console.log(`CHANGED  ${f}  ${(frac * 100).toFixed(2)}% of pixels`);
    }
  }
  console.log(`\n${changed} of ${common.length} pages changed visibly.`);
  process.exit(changed ? 1 : 0);
}

const dir = `.shots/${mode}`;
await mkdir(dir, { recursive: true });

const server = await startServer(PORT);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

for (const [name, route] of ROUTES) {
  await page.goto(`http://127.0.0.1:${PORT}${route}`, { waitUntil: "networkidle" });
  /* animation: none, not animation-play-state: paused. Pausing freezes each
     infinite animation at whatever phase it happened to reach, so the marquee
     and border beams land somewhere different every run and the diff is all
     noise. Removing the animation resets them to their defined start state,
     which is identical every time. */
  await page.addStyleTag({
    content: `*, *::before, *::after { animation: none !important; transition: none !important; caret-color: transparent !important; }`,
  });
  // Long enough for the count-up tickers (1.4s) to have landed on their value.
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${dir}/${name}.png`, fullPage: true });
  process.stderr.write(`${name} `);
}

await browser.close();
server.stop();
console.log(`\nwrote ${ROUTES.length} screenshots to ${dir}`);
process.exit(0);
