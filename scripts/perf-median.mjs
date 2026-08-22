/* Median of N Lighthouse runs against one server.

   A single run on a developer laptop swings five points or more, which is wider
   than most individual optimisations. Several changes in a row were judged on
   single runs and the readings disagreed with each other; this exists so that
   does not happen again.

   Usage:
     node scripts/perf-median.mjs            # 5 runs of /
     RUNS=3 ROUTE=knowledge-center node scripts/perf-median.mjs
*/
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
import { startServer } from "./lh-server.mjs";

const PORT = 3308;
const RUNS = Number(process.env.RUNS || 5);

// MSYS rewrites anything path-shaped, so a bare "/" arrives mangled.
const raw = (process.env.ROUTE || "").replace(/^.*?Program Files\/Git\/?/, "/").trim();
const route = raw ? (raw.startsWith("/") ? raw : "/" + raw) : "/";

const server = await startServer(PORT);
const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless=new", "--no-sandbox"] });

const runs = [];
for (let i = 0; i < RUNS; i++) {
  const { lhr } = await lighthouse(
    `http://127.0.0.1:${PORT}${route}`,
    { port: chrome.port, output: "json", logLevel: "error" },
    { extends: "lighthouse:default", settings: { formFactor: "mobile", screenEmulation: { mobile: true }, onlyCategories: ["performance"] } },
  );
  const m = lhr.audits.metrics?.details?.items?.[0] ?? {};
  runs.push({
    score: Math.round(lhr.categories.performance.score * 100),
    fcp: Math.round(m.firstContentfulPaint ?? 0),
    lcp: Math.round(m.largestContentfulPaint ?? 0),
    tbt: Math.round(m.totalBlockingTime ?? 0),
    si: Math.round(m.speedIndex ?? 0),
    cls: Number((m.cumulativeLayoutShift ?? 0).toFixed(3)),
  });
  process.stderr.write(`run ${i + 1}/${RUNS}: ${runs[i].score}\n`);
}

const median = (key) => {
  const v = runs.map((r) => r[key]).sort((a, b) => a - b);
  return v[Math.floor(v.length / 2)];
};
const spread = (key) => {
  const v = runs.map((r) => r[key]);
  return Math.max(...v) - Math.min(...v);
};

console.log(`\n${route}  (median of ${RUNS})`);
console.log(`  score  ${String(median("score")).padStart(5)}   spread ${spread("score")}`);
for (const k of ["fcp", "lcp", "tbt", "si"]) {
  console.log(`  ${k.toUpperCase().padEnd(5)}  ${String(median(k)).padStart(5)}   spread ${spread(k)}`);
}
console.log(`  CLS    ${median("cls")}`);
console.log(`  all scores: ${runs.map((r) => r.score).join(" ")}`);

await chrome.kill();
server.stop();
process.exit(0);
