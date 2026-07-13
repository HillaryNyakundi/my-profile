"use client";

import { useCallback, useRef, useState } from "react";

/**
 * useHistory — undo/redo for a single piece of state.
 *
 * The tricky part is that a drag or a slider fires *hundreds* of updates a
 * second; we don't want one undo step per pixel. So instead of snapshotting on
 * every change, we keep a moving "boundary" (the last committed snapshot) and
 * only push it onto the undo stack after edits go quiet for `coalesceMs`. A
 * whole drag gesture therefore collapses into a single, satisfying undo.
 */
export function useHistory<T>(initial: T | (() => T), coalesceMs = 450) {
  const init = typeof initial === "function" ? (initial as () => T)() : initial;

  const [present, setPresent] = useState<T>(init);
  const presentRef = useRef<T>(init); // always-current value for timer closures
  const boundary = useRef<T>(init); // last snapshot we could undo back to
  const past = useRef<T[]>([]);
  const future = useRef<T[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // canUndo/canRedo drive button disabled state, so they must trigger renders.
  const [flags, setFlags] = useState({ canUndo: false, canRedo: false });
  const syncFlags = useCallback(
    () => setFlags({ canUndo: past.current.length > 0, canRedo: future.current.length > 0 }),
    []
  );

  /** Commit the pending edits as one history entry (if anything changed). */
  const commit = useCallback(() => {
    timer.current = null;
    if (presentRef.current === boundary.current) return;
    past.current.push(boundary.current);
    future.current = []; // a fresh edit invalidates the redo stack
    boundary.current = presentRef.current;
    syncFlags();
  }, [syncFlags]);

  const set = useCallback(
    (updater: T | ((prev: T) => T)) => {
      setPresent((prev) => {
        const next = typeof updater === "function" ? (updater as (p: T) => T)(prev) : updater;
        presentRef.current = next;
        return next;
      });
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(commit, coalesceMs);
    },
    [commit, coalesceMs]
  );

  const undo = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      commit(); // flush any in-flight edit first
    }
    if (past.current.length === 0) return;
    const prev = past.current.pop() as T;
    future.current.push(boundary.current);
    boundary.current = prev;
    presentRef.current = prev;
    setPresent(prev);
    syncFlags();
  }, [commit, syncFlags]);

  const redo = useCallback(() => {
    if (future.current.length === 0) return;
    const next = future.current.pop() as T;
    past.current.push(boundary.current);
    boundary.current = next;
    presentRef.current = next;
    setPresent(next);
    syncFlags();
  }, [syncFlags]);

  /** Replace state and wipe history (e.g. "Reset canvas"). */
  const replace = useCallback(
    (value: T) => {
      if (timer.current) clearTimeout(timer.current);
      past.current = [];
      future.current = [];
      boundary.current = value;
      presentRef.current = value;
      setPresent(value);
      syncFlags();
    },
    [syncFlags]
  );

  return { state: present, set, undo, redo, replace, canUndo: flags.canUndo, canRedo: flags.canRedo };
}
