/* Service worker for Islamic Front.

   Deliberately conservative. A service worker that caches too eagerly can
   pin a stale site in people's browsers for weeks, which is far worse than
   having no offline support at all. So:

     - HTML is network-first. A visitor always gets the current page when
       online; the cache is only a fallback when the network fails.
     - Immutable build assets and media are cache-first, since their URLs
       change when their contents do.
     - rates.json is never cached. A stale gold rate would make the Zakat
       calculator quietly wrong, and wrong is worse than unavailable.

   Bumping VERSION drops every previous cache on activate.
*/
const VERSION = "v1";
const SHELL = `if-shell-${VERSION}`;
const ASSETS = `if-assets-${VERSION}`;
const PAGES = `if-pages-${VERSION}`;

const OFFLINE_URL = "/offline";

/* Only the offline fallback is precached. Precaching a route list would go
   stale the moment a lesson is added. */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(SHELL)
      .then((c) => c.add(OFFLINE_URL))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  const keep = new Set([SHELL, ASSETS, PAGES]);
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => !keep.has(k)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

const isImmutable = (url) =>
  url.pathname.startsWith("/_next/static/") ||
  /\.(?:mp3|woff2?|png|jpe?g|webp|svg|ico)$/i.test(url.pathname);

/** Never serve these from cache. */
const isAlwaysFresh = (url) =>
  url.pathname === "/rates.json" || url.pathname.startsWith("/api/");

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(request);
  if (hit) return hit;
  const res = await fetch(request);
  if (res.ok) cache.put(request, res.clone());
  return res;
}

async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const res = await fetch(request);
    if (res.ok) cache.put(request, res.clone());
    return res;
  } catch (err) {
    const hit = await cache.match(request);
    if (hit) return hit;
    if (request.mode === "navigate") {
      const offline = await caches.match(OFFLINE_URL);
      if (offline) return offline;
    }
    throw err;
  }
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  // Another origin's caching policy is not ours to override.
  if (url.origin !== self.location.origin) return;
  if (isAlwaysFresh(url)) return;

  if (isImmutable(url)) {
    event.respondWith(cacheFirst(request, ASSETS));
    return;
  }

  if (request.mode === "navigate" || request.destination === "document") {
    event.respondWith(networkFirst(request, PAGES));
    return;
  }

  if (url.pathname === "/search-index.json") {
    event.respondWith(networkFirst(request, ASSETS));
  }
});
