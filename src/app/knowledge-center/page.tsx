import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/JsonLd";
import KnowledgeCenterPage from "./client";
import { lessons } from "@/content/all-lessons";

export const metadata: Metadata = pageMetadata("/knowledge-center");

export default function Page() {
  return (
    <>
      <JsonLd path="/knowledge-center" />
      {/* Counted here, in the server component, so the hub does not have to
          import the lessons module and ship every lesson as JavaScript. */}
      <KnowledgeCenterPage lessonCount={lessons.length} />
    </>
  );
}
