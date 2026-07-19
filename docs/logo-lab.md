# Logo Lab: Plan & Roadmap

The **Logo Lab** (route: [`/lab`](../app/lab/page.tsx)) is a from-scratch logo editor
built into this site. It exists for developers who need a mark or a favicon and would
rather tweak one in the browser than open a design app. This doc captures the idea, why
it's built the way it is, exactly what exists today (v0 and v1), and where it grows next.

> **Premise:** most logo work is **asset extraction and recomposition**, not drawing from
> a blank canvas. The whole tool is built around that: start from shapes, text, icons and
> (eventually) an uploaded image, then recolor, arrange, and export.

> **The Field Guide has been removed.** `/lab/guide` and
> `components/logo-lab/guide/` were deleted; the last version is in commit `7915e29`.
> References to it below are kept only where they explain a decision the code still
> reflects.

---

## The original idea

It started from a real task: recoloring the `Avid Tech` logo (teal circle + white text on
a black background). That recolor turned out to be three named operations, **alpha
compositing**, **resampling**, and an **RGBA → RGB mode convert**, rather than "design."
The realization that logo work is mostly *recomposition* became the product thesis:

1. Let a user build a mark from primitives (shapes, text, icons), **or**
2. Let them bring an image, **extract** clean assets from it, and **tweak** it into a logo.

v0 and v1 deliver (1). Versions v2 and v3 deliver (2).

That origin is still why the default canvas is the Avid Tech mark, but the tool is no
longer framed around that one logo.

---

## Where it lives in the codebase

Files are grouped by job. The entry point (`logo-editor.tsx`) sits at the root so the
`app/lab` route imports a stable path.

| Path | Responsibility |
| --- | --- |
| [app/lab/page.tsx](../app/lab/page.tsx) | Route: renders the editor |
| [logo-editor.tsx](../components/logo-lab/logo-editor.tsx) | Composition root; wires hooks to panels |
| [types.ts](../components/logo-lab/types.ts) | The element model (`El` union) |
| [constants.ts](../components/logo-lab/constants.ts) | viewBox, export sizes, `uid`, element factory |
| **`canvas/`** | |
| [canvas/logo-canvas.tsx](../components/logo-lab/canvas/logo-canvas.tsx) | The SVG stage + selection/rotate overlay |
| [canvas/element-shape.tsx](../components/logo-lab/canvas/element-shape.tsx) | Renders one element (circle/rect/text/icon/image/path) |
| [canvas/geometry.ts](../components/logo-lab/canvas/geometry.ts) | Bounding-box math for the selection outline |
| **`hooks/`** | |
| [hooks/use-logo-editor.ts](../components/logo-lab/hooks/use-logo-editor.ts) | **State + all mutations** (elements, selection, drag, rotate, templates, palettes) |
| [hooks/use-history.ts](../components/logo-lab/hooks/use-history.ts) | Undo/redo with gesture coalescing |
| [hooks/use-logo-export.ts](../components/logo-lab/hooks/use-logo-export.ts) | SVG serialize + PNG rasterize |
| [hooks/use-editor-shortcuts.ts](../components/logo-lab/hooks/use-editor-shortcuts.ts) | Keyboard layer |
| **`panels/`** | |
| [panels/editor-toolbar.tsx](../components/logo-lab/panels/editor-toolbar.tsx) | Top bar: breadcrumb, templates, history, Download |
| [panels/layers-panel.tsx](../components/logo-lab/panels/layers-panel.tsx) | Add-element buttons + layer stack |
| [panels/properties-panel.tsx](../components/logo-lab/panels/properties-panel.tsx) | Palette presets + per-element property controls |
| [panels/template-picker.tsx](../components/logo-lab/panels/template-picker.tsx) | Starter-layout sheet with live previews |
| [panels/icon-picker.tsx](../components/logo-lab/panels/icon-picker.tsx) | Icon grid (used for both insert and swap) |
| [panels/palette-picker.tsx](../components/logo-lab/panels/palette-picker.tsx) | One-click whole-logo recolor |
| [panels/export-menu.tsx](../components/logo-lab/panels/export-menu.tsx) | Download dropdown (SVG / PNG sizes) |
| [panels/image-drop.tsx](../components/logo-lab/panels/image-drop.tsx) | Upload / drag-drop target (v2) |
| [panels/trace-control.tsx](../components/logo-lab/panels/trace-control.tsx) | Trace-to-vector action (v3) |
| [panels/color-control.tsx](../components/logo-lab/panels/color-control.tsx) · [number-slider.tsx](../components/logo-lab/panels/number-slider.tsx) | Shared inputs |
| **`lib/`** | Async pipelines, no React |
| [lib/import-image.ts](../components/logo-lab/lib/import-image.ts) | The only doorway for raster images: downscale + data-URI encode |
| [lib/trace-image.ts](../components/logo-lab/lib/trace-image.ts) | Raster to vector tracing |
| **`data/`** | Static content, no logic |
| [data/icons.ts](../components/logo-lab/data/icons.ts) | The 13-glyph icon library |
| [data/templates.ts](../components/logo-lab/data/templates.ts) | 7 starter layouts + the default canvas |
| [data/palettes.ts](../components/logo-lab/data/palettes.ts) | Quick swatches + 7 palette presets |
| [data/fonts.ts](../components/logo-lab/data/fonts.ts) | 9 font stacks |

