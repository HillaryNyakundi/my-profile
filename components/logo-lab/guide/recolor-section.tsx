import { GuideSection, SectionIntro } from "./section-intro";

const MOVES: [string, string][] = [
  ["alpha compositing", "Stacking a transparent image over a fill. Transparent pixels became black; teal and white stayed."],
  ["resampling", "Scaling with a quality filter (LANCZOS) so edges stay smooth instead of jagged."],
  ["mode convert", "RGBA → RGB: flattening the alpha channel away before saving a solid PNG."],
];

/** 01 — reframes the recolor as three named operations, not "design." */
export function RecolorSection() {
  return (
    <GuideSection>
      <SectionIntro
        num="01"
        eyebrow="What actually happened"
        heading={<>The recolor was three real operations, not &ldquo;design.&rdquo;</>}
      >
        <p className="text-muted-foreground">
          Your old teal logo already had the circle, white text and cursor on a{" "}
          <span className="text-foreground">transparent</span> background. Nothing was drawn from scratch — it was
          recomposed. Three named moves did the whole job:
        </p>
      </SectionIntro>
      <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-3">
        {MOVES.map(([title, desc]) => (
          <div key={title} className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-mono text-sm text-teal">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </GuideSection>
  );
}
