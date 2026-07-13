import type { ReactNode } from "react";

export type Term = { title: string; body: ReactNode; glyph: ReactNode };

/** Representation — how an image is *stored and defined*. */
export const REPRESENTATION: Term[] = [
  {
    title: "viewBox",
    body: (
      <>
        The SVG&apos;s own <span className="text-teal">coordinate system</span>. Screen pixels map into it, so drawing
        logic is resolution-independent.
      </>
    ),
    glyph: (
      <svg viewBox="0 0 120 96" aria-hidden="true" className="h-full w-full">
        <g style={{ stroke: "var(--border)" }} strokeWidth="1">
          <line x1="20" y1="8" x2="20" y2="88" /><line x1="60" y1="8" x2="60" y2="88" /><line x1="100" y1="8" x2="100" y2="88" />
          <line x1="20" y1="8" x2="100" y2="8" /><line x1="20" y1="48" x2="100" y2="48" /><line x1="20" y1="88" x2="100" y2="88" />
        </g>
        <rect x="20" y="8" width="80" height="80" fill="none" className="stroke-teal" strokeWidth="1.5" strokeDasharray="3 3" />
      </svg>
    ),
  },
  {
    title: "path · d",
    body: (
      <>
        A freeform outline from <span className="text-teal">M</span>ove / <span className="text-teal">L</span>ine /{" "}
        <span className="text-teal">C</span>urve commands. The cursor mark is one path string.
      </>
    ),
    glyph: (
      <svg viewBox="0 0 120 96" aria-hidden="true" className="h-full w-full">
        <path d="M35 20 L35 76 L48 63 L57 82 L65 78 L56 60 L74 60 Z" className="fill-teal" />
      </svg>
    ),
  },
  {
    title: "bézier curve",
    body: (
      <>
        A smooth curve from anchor points and control <span className="text-teal">handles</span> — the C (curve)
        commands inside a path.
      </>
    ),
    glyph: (
      <svg viewBox="0 0 120 96" aria-hidden="true" className="h-full w-full">
        <line x1="24" y1="70" x2="40" y2="26" style={{ stroke: "var(--border)" }} strokeWidth="1.5" />
        <line x1="96" y1="70" x2="80" y2="26" style={{ stroke: "var(--border)" }} strokeWidth="1.5" />
        <path d="M24 70 C40 26 80 26 96 70" fill="none" className="stroke-teal" strokeWidth="2.5" />
        <circle cx="24" cy="70" r="4" className="fill-teal" />
        <circle cx="96" cy="70" r="4" className="fill-teal" />
        <circle cx="40" cy="26" r="3.5" className="fill-amber-500" />
        <circle cx="80" cy="26" r="3.5" className="fill-amber-500" />
      </svg>
    ),
  },
  {
    title: "fill · stroke",
    body: (
      <>
        <span className="text-teal">fill</span> is the interior; <span className="text-teal">stroke</span> is the
        outline. Every shape can have either or both.
      </>
    ),
    glyph: (
      <svg viewBox="0 0 120 96" aria-hidden="true" className="h-full w-full">
        <circle cx="42" cy="48" r="26" className="fill-teal" />
        <circle cx="82" cy="48" r="26" fill="none" className="stroke-amber-500" strokeWidth="5" />
      </svg>
    ),
  },
  {
    title: "bounding box",
    body: (
      <>
        The rectangle enclosing a shape. Drives <span className="text-teal">selection</span>, alignment and centering
        math.
      </>
    ),
    glyph: (
      <svg viewBox="0 0 120 96" aria-hidden="true" className="h-full w-full">
        <circle cx="60" cy="48" r="30" className="fill-teal" />
        <rect x="28" y="16" width="64" height="64" fill="none" className="stroke-amber-500" strokeWidth="1.5" strokeDasharray="4 3" />
      </svg>
    ),
  },
  {
    title: "color model",
    body: (
      <>
        How a color is written — <span className="text-teal">hex</span>, RGB or HSL. HSL (hue-sat-light) is the most
        intuitive base for a color picker.
      </>
    ),
    glyph: (
      <svg viewBox="0 0 120 96" aria-hidden="true" className="h-full w-full">
        <defs>
          <linearGradient id="lab-hue" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ef4444" />
            <stop offset="0.33" stopColor="#22c55e" />
            <stop offset="0.66" stopColor="#3b82f6" />
            <stop offset="1" stopColor="#ef4444" />
          </linearGradient>
        </defs>
        <rect x="20" y="30" width="80" height="12" rx="3" fill="url(#lab-hue)" />
        <circle cx="41" cy="36" r="7" className="fill-teal" stroke="#fff" strokeWidth="2" />
        <text x="60" y="64" textAnchor="middle" className="fill-teal" fontFamily="ui-monospace, monospace" fontSize="12">
          #2F8079
        </text>
      </svg>
    ),
  },
  {
    title: "color space",
    body: (
      <>
        The range of colors a medium can show (sRGB, Display-P3) and how they&apos;re modelled — this site&apos;s theme
        uses <span className="text-teal">oklch</span>.
      </>
    ),
    glyph: (
      <svg viewBox="0 0 120 96" aria-hidden="true" className="h-full w-full">
        <g opacity="0.72">
          <circle cx="52" cy="40" r="19" fill="#ef4444" />
          <circle cx="68" cy="40" r="19" fill="#22c55e" />
          <circle cx="60" cy="56" r="19" fill="#3b82f6" />
        </g>
      </svg>
    ),
  },
  {
    title: "resolution · DPI",
    body: (
      <>
        Pixel density — dots per inch. More pixels means sharper output, and it&apos;s why a small raster looks rough
        when blown up.
      </>
    ),
    glyph: (
      <svg viewBox="0 0 120 96" aria-hidden="true" className="h-full w-full">
        {Array.from({ length: 9 }).map((_, i) => (
          <circle key={`c${i}`} cx={26 + (i % 3) * 14} cy={34 + Math.floor(i / 3) * 14} r={3.6} className="fill-teal" />
        ))}
        {Array.from({ length: 36 }).map((_, i) => (
          <circle key={`f${i}`} cx={72 + (i % 6) * 7} cy={30 + Math.floor(i / 6) * 7} r={1.7} className="fill-teal" />
        ))}
      </svg>
    ),
  },
];

