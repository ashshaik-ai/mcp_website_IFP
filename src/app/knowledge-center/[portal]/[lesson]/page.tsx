import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { lessons, lessonsByPortal } from "@/content/all-lessons";
import { SITE_NAME, SITE_URL, routeByPath } from "@/lib/site";
import { LessonJsonLd } from "@/components/JsonLd";
import LessonClient from "./client";

type Params = { portal: string; lesson: string };

/* All 54 are known at build time, so every lesson prerenders as static. */
export function generateStaticParams(): Params[] {
  return lessons.map((l) => ({ portal: l.portal, lesson: l.slug }));
}

/* A lesson slug outside this list is not a lesson route. */
export const dynamicParams = false;

function resolve(portal: string, slug: string) {
  const siblings = lessonsByPortal(portal);
  const index = siblings.findIndex((l) => l.slug === slug);
  if (index === -1) return null;
  const portalRoute = routeByPath.get(`/knowledge-center/${portal}`);
  return { siblings, index, lesson: siblings[index], portalRoute };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { portal, lesson: slug } = await params;
  const found = resolve(portal, slug);
  if (!found) return {};

  const { lesson, portalRoute } = found;
  const portalName = portalRoute?.title.en ?? portal;
  /* Same rule as the route catalog: Telugu leads, the English half is
     appended only when the whole title still fits inside 60 characters, and
     the description is Telugu-first and cut to 155 on a word boundary. Both
     used to carry two languages in full and ran to 90 and 244. */
  const portalTe = portalRoute?.title.te ?? portalName;
  const full = `${lesson.title.te} | ${lesson.title.en} — ${portalName}`;
  const title = full.length <= 60 ? full : `${lesson.title.te} — ${portalTe}`;

  const introTe = (lesson.intro?.te || lesson.summary?.te || "").trim();
  const introEn = (lesson.intro?.en || lesson.summary?.en || "").trim();
  const both = `${introTe} ${introEn}`.trim();
  const description =
    both.length <= 155
      ? both
      : introTe.length <= 155
        ? introTe
        : (() => {
            const cut = introTe.slice(0, 154);
            const sp = cut.lastIndexOf(" ");
            return `${sp > 92 ? cut.slice(0, sp) : cut}…`;
          })();
  const url = `${SITE_URL}/knowledge-center/${portal}/${slug}`;
  /* Declaring openGraph here replaces the layout's block rather than merging
     with it, so these 76 pages -- 83% of the site -- shipped a
     summary_large_image card with no image and shared as a bare text row. */
  const image = { url: `${SITE_URL}/assets/logo-emblem.png`, width: 1151, height: 1151, alt: SITE_NAME };

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
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

export default async function Page({ params }: { params: Promise<Params> }) {
  const { portal, lesson: slug } = await params;
  const found = resolve(portal, slug);
  if (!found) notFound();

  const { siblings, index, lesson, portalRoute } = found;
  const brief = (l: (typeof siblings)[number]) => ({ slug: l.slug, title: l.title });

  return (
    <>
      <LessonJsonLd
        portal={portal}
        slug={slug}
        title={`${lesson.title.en} — ${lesson.title.te}`}
        crumbName={lesson.title.en}
        description={(lesson.intro?.en || lesson.summary?.en || "").slice(0, 300)}
        sectionCount={lesson.sections.length}
        faqs={lesson.faqs.map((f) => ({ question: f.question.en, answer: f.answer.en }))}
      />
      <LessonClient
        lesson={lesson}
        index={index}
        total={siblings.length}
        prev={index > 0 ? brief(siblings[index - 1]) : null}
        next={index < siblings.length - 1 ? brief(siblings[index + 1]) : null}
        portalHref={`/knowledge-center/${portal}`}
        portalTitle={portalRoute?.title ?? { te: portal, en: portal }}
      />
    </>
  );
}
