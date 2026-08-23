"use client";

import dynamic from "next/dynamic";
import { useI18n } from "@/lib/i18n/context";
import { Simulator, type SceneProps, type SimStep } from "@/components/sim/Simulator";
import { lessonVisual } from "@/content/lesson-visuals";
import * as sims from "@/content/simulations";
import type { ComponentType } from "react";

/* The picture in a lesson.

   Not one of the 75 lessons contained a single image, diagram or clip. They
   are text and a quiz, which is where these sit against Khan Academy and
   Coursera whatever else is fixed — a lesson on how tawaf is performed that
   never shows the circuit is doing half the job.

   The site already draws all of it. Every portal has a simulator on its index
   page: the Kaaba and the mataf, the pilgrim between Safa and Marwa, the
   praying figure through eleven postures, the moon across a month, the isnad
   chain, the letters as a nib writes them. That work was reachable only from
   the portal page, which is the one place a reader who has opened a lesson is
   not.

   So a lesson shows the part of it that belongs to that lesson — the steps
   curated in lesson-visuals.ts, not the whole sequence. Nothing new is drawn
   and nothing is invented; what changes is where it is.

   The scene is loaded for the portal being read, so a lesson does not carry
   the drawing code of twelve others. */
const SCENES: Record<string, ComponentType<SceneProps>> = {
  hadith: dynamic(() => import("@/components/sim/scenes/IsnadScene").then((m) => m.IsnadScene)),
  "hajj-umrah": dynamic(() => import("@/components/sim/scenes/HajjScene").then((m) => m.HajjScene)),
  "islamic-calendar": dynamic(() => import("@/components/sim/scenes/MoonScene").then((m) => m.MoonScene)),
  "islamic-history": dynamic(() => import("@/components/sim/scenes/EmpiresScene").then((m) => m.EmpiresScene)),
  "kids-islam": dynamic(() => import("@/components/sim/scenes/SalahFigure").then((m) => m.SalahFigure)),
  "learn-arabic": dynamic(() => import("@/components/sim/scenes/LetterScene").then((m) => m.LetterScene)),
  "learn-quran": dynamic(() => import("@/components/sim/scenes/TajweedScene").then((m) => m.TajweedScene)),
  "learn-salah": dynamic(() => import("@/components/sim/scenes/SalahFigure").then((m) => m.SalahFigure)),
  "learn-urdu": dynamic(() => import("@/components/sim/scenes/LetterScene").then((m) => m.LetterScene)),
  "names-of-allah": dynamic(() => import("@/components/sim/scenes/NamesScene").then((m) => m.NamesScene)),
  seerah: dynamic(() => import("@/components/sim/scenes/JourneyMap").then((m) => m.JourneyMap)),
  "special-prayers": dynamic(() => import("@/components/sim/scenes/SalahFigure").then((m) => m.SalahFigure)),
  "womens-guidance": dynamic(() => import("@/components/sim/scenes/WuduScene").then((m) => m.WuduScene)),
};

/* Wudu is a second scene inside learn-salah and kids-islam, so a lesson can ask
   for it by name rather than by portal. */
const NAMED: Record<string, ComponentType<SceneProps>> = {
  wudu: dynamic(() => import("@/components/sim/scenes/WuduScene").then((m) => m.WuduScene)),
  salah: dynamic(() => import("@/components/sim/scenes/SalahFigure").then((m) => m.SalahFigure)),
  moon: dynamic(() => import("@/components/sim/scenes/MoonScene").then((m) => m.MoonScene)),
  letters: dynamic(() => import("@/components/sim/scenes/LetterScene").then((m) => m.LetterScene)),
};

const copy = {
  watch: { te: "చూడండి", en: "Watch it" },
} as const;

export function LessonVisual({ portal, slug }: { portal: string; slug: string }) {
  const { lang } = useI18n();
  const spec = lessonVisual(portal, slug);
  if (!spec) return null;

  const all = (sims as unknown as Record<string, SimStep[]>)[spec.source];
  if (!Array.isArray(all)) return null;
  const steps = spec.steps.length ? all.filter((s) => spec.steps.includes(s.id)) : all;
  if (!steps.length) return null;

  const Scene = (spec.scene && NAMED[spec.scene]) || SCENES[portal];
  if (!Scene) return null;

  return (
    <section aria-label={copy.watch[lang]} className="min-w-0">
      <h2 className="mb-3 font-display text-lg font-bold text-[var(--if-green)]">
        {spec.title ? spec.title[lang] : copy.watch[lang]}
      </h2>
      <Simulator steps={steps} scene={Scene} />
    </section>
  );
}
