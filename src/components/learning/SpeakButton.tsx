"use client";

import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { hasVoice, onVoicesReady, speak, type SpeakLang } from "@/lib/speak";

/* One button, wherever there is Arabic or Urdu to hear.

   The thirty vocabulary words on the Arabic and Urdu portals had no
   pronunciation of any kind, while the letters beside them each had a
   recording — so a learner could hear "ba" and not "barakah". This closes
   that with the device's own voice.

   It renders as unavailable rather than disappearing when the device has no
   voice for the language: a control that silently vanishes on some phones is
   harder to reason about than one that says it cannot help. */
const copy = {
  listen: { te: "వినండి", en: "Listen" },
  noVoice: {
    te: "ఈ పరికరంలో స్వరం లేదు",
    en: "No voice on this device",
  },
} as const;

export function SpeakButton({
  text,
  lang: speakLang = "ar",
  label,
  className = "",
}: {
  text: string;
  lang?: SpeakLang;
  /** Names the thing being spoken, for screen readers. */
  label?: string;
  className?: string;
}) {
  const { lang } = useI18n();
  /* null until the engine has listed its voices, which is async almost
     everywhere; treat unknown as available and find out on the first tap. */
  const [available, setAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => setAvailable(hasVoice(speakLang));
    check();
    return onVoicesReady(check);
  }, [speakLang]);

  const off = available === false;
  const title = off ? copy.noVoice[lang] : copy.listen[lang];

  return (
    <button
      type="button"
      onClick={() => {
        if (!speak(text, speakLang)) setAvailable(false);
      }}
      disabled={off}
      aria-label={label ? `${title}: ${label}` : title}
      title={title}
      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[var(--if-gold-ink)] transition-colors hover:bg-[var(--if-gold)]/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)] disabled:opacity-35 ${className}`}
    >
      {off ? <VolumeX aria-hidden="true" className="h-4 w-4" /> : <Volume2 aria-hidden="true" className="h-4 w-4" />}
    </button>
  );
}
