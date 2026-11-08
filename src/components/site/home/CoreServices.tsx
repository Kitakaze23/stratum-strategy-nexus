import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

import { trackExpressCta, trackServiceClick } from "@/analytics/events";
import { useSection } from "@/content/useSiteContent";

import { Cta } from "../primitives";
import { ArrowLink, Eyebrow, HomeSection, Lead, SectionTitle } from "./shared";

/**
 * Services: numbered service cards first, then the express check as the
 * highlighted "popular service" card below them.
 */
export function CoreServices() {
  const c = useSection("homeServices");
  const ex = c.express;

  return (
    <HomeSection id="services" trackId="core_services" labelledBy="services-title">
      <Eyebrow>{c.eyebrow}</Eyebrow>
      <SectionTitle id="services-title">{c.title}</SectionTitle>
      {c.description ? <Lead>{c.description}</Lead> : null}

      <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {c.items.map((s, i) => (
          <li
            key={i}
            className="flex flex-col rounded-[4px] border border-border bg-background p-6"
          >
            <span aria-hidden="true" className="font-serif text-lg text-signal tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 text-lg font-semibold leading-[1.35]">{s.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{s.name}</p>
            <p className="mt-4 text-[0.9375rem] leading-[1.6] text-foreground/85">{s.lead}</p>
            <p className="mt-auto pt-6 text-[0.9375rem] font-medium tabular-nums">{s.price}</p>
            {s.link ? (
              <Link
                to={s.link}
                onClick={() =>
                  trackServiceClick(s.link.split("/").pop() ?? `service_${i + 1}`, "core_services")
                }
                className="group mt-3 inline-flex text-primary underline-offset-4 hover:underline"
              >
                <ArrowLink className="text-sm">{s.linkLabel || "Подробнее"}</ArrowLink>
              </Link>
            ) : null}
          </li>
        ))}
      </ol>

      {ex ? (
        <article
          aria-labelledby="express-title"
          className="mt-6 grid gap-10 rounded-[4px] border border-primary border-t-4 bg-card p-7 shadow-card sm:p-10 lg:grid-cols-12 lg:gap-10 lg:p-12"
        >
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-signal">
              {ex.label}
            </p>
            <h3
              id="express-title"
              className="mt-4 font-serif text-[1.75rem] font-medium leading-[1.2] md:text-[2.125rem]"
            >
              {ex.title}
            </h3>
            <p className="mt-2 text-[0.9375rem] font-medium text-primary">{ex.name}</p>
            <p className="mt-5 text-[1.0625rem] leading-[1.65] text-foreground/85">{ex.lead}</p>
            <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {ex.items.map((item, i) => (
                <li
                  key={i}
                  className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-2 text-[0.9375rem] leading-[1.55]"
                >
                  <Check
                    className="mt-1 h-4 w-4 text-signal"
                    strokeWidth={2.25}
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-between gap-8 border-t border-border pt-8 lg:col-span-4 lg:col-start-9 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
            <div>
              <p className="font-serif text-[2.75rem] leading-none text-primary tabular-nums">
                {ex.price}
              </p>
              <p className="mt-3 text-[0.9375rem] text-foreground">{ex.duration}</p>
              <p className="mt-5 text-sm leading-[1.6] text-muted-foreground">{ex.note}</p>
            </div>
            <Cta asChild className="w-full">
              <a href="#contact" onClick={() => trackExpressCta("services")}>
                {ex.cta}
              </a>
            </Cta>
          </div>
        </article>
      ) : null}

      {c.pricingNote ? (
        <p className="mt-6 text-sm leading-[1.6] text-muted-foreground">{c.pricingNote}</p>
      ) : null}
    </HomeSection>
  );
}
