---
name: site-check
description: Verify the Islamic Front premium site before and after any change — build, typecheck, lint, the Playwright quality suite, and a Lighthouse pass. Use automatically after editing anything under src/, before committing, and when asked to check, audit, test, or verify the site or a deployment. Also covers checking the live Vercel deployment.
---

# Site check

Run this after any change to `src/`, before committing, and whenever asked to
check, audit or verify the site. Do not wait to be asked.

## The gate

```bash
npx tsc --noEmit          # types
npm run lint              # 0 errors expected; warnings are allowed and explained in eslint.config.mjs
npm run build             # also regenerates the search index via prebuild
npm test                  # 160 Playwright tests across mobile + desktop
```

All four must pass before committing. `npm test` starts its own production
server; there is no need to start one first.

## Performance

```bash
node scripts/audit-live.mjs
```

Lighthouse over five representative routes against a local production build.
Exits non-zero if any category falls below threshold (perf 85, a11y 95,
best-practices 90, SEO 95). Takes about two minutes.

## Checking the live deployment

Production is https://mcp-website-ifp.vercel.app, deployed from `main`.

**Do not point the Playwright suite or a burst of automated requests at it.**
Vercel bot mitigation answers headless traffic with a "Vercel Security
Checkpoint" interstitial (`X-Vercel-Mitigated: challenge`, HTTP 403). Every
test then fails against that page, which looks like the site is broken when it
is not — real browsers solve the challenge transparently.

For a live check, use a handful of single requests:

```bash
U=https://mcp-website-ifp.vercel.app
curl -s -o /dev/null -w "%{http_code}\n" "$U/sitemap.xml"   # expect 200
curl -s "$U/sitemap.xml" | grep -c "<loc>"                   # expect 69
curl -s "$U/rates.json"                                      # expect today's rates
```

If those return 403 with a challenge page, that is bot mitigation, not an
outage. Confirm in a real browser before reporting a problem.

## What the suite protects

Every assertion covers a bug that actually shipped, so a failure is a real
regression rather than a style preference:

- no console errors or failed requests on any route
- no heading-level skips
- no interactive control under the 24px WCAG 2.2 AA floor
- no fragment link without a target
- exactly one `h1`, a `main` landmark, a skip link, a canonical, and JSON-LD
- alt text on every image, and no horizontal scroll
- Zakat threshold and clamping, prayer times, search, progress, quizzes,
  prev/next navigation, and the language toggle

## Regenerating content

The modules under `src/content/` are generated. After the legacy site changes:

```bash
node scripts/extract-lessons.mjs
node scripts/extract-alphabets.mjs
node scripts/extract-vocab.mjs
node scripts/extract-portals.mjs
node scripts/extract-static-content.mjs
```

Never hand-edit those files; the header of each says so.
