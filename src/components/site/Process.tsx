import { useSection } from "@/content/useSiteContent";
import { Reveal, Section, SectionHead } from "./primitives";

export function Process() {
  const c = useSection("process");
  return (
    <Section id="process" tone="surface" labelledBy="process-title" trackId="process">
      <SectionHead
        id="process-title"
        eyebrow={c.eyebrow}
        title={c.title}
        description={c.description}
      />

      <div className="relative mt-16">
        <span
          aria-hidden="true"
          className="absolute left-0 right-0 top-[5px] hidden h-px bg-border lg:block"
        />
        <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {c.steps.map((item, index) => (
            <Reveal key={index} delay={index * 0.05}>
              <li className="relative">
                <span aria-hidden="true" className="block h-[11px] w-[11px] rounded-full bg-primary" />
                <p className="mt-6 text-sm font-semibold tabular-nums text-primary">{item.step}</p>
                <h3 className="mt-2 text-base font-semibold">{item.title}</h3>
                {item.meta ? <p className="mt-1 text-sm font-medium text-primary">{item.meta}</p> : null}
                <p className="mt-3 text-[0.9375rem] leading-[1.7] text-muted-foreground">{item.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
