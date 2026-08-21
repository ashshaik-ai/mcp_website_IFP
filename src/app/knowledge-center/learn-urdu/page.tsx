import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/JsonLd";
import LearnUrdu from "./client";

export const metadata: Metadata = pageMetadata("/knowledge-center/learn-urdu");

export default function Page() {
  return (
    <>
      <JsonLd path="/knowledge-center/learn-urdu" />
      <LearnUrdu />
    </>
  );
}
