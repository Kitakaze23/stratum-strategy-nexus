import { trackCtaClick } from "@/analytics/events";
import { useSectionView } from "@/analytics/hooks";
import { useSection } from "@/content/useSiteContent";

import { Cta } from "../primitives";

export function HomeHero() {
  const ref = useSectionView<HTMLElement>("hero");
  const c = useSection("homeHero");

  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-title"
      className="border-b border-border pt-[76px]"
    >
      <div className="container-page grid gap-14 py-14 md:py-20 lg:grid-cols-12 lg:gap-10 lg:py-24">
        <div className="lg:col-span-7 lg:pr-6">
          <p className="flex items-center gap-3 text-sm font-semibold tracking-[0.02em] text-primary">
            <span aria-hidden="true" className="h-px w-8 bg-signal" />
            {c.slogan}
          </p>
          <h1
            id="hero-title"
            className="mt-7 font-serif text-[2.125rem] font-medium leading-[1.1] sm:text-[2.75rem] lg:text-[3.25rem]"
          >
            {c.title}
          </h1>
          <p className="mt-7 max-w-[640px] text-lg leading-[1.65] text-muted-foreground md:text-xl">
            {c.subtitle}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Cta asChild>
              <a href="#contact" onClick={() => trackCtaClick("discuss_task", "hero")}>
                {c.ctaPrimary}
              </a>
            </Cta>
            <Cta asChild variant="secondary">
              <a href="#services" onClick={() => trackCtaClick("view_services", "hero")}>
                {c.ctaSecondary}
              </a>
            </Cta>
          </div>

          {c.heroNote ? (
            <p className="mt-12 max-w-[640px] border-l-2 border-signal pl-5 text-[0.9375rem] leading-[1.65] text-foreground/80">
              {c.heroNote}
            </p>
          ) : null}
        </div>

        {c.questions?.length ? (
          <aside
            aria-labelledby="hero-questions"
            className="self-center border-t border-border pt-10 lg:col-span-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10"
          >
            <h2
              id="hero-questions"
              className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground"
            >
              {c.questionsTitle}
            </h2>
            <ol className="mt-6 divide-y divide-border border-y border-border">
              {c.questions.map((q, i) => (
                <li key={i} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3 py-5">
                  <span
                    aria-hidden="true"
                    className="font-serif text-xl leading-[1.35] text-signal tabular-nums"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[1.0625rem] leading-[1.5] text-foreground">{q}</span>
                </li>
              ))}
            </ol>
          </aside>
        ) : null}
      </div>
    </section>
  );
}
