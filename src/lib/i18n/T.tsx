import { strings, type StringKey } from "./strings";

/* Text that is already in the right language at the first paint.

   The routes are prerendered in Telugu and React only knows the reader's
   choice once it has hydrated, so an English visitor watched the page sit in
   Telugu for about half a second and then flip. The pre-paint script in the
   layout cuts that down but cannot remove it: no script can rewrite text React
   has not rendered yet.

   This can. Both languages go into the HTML, and CSS — driven by the data-lang
   the same pre-paint script sets on <html> — shows one of them. Nothing waits
   for hydration, so nothing flips.

   It is deliberately not used everywhere. Doubling every string across 91
   routes would be a lot of DOM to save something the reader never sees, so it
   is for what is on screen at the first paint: the header and the hero. The
   rest keeps using t(), which resolves during hydration, long before anyone
   has scrolled to it.

   Server component on purpose — no hooks, no client boundary, nothing to
   hydrate. */
export function T({ k }: { k: StringKey }) {
  const s = strings[k];
  return (
    <>
      <span data-l="te">{s.te}</span>
      <span data-l="en">{s.en}</span>
    </>
  );
}

/** The same thing for a pair of strings that are not in the dictionary. */
export function TT({ te, en }: { te: string; en: string }) {
  return (
    <>
      <span data-l="te">{te}</span>
      <span data-l="en">{en}</span>
    </>
  );
}
