"use client";

import { I18nProvider } from "@/lib/i18n/context";
import { ProgressProvider } from "@/lib/progress";
import { FloatingWhatsApp } from "./FloatingWhatsApp";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <ProgressProvider>
        {children}
        <FloatingWhatsApp />
      </ProgressProvider>
    </I18nProvider>
  );
}
