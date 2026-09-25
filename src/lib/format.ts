/** Utilitaires d'affichage (français). */

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** "2026-10-17" → Date à midi UTC (évite les décalages de fuseau). */
function parseDay(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d, 12));
}

export function formatDateLong(iso: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(parseDay(iso));
}

export function formatDayMonth(iso: string): { day: string; month: string; weekday: string } {
  const date = parseDay(iso);
  const fmt = (o: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("fr-FR", { ...o, timeZone: "UTC" }).format(date);
  return {
    day: fmt({ day: "2-digit" }),
    month: fmt({ month: "short" }).replace(".", ""),
    weekday: fmt({ weekday: "short" }).replace(".", ""),
  };
}

export function formatMonthKey(iso: string): string {
  return iso.slice(0, 7);
}

export function formatMonthLabel(key: string): string {
  const label = new Intl.DateTimeFormat("fr-FR", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(parseDay(`${key}-01`));
  return label.charAt(0).toUpperCase() + label.slice(1);
}

/** "20:00" → "20 h" ; "20:30" → "20 h 30" */
export function formatTime(time: string): string {
  const [h, m] = time.split(":");
  return m === "00" ? `${Number(h)} h` : `${Number(h)} h ${m}`;
}
