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

              {s.price ? (
                <p className="mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-1 border-t border-border pt-5 lg:mt-auto">
                  <span className="font-serif text-2xl text-primary tabular-nums">{s.price}</span>
                  {s.duration ? (
                    <span className="text-sm text-muted-foreground">срок {s.duration}</span>
                  ) : null}
                </p>
              ) : null}

              <div
                className={
                  s.price
                    ? "mt-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7"
                    : "mt-9 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7 lg:mt-auto lg:pt-9"
                }
              >
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

      {c.starter ? <StarterOffer offer={c.starter} /> : null}

      {c.pricingNote ? (
        <p className="mt-8 max-w-[760px] text-[0.9375rem] leading-[1.7] text-muted-foreground">
          {c.pricingNote}
        </p>
      ) : null}
    </HomeSection>
  );
}

type Starter = {
  eyebrow: string;
  title: string;
  text: string;
  items: string[];
  result: string;
  price: string;
  duration: string;
  note: string;
  cta: string;
};

/** Entry product with a fixed price: a small, low-risk first step. */
function StarterOffer({ offer }: { offer: Starter }) {
  return (
    <aside
      aria-labelledby="starter-offer-title"
      className="mt-6 grid gap-8 border border-border bg-background p-7 sm:p-9 lg:grid-cols-12 lg:gap-10 lg:p-11"
    >
      <div className="lg:col-span-7">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-signal">
          {offer.eyebrow}
        </p>
        <h3
          id="starter-offer-title"
          className="mt-4 font-serif text-[1.5rem] font-medium leading-[1.25] md:text-[1.75rem]"
        >
          {offer.title}
        </h3>
        <p className="mt-4 text-[1rem] leading-[1.65] text-foreground/85">{offer.text}</p>
        <ul className="mt-6 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
          {offer.items.map((item, k) => (
            <li
              key={k}
              className="grid grid-cols-[1rem_minmax(0,1fr)] gap-2 text-[0.9375rem] leading-[1.6]"
            >
              <span aria-hidden="true" className="mt-[0.7em] h-px w-2.5 bg-primary/60" />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[0.9375rem] leading-[1.65] text-muted-foreground">{offer.result}</p>
      </div>
      <div className="flex flex-col justify-between gap-6 border-t border-border pt-7 lg:col-span-4 lg:col-start-9 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
        <div>
          <p className="font-serif text-[2.5rem] leading-none text-primary tabular-nums">
            {offer.price}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">{offer.duration}</p>
          <p className="mt-5 text-sm leading-[1.6] text-muted-foreground">{offer.note}</p>
        </div>
        <Cta asChild className="w-full">
          <a
            href="#contact"
            onClick={() => {
              trackCtaClick("starter_offer", "services_starter");
              trackEvent("starter_offer_click", { location: "services_starter" });
            }}
          >
            {offer.cta}
          </a>
        </Cta>
      </div>
    </aside>
  );
}
