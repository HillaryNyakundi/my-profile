import Link from "next/link";
import { Eyebrow } from "./section-intro";

/** Opening hero: the pitch + the Avid Tech mark rendered live as vectors. */
export function HeroSection() {
  return (
    <header className="py-14 sm:py-20">
      <Link href="/lab" className="font-mono text-sm text-muted-foreground transition-colors hover:text-foreground">
        ← Back to the editor
      </Link>
      <div className="mt-8 grid items-center gap-10 md:grid-cols-[1.25fr_1fr]">
        <div className="space-y-5">
          <Eyebrow>Field Guide</Eyebrow>
          <h1 className="text-balance text-4xl font-extrabold leading-[1.03] tracking-tight sm:text-5xl">
            Designing logos in code.
          </h1>
          <p className="text-lg text-muted-foreground">
            Everything the Avid&nbsp;Tech recolor touched — vectors, alpha, compositing, rasterizing — turned into a
            working vocabulary you can build a tool on.
          </p>
          <p className="text-sm text-muted-foreground">
            Read it top to bottom, or poke the live demos. The teal is your real brand color, threaded through the
            whole page.
          </p>
        </div>
        <div className="grid place-items-center">
          <svg viewBox="0 0 400 400" role="img" aria-label="Avid Tech mark" className="w-full max-w-[280px] drop-shadow-2xl">
            <rect width="400" height="400" rx="28" className="fill-card" />
            <circle cx="170" cy="190" r="118" className="fill-teal" />
            <text x="238" y="160" textAnchor="middle" dominantBaseline="central" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="62" fill="#fff">Avid</text>
            <text x="238" y="232" textAnchor="middle" dominantBaseline="central" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="62" fill="#fff">Tech</text>
            <g transform="translate(120 255) rotate(200) scale(2.6)">
              <path transform="translate(-9.5 -16)" d="M0 0 L0 28.5 L6.7 22 L11 31.5 L15 29.7 L10.8 20.5 L19 20.5 Z" fill="#fff" />
            </g>
          </svg>
        </div>
      </div>
    </header>
  );
}
