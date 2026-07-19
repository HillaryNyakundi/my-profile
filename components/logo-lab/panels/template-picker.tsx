"use client";

import { useMemo, useState } from "react";
import { LayoutTemplate } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { VIEWBOX } from "../constants";
import { TEMPLATES, type Template } from "../data/templates";
import { ElementShape } from "../canvas/element-shape";
import type { LogoEditorApi } from "../hooks/use-logo-editor";

/** Live preview of a layout, drawn with the same renderer as the canvas. */
function Thumb({ t }: { t: Template }) {
  // els() mints fresh ids on every call, so build the preview scene once.
  const els = useMemo(() => t.els(), [t]);
  return (
    <svg
      viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
      className="w-full rounded-md ring-1 ring-border transition-shadow group-hover:ring-2 group-hover:ring-primary"
    >
      <rect width={VIEWBOX} height={VIEWBOX} fill={t.bg} />
      {els.map((el) => (
        <ElementShape key={el.id} el={el} />
      ))}
    </svg>
  );
}

/** Toolbar entry point: a sheet of starter layouts that replace the canvas. */
export function TemplatePicker({ editor }: { editor: LogoEditorApi }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="sm" variant="ghost">
          <LayoutTemplate /> <span className="hidden sm:inline">Templates</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full gap-0 overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Starter layouts</SheetTitle>
          <SheetDescription>
            Picking one replaces the canvas and clears history. Everything stays editable.
          </SheetDescription>
        </SheetHeader>
        <div className="grid grid-cols-2 gap-3 p-4">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                editor.loadTemplate(t);
                setOpen(false);
              }}
              className="group space-y-1.5 text-left"
            >
              <Thumb t={t} />
              <p className="text-sm font-medium leading-none">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.hint}</p>
            </button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
