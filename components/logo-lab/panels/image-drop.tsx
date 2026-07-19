"use client";

import { useCallback, useState } from "react";
import { useDropzone, type FileRejection } from "react-dropzone";
import { ImagePlus, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_UPLOAD_BYTES,
  importImage,
} from "../lib/import-image";
import type { LogoEditorApi } from "../hooks/use-logo-editor";

/**
 * Upload target for raster images. Click to browse or drop a file on it.
 *
 * Decoding and downscaling a large photo takes a beat, so this owns a `busy`
 * state: without it a 4000px drop looks like nothing happened.
 */
export function ImageDrop({ editor }: { editor: LogoEditorApi }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    async (accepted: File[], rejected: FileRejection[]) => {
      setError(null);

      if (rejected.length) {
        const tooBig = rejected[0].errors.some((e) => e.code === "file-too-large");
        setError(tooBig ? "That file is over 20MB." : "PNG, JPG or WEBP only.");
        return;
      }
      const file = accepted[0];
      if (!file) return;

      setBusy(true);
      try {
        editor.addImage(await importImage(file));
      } catch {
        setError("Could not read that image.");
      } finally {
        setBusy(false);
      }
    },
    [editor]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_IMAGE_TYPES,
    maxSize: MAX_UPLOAD_BYTES,
    multiple: false,
    disabled: busy,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className={cn(
          "flex cursor-pointer flex-col items-center gap-1 rounded-md border border-dashed px-2 py-3 text-center text-xs transition-colors",
          isDragActive
            ? "border-primary bg-primary/10 text-primary"
            : "text-muted-foreground hover:border-primary/60 hover:text-foreground",
          busy && "pointer-events-none opacity-70"
        )}
      >
        <input {...getInputProps()} />
        {busy ? <Loader2 className="size-4 animate-spin" /> : <ImagePlus className="size-4" />}
        <span>{busy ? "Processing…" : isDragActive ? "Drop it" : "Drop or click"}</span>
      </div>
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
