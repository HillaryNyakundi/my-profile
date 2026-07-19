"use client";

import Link from "next/link";
import { Undo2, Redo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ExportMenu } from "./export-menu";
import { TemplatePicker } from "./template-picker";
import type { LogoEditorApi } from "../hooks/use-logo-editor";

/** Top bar: breadcrumb + templates + history + a Download menu (SVG / PNG). */
export function EditorToolbar({
  editor,
  onExportSvg,
  onExportPng,
}: {
  editor: LogoEditorApi;
  onExportSvg: () => void;
  onExportPng: (size: number) => void;
}) {
  const { undo, redo, canUndo, canRedo } = editor;
  return (
    <header className="border-b px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
      <div className="flex items-center gap-3">
        <Breadcrumb>
          <BreadcrumbList className="sm:gap-2">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {/* The terminal crumb doubles as the page heading. */}
              <h1 aria-current="page" className="text-lg font-semibold text-foreground">
                Logo playground
              </h1>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 mr-1">
          <Button size="icon" variant="ghost" className="size-8" onClick={undo} disabled={!canUndo} title="Undo (⌘Z)">
            <Undo2 />
          </Button>
          <Button size="icon" variant="ghost" className="size-8" onClick={redo} disabled={!canRedo} title="Redo (⌘⇧Z)">
            <Redo2 />
          </Button>
        </div>

        <TemplatePicker editor={editor} />

        <ExportMenu onExportSvg={onExportSvg} onExportPng={onExportPng} />
      </div>
    </header>
  );
}
