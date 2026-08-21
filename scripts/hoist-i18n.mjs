/* Hoist inline `lang === "te" ? "..." : "..."` ternaries out of components
   into a per-file `copy` object.

   Content was scattered across 249 inline ternaries, so translating meant
   hunting through JSX and nothing could be reviewed as a unit. This moves the
   plain string pairs to the top of their file, keyed by their English text.

   Ternaries whose branches are template literals are left alone on purpose:
   they interpolate local runtime values, so hoisting them would mean turning
   them into functions, which trades one kind of scatter for another.

   Usage: node scripts/hoist-i18n.mjs [--write]
*/
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const WRITE = process.argv.includes("--write");
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/** A double-quoted JS string, respecting backslash escapes. */
const STR = String.raw`"((?:[^"\\]|\\.)*)"`;
const TERNARY = new RegExp(String.raw`lang === "te"\s*\?\s*${STR}\s*:\s*${STR}`, "g");
const ANY_TERNARY = /lang === "te"\s*\?/g;

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith(".tsx")) out.push(p);
  }
  return out;
}

/** Stable, readable key derived from the English branch. */
function keyFor(en, used) {
  let base =
    en
      .toLowerCase()
      .replace(/&[a-z]+;/g, " ")
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "")
      .split("_")
      .filter(Boolean)
      .slice(0, 5)
      .join("_") || "text";
  if (/^[0-9]/.test(base)) base = `n_${base}`;
  let k = base;
  let i = 2;
  while (used.has(k)) k = `${base}_${i++}`;
  used.add(k);
  return k;
}

/** Index of the last line belonging to the import section, or -1. */
function lastImportLine(lines) {
  let last = -1;
  let open = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!open && /^import\b/.test(line)) open = true;
    if (open && /;\s*$/.test(line)) {
      last = i;
      open = false;
    }
  }
  return last;
}

let totalHoisted = 0;
let totalSkipped = 0;
const rows = [];

for (const file of walk(path.join(ROOT, "src"))) {
  const src = fs.readFileSync(file, "utf8");
  const all = (src.match(ANY_TERNARY) || []).length;
  if (!all) continue;

  const matches = [...src.matchAll(TERNARY)];
  const skipped = all - matches.length;
  if (!matches.length) {
    totalSkipped += skipped;
    rows.push({ file, keys: 0, uses: 0, skipped });
    continue;
  }

  // Identical pairs collapse onto one key.
  const used = new Set();
  const byPair = new Map();
  for (const m of matches) {
    const pair = `${m[1]}\u001f${m[2]}`;
    if (!byPair.has(pair)) byPair.set(pair, { te: m[1], en: m[2], key: keyFor(m[2], used) });
  }

  let out = src.replace(TERNARY, (_full, te, en) => `copy.${byPair.get(`${te}\u001f${en}`).key}[lang]`);

  const entries = [...byPair.values()]
    .map((e) => `  ${e.key}: { te: "${e.te}", en: "${e.en}" },`)
    .join("\n");
  const block = [
    "/* Bilingual copy for this file, hoisted out of the JSX so a translator",
    "   can read and review it as one unit. */",
    "const copy = {",
    entries,
    "} as const;",
  ].join("\n");

  const lines = out.split("\n");
  const at = lastImportLine(lines);
  if (at === -1) {
    rows.push({ file, keys: 0, uses: 0, skipped });
    continue;
  }
  lines.splice(at + 1, 0, "", block);
  out = lines.join("\n");

  if (WRITE) fs.writeFileSync(file, out, "utf8");
  totalHoisted += matches.length;
  totalSkipped += skipped;
  rows.push({ file, keys: byPair.size, uses: matches.length, skipped });
}

rows.sort((a, b) => b.keys - a.keys);
for (const r of rows) {
  const rel = path.relative(ROOT, r.file).split(path.sep).join("/");
  console.log(
    `  ${String(r.keys).padStart(3)} keys  ${String(r.uses).padStart(3)} uses  ` +
      `${String(r.skipped).padStart(3)} left inline   ${rel}`,
  );
}
console.log(`\nhoisted ${totalHoisted} ternaries, left ${totalSkipped} interpolating ones inline`);
console.log(WRITE ? "files written" : "dry run - pass --write to apply");
