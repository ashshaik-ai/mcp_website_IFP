/* One tap you can feel.

   Every native prayer and dhikr app answers a touch with a tick; the web
   versions almost never do, and it is one line. Guarded: vibrate is absent on
   iOS Safari and desktop, and some browsers throw on it inside cross-origin
   frames. Silence is the correct fallback everywhere. */
export function buzz(pattern: number | number[] = 10) {
  try {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(pattern);
    }
  } catch {
    /* Not available: the visual feedback stands alone. */
  }
}
