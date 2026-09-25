import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { Activity } from "@/data/activities";
import { cn } from "@/lib/format";

type Props = {
  activity: Activity;
  featured?: boolean;
  className?: string;
  delay?: number;
};

/** Carte visuelle d'activité : image, compteur, nom, texte, lien « Découvrir ». */
export function ActivityCard({ activity, featured = false, className, delay = 0 }: Props) {
  const label = activity.slug === "soirees" ? "Voir les soirées" : "Découvrir";
  return (
    <article
      className={cn(
        "group relative isolate flex min-h-[22rem] flex-col justify-end overflow-hidden rounded-[1.75rem] bg-jungle-dark",
        "ring-1 ring-cream/10 transition-[transform,box-shadow] duration-500 ease-out",
        "motion-safe:hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-25px_color-mix(in_oklab,var(--color-orange)_55%,transparent)] hover:ring-orange/50",
        featured && "min-h-[28rem] md:min-h-full",
        className,
      )}
      data-reveal
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {activity.image ? (
        <div className="img-zoom absolute inset-0 -z-10">
          <Image
            src={activity.image.src}
            alt={activity.image.alt}
            fill
            sizes={featured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
            className="object-cover"
          />
        </div>
      ) : (
        <div aria-hidden className="dot-pattern absolute inset-0 -z-10 bg-gradient-to-br from-leaf to-deep">
          <Icon name={activity.icon} size={160} className="absolute top-8 right-6 text-cream/10" />
        </div>
      )}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/55 to-night/5"
      />

      <div className="flex items-start justify-between gap-3 p-5 pb-0 md:p-6 md:pb-0">
        <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-cream/12 text-gold ring-1 ring-cream/15 backdrop-blur-md">
          <Icon name={activity.icon} size={26} />
        </span>
        {activity.count !== null && (
          <span className="rounded-full bg-night/60 px-3 py-1.5 text-xs font-semibold text-cream ring-1 ring-cream/15 backdrop-blur-md">
            <span className="text-gold">{activity.count}</span> {activity.countLabel}
          </span>
        )}
      </div>

      <div className="mt-auto p-5 md:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold/90">{activity.tagline}</p>
        <h3 className={cn("mt-2 font-semibold text-cream", featured ? "text-4xl md:text-5xl" : "text-3xl")}>
          {activity.name}
        </h3>
        <p className={cn("mt-3 max-w-md text-cream/80", featured ? "text-base md:text-lg" : "text-[0.95rem]")}>
          {featured ? activity.description : activity.short}
        </p>
        <Link
          href={activity.href}
          className="mt-5 inline-flex items-center gap-2 font-semibold text-cream after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-[1.75rem] focus-visible:after:ring-3 focus-visible:after:ring-gold"
        >
          {label}
          <span className="sr-only"> : {activity.name}</span>
          <span className="inline-flex size-9 items-center justify-center rounded-full bg-orange text-night transition-transform duration-300 motion-safe:group-hover:translate-x-1">
            <Icon name="arrow-right" size={18} />
          </span>
        </Link>
      </div>
    </article>
  );
}
