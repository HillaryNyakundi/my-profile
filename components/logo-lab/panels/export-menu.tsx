"use client";

import { useEffect, useRef, useState } from "react";
import { Download, ChevronDown, FileCode2, FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EXPORT_SIZES } from "./constants";

/**
 * ExportMenu — a single Download button that opens a menu of formats:
 * SVG (vector) plus PNG at each preset size. Replaces the old row of three
 * controls. Closes on outside-click or Escape.
 */
export function ExportMenu({
  onExportSvg,
  onExportPng,
}: {
  onExportSvg: () => void;
  onExportPng: (size: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const pick = (fn: () => void) => {
    fn();
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <Button size="sm" onClick={() => setOpen((o) => !o)} aria-haspopup="menu" aria-expanded={open}>
        <Download /> Download <ChevronDown className="size-3.5 opacity-70" />
      </Button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-30 mt-2 w-56 overflow-hidden rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-lg"
        >
          <button
            role="menuitem"
            onClick={() => pick(onExportSvg)}
            className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent"
          >
            <FileCode2 className="size-4 text-teal" />
            <span className="flex-1 text-left font-medium">SVG</span>
            <span className="text-xs text-muted-foreground">vector · scalable</span>
          </button>

          <div className="my-1 h-px bg-border" />
          <p className="px-3 pb-1 pt-1.5 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">
            PNG · raster
          </p>

          {EXPORT_SIZES.map((size) => (
            <button
              key={size}
              role="menuitem"
              onClick={() => pick(() => onExportPng(size))}
              className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent"
            >
              <FileImage className="size-4 text-muted-foreground" />
              <span className="flex-1 text-left font-medium">PNG</span>
              <span className="tabular-nums text-xs text-muted-foreground">
                {size} × {size}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
