import pica from "pica";

/**
 * The only doorway for raster images entering the editor.
 *
 * Two rules are enforced here so nothing downstream has to think about them:
 *
 * 1. **The result is a `data:` URI.** Export rasterizes the canvas SVG through
 *    an `<img>`, which runs in secure static mode: a `blob:` URL silently bakes
 *    a broken-image icon into the PNG (verified, not theorized) and a remote URL
 *    taints the canvas so `toBlob` throws.
 * 2. **Pixels are capped.** A phone photo is ~4000px and becomes a multi-megabyte
 *    base64 string that then sits in every history snapshot.
 */

/** Longest edge kept after import. Enough that a 2000px export never upscales. */
const MAX_EDGE = 2048;

/** Longest edge of a newly placed image, in viewBox units (canvas is 400). */
const PLACED_EDGE = 220;

/** Formats that can carry transparency, and so must not be re-encoded as JPEG. */
const ALPHA_TYPES = new Set(["image/png", "image/webp", "image/gif"]);

export const ACCEPTED_IMAGE_TYPES = {
  "image/png": [".png"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/webp": [".webp"],
};

/** Refuse anything large enough to lock the tab up during decode. */
export const MAX_UPLOAD_BYTES = 20 * 1024 * 1024;

export interface ImportedImage {
  src: string;
  /** Placed box in viewBox units. */
  w: number;
  h: number;
  natural: number;
}

const readAsDataUrl = (file: Blob) =>
  new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = () => reject(new Error("Could not read the file."));
    r.readAsDataURL(file);
  });

export async function importImage(file: File): Promise<ImportedImage> {
  const bitmap = await createImageBitmap(file);
  const { width, height } = bitmap;

  try {
    const longest = Math.max(width, height);
    let src: string;

    if (longest <= MAX_EDGE) {
      // Already small enough. Keep the original bytes rather than re-encoding:
      // a 300KB JPEG round-tripped through a canvas as PNG can balloon past 3MB.
      src = await readAsDataUrl(file);
    } else {
      const scale = MAX_EDGE / longest;
      const out = document.createElement("canvas");
      out.width = Math.round(width * scale);
      out.height = Math.round(height * scale);
      // Lanczos, the same resampling the field guide describes. A plain
      // drawImage() downscale aliases badly at these ratios.
      await pica().resize(bitmap, out, { filter: "lanczos3" });
      src = ALPHA_TYPES.has(file.type)
        ? out.toDataURL("image/png")
        : out.toDataURL("image/jpeg", 0.92);
    }

    const natural = width / height;
    return {
      src,
      w: natural >= 1 ? PLACED_EDGE : Math.round(PLACED_EDGE * natural),
      h: natural >= 1 ? Math.round(PLACED_EDGE / natural) : PLACED_EDGE,
      natural,
    };
  } finally {
    bitmap.close();
  }
}
