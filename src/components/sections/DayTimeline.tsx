import { Icon } from "@/components/ui/Icon";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Glow } from "@/components/decor/Foliage";
import { TIMELINE } from "@/data/timeline";

/**
 * Frise « Une journée au Jungle » : du goûter (doré, jour) à la soirée
 * (violet, nuit). Une simple suggestion d'expérience.
 */
export function DayTimeline() {
  const n = TIMELINE.length;
  return (
    <section aria-labelledby="journee-title" className="section-y relative overflow-hidden bg-deep">
      <Glow color="gold" className="-top-40 -left-40 size-[34rem] opacity-25" />
      <Glow color="purple" className="-right-40 -bottom-40 size-[40rem] opacity-60" />

      <div className="container-jungle relative">
        <SectionTitle
          id="journee-title"
          eyebrow="De 15 h à minuit"
          title={
            <>
              Une journée <span className="bg-gradient-to-r from-gold via-orange to-coral bg-clip-text text-transparent">au Jungle</span>
            </>
          }
          intro="Une idée parmi mille : composez votre propre expérience, à votre rythme, du goûter jusqu’à la soirée."
        />
      </div>

      <div className="relative mt-14">
        <ol
          className="no-scrollbar container-jungle flex snap-x snap-mandatory scroll-px-5 md:scroll-px-8 gap-4 overflow-x-auto pb-4 lg:grid lg:snap-none lg:gap-3 lg:overflow-visible"
          style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
          aria-label="Suggestion de déroulé"
          tabIndex={0}
        >
          {TIMELINE.map((step, i) => {
            const t = i / Math.max(1, n - 1);
            // Du doré (jour) au corail (soirée) — contraste garanti
            const color = `color-mix(in oklab, var(--color-gold) ${Math.round((1 - t) * 100)}%, var(--color-coral))`;
            return (
              <li
                key={step.time}
                className="relative w-[15.5rem] shrink-0 snap-start lg:w-auto"
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
              >
                {/* Ligne de temps */}
                <div aria-hidden className="relative mb-6 flex items-center">
                  <span
                    className="relative z-10 flex size-12 items-center justify-center rounded-full text-night shadow-[0_0_30px_-4px_var(--c)]"
                    style={{ background: color, ["--c" as string]: color }}
                  >
                    <Icon name={step.icon} size={24} />
                  </span>
                  {i < n - 1 && (
                    <span
                      className="absolute left-12 h-0.5 w-[calc(100%-2rem)] lg:w-[calc(100%-2.25rem)]"
                      style={{
                        background: `linear-gradient(90deg, ${color}, color-mix(in oklab, var(--color-gold) ${Math.round((1 - (i + 1) / (n - 1)) * 100)}%, var(--color-coral)))`,
                        opacity: 0.6,
                      }}
                    />
                  )}
                </div>
                <p className="font-display text-3xl font-semibold" style={{ color: i < n - 1 ? color : "var(--color-cream)" }}>
                  {step.time}
                </p>
                <h3 className="mt-1 font-sans text-base font-semibold text-cream">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/70">{step.text}</p>
              </li>
            );
          })}
        </ol>
        <p className="container-jungle mt-4 flex items-center gap-2 text-xs text-cream/50 lg:hidden" aria-hidden>
          <Icon name="arrow-right" size={14} /> Faites défiler
        </p>
      </div>
    </section>
  );
}
