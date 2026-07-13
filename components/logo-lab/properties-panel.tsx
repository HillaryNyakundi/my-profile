"use client";

import { Trash2, Copy, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FONTS } from "./constants";
import { ColorControl } from "./color-control";
import { NumberSlider } from "./number-slider";
import type { LogoEditorApi } from "./use-logo-editor";

/** Right rail: canvas background + the selected element's properties. */
export function PropertiesPanel({ editor }: { editor: LogoEditorApi }) {
  const {
    selected,
    bg,
    transparent,
    setBg,
    setTransparent,
    update,
    duplicate,
    remove,
    reorder,
  } = editor;

  return (
    <aside className="border-l p-3 space-y-4 text-sm">
      {/* canvas background */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Canvas background</p>
        <label className="flex items-center gap-2 text-xs">
          <input
            type="checkbox"
            checked={transparent}
            onChange={(e) => setTransparent(e.target.checked)}
          />
          Transparent (keeps alpha channel)
        </label>
        {!transparent && <ColorControl value={bg} onChange={setBg} />}
      </div>

      <hr />

      {/* selected element */}
      {selected ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground capitalize">
              {selected.type} properties
            </p>
            <div className="flex gap-1">
              <Button size="icon" variant="ghost" className="size-7" onClick={() => duplicate(selected.id)}>
                <Copy className="size-3.5" />
              </Button>
              <Button size="icon" variant="ghost" className="size-7" onClick={() => reorder(selected.id, 1)}>
                <ArrowUp className="size-3.5" />
              </Button>
              <Button size="icon" variant="ghost" className="size-7" onClick={() => reorder(selected.id, -1)}>
                <ArrowDown className="size-3.5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="size-7 text-destructive"
                onClick={() => remove(selected.id)}
              >
                <Trash2 className="size-3.5" />
              </Button>
            </div>
          </div>

          <ColorControl value={selected.fill} onChange={(c) => update(selected.id, { fill: c })} />

          <div className="space-y-1.5">
            <NumberSlider label="Rotate" value={selected.rotation} min={0} max={360} onChange={(n) => update(selected.id, { rotation: n })} />

            {selected.type === "circle" && (
              <NumberSlider label="Radius" value={selected.r} min={5} max={200} onChange={(n) => update(selected.id, { r: n })} />
            )}

            {selected.type === "rect" && (
              <>
                <NumberSlider label="Width" value={selected.w} min={5} max={380} onChange={(n) => update(selected.id, { w: n })} />
                <NumberSlider label="Height" value={selected.h} min={5} max={380} onChange={(n) => update(selected.id, { h: n })} />
                <NumberSlider label="Corner" value={selected.radius} min={0} max={100} onChange={(n) => update(selected.id, { radius: n })} />
              </>
            )}

            {selected.type === "cursor" && (
              <NumberSlider label="Scale" value={selected.scale} min={1} max={10} step={0.1} onChange={(n) => update(selected.id, { scale: n })} />
            )}

            {selected.type === "text" && (
              <>
                <input
                  value={selected.text}
                  onChange={(e) => update(selected.id, { text: e.target.value })}
                  className="w-full h-8 rounded-md border bg-background px-2 text-sm"
                />
                <NumberSlider label="Size" value={selected.fontSize} min={8} max={160} onChange={(n) => update(selected.id, { fontSize: n })} />
                <NumberSlider label="Weight" value={selected.fontWeight} min={100} max={900} step={100} onChange={(n) => update(selected.id, { fontWeight: n })} />
                <select
                  value={selected.fontFamily}
                  onChange={(e) => update(selected.id, { fontFamily: e.target.value })}
                  className="w-full h-8 rounded-md border bg-background px-2 text-xs"
                >
                  {FONTS.map((f) => (
                    <option key={f.value} value={f.value}>
                      {f.label}
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">
          Select a layer to edit it, or drag shapes on the canvas.
        </p>
      )}
    </aside>
  );
}
