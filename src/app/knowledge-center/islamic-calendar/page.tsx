import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/JsonLd";
import IslamicCalendar from "./client";

export const metadata: Metadata = pageMetadata("/knowledge-center/islamic-calendar");

export default function Page() {
  return (
    <>
      <JsonLd path="/knowledge-center/islamic-calendar" />
      <IslamicCalendar />
    </>
  );
}
