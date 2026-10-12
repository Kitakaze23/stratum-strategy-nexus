import { trackCtaClick, trackEvent } from "@/analytics/events";
import { useSection } from "@/content/useSiteContent";
import { Cta, Reveal, Section, SectionHead } from "./primitives";

const FORMAT_TRACKING = [
  { ctaName: "digital_review_predev", event: "digital_review_predev_click" },
  { ctaName: "technical_specification", event: "technical_specification_click" },
  { ctaName: "digital_review_vendor", event: "digital_review_vendor_click" },
  { ctaName: "digital_due_diligence", event: "digital_due_diligence_click" },
] as const;

export function Pricing() {
  const c = useSection("pricing");
  return (
    <Section id="pricing" tone="surface" labelledBy="pricing-title" trackId="consultation_formats">
      <SectionHead
        id="pricing-title"
        eyebrow={c.eyebrow}
        title={c.title}
        description={c.description}
      />

      <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {c.formats.map((format, index) => {
          const tracking = FORMAT_TRACKING[index] ?? FORMAT_TRACKING[0];
          return (
          <Reveal key={index} delay={index * 0.05} className="h-full">
            <article
              className={`flex h-full flex-col rounded-[14px] bg-card p-8 shadow-card transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-lg ${format.recommended ? "border-2 border-primary" : "border border-border"}`}
            >
              {format.recommended ? (
                <p className="mb-5 inline-flex w-fit rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-primary">
                  {c.recommendedBadge}
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
                      trackCtaClick(tracking.ctaName, "pricing");
                      trackEvent(tracking.event, { location: "pricing" });
                    }}
                  >
                    {format.cta}
                  </a>
                </Cta>
              </div>
            </article>
          </Reveal>
          );
        })}
      </div>
      <Reveal delay={0.1}>
        <p className="mt-12 max-w-[760px] border-l-2 border-primary pl-6 text-[0.9375rem] leading-[1.7] text-muted-foreground">
          {c.notePrefix}
          <a
            href="#contact"
            onClick={() => trackCtaClick("pricing_note_request", "pricing")}
            className="font-medium text-primary underline underline-offset-4"
          >
            {c.noteLink}
          </a>
          {c.noteSuffix}
        </p>
      </Reveal>
    </Section>
  );
}
