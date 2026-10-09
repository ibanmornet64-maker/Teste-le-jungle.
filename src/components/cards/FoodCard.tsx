import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import type { MenuCategory, MenuItem } from "@/data/menu";
import { cn } from "@/lib/format";

/** Carte de catégorie gourmande (photo rapprochée + description). */
export function FoodCategoryCard({
  category,
  className,
  delay = 0,
  priority = false,
}: {
  category: MenuCategory;
  className?: string;
  delay?: number;
  priority?: boolean;
}) {
  return (
    <article
      className={cn("group relative overflow-hidden rounded-[1.75rem] bg-cream shadow-[0_24px_50px_-30px_rgb(16_21_18/0.6)]", className)}
      data-reveal
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {category.image && (
        <div className="img-zoom relative aspect-[16/10] overflow-hidden sm:aspect-[4/3]">
          <Image
            src={category.image.src}
            alt={category.image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
            preload={priority}
          />
          <span className="absolute top-4 left-4 rounded-full bg-night/70 px-3 py-1 text-xs font-semibold text-cream backdrop-blur-md">
            {category.moment}
          </span>
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-10 items-center justify-center rounded-xl bg-jungle-dark text-gold">
            <Icon name={category.icon} size={22} />
          </span>
          <h3 className="text-2xl font-semibold text-deep">{category.name}</h3>
        </div>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-night/75">{category.description}</p>
        {category.items.length > 0 && (
          <ul className="mt-5 divide-y divide-night/10 border-t border-night/10">
            {category.items.map((item) => (
              <FoodItemRow key={item.name} item={item} />
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

/** Ligne produit (nom, description, prix, allergènes, badge végétarien). */
export function FoodItemRow({ item }: { item: MenuItem }) {
  return (
    <li className="flex gap-4 py-4">
      {item.image && (
        <Image
          src={item.image.src}
          alt={item.image.alt}
          width={72}
          height={72}
          className="size-18 shrink-0 rounded-xl object-cover"
        />
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <h4 className="font-sans text-base font-semibold text-deep">
            {item.name}
            {item.vegetarian && (
              <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-leaf/15 px-2 py-0.5 align-middle text-[0.7rem] font-semibold text-jungle-dark">
                <Icon name="leaf" size={12} /> Végétarien
              </span>
            )}
          </h4>
          {item.price && <span className="shrink-0 font-semibold text-deep">{item.price}</span>}
        </div>
        {item.description && <p className="mt-1 text-sm text-night/70">{item.description}</p>}
        {item.allergens && item.allergens.length > 0 && (
          <p className="mt-1.5 text-xs text-night/60">
            <span className="font-semibold">Allergènes :</span> {item.allergens.join(", ")}
          </p>
        )}
      </div>
    </li>
  );
}
