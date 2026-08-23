"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SpotlightNavbar, type NavItem } from "@/components/ui/spotlight-navbar";
import { useI18n } from "@/lib/i18n/context";
import { BookOpen, GraduationCap, Menu } from "lucide-react";
import { homeSections, sectionHref } from "@/lib/nav";
import { useScrollSpy } from "@/lib/use-scroll-spy";
import { SiteSearch } from "@/components/search/SiteSearch";

/* Stable identity: the hook keys an effect on this array, so rebuilding it
   every render would re-create the observer on every render. */
const SECTION_IDS = homeSections.map((s) => s.fragment.slice(1));

export function Navbar() {
  const { t, toggle, lang } = useI18n();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  /* Only the homepage has these sections in the document; anywhere else the
     links point back at "/" and nothing should be marked current. */
  const spied = useScrollSpy(SECTION_IDS);
  const activeIndex = pathname === "/" ? spied : -1;
  const desktopNavItems: NavItem[] = homeSections.map(({ key, fragment }) => ({
    label: t(key),
    href: sectionHref(fragment, pathname),
  }));

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--if-gold)]/20 bg-[var(--if-green)] text-[var(--if-gold-pale)]">
      {/* Three grid tracks with the outer two sharing the slack equally, so the
          nav sits on the page's centre line AND can never be reached by the
          action group. It was absolutely centred, which is centred but not in
          flow: in English the action group is 400px wide against the brand's
          188px, so the centred nav ran 84px underneath it and "Contact" sat on
          top of the Knowledge Center pill. minmax(0,1fr) keeps the outer tracks
          equal — a bare 1fr lets the wider one grow and drags the centre off. */}
      {/* The grid only at lg, where the centre nav exists. Below that it
          squeezed the brand into a column the width of the action group,
          wrapping "Islamic Front" onto two lines. */}
      <div className="relative mx-auto max-w-7xl xl:max-w-[88rem] px-4 h-16 flex items-center justify-between gap-3 xl:grid xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 min-h-11 leading-tight group xl:justify-self-start">
          <span className="if-mark" aria-hidden="true" />
          {/* Under 360px only the seal fits beside the three controls; the
              name is in the hero and the footer on every page. */}
          <span className="hidden min-[360px]:flex flex-col justify-center whitespace-nowrap">
            <span className="font-display text-[var(--if-gold-light)] font-bold text-lg tracking-tight leading-tight">
              Islamic Front
            </span>
            {/* Hidden until 400px: between 360 and 388 the tagline pushed the
                row 27px past the viewport and clipped the menu button off the
                right edge. */}
            <span className="hidden min-[400px]:block text-[10px] text-[var(--if-gold-light)] tracking-widest uppercase">
              Mangalagiri · Est. 2011
            </span>
          </span>
        </Link>

        {/* Desktop nav, in the middle track of the header grid. */}
        <div className="hidden xl:block xl:justify-self-center xl:min-w-0">
          <SpotlightNavbar
            className="pt-0"
            items={desktopNavItems}
            activeIndex={activeIndex}
            onItemClick={(item) => {
              window.location.assign(item.href);
            }}
          />
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1 sm:gap-2 xl:justify-self-end">
          {/* The site's two other top-level products, as icons at every width
              the drawer is not shown. Labelled pills were 400px of action
              group in English, which is more than the header has to spare
              beside a centred six-item section nav — the nav ran underneath
              them. The section nav itself only appears from xl, where it
              fits; below that it is in the drawer with everything else. */}
          <Link
            href="/knowledge-center"
            aria-label={t("nav_kc")}
            title={t("nav_kc")}
            className="hidden lg:inline-flex items-center justify-center size-11 rounded-full border border-[var(--if-gold)]/40 text-[var(--if-gold-light)] hover:bg-[var(--if-gold)]/10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]"
          >
            <BookOpen aria-hidden="true" className="h-5 w-5" />
          </Link>
          <Link
            href="/student-guidance"
            aria-label={t("nav_sg")}
            title={t("nav_sg")}
            className="hidden lg:inline-flex items-center justify-center size-11 rounded-full border border-[var(--if-gold)]/40 text-[var(--if-gold-light)] hover:bg-[var(--if-gold)]/10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]"
          >
            <GraduationCap aria-hidden="true" className="h-5 w-5" />
          </Link>
          <SiteSearch />

          {/* The accessible name has to start with the visible label, or voice
              control users saying what they can see ("English") match nothing. */}
          <button
            type="button"
            onClick={toggle}
            aria-label={`${t("lang_toggle")} — ${lang === "te" ? "భాష మార్చండి" : "switch language"}`}
            className="min-h-11 px-3 text-[11px] font-semibold rounded-full border border-[var(--if-gold)]/40 text-[var(--if-gold-light)] hover:bg-[var(--if-gold)]/10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]"
          >
            {t("lang_toggle")}
          </button>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <button
                  type="button"
                  aria-label={t("nav_menu")}
                  title={t("nav_menu")}
                  className="xl:hidden inline-flex items-center justify-center size-11 rounded-md text-[var(--if-gold-light)] hover:bg-white/10 transition-colors"
                />
              }
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
              
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-[var(--if-green)] border-[var(--if-gold)]/20 w-72"
              aria-label={t("nav_menu")}
              closeLabel={t("nav_close")}
            >
              <div className="flex flex-col gap-1 mt-8">
                {homeSections.map(({ key, fragment }) => (
                  <Link
                    key={key}
                    href={sectionHref(fragment, pathname)}
                    onClick={() => setOpen(false)}
                    className="px-4 py-3 text-[var(--if-gold-pale)]/80 hover:text-[var(--if-gold-light)] hover:bg-white/5 rounded-lg transition-colors"
                  >
                    {t(key)}
                  </Link>
                ))}
                <div className="border-t border-[var(--if-gold)]/20 my-2" />
                <Link href="/knowledge-center" onClick={() => setOpen(false)} className="px-4 py-3 text-[var(--if-gold-light)] font-semibold">
                  {t("nav_kc")}
                </Link>
                <Link href="/student-guidance" onClick={() => setOpen(false)} className="px-4 py-3 text-[var(--if-gold-light)] font-semibold">
                  {t("nav_sg")}
                </Link>

                {/* Opening the drawer covers the language toggle in the header,
                    so the one control a Telugu-or-English reader most wants is
                    the one the menu takes away. */}
                <div className="border-t border-[var(--if-gold)]/20 my-2" />
                <button
                  type="button"
                  onClick={() => {
                    toggle();
                    setOpen(false);
                  }}
                  className="mx-4 inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--if-gold)]/40 px-4 text-sm font-semibold text-[var(--if-gold-light)] transition-colors hover:bg-[var(--if-gold)]/10"
                >
                  {t("lang_toggle")}
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
