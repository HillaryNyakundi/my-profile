/**
 * Raster to vector tracing.
 *
 * Uses `imagetracerjs` (Unlicense, pure JS, traces in colour). Deliberately not
 * potrace: the npm package is Node-only, and every WASM port inherits potrace's
 * GPL-2.0 licence from the original C source. See docs/logo-lab.md.
 *
 * The tracer already merges every region of a colour into ONE path with many
 * subpaths, so "one layer per colour" falls out for free: a traced mark becomes
 * a handful of editable layers rather than hundreds.
 */

/** Longest edge fed to the tracer. Shape clarity matters, pixel count doesn't. */
const TRACE_EDGE = 600;

export interface TracedPath {
  d: string;
  /** Hex, converted from the tracer's `rgb()` output. */
  fill: string;
}

export interface TraceResult {
  /** Coordinate space `d` is expressed in. */
  boxW: number;
  boxH: number;
  paths: TracedPath[];
}

const hex = (n: number) => n.toString(16).padStart(2, "0");

/** "rgb(46,127,120)" -> "#2E7F78". Falls back to the input if unrecognised. */
function rgbToHex(rgb: string | null): string {
  const m = rgb?.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (!m) return rgb ?? "#000000";
  return `#${hex(+m[1])}${hex(+m[2])}${hex(+m[3])}`.toUpperCase();
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not decode the image."));
    img.src = src;
  });
}

export async function traceImage(src: string, colors: number): Promise<TraceResult> {
  const img = await loadImage(src);

  // Trace small. 600px is visually indistinguishable in the output and an order
  // of magnitude faster than tracing the 2048px import.
  const longest = Math.max(img.naturalWidth, img.naturalHeight);
  const scale = Math.min(1, TRACE_EDGE / longest);
  const boxW = Math.max(1, Math.round(img.naturalWidth * scale));
  const boxH = Math.max(1, Math.round(img.naturalHeight * scale));

  const canvas = document.createElement("canvas");
  canvas.width = boxW;
  canvas.height = boxH;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas unavailable.");
  ctx.drawImage(img, 0, 0, boxW, boxH);
  const data = ctx.getImageData(0, 0, boxW, boxH);

  // Kept out of the main bundle: nobody loading /lab pays for the tracer until
  // they actually trace something.
  const mod = await import("imagetracerjs");
  const ImageTracer = mod.default ?? (mod as unknown as typeof mod.default);

  const svg = ImageTracer.imagedataToSVG(data, {
    numberofcolors: colors,
    // Speckle suppression scaled to the image: tiny stray regions are noise,
    // not design, and each one would otherwise become its own subpath.
    pathomit: Math.max(8, Math.round((boxW * boxH) / 20000)),
    ltres: 1,
    qtres: 1,
    colorsampling: 2,
  });

  const doc = new DOMParser().parseFromString(svg, "image/svg+xml");
  if (doc.querySelector("parsererror")) throw new Error("Tracer returned invalid SVG.");

  const paths: TracedPath[] = [];
  for (const node of doc.querySelectorAll("path")) {
    const d = node.getAttribute("d");
    if (!d) continue;
    if (node.getAttribute("opacity") === "0") continue; // fully transparent region
    paths.push({ d, fill: rgbToHex(node.getAttribute("fill")) });
  }

  if (!paths.length) throw new Error("Nothing to trace in that image.");
  return { boxW, boxH, paths };
}
