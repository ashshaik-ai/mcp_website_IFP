/* Every client-side navigation re-mounts a template, which is exactly the
   hook a page transition needs: each route change enters on a short rise and
   fade instead of a hard cut. CSS only — the server renders the same markup,
   there is nothing to hydrate, and prefers-reduced-motion turns it off in
   globals.css. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="if-page-enter">{children}</div>;
}
