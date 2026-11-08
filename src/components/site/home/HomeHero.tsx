import { trackExpressCta } from "@/analytics/events";
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
      <div className="container-page grid gap-12 py-12 md:py-16 lg:grid-cols-12 lg:gap-10 lg:pt-14 lg:pb-12">
        <div className="lg:col-span-7 lg:pr-6">
          {c.slogan ? (
            <div className="flex gap-3">
              <span aria-hidden="true" className="mt-[0.6rem] h-px w-8 shrink-0 bg-signal" />
              <p>
                <span className="block text-[0.9375rem] font-semibold text-primary">
                  {c.slogan}
                </span>
                {c.sloganEn ? (
                  <span
                    lang="en"
                    className="mt-0.5 block text-xs tracking-[0.04em] text-muted-foreground"
                  >
                    {c.sloganEn}
                  </span>
                ) : null}
              </p>
            </div>
          ) : null}
          <h1
            id="hero-title"
            className={`${c.slogan ? "mt-7" : ""} font-serif text-[2.125rem] font-medium leading-[1.1] sm:text-[2.75rem] lg:text-[3rem]`}
          >
            {c.title}
          </h1>
          {c.points?.length ? (
            <ul className="mt-8 max-w-[640px] space-y-3">
              {c.points.map((p, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 text-lg leading-[1.5] text-foreground md:text-xl"
                >
                  <span aria-hidden="true" className="mt-[0.75em] h-px w-5 shrink-0 bg-signal" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          ) : c.subtitle ? (
            <p className="mt-7 max-w-[640px] text-lg leading-[1.65] text-muted-foreground md:text-xl">
              {c.subtitle}
            </p>
          ) : null}

          <div className="mt-10">
            <Cta asChild className="h-auto min-h-14 px-7 py-3 text-base">
              <a href="#contact" onClick={() => trackExpressCta("hero")}>
                {c.cta}
                {c.ctaPrice ? (
                  <span className="font-normal opacity-80">&nbsp;— {c.ctaPrice}</span>
                ) : null}
              </a>
            </Cta>
          </div>

          {c.heroNote ? (
            <p className="mt-7 max-w-[640px] border-l-2 border-signal pl-5 text-[0.9375rem] leading-[1.65] text-foreground/80">
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
        ) : (
          <div
            aria-hidden="true"
            className="hidden items-center justify-center lg:col-span-5 lg:flex"
          >
            <img
              src="/hero-layers.svg"
              alt=""
              width={600}
              height={600}
              className="h-auto w-full max-w-[560px]"
              fetchPriority="high"
            />
          </div>
        )}
      </div>
    </section>
  );
}
