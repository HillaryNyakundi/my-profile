import type { CreatableType, El } from "./types";
import { fontValue } from "./data/fonts";
import type { IconId } from "./data/icons";

/** The SVG's own coordinate system: 0..400 on both axes. */
export const VIEWBOX = 400;

export const EXPORT_SIZES = [256, 512, 1024, 2000];

export const uid = () => Math.random().toString(36).slice(2, 9);

/** Factory for a fresh element of the given type, centered on the canvas. */
export function createEl(type: CreatableType, icon: IconId = "cursor"): El {
  const base = { id: uid(), x: 200, y: 200, rotation: 0, visible: true };
  switch (type) {
    case "circle":
      return { ...base, type, r: 70, fill: "#6366F1" };
    case "rect":
      return { ...base, type, w: 140, h: 90, radius: 12, fill: "#0EA5E9" };
    case "icon":
      return { ...base, type, icon, scale: 3, fill: "#111111" };
    case "text":
      return {
        ...base,
        type,
        text: "Your Text",
        fontSize: 48,
        fontWeight: 700,
        fontFamily: fontValue("sans"),
        fill: "#111111",
      };
  }
}
