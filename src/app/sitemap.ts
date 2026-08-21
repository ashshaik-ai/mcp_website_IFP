import type { MetadataRoute } from "next";
import { SITE_URL, routes } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((r) => ({
    url: `${SITE_URL}${r.path === "/" ? "" : r.path}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: r.priority,
  }));
}
