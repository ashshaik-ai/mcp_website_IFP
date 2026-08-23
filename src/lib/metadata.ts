import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, metaDescription, metaTitle, routeByPath } from "./site";

/** Per-route metadata: canonical, Open Graph and Twitter, from the route catalog. */
export function pageMetadata(path: string): Metadata {
  const r = routeByPath.get(path);
  if (!r) throw new Error(`No route catalog entry for "${path}" — add it to src/lib/site.ts`);

  const title = metaTitle(r);
  const description = metaDescription(r);
  const url = `${SITE_URL}${r.path === "/" ? "" : r.path}`;

  /* twitter:card was summary_large_image with no image anywhere, so every
     share — WhatsApp especially, which is how this community passes links
     around — rendered as a bare text row. The seal is the one asset that is
     recognisably this organisation at thumbnail size. */
  const image = {
    url: `${SITE_URL}/assets/logo-emblem.png`,
    width: 1151,
    height: 1151,
    alt: SITE_NAME,
  };

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
      images: [image],
    },
    twitter: { card: "summary", title, description, images: [image.url] },
  };
}
