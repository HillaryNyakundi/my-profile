import type { El } from "../types";
import { ICONS } from "../data/icons";

/**
 * ElementShape: renders a single vector element.
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

    case "image":
      return (
        <image
          transform={transform}
          href={el.src}
          x={-el.w / 2}
          y={-el.h / 2}
          width={el.w}
          height={el.h}
          // The box is kept at the source aspect, so "none" is lossless here and
          // keeps the drawn pixels exactly equal to the selection box.
          preserveAspectRatio="none"
        />
      );

    case "path":
      return (
        <g transform={`${transform} scale(${el.scale})`}>
          <path
            transform={`translate(${-el.boxW / 2} ${-el.boxH / 2})`}
            d={el.d}
            fill={el.fill}
            // The tracer emits a matching 1px stroke so adjacent colour regions
            // butt together. Without it every seam shows a hairline of canvas.
            stroke={el.fill}
            strokeWidth={1}
          />
        </g>
      );

    case "icon": {
      const def = ICONS[el.icon];
      return (
        <g transform={`${transform} scale(${el.scale})`}>
          {/* nudge the path so its own box is centered on the origin */}
          <path
            transform={`translate(${-def.w / 2} ${-def.h / 2})`}
            d={def.path}
            fill={el.fill}
            fillRule={"fillRule" in def ? def.fillRule : undefined}
          />
        </g>
      );
    }
  }
}