/** Transformation — how an image is *changed*. */
export const TRANSFORMATION: Term[] = [
  {
    title: "compositing",
    body: (
      <>
        Stacking layers with opacity and blend. The recolor <span className="text-teal">was</span> compositing — a
        transparent mark over a new background.
      </>
    ),
    glyph: (
      <svg viewBox="0 0 120 96" aria-hidden="true" className="h-full w-full">
        <rect x="30" y="24" width="46" height="46" rx="8" className="fill-amber-500" />
        <rect x="50" y="34" width="46" height="46" rx="8" className="fill-teal" opacity="0.78" />
      </svg>
    ),
  },
  {
    title: "rasterization",
    body: (
      <>
        The reverse of tracing — flattening vectors into a pixel grid. Every <span className="text-teal">PNG export</span>{" "}
        rasterizes the canvas.
      </>
    ),
    glyph: (
      <svg viewBox="0 0 120 96" aria-hidden="true" className="h-full w-full">
        <circle cx="36" cy="48" r="19" fill="none" className="stroke-teal" strokeWidth="2.5" />
        {(
          [
            [76, 32], [84, 32], [70, 40], [78, 40], [86, 40], [70, 48],
            [78, 48], [86, 48], [70, 56], [78, 56], [86, 56], [78, 64],
          ] as const
        ).map(([x, y], i) => (
          <rect key={i} x={x} y={y} width={8} height={8} className="fill-teal" />
        ))}
      </svg>
    ),
  },
  {
    title: "tracing",
    body: (
      <>
        Turning a raster into <span className="text-teal">vector paths</span> (potrace) — the bridge from a pixel image
        to an editable logo.
      </>
    ),
    glyph: (
      <svg viewBox="0 0 120 96" aria-hidden="true" className="h-full w-full">
        {([[46, 34], [58, 34], [40, 46], [46, 46], [58, 46], [52, 58]] as const).map(([x, y], i) => (
          <rect key={i} x={x} y={y} width={12} height={12} className="fill-muted-foreground/30" />
        ))}
        <path d="M42 34 Q64 30 70 46 Q72 64 52 68 Q34 66 36 48 Q37 36 42 34 Z" fill="none" className="stroke-teal" strokeWidth="2" strokeDasharray="3 3" />
      </svg>
    ),
  },
  {
    title: "anti-aliasing",
    body: (
      <>
        Softening the edge between shape and background with partial pixels, so diagonals don&apos;t look like{" "}
        <span className="text-teal">stairs</span>.
      </>
    ),
    glyph: (
      <svg viewBox="0 0 120 96" aria-hidden="true" className="h-full w-full">
        {([[18, 62], [26, 54], [34, 46], [42, 38], [50, 30]] as const).map(([x, y], i) => (
          <rect key={i} x={x} y={y} width={8} height={8} className="fill-muted-foreground/40" />
        ))}
        <polygon points="70,66 104,30 104,66" className="fill-teal" />
      </svg>
    ),
  },
];
