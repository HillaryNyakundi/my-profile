# Logo Lab — Plan & Roadmap

The **Logo Lab** (route: [`/lab`](../app/lab/page.tsx)) is a from-scratch logo editor
built into this site. This doc captures the original idea, why it's built the way it
is, exactly what exists today (v0), and the versions it can grow into.

> **Premise:** most logo work is **asset extraction and recomposition**, not drawing
> from a blank canvas. The whole tool is built around that insight — start from shapes,
> text, and (eventually) an uploaded image, then recolor, arrange, and export.

There is a companion **Field Guide** at [`/lab/guide`](../app/lab/guide/page.tsx) that
teaches the underlying concepts (vector vs raster, alpha, paths, the toolchain) with
live interactive demos.

---

## The original idea

It started from a real task: recoloring the `Avid Tech` logo (teal circle + white text
on a black background). That recolor turned out to be three named operations — **alpha
compositing**, **resampling**, and an **RGBA → RGB mode convert** — not "design." The
realization that logo work is mostly *recomposition* became the product thesis:

1. Let a user build a mark from primitives (circle, rect, text, cursor), **or**
2. Let them bring an image, **extract** clean assets from it, and **tweak** it into a logo.

v0 delivers (1). Versions v2–v3 deliver (2).

---

## Where it lives in the codebase

| File | Responsibility |
| --- | --- |
| [app/lab/page.tsx](../app/lab/page.tsx) | Route — renders the editor |
| [app/lab/guide/page.tsx](../app/lab/guide/page.tsx) | Route — the field guide |
| [components/logo-lab/logo-editor.tsx](../components/logo-lab/logo-editor.tsx) | Composition root — wires hooks to panels |
| [components/logo-lab/use-logo-editor.ts](../components/logo-lab/use-logo-editor.ts) | **State + all mutations** (elements, selection, drag, rotate) |
| [components/logo-lab/use-history.ts](../components/logo-lab/use-history.ts) | Undo/redo with gesture coalescing |
| [components/logo-lab/use-logo-export.ts](../components/logo-lab/use-logo-export.ts) | SVG serialize + PNG rasterize |
| [components/logo-lab/use-editor-shortcuts.ts](../components/logo-lab/use-editor-shortcuts.ts) | Keyboard layer |
| [components/logo-lab/logo-canvas.tsx](../components/logo-lab/logo-canvas.tsx) | The SVG stage + selection/rotate overlay |
| [components/logo-lab/element-shape.tsx](../components/logo-lab/element-shape.tsx) | Renders one element (circle/rect/text/cursor) |
| [components/logo-lab/layers-panel.tsx](../components/logo-lab/layers-panel.tsx) | Add-element buttons + layer stack |
| [components/logo-lab/properties-panel.tsx](../components/logo-lab/properties-panel.tsx) | Per-element property controls |
| [components/logo-lab/editor-toolbar.tsx](../components/logo-lab/editor-toolbar.tsx) | Top bar — history + Download menu |
| [components/logo-lab/export-menu.tsx](../components/logo-lab/export-menu.tsx) | Download dropdown (SVG / PNG sizes) |
| [components/logo-lab/types.ts](../components/logo-lab/types.ts) · [constants.ts](../components/logo-lab/constants.ts) · [geometry.ts](../components/logo-lab/geometry.ts) | Model, presets, bounding-box math |
| [components/logo-lab/guide/](../components/logo-lab/guide/) | Field guide + its live demos |

### Architecture principle

**Logic lives in hooks; components stay presentational.** `useLogoEditor` owns the
entire editor state and every action; the panels and canvas just read `state` and call
actions. This is deliberate — it's what makes each version below a small, additive change
rather than a rewrite. It's dependency-free (plain SVG + React) so the source doubles as
a learning artifact.

---

## v0 — Scratch editor **(built)**

The current, shipped state.

- **Elements:** circle, rectangle (with corner radius), text (content / size / weight /
  font family), and a cursor path.
- **Canvas:** SVG stage with a `0..400` viewBox; drag to move; click-to-select; a solid or
  **transparent** background (transparent exports a real alpha channel).
