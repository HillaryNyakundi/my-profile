"use client";

import { useState } from "react";
import { DemoSlider } from "./demo-stage";

/** A teal chip over a checkerboard — the slider is its alpha (transparency). */
export function AlphaDemo() {
  const [alpha, setAlpha] = useState(100);

  return (
    <div>
      <div
        className="relative h-24 overflow-hidden rounded-md border border-border"
        style={{
          backgroundColor: "var(--card)",
          backgroundImage:
            "conic-gradient(var(--border) 25%, transparent 0 50%, var(--border) 0 75%, transparent 0)",
          backgroundSize: "14px 14px",
        }}
      >
        <div className="absolute inset-0 bg-teal" style={{ opacity: alpha / 100 }} />
      </div>
      <DemoSlider
        label="alpha"
        value={alpha}
        min={0}
        max={100}
        onChange={setAlpha}
        readout={(alpha / 100).toFixed(2)}
      />
    </div>
  );
}
