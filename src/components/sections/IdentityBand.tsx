import { Icon, type IconName } from "@/components/ui/Icon";
import { SimpleLeaf } from "@/components/decor/Foliage";

const ITEMS: { label: string; icon: IconName }[] = [
  { label: "Bowling", icon: "bowling" },
  { label: "Billard", icon: "billiard" },
  { label: "Fléchettes", icon: "darts" },
  { label: "Cocktails", icon: "cocktail" },
  { label: "Pinsas", icon: "pinsa" },
  { label: "Soirées", icon: "party" },
];

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {ITEMS.map((item) => (
        <li key={item.label} className="flex items-center">
          <span className="flex items-center gap-3 px-6 md:gap-4 md:px-10">
            <Icon name={item.icon} size={30} className="text-gold" />
            <span className="font-display text-2xl font-medium text-cream md:text-[2rem]">{item.label}</span>
          </span>
          <SimpleLeaf className="size-4 text-leaf" />
        </li>
      ))}
    </ul>
  );
}

/** Bandeau d'identité défilant lentement (statique si animations réduites). */
export function IdentityBand() {
  return (
    <section aria-label="Ce que vous trouverez au Jungle" className="relative overflow-hidden border-y border-cream/10 bg-jungle-dark py-6 md:py-7">
      <div className="flex w-max animate-marquee motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center" style={{ ["--marquee-duration" as string]: "45s" }}>
        <Row />
        <div className="motion-reduce:hidden">
          <Row hidden />
        </div>
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-jungle-dark md:w-32" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-jungle-dark md:w-32" />
    </section>
  );
}
