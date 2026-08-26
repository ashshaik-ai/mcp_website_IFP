import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight, ShieldCheck, AlertTriangle, HelpCircle } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { hadithCollections } from "@/content/hadith-index";
import {
  collectionById,
  gradeTone,
  loadBook,
  pageCount,
  GRADE_MEANING,
  PAGE_SIZE,
  type GradeTone,
  type Hadith,
} from "@/lib/hadith";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { HadithBookJsonLd } from "@/components/JsonLd";

/* One book of one collection.

   The grade is the load-bearing part of this page. Of the 36,057 narrations
   here, 5,048 are graded weak by at least one of the scholars who graded them,
   and a reader who repeats one of those as an established saying of the
   Prophet ﷺ has been failed by whoever showed it to them.

   So a grade is never a bare word. "Daif" means something to a scholar and
   nothing to everyone else, and this site is not written for scholars: the
   badge says what the grade means and what to do about it, in Telugu.

   Where several scholars disagreed, the weakest of their gradings is the one
   shown -- decided in the build. Someone deciding whether to repeat a
   narration should hear the lowest verdict on it, not the most flattering. */

type Params = { collection: string; book: string };

export function generateStaticParams(): Params[] {
  return hadithCollections.flatMap((c) =>
    c.books.map((b) => ({ collection: c.id, book: String(b.n) })),
  );
}

export const dynamicParams = false;

