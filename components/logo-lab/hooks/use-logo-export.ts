"use client";

import { useCallback, type RefObject } from "react";
import { VIEWBOX } from "../constants";

function downloadBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * useLogoExport — turns the live SVG canvas into downloadable files.
 *
 *  • exportSvg → serializes the VECTOR canvas as-is (scales forever, editable).
 *  • exportPng → RASTERIZES it: the SVG is drawn onto a <canvas> at a chosen
 *    resolution, producing a fixed grid of pixels. A transparent background
 *    survives because a <canvas> starts fully transparent (alpha channel intact).
 */
export function useLogoExport(svgRef: RefObject<SVGSVGElement | null>) {
  /** Clean, standalone SVG string — UI overlays (e.g. the selection box) stripped. */
  const buildSvgString = useCallback(() => {
    const live = svgRef.current;
    if (!live) return "";
    const node = live.cloneNode(true) as SVGSVGElement;
    node.querySelectorAll("[data-overlay]").forEach((n) => n.remove());
    node.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    node.setAttribute("width", String(VIEWBOX));
    node.setAttribute("height", String(VIEWBOX));
    return new XMLSerializer().serializeToString(node);
  }, [svgRef]);

  const exportSvg = useCallback(() => {
    const str = buildSvgString();
    if (!str) return;
    downloadBlob(new Blob([str], { type: "image/svg+xml" }), "logo.svg");
  }, [buildSvgString]);

  const exportPng = useCallback(
    (size: number) => {
      const str = buildSvgString();
      if (!str) return;
      const url = URL.createObjectURL(new Blob([str], { type: "image/svg+xml" }));
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        if (ctx) ctx.drawImage(img, 0, 0, size, size);
        URL.revokeObjectURL(url);
        canvas.toBlob((blob) => blob && downloadBlob(blob, `logo-${size}.png`), "image/png");
      };
      img.src = url;
    },
    [buildSvgString]
  );

  return { exportSvg, exportPng, buildSvgString };
}
