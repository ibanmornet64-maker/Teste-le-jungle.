"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { CONTACT, SITE, directionsUrl, phoneHref } from "@/config/site";
import { cn } from "@/lib/format";
import { getReservationCta } from "@/lib/reservation";
import Link from "next/link";

/**
 * Barre d'actions fixe en bas d'écran sur mobile (accessible au pouce).
 * Apparaît après le premier écran.
 */
export function MobileActionBar() {
  const [visible, setVisible] = useState(false);
  const cta = getReservationCta();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const secondary = CONTACT.phone
    ? { href: phoneHref(CONTACT.phone), label: "Appeler", icon: "phone" as const, external: false }
    : { href: SITE.social.instagram.url, label: "Instagram", icon: "instagram" as const, external: true };

  const itemCls =
    "flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 text-[0.7rem] font-semibold text-cream/85";

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
        <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className={itemCls} tabIndex={visible ? 0 : -1}>
          <Icon name="route" size={20} className="text-gold" />
          Itinéraire
        </a>
        {cta.external ? (
          <a
            href={cta.href}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={visible ? 0 : -1}
            className="m-1.5 flex flex-[1.6] items-center justify-center gap-2 rounded-xl bg-orange text-sm font-bold text-night"
          >
            <Icon name="calendar" size={18} />
            {cta.shortLabel}
          </a>
        ) : (
          <Link
            href={cta.href}
            tabIndex={visible ? 0 : -1}
            className="m-1.5 flex flex-[1.6] items-center justify-center gap-2 rounded-xl bg-orange text-sm font-bold text-night"
          >
            <Icon name="calendar" size={18} />
            {cta.shortLabel}
          </Link>
        )}
        <a
          href={secondary.href}
          {...(secondary.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className={itemCls}
          tabIndex={visible ? 0 : -1}
        >
          <Icon name={secondary.icon} size={20} className="text-gold" />
          {secondary.label}
        </a>
      </nav>
    </div>
  );
}