function resolve(collection: string, book: string) {
  const c = collectionById.get(collection);
  if (!c) return null;
  const n = Number(book);
  const meta = c.books.find((b) => b.n === n);
  if (!meta) return null;
  const loaded = loadBook(collection, n);
  if (!loaded) return null;
  return { c, meta, book: loaded };
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { collection, book } = await params;
  const found = resolve(collection, book);
  if (!found) return {};
  const url = `${SITE_URL}/knowledge-center/hadith/collections/${collection}/${book}`;
  const title = `${found.book.name} — ${found.c.en} | ${SITE_NAME}`;
  return {
    title: title.length <= 60 ? title : `${found.book.name} — ${found.c.en}`,
    description:
      `${found.book.name}, ${found.c.en}: ${found.meta.count} narrations in Arabic and English, each with its grade.`.slice(
        0,
        155,
      ),
    alternates: { canonical: url },
    openGraph: { title: `${found.book.name} — ${found.c.en}`, url, siteName: SITE_NAME, type: "article" },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { collection, book } = await params;
  const found = resolve(collection, book);
  if (!found) notFound();
  const { c, book: loaded } = found;

  const pages = pageCount(loaded.hadiths.length);
  const shown = loaded.hadiths.slice(0, PAGE_SIZE);

  return (
    <PageShell>
      <HadithBookJsonLd id={c.id} collectionEn={c.en} arabic={c.arabic} collectionCount={c.count} book={loaded.b} name={loaded.name} count={loaded.hadiths.length} />
      <BookHeader collection={c.te} collectionId={c.id} name={loaded.name} n={loaded.b} count={loaded.hadiths.length} />

      <section className="bg-[var(--if-cream-light)] px-4 py-10">
        <div className="mx-auto max-w-3xl">
          <ol className="flex flex-col gap-5">
            {shown.map((h) => (
              <HadithCard key={h.n} h={h} sahihThroughout={c.sahihThroughout} />
            ))}
          </ol>

          {pages > 1 && (
            <nav
              aria-label="పేజీలు"
              className="mt-10 flex items-center justify-between gap-3 border-t border-[var(--if-gold)]/20 pt-6"
            >
              <span className="text-sm text-[var(--if-text-muted)]">
                పేజీ <span className="tabular-nums font-semibold">1</span> /{" "}
                <span className="tabular-nums">{pages}</span>
              </span>
              <Link
                href={`/knowledge-center/hadith/collections/${c.id}/${loaded.b}/2`}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-[var(--if-green)] px-4 text-sm font-semibold text-[var(--if-gold-light)] transition-colors hover:bg-[var(--if-green-mid)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]"
              >
                తదుపరి పేజీ
                <ChevronRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </nav>
          )}
        </div>
      </section>
    </PageShell>
  );
}

export function BookHeader({
  collection,
  collectionId,
  name,
  n,
  count,
  page,
  pages,
}: {
  collection: string;
  collectionId: string;
  name: string;
  n: number;
  count: number;
  page?: number;
  pages?: number;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[var(--if-green-mid)] to-[var(--if-green)] px-4 py-10 text-[var(--if-gold-pale)]">
      <div className="relative mx-auto max-w-3xl">
        <Link
          href={`/knowledge-center/hadith/collections/${collectionId}`}
          className="mb-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-[var(--if-gold-light)] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]"
        >
          <ChevronLeft aria-hidden="true" className="h-4 w-4" />
          {collection}
        </Link>
        <h1 className="font-display text-2xl font-bold sm:text-3xl">
          <span className="text-[var(--if-gold-light)]">{n}.</span> {name}
        </h1>
        <p className="mt-2 text-sm text-[var(--if-gold-pale)]/80">
          <span className="tabular-nums">{count}</span> ఉల్లేఖనలు
          {page && pages ? (
            <>
              {" · "}పేజీ <span className="tabular-nums">{page}</span>/
              <span className="tabular-nums">{pages}</span>
            </>
          ) : null}
        </p>
      </div>
    </section>
  );
}

const TONE_STYLE: Record<GradeTone, string> = {
  sahih: "bg-[var(--if-green)]/10 text-[var(--if-green)]",
  hasan: "bg-[var(--if-gold)]/15 text-[var(--if-gold-ink)]",
  daif: "bg-[#8a3b1e]/10 text-[#8a3b1e]",
  mawdu: "bg-[#7a1f1f]/12 text-[#7a1f1f]",
  none: "bg-[var(--if-text-muted)]/10 text-[var(--if-text-muted)]",
};

export function HadithCard({ h, sahihThroughout }: { h: Hadith; sahihThroughout: boolean }) {
  const tone = gradeTone(h.g);
  /* In Bukhari and Muslim an absent grade is not a gap: the compiler's whole
     criterion was that everything in the book is sound. Everywhere else it
     means nobody in this data graded it, and that is worth saying. */
  const effective: GradeTone = tone === "none" && sahihThroughout ? "sahih" : tone;
  const Icon = effective === "sahih" ? ShieldCheck : effective === "none" ? HelpCircle : AlertTriangle;

  return (
    <li className="rounded-xl border border-[var(--if-gold)]/20 bg-white p-4 sm:p-5">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-[var(--if-cream)] px-2.5 py-0.5 text-xs font-bold tabular-nums text-[var(--if-gold-ink)]">
          #{h.n}
        </span>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${TONE_STYLE[effective]}`}
        >
          <Icon aria-hidden="true" className="h-3 w-3" />
          {h.g ?? GRADE_MEANING[effective].en.split(" — ")[0]}
        </span>
        {h.gby && <span className="text-[11px] text-[var(--if-text-muted)]">— {h.gby}</span>}
      </div>

      {h.ar && (
        <p className="font-arabic mb-4 text-right text-2xl leading-[2.2] text-[var(--if-text)]" lang="ar" dir="rtl">
          {h.ar}
        </p>
      )}

      <p className="leading-relaxed text-[var(--if-text-mid)]" style={{ textWrap: "pretty" }}>
        {h.en}
      </p>

      {/* What the grade means, for a reader who is not a scholar. Shown for
          anything that is not plainly sound, because that is when it matters. */}
      {(effective === "daif" || effective === "mawdu" || effective === "none") && (
        <p className="mt-3 rounded-lg bg-[var(--if-cream)] px-3 py-2 text-xs leading-relaxed text-[var(--if-text-mid)]">
          {GRADE_MEANING[effective].te}
        </p>
      )}
    </li>
  );
}
