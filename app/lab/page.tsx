import type { Metadata } from "next";
import { LogoEditor } from "@/components/logo-lab/logo-editor";

export const metadata: Metadata = {
  title: "Logo Lab",
  description:
    "A from-scratch, dependency-free vector logo editor — build a mark from shapes and text, then export SVG or PNG.",
  alternates: { canonical: "/lab" },
};

export default function LogoLabPage() {
  return <LogoEditor />;
}
