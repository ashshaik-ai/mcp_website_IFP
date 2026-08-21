import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/JsonLd";
import StudentGuidance from "./client";

export const metadata: Metadata = pageMetadata("/student-guidance");

export default function Page() {
  return (
    <>
      <JsonLd path="/student-guidance" />
      <StudentGuidance />
    </>
  );
}
