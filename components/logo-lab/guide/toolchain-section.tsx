import { GuideSection, SectionIntro } from "./section-intro";

const TOOLS: { group: string; items: [string, string][] }[] = [
  {
    group: "Vector / SVG",
    items: [
      ["Fabric.js", "full canvas editor engine — likely your backbone"],
      ["Konva.js", "React-friendly (via react-konva)"],
      ["potrace", "raster → vector tracing"],
      ["opentype.js", "text → editable vector paths"],
    ],
  },
  {
    group: "Raster",
    items: [
      ["Sharp", "fast server-side resize / composite"],
      ["Canvas API", "browser-native pixel work"],
      ["@imgly/bg-removal", "background removal in-browser"],
    ],
  },
  {
    group: "Export",
    items: [
      ["resvg", "SVG → PNG at any size"],
      ["canvas.toBlob", "client-side PNG download"],
      ["XMLSerializer", "serialize the live SVG"],
    ],
  },
];

/** 04 — the dependencies to reach for, grouped by job. */
export function ToolchainSection() {
  return (
    <GuideSection>
      <SectionIntro num="04" eyebrow="The toolchain" heading="What to build on." />
      <div className="mx-auto mt-8 grid max-w-3xl gap-6 sm:grid-cols-3">
        {TOOLS.map((col) => (
          <div key={col.group}>
            <h3 className="font-mono text-sm tracking-wide text-teal">{col.group}</h3>
            <ul className="mt-2">
              {col.items.map(([name, desc]) => (
                <li key={name} className="flex flex-col gap-0.5 border-t border-dashed border-border py-2.5 text-sm first:border-t-0">
                  <b className="font-mono font-semibold">{name}</b>
                  <span className="text-muted-foreground">{desc}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-6 max-w-3xl text-sm text-muted-foreground">
        The Lab editor deliberately uses <b className="text-foreground">none</b> of these — it&apos;s plain SVG + React
        so the source itself is the lesson. Reach for Fabric/Konva when you need snapping and transform handles for
        free.
      </p>
    </GuideSection>
  );
}
