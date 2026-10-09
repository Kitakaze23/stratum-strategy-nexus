import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSection } from "@/content/useSiteContent";

import { Section, SectionHead } from "./primitives";

export function Faq() {
  const c = useSection("faq");
  return (
    <Section id="faq" labelledBy="faq-title" trackId="faq">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHead
            id="faq-title"
            eyebrow={c.eyebrow}
            title={c.title}
            description={c.description}
          />
        </div>

        <div className="lg:col-span-7">
          <Accordion type="single" collapsible className="border-t border-border">
            {c.items.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
                <AccordionTrigger className="py-6 text-left text-base font-semibold hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-[0.9375rem] leading-[1.7] text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </Section>
  );
}
