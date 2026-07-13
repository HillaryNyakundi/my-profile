import type { ReactNode } from "react";
import { GuideSection, SectionIntro } from "./section-intro";
import { TermCard } from "./term-card";
import { REPRESENTATION, TRANSFORMATION } from "./vocabulary-data";
import { AlphaDemo } from "./alpha-demo";
import { QuantizeDemo } from "./quantize-demo";

function GroupHeading({ label, note }: { label: string; note: string }) {
  return (
    <div className="flex items-baseline gap-3 border-b border-border pb-2">
      <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-foreground">{label}</h3>
      <span className="text-xs text-muted-foreground">— {note}</span>
    </div>
  );
}

const grid = "mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3";

/** A card wrapping one of the interactive demos with its caption. */
function DemoCard({ children }: { children: ReactNode }) {
  return <div className="rounded-xl border border-border bg-card p-4">{children}</div>;
}

/**
 * 03 — the graphics vocabulary, split into how images are *stored*
 * (representation) vs how they're *changed* (transformation). Alpha and
 * quantization are live, interactive demos inside their groups.
 */
export function VocabularySection() {
  return (
    <GuideSection>
      <SectionIntro num="03" eyebrow="Design engineering" heading="The graphics vocabulary a tool-builder needs.">
        <p className="text-muted-foreground">
          This is the layer where <span className="text-foreground">design meets code</span> — how images are
          represented and transformed, not how they&apos;re visually composed. Each term is a real attribute you set in
          code; the diagrams are live SVG (two are interactive).
        </p>
      </SectionIntro>

      <div className="mx-auto mt-10 max-w-3xl space-y-10">
        {/* Representation */}
        <div>
          <GroupHeading label="Representation" note="how an image is stored" />
          <div className={grid}>
            {REPRESENTATION.map((t) => (
              <TermCard key={t.title} {...t} />
            ))}
            <DemoCard>
              <AlphaDemo />
              <h3 className="mt-3 font-mono text-sm font-bold">alpha</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                <span className="text-teal">Transparency.</span> A transparent background exports a PNG with a real
                alpha channel.
              </p>
            </DemoCard>
          </div>
        </div>

        {/* Transformation */}
        <div>
          <GroupHeading label="Transformation" note="how it's changed" />
          <div className={grid}>
            {TRANSFORMATION.map((t) => (
              <TermCard key={t.title} {...t} />
            ))}
            <DemoCard>
              <QuantizeDemo />
              <h3 className="mt-3 font-mono text-sm font-bold">quantization</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Reducing an image to few colors — the step that turns a busy photo into a clean, logo-ready palette.
              </p>
            </DemoCard>
          </div>
        </div>
      </div>
    </GuideSection>
  );
}
