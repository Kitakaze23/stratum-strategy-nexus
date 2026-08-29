import { trackCtaClick } from "@/analytics/events";
import { useSectionView } from "@/analytics/hooks";

import { Cta, Reveal } from "./primitives";
import { HeroFigure } from "./HeroFigure";

export function Hero() {
  const sectionRef = useSectionView<HTMLElement>("hero");

  return (
    <section ref={sectionRef} id="top" className="border-b border-border pt-[76px]">
      <div className="container-page grid gap-16 py-24 md:py-[7.5rem] lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow">Independent Strategic Advisory</p>
            <h1 className="mt-6 text-[2.125rem] font-semibold leading-[1.14] md:text-[3.125rem]">
              Помогаем принимать сложные продуктовые решения до того, как они становятся
              дорогостоящими ошибками
            </h1>
            <p className="mt-7 max-w-[600px] text-lg leading-[1.75] text-muted-foreground">
              Независимая продуктовая экспертиза для стартапов, технологических компаний, крупного
              бизнеса и промышленных предприятий. Product Discovery, стратегический аудит, AI и
              аналитика для принятия более обоснованных решений.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-10 flex flex-wrap gap-3">
            <Cta asChild>
              <a href="#contact" onClick={() => trackCtaClick("discuss_task", "hero")}>
                Обсудить задачу
              </a>
            </Cta>
            <Cta asChild variant="secondary">
              <a href="#contact" onClick={() => trackCtaClick("independent_opinion", "hero")}>
                Получить независимое мнение
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

      <div className="container-page">
        <div className="border-t border-border py-14">
          <p className="text-[1.5rem] font-semibold leading-[1.3] md:text-[2rem]">
            Better Decisions. Better Products.
          </p>
        </div>
      </div>

    </section>
  );
}
