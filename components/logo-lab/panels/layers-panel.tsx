"use client";

import { useState } from "react";
import {
  Circle as CircleIcon,
  Square,
  Type as TypeIcon,
  Shapes,
  Eye,
  EyeOff,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CreatableType, TextEl } from "../types";
import { ICONS } from "../data/icons";
import type { LogoEditorApi } from "../hooks/use-logo-editor";
import { IconPicker } from "./icon-picker";
import { ImageDrop } from "./image-drop";

const ADD_BUTTONS: { type: CreatableType; label: string; icon: typeof CircleIcon }[] = [
  { type: "circle", label: "Circle", icon: CircleIcon },
  { type: "rect", label: "Rect", icon: Square },
  { type: "text", label: "Text", icon: TypeIcon },
];

/** Left rail: add-element buttons + the layer stack (topmost first). */
export function LayersPanel({ editor }: { editor: LogoEditorApi }) {
  const { els, selectedId, addEl, addIcon, select, toggleVisible, reset } = editor;
  const [iconsOpen, setIconsOpen] = useState(false);

  return (
    <aside className="border-r p-3 space-y-4">
      <div>
        <p className="text-xs font-medium text-muted-foreground mb-2">Add element</p>
        <div className="grid grid-cols-2 gap-2">
          {ADD_BUTTONS.map(({ type, label, icon: Icon }) => (
            <Button key={type} size="sm" variant="outline" onClick={() => addEl(type)}>
              <Icon /> {label}
            </Button>
          ))}
          <Button
            size="sm"
            variant={iconsOpen ? "secondary" : "outline"}
            onClick={() => setIconsOpen((o) => !o)}
            aria-expanded={iconsOpen}
          >
            <Shapes /> Icons
          </Button>
        </div>
        {iconsOpen && (
          <div className="mt-2 rounded-md border p-1.5">
            <IconPicker onPick={addIcon} />
          </div>
        )}
      </div>

      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">Image</p>
        <ImageDrop editor={editor} />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-medium text-muted-foreground">Layers</p>
          <Button size="sm" variant="ghost" onClick={reset}>
            <RotateCcw /> Reset
          </Button>
        </div>
        {/* Painted bottom→top, so reverse for a natural "top layer on top" list. */}
        <ul className="space-y-1">
          {[...els].reverse().map((el) => (
            <li
              key={el.id}
              onClick={() => select(el.id)}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs cursor-pointer border",
                selectedId === el.id
                  ? "border-primary bg-primary/5"
                  : "border-transparent hover:bg-accent"
              )}
            >
              {/* Images preview themselves; everything else shows its fill. */}
              <span
                className="inline-block size-3 shrink-0 rounded-sm border bg-cover bg-center"
                style={
                  el.type === "image"
                    ? { backgroundImage: `url(${el.src})` }
                    : { background: el.fill }
                }
              />
              <span className="flex-1 truncate capitalize">
                {el.type === "text"
                  ? `“${(el as TextEl).text}”`
                  : el.type === "icon"
                    ? ICONS[el.icon].label
                    : el.type}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleVisible(el.id);
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                {el.visible ? <Eye className="size-3.5" /> : <EyeOff className="size-3.5" />}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
