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
      <Glow color="lime" className="-right-40 -bottom-40 size-[40rem] opacity-60" />

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

      <div className="relative mt-10 md:mt-14">
        <ol
          className="container-jungle md:no-scrollbar md:flex md:snap-x md:snap-mandatory md:scroll-px-8 md:gap-4 md:overflow-x-auto md:pb-4 lg:grid lg:snap-none lg:gap-3 lg:overflow-visible"
          style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
          aria-label="Suggestion de déroulé"
        >
          {TIMELINE.map((step, i) => {
            const t = i / Math.max(1, n - 1);
            // Du doré (jour) au corail (soirée) — contraste garanti
            const color = `color-mix(in oklab, var(--color-gold) ${Math.round((1 - t) * 100)}%, var(--color-coral))`;
            const next = `color-mix(in oklab, var(--color-gold) ${Math.round((1 - (i + 1) / Math.max(1, n - 1)) * 100)}%, var(--color-coral))`;
            return (
              <li
                key={step.time}
                className="relative flex gap-5 pb-8 last:pb-0 md:block md:w-[15.5rem] md:shrink-0 md:snap-start md:pb-0 lg:w-auto"
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
              >
                {/* Ligne de temps : verticale sur mobile, horizontale au-delà */}
                <div aria-hidden className="relative flex shrink-0 flex-col items-center md:mb-6 md:flex-row">
                  <span
                    className="relative z-10 flex size-11 items-center justify-center rounded-full text-night shadow-[0_0_30px_-4px_var(--c)] md:size-12"
                    style={{ background: color, ["--c" as string]: color }}
                  >
                    <Icon name={step.icon} size={22} />
                  </span>
                  {i < n - 1 && (
                    <>
                      <span
                        className="absolute top-11 bottom-[-2rem] left-1/2 w-0.5 -translate-x-1/2 md:hidden"
                        style={{ background: `linear-gradient(180deg, ${color}, ${next})`, opacity: 0.55 }}
                      />
                      <span
                        className="absolute left-12 hidden h-0.5 w-[calc(100%-2rem)] md:block lg:w-[calc(100%-2.25rem)]"
                        style={{ background: `linear-gradient(90deg, ${color}, ${next})`, opacity: 0.6 }}
                      />
                    </>
                  )}
                </div>
                <div className="pt-1 md:pt-0">
                  <p className="font-display text-2xl leading-none font-semibold md:text-3xl md:leading-tight" style={{ color: i < n - 1 ? color : "var(--color-cream)" }}>
                    {step.time}
                  </p>
                  <h3 className="mt-1.5 font-sans text-base font-semibold text-cream md:mt-1">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-cream/70 md:mt-2">{step.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
        <p className="container-jungle mt-4 hidden items-center gap-2 text-xs text-cream/50 md:flex lg:hidden" aria-hidden>
          <Icon name="arrow-right" size={14} /> Faites défiler
        </p>
      </div>
    </section>
  );
}
