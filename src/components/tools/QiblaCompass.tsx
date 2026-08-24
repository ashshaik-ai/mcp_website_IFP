"use client";

import { useEffect, useRef, useState } from "react";
import { Compass } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

/* The qibla from Mangalagiri, as a compass.

   Every prayer-times app carries one and almost no prayer-times website does,
   because a website usually does not know where you are. This one does: the
   whole site is for one town, so the bearing is a constant of the site — the
   great-circle initial bearing from Mangalagiri (16.4310 N, 80.5590 E) to the
   Kaaba (21.4225 N, 39.8262 E), computed below rather than hardcoded so the
   working shows.

   On a phone with an orientation sensor the rose turns with the device and
   the needle stays on the qibla, which is the real thing: hold the phone
   flat, turn until the needle meets the mark, face that way. iOS asks
   permission for the sensor, so there the compass starts static with a
   one-tap enable. Without any sensor it is a labelled dial — still useful,
   because 284 degrees with a north mark is how every printed prayer mat
   points people anyway. */
const rad = (d: number) => (d * Math.PI) / 180;

function qiblaBearing(): number {
  const lat1 = rad(16.431);
  const lat2 = rad(21.4225);
  const dLon = rad(39.8262 - 80.559);
  const y = Math.sin(dLon) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

const BEARING = qiblaBearing();

const copy = {
  title: { te: "ఖిబ్లా దిక్సూచి", en: "Qibla compass" },
  from: { te: "మంగళగిరి నుండి", en: "from Mangalagiri" },
  enable: { te: "దిక్సూచిని ఆన్ చేయండి", en: "Enable compass" },
  hint: {
    te: "ఫోన్‌ను చదునుగా పట్టుకుని, బంగారు గుర్తు పైకి వచ్చేవరకు తిరగండి.",
    en: "Hold the phone flat and turn until the gold mark sits at the top.",
  },
  staticHint: {
    te: "ఉత్తరం నుండి సవ్యదిశలో",
    en: "clockwise from north",
  },
} as const;

type SensorState = "unknown" | "needs-permission" | "live" | "unavailable";

export function QiblaCompass() {
  const { lang } = useI18n();
  const [heading, setHeading] = useState<number | null>(null);
  const [sensor, setSensor] = useState<SensorState>("unknown");
  const cleanup = useRef<(() => void) | null>(null);

  const listen = () => {
    const onOrient = (e: DeviceOrientationEvent) => {
      /* webkitCompassHeading is already degrees-from-north; alpha needs
         inverting. Either way the value is where the phone's top points. */
      const wk = (e as DeviceOrientationEvent & { webkitCompassHeading?: number }).webkitCompassHeading;
      const h = typeof wk === "number" ? wk : e.absolute && e.alpha !== null ? 360 - e.alpha : null;
      if (h !== null) {
        setHeading(h);
        setSensor("live");
      }
    };
    window.addEventListener("deviceorientationabsolute", onOrient as EventListener);
    window.addEventListener("deviceorientation", onOrient as EventListener);
    cleanup.current = () => {
      window.removeEventListener("deviceorientationabsolute", onOrient as EventListener);
      window.removeEventListener("deviceorientation", onOrient as EventListener);
    };
  };

  useEffect(() => {
    if (typeof window === "undefined" || !("DeviceOrientationEvent" in window)) {
      setSensor("unavailable");
      return;
    }
    type WithPermission = { requestPermission?: () => Promise<string> };
    const needsAsk = typeof (DeviceOrientationEvent as unknown as WithPermission).requestPermission === "function";
    if (needsAsk) {
      setSensor("needs-permission");
    } else {
      listen();
      /* If no reading arrives, the events exist but the sensor does not. */
      const t = window.setTimeout(() => setSensor((s) => (s === "live" ? s : "unavailable")), 2500);
      return () => {
        window.clearTimeout(t);
        cleanup.current?.();
      };
    }
    return () => cleanup.current?.();
  }, []);

  const ask = async () => {
    try {
      type WithPermission = { requestPermission?: () => Promise<string> };
      const fn = (DeviceOrientationEvent as unknown as WithPermission).requestPermission;
      if (fn && (await fn()) === "granted") listen();
      else setSensor("unavailable");
    } catch {
      setSensor("unavailable");
    }
  };

  /* The rose turns opposite the device so north stays true; the qibla needle
     is fixed at the bearing within the rose. Static mode leaves north up. */
  const roseTurn = heading !== null ? -heading : 0;

  return (
    <div className="rounded-2xl border border-[var(--if-gold)]/20 bg-white p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="inline-flex items-center gap-2 font-display text-lg font-bold text-[var(--if-green)]">
          <Compass aria-hidden="true" className="h-5 w-5 text-[var(--if-gold-ink)]" />
          {copy.title[lang]}
        </p>
        <p className="text-sm text-[var(--if-text-muted)] tabular-nums">
          {Math.round(BEARING)}° {copy.staticHint[lang]} · {copy.from[lang]}
        </p>
      </div>

      <div className="mx-auto mt-5 aspect-square w-56 max-w-full">
        <svg viewBox="0 0 200 200" role="img" aria-label={`${copy.title[lang]} — ${Math.round(BEARING)}°`}>
          <g
            style={{
              transform: `rotate(${roseTurn}deg)`,
              transformOrigin: "100px 100px",
              transition: sensor === "live" ? "transform 0.2s ease-out" : undefined,
            }}
          >
            <circle cx="100" cy="100" r="92" fill="var(--if-cream-light)" stroke="var(--if-gold)" strokeOpacity="0.35" strokeWidth="2" />
            <circle cx="100" cy="100" r="74" fill="none" stroke="var(--if-gold)" strokeOpacity="0.15" />
            {Array.from({ length: 72 }).map((_, i) => (
              <line
                key={i}
                x1="100"
                y1={i % 6 === 0 ? 12 : 15}
                x2="100"
                y2="20"
                stroke="var(--if-gold-ink)"
                strokeOpacity={i % 6 === 0 ? 0.7 : 0.3}
                strokeWidth={i % 18 === 0 ? 2.5 : 1}
                transform={`rotate(${i * 5} 100 100)`}
              />
            ))}
            {(["N", "E", "S", "W"] as const).map((d, i) => (
              <text
                key={d}
                x="100"
                y="34"
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill={d === "N" ? "var(--if-green)" : "var(--if-text-muted)"}
                transform={`rotate(${i * 90} 100 100)`}
              >
                {d}
              </text>
            ))}
            {/* The qibla: a gold needle and a tiny kaaba at the rim. */}
            <g transform={`rotate(${BEARING} 100 100)`}>
              <path d="M100 100 L94 92 L100 26 L106 92 Z" fill="var(--if-gold)" />
              <rect x="93" y="38" width="14" height="14" rx="1.5" fill="#1a1a1a" stroke="var(--if-gold)" strokeWidth="1.6" />
              <rect x="93" y="42" width="14" height="3" fill="var(--if-gold)" />
            </g>
            <circle cx="100" cy="100" r="5" fill="var(--if-green)" stroke="var(--if-gold)" strokeWidth="2" />
          </g>
        </svg>
      </div>

      {sensor === "needs-permission" && (
        <button
          type="button"
          onClick={ask}
          className="mx-auto mt-3 flex min-h-11 items-center gap-2 rounded-full bg-[var(--if-green)] px-5 text-sm font-bold text-[var(--if-gold-light)]"
        >
          {copy.enable[lang]}
        </button>
      )}
      <p className="mt-3 text-center text-xs text-[var(--if-text-muted)] text-pretty">
        {sensor === "live" ? copy.hint[lang] : `${copy.title[lang]} — ${Math.round(BEARING)}°`}
      </p>
    </div>
  );
}
