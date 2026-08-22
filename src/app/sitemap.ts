import type { MetadataRoute } from "next";
import { SITE_URL, routes } from "@/lib/site";
import { lessons } from "@/content/all-lessons";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages = routes.map((r) => ({
    url: `${SITE_URL}${r.path === "/" ? "" : r.path}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: r.priority,
  }));

  /* Lessons change least often but are the pages most worth finding from a
     search, since each answers one specific question. */
  const lessonPages = lessons.map((l) => ({
    url: `${SITE_URL}/knowledge-center/${l.portal}/${l.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...pages, ...lessonPages];
}
