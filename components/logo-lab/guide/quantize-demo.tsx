"use client";

import { useEffect, useRef, useState } from "react";
import { DemoSlider } from "./demo-stage";

const W = 220;
const H = 96;

/**
 * Color quantization: a smooth gradient scene posterized to N levels per
 * channel. Fewer levels → the clean, flat palette a logo needs. This is the
 * step that turns a busy photo into something traceable.
 */
export function QuantizeDemo() {
  const [levels, setLevels] = useState(32);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const baseRef = useRef<ImageData | null>(null);

  // Build the source gradient once.
  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const base = ctx.createImageData(W, H);
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const i = (y * W + x) * 4;
        base.data[i] = 40 + (x / W) * 200;
        base.data[i + 1] = 120 + Math.sin(x / 32) * 60;
        base.data[i + 2] = 60 + (y / H) * 180;
        base.data[i + 3] = 255;
      }
    }
    baseRef.current = base;
  }, []);

  // Re-posterize whenever the level count changes.
  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    const base = baseRef.current;
    if (!ctx || !base) return;
    const step = 255 / (levels - 1);
    const out = ctx.createImageData(W, H);
    for (let k = 0; k < base.data.length; k += 4) {
      out.data[k] = Math.round(base.data[k] / step) * step;
      out.data[k + 1] = Math.round(base.data[k + 1] / step) * step;
      out.data[k + 2] = Math.round(base.data[k + 2] / step) * step;
      out.data[k + 3] = 255;
    }
    ctx.putImageData(out, 0, 0);
  }, [levels]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        className="h-24 w-full rounded-md border border-border"
        aria-label="Gradient posterized to a limited palette"
      />
      <DemoSlider label="colors" value={levels} min={2} max={32} onChange={setLevels} readout={String(levels)} />
    </div>
  );
}
