/* Every Lighthouse audit currently costing points, grouped by category.
   Usage: node scripts/diagnose.mjs [route] */
import { startServer } from "./lh-server.mjs";
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";

const PORT = 3300;
/* MSYS shells on Windows path-convert anything that looks like a POSIX path,
   so a leading slash arrives as C:/Program Files/Git/... Pass the route
   without one (ROUTE=knowledge-center) and it is normalised here. */
const raw = (process.env.ROUTE || "").replace(/^.*Git\//, "");
const route = raw ? (raw.startsWith("/") ? raw : "/" + raw) : "/";
const server = await startServer(PORT);
const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless=new", "--no-sandbox"] });

const res = await lighthouse(`http://127.0.0.1:${PORT}${route}`,
  { port: chrome.port, output: "json", logLevel: "error" },
  { extends: "lighthouse:default", settings: { formFactor: "mobile", screenEmulation: { mobile: true } } });

const lhr = res.lhr;

/* AUDIT=<id> dumps one audit's items in full, for when the 100-char snippet
   below truncates away the detail that identifies the actual problem. */
if (process.env.AUDIT) {
  const a = lhr.audits[process.env.AUDIT];
  console.log(JSON.stringify(a?.details?.items ?? a, null, 2));
  chrome.kill(); server.stop(); process.exit(0);
}
console.log(`\n${route}`);
for (const [k, c] of Object.entries(lhr.categories)) {
  console.log(`  ${c.title}: ${c.score == null ? "n/a" : Math.round(c.score * 100)}`);
}

for (const [key, cat] of Object.entries(lhr.categories)) {
  const failing = cat.auditRefs
    .map((ref) => ({ ref, a: lhr.audits[ref.id] }))
    .filter(({ a }) => a && a.score !== null && a.score < 1)
    .sort((x, y) => (y.ref.weight || 0) - (x.ref.weight || 0));
  if (!failing.length) continue;
  console.log(`\n== ${cat.title} ==`);
  for (const { ref, a } of failing.slice(0, 10)) {
    const saving = a.details?.overallSavingsMs ? ` (~${Math.round(a.details.overallSavingsMs)}ms)` : "";
    console.log(`  [w${ref.weight ?? 0}] ${a.id}: ${a.title}${saving}`);
    if (a.displayValue) console.log(`        ${a.displayValue}`);
    (a.details?.items || []).slice(0, 2).forEach((i) => {
      const s = i.node?.snippet || i.url || JSON.stringify(i);
      console.log(`        - ${String(s).slice(0, 100)}`);
    });
  }
}
await chrome.kill(); server.stop();
