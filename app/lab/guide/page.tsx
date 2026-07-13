import type { Metadata } from "next";
import { FieldGuide } from "@/components/logo-lab/guide/field-guide";

export const metadata: Metadata = {
  title: "Logo Design Field Guide",
  description:
    "An interactive field guide to designing logos in code, vector vs raster, alpha, paths, the toolchain, and a build roadmap.",
  alternates: { canonical: "/lab/guide" },
};

export default function GuidePage() {
  return <FieldGuide />;
}
