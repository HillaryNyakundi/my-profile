"use client";

import { PALETTES } from "../data/palettes";
import type { LogoEditorApi } from "../hooks/use-logo-editor";

/**
 * One-click recolor of the whole composition. Each row previews the background
 * plus the colors that will land on the canvas, in the order they're assigned.
 */
export function PalettePicker({ editor }: { editor: LogoEditorApi }) {
  return (
    <div className="space-y-1">
      {PALETTES.map((p) => (
        <button
          key={p.name}
          onClick={() => editor.applyPalette(p)}
          className="flex w-full items-center gap-2 rounded-md border border-transparent px-2 py-1.5 text-left transition-colors hover:border-border hover:bg-accent"
        >
          <span
            className="flex shrink-0 items-center gap-0.5 rounded-sm p-1 ring-1 ring-border"
            style={{ background: p.bg }}
          >
            {p.colors.map((c) => (
              <span key={c} className="size-3 rounded-[2px]" style={{ background: c }} />
            ))}
          </span>
          <span className="truncate text-xs">{p.name}</span>
        </button>
      ))}
    </div>
  );
}
