/* The learning streak: consecutive days this device opened a portal.

   The single strongest retention device the benchmarked platforms share —
   Duolingo built a company on it — and free to keep client-side. Counted on
   local days, bumped at most once per day, and forgiving by one missed day
   never: miss a day and the run starts again, which is what makes a streak
   mean something.

   touchStreak() is called from the portal course bar, so simply opening any
   portal keeps the flame lit. */
const KEY = "ifp-streak-v1";

type Streak = { last: string; run: number };

const dayString = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export function touchStreak(): number {
  try {
    const todayD = new Date();
    const today = dayString(todayD);
    const y = new Date(todayD);
    y.setDate(y.getDate() - 1);
    const yesterday = dayString(y);

    const raw = localStorage.getItem(KEY);
    const s = raw ? (JSON.parse(raw) as Streak) : null;

    let run = 1;
    if (s && s.last === today) run = s.run;
    else if (s && s.last === yesterday) run = s.run + 1;

    localStorage.setItem(KEY, JSON.stringify({ last: today, run }));
    return run;
  } catch {
    return 0;
  }
}
