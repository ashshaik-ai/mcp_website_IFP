import type { MetadataRoute } from "next";
import { SITE_URL, routes } from "@/lib/site";
import { lessons } from "@/content/all-lessons";
import { surahIndex } from "@/content/quran-index";
import { hadithCollections } from "@/content/hadith-index";

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

  /* All 114 surahs. Each is a page of Quran with a Telugu translation, and
     there is very little of that on the web: someone searching for
     "సూరా యాసీన్ తెలుగు" should find this. */
  const surahPages = surahIndex.map((s) => ({
    url: `${SITE_URL}/knowledge-center/learn-quran/read/${s.n}`,
    lastModified,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const readerPages = [
    { path: "/knowledge-center/learn-quran/read", priority: 0.8 },
    { path: "/knowledge-center/learn-quran/qaida", priority: 0.8 },
  ].map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: r.priority,
  }));

  /* The collections, and the first page of each book. Pages two and up are
     linked from those and stay crawlable, but listing 750 of them would bury
     the pages worth landing on. */
  const hadithPages = [
    { url: "/knowledge-center/hadith/collections", priority: 0.8 },
    ...hadithCollections.map((c) => ({
      url: `/knowledge-center/hadith/collections/${c.id}`,
      priority: 0.7,
    })),
    ...hadithCollections.flatMap((c) =>
      c.books.map((b) => ({
        url: `/knowledge-center/hadith/collections/${c.id}/${b.n}`,
        priority: 0.5,
      })),
    ),
  ].map((r) => ({
    url: `${SITE_URL}${r.url}`,
    lastModified,
    changeFrequency: "yearly" as const,
    priority: r.priority,
  }));

  return [...pages, ...lessonPages, ...readerPages, ...surahPages, ...hadithPages];
}
