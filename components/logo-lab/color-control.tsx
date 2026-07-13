"use client";

import { cn } from "@/lib/utils";
import { SWATCHES } from "./constants";

/** Color picker: native color input + hex field + quick swatches. */
export function ColorControl({
  value,
  onChange,
}: {
  value: string;
  onChange: (c: string) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-8 w-10 rounded border bg-transparent p-0.5"
        />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 h-8 rounded-md border bg-background px-2 text-xs font-mono uppercase"
        />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {SWATCHES.map((c) => (
          <button
            key={c}
            onClick={() => onChange(c)}
            title={c}
            className={cn(
              "size-5 rounded-sm border transition-transform hover:scale-110",
              value.toUpperCase() === c && "ring-2 ring-primary ring-offset-1"
            )}
            style={{ background: c }}
          />
        ))}
      </div>
    </div>
  );
}
