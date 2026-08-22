/* Depth of every lesson, so a stub is visible next to a real one.
   Usage: node scripts/lesson-stats.mjs [portal] */
import { lessons } from "../src/content/all-lessons.ts";

const only = process.argv[2];
const words = (b) => (b ? b.en.split(/\s+/).filter(Boolean).length : 0);

const rows = lessons
  .filter((l) => !only || l.portal === only)
  .map((l) => ({
    portal: l.portal,
    slug: l.slug,
    sections: l.sections.length,
    quiz: l.quiz.length,
    faqs: l.faqs.length,
    checks: l.sections.filter((s) => s.check).length,
    en: l.sections.reduce((n, s) => n + words(s.heading) + words(s.body), 0) + words(l.intro) + words(l.summary),
  }))
  .sort((a, b) => a.portal.localeCompare(b.portal) || a.en - b.en);

console.log("words  sec  chk  quiz faq   portal / slug");
console.log("-".repeat(62));
for (const r of rows) {
  const thin = r.en < 200 ? "  <-- thin" : "";
  console.log(
    `${String(r.en).padStart(5)} ${String(r.sections).padStart(4)} ${String(r.checks).padStart(4)} ` +
    `${String(r.quiz).padStart(5)} ${String(r.faqs).padStart(3)}   ${r.portal}/${r.slug}${thin}`,
  );
}
const byPortal = {};
for (const r of rows) (byPortal[r.portal] ??= []).push(r.en);
console.log("\nmedian English words per lesson, by portal:");
for (const [p, v] of Object.entries(byPortal).sort()) {
  const s = [...v].sort((a, b) => a - b);
  console.log(`  ${p.padEnd(20)} ${s[Math.floor(s.length / 2)]}  (n=${s.length})`);
}
