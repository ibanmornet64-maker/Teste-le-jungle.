import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Glow, PalmFrond } from "@/components/decor/Foliage";
import { SITE } from "@/config/site";
import { getUpcomingEvents } from "@/data/events";
import { getLatestInstagramPosts } from "@/lib/instagram";
import { InstagramLatest } from "./InstagramLatest";
import { UpcomingEventsGrid } from "./UpcomingOnly";

/** État vide élégant, réutilisé sur la page Événements. */
export function EventsEmptyState() {
  return (
    <div className="relative isolate overflow-hidden rounded-[2rem] border border-cream/10 bg-jungle-dark/60 px-6 py-14 text-center md:py-20" data-reveal>
      <Glow color="lime" className="-top-24 left-1/2 -z-10 size-[28rem] -translate-x-1/2 opacity-70" />
      <Glow color="coral" className="-bottom-32 -left-20 -z-10 size-[20rem] opacity-40" />
      <PalmFrond className="absolute -right-10 -bottom-16 -z-10 h-72 rotate-[200deg] text-deep" />
      <span className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-coral text-night">
        <Icon name="party" size={30} />
      </span>
      <p className="mx-auto max-w-xl font-display text-2xl font-medium text-cream md:text-3xl">
        Les prochains événements arrivent bientôt.
      </p>
      <p className="mx-auto mt-3 max-w-md text-cream/75">Suivez-nous sur Instagram pour ne rien manquer.</p>
      <ButtonLink href={SITE.social.instagram.url} size="md" className="mt-8" icon="instagram" iconPosition="left" ariaLabel="Suivre Le Jungle sur Instagram">
        Suivre {SITE.social.instagram.handle}
      </ButtonLink>
    </div>
  );
}

export async function EventsPreview() {
  const events = getUpcomingEvents().slice(0, 3);
  // 4 dernières publications Instagram (bloc masqué si le flux n'est pas configuré)
  const posts = await getLatestInstagramPosts(4);
  return (
    <section aria-labelledby="events-title" className="section-y relative overflow-hidden bg-night">
      <div className="container-jungle relative">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionTitle
            id="events-title"
            eyebrow="Agenda"
            title={
              <>
                La jungle <span className="text-coral">by night</span>
              </>
            }
            intro="Soirées dansantes, afterworks, tournois, soirées à thème : les rendez-vous à ne pas manquer."
          />
          <div className="flex shrink-0 flex-wrap gap-3">
            {events.length > 0 && (
              <ButtonLink href="/evenements" variant="secondary" icon="arrow-right">
                Tout l’agenda
              </ButtonLink>
            )}
            <ButtonLink href={SITE.social.instagram.url} variant="ghost" icon="instagram" iconPosition="left" ariaLabel="Événements sur Instagram">
              Instagram
            </ButtonLink>
          </div>
        </div>

        <div className="mt-12">
          <UpcomingEventsGrid events={events} empty={<EventsEmptyState />} />
        </div>

        <InstagramLatest posts={posts} />
      </div>
    </section>
  );
}
