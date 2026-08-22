<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Islamic Front — premium site

Telugu-first bilingual site for Islamic Front, Mangalagiri. Community welfare,
a knowledge centre with 54 lessons, and student career guidance.
Production: https://mcp-website-ifp.vercel.app, deployed from `main`.

## Verify before you commit — every time, unasked

Invoke the `site-check` skill. It carries the full procedure; the short form:

```bash
npx tsc --noEmit && npm run lint && npm run build && npm test
```

`npm test` is 160 Playwright tests over every route. Each assertion covers a
bug that actually shipped, so a failure is a real regression. Add
`node scripts/audit-live.mjs` for a Lighthouse pass when touching fonts,
images, layout or anything on the critical path.

Never report the site as working without having run this. Never point the test
suite at the production URL — Vercel challenges headless traffic and every
test fails against an interstitial, which reads as an outage that is not real.

## How this codebase is shaped

- **Content is generated.** Everything under `src/content/` comes from the
  legacy static site via the `scripts/extract-*.mjs` scripts. Do not hand-edit
  it; change the source and re-run the extractor.
- **Copy lives in a `copy` object** at the top of each file, not inline in the
  JSX, so a translator can read a page as one unit. `scripts/hoist-i18n.mjs`
  moves any that drift back.
- **Routes come from one catalog** (`src/lib/site.ts`), which drives metadata,
  the sitemap and JSON-LD together so they cannot describe different pages.
- **Pages are server components** that export `metadata` and render a
  `client.tsx` half. Keep that split: a client component cannot export
  metadata, which is how every page ended up sharing one title before.
- **`PageShell` wraps every page** and supplies the skip link and `main`
  landmark. Use it rather than composing Navbar and Footer by hand.

## Standards that are enforced by tests

Telugu leads, English follows. Every interactive control clears 24px. Headings
descend one level at a time. Inputs stay at 16px or larger, or iOS Safari
zooms the page. Internal links use `Link`, not `<a>`. Arabic uses
`.font-arabic`, Urdu uses `.font-urdu` — Nastaliq is not optional, a naskh
fallback reads wrong.

`rates.json` drives the Zakat calculator and is refreshed daily by a workflow.
Never cache it and never hardcode a rate: a stale figure still looks
authoritative, which is worse than showing nothing.
