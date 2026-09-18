import { trackCtaClick, trackEvent } from "@/analytics/events";
import {
  PRICING_FORMATS,
  PRICING_NOTE_LINK,
  PRICING_NOTE_PREFIX,
  PRICING_NOTE_SUFFIX,
} from "@/data/pricing";
import { Cta, Reveal, Section, SectionHead } from "./primitives";

export function Pricing() {
  return (
    <Section id="pricing" tone="surface" labelledBy="pricing-title" trackId="consultation_formats">
      <SectionHead
        id="pricing-title"
        eyebrow="Форматы"
        title="Форматы оценки"
        description="Стоимость указана от базового объёма и зависит от сложности проекта и состава материалов."
      />

      <div className="mt-16 grid gap-6 lg:grid-cols-3">
        {PRICING_FORMATS.map((format, index) => (
          <Reveal key={format.title} delay={index * 0.05} className="h-full">
            <article
              className={`flex h-full flex-col rounded-[14px] bg-card p-8 shadow-card transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-lg ${format.recommended ? "border-2 border-primary" : "border border-border"}`}
            >
              {format.recommended ? (
                <p className="mb-5 inline-flex w-fit rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-primary">
                  Частая задача
                </p>
              ) : null}
              <h3 className="text-xl font-semibold leading-[1.3]">{format.title}</h3>
              <p className="mt-7 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">Срок</p>
              <p className="mt-2 text-[0.9375rem]">{format.duration}</p>
              <p className="mt-7 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">Результат</p>
              <p className="mt-3 text-[0.9375rem] leading-[1.7] text-muted-foreground">{format.result}</p>

              <div className="mt-8 border-t border-border pt-6 md:mt-auto">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">Стоимость</p>
                <p className="mt-2 text-xl font-semibold text-primary">{format.price}</p>
                <Cta asChild variant={format.recommended ? "primary" : "secondary"} className="mt-6 h-12 w-full px-5 text-sm">
                  <a
                    href="#contact"
                    onClick={() => {
                      trackCtaClick(format.ctaName, "pricing");
                      const event = format.ctaName === "digital_review_predev"
                        ? "digital_review_predev_click"
                        : format.ctaName === "digital_review_vendor"
                          ? "digital_review_vendor_click"
                          : "digital_due_diligence_click";
                      trackEvent(event, { location: "pricing" });
                    }}
                  >
                    {format.cta}
                  </a>
                </Cta>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.1}>
        <p className="mt-12 max-w-[760px] border-l-2 border-primary pl-6 text-[0.9375rem] leading-[1.7] text-muted-foreground">
          {PRICING_NOTE_PREFIX}
          <a
            href="#contact"
            onClick={() => trackCtaClick("pricing_note_request", "pricing")}
            className="font-medium text-primary underline underline-offset-4"
          >
            {PRICING_NOTE_LINK}
          </a>
          {PRICING_NOTE_SUFFIX}
        </p>
      </Reveal>
    </Section>
  );
}
