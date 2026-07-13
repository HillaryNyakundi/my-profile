import { GuideSection, SectionIntro } from "./section-intro";
import { VectorRasterDemo } from "./vector-raster-demo";

const RASTER_VECTOR: [string, string, string][] = [
  ["What it is", "A grid of pixels", "Math — paths, curves, shapes"],
  ["Formats", "PNG · JPG · WEBP · GIF · AVIF", "SVG · PDF · EPS · AI"],
  ["Scaling", "Blurs / pixelates when enlarged", "Infinitely sharp at any size"],
  ["Good for", "Photos, complex images", "Logos, icons, type"],
  ["Editable", "Just the pixels", "Every shape independently"],
];

/** 02 — the raster/vector distinction: live zoom demo + full comparison table. */
export function RasterVectorSection() {
  return (
    <GuideSection>
      <SectionIntro num="02" eyebrow="The one distinction that matters" heading="Vector is math. Raster is pixels.">
        <p className="text-muted-foreground">
          A logo should end life as a <span className="text-foreground">vector</span> (SVG) — shapes defined by
          coordinates, sharp at any size. A <span className="text-foreground">raster</span> (PNG/JPG) is a fixed grid
          of pixels; enlarge it and the grid shows. Drag the zoom — only one survives it.
        </p>
      </SectionIntro>

      <div className="mx-auto mt-8 max-w-2xl">
        <VectorRasterDemo />
      </div>

      <div className="mx-auto mt-8 max-w-2xl overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="w-28 p-3 text-left font-medium text-muted-foreground" />
              <th className="p-3 text-left font-mono text-amber-500">Raster</th>
              <th className="p-3 text-left font-mono text-teal">Vector</th>
            </tr>
          </thead>
          <tbody>
            {RASTER_VECTOR.map(([label, raster, vector]) => (
              <tr key={label} className="border-b border-border/60 last:border-0">
                <td className="p-3 align-top font-mono text-xs uppercase tracking-wide text-muted-foreground">
                  {label}
                </td>
                <td className="bg-amber-500/[0.06] p-3 align-top">{raster}</td>
                <td className="bg-teal/[0.06] p-3 align-top">{vector}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mx-auto mt-5 max-w-2xl text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">Logos should almost always end up as SVG.</span> It&apos;s the
        pro deliverable — it scales from a favicon to a billboard with zero quality loss.
      </p>
    </GuideSection>
  );
}
