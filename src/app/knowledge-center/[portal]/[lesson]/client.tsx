"use client";

import { PageShell } from "@/components/layout/PageShell";
import { LessonView } from "@/components/learning/LessonView";
import type { Bi, Lesson } from "@/content/all-lessons";

export default function LessonClient(props: {
  lesson: Lesson;
  index: number;
  total: number;
  prev: { slug: string; title: Bi } | null;
  next: { slug: string; title: Bi } | null;
  portalHref: string;
  portalTitle: Bi;
}) {
  return (
    <PageShell>
      <LessonView {...props} />
    </PageShell>
  );
}
