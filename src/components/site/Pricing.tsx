import { Check } from "lucide-react";

import { PRICING_FORMATS, PRICING_NOTE } from "@/data/pricing";
import { cn } from "@/lib/utils";

import { Cta, Reveal, Section, SectionHead } from "./primitives";

export function Pricing() {
  return (
    <Section id="pricing" tone="surface" labelledBy="pricing-title">
      <SectionHead
        id="pricing-title"
        eyebrow="Форматы"
        title="Форматы консультаций"
        description="Каждая консультация начинается с понимания задачи. Если требуется предварительное изучение материалов или участие нескольких заинтересованных сторон, итоговая стоимость определяется индивидуально."
      />

      <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {PRICING_FORMATS.map((format, index) => (
          <Reveal key={format.title} delay={index * 0.05} className="h-full">
            <article
              className={cn(
                "flex h-full flex-col rounded-[14px] bg-card p-8 shadow-card transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-lg",
                format.recommended ? "border-2 border-primary" : "border border-border",
              )}
            >
              {format.recommended ? (
                <p className="mb-5 inline-flex w-fit rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-primary">
                  Рекомендуем
                </p>
              ) : null}
              <h3 className="text-lg font-semibold">{format.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{format.duration}</p>

              <p className="mt-7 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                {format.listLabel}
              </p>
              <ul className="mt-4 space-y-3 pb-2 text-[0.9375rem] text-muted-foreground">
                {format.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-primary" strokeWidth={1.75} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-border pt-6 md:mt-auto">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">Стоимость</p>
                <p className="mt-2 text-xl font-semibold text-primary">{format.price}</p>
                <Cta
                  asChild
                  variant={format.recommended ? "primary" : "secondary"}
                  className="mt-6 h-12 w-full px-5 text-sm"
                >
                  <a href="#contact">{format.cta}</a>
                </Cta>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-12 max-w-[760px] border-l-2 border-primary pl-6 text-[0.9375rem] leading-[1.7] text-muted-foreground">
          {PRICING_NOTE}
        </p>
      </Reveal>
    </Section>
  );
}
