import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/JsonLd";
import LearnSalah from "./client";

export const metadata: Metadata = pageMetadata("/knowledge-center/learn-salah");

export default function Page() {
  return (
    <>
      <JsonLd path="/knowledge-center/learn-salah" />
      <LearnSalah />
    </>
  );
}
