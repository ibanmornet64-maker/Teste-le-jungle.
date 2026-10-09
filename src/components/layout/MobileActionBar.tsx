"use client";

import { Icon } from "@/components/ui/Icon";
import { directionsUrl } from "@/config/site";
import { cn } from "@/lib/format";
import { getPrimaryAction, getSecondaryAction } from "@/lib/contact-actions";
import Link from "next/link";
import { usePastFold } from "@/lib/use-past-fold";

/**
 * Barre d'actions fixe en bas d'écran sur mobile (accessible au pouce).
 * Apparaît après le premier écran (le bouton de contact du header disparaît
 * alors sur mobile). Itinéraire · contact principal · second contact.
 */
export function MobileActionBar() {
  const visible = usePastFold();
  const primary = getPrimaryAction();
  const secondary = getSecondaryAction();

  const tab = visible ? 0 : -1;
  const newTab = (external: boolean) => (external ? { target: "_blank", rel: "noopener noreferrer" } : {});
  const itemCls =
    "flex min-h-14 flex-1 flex-col items-center justify-center gap-1 text-xs font-semibold text-cream/90 active:bg-cream/10";

  return (
    <div
      className={cn(
        "fixed inset-x-3 bottom-3 z-30 md:hidden",
        "transition-[transform,opacity] duration-500",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0",
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-hidden={!visible}
    >
      <nav
        aria-label="Actions rapides"
        className="flex items-stretch overflow-hidden rounded-2xl border border-cream/12 bg-deep/92 shadow-[0_20px_50px_-15px_rgb(0_0_0/0.9)] backdrop-blur-xl"
      >
        <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className={itemCls} tabIndex={tab}>
          <Icon name="route" size={20} className="text-gold" />
          Itinéraire
        </a>
        <a
          href={primary.href}
          {...newTab(primary.external)}
          tabIndex={tab}
          aria-label={primary.label}
          className="m-1.5 flex flex-[1.6] items-center justify-center gap-2 rounded-xl bg-orange text-[0.95rem] font-bold text-night active:scale-[0.98] motion-safe:transition-transform"
        >
          <Icon name={primary.icon} size={18} />
          {primary.shortLabel}
        </a>
        {secondary ? (
          <a href={secondary.href} {...newTab(secondary.external)} className={itemCls} tabIndex={tab} aria-label={secondary.label}>
            <Icon name={secondary.icon} size={20} className="text-gold" />
            {secondary.shortLabel}
          </a>
        ) : (
          <Link href="/contact" className={itemCls} tabIndex={tab}>
            <Icon name="clock" size={20} className="text-gold" />
            Horaires
          </Link>
        )}
      </nav>
    </div>
  );
}
