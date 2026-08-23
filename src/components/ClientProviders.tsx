"use client";

import { I18nProvider } from "@/lib/i18n/context";
import { ProgressProvider } from "@/lib/progress";
import { DecksProvider } from "@/lib/decks";
import { QuizResultsProvider } from "@/lib/quiz-results";
import { FloatingWhatsApp } from "./FloatingWhatsApp";
import { ServiceWorker } from "./ServiceWorker";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <ProgressProvider>
        <DecksProvider>
        <QuizResultsProvider>
        {children}
        <FloatingWhatsApp />
        <ServiceWorker />
        </QuizResultsProvider>
        </DecksProvider>
      </ProgressProvider>
    </I18nProvider>
  );
}
