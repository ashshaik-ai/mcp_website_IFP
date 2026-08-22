"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { usePathname } from "next/navigation";
import { Phone, MapPin } from "lucide-react";
import { homeSections, sectionHref } from "@/lib/nav";

export function Footer() {
  const { t } = useI18n();
  const pathname = usePathname();
  return (
    <footer className="bg-[var(--if-green)] text-[var(--if-gold-pale)]/80 border-t border-[var(--if-gold)]/20">
      <div className="mx-auto max-w-7xl px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div className="space-y-3">
          {/* The organisation's own logo, wordmark and all, in gold. */}
          <span className="if-logo-full" role="img" aria-label="Islamic Front" />
          <h2 className="font-display text-[var(--if-gold-light)] text-xl font-bold">Islamic Front</h2>
          <p className="text-sm leading-relaxed">{t("footer_since")}</p>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-[var(--if-gold-light)]" />
            <a href="tel:+919032906677" className="inline-flex items-center min-h-11 hover:text-[var(--if-gold-light)] transition-colors">
              +91 90329 06677
            </a>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <MapPin className="h-4 w-4 text-[var(--if-gold-light)] mt-0.5 flex-shrink-0" />
            <span>{t("footer_addr")}</span>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="text-[var(--if-gold-light)] font-semibold mb-4 text-sm uppercase tracking-wider">
            {t("footer_quick_links")}
          </h3>
          <ul className="space-y-2">
            {homeSections.map(({ key, fragment }) => (
              <li key={key}>
                <Link
                  href={sectionHref(fragment, pathname)}
                  className="text-sm inline-flex items-center min-h-11 hover:text-[var(--if-gold-light)] transition-colors"
                >
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Portals */}
        <div>
          <h3 className="text-[var(--if-gold-light)] font-semibold mb-4 text-sm uppercase tracking-wider">
            {t("footer_portals")}
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/knowledge-center" className="inline-flex items-center min-h-11 hover:text-[var(--if-gold-light)] transition-colors">{t("nav_kc")}</Link></li>
            <li><Link href="/student-guidance" className="inline-flex items-center min-h-11 hover:text-[var(--if-gold-light)] transition-colors">{t("nav_sg")}</Link></li>
            <li><Link href="/knowledge-center/learn-arabic" className="inline-flex items-center min-h-11 hover:text-[var(--if-gold-light)] transition-colors">{t("portal_arabic")}</Link></li>
            <li><Link href="/knowledge-center/learn-quran" className="inline-flex items-center min-h-11 hover:text-[var(--if-gold-light)] transition-colors">{t("portal_quran")}</Link></li>
            <li><Link href="/knowledge-center/learn-salah" className="inline-flex items-center min-h-11 hover:text-[var(--if-gold-light)] transition-colors">{t("portal_salah")}</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--if-gold)]/20 py-4 px-4 text-center text-xs text-[var(--if-gold-pale)]/80">
        {t("footer_copy").replace("{year}", String(new Date().getFullYear()))}
      </div>
    </footer>
  );
}
