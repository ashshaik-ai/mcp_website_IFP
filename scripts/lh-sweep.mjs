/* Lighthouse across every important route, against one server.

   The per-route diagnose script starts and stops a server each time, which is
   slow and was the source of the orphaned-port problem. This starts one
   server, reuses one Chrome, and reports a table.

   Performance is deliberately excluded by default: on a developer laptop it
   swings about five points run to run, which is wider than most single
   optimisations and makes the table misleading. The other three categories are
   deterministic. Pass PERF=1 to include it anyway.

   Usage:
     node scripts/lh-sweep.mjs              # a11y, best practices, SEO
     PERF=1 node scripts/lh-sweep.mjs       # include performance
     ROUTES=a,b node scripts/lh-sweep.mjs   # only these routes
*/
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
import { startServer } from "./lh-server.mjs";

const PORT = 3301;

const DEFAULT_ROUTES = [
  "/",
  "/knowledge-center",
  "/student-guidance",
  "/knowledge-center/learn-arabic",
  "/knowledge-center/learn-urdu",
  "/knowledge-center/learn-quran",
  "/knowledge-center/learn-salah",
  "/knowledge-center/seerah",
  "/knowledge-center/islamic-history",
  "/knowledge-center/kids-islam",
  "/knowledge-center/names-of-allah",
  "/knowledge-center/hajj-umrah",
  "/knowledge-center/special-prayers",
  "/knowledge-center/islamic-calendar",
  "/knowledge-center/womens-guidance",
  "/knowledge-center/learn-arabic/alphabet",
  "/knowledge-center/learn-quran/tajweed",
  "/offline",
];

/* MSYS shells on Windows rewrite anything that looks like a POSIX path, so a
   bare "/" in ROUTES arrives as "C:/Program Files/Git/" and the homepage gets
   silently skipped. Strip that prefix back off. */
const routes = process.env.ROUTES
  ? process.env.ROUTES.split(",")
      .map((r) => r.replace(/^.*?Program Files\/Git\/?/, "/").trim())
      .map((r) => (r.startsWith("/") ? r : "/" + r))
  : DEFAULT_ROUTES;

const withPerf = process.env.PERF === "1";
const categories = withPerf
  ? ["performance", "accessibility", "best-practices", "seo"]
  : ["accessibility", "best-practices", "seo"];

const server = await startServer(PORT);
const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless=new", "--no-sandbox"] });

const rows = [];
/** audit id -> routes where it failed */
const failures = new Map();

for (const route of routes) {
  const { lhr } = await lighthouse(
    `http://127.0.0.1:${PORT}${route}`,
    { port: chrome.port, output: "json", logLevel: "error" },
    {
      extends: "lighthouse:default",
      settings: {
        formFactor: "mobile",
        screenEmulation: { mobile: true },
        onlyCategories: categories,
      },
    },
  );

  const scores = {};
  for (const c of Object.values(lhr.categories)) {
    scores[c.id] = c.score == null ? null : Math.round(c.score * 100);
  }
  rows.push({ route, scores });

  for (const cat of Object.values(lhr.categories)) {
    for (const ref of cat.auditRefs) {
      const a = lhr.audits[ref.id];
      if (!a || a.score === null || a.score >= 1 || !(ref.weight > 0)) continue;
      if (!failures.has(a.id)) failures.set(a.id, { title: a.title, weight: ref.weight, routes: [] });
      failures.get(a.id).routes.push(route);
    }
  }

  const line = categories.map((c) => String(scores[c] ?? "-").padStart(4)).join("");
  console.log(`${line}   ${route}`);
}

console.log("\n" + categories.map((c) => c.slice(0, 4).padStart(4)).join("") + "   route");
console.log("-".repeat(60));

const worst = {};
for (const c of categories) {
  const vals = rows.map((r) => r.scores[c]).filter((v) => v != null);
  worst[c] = vals.length ? Math.min(...vals) : null;
}
console.log("\nlowest per category:");
for (const c of categories) console.log(`  ${c.padEnd(16)} ${worst[c]}`);

/* /offline is the service worker's fallback page and is deliberately
   noindex, so is-crawlable failing there is the correct outcome. Flagging it
   as a defect on every run only trains people to ignore the report. */
const EXPECTED = new Set(["is-crawlable::/offline"]);

const real = [...failures].filter(([id, f]) => {
  f.routes = f.routes.filter((r) => !EXPECTED.has(`${id}::${r}`));
  return f.routes.length > 0;
});

if (real.length) {
  console.log("\nweighted audit failures (audit: route count):");
  for (const [id, f] of real.sort((a, b) => b[1].weight - a[1].weight)) {
    console.log(`  [w${f.weight}] ${id}  x${f.routes.length}`);
    console.log(`        ${f.routes.slice(0, 6).join(" ")}${f.routes.length > 6 ? " ..." : ""}`);
  }
} else {
  console.log("\nno unexpected weighted audit failures on any route.");
}

await chrome.kill();
server.stop();
process.exit(0);