### Architecture principles

**Logic lives in hooks; components stay presentational.** `useLogoEditor` owns the entire
editor state and every action; the panels and canvas just read `state` and call actions.
This is deliberate: it's what makes each version below a small, additive change rather
than a rewrite.

**Data is separate from behavior.** Icons, templates, palettes and fonts are plain arrays
in `data/`. Adding a glyph or a layout is a data edit, not a code change.

**Dependencies for solved problems, hand-rolled for the domain.** The canvas model,
element math, history and export are written out by choice, since they are the
interesting part of the project. Accessibility primitives, colour pickers, resampling and tracing are bought
in: reimplementing them teaches nothing and does it worse. See "Dependency audit" below
for what was swapped and, more usefully, what was left alone.

---

## v0: Scratch editor **(built)**

- **Elements:** circle, rectangle (with corner radius), text (content / size / weight /
  font family), and a cursor path.
- **Canvas:** SVG stage with a `0..400` viewBox; drag to move; click-to-select; a solid or
  **transparent** background (transparent exports a real alpha channel).
- **Rotation:** on-canvas rotate handle (drag the dot above a selected element) **plus** a
  Rotate slider. Live angle readout while dragging; hold **Shift** to snap to 15°.
- **Color:** native picker + hex field + brand swatches, per element and for the canvas
  background.
- **Layers:** reorderable stack with per-layer visibility toggle; duplicate; delete.
- **History:** undo/redo with **gesture coalescing**, so a whole drag or slider sweep
  collapses into one undo step.
- **Keyboard:** ⌘/Ctrl+Z / ⌘⇧Z / Ctrl+Y (undo/redo), ⌘D (duplicate), Delete/Backspace
  (remove), Esc (deselect).
- **Export:** one **Download** menu: SVG (vector) and PNG at 256 / 512 / 1024 / 2000 px.

---

## v1: Templates & presets **(built)**

Make a blank canvas feel like a head start. Four content features shipped; two
interaction features were deferred (see below).

### Starter layouts

Seven presets in a sheet off the toolbar: `avid`, `badge`, `monogram`, `wordmark`,
`stack` (icon above a wordmark), `lockup` (icon beside the name), and `ring`. Picking one
replaces the canvas, sets the background it was designed against, and clears history.

Two implementation notes worth keeping:

- **`els` is a factory, not a constant.** Every element needs a fresh `uid`, and returning
  a shared array would hand the editor the template's own objects to mutate.
- **Thumbnails render through the real `ElementShape`.** A preview therefore cannot drift
  from what loading the template actually produces.

Coordinates are hand-placed in the 400 viewBox rather than computed, so each layout reads
as "here is where things go" rather than a layout engine.

### Icon library

13 glyphs: cursor, star, sparkle, bolt, heart, droplet, hexagon, triangle, diamond, play,
plus, arrow, ring.

This required a **model change**. `cursor` was its own element type with a hardcoded path,
which doesn't extend to a library, so it was generalized into an `icon` type:

```ts
export interface IconEl extends BaseEl {
  type: "icon";
  icon: IconId;   // a key into ICONS, not the path itself
  scale: number;
}
```

