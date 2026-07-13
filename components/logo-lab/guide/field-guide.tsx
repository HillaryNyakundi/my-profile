import { HeroSection } from "./hero-section";
import { RecolorSection } from "./recolor-section";
import { RasterVectorSection } from "./raster-vector-section";
import { VocabularySection } from "./vocabulary-section";
import { ToolchainSection } from "./toolchain-section";
import { PipelineSection } from "./pipeline-section";
import { RoadmapSection } from "./roadmap-section";

/**
 * FieldGuide — composition root. Each numbered section is its own component;
 * this file just orders them inside the page shell.
 */
export function FieldGuide() {
  return (
    <div className="bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-6">
        <HeroSection />
        <RecolorSection />
        <RasterVectorSection />
        <VocabularySection />
        <ToolchainSection />
        <PipelineSection />
        <RoadmapSection />
      </div>
    </div>
  );
}
