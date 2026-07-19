/** Quick swatches shown under every color input. */
export const SWATCHES = [
  "#2F8079", "#0EA5E9", "#6366F1", "#EC4899", "#F59E0B",
  "#10B981", "#EF4444", "#FFFFFF", "#111111", "#000000",
];

export interface Palette {
  name: string;
  /** Canvas background. Skipped while the canvas is transparent. */
  bg: string;
  /**
   * Ordered most-used first. Applying a palette maps each *distinct* fill
   * already on the canvas to the next color here, so a two-color logo takes
   * `colors[0]` and `colors[1]` and keeps its own figure/ground relationship.
   */
  colors: string[];
}

export const PALETTES: Palette[] = [
  { name: "Avid", bg: "#111111", colors: ["#2F8079", "#FFFFFF", "#8FD6CE"] },
  { name: "Midnight", bg: "#0B1120", colors: ["#6366F1", "#F8FAFC", "#38BDF8"] },
  { name: "Ocean", bg: "#08131F", colors: ["#0EA5E9", "#F0F9FF", "#22D3EE"] },
  { name: "Forest", bg: "#0C1A12", colors: ["#16A34A", "#F0FDF4", "#84CC16"] },
  { name: "Ember", bg: "#1C1210", colors: ["#F97316", "#FFF7ED", "#FACC15"] },
  { name: "Rose", bg: "#1A0F16", colors: ["#EC4899", "#FDF2F8", "#F9A8D4"] },
  { name: "Paper", bg: "#F5F5F4", colors: ["#1C1917", "#F5F5F4", "#78716C"] },
];