Elements store an icon **id** and the path is looked up at render, so geometry lives in
one place and a stored logo stays small. The old cursor is now just `ICONS.cursor`, and
because nothing persists to storage there was no migration to write.

Every icon is a **fill-only path**. Strokes were avoided deliberately: a filled path
scales without the hairline-thinning a stroke suffers, and it rasterizes and traces
cleanly (which matters for v3). The `ring` carries `fillRule: "evenodd"` because winding
alone won't cut its hole.

The same `IconPicker` component serves two jobs: inserting a new icon from the left rail,
and swapping the glyph on an already-placed icon from the properties panel (keeping its
position, color and scale).

### Font picker

Nine stacks, previewed in their own face inside the `<select>`.

**These are all locally installed stacks on purpose.** PNG export rasterizes the SVG
through an `<img>`, and that pass will not fetch a webfont. A Google Font would preview
correctly on canvas and then silently fall back in the downloaded file. Anything added to
`data/fonts.ts` must resolve without a network request.

> This is a deliberate deviation from the original v1 plan, which called for bundling
> open-source families and converting text to outlines on export via `opentype.js`.
> Outline conversion is the real fix and is the only thing that makes custom fonts safe
> here; it's deferred rather than dropped. See "Deferred" below.

### Palette presets

Seven palettes (Avid, Midnight, Ocean, Forest, Ember, Rose, Paper), each carrying a
background plus an ordered color list.

Applying a palette maps each **distinct** fill currently on the canvas to the next palette
color in order. That's the key detail: a two-tone logo keeps its figure/ground split
instead of collapsing into one flat color. A transparent canvas is left transparent, since
that's a deliberate choice and not something a recolor should undo.

### Also in this pass

- **Folder restructure.** `components/logo-lab/` went from 18 flat files to `canvas/`,
  `panels/`, `hooks/` and `data/`, with the entry point kept at its original path so no
  `app/` import changed.
- **Breadcrumbs.** The editor uses the shadcn breadcrumb, rooted at Home. Its terminal
  crumb *is* the `<h1>`, so the page keeps a heading.
- **Lint debt paid.** `use-logo-editor.ts` was missing `setEls` from every `useCallback`
  dependency array (6 React Compiler errors + 6 warnings, pre-existing on `HEAD`). Fixed
  across the file.
- **Default canvas retraced.** The seed layout was re-measured against
  `public/avid-tech.png`: type was ~35% too small relative to the circle, the two words
  weren't flush-left, and the cursor pointed the wrong way (rotation 200° → 72°).

### Deferred from v1

These were in the original v1 plan and are **not** built. They're interaction work rather
than content, and each is self-contained enough to land separately:

- **Alignment & snapping.** Center guides, snap-to-edge, distribute, arrow-key nudge.
  Extends the pointer/gesture code in `useLogoEditor`.
- **Group / multi-select.** Select and transform several elements at once. This one is the
  larger change, since `selectedId: string | null` becomes a set and every action that
  takes an `id` needs a multi-target form.
- **Icon search.** 13 glyphs fit in a grid; a search field only earns its place once the
  library is a few times larger.
- **Text-to-outline export** (`opentype.js`), which is what would let the font picker
  offer non-system families safely.

---

## Dependency audit (retrofit into v0 and v1)

v0 and v1 shipped with zero editor dependencies. Once v2 broke that seal, the parts of the
existing editor that were hand-rolled *by default* rather than *by decision* were revisited.
Three were swapped.

| Component | Was | Now | Why it was worth it |
| --- | --- | --- | --- |
| [panels/export-menu.tsx](../components/logo-lab/panels/export-menu.tsx) | Hand-rolled popover | shadcn `DropdownMenu` (Radix) | The old one tracked outside-click and Escape by hand but had **no roving focus, no arrow-key navigation, no focus restore**. Usable with a mouse, awkward from a keyboard. Deleted ~25 lines of effect plumbing. |
| [panels/number-slider.tsx](../components/logo-lab/panels/number-slider.tsx) | `<input type="range">` | shadcn `Slider` (Radix) | The native range can't be themed consistently across engines, and this editor is slider-dense enough that it showed. Also gained PageUp/Down and Home/End. |
| [panels/color-control.tsx](../components/logo-lab/panels/color-control.tsx) | `<input type="color">` | `react-colorful` (2.8KB, no deps) | The native control opens the **OS colour dialog, which covers the canvas**. You could not see the logo you were recolouring. For a design tool that is the whole game. |

