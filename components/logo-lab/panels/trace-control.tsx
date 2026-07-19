"use client";

import { useState } from "react";
import { Loader2, Spline } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NumberSlider } from "./number-slider";
import { traceImage } from "../lib/trace-image";
import type { ImageEl } from "../types";
import type { LogoEditorApi } from "../hooks/use-logo-editor";

/**
 * Turns a selected image into editable vector paths.
 *
 * Tracing runs on the main thread, so the button owns a busy state and is
 * disabled while it works: on a large bitmap the tab would otherwise appear to
 * hang with no explanation.
 */
export function TraceControl({ editor, el }: { editor: LogoEditorApi; el: ImageEl }) {
  const [colors, setColors] = useState(6);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = async () => {
    setBusy(true);
    setError(null);
    try {
      editor.applyTrace(el.id, await traceImage(el.src, colors));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Tracing failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-2 rounded-md border p-2">
      <NumberSlider label="Colors" value={colors} min={2} max={16} onChange={setColors} />
      <Button size="sm" variant="outline" className="w-full" onClick={run} disabled={busy}>
        {busy ? <Loader2 className="animate-spin" /> : <Spline />}
        {busy ? "Tracing…" : "Trace to vector"}
      </Button>
      {error ? (
        <p className="text-xs text-destructive">{error}</p>
      ) : (
        <p className="text-xs text-muted-foreground">
          One layer per color. The image is kept, hidden, so you can retrace.
        </p>
      )}
    </div>
  );
}
