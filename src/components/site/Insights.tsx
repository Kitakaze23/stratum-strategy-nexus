import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { trackCtaClick } from "@/analytics/events";
import { INSIGHTS } from "@/data/insights";

import { Reveal, Section, SectionHead } from "./primitives";

export function Insights() {
  return (
    <Section id="insights" tone="surface" labelledBy="insights-title" trackId="insights">
      <SectionHead
        id="insights-title"
        eyebrow="Статьи"
        title="Разборы реальных ситуаций"
        description="Короткие материалы по задачам, с которыми к нам чаще всего приходят: остановился рост, непонятен спрос, неясно, что развивать дальше."
      />

      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {INSIGHTS.map((article, index) => (
          <Reveal key={article.slug} delay={index * 0.04} className="h-full">
            <Link
              to="/insights/$slug"
              params={{ slug: article.slug }}
              onClick={() => trackCtaClick(`insight_${article.slug}`, "insights")}
              className="group flex h-full flex-col rounded-[14px] border border-border bg-card p-8 shadow-card transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
            >
              <p className="text-xs uppercase tracking-[0.1em] text-muted-foreground">
                {article.readingTime}
              </p>
              <h3 className="mt-4 text-lg font-semibold leading-[1.35]">{article.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-[1.7] text-muted-foreground">
                {article.excerpt}
              </p>
              <span className="mt-auto inline-flex items-center gap-2 pt-7 text-[0.9375rem] font-medium text-primary">
                Читать
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
