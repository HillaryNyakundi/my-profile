import type { El } from "../types";
import { uid } from "../constants";
import { fontValue } from "./fonts";

const SANS = fontValue("sans");
const DISPLAY = fontValue("display");

/**
 * Starter layouts.
 *
 * `els` is a factory, not a constant: every element needs a fresh `uid`, and
 * returning a shared array would let the editor mutate the template itself.
 * Coordinates are hand-placed in the 400 viewBox rather than computed, so each
 * layout is a readable "here is where things go" rather than a layout engine.
 */
export interface Template {
  id: string;
  name: string;
  hint: string;
  /** Canvas background this layout was designed against. */
  bg: string;
  els: () => El[];
}

const base = { rotation: 0, visible: true };
const text = (o: Partial<El> & { text: string; x: number; y: number; fontSize: number }) =>
  ({
    id: uid(),
    type: "text" as const,
    fill: "#FFFFFF",
    fontWeight: 800,
    fontFamily: SANS,
    ...base,
    ...o,
  }) as El;

export const TEMPLATES: Template[] = [
  {
    id: "avid",
    name: "Avid Tech",
    hint: "Mark + stacked wordmark",
    bg: "#111111",
    els: () => [
      { id: uid(), type: "circle", x: 171, y: 200, r: 106, fill: "#2F8079", ...base },
      text({ text: "Avid", x: 245, y: 163, fontSize: 96 }),
      text({ text: "Tech", x: 252, y: 259, fontSize: 96 }),
      { id: uid(), type: "icon", icon: "cursor", x: 96, y: 260, scale: 3.75, fill: "#FFFFFF", ...base, rotation: 72 },
    ],
  },
  {
    id: "badge",
    name: "Badge",
    hint: "Initials in a disc",
    bg: "#111111",
    els: () => [
      { id: uid(), type: "circle", x: 200, y: 200, r: 130, fill: "#2F8079", ...base },
      text({ text: "AV", x: 200, y: 200, fontSize: 110 }),
    ],
  },
  {
    id: "monogram",
    name: "Monogram",
    hint: "One letter, one tile",
    bg: "#F5F5F4",
    els: () => [
      { id: uid(), type: "rect", x: 200, y: 200, w: 220, h: 220, radius: 48, fill: "#1C1917", ...base },
      text({ text: "H", x: 200, y: 200, fontSize: 140 }),
    ],
  },
  {
    id: "wordmark",
    name: "Wordmark",
    hint: "Type only, no shape",
    bg: "#0B1120",
    els: () => [
      text({ text: "STUDIO", x: 200, y: 172, fontSize: 62, fontFamily: DISPLAY }),
      text({ text: "design co.", x: 200, y: 226, fontSize: 26, fontWeight: 400, fill: "#38BDF8" }),
    ],
  },
  {
    id: "stack",
    name: "Icon above",
    hint: "Glyph over a wordmark",
    bg: "#0C1A12",
    els: () => [
      { id: uid(), type: "icon", icon: "star", x: 200, y: 145, scale: 3.4, fill: "#16A34A", ...base },
      text({ text: "NORTH", x: 200, y: 252, fontSize: 54 }),
      text({ text: "supply co", x: 200, y: 294, fontSize: 22, fontWeight: 500, fill: "#84CC16" }),
    ],
  },
  {
    id: "lockup",
    name: "Lockup",
    hint: "Glyph beside the name",
    bg: "#1C1210",
    els: () => [
      { id: uid(), type: "icon", icon: "bolt", x: 108, y: 200, scale: 3.2, fill: "#F97316", ...base },
      text({ text: "VOLT", x: 253, y: 182, fontSize: 56 }),
      text({ text: "energy", x: 216, y: 224, fontSize: 24, fontWeight: 400, fill: "#FACC15" }),
    ],
  },
  {
    id: "ring",
    name: "Ring",
    hint: "Name inside a rule",
    bg: "#08131F",
    els: () => [
      { id: uid(), type: "icon", icon: "ring", x: 200, y: 200, scale: 8, fill: "#0EA5E9", ...base },
      text({ text: "CORE", x: 200, y: 200, fontSize: 40 }),
    ],
  },
];

/** The canvas the editor opens on. */
export const seed = (): El[] => TEMPLATES[0].els();
