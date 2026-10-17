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
          <div className="lg:sticky lg:top-28">
            <Eyebrow tone="navy">{c.eyebrow}</Eyebrow>
            <SectionTitle id="experience-title">{c.title}</SectionTitle>
            {c.description ? <Lead tone="navy">{c.description}</Lead> : null}

            {c.industries?.length ? (
              <div className="mt-10 border-t border-navy-foreground/15 pt-6">
                <p
                  id="experience-industries"
                  className="text-xs font-semibold uppercase tracking-[0.14em] text-navy-foreground/55"
                >
                  {c.industriesTitle}
                </p>
                <ul
                  aria-labelledby="experience-industries"
                  className="mt-4 flex flex-wrap gap-x-5 gap-y-2"
                >
                  {c.industries.map((item, i) => (
                    <li key={i} className="text-[0.9375rem] font-medium text-navy-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <ol className="border-b border-navy-foreground/15">
            {c.domains.map((d, i) => (
              <li
                key={i}
                className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-3 border-t border-navy-foreground/15 py-8 sm:grid-cols-[3rem_minmax(0,1fr)]"
              >
                <span aria-hidden="true" className="font-serif text-xl text-signal tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-semibold leading-[1.4]">{d.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-[1.7] text-navy-foreground/75">
                    {d.text}
                  </p>
                  {d.tags?.length ? (
                    <p className="mt-4 text-[0.8125rem] text-navy-foreground/55">
                      {d.tags.join(" · ")}
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
          {c.footnote ? (
            <p className="mt-8 text-sm leading-[1.7] text-navy-foreground/60">{c.footnote}</p>
          ) : null}
        </div>
      </div>
    </HomeSection>
  );
}
