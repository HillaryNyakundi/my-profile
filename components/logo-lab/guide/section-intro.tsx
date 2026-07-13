import type { ReactNode } from "react";

/** A mono, letter-spaced section label with an optional number. */
export function Eyebrow({ num, children }: { num?: string; children: ReactNode }) {
  return (
    <p className="flex items-baseline gap-3 font-mono text-xs uppercase tracking-[0.18em] text-teal">
      {num && <span className="text-muted-foreground">{num}</span>}
      <span>{children}</span>
    </p>
  );
}

/**
 * The shared header block every section opens with: eyebrow + heading + an
 * optional lede paragraph (passed as children). Keeps the six sections
 * consistent without repeating the wrapper markup.
 */
export function SectionIntro({
  num,
  eyebrow,
  heading,
  children,
}: {
  num?: string;
  eyebrow: string;
  heading: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Eyebrow num={num}>{eyebrow}</Eyebrow>
      <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">{heading}</h2>
      {children}
    </div>
  );
}

/** Common `<section>` wrapper — a top rule and consistent vertical rhythm. */
export function GuideSection({ children }: { children: ReactNode }) {
  return <section className="border-t border-border py-14 sm:py-20">{children}</section>;
}
