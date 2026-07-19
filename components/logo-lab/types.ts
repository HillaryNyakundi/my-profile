/**
 * Logo Lab: shared types.
 *
 * Every item on the canvas is a VECTOR element (SVG). Vectors are math, so they
 * stay razor-sharp at any size, which is exactly why real logos ship as SVG.
 */
import type { IconId } from "./data/icons";

export type ElementType = "circle" | "rect" | "text" | "icon" | "image" | "path";

/**
 * Types the element factory can build from nothing. Images are excluded on
 * purpose: one can only exist by importing a file, so it has its own action.
 */
export type CreatableType = Exclude<ElementType, "image" | "path">;

export interface BaseEl {
  id: string;
  type: ElementType;
  x: number; // center X, in viewBox units
  y: number; // center Y, in viewBox units
  fill: string; // interior color (hex)
  rotation: number; // degrees, around the element's own center
  visible: boolean;
}

export interface CircleEl extends BaseEl {
  type: "circle";
  r: number;
}

export interface RectEl extends BaseEl {
  type: "rect";
  w: number;
  h: number;
  radius: number; // corner rounding
}

export interface TextEl extends BaseEl {
  type: "text";
  text: string;
  fontSize: number;
  fontWeight: number;
  fontFamily: string;
}

/** A library glyph. Stores the icon's *id*; the path is looked up at render. */
export interface IconEl extends BaseEl {
  type: "icon";
  icon: IconId;
  scale: number;
}

/**
 * An imported raster image.
 *
 * `src` is ALWAYS a `data:` URI, never `blob:` or remote. Export rasterizes the
 * SVG through an `<img>`, which runs in secure static mode and refuses to fetch
 * external resources: a blob URL silently bakes a broken-image icon into the
 * PNG, and a remote URL taints the canvas so `toBlob` throws. See
 * `lib/import-image.ts`, which is the only place images enter the editor.
 */
export interface ImageEl extends BaseEl {
  type: "image";
  src: string;
  w: number;
  h: number;
  /** Source aspect (w / h), so resizing can hold proportions. */
  natural: number;
}

/**
 * An arbitrary vector path, currently produced only by tracing a raster image.
 *
 * Positioned exactly like `IconEl`: `d` stays in the coordinate space it was
 * authored in (`boxW` x `boxH`), and the element centers and scales that box.
 * That reuse is why a traced path inherits drag, rotate, reorder and export
 * without any new machinery.
 */
export interface PathEl extends BaseEl {
  type: "path";
  d: string;
  boxW: number;
  boxH: number;
  scale: number;
}

export type El = CircleEl | RectEl | TextEl | IconEl | ImageEl | PathEl;
