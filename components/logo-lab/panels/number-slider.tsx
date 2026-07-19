"use client";

/** A labelled range slider with a live numeric readout. */
export function NumberSlider({
  label,
  value,
  onChange,
  min = 0,
  max = 400,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <label className="flex items-center justify-between gap-2 text-xs">
      <span className="text-muted-foreground w-16 shrink-0">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 accent-primary"
      />
      <span className="w-9 text-right tabular-nums">{Math.round(value)}</span>
    </label>
  );
}
