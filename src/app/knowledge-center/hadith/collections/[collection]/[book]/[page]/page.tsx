import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { hadithCollections } from "@/content/hadith-index";
import { collectionById, loadBook, pageCount, PAGE_SIZE } from "@/lib/hadith";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { HadithBookJsonLd } from "@/components/JsonLd";
import { BookHeader, HadithCard } from "../page";

/* Pages two and up of a book.

   Page one lives at the book's own URL, so a link to a book is a link to its
   beginning rather than to /1. Only books that overflow a page generate these
   at all: 279 of the 399 books fit on one page and produce nothing here. */

type Params = { collection: string; book: string; page: string };

export function generateStaticParams(): Params[] {
  const out: Params[] = [];
  for (const c of hadithCollections) {
    for (const b of c.books) {
      const pages = pageCount(b.count);
      for (let p = 2; p <= pages; p++) {
        out.push({ collection: c.id, book: String(b.n), page: String(p) });
      }
    }
  }
  return out;
}

export const dynamicParams = false;

function resolve(collection: string, book: string, page: string) {
  const c = collectionById.get(collection);
  if (!c) return null;
  const n = Number(book);
  const p = Number(page);
  const loaded = loadBook(collection, n);
  if (!loaded || !Number.isInteger(p) || p < 2) return null;
  const pages = pageCount(loaded.hadiths.length);
  if (p > pages) return null;
  return { c, book: loaded, p, pages };
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { collection, book, page } = await params;
  const found = resolve(collection, book, page);
  if (!found) return {};
  const url = `${SITE_URL}/knowledge-center/hadith/collections/${collection}/${book}/${page}`;
  return {
    title: `${found.book.name} ${found.p}/${found.pages} — ${found.c.en}`.slice(0, 60),
    description: `${found.book.name}, ${found.c.en} — page ${found.p} of ${found.pages}.`.slice(0, 155),
    alternates: { canonical: url },
    /* Page two of a book is not something a search result should land on
       ahead of page one, but it must stay crawlable so the narrations on it
       are reachable. */
    robots: { index: true, follow: true },
    openGraph: { title: `${found.book.name} — ${found.c.en}`, url, siteName: SITE_NAME, type: "article" },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { collection, book, page } = await params;
  const found = resolve(collection, book, page);
  if (!found) notFound();
  const { c, book: loaded, p, pages } = found;

  const start = (p - 1) * PAGE_SIZE;
  const shown = loaded.hadiths.slice(start, start + PAGE_SIZE);
  const base = `/knowledge-center/hadith/collections/${c.id}/${loaded.b}`;

  return (
    <PageShell>
      <HadithBookJsonLd id={c.id} collectionEn={c.en} arabic={c.arabic} collectionCount={c.count} book={loaded.b} name={loaded.name} count={loaded.hadiths.length} page={p} />
      <BookHeader
        collection={c.te}
        collectionId={c.id}
        name={loaded.name}
        n={loaded.b}
        count={loaded.hadiths.length}
        page={p}
        pages={pages}
      />

      <section className="bg-[var(--if-cream-light)] px-4 py-10">
        <div className="mx-auto max-w-3xl">
          <ol className="flex flex-col gap-5">
            {shown.map((h) => (
              <HadithCard key={h.n} h={h} sahihThroughout={c.sahihThroughout} />
            ))}
          </ol>

          <nav
            aria-label="పేజీలు"
            className="mt-10 flex items-center justify-between gap-3 border-t border-[var(--if-gold)]/20 pt-6"
          >
            <Link
              href={p === 2 ? base : `${base}/${p - 1}`}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-[var(--if-gold)]/30 px-4 text-sm font-semibold text-[var(--if-text-mid)] transition-colors hover:border-[var(--if-gold)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]"
            >
              <ChevronLeft aria-hidden="true" className="h-4 w-4" />
              మునుపటి
            </Link>
            <span className="text-sm text-[var(--if-text-muted)]">
              <span className="tabular-nums font-semibold">{p}</span> /{" "}
              <span className="tabular-nums">{pages}</span>
            </span>
            {p < pages ? (
              <Link
                href={`${base}/${p + 1}`}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-[var(--if-green)] px-4 text-sm font-semibold text-[var(--if-gold-light)] transition-colors hover:bg-[var(--if-green-mid)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]"
              >
                తదుపరి
                <ChevronRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            ) : (
              <span className="min-h-11" />
            )}
          </nav>
        </div>
      </section>
    </PageShell>
  );
}
