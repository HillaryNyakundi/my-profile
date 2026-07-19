"use client";

import { Trash2, Copy, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FONTS, FONT_IDS } from "../data/fonts";
import { ColorControl } from "./color-control";
import { NumberSlider } from "./number-slider";
import { IconPicker } from "./icon-picker";
import { PalettePicker } from "./palette-picker";
import { TraceControl } from "./trace-control";
import type { LogoEditorApi } from "../hooks/use-logo-editor";

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
      {/* whole-logo recolor */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Palette</p>
        <PalettePicker editor={editor} />
      </div>

      <hr />

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

          {/* An image draws its own pixels; `fill` is a placeholder it never uses. */}
          {selected.type !== "image" && (
            <ColorControl value={selected.fill} onChange={(c) => update(selected.id, { fill: c })} />
          )}

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

            {selected.type === "image" && (
              // One "Size" slider drives the longest edge and derives the other
              // from the source aspect, so an image can't be stretched by accident.
              <NumberSlider
                label="Size"
                value={Math.max(selected.w, selected.h)}
                min={20}
                max={400}
                onChange={(n) => {
                  const nat = selected.natural;
                  update(selected.id, {
                    w: nat >= 1 ? n : Math.round(n * nat),
                    h: nat >= 1 ? Math.round(n / nat) : n,
                  });
                }}
              />
            )}

            {selected.type === "image" && <TraceControl editor={editor} el={selected} />}

            {selected.type === "path" && (
              <NumberSlider
                label="Scale"
                value={selected.scale}
                min={0.05}
                max={2}
                step={0.01}
                onChange={(n) => update(selected.id, { scale: n })}
              />
            )}

            {selected.type === "icon" && (
              <>
                <NumberSlider label="Scale" value={selected.scale} min={1} max={12} step={0.1} onChange={(n) => update(selected.id, { scale: n })} />
                {/* Swap the glyph in place, keeping position, color and scale. */}
                <IconPicker
                  activeId={selected.icon}
                  onPick={(icon) => update(selected.id, { icon })}
                />
              </>
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
                {/* Labelled to match the sliders above it. */}
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="w-16 shrink-0 text-muted-foreground">Font</span>
                  <Select
                    value={selected.fontFamily}
                    onValueChange={(v) => update(selected.id, { fontFamily: v })}
                  >
                    <SelectTrigger
                      size="sm"
                      className="flex-1 text-xs"
                      style={{ fontFamily: selected.fontFamily }}
                      aria-label="Font"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {FONT_IDS.map((id) => {
                        const f = FONTS[id];
                        // Render each item in its own face, so the list previews itself.
                        return (
                          <SelectItem key={id} value={f.value} style={{ fontFamily: f.value }}>
                            {f.label}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
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