- **Rotation:** on-canvas rotate handle (drag the dot above a selected element) **plus** a
  Rotate slider. Live angle readout while dragging; hold **Shift** to snap to 15°.
- **Color:** native picker + hex field + brand swatches, per element and for the canvas
  background.
- **Layers:** reorderable stack with per-layer visibility toggle; duplicate; delete.
- **History:** undo/redo with **gesture coalescing** — a whole drag or slider sweep is one
  undo step.
- **Keyboard:** ⌘/Ctrl+Z / ⌘⇧Z / Ctrl+Y (undo/redo), ⌘D (duplicate), Delete/Backspace
  (remove), Esc (deselect).
- **Export:** one **Download** menu — SVG (vector) and PNG at 256 / 512 / 1024 / 2000 px.

---

## The version roadmap

Each pass is usable on its own and de-risks the next. Ship in order — don't build the
tracer until people already love the editor.

### v1 — Templates & polish

Make a blank canvas feel like a head start.

- **Starter templates** — a gallery of preset compositions (badge, wordmark, monogram,
  icon-in-circle) that seed the canvas.
- **Icon library** — a searchable set of built-in vector icons to drop in as elements
  (extend the element model with an `icon` type, or reuse `path`).
- **Fonts** — a real font picker (bundle a few open-source families; convert text to
  outlines on export via `opentype.js` so downloads don't depend on the viewer's fonts).
- **Palette presets** — curated color sets (already have the brand palette to seed one).
- **Alignment & snapping** — center guides, snap-to-edge, distribute; a nudge with arrow
  keys. Extends the existing pointer/gesture code in `useLogoEditor`.
- **Group / multi-select** — select and transform several elements at once.

### v2 — Image import

Deliver the second half of the thesis: bring an image, tweak it into a logo.

- **Upload** — drop in a photo or screenshot; place it as a new (raster) element type.
- **Background removal** — isolate the subject (`@imgly/background-removal` in-browser, or
  a `rembg` service). This is the first genuinely hard, high-value step.
- **Recolor** — tint / duotone / palette-map an imported image toward the brand colors.
- **Compose** — arrange the cleaned image with text and shapes; export as usual.

### v3 — Vectorize

The hardest, highest-value pass — turn pixels into editable vectors.

- **Quantize** — reduce the image to a small palette (the field guide's posterize demo is
  the toy version of this).
- **Trace** — `potrace` / `imagetracerjs` converts color regions into SVG paths.
- **Split into layers** — each traced path becomes an editable element in the existing
  model, so the rest of the editor "just works" on it.
- Scope tight at first: clean, high-contrast images trace beautifully; busy photos don't.
  Embrace that constraint rather than fighting it.

### Beyond v3 (optional directions)

- **Persistence** — save the canvas to `localStorage`, then to accounts/projects.
- **Brand kits** — save palettes, fonts, and logo variants together; export a favicon +
  social-image set in one click.
- **Sharing** — shareable links or an embeddable read-only viewer.
- **Collaboration / history timeline** — the coalesced history stack is already a good
  base for a visual undo timeline.

---

## Toolchain reference (when to reach for a dependency)

v0 intentionally uses **none** of these. Add them when the version calls for it.

| Need | Reach for |
| --- | --- |
| Full canvas editor (snapping, transform handles, multi-select) | **Fabric.js** or **Konva.js** (`react-konva`) |
| Raster → vector tracing | **potrace** / **imagetracerjs** |
| Text → editable vector paths | **opentype.js** |
| Server-side resize / composite | **Sharp** |
| Background removal | **@imgly/background-removal** or a `rembg` service |
| SVG → PNG at any size (server) | **resvg** |

---

## Design & theme notes

The Lab uses the site's theme tokens, so it follows light/dark automatically.

- **Primary = Avid Tech teal** (`--primary`), used for buttons, focus rings, and the
  brand mark.
- **Brand palette baked into the theme** as Tailwind utilities: `teal`, `dusty-blue`,
  `slate`, `sage` (see [app/globals.css](../app/globals.css)). `dusty-blue` replaced the
  site's former hardcoded blue accent.
- Selection/rotate UI uses a fixed blue (`#3b82f6`) as a conventional editor accent,
  independent of theme, and is stripped from exports via the `data-overlay` marker.
