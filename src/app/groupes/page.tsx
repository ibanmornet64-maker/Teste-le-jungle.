import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ContactOptions } from "@/components/contact/ContactOptions";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Glow } from "@/components/decor/Foliage";
import { GROUP_FORMULAS, GROUP_SEGMENTS } from "@/data/groups";
import { IMAGES } from "@/data/images";

export const metadata: Metadata = {
  title: "Anniversaires, groupes & entreprises — bowling à Oloron",
  description:
    "Anniversaire bowling à Oloron, sortie entre amis, afterwork, team building ou événement privé : envoyez votre demande au Jungle, l’équipe vous recontacte.",
  alternates: { canonical: "/groupes" },
};

const STEPS = [
  { title: "Vous envoyez votre demande", text: "Date, nombre de participants, activités souhaitées : quelques infos suffisent." },
  { title: "L’équipe vous recontacte", text: "Le Jungle vous répond avec les disponibilités et les possibilités." },
  { title: "Vous profitez", text: "Il ne reste plus qu’à venir jouer, manger et faire la fête." },
];

export default function GroupsPage() {
  return (
    <>
      <PageHero
        eyebrow="Anniversaires & groupes"
        title={
          <>
            Vos moments, <span className="text-gold">version jungle</span>
          </>
        }
        lead="Anniversaire d’enfant, soirée entre amis, afterwork ou team building : Le Jungle réunit bowling, billard, fléchettes et gourmandises pour faire de votre événement un souvenir."
        image={IMAGES.planche}
        crumbs={[{ name: "Groupes", href: "/groupes" }]}
        actions={
          <ButtonLink href="#demande" size="lg" icon="arrow-down">
            Faire une demande
          </ButtonLink>
        }
      />

      <section className="section-y relative overflow-hidden bg-deep" aria-labelledby="pour-qui-title">
        <Glow color="coral" className="-top-40 -right-40 size-[30rem] opacity-40" />
        <div className="container-jungle relative">
          <SectionTitle
            id="pour-qui-title"
            eyebrow="Pour qui ?"
            title="Petits groupes, grandes tablées"
            intro="Chaque demande est étudiée par l’équipe du Jungle pour vous proposer une solution adaptée."
          />
          <ul className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {GROUP_SEGMENTS.map((s, i) => (
              <li
                key={s.id}
                className="group flex gap-4 rounded-[1.5rem] border border-cream/10 bg-jungle-dark/50 p-5 transition-colors hover:border-orange/50 sm:block sm:p-6"
                data-reveal
                style={{ ["--reveal-delay" as string]: `${(i % 4) * 70}ms` }}
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-cream/10 text-gold transition-colors group-hover:bg-orange group-hover:text-night">
                  <Icon name={s.icon} size={24} />
                </span>
                <div>
                  <h3 className="font-sans text-lg font-semibold text-cream sm:mt-5">{s.label}</h3>
                  <p className="mt-1 text-sm text-cream/70 sm:mt-2">{s.text}</p>
                </div>
              </li>
            ))}
          </ul>

          {GROUP_FORMULAS && GROUP_FORMULAS.length > 0 && (
            <div className="mt-14 rounded-[1.75rem] border border-gold/30 bg-jungle-dark/60 p-8">
              <h3 className="text-2xl font-semibold text-cream">Nos formules</h3>
              <ul className="mt-4 space-y-2 text-cream/85">
                {GROUP_FORMULAS.map((f) => (
                  <li key={f} className="flex gap-2">
                    <Icon name="check" size={20} className="shrink-0 text-gold" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <section className="bg-sand py-16 text-night md:py-24" aria-labelledby="etapes-title">
        <div className="container-jungle">
          <SectionTitle id="etapes-title" tone="light" eyebrow="Comment ça marche ?" title="Simple comme un strike" align="center" className="mx-auto" />
          <ol className="mt-10 grid gap-3 sm:gap-4 md:mt-12 md:grid-cols-3 md:gap-6">
            {STEPS.map((s, i) => (
              <li key={s.title} className="relative flex gap-4 rounded-[1.5rem] bg-cream p-5 shadow-[0_20px_40px_-30px_rgb(16_21_18/0.6)] sm:p-7 md:block" data-reveal style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}>
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-jungle-dark font-display text-xl font-semibold text-gold md:size-12">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-deep md:mt-5 md:text-2xl">{s.title}</h3>
                  <p className="mt-1 text-night/75 md:mt-2">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ContactOptions
        id="demande"
        eyebrow="Demande de groupe"
        title="Parlez-nous de votre projet"
        intro="Anniversaire, afterwork, team building, club ou soirée privée : envoyez un message à l’équipe du Jungle, elle revient vers vous avec les disponibilités et les possibilités. Sans engagement."
        checklist={[
          "Le type d’événement (anniversaire, entreprise, association…)",
          "La date souhaitée",
          "Le nombre de participants",
          "Les activités qui vous tentent : bowling, billard, fléchettes, restauration",
          "Votre budget, si vous en avez un",
        ]}
        template={"Bonjour Le Jungle !\nNous aimerions organiser [type d’événement] le [date] pour [nombre] personnes.\nActivités souhaitées : [bowling / billard / fléchettes / restauration].\nBudget envisagé : [facultatif].\nMerci !"}
      />
    </>
  );
}
