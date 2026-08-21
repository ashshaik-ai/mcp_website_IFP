/* Extract bilingual Student Guidance cards from the legacy static site into a
   typed TS module for this app.

   The legacy page keeps Telugu in JS arrays (CH[], CB_TE[]) and English in the
   markup, so parsing the file directly means reimplementing its render logic.
   Instead we serve the page, read the real DOM, toggle the language, and read
   it again — whatever the page actually shows is what we capture.

   Usage:
     node scripts/extract-static-content.mjs "../Islamic Front/projects/islamic-front-website"
*/
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = path.resolve(process.argv[2] || '../Islamic Front/projects/islamic-front-website');
const OUT = path.join(ROOT, 'src/content/student-guidance.ts');
const PORT = 9391;

const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.mp3': 'audio/mpeg' };

function serve() {
  return new Promise((resolve) => {
    const s = http.createServer((req, res) => {
      const rel = decodeURIComponent(req.url.split('?')[0]);
      const file = path.join(SITE, rel === '/' ? '/index.html' : rel);
      if (!file.startsWith(SITE)) { res.writeHead(403).end(); return; }
      fs.readFile(file, (err, buf) => {
        if (err) { res.writeHead(404).end('not found'); return; }
        res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
        res.end(buf);
      });
    });
    s.listen(PORT, '127.0.0.1', () => resolve(s));
  });
}

/* Runs in the page. Returns one record per .gx-card in the current language. */
const READ_CARDS = () => {
  const txt = (el) => (el ? el.textContent.replace(/\s+/g, ' ').trim() : '');
  const stripLabel = (el) => {
    if (!el) return '';
    const c = el.cloneNode(true);
    c.querySelectorAll('b').forEach((b) => b.remove());
    return c.textContent.replace(/\s+/g, ' ').trim();
  };
  return Array.from(document.querySelectorAll('.gx-card')).map((card) => {
    const titleEl = card.querySelector('.gx-title');
    const tagEl = card.querySelector('.gx-tag');
    let title = '';
    if (titleEl) {
      const c = titleEl.cloneNode(true);
      c.querySelectorAll('.gx-tag').forEach((t) => t.remove());
      title = c.textContent.replace(/\s+/g, ' ').trim();
    }
    return {
      section: card.closest('section[id]')?.id || '',
      stream: card.getAttribute('data-stream') || '',
      search: card.getAttribute('data-search') || '',
      title,
      tag: txt(tagEl),
      summary: txt(card.querySelector('.gx-best')),
      fields: Array.from(card.querySelectorAll('.gx-field')).map((f) => ({
        k: txt(f.querySelector('.gx-field-k')),
        v: txt(f.querySelector('.gx-field-v')),
      })),
      pros: stripLabel(card.querySelector('.gx-pros')),
      cons: stripLabel(card.querySelector('.gx-cons')),
      myth: stripLabel(card.querySelector('.gx-myth')),
    };
  });
};

/* Runs in the page. Returns the stream filter pills in the current language. */
const READ_STREAMS = () => Array.from(document.querySelectorAll('[data-stream-id]')).map((b) => ({
  id: b.getAttribute('data-stream-id'),
  label: b.textContent.replace(/\s+/g, ' ').trim(),
}));

/* Runs in the page. Returns section id -> heading text in the current language. */
const READ_SECTIONS = () => {
  const out = {};
  document.querySelectorAll('section[id]').forEach((sec) => {
    const h = sec.querySelector('h2');
    if (h) out[sec.id] = h.textContent.replace(/\s+/g, ' ').trim();
  });
  return out;
};

const esc = (s) => JSON.stringify(s ?? '');
const pair = (te, en) => `{ te: ${esc(te)}, en: ${esc(en)} }`;

