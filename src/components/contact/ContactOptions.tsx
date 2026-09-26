import type { ReactNode } from "react";
import { Glow } from "@/components/decor/Foliage";
import { Icon } from "@/components/ui/Icon";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getContactActions, type ContactAction } from "@/lib/contact-actions";
import { cn } from "@/lib/format";
import { CopyMessage } from "./CopyMessage";

type Props = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  /** Infos utiles à indiquer dans le message */
  checklist?: string[];
  /** Message type à copier */
  template?: string;
};

const DESCRIPTIONS: Record<ContactAction["id"], string> = {
  booking: "Choisissez votre créneau sur la plateforme de réservation.",
  phone: "Le plus rapide pour une question ou une disponibilité.",
  instagram: "Écrivez-nous en message privé, l’équipe vous répond.",
  email: "Idéal pour les demandes détaillées (groupes, entreprises).",
};

/**
 * Bloc « Nous contacter » du site vitrine : pas de formulaire, pas de serveur.
 * Les boutons ouvrent directement Instagram, le téléphone ou l'email.
 */
export function ContactOptions({ id, eyebrow, title, intro, checklist, template }: Props) {
  const actions = getContactActions();

  return (
    <section id={id} className="section-y relative overflow-hidden bg-night" aria-labelledby={`${id}-title`}>
      <Glow color="orange" className="top-20 -left-40 size-[34rem] opacity-40" />
      <div className="container-jungle relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionTitle id={`${id}-title`} eyebrow={eyebrow} title={title} intro={intro} />
          {checklist && (
            <div className="mt-8" data-reveal>
              <p className="text-sm font-semibold text-cream">Pour une réponse rapide, précisez :</p>
              <ul className="mt-4 space-y-3 text-cream/80">
                {checklist.map((t) => (
                  <li key={t} className="flex gap-3">
                    <Icon name="check" size={20} className="shrink-0 text-gold" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="space-y-4" data-reveal style={{ ["--reveal-delay" as string]: "120ms" }}>
          <ul className="space-y-4">
            {actions.map((a, i) => {
              const primary = i === 0;
              return (
                <li key={a.id}>
                  <a
                    href={a.href}
                    {...(a.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={cn(
                      "group flex items-center gap-5 rounded-[1.5rem] border p-5 transition-[transform,background-color,border-color] duration-300 hover:-translate-y-0.5 md:p-6",
                      primary
                        ? "border-orange bg-orange text-night hover:bg-gold"
                        : "border-cream/12 bg-jungle-dark/50 text-cream hover:border-gold/50",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-14 shrink-0 items-center justify-center rounded-2xl",
                        primary ? "bg-night/10 text-night" : "bg-gold/15 text-gold",
                      )}
                    >
                      <Icon name={a.icon} size={26} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-xl font-semibold">{a.label}</span>
                      {a.detail && (
                        <span className={cn("mt-0.5 block text-sm font-semibold", primary ? "text-night/80" : "text-gold")}>{a.detail}</span>
                      )}
                      <span className={cn("mt-1 block text-sm", primary ? "text-night/75" : "text-cream/65")}>{DESCRIPTIONS[a.id]}</span>
                    </span>
                    <Icon
                      name={a.external ? "arrow-up-right" : "arrow-right"}
                      size={22}
                      className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                    />
                    {a.external && <span className="sr-only"> (nouvel onglet)</span>}
                  </a>
                </li>
              );
            })}
          </ul>
          {template && <CopyMessage text={template} />}
          <p className="flex gap-2 px-1 text-xs leading-relaxed text-cream/55">
            <Icon name="info" size={16} className="mt-0.5 shrink-0" />
            Aucune réservation n’est enregistrée par ce site : l’équipe du Jungle vous confirme directement les disponibilités.
          </p>
        </div>
      </div>
    </section>
  );
}
