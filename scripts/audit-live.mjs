/* Lighthouse audit over a representative set of routes.

   Runs against a local production build by default. Point it at the live URL
   with an argument, but note that Vercel's bot mitigation challenges headless
   traffic — a burst of automated requests to production will be served an
   interstitial rather than the site, which is a false failure, not a finding.

   Usage:
     node scripts/audit-live.mjs                       # local production build
     node scripts/audit-live.mjs https://example.com   # a deployed origin
*/
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BASE = (process.argv[2] || "").replace(/\/$/, "");
const PORT = 3399;

/* One of each shape: the marketing homepage, a hub, a data-heavy filter page,
   an interactive portal, and a long lesson. Auditing all 69 would take an hour
   and tell us nothing the five do not. */
const ROUTES = [
  "/",
  "/knowledge-center",
  "/student-guidance",
  "/knowledge-center/learn-arabic",
  "/knowledge-center/learn-quran/whatis",
];

const THRESHOLDS = {
  performance: 0.85,
  accessibility: 0.95,
  "best-practices": 0.9,
  seo: 0.95,
};

function startServer() {
  return new Promise((resolve, reject) => {
    const proc = spawn("npx", ["next", "start", "-p", String(PORT)], {
      cwd: ROOT,
      shell: true,
      stdio: ["ignore", "pipe", "pipe"],
    });
    const timer = setTimeout(() => reject(new Error("Server did not start in 60s")), 60_000);
    const onData = (buf) => {
      if (/Ready|started server|Local:/i.test(String(buf))) {
        clearTimeout(timer);
        setTimeout(() => resolve(proc), 800);
      }
    };
    proc.stdout.on("data", onData);
    proc.stderr.on("data", onData);
    proc.on("error", reject);
  });
}

const origin = BASE || `http://127.0.0.1:${PORT}`;
const server = BASE ? null : await startServer();
const chrome = await chromeLauncher.launch({
  chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu"],
});

const rows = [];
const failures = [];

try {
  for (const route of ROUTES) {
    const result = await lighthouse(
      origin + route,
      { port: chrome.port, output: "json", logLevel: "error" },
      {
        extends: "lighthouse:default",
        settings: { formFactor: "mobile", screenEmulation: { mobile: true } },
      },
    );

    const cats = result.lhr.categories;
    const audits = result.lhr.audits;
    const row = {
      route,
      scores: Object.fromEntries(
        Object.entries(cats).map(([k, c]) => [k, c.score == null ? null : Math.round(c.score * 100)]),
      ),
      lcp: audits["largest-contentful-paint"]?.displayValue ?? "-",
      cls: audits["cumulative-layout-shift"]?.displayValue ?? "-",
      tbt: audits["total-blocking-time"]?.displayValue ?? "-",
    };
    rows.push(row);

    for (const [key, min] of Object.entries(THRESHOLDS)) {
      const score = cats[key]?.score;
      if (score != null && score < min) {
        failures.push(`${route} ${key} ${Math.round(score * 100)} < ${Math.round(min * 100)}`);
      }
    }
  }
} finally {
  await chrome.kill();
  if (server) server.kill();
}

const pad = (s, n) => String(s).padEnd(n);
console.log(`\nLighthouse (mobile) — ${origin}\n`);
console.log(
  `${pad("route", 40)}${pad("perf", 6)}${pad("a11y", 6)}${pad("best", 6)}${pad("seo", 6)}${pad("LCP", 10)}${pad("CLS", 8)}TBT`,
);
for (const r of rows) {
  console.log(
    pad(r.route, 40) +
      pad(r.scores.performance ?? "-", 6) +
      pad(r.scores.accessibility ?? "-", 6) +
      pad(r.scores["best-practices"] ?? "-", 6) +
      pad(r.scores.seo ?? "-", 6) +
      pad(r.lcp, 10) +
      pad(r.cls, 8) +
      r.tbt,
  );
}

const out = path.join(ROOT, "lighthouse-report.json");
fs.writeFileSync(out, JSON.stringify(rows, null, 2), "utf8");
console.log(`\nWrote ${path.relative(ROOT, out)}`);

if (failures.length) {
  console.error(`\n${failures.length} below threshold:\n  ${failures.join("\n  ")}`);
  process.exit(1);
}
console.log("\nAll categories at or above threshold.");
