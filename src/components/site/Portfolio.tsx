import { PORTFOLIO_CASES } from "@/data/portfolio";

import { Reveal, Section, SectionHead } from "./primitives";

export function Portfolio() {
  return (
    <Section id="portfolio" labelledBy="portfolio-title" trackId="portfolio">
      <SectionHead
        id="portfolio-title"
        eyebrow="Опыт"
        title="Кейсы"
        description="Результаты, подтвержденые данными."
      />

      <div className="mt-16 grid gap-6 lg:grid-cols-2">
        {PORTFOLIO_CASES.map((item, index) => (
          <Reveal key={item.id} delay={index * 0.05}>
            <article className="flex h-full flex-col rounded-[14px] border border-border bg-card p-8 shadow-card md:p-10">
              <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                {item.client}
              </p>
              <h3 className="mt-4 text-xl font-semibold leading-[1.3]">{item.domain}</h3>

              <dl className="mt-7 space-y-5 text-[0.9375rem] leading-[1.7]">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                    Задача
                  </dt>
                  <dd className="mt-2 text-muted-foreground">{item.challenge}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                    Что сделали
                  </dt>
                  <dd className="mt-2 text-muted-foreground">{item.work}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                    Результат
                  </dt>
                  <dd className="mt-2 text-foreground/85">{item.outcome}</dd>
                </div>
              </dl>

              {item.metrics.length > 0 ? (
                <ul className="mt-auto grid gap-4 border-t border-border pt-7 sm:grid-cols-3">
                  {item.metrics.map((metric) => (
                    <li key={metric.label}>
                      <p className="text-xl font-semibold text-primary">{metric.value}</p>
                      <p className="mt-1 text-[0.8125rem] leading-[1.5] text-muted-foreground">
                        {metric.label}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
