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
          </Reveal>

          <Reveal delay={0.08} className="mt-10 flex flex-wrap gap-3">
            <Cta asChild>
              <a href="#contact" onClick={() => trackCtaClick("discuss_task", "hero")}>
                {c.ctaPrimary}
              </a>
            </Cta>
            <Cta asChild variant="secondary">
              <a href="#contact" onClick={() => trackCtaClick("independent_opinion", "hero")}>
                {c.ctaSecondary}
              </a>
            </Cta>
          </Reveal>
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
