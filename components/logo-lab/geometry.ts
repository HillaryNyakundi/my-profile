import type { El } from "./types";

/**
 * Rough local-space bounding box of an element (width/height around its center).
 * Used only to draw the dashed selection outline — an estimate is fine here.
 * Text width is approximated from character count since we don't measure glyphs.
 */
export function bbox(el: El): { w: number; h: number } {
  switch (el.type) {
    case "circle":
      return { w: el.r * 2, h: el.r * 2 };
    case "rect":
      return { w: el.w, h: el.h };
    case "text":
      return { w: Math.max(el.text.length * el.fontSize * 0.6, 20), h: el.fontSize * 1.1 };
    case "cursor":
      return { w: 19 * el.scale, h: 32 * el.scale };
  }
}
