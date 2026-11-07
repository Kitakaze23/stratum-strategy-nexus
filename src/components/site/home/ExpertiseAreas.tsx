import { useSection } from "@/content/useSiteContent";

import { Eyebrow, HomeSection, Lead, SectionTitle } from "./shared";

export function ExpertiseAreas() {
  const c = useSection("homeExpertise");

  return (
    <HomeSection
      id="expertise"
      trackId="expertise"
      labelledBy="expertise-title"
      className="border-t border-border"
    >
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <SectionTitle id="expertise-title">{c.title}</SectionTitle>
        </div>
        {c.description ? (
          <Lead className="lg:col-span-6 lg:col-start-7 lg:mt-auto">{c.description}</Lead>
        ) : null}
      </div>

      <ul className="mt-12 border-b border-border">
        {c.areas.map((area, i) => (
          <li
            key={i}
            className="grid gap-3 border-t border-border py-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-baseline md:gap-8 md:px-4"
          >
            <span className="block">
              <span className="block text-lg font-semibold leading-[1.35] text-foreground">
                {area.title}
              </span>
              <span className="mt-1 block text-[0.9375rem] text-muted-foreground">
                {area.subtitle}
              </span>
            </span>
            <span className="block text-[0.9375rem] leading-[1.7] text-foreground/85">
              {area.text}
            </span>
          </li>
        ))}
      </ul>
      {c.also ? (
        <p className="mt-6 text-[0.9375rem] text-muted-foreground md:px-4">{c.also}</p>
      ) : null}

      <aside
        aria-labelledby="expertise-ai"
        className="mt-14 grid gap-8 border-l-2 border-signal bg-surface p-7 sm:p-10 lg:grid-cols-12 lg:gap-10 lg:p-12"
      >
        <div className="lg:col-span-5">
          <h3
            id="expertise-ai"
            className="font-serif text-2xl font-medium leading-[1.25] md:text-[1.75rem]"
          >
            {c.aiTitle}
          </h3>
          <p className="mt-4 text-[0.9375rem] leading-[1.7] text-muted-foreground">{c.aiText}</p>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <ul className="grid gap-x-8 sm:grid-cols-2">
            {c.aiItems.map((item, i) => (
              <li key={i} className="border-t border-border py-4 text-[0.9375rem] leading-[1.55]">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </HomeSection>
  );
}
