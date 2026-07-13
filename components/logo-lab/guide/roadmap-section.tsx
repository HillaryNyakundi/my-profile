import Link from "next/link";
import { ArrowRight, PenTool } from "lucide-react";
import { GuideSection, SectionIntro } from "./section-intro";

const ROADMAP = [
  { ver: "v0 · scratch editor", chip: "Built", done: true, title: "Shapes, text, drag, export", body: "Circle + editable text + cursor, color pickers, undo/redo, PNG/SVG export. This is the Lab editor." },
  { ver: "v1 · templates", chip: "Next", done: false, title: "Presets, icons, fonts", body: "Starter layouts, an icon library, font picker, palette presets." },
  { ver: "v2 · image import", chip: "Then", done: false, title: "Upload & recolor", body: "Background removal, recolor, and place a real image into a composition." },
  { ver: "v3 · vectorize", chip: "Last", done: false, title: "The tracing pipeline", body: "potrace-based extraction. Hardest, highest-value — save it for last." },
];

/** 06 — the four-pass roadmap + calls to action back into the editor. */
export function RoadmapSection() {
  return (
    <GuideSection>
      <SectionIntro num="06" eyebrow="How to get started" heading="Ship in four passes.">
        <p className="text-muted-foreground">
          These <span className="text-foreground">are</span> a sequence — each pass is usable on its own and de-risks
          the next. Don&apos;t build the tracer until people already love the editor.
        </p>
      </SectionIntro>
      <div className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-2">
        {ROADMAP.map((m) => (
          <div key={m.ver} className={`relative rounded-xl border bg-card p-5 ${m.done ? "border-teal/60" : "border-border"}`}>
            <span className={`absolute right-4 top-4 rounded-full border px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-wider ${m.done ? "border-teal/60 text-teal" : "border-border text-muted-foreground"}`}>
              {m.chip}
            </span>
            <p className="font-mono text-xs uppercase tracking-widest text-teal">{m.ver}</p>
            <h3 className="mt-1.5 font-bold">{m.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{m.body}</p>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-10 flex max-w-3xl flex-wrap gap-3">
        <Link href="/lab" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
          <PenTool className="size-4" /> Open the editor
        </Link>
        <Link href="/lab" className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 font-medium transition-colors hover:border-teal/60 hover:text-teal">
          Start from a shape <ArrowRight className="size-4" />
        </Link>
      </div>
    </GuideSection>
  );
}
