import { SITE_NAME, SITE_URL, metaDescription, routeByPath, routes } from "@/lib/site";

/* Structured data, emitted server-side so crawlers see it in the HTML.
   The organisation graph goes on the homepage; every other route gets a
   WebPage node plus breadcrumbs. Content comes from the same route catalog
   that drives the metadata, so the two cannot describe different pages. */

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

function organisationGraph() {
  return [
    {
      "@type": "NGO",
      "@id": ORG_ID,
      name: SITE_NAME,
      alternateName: "ఇస్లామిక్ ఫ్రంట్, మంగళగిరి",
      url: SITE_URL,
      foundingDate: "2011",
      logo: `${SITE_URL}/assets/logo.png`,
      telephone: "+91-90329-06677",
      email: "islamicfrontmangalagiri@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mangalagiri",
        addressRegion: "Andhra Pradesh",
        postalCode: "522503",
        addressCountry: "IN",
      },
      areaServed: { "@type": "Place", name: "Mangalagiri, Guntur District" },
    },
    {
      "@type": "WebSite",
      "@id": SITE_ID,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: ["te", "en"],
      publisher: { "@id": ORG_ID },
    },
  ];
}

export function JsonLd({ path }: { path: string }) {
  const route = routeByPath.get(path);
  if (!route) return null;

  const url = `${SITE_URL}${route.path === "/" ? "" : route.path}`;
  const isHome = route.path === "/";

  const crumbs = [{ name: "Home", item: SITE_URL }];
  if (!isHome) {
    if (route.path.startsWith("/knowledge-center") && route.path !== "/knowledge-center") {
      const hub = routeByPath.get("/knowledge-center");
      if (hub) crumbs.push({ name: hub.title.en, item: `${SITE_URL}/knowledge-center` });
    }
    crumbs.push({ name: route.title.en, item: url });
  }

  const graph: Record<string, unknown>[] = [
    ...(isHome ? organisationGraph() : []),
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: `${route.title.en} — ${route.title.te}`,
      description: metaDescription(route),
      inLanguage: "te",
      isPartOf: { "@id": SITE_ID },
      about: { "@id": ORG_ID },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.name,
          item: c.item,
        })),
      },
    },
  ];

  return (
    <script
      type="application/ld+json"
      // Server-rendered from our own catalog; no user input reaches this.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(
          /</g,
          "\\u003c",
        ),
      }}
    />
  );
}

/* Lessons get their own graph: LearningResource rather than WebPage, plus the
   quiz and FAQ content they carry. FAQPage markup is only honest when the
   questions and answers are genuinely on the page, which they are. */
export function LessonJsonLd({
  portal,
  slug,
  title,
  crumbName,
  description,
  sectionCount,
  faqs,
}: {
  portal: string;
  slug: string;
  title: string;
  /** Short name for the breadcrumb — the full bilingual title reads as noise there. */
  crumbName: string;
  description: string;
  sectionCount: number;
  faqs: { question: string; answer: string }[];
}) {
  const url = `${SITE_URL}/knowledge-center/${portal}/${slug}`;
  const portalRoute = routeByPath.get(`/knowledge-center/${portal}`);

  const graph: Record<string, unknown>[] = [
    {
      "@type": "LearningResource",
      "@id": `${url}#lesson`,
      url,
      name: title,
      description,
      inLanguage: ["te", "en"],
      isAccessibleForFree: true,
      learningResourceType: "Lesson",
      educationalLevel: "Beginner",
      numberOfItems: sectionCount,
      isPartOf: { "@id": SITE_ID },
      provider: { "@id": ORG_ID },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: portalRoute?.title.en ?? portal,
            item: `${SITE_URL}/knowledge-center/${portal}`,
          },
          { "@type": "ListItem", position: 3, name: crumbName, item: url },
        ],
      },
    },
  ];

  if (faqs.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    });
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(
          /</g,
          "\\u003c",
        ),
      }}
    />
  );
}
