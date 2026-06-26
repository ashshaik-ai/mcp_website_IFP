"use client";

import { I18nProvider } from "@/lib/i18n/context";
import { FloatingWhatsApp } from "./FloatingWhatsApp";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      {children}
      <FloatingWhatsApp />
    </I18nProvider>
  );
}
