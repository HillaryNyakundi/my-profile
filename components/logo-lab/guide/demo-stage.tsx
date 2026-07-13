import type { CSSProperties, ReactNode } from "react";

/** A checkerboard stage that reads correctly in both themes (tokens, not fixed greys). */
const checker: CSSProperties = {
  backgroundColor: "var(--card)",
  backgroundImage:
    "conic-gradient(var(--border) 25%, transparent 0 50%, var(--border) 0 75%, transparent 0)",
  backgroundSize: "18px 18px",
};

export function DemoStage({
  label,
  tone = "teal",
  children,
}: {
  label: string;
  tone?: "teal" | "amber";
  children: ReactNode;
}) {
  return (
    <div
      className="relative grid aspect-square place-items-center overflow-hidden rounded-lg border border-border"
      style={checker}
    >
      <span
        className={`absolute left-2.5 top-2 rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[0.62rem] uppercase tracking-widest ${
          tone === "teal" ? "text-teal" : "text-amber-500"
        }`}
      >
        {label}
      </span>
      {children}
    </div>
  );
}

/** A labelled range control with a mono readout — shared across the demos. */
export function DemoSlider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  readout,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (n: number) => void;
  readout: string;
}) {
  return (
    <div className="mt-4 flex items-center gap-3 font-mono text-xs text-muted-foreground">
      <span>{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 accent-primary"
        aria-label={label}
      />
      <span className="min-w-[3.4ch] text-right tabular-nums text-foreground">{readout}</span>
    </div>
  );
}
