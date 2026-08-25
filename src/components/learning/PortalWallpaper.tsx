/* A wallpaper behind each portal's cover.

   Every portal opened on the same dark green gradient, so arriving at Hadith
   and arriving at Kids felt like arriving at the same place. Each one now has
   its own motif drawn from what it teaches: the chain of narration for hadith,
   a row of moon phases for the calendar, circuits around a square for hajj,
   the mihrab arch for salah.

   Drawn, not photographed. A tiled SVG costs about a kilobyte, stays crisp at
   any size, recolours itself from the brand tokens, and needs no image
   pipeline — where a set of raster wallpapers would be megabytes and would go
   soft on a wide screen. The pattern drifts slowly across the cover and a soft
   glow breathes behind it; both stop dead under prefers-reduced-motion.

   Kept at low opacity on purpose: this sits under a heading that has to stay
   comfortably readable, so it reads as texture rather than as picture. */

type Motif = { tile: number; body: React.ReactNode };

const GOLD = "var(--if-gold-light)";

/* Each tile is drawn once and repeated by <pattern>. Strokes only, so the
   whole thing inherits the one colour and stays light. */
const MOTIFS: Record<string, Motif> = {
  /* An eight-point khatam star, the tile that covers half the mosques in the
     world, for the portal about the book they are built around. */
  "learn-quran": {
    tile: 120,
    body: (
      <>
        <path d="M60 12 L76 44 L108 60 L76 76 L60 108 L44 76 L12 60 L44 44 Z" fill="none" stroke={GOLD} strokeWidth="1.5" />
        <rect x="34" y="34" width="52" height="52" fill="none" stroke={GOLD} strokeWidth="1" transform="rotate(45 60 60)" />
        <circle cx="60" cy="60" r="6" fill="none" stroke={GOLD} strokeWidth="1" />
      </>
    ),
  },
  /* The niche the prayer faces. */
  "learn-salah": {
    tile: 100,
    body: (
      <>
        <path d="M20 96 L20 46 Q20 14 50 14 Q80 14 80 46 L80 96" fill="none" stroke={GOLD} strokeWidth="1.5" />
        <path d="M30 96 L30 50 Q30 26 50 26 Q70 26 70 50 L70 96" fill="none" stroke={GOLD} strokeWidth="0.9" />
        <circle cx="50" cy="40" r="3" fill={GOLD} />
      </>
    ),
  },
  /* Pen strokes: the rhythm of a line of script without spelling anything. */
  "learn-arabic": {
    tile: 130,
    body: (
      <>
        <path d="M10 70 Q40 34 70 70 T130 70" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 96 L18 44" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="52" cy="88" r="2.5" fill={GOLD} />
        <circle cx="92" cy="52" r="2.5" fill={GOLD} />
      </>
    ),
  },
  /* Nastaliq hangs; these are its sweeps. */
  "learn-urdu": {
    tile: 130,
    body: (
      <>
        <path d="M8 44 Q54 44 62 80 Q68 104 96 96" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M70 20 Q104 26 110 56" fill="none" stroke={GOLD} strokeWidth="1" strokeLinecap="round" />
        <circle cx="40" cy="104" r="2.5" fill={GOLD} />
      </>
    ),
  },
  /* Links in a chain: an isnad drawn as what it is. */
  hadith: {
    tile: 110,
    body: (
      <>
        <ellipse cx="30" cy="55" rx="17" ry="11" fill="none" stroke={GOLD} strokeWidth="1.5" />
        <ellipse cx="66" cy="55" rx="17" ry="11" fill="none" stroke={GOLD} strokeWidth="1.5" />
        <ellipse cx="102" cy="55" rx="17" ry="11" fill="none" stroke={GOLD} strokeWidth="1.5" />
      </>
    ),
  },
  /* A road with waypoints — the life told as a journey. */
  seerah: {
    tile: 140,
    body: (
      <>
        <path d="M0 100 Q35 60 70 84 T140 56" fill="none" stroke={GOLD} strokeWidth="1.4" strokeDasharray="6 7" strokeLinecap="round" />
        <circle cx="70" cy="84" r="4" fill="none" stroke={GOLD} strokeWidth="1.4" />
        <circle cx="14" cy="90" r="2.5" fill={GOLD} />
        <circle cx="126" cy="60" r="2.5" fill={GOLD} />
      </>
    ),
  },
  /* Domes on a skyline, one behind another, the way centuries stack. */
  "islamic-history": {
    tile: 140,
    body: (
      <>
        <path d="M12 100 L12 66 Q12 40 36 40 Q60 40 60 66 L60 100" fill="none" stroke={GOLD} strokeWidth="1.3" />
        <path d="M72 100 L72 78 Q72 58 90 58 Q108 58 108 78 L108 100" fill="none" stroke={GOLD} strokeWidth="1" />
        <line x1="36" y1="40" x2="36" y2="26" stroke={GOLD} strokeWidth="1.3" />
        <line x1="0" y1="100" x2="140" y2="100" stroke={GOLD} strokeWidth="0.8" />
      </>
    ),
  },
  /* Stars and crescents, scattered and a little bigger — this one is for
     children and may be the most cheerful thing on the site. */
  "kids-islam": {
    tile: 120,
    body: (
      <>
        <path d="M30 18 L34 30 L46 30 L36 38 L40 50 L30 42 L20 50 L24 38 L14 30 L26 30 Z" fill={GOLD} opacity="0.9" />
        <path d="M92 74 a14 14 0 1 1 -10 -13 a11 11 0 1 0 10 13 Z" fill={GOLD} opacity="0.9" />
        <circle cx="96" cy="24" r="3" fill={GOLD} />
        <circle cx="24" cy="94" r="2.5" fill={GOLD} />
      </>
    ),
  },
  /* Beads on a thread, which is how the names are counted. */
  "names-of-allah": {
    tile: 110,
    body: (
      <>
        <circle cx="55" cy="55" r="34" fill="none" stroke={GOLD} strokeWidth="1" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return <circle key={i} cx={55 + Math.cos(a) * 34} cy={55 + Math.sin(a) * 34} r="3" fill={GOLD} />;
        })}
      </>
    ),
  },
  /* The month, phase by phase. */
  "islamic-calendar": {
    tile: 140,
    body: (
      <>
        <circle cx="24" cy="60" r="9" fill="none" stroke={GOLD} strokeWidth="1.2" />
        <path d="M62 51 a9 9 0 1 0 0 18 a7 7 0 1 1 0 -18 Z" fill={GOLD} />
        <circle cx="100" cy="60" r="9" fill={GOLD} opacity="0.85" />
        <path d="M134 51 a9 9 0 1 1 0 18 a7 7 0 1 0 0 -18 Z" fill={GOLD} />
      </>
    ),
  },
  /* Circuits around the House. */
  "hajj-umrah": {
    tile: 130,
    body: (
      <>
        <rect x="55" y="55" width="20" height="20" fill={GOLD} opacity="0.9" />
        <circle cx="65" cy="65" r="30" fill="none" stroke={GOLD} strokeWidth="1.2" />
        <circle cx="65" cy="65" r="45" fill="none" stroke={GOLD} strokeWidth="0.9" strokeDasharray="4 8" />
        <circle cx="65" cy="65" r="58" fill="none" stroke={GOLD} strokeWidth="0.7" strokeDasharray="3 10" />
      </>
    ),
  },
  /* A night sky, for the prayers that belong to it. */
  "special-prayers": {
    tile: 120,
    body: (
      <>
        <path d="M28 22 L30 30 L38 32 L30 34 L28 42 L26 34 L18 32 L26 30 Z" fill={GOLD} />
        <path d="M88 70 L90 78 L98 80 L90 82 L88 90 L86 82 L78 80 L86 78 Z" fill={GOLD} />
        <circle cx="96" cy="28" r="2" fill={GOLD} />
        <circle cx="20" cy="88" r="1.6" fill={GOLD} />
        <circle cx="58" cy="54" r="1.6" fill={GOLD} />
      </>
    ),
  },
  /* An arabesque vine — the ornament that fills the borders of the books. */
  "womens-guidance": {
    tile: 130,
    body: (
      <>
        <path d="M10 110 Q40 80 34 46 Q30 22 56 16" fill="none" stroke={GOLD} strokeWidth="1.3" strokeLinecap="round" />
        <path d="M34 62 Q56 58 62 38" fill="none" stroke={GOLD} strokeWidth="1" strokeLinecap="round" />
        <path d="M84 118 Q96 92 118 88" fill="none" stroke={GOLD} strokeWidth="1" strokeLinecap="round" />
        <ellipse cx="66" cy="34" rx="6" ry="3.4" fill={GOLD} transform="rotate(-30 66 34)" />
        <ellipse cx="120" cy="86" rx="5" ry="3" fill={GOLD} transform="rotate(20 120 86)" />
      </>
    ),
  },
};

export function PortalWallpaper({ portal }: { portal: string }) {
  const motif = MOTIFS[portal];
  if (!motif) return null;
  const id = `wall-${portal}`;

  return (
    <div
      className="if-wall pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
      /* The drift travels exactly one tile, so the weave lands back on itself. */
      style={{ "--tile": `${motif.tile}px` } as React.CSSProperties}
    >
      {/* The drifting weave. */}
      <svg className="if-wall-tile absolute -inset-[160px] h-[calc(100%+320px)] w-[calc(100%+320px)]" role="presentation">
        <defs>
          <pattern id={id} width={motif.tile} height={motif.tile} patternUnits="userSpaceOnUse">
            {motif.body}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
      {/* One soft breath of light, so the cover is not flat. */}
      <div className="if-wall-glow absolute inset-0" />
    </div>
  );
}
