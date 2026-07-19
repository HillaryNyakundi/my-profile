"use client";

import { useCallback, useRef, useState } from "react";
import type { CreatableType, El } from "../types";
import { VIEWBOX, createEl, uid } from "../constants";
import { seed, type Template } from "../data/templates";
import type { Palette } from "../data/palettes";
import type { IconId } from "../data/icons";
import type { ImportedImage } from "../lib/import-image";
import type { TraceResult } from "../lib/trace-image";
import { useHistory } from "./use-history";

/**
 * useLogoEditor — owns the entire editor state (elements, selection, background)
 * and every mutation, including pointer-based dragging.
 *
 * The canvas is "controlled" by this hook: components stay presentational and
 * just render `state` + call the returned actions. That separation is the point
 * of the refactor — logic here, pixels in the components.
 */
export function useLogoEditor() {
  // Elements live in a history-tracked store so undo/redo comes for free.
  // Rapid drag/slider updates are coalesced into single undo steps.
  const { state: els, set: setEls, undo, redo, replace, canUndo, canRedo } = useHistory<El[]>(seed);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [bg, setBg] = useState<string>("#000000");
  const [transparent, setTransparent] = useState(false);
  const [isRotating, setIsRotating] = useState(false); // drives the live angle readout

  const svgRef = useRef<SVGSVGElement>(null);
  // A pointer gesture is either moving an element or rotating it around its center.
  const drag = useRef<{ id: string; mode: "move" | "rotate"; dx: number; dy: number } | null>(null);

  const selected = els.find((e) => e.id === selectedId) ?? null;

  /* ---- mutations ---- */

  const update = useCallback(
    (id: string, patch: Partial<El>) =>
      setEls((cur) => cur.map((e) => (e.id === id ? ({ ...e, ...patch } as El) : e))),
    [setEls]
  );

  const addEl = useCallback((type: CreatableType) => {
    const el = createEl(type);
    setEls((cur) => [...cur, el]);
    setSelectedId(el.id);
  }, [setEls]);

  const addIcon = useCallback(
    (icon: IconId) => {
      const el = createEl("icon", icon);
      setEls((cur) => [...cur, el]);
      setSelectedId(el.id);
    },
    [setEls]
  );

  /** Place an already-imported image (see `lib/import-image.ts`). */
  const addImage = useCallback(
    (img: ImportedImage) => {
      const el: El = {
        id: uid(),
        type: "image",
        x: 200,
        y: 200,
        rotation: 0,
        visible: true,
        // Images ignore `fill`, but BaseEl requires one; `applyPalette` skips them.
        fill: "#000000",
        ...img,
      };
      setEls((cur) => [...cur, el]);
      setSelectedId(el.id);
    },
    [setEls]
  );

  /**
   * Replace an image with traced vector paths.
   *
   * The source image is HIDDEN, not deleted: tracing is a settings-driven guess
   * and the first result is rarely the keeper, so keeping the original makes a
   * retrace possible and the whole operation non-destructive. Hiding and adding
   * happen in one `setEls` call so the trace is a single undo step.
   */
  const applyTrace = useCallback(
    (imageId: string, trace: TraceResult) => {
      setEls((cur) => {
        const img = cur.find((e) => e.id === imageId);
        if (!img || img.type !== "image") return cur;

        // Land the paths exactly where the image sat. Both boxes come from the
        // same source, so their aspects match and one scale factor is enough.
        const scale = img.w / trace.boxW;
        const paths: El[] = trace.paths.map((p) => ({
          id: uid(),
          type: "path",
          x: img.x,
          y: img.y,
          rotation: img.rotation,
          visible: true,
          fill: p.fill,
          d: p.d,
          boxW: trace.boxW,
          boxH: trace.boxH,
          scale,
        }));

        return [...cur.map((e) => (e.id === imageId ? { ...e, visible: false } : e)), ...paths];
      });
      setSelectedId(null);
    },
    [setEls]
  );

  const duplicate = useCallback(
    (id: string) => {
      const el = els.find((e) => e.id === id);
      if (!el) return;
      const copy = { ...el, id: uid(), x: el.x + 20, y: el.y + 20 } as El;
      setEls((cur) => [...cur, copy]);
      setSelectedId(copy.id);
    },
    [els, setEls]
  );

  const remove = useCallback((id: string) => {
    setEls((cur) => cur.filter((e) => e.id !== id));
    setSelectedId((cur) => (cur === id ? null : cur));
  }, [setEls]);

  const toggleVisible = useCallback(
    (id: string) => setEls((cur) => cur.map((e) => (e.id === id ? { ...e, visible: !e.visible } : e))),
    [setEls]
  );

  /** Move an element up (+1) or down (-1) in paint order. */
  const reorder = useCallback(
    (id: string, dir: -1 | 1) =>
      setEls((cur) => {
        const i = cur.findIndex((e) => e.id === id);
        const j = i + dir;
        if (i < 0 || j < 0 || j >= cur.length) return cur;
        const next = [...cur];
        [next[i], next[j]] = [next[j], next[i]];
        return next;
      }),
    [setEls]
  );

  const reset = useCallback(() => {
    replace(seed());
    setSelectedId(null);
  }, [replace]);

  /** Swap the whole canvas for a starter layout. Wipes history, like reset. */
  const loadTemplate = useCallback(
    (t: Template) => {
      replace(t.els());
      setBg(t.bg);
      setTransparent(false);
      setSelectedId(null);
    },
    [replace]
  );

  /**
   * Recolor everything at once. Each *distinct* fill on the canvas is mapped to
   * the next palette color in order, so a two-tone logo keeps its figure/ground
   * split instead of collapsing into one flat color.
   */
  const applyPalette = useCallback(
    (p: Palette) => {
      setEls((cur) => {
        // Images have a placeholder `fill` they never render; counting it would
        // burn a palette slot and shift every real color by one.
        const seen: string[] = [];
        for (const el of cur) {
          if (el.type === "image") continue;
          const key = el.fill.toUpperCase();
          if (!seen.includes(key)) seen.push(key);
        }
        const map = new Map(seen.map((f, i) => [f, p.colors[i % p.colors.length]]));
        return cur.map((el) =>
          el.type === "image" ? el : ({ ...el, fill: map.get(el.fill.toUpperCase()) ?? el.fill } as El)
        );
      });
      // A transparent canvas is a deliberate choice; don't undo it with a bg.
      if (!transparent) setBg(p.bg);
    },
    [transparent, setEls]
  );

  /* ---- dragging: map screen pixels into viewBox units ---- */

  const toSvg = useCallback((clientX: number, clientY: number) => {
    const rect = svgRef.current!.getBoundingClientRect();
    return {
      x: ((clientX - rect.left) / rect.width) * VIEWBOX,
      y: ((clientY - rect.top) / rect.height) * VIEWBOX,
    };
  }, []);

  const startDrag = useCallback(
    (e: React.PointerEvent, id: string) => {
      e.stopPropagation();
      setSelectedId(id);
      const el = els.find((x) => x.id === id);
      if (!el) return;
      const p = toSvg(e.clientX, e.clientY);
      drag.current = { id, mode: "move", dx: p.x - el.x, dy: p.y - el.y };
      (e.target as Element).setPointerCapture(e.pointerId);
    },
    [els, toSvg]
  );

  /** Begin a rotation gesture from the on-canvas rotate handle. */
  const startRotate = useCallback((e: React.PointerEvent, id: string) => {
    e.stopPropagation();
    setSelectedId(id);
    setIsRotating(true);
    drag.current = { id, mode: "rotate", dx: 0, dy: 0 };
    (e.target as Element).setPointerCapture(e.pointerId);
  }, []);

  const moveDrag = useCallback(
    (e: React.PointerEvent) => {
      const d = drag.current;
      if (!d) return;
      const p = toSvg(e.clientX, e.clientY);

      if (d.mode === "rotate") {
        // Angle from the element's center to the pointer; handle sits "up" at 0°.
        // Holding Shift snaps to 15° increments.
        setEls((cur) =>
          cur.map((el) => {
            if (el.id !== d.id) return el;
            let deg = Math.round((Math.atan2(p.y - el.y, p.x - el.x) * 180) / Math.PI + 90);
            if (e.shiftKey) deg = Math.round(deg / 15) * 15;
            return { ...el, rotation: (deg + 360) % 360 };
          })
        );
        return;
      }

      update(d.id, { x: Math.round(p.x - d.dx), y: Math.round(p.y - d.dy) });
    },
    [toSvg, update, setEls]
  );

  const endDrag = useCallback(() => {
    drag.current = null;
    setIsRotating(false);
  }, []);

  return {
    // state
    els,
    selected,
    selectedId,
    bg,
    transparent,
    isRotating,
    svgRef,
    // selection + canvas
    select: setSelectedId,
    setBg,
    setTransparent,
    // element actions
    update,
    addEl,
    addIcon,
    addImage,
    applyTrace,
    duplicate,
    remove,
    toggleVisible,
    reorder,
    reset,
    // whole-canvas actions
    loadTemplate,
    applyPalette,
    // history
    undo,
    redo,
    canUndo,
    canRedo,
    // drag handlers
    startDrag,
    startRotate,
    moveDrag,
    endDrag,
  };
}

export type LogoEditorApi = ReturnType<typeof useLogoEditor>;