The colour swap also fixed a latent input bug: the hex field now holds its own draft state,
so a half-typed `#2F` is no longer parsed and pushed upstream mid-keystroke.

### Deliberately left hand-rolled

Worth recording, because "use a library" is not automatically right:

- **[hooks/use-history.ts](../components/logo-lab/hooks/use-history.ts).** Libraries exist
  (`zundo`, `use-undo`), but none of them do the gesture coalescing that makes a drag one
  undo step instead of two hundred. That coalescing *is* the feature; a generic undo stack
  would be a downgrade wearing a dependency.
- **Drag and rotate maths in
  [hooks/use-logo-editor.ts](../components/logo-lab/hooks/use-logo-editor.ts).** Fabric and
  Konva would replace the whole rendering model, not slot into it. Roughly forty lines of
  screen-to-viewBox mapping is not the part that hurts.
- **[canvas/geometry.ts](../components/logo-lab/canvas/geometry.ts).** Estimating a text
  box from character count is crude, but it only feeds a dashed selection outline. Exact
  glyph metrics would cost a font-parsing dependency to make a dotted rectangle 3px more
  accurate.

### Housekeeping spotted during the audit

- **`react-hot-toast` is installed and completely unused.** `sonner` is the actual
  convention (see `components/ContactForm.tsx`) and its `<Toaster />` is already mounted in
  `app/layout.tsx`. The dead dependency should be removed.
- The Lab's own errors (upload, trace) stay **inline next to their control** rather than
  becoming toasts. A toast is the wrong surface for an error about the thing you are
  looking at.

## The version roadmap

Each pass is usable on its own and de-risks the next. Ship in order; don't build the
tracer until people already love the editor.

### v2: Image import **(in progress: 2.0 built)**

Deliver the second half of the thesis: bring an image, tweak it into a logo. Unlike v0 and
v1, this pass **leans on dependencies** rather than hand-rolling. Background removal and
high-quality resampling are solved problems with maintained libraries, and reimplementing
them would be work that teaches nothing and does it worse.

#### The constraint that shapes everything

**Imported images must be stored as `data:` URIs. Never `blob:`, never remote.**

[use-logo-export.ts](../components/logo-lab/hooks/use-logo-export.ts) serializes the live
SVG and rasterizes it through `new Image()` → `drawImage` → `toBlob`. Three things follow:

1. An SVG loaded as an `<img>` runs in **secure static mode** and will not fetch external
   resources. A `blob:` or `https:` image inside it renders blank in the exported PNG.
2. A remote URL additionally **taints the canvas**, so `toBlob` throws outright.
3. A `blob:` URL is dead once the tab closes, so a downloaded `.svg` referencing one ships
   broken even though it looked fine in the editor.

Data URIs avoid all three. Everything in the import pipeline exists to honor that rule.

> **Verify this first.** Before building on it, hand-write an SVG with an embedded
> data-URI `<image>`, push it through `exportPng`, and confirm the PNG isn't blank. The
> reasoning is sound but the whole slice rests on it, and the check costs ten lines.

#### Model change

```ts
export interface ImageEl extends BaseEl {
  type: "image";
  src: string;      // data: URI, always
  w: number; h: number;
  natural: number;  // source aspect ratio, to resist distortion on resize
}
```

Touches the same seam the `icon` change did: [types.ts](../components/logo-lab/types.ts),
[constants.ts](../components/logo-lab/constants.ts),
[canvas/element-shape.tsx](../components/logo-lab/canvas/element-shape.tsx) (renders
`<image>`), [canvas/geometry.ts](../components/logo-lab/canvas/geometry.ts) (trivial, `w`
and `h` are the box), plus a new `addImage` action. `createEl` can't build one without a
file, so upload gets its own action rather than joining `ADD_BUTTONS`.

**Downscale to ~2048px on import** before encoding. A 4MB phone photo becomes a ~5.3MB
base64 string otherwise. History snapshots share the string by reference so undo doesn't
duplicate it, but the cap keeps a careless paste from bloating memory. 2048 is generous
enough that a 2000px PNG export never upscales visibly.

#### Slices

Each is independently shippable.

