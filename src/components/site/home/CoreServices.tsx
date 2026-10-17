import { Link } from "@tanstack/react-router";

import { trackCtaClick, trackEvent, trackServiceClick } from "@/analytics/events";
import { useSection } from "@/content/useSiteContent";

import { Cta } from "../primitives";
import { ArrowLink, Eyebrow, HomeSection, Lead, SectionTitle } from "./shared";

/** Stable analytics ids per core service, by position (kept from the previous page). */
const TRACKING = [
  { location: "services_assessment", event: "digital_review_predev_click" },
  { location: "services_specification", event: "technical_specification_click" },
] as const;

export function CoreServices() {
  const c = useSection("homeServices");

  return (
    <HomeSection id="services" trackId="services" labelledBy="services-title" tone="surface">
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <SectionTitle id="services-title">{c.title}</SectionTitle>
        </div>
        {c.description ? <Lead className="lg:col-span-5 lg:mt-auto">{c.description}</Lead> : null}
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        {c.items.map((s, i) => {
          const tracking = TRACKING[i] ?? {
            location: `services_core_${i + 1}`,
            event: "service_click",
          };
          const titleId = `core-service-${i + 1}`;
          return (
            <article
              key={i}
              aria-labelledby={titleId}
              className="flex flex-col border border-border border-t-2 border-t-primary bg-background p-7 sm:p-9 lg:p-11"
            >
              <div className="flex items-baseline justify-between gap-4 border-b border-border pb-5">
                <span className="font-serif text-2xl text-signal tabular-nums" aria-hidden="true">
                  {s.number}
                </span>
                <span
                  lang="en"
                  className="text-right text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground"
                >
                  {s.english}
                </span>
              </div>

              <h3
                id={titleId}
                className="mt-7 font-serif text-[1.75rem] font-medium leading-[1.2] md:text-[2rem]"
              >
                {s.title}
              </h3>
              <p className="mt-4 text-[1.0625rem] leading-[1.65] text-foreground/85">{s.lead}</p>

              <dl className="mt-8 space-y-7">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    {s.whenTitle}
                  </dt>
                  <dd className="mt-3 text-[0.9375rem] leading-[1.7]">{s.when}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    {s.doTitle}
                  </dt>
                  <dd className="mt-3">
                    <ul className="space-y-2.5">
                      {s.actions.map((a, k) => (
                        <li
                          key={k}
                          className="grid grid-cols-[1rem_minmax(0,1fr)] gap-2 text-[0.9375rem] leading-[1.6]"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-[0.7em] h-px w-2.5 bg-primary/60"
                          />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div className="border-l-2 border-signal bg-surface px-5 py-4">
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                    {s.resultTitle}
                  </dt>
                  <dd className="mt-2 text-[0.9375rem] leading-[1.7]">{s.result}</dd>
                </div>
              </dl>

              <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7 lg:mt-auto lg:pt-9">
                <Cta asChild className="w-full sm:w-auto">
                  <a
                    href="#contact"
                    onClick={() => {
                      trackCtaClick("discuss_task", tracking.location);
                      trackEvent(tracking.event, { location: tracking.location });
                    }}
                  >
                    {s.cta}
                  </a>
                </Cta>
                {s.link ? (
                  <Link
                    to={s.link}
                    onClick={() =>
                      trackServiceClick(s.link.split("/").pop() ?? "", "services_core")
                    }
                    className="group inline-flex text-primary underline-offset-4 hover:underline"
                  >
                    <ArrowLink>{s.linkLabel}</ArrowLink>
                  </Link>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>

      {c.pricingNote ? (
        <p className="mt-8 max-w-[760px] text-[0.9375rem] leading-[1.7] text-muted-foreground">
          {c.pricingNote}
        </p>
      ) : null}
    </HomeSection>
  );
}
