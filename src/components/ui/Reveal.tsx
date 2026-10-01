import type { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

/**
 * Scroll-driven fade-up done purely in CSS (see `.reveal` in globals.css).
 * Content is always visible without JavaScript; browsers without
 * scroll-timeline support simply show it without animation.
 */
export function Reveal({ children, delay = 0, className = "" }: Props) {
  const style = delay ? ({ "--reveal-delay": `${delay * 100}%` } as CSSProperties) : undefined;
  return (
    <div className={`reveal ${className}`} style={style}>
      {children}
    </div>
  );
}
