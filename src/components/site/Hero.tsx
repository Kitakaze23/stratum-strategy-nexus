import { trackCtaClick } from "@/analytics/events";
import { useSectionView } from "@/analytics/hooks";
import { useSection } from "@/content/useSiteContent";

import { Cta, Reveal } from "./primitives";
import { HeroFigure } from "./HeroFigure";

export function Hero() {
  const sectionRef = useSectionView<HTMLElement>("hero");
  const c = useSection("hero");

  return (
    <section ref={sectionRef} id="top" className="border-b border-border pt-[76px]">
      <div className="container-page grid gap-16 py-24 md:py-[7.5rem] lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow">{c.eyebrow}</p>
            <h1 className="mt-6 text-[2.125rem] font-semibold leading-[1.14] md:text-[3.125rem]">
              {c.title}
            </h1>
            <p className="mt-6 max-w-[600px] text-lg leading-[1.75] text-muted-foreground">
              {c.subtitle}
            </p>
            <p className="mt-6 text-[1.375rem] font-semibold leading-[1.35] text-primary md:text-[1.625rem]">
              {c.slogan}
            </p>
            {c.directions?.length ? (
              <ul className="mt-8 grid gap-x-6 gap-y-2 text-[0.9375rem] text-foreground sm:grid-cols-2">
                {c.directions.map((d, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    {d}
                  </li>
                ))}
              </ul>
            ) : null}
          </Reveal>

          <Reveal delay={0.08} className="mt-10 flex flex-wrap gap-3">
            <Cta asChild>
              <a href="#contact" onClick={() => trackCtaClick("discuss_project", "hero")}>
                {c.ctaPrimary}
              </a>
            </Cta>
            <Cta asChild variant="secondary">
              <a href="#services" onClick={() => trackCtaClick("view_services", "hero")}>
                {c.ctaSecondary}
              </a>
            </Cta>
          </Reveal>
          {c.heroNote ? (
            <Reveal delay={0.1}>
              <p className="mt-8 border-l-2 border-primary pl-4 text-[0.9375rem] leading-[1.6] text-muted-foreground">
                {c.heroNote}
              </p>
            </Reveal>
          ) : null}
        </div>

        <Reveal delay={0.12} className="lg:col-span-6">
          <div className="rounded-[14px] border border-border bg-background p-6 md:p-10">
            <HeroFigure />
          </div>
        </Reveal>
      </div>

    </section>
  );
}
