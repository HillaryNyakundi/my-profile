/**
 * Font stacks offered by the text picker, keyed by a stable id.
 *
 * Callers that need a specific face (templates, the element factory) look it up
 * with `fontValue("display")` rather than indexing a position, so reordering or
 * inserting an entry here can't silently change what a template renders in.
 *
 * These are all *locally installed* stacks on purpose. PNG export rasterizes
 * the SVG through an `<img>`, and that pass will not fetch a webfont: a Google
 * Font would preview fine on canvas and then silently fall back in the download.
 * Anything added here must resolve without a network request.
 */
export interface FontDef {
  label: string;
  value: string;
}

export const FONTS = {
  sans: { label: "Sans (system)", value: "system-ui, Arial, sans-serif" },
  grotesk: { label: "Grotesk", value: "'Helvetica Neue', Helvetica, Arial, sans-serif" },
  humanist: { label: "Humanist", value: "'Segoe UI', Candara, Optima, sans-serif" },
  rounded: { label: "Rounded", value: "'Trebuchet MS', 'Segoe UI', sans-serif" },
  condensed: { label: "Condensed", value: "'Arial Narrow', 'Helvetica Neue', sans-serif" },
  display: { label: "Display", value: "Impact, Haettenschweiler, 'Arial Black', sans-serif" },
  serif: { label: "Serif", value: "Georgia, 'Times New Roman', serif" },
  oldstyle: { label: "Old style", value: "Garamond, 'Palatino Linotype', 'Book Antiqua', serif" },
  mono: { label: "Mono", value: "'Courier New', monospace" },
} as const satisfies Record<string, FontDef>;

export type FontId = keyof typeof FONTS;

/** Picker order. Object keys keep their insertion order, so this is the list above. */
export const FONT_IDS = Object.keys(FONTS) as FontId[];

/** The CSS `font-family` string for an id. Elements store this value, not the id. */
export const fontValue = (id: FontId) => FONTS[id].value;
