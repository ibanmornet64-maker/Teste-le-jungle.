import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { getReservationCta } from "@/lib/reservation";
import { ContactForm } from "./ContactForm";

/**
 * Interface de réservation :
 * - si une plateforme officielle est configurée → lien « Réserver en ligne »
 * - sinon → formulaire de DEMANDE (aucune confirmation automatique)
 */
export function ReservationForm() {
  const cta = getReservationCta();

  if (cta.external) {
    return (
      <div className="rounded-[1.75rem] border border-cream/10 bg-jungle-dark/60 p-8 text-center md:p-12">
        <span className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-orange text-night">
          <Icon name="calendar" size={30} />
        </span>
        <h2 className="text-3xl font-semibold text-cream">Réservez en quelques clics</h2>
        <p className="mx-auto mt-3 max-w-md text-cream/80">
          La réservation se fait sur notre plateforme officielle. Vous recevrez la confirmation directement.
        </p>
        <ButtonLink href={cta.href} external size="lg" className="mt-8" icon="arrow-up-right">
          {cta.label}
        </ButtonLink>
        <p className="mt-10 text-sm text-cream/60">Une question avant de réserver ?</p>
        <div className="mt-4 text-left">
          <ContactForm variant="contact" defaultType="question" />
        </div>
      </div>
    );
  }

  return <ContactForm variant="reservation" />;
}
