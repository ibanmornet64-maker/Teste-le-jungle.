/**
 * Éléments végétaux décoratifs en SVG (légers, sans image).
 * Tous sont décoratifs : aria-hidden.
 */
import { useId, type CSSProperties } from "react";
import { cn } from "@/lib/format";

/* ---------- Palme (feuille de palmier) générée procéduralement ---------- */
function buildFrond(): string {
  const P0 = { x: 100, y: 400 };
  const P1 = { x: 150, y: 190 };
  const P2 = { x: 95, y: 18 };
  const at = (t: number) => ({
    x: (1 - t) ** 2 * P0.x + 2 * (1 - t) * t * P1.x + t ** 2 * P2.x,
    y: (1 - t) ** 2 * P0.y + 2 * (1 - t) * t * P1.y + t ** 2 * P2.y,
  });
  const tangent = (t: number) => ({
    x: 2 * (1 - t) * (P1.x - P0.x) + 2 * t * (P2.x - P1.x),
    y: 2 * (1 - t) * (P1.y - P0.y) + 2 * t * (P2.y - P1.y),
  });
  const r = (n: number) => Math.round(n * 10) / 10;
  const parts: string[] = [];
  const N = 17;
  for (let i = 2; i <= N; i++) {
    const t = i / (N + 1);
    const p = at(t);
    const tg = tangent(t);
    const base = Math.atan2(tg.y, tg.x);
    const L = 28 + 92 * Math.sin(Math.PI * (0.18 + 0.72 * (1 - t)));
    for (const side of [-1, 1]) {
      const a = base + side * ((62 - 22 * t) * Math.PI) / 180;
      const droop = 14 * (1 - t);
      const e = { x: p.x + L * Math.cos(a), y: p.y + L * Math.sin(a) + droop };
      const w = L * 0.13;
      const mx = (p.x + e.x) / 2;
      const my = (p.y + e.y) / 2;
      const nx = -Math.sin(a) * w;
      const ny = Math.cos(a) * w;
      parts.push(
        `M${r(p.x)} ${r(p.y)}Q${r(mx + nx)} ${r(my + ny)} ${r(e.x)} ${r(e.y)}Q${r(mx - nx)} ${r(my - ny)} ${r(p.x)} ${r(p.y)}Z`,
      );
    }
  }
  return parts.join("");
}
const FROND_PATH = buildFrond();

type DecorProps = { className?: string; style?: CSSProperties };

export function PalmFrond({ className, style }: DecorProps) {
  return (
    <svg
      viewBox="0 0 240 410"
      className={cn("pointer-events-none select-none", className)}
      style={style}
      aria-hidden
      focusable="false"
    >
      <path d="M100 400Q150 190 95 18" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <path d={FROND_PATH} fill="currentColor" />
    </svg>
  );
}

/* ---------- Monstera (feuille découpée) ---------- */
export function MonsteraLeaf({ className, style }: DecorProps) {
  const id = useId().replace(/:/g, "");
  const slits = [
    [100, 60, 28, 44],
    [100, 82, 16, 78],
    [100, 108, 16, 112],
    [100, 134, 30, 150],
    [100, 60, 172, 44],
    [100, 82, 184, 78],
    [100, 108, 184, 112],
    [100, 134, 170, 150],
  ];
  return (
    <svg
      viewBox="0 0 200 200"
      className={cn("pointer-events-none select-none", className)}
      style={style}
      aria-hidden
      focusable="false"
    >
      <defs>
        <mask id={`m-${id}`}>
          <rect width="200" height="200" fill="#fff" />
          {slits.map(([x1, y1, x2, y2], i) => (
            <path
              key={i}
              d={`M${x1 + (x2 > x1 ? 18 : -18)} ${y1 + 4}Q${(x1 + x2) / 2} ${y1 - 2} ${x2} ${y2}`}
              stroke="#000"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
          ))}
          <ellipse cx="78" cy="96" rx="4" ry="8" fill="#000" transform="rotate(-30 78 96)" />
          <ellipse cx="122" cy="96" rx="4" ry="8" fill="#000" transform="rotate(30 122 96)" />
          <ellipse cx="82" cy="124" rx="3.5" ry="7" fill="#000" transform="rotate(-35 82 124)" />
          <ellipse cx="118" cy="124" rx="3.5" ry="7" fill="#000" transform="rotate(35 118 124)" />
          <path d="M100 188 100 34" stroke="#000" strokeWidth="2.2" />
        </mask>
      </defs>
      <path
        mask={`url(#m-${id})`}
        fill="currentColor"
        d="M100 190C42 172 6 124 14 74 22 26 66 6 100 32 134 6 178 26 186 74 194 124 158 172 100 190Z"
      />
    </svg>
  );
}

/* ---------- Petite feuille simple ---------- */
export function SimpleLeaf({ className, style }: DecorProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("pointer-events-none select-none", className)}
      style={style}
      aria-hidden
      focusable="false"
    >
      <path d="M58 6C30 6 8 20 8 42c0 6 2 11 4 16 23 0 46-15 46-52Z" fill="currentColor" />
      <path d="M12 58c9-14 21-26 38-38" stroke="var(--color-night)" strokeOpacity=".35" strokeWidth="2" fill="none" />
    </svg>
  );
}

/* ---------- Motif « trous de boule de bowling » ---------- */
export function BowlingDots({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-[3px]", className)} aria-hidden>
      <span className="size-1.5 rounded-full bg-current" />
      <span className="size-1.5 rounded-full bg-current -translate-y-1" />
      <span className="size-1.5 rounded-full bg-current" />
    </span>
  );
}

/* ---------- Lignes courbes façon piste de bowling ---------- */
export function LaneLines({ className }: DecorProps) {
  return (
    <svg
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      className={cn("pointer-events-none", className)}
      aria-hidden
      focusable="false"
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M0 ${100 - i * 14}C300 ${40 - i * 8} 900 ${40 - i * 8} 1200 ${100 - i * 14}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity={0.5 - i * 0.08}
        />
      ))}
    </svg>
  );
}

/* ---------- Liane fine ---------- */
export function Vine({ className, style }: DecorProps) {
  return (
    <svg
      viewBox="0 0 60 400"
      className={cn("pointer-events-none select-none", className)}
      style={style}
      aria-hidden
      focusable="false"
    >
      <path d="M30 0C10 60 50 110 30 170S12 280 32 400" stroke="currentColor" strokeWidth="1.6" fill="none" />
      {[50, 120, 190, 260, 330].map((y, i) => (
        <path
          key={y}
          d={i % 2 ? `M30 ${y}c10-10 22-10 26-4-8 8-18 9-26 4Z` : `M30 ${y}c-10-10-22-10-26-4 8 8 18 9 26 4Z`}
          fill="currentColor"
        />
      ))}
    </svg>
  );
}

/* ---------- Halo lumineux (dégradé radial, sans filtre coûteux) ---------- */
export function Glow({
  color,
  className,
  style,
}: DecorProps & { color: "orange" | "gold" | "coral" | "purple" | "leaf" }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute rounded-full", className)}
      style={{
        background: `radial-gradient(circle closest-side, rgb(from var(--color-${color}) r g b / 0.55) 0%, rgb(from var(--color-${color}) r g b / 0.22) 45%, rgb(from var(--color-${color}) r g b / 0) 100%)`,
        ...style,
      }}
    />
  );
}
