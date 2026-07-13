import type { El, ElementType } from "./types";

/** The SVG's own coordinate system: 0..400 on both axes. */
export const VIEWBOX = 400;

/** Classic pointer-cursor outline, drawn in a ~19x32 local box (a `path`'s `d`). */
export const CURSOR_PATH =
  "M0 0 L0 28.5 L6.7 22 L11 31.5 L15 29.7 L10.8 20.5 L19 20.5 Z";

export const FONTS = [
  { label: "Sans (system)", value: "system-ui, Arial, sans-serif" },
  { label: "Serif", value: "Georgia, 'Times New Roman', serif" },
  { label: "Mono", value: "'Courier New', monospace" },
];

/** A small, harmonious starter palette. Hex is a raster-ready color notation. */
export const SWATCHES = [
  "#2F8079", "#0EA5E9", "#6366F1", "#EC4899", "#F59E0B",
  "#10B981", "#EF4444", "#FFFFFF", "#111111", "#000000",
];

export const EXPORT_SIZES = [256, 512, 1024, 2000];

export const uid = () => Math.random().toString(36).slice(2, 9);

/** Factory for a fresh element of the given type, centered on the canvas. */
export function createEl(type: ElementType): El {
  const base = { id: uid(), x: 200, y: 200, rotation: 0, visible: true };
  switch (type) {
    case "circle":
      return { ...base, type, r: 70, fill: "#6366F1" };
    case "rect":
      return { ...base, type, w: 140, h: 90, radius: 12, fill: "#0EA5E9" };
    case "cursor":
      return { ...base, type, scale: 3, fill: "#111111" };
    case "text":
      return {
        ...base,
        type,
        text: "Your Text",
        fontSize: 48,
        fontWeight: 700,
        fontFamily: FONTS[0].value,
        fill: "#111111",
      };
  }
}

/** The starter canvas — the editable "Avid Tech" recreation. */
export const seed = (): El[] => [
  { id: uid(), type: "circle", x: 170, y: 190, r: 118, fill: "#2F8079", rotation: 0, visible: true },
  { id: uid(), type: "text", x: 238, y: 160, fill: "#FFFFFF", rotation: 0, visible: true, text: "Avid", fontSize: 62, fontWeight: 800, fontFamily: FONTS[0].value },
  { id: uid(), type: "text", x: 238, y: 232, fill: "#FFFFFF", rotation: 0, visible: true, text: "Tech", fontSize: 62, fontWeight: 800, fontFamily: FONTS[0].value },
  { id: uid(), type: "cursor", x: 120, y: 255, fill: "#FFFFFF", rotation: 200, visible: true, scale: 2.6 },
];
