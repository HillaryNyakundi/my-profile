"use client";

import { VIEWBOX } from "./constants";
import { bbox } from "./geometry";
import { ElementShape } from "./element-shape";
import type { LogoEditorApi } from "./use-logo-editor";

const CHECKER =
  "repeating-conic-gradient(#e5e5e5 0% 25%, #ffffff 0% 50%) 50% / 20px 20px";

/**
 * LogoCanvas — the SVG stage. Presentational: it reads state from the editor
 * hook and forwards pointer events back to it. The checkerboard is a CSS
 * backdrop only (it is NOT part of the SVG, so it never exports).
 */
export function LogoCanvas({ editor }: { editor: LogoEditorApi }) {
  const { els, selected, bg, transparent, isRotating, svgRef, select, startDrag, startRotate, moveDrag, endDrag } = editor;
  const sel = selected ? bbox(selected) : null;
  const boxTop = selected && sel ? selected.y - sel.h / 2 - 6 : 0;
  const handleY = boxTop - 22;

  return (
    <div
      className="w-full max-w-[560px] aspect-square rounded-lg shadow-sm overflow-hidden ring-1 ring-border"
      style={transparent ? { background: CHECKER } : undefined}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
        className="w-full h-full touch-none select-none"
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerDown={() => select(null)}
      >
        {/* background rect — omitted when transparent so the PNG keeps its alpha */}
        {!transparent && <rect width={VIEWBOX} height={VIEWBOX} fill={bg} />}

        {els.map((el) =>
          el.visible ? (
            <g key={el.id} onPointerDown={(e) => startDrag(e, el.id)} className="cursor-move">
              <ElementShape el={el} />
            </g>
          ) : null
        )}

        {/* selection outline + rotate handle — data-overlay strips it on export */}
        {selected && sel && (
          <g data-overlay>
            <rect
              x={selected.x - sel.w / 2 - 6}
              y={boxTop}
              width={sel.w + 12}
              height={sel.h + 12}
              fill="none"
              stroke="#3b82f6"
              strokeWidth={2}
              strokeDasharray="6 4"
              pointerEvents="none"
            />
            {/* stalk from the box up to the grab handle */}
            <line x1={selected.x} y1={boxTop} x2={selected.x} y2={handleY} stroke="#3b82f6" strokeWidth={1.5} pointerEvents="none" />
            <circle
              cx={selected.x}
              cy={handleY}
              r={7}
              fill="#3b82f6"
              stroke="#fff"
              strokeWidth={1.5}
              style={{ cursor: "grab" }}
              onPointerDown={(e) => startRotate(e, selected.id)}
            />
            {/* live angle readout while rotating */}
            {isRotating && (
              <g pointerEvents="none">
                <rect x={selected.x - 22} y={handleY - 32} width={44} height={18} rx={4} fill="#3b82f6" />
                <text
                  x={selected.x}
                  y={handleY - 22}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#fff"
                  fontSize={11}
                  fontFamily="ui-monospace, monospace"
                >
                  {Math.round(selected.rotation)}°
                </text>
              </g>
            )}
          </g>
        )}
      </svg>
    </div>
  );
}
