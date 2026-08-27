import { Check } from "lucide-react";
import { useState } from "react";

import { trackCtaClick, trackEvent, trackFunnelClick } from "@/analytics/events";
import { useSectionView } from "@/analytics/hooks";
import { PRICING_FORMATS, PRICING_NOTE } from "@/data/pricing";
import { cn } from "@/lib/utils";

import { QuestionDialog } from "./QuestionDialog";
import { Cta, Reveal, Section, SectionHead } from "./primitives";

export function Pricing() {
  const [questionOpen, setQuestionOpen] = useState(false);
  const entryRef = useSectionView<HTMLDivElement>("ask_question_card");

  return (
    <Section id="pricing" tone="surface" labelledBy="pricing-title" trackId="consultation_formats">
      <SectionHead
        id="pricing-title"
        eyebrow="Форматы"
        title="Форматы консультаций"
        description="Начать можно с одного вопроса — и двигаться дальше по мере того, как становится понятна сложность задачи. Если требуется предварительное изучение материалов или участие нескольких заинтересованных сторон, итоговая стоимость определяется индивидуально."
      />

      <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
        {PRICING_FORMATS.map((format, index) => (
          <Reveal key={format.title} delay={index * 0.05} className="h-full">
            <div ref={format.entry ? entryRef : undefined} className="h-full">
            <article
              className={cn(
                "flex h-full flex-col rounded-[14px] p-8 shadow-card xl:p-7 transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-lg",
                format.entry
                  ? "border border-dashed border-primary/50 bg-accent/40"
                  : format.recommended
                    ? "border-2 border-primary bg-card"
                    : "border border-border bg-card",
              )}
            >
              {format.entry ? (
                <p className="mb-5 inline-flex w-fit rounded-full border border-primary/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-primary">
                  С чего начать
                </p>
              ) : null}
              {format.recommended ? (
                <p className="mb-5 inline-flex w-fit rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-primary">
                  Рекомендуем
                </p>
              ) : null}
              <h3 className="text-lg font-semibold">{format.title}</h3>
              <p className="mt-1 text-sm leading-[1.6] text-muted-foreground">{format.duration}</p>

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
                {format.entry ? (
                  <Cta
                    variant="secondary"
                    className="mt-6 h-12 w-full whitespace-nowrap px-4 text-sm"
                    onClick={() => {
                      trackCtaClick(format.ctaName, "pricing");
                      trackEvent("ask_question_click", { location: "pricing", source: "pricing" });
                      setQuestionOpen(true);
                    }}
                  >
                    {format.cta}
                  </Cta>
                ) : (
                  <Cta
                    asChild
                    variant={format.recommended ? "primary" : "secondary"}
                    className="mt-6 h-12 w-full px-5 text-sm"
                  >
                    <a
                      href="#contact"
                      onClick={() => {
                        trackCtaClick(format.ctaName, "pricing");
                        if (format.ctaName === "product_review") trackFunnelClick("product_review", "pricing");
                      }}
                    >
                      {format.cta}
                    </a>
                  </Cta>
                )}
              </div>
            </article>
            </div>
          </Reveal>
        ))}
      </div>

      <QuestionDialog open={questionOpen} onOpenChange={setQuestionOpen} />


      <Reveal delay={0.1}>
        <p className="mt-12 max-w-[760px] border-l-2 border-primary pl-6 text-[0.9375rem] leading-[1.7] text-muted-foreground">
          {PRICING_NOTE}
        </p>
      </Reveal>
    </Section>
  );
}
