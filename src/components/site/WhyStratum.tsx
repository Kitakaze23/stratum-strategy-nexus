import { useSection } from "@/content/useSiteContent";

import { Reveal, Section, SectionHead } from "./primitives";

export function WhyStratum() {
  const c = useSection("why");
  return (
    <Section id="why" tone="navy" labelledBy="why-title" trackId="why_stratum">
      <SectionHead id="why-title" eyebrow={c.eyebrow} title={c.title} tone="navy" />
      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {c.items.map((block, index) => (
          <Reveal key={index} delay={index * 0.05}>
            <article className="h-full rounded-[14px] border border-navy-foreground/15 bg-navy-foreground/[0.04] p-8 md:p-10">
              <h3 className="text-xl font-semibold">{block.title}</h3>
              <p className="mt-4 text-[0.9375rem] leading-[1.75] text-navy-foreground/75">{block.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
