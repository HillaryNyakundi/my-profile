import { GuideSection, SectionIntro } from "./section-intro";

const PIPELINE: [string, string, string, boolean][] = [
  ["01", "Upload", "user drops in a photo or screenshot", false],
  ["02", "Remove background", "isolate the subject — rembg / imgly", true],
  ["03", "Quantize colors", "collapse to a small palette (the demo above)", true],
  ["04", "Trace to vector", "potrace turns pixel regions into paths", true],
  ["05", "Split into layers", "each path becomes an editable element", false],
  ["06", "Recolor & arrange", "drop into your editor, add text", false],
  ["07", "Export", "SVG + a set of PNG sizes", false],
];

/** 05 — the image → logo pipeline; amber steps are the hard, high-value ones. */
export function PipelineSection() {
  return (
    <GuideSection>
      <SectionIntro num="05" eyebrow="The valuable part" heading={<>Bring an image → extract → logo.</>}>
        <p className="text-muted-foreground">
          This is your differentiator, and the hard half. Scope it tight: clean, high-contrast images trace
          beautifully; busy photos don&apos;t. The amber steps are the genuinely hard ones — ship the rest first.
        </p>
      </SectionIntro>
      <div className="mx-auto mt-8 grid max-w-2xl gap-2">
        {PIPELINE.map(([n, title, sub, hard]) => (
          <div
            key={n}
            className={`grid grid-cols-[auto_1fr] items-baseline gap-4 rounded-lg border border-border bg-card px-4 py-3 ${
              hard ? "border-l-[3px] border-l-amber-500" : ""
            }`}
          >
            <span className="font-mono text-xs tabular-nums text-teal">{n}</span>
            <span>
              <b className="font-semibold">{title}</b>
              <small className="block text-sm text-muted-foreground">{sub}</small>
            </span>
          </div>
        ))}
      </div>
    </GuideSection>
  );
}
