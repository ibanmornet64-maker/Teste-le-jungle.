import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SITE } from "@/config/site";
import type { InstagramPost } from "@/lib/instagram";

const KIND_LABEL: Record<InstagramPost["kind"], string> = {
  image: "Photo",
  video: "Vidéo",
  reel: "Reel",
  album: "Carrousel",
};

const dateFormat = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", timeZone: "Europe/Paris" });

/**
 * Les dernières publications Instagram du Jungle, mises à jour automatiquement
 * (voir src/lib/instagram.ts). Rendu côté serveur : aucun script tiers, aucun
 * cookie, images optimisées et servies par le site.
 */
export function InstagramLatest({ posts }: { posts: InstagramPost[] }) {
  if (posts.length === 0) return null;
  const { handle, url } = SITE.social.instagram;

  return (
    <div className="mt-16 md:mt-20" data-reveal>
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.22em] text-coral uppercase">
            <Icon name="instagram" size={16} />
            En direct d’Instagram
          </p>
          <h3 id="instagram-latest-title" className="text-2xl font-semibold text-cream md:text-3xl">
            Les dernières publications
          </h3>
        </div>
        <ButtonLink href={url} variant="ghost" icon="arrow-up-right" className="-mx-6 sm:mx-0" ariaLabel={`Voir le compte ${handle} sur Instagram (nouvel onglet)`}>
          {handle}
        </ButtonLink>
      </div>

      <ul aria-labelledby="instagram-latest-title" className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
        {posts.map((post) => {
          const date = dateFormat.format(new Date(post.date));
          const label = `${KIND_LABEL[post.kind]} Instagram du ${date}${post.caption ? ` : ${post.caption}` : ""} (nouvel onglet)`;
          return (
            <li key={post.id}>
              <a
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="group relative block aspect-square overflow-hidden rounded-[1.5rem] border border-cream/10 bg-jungle-dark outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-night"
                style={post.placeholderColor ? { backgroundColor: post.placeholderColor } : undefined}
              >
                <Image
                  src={post.image.src}
                  alt={post.alt}
                  fill
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 48vw"
                  quality={75}
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04] group-focus-visible:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/15 to-transparent" />
                {post.kind !== "image" && (
                  <span
                    aria-hidden
                    className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-night/60 text-cream backdrop-blur-sm"
                  >
                    <Icon name={post.kind === "album" ? "album" : "play"} size={16} />
                  </span>
                )}
                <span aria-hidden className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                  <time dateTime={post.date} className="block text-xs font-semibold tracking-wide text-gold">
                    {date}
                  </time>
                  {post.caption && (
                    <span className="mt-1 hidden text-sm leading-snug text-cream/90 sm:line-clamp-2">{post.caption}</span>
                  )}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