| Slice | Lands | Dependency | Status |
| --- | --- | --- | --- |
| **2.0 Place** | Upload, drag-drop, downscale, encode, move/resize/rotate, correct SVG + PNG export | `react-dropzone`, `pica` | **Built** |
| **2.1 Cut out** | Background removal | `@imgly/background-removal` | Planned, **high risk** |
| **2.2 Recolor** | Tint / duotone | none (SVG filters) | Planned |

#### 2.0 Place **(built)**

Uses [`react-dropzone`](https://www.npmjs.com/package/react-dropzone) for the drop zone and
file validation, and [`pica`](https://www.npmjs.com/package/pica) for the downscale. Pica
resamples with **Lanczos**. A naive `drawImage` downscale aliases badly at these ratios.

**The data-URI constraint was verified in headless Chrome, and the real failure is worse
than predicted.** A `blob:` URL does not throw and does not taint the canvas. It renders
Chrome's **broken-image icon** into the exported PNG, so a corrupt file downloads while the
editor still looks correct. A second spike then pushed `ElementShape`'s exact markup
through the real `buildSvgString` clone-and-serialize path at rotation 0 and 37, confirming
`href` survives `XMLSerializer`, the `.svg` download carries embedded bytes rather than a
dead reference, and the `data-overlay` selection UI still strips.

[lib/import-image.ts](../components/logo-lab/lib/import-image.ts) is the single doorway.
Two decisions live there:

- **Under 2048px the original file bytes are kept** via `FileReader` rather than
  re-encoded. Round-tripping a 300KB JPEG through a canvas as PNG can exceed 3MB. Only
  oversized images are resampled.
- **Re-encode format follows alpha.** PNG/WebP/GIF become PNG so transparency survives
  (2.1 depends on that); JPEG stays JPEG at quality 0.92.

Two bugs surfaced while building it, both worth remembering:

- **`applyPalette` would have corrupted colors.** `BaseEl` requires `fill`, but an image
  never renders one. Its placeholder was consuming a palette slot and shifting every real
  color by one. Images are now skipped on both passes of the recolor.
- **`createEl` could no longer be exhaustive.** Adding `"image"` to `ElementType` broke the
  factory, because an image cannot exist without a file. Rather than a throwing default
  case, there is now `CreatableType = Exclude<ElementType, "image">`, so attempting it is a
  compile error.

Smaller details: image layers show a **thumbnail** in the rail instead of a meaningless
color chip; the properties panel hides the color control for images and offers a single
**Size** slider that drives the longest edge and derives the other from source aspect, so
an image cannot be stretched by accident.

**Not done in 2.0:** drop works on the left rail only, not the whole canvas. The UI itself
(dropzone, busy state, Size slider) has not been exercised in a browser; only the export
mechanism was verified.

**2.1** uses [`@imgly/background-removal`](https://www.npmjs.com/package/@imgly/background-removal),
which runs ONNX models in-browser via WASM.

> **This is the slice that can hurt.** The model weights are tens of megabytes. It must sit
> behind `await import()` triggered by the button, never a top-level import, or `/lab`'s
> first load regresses for everyone who never touches the feature. Decide early whether
> weights are self-hosted under `public/` or pulled from the vendor CDN: that is a privacy
> and offline-behavior call, not only a performance one. Budget UI for a progress state,
> because first use will not feel instant.

**2.2** should use SVG filters (`<feColorMatrix>`), **not** baked pixels. Filters are
non-destructive, stay adjustable after the fact, and serialize into the SVG export
natively so the rasterizer applies them for free. Baking a tint into a new data URI would
be simpler to reason about but discards the original and grows every history entry.

#### Follow-up this creates

Adding dependencies contradicted the "no dependencies" framing. The public copy that said
so lived in the Field Guide, which has since been deleted, so the only remaining statement
of it is the Toolchain reference below, now corrected.

### v3: Vectorize **(in progress: 3.0 built)**

The hardest and highest-value pass: turn pixels into editable vectors. This is the payoff
for everything before it. Once a mark is paths, SVG export stops being "a raster in a
vector wrapper" and becomes a real scalable logo.

#### Correction: potrace is the wrong recommendation

This doc previously named **potrace** for tracing (as did the deleted Field Guide).
Checked against npm, that is wrong twice over for an in-browser tool:

| Package | Browser? | License | Last release |
| --- | --- | --- | --- |
| `potrace` | **No.** Node-only (fs, jimp) | **GPL-2.0** | 2022 |
| `esm-potrace-wasm` | Yes, ESM + WASM | **GPL-2.0** | Jul 2026 |
| `@neplex/vectorizer` | **No.** Node napi (Rust) | MIT | May 2026 |
| `imagetracerjs` | Yes, pure JS | **Unlicense** | 2022 |

Two problems with the current recommendation:

1. **The `potrace` npm package cannot run in a browser at all.** It shells through Node
   APIs. Recommending it for a browser tool is a dead end for anyone who tries it.
2. **Potrace is GPL-2.0, and so is every WASM port of it**, because the license follows the
   original C source. Shipping it in this site's bundle raises a copyleft question about
   the site's own source. That is a licensing decision, not a technical one, and it should
   be made deliberately rather than discovered after the code is written.

**Recommendation: `imagetracerjs`.** It is Unlicense (public domain, zero obligations),
runs in the browser, and traces in **color** rather than bilevel, which is what a logo
needs. The cost is that it has not been released since 2022. It is a single self-contained
file doing pure computation, so the staleness is a low risk, but vendoring it is a
reasonable hedge.

Take `esm-potrace-wasm` instead only if output quality proves insufficient **and** GPL is
acceptable for this repo. Its `extractcolors` + `posterizelevel` options map neatly onto
the quantize-then-trace pipeline described below, and it is what
[SVGcode](https://svgco.de/) is built on, so quality is proven.

#### Model change

Tracing needs a general vector path element. `IconEl` is close but points at a library id;
a traced path carries arbitrary geometry.

```ts
export interface PathEl extends BaseEl {
  type: "path";
  d: string;          // path data, in the coordinate space it was traced in
  boxW: number;       // that space, so it can be centered and scaled like IconEl
  boxH: number;
  scale: number;
}
```

This reuses the exact centering trick `IconEl` already uses (`translate(-boxW/2,
-boxH/2)` inside a scaled group), so selection, rotation, drag and export need no new
concepts. Traced paths inherit the whole editor for free, which was the point of keeping
elements uniform.

#### The three decisions that make or break it

**One element per color, not per region.** A trace of even a simple mark emits hundreds of
subpaths. Merging all subpaths of the same color into a single `d` gives a handful of
layers instead of a scrolling wall of them, and it matches how a designer thinks about a
logo: N color layers. This is the single biggest usability lever in the slice.

**Trace at reduced resolution.** Vector quality follows shape clarity, not pixel count.
Downscaling to roughly 600px before tracing is typically indistinguishable in output and
is an order of magnitude faster. The 2048px import cap exists for export fidelity, not for
the tracer.

**Do not block the main thread.** `imagetracerjs` is synchronous and will freeze the tab on
a large bitmap. Either move it into a Web Worker or downscale hard and show a progress
state. Given the editor is drag-driven, a frozen canvas reads as a crash.

#### Slices

| Slice | Lands | Status |
| --- | --- | --- |
| **3.0 Trace** | "Trace" action on a selected image, color-count control, image → N `PathEl` layers | **Built** |
| **3.1 Cleanup** | Delete stray paths, merge layers, simplify | Planned |
| **3.2 Retrace** | Adjust settings and re-run against the retained source | Planned |

#### 3.0 Trace **(built)**

Verified end to end by tracing a synthetic three-colour mark and rebuilding it through
`ElementShape`'s real `path` markup:

```
traced 3 layers: #111111 #FFFFFF #2E7F78
svg contains data: URI? no — pure vector
svg bytes: 1232
disc [46,127,120] teal? true   bar [255,255,255] white? true   bg [17,17,17] black? true
```

**1,232 bytes of pure geometry, no `data:` URI.** That is the whole point of v3: before
tracing, a logo exports as a raster in a vector wrapper; after, it is a real scalable SVG.
Colours land within one unit of the source, which is quantization, not a defect.

Two things probing the library changed versus the plan:

- **"One element per colour" came free.** The plan called merging subpaths "the single
  biggest usability lever" and budgeted code for it. `imagetracerjs` already emits one path
  per colour containing many subpaths, so a trace yields a handful of layers with no
  merging logic at all.
- **The tracer emits a matching 1px stroke on every path**, which reading the docs would
  not have revealed. It exists to close hairline seams between adjacent colour regions.
  `PathEl` reproduces it (`stroke={el.fill} strokeWidth={1}`); dropping it shows a thin
  line of canvas at every colour boundary.

Also as planned: the source image is **hidden rather than deleted**, hide-and-add happen in
one `setEls` call so a trace is **one undo step**, tracing runs at 600px rather than the
2048px import, and `imagetracerjs` sits behind `await import()` so nobody loading `/lab`
pays for it until they trace.

**Known gaps in 3.0:** tracing still runs on the **main thread**. The 600px cap and a busy
state mitigate it, but a complex image at 16 colours may stutter, and the Web Worker in the
plan remains the real fix. Because 2.1 was skipped, tracing an image that still has a
background produces a full-bleed background layer (deletable, and arguably useful). The
trace *pipeline* is verified; the button and slider have not been exercised in a browser.

**Keep the source image, hidden, rather than deleting it.** Tracing is a settings-driven
guess and the first result is rarely the keeper. Retaining the original as a hidden layer
makes 3.2 nearly free and makes 3.0 non-destructive. The whole trace, hide the image, add N
paths, should be **one** history entry.

**Scope tight at first:** clean, high-contrast images trace beautifully; busy photos do
not. Embrace that constraint rather than fighting it, and say so in the UI so a bad result
on a photo reads as expected rather than broken.

### Beyond v3 (optional directions)

- **Persistence** save the canvas to `localStorage`, then to accounts/projects. Note that
  the `icon` model change was free precisely *because* nothing persists yet; once it does,
  element-model changes need migrations.
- **Favicon set export** the tool is pitched at favicons, but export is still generic
  square PNGs. A one-click `favicon.ico` + `apple-touch-icon` + manifest set is a small,
  high-value addition.
- **Brand kits** save palettes, fonts, and logo variants together.
- **Sharing** shareable links or an embeddable read-only viewer.
- **Collaboration / history timeline** the coalesced history stack is already a good base
  for a visual undo timeline.

---

## Toolchain reference (when to reach for a dependency)

v0 and v1 intentionally used **none** of these. v2 begins adding them (`react-dropzone`,
`pica`), so the "no dependencies" framing now applies only to the v0/v1 core.

| Need | Reach for |
| --- | --- |
| Full canvas editor (snapping, transform handles, multi-select) | **Fabric.js** or **Konva.js** (`react-konva`) |
| Raster → vector tracing (browser) | **imagetracerjs** (Unlicense). `potrace` is Node-only and GPL-2.0; see v3 |
| Text → editable vector paths | **opentype.js** |
| Server-side resize / composite | **Sharp** |
| Background removal | **@imgly/background-removal** or a `rembg` service |
| SVG → PNG at any size (server) | **resvg** |

---

## Design & theme notes

The Lab uses the site's theme tokens, so it follows light/dark automatically.

- **Primary = Avid Tech teal** (`--primary`), used for buttons, focus rings, and the brand
  mark.
- **Brand palette baked into the theme** as Tailwind utilities: `teal`, `dusty-blue`,
  `slate`, `sage` (see [app/globals.css](../app/globals.css)). `dusty-blue` replaced the
  site's former hardcoded blue accent.
- Selection/rotate UI uses a fixed blue (`#3b82f6`) as a conventional editor accent,
  independent of theme, and is stripped from exports via the `data-overlay` marker.
- Palette preset backgrounds are **not** theme tokens. They're literal hex values baked
  into the exported artwork, which is correct: a logo's background travels with the file
  and shouldn't shift with the viewer's theme.

---

## Verifying changes to templates or icons

Layout data is easy to get subtly wrong and tedious to check by clicking. Both times the
seed geometry was edited, a rendering pass caught an error that reading the numbers had
missed (most recently a cursor tip landing 14 units short, because rotating a path moves
its visual center away from the bounding-box center you'd compute).

The fast loop: import `data/templates.ts` and `data/icons.ts` in a throwaway `tsx` script,
emit one SVG contact sheet of every layout and glyph, rasterize it with the `sharp`
already in `node_modules`, and look at it. Note that such a script renders with whatever
fonts the OS gives Node, which is **not** the browser's `system-ui`, so treat text metrics
as approximate and confirm tight layouts in the real editor.
