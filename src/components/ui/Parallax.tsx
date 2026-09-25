"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Parallax discret basé sur transform (GPU). Désactivé si l'utilisateur
 * a demandé moins d'animations. Un seul rAF par frame, écouteur passif.
 */
export function Parallax({
  speed = 0.2,
  className,
  style,
  children,
  "aria-hidden": ariaHidden,
}: {
  "aria-hidden"?: boolean;
  speed?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      if (y > window.innerHeight * 1.5) return;
      el.style.transform = `translate3d(0, ${(y * speed).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [speed]);

  return (
    <div ref={ref} aria-hidden={ariaHidden} className={className} style={{ willChange: "transform", ...style }}>
      {children}
    </div>
  );
}
