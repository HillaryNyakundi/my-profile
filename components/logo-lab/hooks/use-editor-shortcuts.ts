"use client";

import { useEffect } from "react";
import type { LogoEditorApi } from "./use-logo-editor";

/** True when the user is typing into a form field — don't hijack those keys. */
function isEditingText(el: EventTarget | null) {
  const node = el as HTMLElement | null;
  if (!node) return false;
  const tag = node.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || node.isContentEditable;
}

/**
 * useEditorShortcuts — keyboard layer for the editor.
 *
 *   ⌘/Ctrl+Z         undo
 *   ⌘/Ctrl+Shift+Z   redo   (Ctrl+Y also works)
 *   ⌘/Ctrl+D         duplicate selected
 *   Delete / Backspace  remove selected
 *   Escape           deselect
 */
export function useEditorShortcuts(editor: LogoEditorApi) {
  const { undo, redo, duplicate, remove, select, selectedId } = editor;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;

      // Undo / redo work regardless of focus.
      if (mod && e.key.toLowerCase() === "z") {
        e.preventDefault();
        e.shiftKey ? redo() : undo();
        return;
      }
      if (mod && e.key.toLowerCase() === "y") {
        e.preventDefault();
        redo();
        return;
      }

      // The rest are canvas gestures — skip them while typing.
      if (isEditingText(e.target)) return;

      if (mod && e.key.toLowerCase() === "d") {
        e.preventDefault();
        if (selectedId) duplicate(selectedId);
        return;
      }
      if (e.key === "Delete" || e.key === "Backspace") {
        if (selectedId) {
          e.preventDefault();
          remove(selectedId);
        }
        return;
      }
      if (e.key === "Escape") select(null);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [undo, redo, duplicate, remove, select, selectedId]);
}
