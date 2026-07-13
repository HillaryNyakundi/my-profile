"use client";

import { useCallback, useRef, useState } from "react";
import type { El, ElementType } from "./types";
import { VIEWBOX, createEl, seed, uid } from "./constants";
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
    []
  );

  const addEl = useCallback((type: ElementType) => {
    const el = createEl(type);
    setEls((cur) => [...cur, el]);
    setSelectedId(el.id);
  }, []);

  const duplicate = useCallback(
    (id: string) => {
      const el = els.find((e) => e.id === id);
      if (!el) return;
      const copy = { ...el, id: uid(), x: el.x + 20, y: el.y + 20 } as El;
      setEls((cur) => [...cur, copy]);
      setSelectedId(copy.id);
    },
    [els]
  );

  const remove = useCallback((id: string) => {
    setEls((cur) => cur.filter((e) => e.id !== id));
    setSelectedId((cur) => (cur === id ? null : cur));
  }, []);

  const toggleVisible = useCallback(
    (id: string) => setEls((cur) => cur.map((e) => (e.id === id ? { ...e, visible: !e.visible } : e))),
    []
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
    []
  );

  const reset = useCallback(() => {
    replace(seed());
    setSelectedId(null);
  }, [replace]);

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
    duplicate,
    remove,
    toggleVisible,
    reorder,
    reset,
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
