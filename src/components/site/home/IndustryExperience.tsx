import { useSection } from "@/content/useSiteContent";

import { Eyebrow, HomeSection, Lead, SectionTitle } from "./shared";

export function IndustryExperience() {
  const c = useSection("homeExperience");

  return (
    <HomeSection
      id="experience"
      trackId="industrial_experience"
      labelledBy="experience-title"
      tone="navy"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Eyebrow tone="navy">{c.eyebrow}</Eyebrow>
          <SectionTitle id="experience-title">{c.title}</SectionTitle>
          {c.description ? <Lead tone="navy">{c.description}</Lead> : null}
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <ul className="border-b border-navy-foreground/15">
            {c.domains.map((d, i) => (
              <li
                key={i}
                className="grid gap-3 border-t border-navy-foreground/15 py-8 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-8"
              >
                <h3 className="text-lg font-semibold leading-[1.4]">{d.title}</h3>
                <p className="text-[0.9375rem] leading-[1.7] text-navy-foreground/75">{d.text}</p>
              </li>
            ))}
          </ul>
          {c.footnote ? (
            <p className="mt-8 text-sm leading-[1.7] text-navy-foreground/60">{c.footnote}</p>
          ) : null}
        </div>
      </div>
    </HomeSection>
  );
}
