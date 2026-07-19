"use client";

import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { cn } from "@/lib/utils";
import { SWATCHES } from "../data/palettes";

/** Accept "2F8079" or "#2f8079"; anything else is still being typed. */
const isHex = (s: string) => /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.test(s);
const normalize = (s: string) => (s.startsWith("#") ? s : `#${s}`).toUpperCase();

/**
 * Color picker: a saturation/hue surface, a hex field, and quick swatches.
 *
 * The surface is `react-colorful` (2.8KB, no deps) rather than
 * `<input type="color">`. The native control opens the OS picker, which on
 * Linux and Windows is a modal dialog that covers the canvas: you cannot see
 * the logo you are recoloring while you choose the color. For a design tool
 * that is the whole game, so this is a real upgrade rather than a reskin.
 *
 * The hex field keeps its own draft state so a partially typed value like "#2F"
 * isn't parsed and pushed upstream mid-keystroke.
 */
export function ColorControl({
  value,
  onChange,
}: {
  value: string;
  onChange: (c: string) => void;
}) {
  const [draft, setDraft] = useState<string | null>(null);

  const commit = (next: string) => {
    setDraft(next);
    if (isHex(next)) onChange(normalize(next));
  };

  return (
    <div className="space-y-2">
      <HexColorPicker
        color={value}
        onChange={onChange}
        className="!w-full [&_.react-colorful\\_\\_saturation]:rounded-t-md"
        style={{ height: 110 }}
      />

      <div className="flex items-center gap-2">
        <span
          aria-hidden
          className="size-8 shrink-0 rounded border"
          style={{ background: value }}
        />
        <input
          aria-label="Hex color"
          value={draft ?? value}
          onChange={(e) => commit(e.target.value)}
          onBlur={() => setDraft(null)}
          spellCheck={false}
          className="h-8 flex-1 rounded-md border bg-background px-2 font-mono text-xs uppercase"
        />
      </div>

      <div className="flex flex-wrap gap-1.5">
        {SWATCHES.map((c) => (
          <button
            key={c}
            onClick={() => {
              setDraft(null);
              onChange(c);
            }}
            title={c}
            aria-label={c}
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
