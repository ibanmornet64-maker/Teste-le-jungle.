/**
 * Jeu d'icônes maison, homogène (trait 1.75, 24×24, currentColor).
 * Léger : pas de bibliothèque externe.
 */
import type { SVGProps } from "react";

const paths = {
  bowling: (
    <>
      <path d="M8.5 2.5c-1.5 0-2.2 1.2-2.2 2.6 0 1 .5 1.8.5 2.6 0 .8-1.5 2.4-1.5 5.6 0 3.3 1.1 5.8 1.7 7.2h3c.6-1.4 1.7-3.9 1.7-7.2 0-3.2-1.5-4.8-1.5-5.6 0-.8.5-1.6.5-2.6 0-1.4-.7-2.6-2.2-2.6Z" />
      <path d="M6.9 9.2h3.2" />
      <circle cx="17.5" cy="16.5" r="4" />
      <circle cx="16.6" cy="15.2" r=".45" fill="currentColor" />
      <circle cx="18.3" cy="14.9" r=".45" fill="currentColor" />
      <circle cx="17.7" cy="16.6" r=".45" fill="currentColor" />
    </>
  ),
  billiard: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="12" cy="10.7" r="1.2" />
      <circle cx="12" cy="13.4" r="1.45" />
    </>
  ),
  darts: (
    <>
      <circle cx="11" cy="13" r="8" />
      <circle cx="11" cy="13" r="4.5" />
      <circle cx="11" cy="13" r="1.2" fill="currentColor" />
      <path d="m11 13 8.5-8.5" />
      <path d="M17 4.5 19.5 4.5 19.5 7" />
      <path d="M19.5 4.5 21.5 2.5" />
    </>
  ),
  cocktail: (
    <>
      <path d="M4 4.5h16L12 13Z" />
      <path d="M12 13v7.5" />
      <path d="M8 20.5h8" />
      <path d="M7.2 8h9.6" />
      <circle cx="18" cy="4" r="2.2" />
    </>
  ),
  pinsa: (
    <>
      <ellipse cx="12" cy="12" rx="9.5" ry="6.2" transform="rotate(-18 12 12)" />
      <ellipse cx="12" cy="12" rx="7" ry="4" transform="rotate(-18 12 12)" />
      <circle cx="9.2" cy="12.4" r="1" fill="currentColor" />
      <circle cx="13.2" cy="10.3" r="1" fill="currentColor" />
      <circle cx="14.2" cy="13.6" r="1" fill="currentColor" />
    </>
  ),
  party: (
    <>
      <path d="M9 18V5.5l11-2.2v12.4" />
      <circle cx="6.5" cy="18" r="2.8" />
      <circle cx="17.5" cy="15.7" r="2.8" />
      <path d="M9 9.3 20 7.1" />
    </>
  ),
  waffle: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
      <path d="M9.2 3.5v17M14.8 3.5v17M3.5 9.2h17M3.5 14.8h17" />
    </>
  ),
  smoothie: (
    <>
      <path d="M6.5 8.5h11l-1.3 11.4a1.2 1.2 0 0 1-1.2 1.1H9a1.2 1.2 0 0 1-1.2-1.1Z" />
      <path d="m12.5 8.5 1.8-6h3.2" />
      <path d="M7.1 13.5h9.8" />
    </>
  ),
  "share-plate": (
    <>
      <path d="M3 14.5h14.5a3.5 3.5 0 0 0 0-7H3Z" />
      <path d="M17.5 11H21" />
      <circle cx="7" cy="11" r="1.4" />
      <circle cx="11.5" cy="10.2" r="1.1" />
      <path d="M13.5 12.3h2" />
      <path d="M3 18h12" />
    </>
  ),
  glass: (
    <>
      <path d="M6 3.5h12l-1.4 16a1.6 1.6 0 0 1-1.6 1.5H9a1.6 1.6 0 0 1-1.6-1.5Z" />
      <path d="M6.6 10h10.8" />
    </>
  ),
  camera: (
    <>
      <path d="M3.5 8.5a2 2 0 0 1 2-2h2l1.5-2.2h6L16.5 6.5h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2Z" />
      <circle cx="12" cy="13" r="3.6" />
    </>
  ),
  football: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m12 7.5 3.8 2.8-1.5 4.4H9.7L8.2 10.3Z" />
      <path d="M12 3v4.5M15.8 10.3l4.4-1.6M14.3 14.7l2.8 3.8M9.7 14.7l-2.8 3.8M8.2 10.3 3.8 8.7" />
    </>
  ),
  cake: (
    <>
      <path d="M4 20.5h16v-6.5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2Z" />
      <path d="M4 16c1.6 1.2 3.2 1.2 4.8 0s3.2-1.2 4.8 0 3.2 1.2 4.8 0" />
      <path d="M8 12V9M12 12V9M16 12V9" />
      <path d="M8 6.5v-.3M12 6.5v-.3M16 6.5v-.3" strokeWidth="2.6" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c.6-3.6 3.2-5.6 6.5-5.6s5.9 2 6.5 5.6" />
      <path d="M16 4.8a3.3 3.3 0 0 1 0 6.4" />
      <path d="M18 14.7c2 .7 3.2 2.5 3.5 5.3" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2.5" />
      <path d="M8.5 7V5.5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2V7" />
      <path d="M3 12.5h18" />
    </>
  ),
  trophy: (
    <>
      <path d="M7 3.5h10v5a5 5 0 0 1-10 0Z" />
      <path d="M7 5.5H4a3 3 0 0 0 3 4M17 5.5h3a3 3 0 0 1-3 4" />
      <path d="M12 13.5v3.5M8 20.5h8M9.5 17h5v3.5h-5Z" />
    </>
  ),
  star: <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z" />,
  sparkles: (
    <>
      <path d="M10 3.5 11.6 8.4 16.5 10l-4.9 1.6L10 16.5l-1.6-4.9L3.5 10l4.9-1.6Z" />
      <path d="M18 14.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8Z" />
    </>
  ),
  leaf: (
    <>
      <path d="M20.5 3.5C11 3.5 4 8.5 4 15.5c0 2.2.8 3.8 1.5 5 7.5 0 15-5 15-17Z" />
      <path d="M4 20.5c3-4.5 7-8.5 12.5-12" />
    </>
  ),
  "map-pin": (
    <>
      <path d="M12 21.5s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12Z" />
      <circle cx="12" cy="9.5" r="2.6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.2 2" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r=".8" fill="currentColor" stroke="none" />
    </>
  ),
  phone: (
    <path d="M5 3.5h3.5l1.7 4.3-2.2 1.4a11 11 0 0 0 6.8 6.8l1.4-2.2 4.3 1.7V19a2 2 0 0 1-2 2A16.5 16.5 0 0 1 3 5.5a2 2 0 0 1 2-2Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="18" r="2.5" />
      <path d="M18 9.5s3-3 3-5.2a3 3 0 0 0-6 0c0 2.2 3 5.2 3 5.2Z" />
      <path d="M8.5 18H16a3 3 0 0 0 0-6H8a3 3 0 0 1 0-6h4" />
    </>
  ),
  "arrow-right": <path d="M4.5 12h15m-6-6 6 6-6 6" />,
  "arrow-up-right": <path d="M7 17 17 7m-8.5 0H17v8.5" />,
  "arrow-down": <path d="M12 4.5v15m-6-6 6 6 6-6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h10" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  "chevron-left": <path d="m14.5 5.5-6.5 6.5 6.5 6.5" />,
  "chevron-right": <path d="m9.5 5.5 6.5 6.5-6.5 6.5" />,
  "chevron-down": <path d="m5.5 9.5 6.5 6.5 6.5-6.5" />,
  share: (
    <>
      <circle cx="18" cy="5.5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="18.5" r="2.5" />
      <path d="m8.2 10.8 7.6-4.1M8.2 13.2l7.6 4.1" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  check: <path d="m4.5 12.5 5 5 10-11" />,
  copy: (
    <>
      <rect x="8.5" y="8.5" width="11" height="11" rx="2.5" />
      <path d="M15.5 8.5V6.5a2 2 0 0 0-2-2h-7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5.5M12 7.8v.2" />
    </>
  ),
  ticket: (
    <>
      <path d="M3.5 8a2 2 0 0 0 0 4v0a2 2 0 0 1 0 4v1.5a1.5 1.5 0 0 0 1.5 1.5h14a1.5 1.5 0 0 0 1.5-1.5V16a2 2 0 0 1 0-4 2 2 0 0 0 0-4V6.5A1.5 1.5 0 0 0 19 5H5a1.5 1.5 0 0 0-1.5 1.5Z" />
      <path d="M14.5 5v14" strokeDasharray="2 2.2" />
    </>
  ),
  expand: <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />,
} as const;

export type IconName = keyof typeof paths;

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number;
  /** Laisser vide si l'icône est décorative (aria-hidden automatiquement). */
  title?: string;
};

export function Icon({ name, size = 24, title, className, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      focusable="false"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {paths[name]}
    </svg>
  );
}
