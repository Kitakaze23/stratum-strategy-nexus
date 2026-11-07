import { useSection } from "@/content/useSiteContent";

import { Eyebrow, HomeSection, Lead, SectionTitle } from "./shared";

export function Approach() {
  const c = useSection("homeApproach");

  return (
    <HomeSection id="approach" trackId="process" labelledBy="approach-title">
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <SectionTitle id="approach-title">{c.title}</SectionTitle>
        </div>
        {c.description ? (
          <Lead className="lg:col-span-6 lg:col-start-7 lg:mt-auto">{c.description}</Lead>
        ) : null}
      </div>

      <ol className="mt-14 grid md:grid-cols-2 lg:grid-cols-5 lg:gap-x-8">
        {c.steps.map((step, i) => (
          <li
            key={i}
            className="relative grid grid-cols-[3rem_minmax(0,1fr)] border-t border-border py-7 md:pr-6 lg:block lg:pr-0"
          >
            <span
              aria-hidden="true"
              className="absolute -top-px left-0 h-[2px] w-10 bg-primary lg:w-12"
            />
            <span className="font-serif text-xl text-signal tabular-nums lg:block lg:text-2xl">
              <span className="sr-only">Этап </span>
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="lg:mt-6">
              <h3 className="text-base font-semibold leading-[1.4] md:text-[1.0625rem]">
                {step.title}
              </h3>
              <p className="mt-2.5 text-[0.9375rem] leading-[1.65] text-muted-foreground">
                {step.text}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </HomeSection>
  );
}
