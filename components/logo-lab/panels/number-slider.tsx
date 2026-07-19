"use client";

import { Slider } from "@/components/ui/slider";

/**
 * A labelled slider with a live numeric readout.
 *
 * Backed by Radix (the shadcn Slider) rather than `<input type="range">`: the
 * native control can't be themed consistently across engines, and the editor is
 * slider-dense enough that the mismatch showed. Radix also brings PageUp/Down
 * and Home/End, which the native range only partly supports.
 *
 * The readout keeps decimals when `step` is fractional, so the icon and path
 * scale sliders no longer display "3" while actually holding 3.75.
 */
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
    <div className="flex items-center justify-between gap-2 text-xs">
      <span className="w-16 shrink-0 text-muted-foreground">{label}</span>
      <Slider
        aria-label={label}
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={([n]) => onChange(n)}
        className="flex-1"
      />
      <span className="w-9 text-right tabular-nums">
        {step < 1 ? Number(value.toFixed(2)) : Math.round(value)}
      </span>
    </div>
  );
}
