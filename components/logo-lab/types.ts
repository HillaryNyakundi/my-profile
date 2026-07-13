/**
 * Logo Lab — shared types.
 *
 * Every item on the canvas is a VECTOR element (SVG). Vectors are math, so they
 * stay razor-sharp at any size — which is exactly why real logos ship as SVG.
 */

export type ElementType = "circle" | "rect" | "text" | "cursor";

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

export interface CursorEl extends BaseEl {
  type: "cursor";
  scale: number;
}

export type El = CircleEl | RectEl | TextEl | CursorEl;
