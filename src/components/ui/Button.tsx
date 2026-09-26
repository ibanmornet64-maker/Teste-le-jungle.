import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/format";
import { Icon, type IconName } from "./Icon";

type Variant = "primary" | "secondary" | "ghost" | "dark" | "gold";
type Size = "md" | "lg" | "sm";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2.5 rounded-full font-semibold tracking-[0.01em] whitespace-nowrap " +
  "transition-[transform,box-shadow,background-color,color,border-color] duration-300 ease-out " +
  "motion-safe:hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-orange text-night shadow-[0_10px_30px_-10px_var(--color-orange)] hover:shadow-[0_16px_40px_-10px_var(--color-orange)] hover:bg-[color-mix(in_oklab,var(--color-orange)_88%,var(--color-gold))]",
  gold: "bg-gold text-night shadow-[0_10px_30px_-12px_var(--color-gold)] hover:shadow-[0_16px_40px_-12px_var(--color-gold)]",
  secondary:
    "border border-cream/35 bg-cream/8 text-cream backdrop-blur-md hover:bg-cream/15 hover:border-cream/60",
  ghost: "text-cream hover:text-gold underline-offset-4 hover:underline",
  dark: "bg-jungle-dark text-cream hover:bg-deep shadow-[0_10px_30px_-14px_var(--color-jungle-dark)]",
};

const sizes: Record<Size, string> = {
  sm: "min-h-10 px-4 text-sm",
  md: "min-h-12 px-6 text-[0.95rem]",
  lg: "min-h-14 px-7 text-base md:px-8 md:text-[1.05rem]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  iconPosition?: "left" | "right";
  className?: string;
  children: ReactNode;
};

type LinkButtonProps = CommonProps & {
  href: string;
  external?: boolean;
  ariaLabel?: string;
};

function Content({ icon, iconPosition = "right", children }: Pick<CommonProps, "icon" | "iconPosition" | "children">) {
  const i = icon ? (
    <Icon
      name={icon}
      size={20}
      className={cn(
        "shrink-0 transition-transform duration-300",
        iconPosition === "right" && (icon === "arrow-right" || icon === "arrow-up-right") && "motion-safe:group-hover/btn:translate-x-0.5",
      )}
    />
  ) : null;
  return (
    <>
      {iconPosition === "left" && i}
      <span>{children}</span>
      {iconPosition === "right" && i}
    </>
  );
}

/** Bouton-lien (interne via next/link, externe dans un nouvel onglet). */
export function ButtonLink({
  href,
  external,
  variant = "primary",
  size = "md",
  className,
  ariaLabel,
  ...rest
}: LinkButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const isExternal = external ?? /^https?:\/\//.test(href);
  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        aria-label={ariaLabel ? `${ariaLabel} (nouvel onglet)` : undefined}
      >
        <Content {...rest} />
        {!ariaLabel && <span className="sr-only"> (nouvel onglet)</span>}
      </a>
    );
  }
  if (/^(tel|mailto):/.test(href)) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel}>
        <Content {...rest} />
      </a>
    );
  }
  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      <Content {...rest} />
    </Link>
  );
}

/** Bouton d'action (modales, interactions). */
export function Button({
  variant = "primary",
  size = "md",
  className,
  icon,
  iconPosition,
  children,
  ...props
}: CommonProps & Omit<ComponentProps<"button">, "children">) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      <Content icon={icon} iconPosition={iconPosition}>
        {children}
      </Content>
    </button>
  );
}
