import type { El } from "./types";
import { CURSOR_PATH } from "./constants";

/**
 * ElementShape — renders a single vector element.
 *
 * Every shape is drawn centered on its own origin, then positioned with a
 * `transform`: translate to (x, y), then rotate around that center. Keeping the
 * origin at the center makes rotation and the selection box behave predictably.
 */
export function ElementShape({ el }: { el: El }) {
  const transform = `translate(${el.x} ${el.y}) rotate(${el.rotation})`;

  switch (el.type) {
    case "circle":
      return <circle transform={transform} r={el.r} fill={el.fill} />;

    case "rect":
      return (
        <rect
          transform={transform}
          x={-el.w / 2}
          y={-el.h / 2}
          width={el.w}
          height={el.h}
          rx={el.radius}
          fill={el.fill}
        />
      );

    case "text":
      return (
        <text
          transform={transform}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={el.fontSize}
          fontWeight={el.fontWeight}
          fontFamily={el.fontFamily}
          fill={el.fill}
        >
          {el.text}
        </text>
      );

    case "cursor":
      return (
        <g transform={`${transform} scale(${el.scale})`}>
          {/* nudge the path so its box is centered on the origin */}
          <path transform="translate(-9.5 -16)" d={CURSOR_PATH} fill={el.fill} />
        </g>
      );
  }
}
