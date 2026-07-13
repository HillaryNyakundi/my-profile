"use client";

import { useLogoEditor } from "./use-logo-editor";
import { useLogoExport } from "./use-logo-export";
import { useEditorShortcuts } from "./use-editor-shortcuts";
import { EditorToolbar } from "./editor-toolbar";
import { LayersPanel } from "./layers-panel";
import { LogoCanvas } from "./logo-canvas";
import { PropertiesPanel } from "./properties-panel";

/**
 * LogoEditor — composition root. Wires the two hooks (state + export) to the
 * three panels and the canvas. Every child stays presentational.
 */
export function LogoEditor() {
  const editor = useLogoEditor();
  const { exportSvg, exportPng } = useLogoExport(editor.svgRef);

  useEditorShortcuts(editor);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <EditorToolbar
        onExportSvg={exportSvg}
        onExportPng={exportPng}
        onUndo={editor.undo}
        onRedo={editor.redo}
        canUndo={editor.canUndo}
        canRedo={editor.canRedo}
      />

      <div className="grid lg:grid-cols-[220px_1fr_280px]">
        <LayersPanel editor={editor} />

        <section className="flex items-center justify-center p-6 bg-muted/30">
          <LogoCanvas editor={editor} />
        </section>

        <PropertiesPanel editor={editor} />
      </div>
    </main>
  );
}
