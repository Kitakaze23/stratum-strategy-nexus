import { Check } from "lucide-react";

import { trackCtaClick, trackEvent } from "@/analytics/events";
import { useSection } from "@/content/useSiteContent";

import { Cta, Reveal, Section, SectionHead } from "./primitives";

const SITUATION_TRACKING = [
  { ctaName: "digital_review_predev", event: "digital_review_predev_click" },
  { ctaName: "digital_review_vendor", event: "digital_review_vendor_click" },
  { ctaName: "digital_due_diligence", event: "digital_due_diligence_click" },
] as const;

export function Services() {
  const c = useSection("services");
  return (
    <Section id="services" tone="surface" labelledBy="services-title" trackId="services">
      <SectionHead
        id="services-title"
        eyebrow={c.eyebrow}
        title={c.title}
        description={c.description}
      />
      <div className="mt-16 grid gap-6 lg:grid-cols-3">
        {c.situations.map((situation, index) => {
          const tracking = SITUATION_TRACKING[index] ?? SITUATION_TRACKING[0];
          return (
          <Reveal key={index} delay={index * 0.05} className="h-full">
            <article className="flex h-full flex-col rounded-[14px] border border-border bg-card p-8 shadow-card">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">{situation.eyebrow}</p>
              <h3 className="mt-5 text-xl font-semibold leading-[1.3]">{situation.title}</h3>
              <p className="mt-4 text-[0.9375rem] leading-[1.7] text-muted-foreground">{situation.text}</p>
              <p className="mt-7 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">Что проверяем</p>
              <ul className="mt-4 space-y-3 text-[0.9375rem] leading-[1.55] text-muted-foreground">
                {situation.checks.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-primary" strokeWidth={1.75} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 border-t border-border pt-6 lg:mt-auto">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">Результат</p>
                <p className="mt-3 text-[0.9375rem] leading-[1.65]">{situation.result}</p>
                <Cta asChild variant={index === 1 ? "primary" : "secondary"} className="mt-7 w-full px-4">
                  <a
                    href="#contact"
                    onClick={() => {
                      trackCtaClick(tracking.ctaName, "services");
                      trackEvent(tracking.event, { location: "services" });
                    }}
                  >
                    {situation.cta}
                  </a>
                </Cta>
              </div>
            </article>
          </Reveal>
          );
        })}
      </div>

      <div className="mt-20 border-t border-border pt-16">
        <Reveal className="measure">
          <h3 className="text-2xl font-semibold leading-[1.25] md:text-[2rem]">
            {c.outputsTitle}
          </h3>
          <p className="mt-5 text-[1.0625rem] leading-[1.75] text-muted-foreground">
            {c.outputsText}
          </p>
        </Reveal>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {c.outputs.map((item, index) => (
            <Reveal key={index} delay={index * 0.05}>
              <div className="border-l-2 border-primary pl-6">
                <h4 className="text-lg font-semibold">{item.title}</h4>
                <p className="mt-3 text-[0.9375rem] leading-[1.7] text-muted-foreground">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
