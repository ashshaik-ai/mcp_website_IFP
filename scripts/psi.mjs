/* PageSpeed Insights against the real deployment.

   Local Lighthouse on a developer laptop swings about five points run to run,
   which is wider than most single optimisations. PSI runs on Google's
   infrastructure against the CDN-served build, so it is both the number the
   site is actually judged on and a far quieter signal.

   Usage: node scripts/psi.mjs [url] [mobile|desktop] */
const url = process.argv[2] || "https://mcp-website-ifp.vercel.app/";
const strategy = process.argv[3] || "mobile";
const cats = ["performance", "accessibility", "best-practices", "seo"];
const api = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
api.searchParams.set("url", url);
api.searchParams.set("strategy", strategy);
for (const c of cats) api.searchParams.append("category", c);
if (process.env.PSI_KEY) api.searchParams.set("key", process.env.PSI_KEY);

const res = await fetch(api);
if (!res.ok) {
  console.error(`PSI ${res.status}: ${(await res.text()).slice(0, 300)}`);
  process.exit(1);
}
const data = await res.json();
const lhr = data.lighthouseResult;
console.log(`\n${strategy.toUpperCase()}  ${url}`);
for (const c of Object.values(lhr.categories)) {
  console.log(`  ${c.title.padEnd(16)} ${Math.round(c.score * 100)}`);
}
console.log("  ---");
for (const id of ["first-contentful-paint", "largest-contentful-paint", "total-blocking-time", "cumulative-layout-shift", "speed-index"]) {
  const a = lhr.audits[id];
  if (a) console.log(`  ${a.title.padEnd(28)} ${a.displayValue}`);
}
const failing = Object.values(lhr.categories)
  .flatMap((c) => c.auditRefs.map((r) => ({ w: r.weight, a: lhr.audits[r.id] })))
  .filter(({ w, a }) => w > 0 && a && a.score !== null && a.score < 0.9)
  .sort((x, y) => y.w - x.w);
if (failing.length) {
  console.log("\n  weighted failures:");
  for (const { w, a } of failing) console.log(`   [w${w}] ${a.id}: ${a.displayValue ?? Math.round(a.score * 100)}`);
}
