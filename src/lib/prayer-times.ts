/* Prayer times, computed in the browser. Ported from the PrayTimes.org
   algorithm the static site has used since 2026, unchanged in substance.

   Method: University of Islamic Sciences, Karachi (Fajr 18°, Isha 18°),
   Hanafi Asr. No API, no key, no uptime to depend on — and the local masjid
   remains authoritative, which the UI says plainly. */

export const MANGALAGIRI = { lat: 16.4307, lng: 80.568, tz: 5.5 } as const;

export type PrayerKey = "fajr" | "sunrise" | "dhuhr" | "asr" | "maghrib" | "isha";
export type PrayerTimes = Record<PrayerKey, number>;

const D2R = Math.PI / 180;
const R2D = 180 / Math.PI;

const sin = (d: number) => Math.sin(d * D2R);
const cos = (d: number) => Math.cos(d * D2R);
const tan = (d: number) => Math.tan(d * D2R);
const asin = (x: number) => R2D * Math.asin(x);
const acos = (x: number) => R2D * Math.acos(x);
const atan2 = (y: number, x: number) => R2D * Math.atan2(y, x);
const acot = (x: number) => R2D * Math.atan(1 / x);

const fixAngle = (a: number) => ((a % 360) + 360) % 360;
const fixHour = (a: number) => ((a % 24) + 24) % 24;

function julian(y: number, m: number, d: number): number {
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + B - 1524.5;
}

function sunPos(jd: number) {
  const D = jd - 2451545.0;
  const g = fixAngle(357.529 + 0.98560028 * D);
  const q = fixAngle(280.459 + 0.98564736 * D);
  const L = fixAngle(q + 1.915 * sin(g) + 0.02 * sin(2 * g));
  const e = 23.439 - 0.00000036 * D;
  const RA = atan2(cos(e) * sin(L), cos(L)) / 15;
  return { decl: asin(sin(e) * sin(L)), eqt: q / 15 - fixHour(RA) };
}

const midDay = (jd: number, t: number) => fixHour(12 - sunPos(jd + t).eqt);

function sunAngle(jd: number, t: number, angle: number, lat: number, ccw: boolean) {
  const decl = sunPos(jd + t).decl;
  const noon = midDay(jd, t);
  const x = (-sin(angle) - sin(lat) * sin(decl)) / (cos(lat) * cos(decl));
  const T = (1 / 15) * acos(x);
  return noon + (ccw ? -T : T);
}

function asrTime(jd: number, t: number, factor: number, lat: number) {
  const decl = sunPos(jd + t).decl;
  return sunAngle(jd, t, -acot(factor + tan(Math.abs(lat - decl))), lat, false);
}

/** Times as fractional hours in the given timezone. */
export function prayerTimes(
  year: number,
  month: number,
  day: number,
  { lat, lng, tz } = MANGALAGIRI,
  hanafi = true,
): PrayerTimes {
  const fajrAngle = 18;
  const ishaAngle = 18;
  const riseSet = 0.833;
  const asrFactor = hanafi ? 2 : 1;
  const jd = julian(year, month, day) - lng / (15 * 24);

  let t = { fajr: 5 / 24, sunrise: 6 / 24, dhuhr: 12 / 24, asr: 13 / 24, sunset: 18 / 24, isha: 18 / 24 };
  for (let i = 0; i < 3; i++) {
    t = {
      fajr: sunAngle(jd, t.fajr, fajrAngle, lat, true) / 24,
      sunrise: sunAngle(jd, t.sunrise, riseSet, lat, true) / 24,
      dhuhr: midDay(jd, t.dhuhr) / 24,
      asr: asrTime(jd, t.asr, asrFactor, lat) / 24,
      sunset: sunAngle(jd, t.sunset, riseSet, lat, false) / 24,
      isha: sunAngle(jd, t.isha, ishaAngle, lat, false) / 24,
    };
  }

  const adj = (h: number) => fixHour(h + tz - lng / 15);
  return {
    fajr: adj(t.fajr * 24),
    sunrise: adj(t.sunrise * 24),
    dhuhr: adj(t.dhuhr * 24) + 1 / 60,
    asr: adj(t.asr * 24),
    maghrib: adj(t.sunset * 24) + 1 / 60,
    isha: adj(t.isha * 24),
  };
}

/** "now" shifted into the location's timezone, so the day never rolls early. */
export function nowInZone(tz = MANGALAGIRI.tz): Date {
  return new Date(Date.now() + tz * 3600000);
}

export function formatTime(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  const rolled = m === 60 ? h + 1 : h;
  const mm = m === 60 ? 0 : m;
  const suffix = rolled >= 12 ? "PM" : "AM";
  const h12 = rolled % 12 === 0 ? 12 : rolled % 12;
  return `${h12}:${String(mm).padStart(2, "0")} ${suffix}`;
}

export const DAILY_PRAYERS: PrayerKey[] = ["fajr", "dhuhr", "asr", "maghrib", "isha"];

/** Which of the five is next, and how long until it. Wraps to tomorrow's Fajr. */
export function nextPrayer(times: PrayerTimes, nowHours: number) {
  for (const key of DAILY_PRAYERS) {
    if (times[key] > nowHours) {
      return { key, at: times[key], inHours: times[key] - nowHours };
    }
  }
  return { key: "fajr" as PrayerKey, at: times.fajr, inHours: 24 - nowHours + times.fajr };
}

export function countdown(inHours: number): string {
  const total = Math.max(0, Math.round(inHours * 60));
  const h = Math.floor(total / 60);
  const m = total % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}
