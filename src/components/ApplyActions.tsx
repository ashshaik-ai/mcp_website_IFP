"use client";

import { MessageCircle, Phone } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

/* Every community offering on the site was a dead end: the funeral-aid scheme,
   the events, the scholarships. They described what is available and then
   stopped, with no way to ask for it. There is no backend here and no form to
   post to — but there is a phone that answers and a WhatsApp number the
   organisation already runs, and a message can arrive already saying what it
   is about.

   `topic` is what the reader was looking at; it goes into the prefilled
   WhatsApp text so whoever picks it up knows before they reply. */

const PHONE = "+919032906677";
const WA = "919032906677";

const copy = {
  whatsapp: { te: "వాట్సాప్‌లో అడగండి", en: "Ask on WhatsApp" },
  call: { te: "ఫోన్ చేయండి", en: "Call us" },
  note: {
    te: "సోమ–శని, ఉదయం 9 – సాయంత్రం 6",
    en: "Mon–Sat, 9am – 6pm",
  },
} as const;

export function ApplyActions({
  topic,
  className = "",
  tone = "dark",
}: {
  topic: { te: string; en: string };
  className?: string;
  /** dark = on the green ground, light = on cream. */
  tone?: "dark" | "light";
}) {
  const { lang } = useI18n();
  const message = encodeURIComponent(
    lang === "te"
      ? `అస్సలామువాలైకుమ్. ${topic.te} గురించి తెలుసుకోవాలనుకుంటున్నాను.`
      : `Assalamu alaikum. I would like to know about ${topic.en}.`,
  );

  const primary =
    tone === "dark"
      ? "bg-[var(--if-gold)] text-[var(--if-green)] hover:bg-[var(--if-gold-light)]"
      : "bg-[var(--if-green)] text-[var(--if-gold-light)] hover:bg-[var(--if-green-mid)]";
  const secondary =
    tone === "dark"
      ? "border-[var(--if-gold)]/45 text-[var(--if-gold-light)] hover:bg-[var(--if-gold)]/10"
      : "border-[var(--if-gold)]/45 text-[var(--if-green)] hover:bg-[var(--if-gold)]/10";
  const noteTone = tone === "dark" ? "text-[var(--if-gold-pale)]/65" : "text-[var(--if-text-muted)]";

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a
        href={`https://wa.me/${WA}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)] ${primary}`}
      >
        <MessageCircle aria-hidden="true" className="h-4 w-4" />
        {copy.whatsapp[lang]}
      </a>
      <a
        href={`tel:${PHONE}`}
        className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)] ${secondary}`}
      >
        <Phone aria-hidden="true" className="h-4 w-4" />
        {copy.call[lang]}
      </a>
      <span className={`text-xs ${noteTone}`}>{copy.note[lang]}</span>
    </div>
  );
}
