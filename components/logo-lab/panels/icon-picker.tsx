"use client";

import { ICONS, ICON_IDS, type IconId } from "../data/icons";

/** Grid of library glyphs. Each swatch previews the real path it will insert. */
export function IconPicker({
  onPick,
  activeId,
}: {
  onPick: (id: IconId) => void;
  activeId?: IconId;
}) {
  return (
    <div className="grid grid-cols-5 gap-1">
      {ICON_IDS.map((id) => {
        const def = ICONS[id];
        return (
          <button
            key={id}
            title={def.label}
            aria-label={def.label}
            onClick={() => onPick(id)}
            className={`grid aspect-square place-items-center rounded-md border transition-colors ${
              activeId === id
                ? "border-primary bg-primary/10 text-primary"
                : "border-transparent text-muted-foreground hover:border-border hover:bg-accent hover:text-foreground"
            }`}
          >
            <svg viewBox={`0 0 ${def.w} ${def.h}`} className="size-4">
              <path
                d={def.path}
                fill="currentColor"
                fillRule={"fillRule" in def ? def.fillRule : undefined}
              />
            </svg>
          </button>
        );
      })}
    </div>
  );
}
