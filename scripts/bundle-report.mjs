/* What JavaScript each page actually downloads.

   Next 16 no longer prints per-route sizes in the build output, so this reads
   the prerendered HTML, collects the chunks each page references, and reports
   raw and gzipped totals. The shared baseline (chunks every page loads) is
   separated from what a page adds on top, which is the number worth attacking.

   Usage: node scripts/bundle-report.mjs */
import { readFile, readdir, stat } from "node:fs/promises";
import { gzipSync } from "node:zlib";
import path from "node:path";

const APP = ".next/server/app";
const STATIC = ".next";

async function findHtml(dir, out = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await findHtml(p, out);
    else if (e.name.endsWith(".html")) out.push(p);
  }
  return out;
}

const sizes = new Map();
async function sizeOf(chunk) {
  if (sizes.has(chunk)) return sizes.get(chunk);
  const file = path.join(STATIC, chunk.replace(/^\/_next\//, ""));
  let v = { raw: 0, gz: 0 };
  try {
    await stat(file);
    const buf = await readFile(file);
    v = { raw: buf.length, gz: gzipSync(buf).length };
  } catch {}
  sizes.set(chunk, v);
  return v;
}

const pages = [];
for (const file of await findHtml(APP)) {
  const html = await readFile(file, "utf8");
  const chunks = [...new Set(html.match(/\/_next\/static\/chunks\/[a-z0-9_-]+\.js/g) || [])];
  const css = [...new Set(html.match(/\/_next\/static\/chunks\/[a-z0-9_-]+\.css/g) || [])];
  let raw = 0, gz = 0;
  for (const c of chunks) { const s = await sizeOf(c); raw += s.raw; gz += s.gz; }
  let craw = 0, cgz = 0;
  for (const c of css) { const s = await sizeOf(c); craw += s.raw; cgz += s.gz; }
  const route = "/" + path.relative(APP, file).replace(/\\/g, "/").replace(/\.html$/, "").replace(/^index$/, "");
  /* Gzip the document rather than reporting its raw length. The column is
     compared against gzipped JS and CSS, so a raw figure here made the HTML
     look about seven times heavier than it is. */
  pages.push({
    route,
    chunks: new Set(chunks),
    raw,
    gz,
    craw,
    cgz,
    html: gzipSync(Buffer.from(html)).length,
  });
}

// Chunks present on every page are the framework + layout baseline.
const shared = [...pages[0].chunks].filter((c) => pages.every((p) => p.chunks.has(c)));
let sraw = 0, sgz = 0;
for (const c of shared) { const s = await sizeOf(c); sraw += s.raw; sgz += s.gz; }

console.log(`shared baseline: ${shared.length} chunks  ${(sraw / 1024).toFixed(0)} KB raw / ${(sgz / 1024).toFixed(0)} KB gzip\n`);
console.log("  JS gzip   +page   CSS gz   HTML gz   route");
console.log("-".repeat(70));

for (const p of pages.sort((a, b) => b.gz + b.cgz + b.html - (a.gz + a.cgz + a.html)).slice(0, 20)) {
  const own = p.gz - sgz;
  console.log(
    `${(p.gz / 1024).toFixed(0).padStart(7)} KB ${(own / 1024).toFixed(0).padStart(6)} KB ` +
    `${(p.cgz / 1024).toFixed(0).padStart(7)} KB ${(p.html / 1024).toFixed(0).padStart(8)} KB   ${p.route}`,
  );
}
