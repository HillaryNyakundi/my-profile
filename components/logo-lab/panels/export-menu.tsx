"use client";

import { Download, ChevronDown, FileCode2, FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EXPORT_SIZES } from "../constants";

/**
 * A single Download button opening a menu of formats: SVG (vector) plus PNG at
 * each preset size.
 *
 * Backed by Radix rather than the hand-rolled popover this replaced. That
 * version tracked outside-clicks and Escape by hand but had no roving focus, no
 * arrow-key navigation and no focus restore on close, so it was fine with a
 * mouse and awkward from the keyboard. Radix provides all of that as table
 * stakes, and deletes ~25 lines of effect plumbing.
 */
export function ExportMenu({
  onExportSvg,
  onExportPng,
}: {
  onExportSvg: () => void;
  onExportPng: (size: number) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm">
          <Download /> Download <ChevronDown className="size-3.5 opacity-70" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onSelect={onExportSvg}>
          <FileCode2 className="text-teal" />
          <span className="flex-1 font-medium">SVG</span>
          <span className="text-xs text-muted-foreground">vector · scalable</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuLabel className="font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">
          PNG · raster
        </DropdownMenuLabel>

        {EXPORT_SIZES.map((size) => (
          <DropdownMenuItem key={size} onSelect={() => onExportPng(size)}>
            <FileImage className="text-muted-foreground" />
            <span className="flex-1 font-medium">PNG</span>
            <span className="tabular-nums text-xs text-muted-foreground">
              {size} × {size}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
