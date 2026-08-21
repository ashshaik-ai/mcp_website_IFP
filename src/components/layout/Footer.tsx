"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { Phone, MapPin } from "lucide-react";

const quickLinks = [
  { key: "nav_victory",     href: "#victory" },
  { key: "nav_achievements",href: "#achievements" },
  { key: "nav_manifesto",   href: "#manifesto" },
  { key: "nav_schemes",     href: "#schemes" },
  { key: "nav_about",       href: "#about" },
  { key: "nav_contact",     href: "#contact" },
] as const;

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="bg-[var(--if-green)] text-[var(--if-gold-pale)]/80 border-t border-[var(--if-gold)]/20">
      <div className="mx-auto max-w-7xl px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div className="space-y-3">
          <h3 className="font-display text-[var(--if-gold-light)] text-xl font-bold">Islamic Front</h3>
          <p className="text-sm leading-relaxed">{t("footer_since")}</p>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-[var(--if-gold)]" />
            <a href="tel:+919032906677" className="inline-flex items-center min-h-6 hover:text-[var(--if-gold-light)] transition-colors">
              +91 90329 06677
            </a>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <MapPin className="h-4 w-4 text-[var(--if-gold)] mt-0.5 flex-shrink-0" />
            <span>{t("footer_addr")}</span>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-[var(--if-gold-light)] font-semibold mb-4 text-sm uppercase tracking-wider">
            Quick Links
          </h4>
          <ul className="space-y-2">
            {quickLinks.map(({ key, href }) => (
              <li key={key}>
                <a href={href} className="text-sm inline-flex items-center min-h-6 hover:text-[var(--if-gold-light)] transition-colors">
                  {t(key)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Portals */}
        <div>
          <h4 className="text-[var(--if-gold-light)] font-semibold mb-4 text-sm uppercase tracking-wider">
            Portals
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/knowledge-center" className="inline-flex items-center min-h-6 hover:text-[var(--if-gold-light)] transition-colors">{t("nav_kc")}</Link></li>
            <li><Link href="/student-guidance" className="inline-flex items-center min-h-6 hover:text-[var(--if-gold-light)] transition-colors">{t("nav_sg")}</Link></li>
            <li><Link href="/knowledge-center/learn-arabic" className="inline-flex items-center min-h-6 hover:text-[var(--if-gold-light)] transition-colors">Learn Arabic</Link></li>
            <li><Link href="/knowledge-center/learn-quran" className="inline-flex items-center min-h-6 hover:text-[var(--if-gold-light)] transition-colors">Learn Quran</Link></li>
            <li><Link href="/knowledge-center/learn-salah" className="inline-flex items-center min-h-6 hover:text-[var(--if-gold-light)] transition-colors">Learn Salah</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--if-gold)]/20 py-4 px-4 text-center text-xs text-[var(--if-gold-pale)]/50">
        {t("footer_copy")}
      </div>
    </footer>
  );
}
