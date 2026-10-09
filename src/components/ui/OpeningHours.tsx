import { CONTACT, SITE } from "@/config/site";
import { DATA_TO_CONFIRM } from "@/config/data-to-confirm";
import { cn } from "@/lib/format";
import { Icon } from "./Icon";

const DAYS_FR: Record<string, string> = {
  Monday: "Lundi",
  Tuesday: "Mardi",
  Wednesday: "Mercredi",
  Thursday: "Jeudi",
  Friday: "Vendredi",
  Saturday: "Samedi",
  Sunday: "Dimanche",
};

const fmt = (t: string) => {
  const [h, m] = t.split(":");
  return m === "00" ? `${h} h` : `${h} h ${m}`;
};

const WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

/** Regroupe les jours consécutifs aux horaires identiques : « Lundi – Jeudi », « Tous les jours ». */
function groupDays(spec: ReadonlyArray<{ days: readonly string[]; opens: string; closes: string }>) {
  const byDay = new Map<string, string>();
  for (const s of spec) for (const d of s.days) byDay.set(d, `${s.opens}|${s.closes}`);
  const groups: { from: string; to: string; hours: string }[] = [];
  for (const d of WEEK) {
    const hours = byDay.get(d);
    if (!hours) continue;
    const last = groups[groups.length - 1];
    if (last && last.hours === hours && WEEK.indexOf(last.to) === WEEK.indexOf(d) - 1) last.to = d;
    else groups.push({ from: d, to: d, hours });
  }
  return groups.map((g) => {
    const [opens, closes] = g.hours.split("|");
    const day =
      g.from === "Monday" && g.to === "Sunday"
        ? "Tous les jours"
        : g.from === g.to
          ? DAYS_FR[g.from]
          : `${DAYS_FR[g.from]} – ${DAYS_FR[g.to]}`;
    return { day, opens, closes };
  });
}

/** Horaires : n'affiche rien si les horaires ne sont pas confirmés. */
export function OpeningHours({ variant = "list", className }: { variant?: "list" | "inline"; className?: string }) {
  if (!CONTACT.hoursVisible) return null;

  if (variant === "inline") {
    return (
      <p className={cn("inline-flex items-center gap-2", className)}>
        <Icon name="clock" size={18} className="text-gold" />
        {SITE.hours.summary}
      </p>
    );
  }

  const rows = groupDays(SITE.hours.specification);

  return (
    <div className={className}>
      <dl className="divide-y divide-cream/10">
        {rows.map((r) => (
          <div key={r.day} className="flex justify-between gap-4 py-2 text-sm">
            <dt className="text-cream/75">{r.day}</dt>
            <dd className="font-medium text-cream tabular-nums">
              {fmt(r.opens)} – {fmt(r.closes)}
            </dd>
          </div>
        ))}
      </dl>
      {DATA_TO_CONFIRM.detailedHours && <p className="mt-3 text-sm text-cream/70">{DATA_TO_CONFIRM.detailedHours}</p>}
      <p className="mt-3 text-xs text-cream/55">Horaires susceptibles d’évoluer lors d’événements : consultez notre Instagram.</p>
    </div>
  );
}
