import Link from "next/link";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { OpeningHours } from "@/components/ui/OpeningHours";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { MapEmbed } from "@/components/sections/MapEmbed";
import { CONTACT, SITE, directionsUrl, phoneHref } from "@/config/site";
import { DATA_TO_CONFIRM } from "@/config/data-to-confirm";
import { visibleActivities } from "@/data/activities";

function InfoCard({ icon, title, children }: { icon: IconName; title: string; children: ReactNode }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-cream/10 bg-jungle-dark/50 p-5">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold">
        <Icon name={icon} size={22} />
      </span>
      <div className="min-w-0 text-sm text-cream/80">
        <h3 className="mb-1 font-sans text-base font-semibold text-cream">{title}</h3>
        {children}
      </div>
    </div>
  );
}

/** Informations pratiques : adresse, horaires, activités, contact, carte. */
export function PracticalInfo({ withTitle = true, detailedHours = false }: { withTitle?: boolean; detailedHours?: boolean }) {
  return (
    <section id="infos" aria-labelledby={withTitle ? "infos-title" : undefined} aria-label={withTitle ? undefined : "Informations pratiques"} className="section-y relative bg-deep">
      <div className="container-jungle">
        {withTitle && (
          <SectionTitle
            id="infos-title"
            eyebrow="Infos pratiques"
            title={
              <>
                Nous <span className="text-gold">trouver</span>
              </>
            }
            intro="En plein cœur d’Oloron-Sainte-Marie, dans le Béarn."
          />
        )}
        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1" data-reveal>
            <InfoCard icon="map-pin" title="Adresse">
              <address className="not-italic">
                {SITE.address.street}
                <br />
                {SITE.address.postalCode} {SITE.address.city}
              </address>
              <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 font-semibold text-gold hover:underline relative after:absolute after:-inset-x-2 after:-inset-y-3 after:content-['']">
                Itinéraire <Icon name="arrow-up-right" size={14} />
                <span className="sr-only">(nouvel onglet)</span>
              </a>
            </InfoCard>

            {CONTACT.hoursVisible && (
              <InfoCard icon="clock" title="Horaires">
                {detailedHours ? <OpeningHours /> : <p>{SITE.hours.summary}</p>}
              </InfoCard>
            )}

            <InfoCard icon="bowling" title="Activités">
              <p>{visibleActivities.filter((a) => a.count).map((a) => `${a.count} ${a.countLabel}`).join(" · ")}</p>
              <Link href="/activites" className="mt-2 inline-flex items-center gap-1 font-semibold text-gold hover:underline relative after:absolute after:-inset-x-2 after:-inset-y-3 after:content-['']">
                Découvrir <Icon name="arrow-right" size={14} />
              </Link>
            </InfoCard>

            <InfoCard icon="instagram" title="Instagram">
              <a href={SITE.social.instagram.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-gold hover:underline relative after:absolute after:-inset-x-2 after:-inset-y-3 after:content-['']">
                {SITE.social.instagram.handle}
                <span className="sr-only"> (nouvel onglet)</span>
              </a>
              <p className="mt-1">Actus, soirées et nouveautés.</p>
            </InfoCard>

            {CONTACT.phone && (
              <InfoCard icon="phone" title="Téléphone">
                <a href={phoneHref(CONTACT.phone)} className="font-semibold text-gold hover:underline relative after:absolute after:-inset-x-2 after:-inset-y-3 after:content-['']">
                  {CONTACT.phone}
                </a>
              </InfoCard>
            )}
            {CONTACT.email && (
              <InfoCard icon="mail" title="Email">
                <a href={`mailto:${CONTACT.email}`} className="font-semibold break-all text-gold hover:underline">
                  {CONTACT.email}
                </a>
              </InfoCard>
            )}
            {DATA_TO_CONFIRM.parking && (
              <InfoCard icon="route" title="Stationnement">
                <p>{DATA_TO_CONFIRM.parking}</p>
              </InfoCard>
            )}
            {DATA_TO_CONFIRM.accessibility && (
              <InfoCard icon="users" title="Accessibilité">
                <p>{DATA_TO_CONFIRM.accessibility}</p>
              </InfoCard>
            )}
          </div>

          <div className="flex flex-col gap-4" data-reveal style={{ ["--reveal-delay" as string]: "120ms" }}>
            <MapEmbed className="min-h-[22rem] flex-1 lg:min-h-[30rem]" />
            <ButtonLink href={directionsUrl} size="lg" icon="route" iconPosition="left" className="w-full sm:w-auto sm:self-start" ariaLabel="Voir l’itinéraire vers Le Jungle">
              Voir l’itinéraire
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
