import { SITE_NAME, SITE_URL, metaDescription, routeByPath } from "@/lib/site";

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

/* The reader.

   schema.org has Book and Chapter, and a surah is genuinely a chapter of a
   book, so this uses them rather than dressing the pages up as Articles. The
   Book node is shared: every surah page points at the same @id, which tells a
   crawler that 114 pages are parts of one work instead of 114 unrelated ones.

   Worth having for a reason beyond tidiness. There is very little Quran with
   a Telugu translation anywhere on the web, and these are the pages most
   likely to be found by someone searching in Telugu for a surah by name. */
const QURAN_ID = `${SITE_URL}/knowledge-center/learn-quran/read#quran`;

function quranBook() {
  return {
    "@type": "Book",
    "@id": QURAN_ID,
    name: "The Quran",
    alternateName: ["ఖురాన్", "القرآن"],
    url: `${SITE_URL}/knowledge-center/learn-quran/read`,
    numberOfPages: 604,
    inLanguage: ["ar", "te"],
    isAccessibleForFree: true,
    bookFormat: "https://schema.org/EBook",
    publisher: { "@id": ORG_ID },
  };
}

export function QuranIndexJsonLd({ count }: { count: number }) {
  const url = `${SITE_URL}/knowledge-center/learn-quran/read`;
  const graph = [
    quranBook(),
    {
      "@type": "CollectionPage",
      "@id": `${url}#page`,
      url,
      name: "ఖురాన్ చదవండి | Read the Quran",
      description: "All 114 surahs with Telugu meaning and pronunciation.",
      inLanguage: ["te", "en"],
      isPartOf: { "@id": SITE_ID },
      about: { "@id": QURAN_ID },
      numberOfItems: count,
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Learn Quran",
            item: `${SITE_URL}/knowledge-center/learn-quran`,
          },
          { "@type": "ListItem", position: 3, name: "Read the Quran", item: url },
        ],
      },
    },
  ];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(
          /</g,
          "\u003c",
        ),
      }}
    />
  );
}

export function SurahJsonLd({
  n,
  te,
  en,
  ar,
  meaning,
  ayahs,
}: {
  n: number;
  te: string;
  en: string;
  ar: string;
  meaning: string;
  ayahs: number;
}) {
  const url = `${SITE_URL}/knowledge-center/learn-quran/read/${n}`;
  const graph = [
    quranBook(),
    {
      "@type": "Chapter",
      "@id": `${url}#surah`,
      url,
      name: `${te} — ${en}`,
      alternateName: [ar, en, te],
      position: n,
      isPartOf: { "@id": QURAN_ID },
      inLanguage: ["ar", "te"],
      isAccessibleForFree: true,
      description: `Surah ${en} ("${meaning}"), ${ayahs} ayahs, with Telugu meaning and pronunciation.`,
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Read the Quran",
            item: `${SITE_URL}/knowledge-center/learn-quran/read`,
          },
          { "@type": "ListItem", position: 3, name: en, item: url },
        ],
      },
    },
  ];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(
          /</g,
          "\u003c",
        ),
      }}
    />
  );
}
