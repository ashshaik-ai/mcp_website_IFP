/* Fail the build on an exported symbol that nothing references.

   This exists because of a specific, expensive mistake. `learn-salah/client.tsx`
   carried a `simSteps` array: nine prayer steps, each with an Arabic text, a
   transliteration, a meaning and a posture in two languages. It looked exactly
   like the content the Prayer Steps tab renders. It was referenced by nothing.
   The tab renders `salahDhikr` from `content/salah-dhikr.ts`.

   The cost was not the dead lines. It was that the 3D prayer postures were
   authored against that array, deliberately, as the authoritative statement of
   what the portal teaches -- and it was not the page. Hours of work were spent
   matching a file no visitor could ever load, and a hand position was set from
   text nobody had ever read.

   ESLint cannot catch this. `no-unused-vars` is module-local: it sees a symbol
   is exported and stops asking. So this asks the question ESLint will not --
   does anything, anywhere, including this file, use the thing?

   Exported-but-unused is not always a mistake. A deliberate API can be ahead of
   its callers. Add such a symbol to ALLOWED with the reason, and this stays out
   of the way. */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const SRC = "src";

/* Symbols that are exported without a caller on purpose. */
const ALLOWED = new Map([
  [
    "TT",
    "the ad-hoc half of the T/TT first-paint pair; T covers dictionary strings " +
      "and TT is there for a string pair that is not in the dictionary",
  ],
]);

/* Next.js calls these itself; they have no importer by design. */
const ENTRY = new Set([
  "page.tsx", "layout.tsx", "route.ts", "not-found.tsx", "error.tsx",
  "global-error.tsx", "template.tsx", "default.tsx", "sitemap.ts", "robots.ts",
  "manifest.ts", "middleware.ts", "opengraph-image.tsx", "icon.tsx", "apple-icon.tsx",
]);

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) out.push(...walk(path));
    else if (/\.tsx?$/.test(name)) out.push(path);
  }
  return out;
}

const files = walk(SRC);
const text = new Map(files.map((f) => [f, readFileSync(f, "utf8")]));

const DECL = /^export\s+(?:async\s+)?(?:const|function|class|type|interface)\s+([A-Za-z_$][\w$]*)/gm;

const dead = [];
for (const [file, source] of text) {
  if (ENTRY.has(file.split(sep).pop())) continue;
  for (const match of source.matchAll(DECL)) {
    const name = match[1];
    if (ALLOWED.has(name)) continue;
    const word = new RegExp(`\\b${name.replace(/\$/g, "\\$")}\\b`, "g");
    /* Every mention in its own file except the declaration itself. */
    const own = (source.match(word) ?? []).length - 1;
    if (own > 0) continue;
    let used = false;
    for (const [other, source2] of text) {
      if (other === file) continue;
      if (word.test(source2)) { used = true; break; }
      word.lastIndex = 0;
    }
    if (!used) {
      dead.push({
        file: relative(process.cwd(), file).split(sep).join("/"),
        line: source.slice(0, match.index).split("\n").length,
        name,
      });
    }
  }
}

if (dead.length === 0) {
  console.log(`dead exports: none (${files.length} files)`);
  process.exit(0);
}

console.error(`\n${dead.length} exported symbol(s) that nothing references:\n`);
for (const d of dead) console.error(`  ${d.file}:${d.line}  ${d.name}`);
console.error(
  "\nDelete it, or use it, or add it to ALLOWED in scripts/check-dead-exports.mjs\n" +
    "with the reason it has no caller yet. An unreferenced export that looks like\n" +
    "content is the dangerous kind: it reads as authoritative and is not.\n",
);
process.exit(1);
