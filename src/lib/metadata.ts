import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, metaDescription, metaTitle, routeByPath } from "./site";

/** Per-route metadata: canonical, Open Graph and Twitter, from the route catalog. */
export function pageMetadata(path: string): Metadata {
  const r = routeByPath.get(path);
  if (!r) throw new Error(`No route catalog entry for "${path}" — add it to src/lib/site.ts`);

  const title = metaTitle(r);
  const description = metaDescription(r);
  const url = `${SITE_URL}${r.path === "/" ? "" : r.path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "te_IN",
      alternateLocale: ["en_IN"],
      url,
      title,
      description,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
