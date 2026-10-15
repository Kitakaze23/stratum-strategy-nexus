import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";

import { trackCtaClick, trackEvent } from "@/analytics/events";
import { useSection } from "@/content/useSiteContent";

import { Cta, Reveal, Section, SectionHead } from "./primitives";

/** Stable analytics ids per "other service" card, by position. */
const OTHER_TRACKING = [
  { ctaName: "digital_ai_advisory", event: "digital_ai_advisory_click" },
  { ctaName: "technology_due_diligence", event: "digital_due_diligence_click" },
  { ctaName: "enterprise_analytics", event: "enterprise_analytics_click" },
  { ctaName: "legal_ip", event: "legal_ip_click" },
] as const;

export function Services() {
  const c = useSection("services");
  return (
    <Section id="services" tone="surface" labelledBy="services-title" trackId="services">
      <SectionHead id="services-title" eyebrow={c.eyebrow} title={c.title} description={c.description || undefined} />

      {/* Ситуации */}
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {c.situations.map((s, i) => (
          <Reveal key={i} delay={i * 0.05} className="h-full">
            <article className="h-full rounded-[14px] border border-border bg-card p-7 shadow-card">
              <p className="text-sm font-semibold tabular-nums text-primary">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-4 text-lg font-semibold leading-[1.3]">{s.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-[1.65] text-muted-foreground">{s.text}</p>
            </article>
          </Reveal>
        ))}
      </div>

      {/* Главная услуга */}
      <div className="mt-20 rounded-[14px] border-2 border-primary bg-card p-8 shadow-card md:p-12">
        <Reveal>
          <p className="eyebrow">{c.mainEyebrow}</p>
          <h3 className="mt-4 text-2xl font-semibold leading-[1.2] md:text-[2.25rem]">{c.mainTitle}</h3>
          {c.mainEnglish ? <p className="mt-2 text-sm font-medium text-primary">{c.mainEnglish}</p> : null}
          <p className="mt-6 max-w-[760px] text-[1.0625rem] leading-[1.75] text-muted-foreground">{c.mainText}</p>
        </Reveal>

        <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {c.mainSteps.map((step, i) => (
            <li key={i} className="border-l-2 border-primary pl-6">
              <p className="text-sm font-semibold tabular-nums text-primary">{String(i + 1).padStart(2, "0")}</p>
              <h4 className="mt-2 text-base font-semibold">{step.title}</h4>
              <p className="mt-2 text-[0.9375rem] leading-[1.65] text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-14 border-t border-border pt-10">
          <h4 className="text-xl font-semibold">{c.mainOutcomesTitle}</h4>
          <ul className="mt-6 grid gap-x-10 gap-y-5 md:grid-cols-2">
            {c.mainOutcomes.map((o, i) => (
              <li key={i} className="flex gap-3">
                <Check className="mt-1 h-4 w-4 shrink-0 text-primary" strokeWidth={1.75} aria-hidden="true" />
                <span className="text-[0.9375rem] leading-[1.6]">
                  <span className="font-semibold">{o.title}</span>
                  <span className="text-muted-foreground"> — {o.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 grid gap-10 border-t border-border pt-10 md:grid-cols-2">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">{c.whenTitle}</h4>
            <ul className="mt-4 space-y-3 text-[0.9375rem] leading-[1.55]">
              {c.when.map((t, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">{c.audienceTitle}</h4>
            <ul className="mt-4 space-y-3 text-[0.9375rem] leading-[1.55]">
              {c.audience.map((t, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 rounded-[10px] bg-accent p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">Результат</p>
          <p className="mt-3 text-[1.0625rem] leading-[1.65]">{c.mainResult}</p>
        </div>
        <Cta asChild className="mt-8">
          <a
            href="#contact"
            onClick={() => {
              trackCtaClick("digital_ai_assessment", "services_main");
              trackEvent("digital_review_predev_click", { location: "services_main" });
            }}
          >
            {c.mainCta}
          </a>
        </Cta>
      </div>

      {/* AI */}
      <div className="mt-20 grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <p className="eyebrow">{c.aiEyebrow}</p>
          <h3 className="mt-4 text-2xl font-semibold leading-[1.25] md:text-[2rem]">{c.aiTitle}</h3>
          <p className="mt-5 text-[1.0625rem] leading-[1.75] text-muted-foreground">{c.aiText}</p>
        </Reveal>
        <Reveal delay={0.05} className="lg:col-span-5">
          <ul className="divide-y divide-border rounded-[14px] border border-border bg-card px-6">
            {c.aiAreas.map((a, i) => (
              <li key={i} className="flex gap-3 py-4 text-[0.9375rem] leading-[1.55]">
                <Check className="mt-1 h-4 w-4 shrink-0 text-primary" strokeWidth={1.75} aria-hidden="true" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* Другие услуги */}
      <div className="mt-20 border-t border-border pt-16">
        <Reveal>
          <p className="eyebrow">{c.otherEyebrow}</p>
          <h3 className="mt-4 text-2xl font-semibold leading-[1.25] md:text-[2rem]">{c.otherTitle}</h3>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {c.otherServices.map((s, i) => {
            const tracking = OTHER_TRACKING[i] ?? { ctaName: `other_service_${i + 1}`, event: "service_click" };
            const onClick = () => {
              trackCtaClick(tracking.ctaName, "services_other");
              trackEvent(tracking.event, { location: "services_other" });
            };
            return (
              <Reveal key={i} delay={i * 0.05} className="h-full">
                <article className="flex h-full flex-col rounded-[14px] border border-border bg-card p-8">
                  <h4 className="text-lg font-semibold">{s.title}</h4>
                  <p className="mt-3 text-[0.9375rem] leading-[1.7] text-muted-foreground">{s.text}</p>
                  <div className="mt-6 md:mt-auto md:pt-6">
                    {s.link ? (
                      <Link
                        to={s.link}
                        onClick={onClick}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline"
                      >
                        {s.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    ) : (
                      <a
                        href="#contact"
                        onClick={onClick}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline"
                      >
                        {s.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* ТЗ */}
      <div className="mt-20 rounded-[14px] border border-border bg-card p-8 md:p-12">
        <Reveal>
          <p className="eyebrow">Дополнительно</p>
          <h3 className="mt-4 text-2xl font-semibold leading-[1.25] md:text-[2rem]">{c.tzTitle}</h3>
        </Reveal>
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {c.tzItems.map((item, index) => (
            <div key={index} className="border-l-2 border-primary pl-6">
              <h4 className="text-lg font-semibold">{item.title}</h4>
              <p className="mt-3 text-[0.9375rem] leading-[1.7] text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-sm leading-[1.7] text-muted-foreground">{c.tzDisclaimer}</p>
        <Cta asChild variant="secondary" className="mt-8">
          <a
            href="#contact"
            onClick={() => {
              trackCtaClick("technical_specification", "services_tz_block");
              trackEvent("technical_specification_click", { location: "services_tz_block" });
            }}
          >
            Обсудить подготовку ТЗ
          </a>
        </Cta>
      </div>
    </Section>
  );
}
