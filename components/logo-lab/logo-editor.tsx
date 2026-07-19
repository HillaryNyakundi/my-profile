"use client";

import { useLogoEditor } from "./hooks/use-logo-editor";
import { useLogoExport } from "./hooks/use-logo-export";
import { useEditorShortcuts } from "./hooks/use-editor-shortcuts";
import { EditorToolbar } from "./panels/editor-toolbar";
import { LayersPanel } from "./panels/layers-panel";
import { LogoCanvas } from "./canvas/logo-canvas";
import { PropertiesPanel } from "./panels/properties-panel";

/**
 * LogoEditor — composition root. Wires the two hooks (state + export) to the
 * three panels and the canvas. Every child stays presentational.
 */
export function LogoEditor() {
  const editor = useLogoEditor();
  const { exportSvg, exportPng } = useLogoExport(editor.svgRef);

  useEditorShortcuts(editor);

  return (
    <main className="min-h-screen bg-background text-foreground max-w-7xl mx-auto w-full">
      <EditorToolbar
        editor={editor}
        onExportSvg={exportSvg}
        onExportPng={exportPng}
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
