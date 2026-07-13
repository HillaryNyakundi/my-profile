"use client";

import Link from "next/link";
import { Undo2, Redo2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExportMenu } from "./export-menu";

/** Top bar: branding + history + a single Download menu (SVG / PNG sizes). */
export function EditorToolbar({
  onExportSvg,
  onExportPng,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
}: {
  onExportSvg: () => void;
  onExportPng: (size: number) => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}) {
  return (
    <header className="border-b px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
      <div className="flex items-center gap-3">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <h1 className="text-lg font-semibold">Logo playground</h1>
        <span className="text-xs text-muted-foreground hidden sm:inline">vector editor · v0</span>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 mr-1">
          <Button size="icon" variant="ghost" className="size-8" onClick={onUndo} disabled={!canUndo} title="Undo (⌘Z)">
            <Undo2 />
          </Button>
          <Button size="icon" variant="ghost" className="size-8" onClick={onRedo} disabled={!canRedo} title="Redo (⌘⇧Z)">
            <Redo2 />
          </Button>
        </div>

        <Button size="sm" variant="ghost" asChild>
          <Link href="/lab/guide">
            <BookOpen /> <span className="hidden sm:inline">Guide</span>
          </Link>
        </Button>

        <ExportMenu onExportSvg={onExportSvg} onExportPng={onExportPng} />
      </div>
    </header>
  );
}
