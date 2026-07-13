"use client";

import { useEffect, useRef, useState } from "react";
import { DemoStage, DemoSlider } from "./demo-stage";

/**
 * The money demo: the same letter as VECTOR (SVG, scaled by transform) and as
 * RASTER (a 64px canvas scaled up with `image-rendering: pixelated`). Drag the
 * zoom — the vector stays crisp, the raster reveals its pixel grid.
 */
export function VectorRasterDemo() {
  const [zoom, setZoom] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, 64, 64);
    ctx.fillStyle = "#2f8079";
    ctx.beginPath();
    ctx.arc(32, 32, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.font = "800 30px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("A", 32, 34);
  }, []);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2">
        <DemoStage label="Vector · SVG" tone="teal">
          <svg viewBox="0 0 100 100" className="h-[70%] w-[70%]" aria-label="Vector letter A, stays crisp">
            <g style={{ transform: `scale(${zoom})`, transformOrigin: "50px 50px" }}>
              <circle cx="50" cy="50" r="34" className="fill-teal" />
              <text
                x="50"
                y="52"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="42"
                fontWeight="800"
                fontFamily="system-ui, sans-serif"
                fill="#fff"
              >
                A
              </text>
            </g>
          </svg>
        </DemoStage>

        <DemoStage label="Raster · PNG" tone="amber">
          <canvas
            ref={canvasRef}
            width={64}
            height={64}
            className="h-[70%] w-[70%] [image-rendering:pixelated]"
            style={{ transform: `scale(${zoom})` }}
            aria-label="Raster letter A, pixelates when enlarged"
          />
        </DemoStage>
      </div>

      <DemoSlider label="zoom" value={zoom} min={1} max={8} step={0.1} onChange={setZoom} readout={`${zoom.toFixed(1)}×`} />
    </div>
  );
}
