import type { El } from "../types";
import { ICONS } from "../data/icons";

/**
 * Rough local-space bounding box of an element (width/height around its center).
 * Used only to draw the dashed selection outline, so an estimate is fine here.
 * Text width is approximated from character count since we don't measure glyphs.
 */
export function bbox(el: El): { w: number; h: number } {
  switch (el.type) {
    case "circle":
      return { w: el.r * 2, h: el.r * 2 };
    case "rect":
    case "image":
      return { w: el.w, h: el.h };
    case "text":
      return { w: Math.max(el.text.length * el.fontSize * 0.6, 20), h: el.fontSize * 1.1 };
    case "icon": {
      const def = ICONS[el.icon];
      return { w: def.w * el.scale, h: def.h * el.scale };
    }
    case "path":
      return { w: el.boxW * el.scale, h: el.boxH * el.scale };
  }
}