const server = await serve();
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`http://127.0.0.1:${PORT}/student-guidance.html`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.gx-card');
  await page.waitForTimeout(400);

  const te = await page.evaluate(READ_CARDS);
  const teSections = await page.evaluate(READ_SECTIONS);
  const teStreams = await page.evaluate(READ_STREAMS);

  // The toggle id is not consistent across the legacy pages.
  const LANG_SELECTORS = ['#lang-btn', '#langToggle', '[data-lang-toggle]', '.lang-toggle'];
  let lang = null;
  for (const sel of LANG_SELECTORS) {
    const loc = page.locator(sel).first();
    if (await page.locator(sel).count()) { lang = loc; break; }
  }
  if (!lang) throw new Error(`no language toggle found (tried ${LANG_SELECTORS.join(', ')})`);
  await lang.click();
  await page.waitForTimeout(700);
  const en = await page.evaluate(READ_CARDS);
  const enSections = await page.evaluate(READ_SECTIONS);
  const enStreams = await page.evaluate(READ_STREAMS);

  if (te.length !== en.length) throw new Error(`card count mismatch: te=${te.length} en=${en.length}`);
  if (!te.length) throw new Error('no cards found');

  // Language toggle must actually change the text, or we captured Telugu twice.
  const changed = te.filter((c, i) => c.title !== en[i].title).length;
  if (changed < te.length / 2) throw new Error(`language toggle did not take effect (${changed}/${te.length} titles differ)`);

  const seen = new Map();
  const cards = te.map((t, i) => {
    const e = en[i];
    const base = (e.title || t.title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `card-${i}`;
    const n = (seen.get(base) || 0) + 1;
    seen.set(base, n);
    return { id: n > 1 ? `${base}-${n}` : base, index: i, t, e };
  });

  const body = cards.map((c) => {
    const fields = c.t.fields.map((f, j) => {
      const ef = c.e.fields[j] || { k: '', v: '' };
      return `      { k: ${pair(f.k, ef.k)}, v: ${pair(f.v, ef.v)} },`;
    }).join('\n');
    return [
      '  {',
      `    id: ${esc(c.id)},`,
      `    section: ${esc(c.t.section)},`,
      `    stream: ${esc(c.t.stream)},`,
      `    search: ${esc(c.t.search)},`,
      `    title: ${pair(c.t.title, c.e.title)},`,
      `    tag: ${pair(c.t.tag, c.e.tag)},`,
      `    summary: ${pair(c.t.summary, c.e.summary)},`,
      fields ? `    fields: [\n${fields}\n    ],` : '    fields: [],',
      `    pros: ${pair(c.t.pros, c.e.pros)},`,
      `    cons: ${pair(c.t.cons, c.e.cons)},`,
      `    myth: ${pair(c.t.myth, c.e.myth)},`,
      '  },',
    ].join('\n');
  }).join('\n');

  const streams = teStreams.map((st, i) => ({
    id: st.id,
    label: { te: st.label, en: (enStreams[i] || st).label },
    count: st.id === 'all' ? cards.length : cards.filter((c) => c.t.stream === st.id).length,
  }));

  const sectionIds = [...new Set(cards.map((c) => c.t.section).filter(Boolean))];
  const sections = sectionIds.map((id) => ({
    id,
    label: { te: teSections[id] || id, en: enSections[id] || id },
    count: cards.filter((c) => c.t.section === id).length,
  }));
  const out = `/* AUTO-GENERATED by scripts/extract-static-content.mjs — do not edit by hand.
   Source: the legacy static site's student-guidance.html.
   Re-run the script to refresh. ${cards.length} cards, ${sections.length} sections. */

export type Bi = { te: string; en: string };

export type GuidanceCard = {
  id: string;
  section: string;
  stream: string;
  search: string;
  title: Bi;
  tag: Bi;
  summary: Bi;
  fields: { k: Bi; v: Bi }[];
  pros: Bi;
  cons: Bi;
  myth: Bi;
};

export type GuidanceSection = { id: string; label: Bi; count: number };

export const guidanceSections: GuidanceSection[] = ${JSON.stringify(sections, null, 2)};

export const guidanceStreams: GuidanceSection[] = ${JSON.stringify(streams, null, 2)};

export const guidanceCards: GuidanceCard[] = [
${body}
];
`;

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, out, 'utf8');
  console.log(`Wrote ${path.relative(ROOT, OUT)} — ${cards.length} cards, ${sections.length} sections.`);
  const withBody = cards.filter((c) => c.t.fields.length || c.t.pros || c.t.myth).length;
  console.log(`  cards with body detail: ${withBody}/${cards.length}`);
  console.log(`  streams: ${streams.map((x) => `${x.id}(${x.count})`).join(' ')}`);
} finally {
  await browser.close();
  server.close();
}
