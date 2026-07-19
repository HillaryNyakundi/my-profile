/**
 * The icon library.
 *
 * Every entry is a single fill-only `path` plus the box it was drawn in.
 * Elements store an icon *id* rather than the path itself, so geometry lives in
 * one place. Strokes are deliberately avoided: a filled path scales without the
 * hairline-thinning a stroke suffers, and it rasterizes and traces cleanly.
 */
export interface IconDef {
  label: string;
  path: string;
  /** Native drawing box. The path is centered by translating -w/2, -h/2. */
  w: number;
  h: number;
  /** For shapes with holes (the ring), where winding alone won't cut one. */
  fillRule?: "evenodd";
}

export const ICONS = {
  cursor: {
    label: "Cursor",
    path: "M0 0 L0 28.5 L6.7 22 L11 31.5 L15 29.7 L10.8 20.5 L19 20.5 Z",
    w: 19,
    h: 32,
  },
  star: {
    label: "Star",
    path: "M16 1 L19.64 10.98 L30.27 11.36 L21.9 17.92 L24.82 28.14 L16 22.2 L7.18 28.14 L10.1 17.92 L1.73 11.36 L12.36 10.98 Z",
    w: 32,
    h: 32,
  },
  sparkle: {
    label: "Sparkle",
    path: "M16 2 C17.5 10.5 21.5 14.5 30 16 C21.5 17.5 17.5 21.5 16 30 C14.5 21.5 10.5 17.5 2 16 C10.5 14.5 14.5 10.5 16 2 Z",
    w: 32,
    h: 32,
  },
  bolt: {
    label: "Bolt",
    path: "M18 2 L6 18 L14 18 L12 30 L26 13 L17 13 Z",
    w: 32,
    h: 32,
  },
  heart: {
    label: "Heart",
    path: "M16 29 C16 29 3 21 3 12 C3 7 6.5 4 10.5 4 C13 4 15 5.3 16 7 C17 5.3 19 4 21.5 4 C25.5 4 29 7 29 12 C29 21 16 29 16 29 Z",
    w: 32,
    h: 32,
  },
  droplet: {
    label: "Droplet",
    path: "M16 2 C16 2 27 14 27 21 C27 26.5 22.1 31 16 31 C9.9 31 5 26.5 5 21 C5 14 16 2 16 2 Z",
    w: 32,
    h: 32,
  },
  hexagon: {
    label: "Hexagon",
    path: "M16 1 L28.99 8.5 L28.99 23.5 L16 31 L3.01 23.5 L3.01 8.5 Z",
    w: 32,
    h: 32,
  },
  triangle: {
    label: "Triangle",
    path: "M16 2 L30 28 L2 28 Z",
    w: 32,
    h: 32,
  },
  diamond: {
    label: "Diamond",
    path: "M16 2 L30 16 L16 30 L2 16 Z",
    w: 32,
    h: 32,
  },
  play: {
    label: "Play",
    path: "M8 4 L27 16 L8 28 Z",
    w: 32,
    h: 32,
  },
  plus: {
    label: "Plus",
    path: "M13 3 H19 V13 H29 V19 H19 V29 H13 V19 H3 V13 H13 Z",
    w: 32,
    h: 32,
  },
  arrow: {
    label: "Arrow",
    path: "M16 3 L29 16 L22 16 L22 29 L10 29 L10 16 L3 16 Z",
    w: 32,
    h: 32,
  },
  ring: {
    label: "Ring",
    // Two subpaths + evenodd: the inner circle punches the hole.
    path: "M1 16 A15 15 0 1 0 31 16 A15 15 0 1 0 1 16 Z M8 16 A8 8 0 1 0 24 16 A8 8 0 1 0 8 16 Z",
    w: 32,
    h: 32,
    fillRule: "evenodd",
  },
} as const satisfies Record<string, IconDef>;

export type IconId = keyof typeof ICONS;

export const ICON_IDS = Object.keys(ICONS) as IconId[];
