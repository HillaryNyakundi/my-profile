import type { ReactNode } from "react";

/** A vocabulary card: a live SVG glyph, a mono title, and a short definition. */
export function TermCard({ title, body, glyph }: { title: string; body: ReactNode; glyph: ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-3 h-24 overflow-hidden rounded-lg bg-background">{glyph}</div>
      <h3 className="font-mono text-sm font-bold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
