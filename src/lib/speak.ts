/* Saying the Arabic out loud, without an audio library.

   Every rival platform this site was benchmarked against is audio-first, and
   the single most repeated gap across all thirteen portals was that a learner
   can see a phrase and not hear it. Recorded recitation by a qari is the right
   answer and is not something code can produce; this is the honest substitute
   that ships today — the browser's own speech synthesis, which every modern
   device has and which costs nothing to serve.

   It is not recitation and does not pretend to be: the voice is a system TTS
   voice reading Arabic, useful for "how does this word sound" and no
   substitute for tajweed. Where a device has no Arabic voice it says so
   rather than playing nothing, which is what a button that looks alive and
   stays silent amounts to. */

export type SpeakLang = "ar" | "ur";

const LANG_TAG: Record<SpeakLang, string> = { ar: "ar-SA", ur: "ur-PK" };

/** Whether this device has a voice for the language. Null before voices load. */
export function hasVoice(lang: SpeakLang): boolean | null {
  try {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
    const voices = speechSynthesis.getVoices();
    /* An empty list means the engine has not populated them yet, not that
       there are none — the caller should ask again after `voiceschanged`. */
    if (!voices.length) return null;
    return voices.some((v) => v.lang?.toLowerCase().startsWith(lang));
  } catch {
    return false;
  }
}

/** Speaks the text. Returns false when nothing will be heard. */
export function speak(text: string, lang: SpeakLang = "ar"): boolean {
  try {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
    if (hasVoice(lang) === false) return false;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = LANG_TAG[lang];
    /* Slower than speech: these are phrases being learned, not read. */
    u.rate = 0.75;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
    return true;
  } catch {
    return false;
  }
}

/** Subscribe to the voice list arriving, which is async on most engines. */
export function onVoicesReady(fn: () => void): () => void {
  try {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return () => {};
    speechSynthesis.addEventListener("voiceschanged", fn);
    return () => speechSynthesis.removeEventListener("voiceschanged", fn);
  } catch {
    return () => {};
  }
}
