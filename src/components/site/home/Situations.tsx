import { useSection } from "@/content/useSiteContent";

import { Eyebrow, HomeSection, Lead, SectionTitle } from "./shared";

export function Situations() {
  const c = useSection("homeSituations");

  return (
    <HomeSection id="situations" trackId="business_challenges" labelledBy="situations-title">
      <div className="max-w-[860px]">
        <Eyebrow>{c.eyebrow}</Eyebrow>
        <SectionTitle id="situations-title">{c.title}</SectionTitle>
        {c.description ? <Lead className="max-w-[680px]">{c.description}</Lead> : null}
      </div>

      <ul className="mt-14 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
        {c.items.map((item, i) => (
          <li key={i} className="flex flex-col border-t border-border py-8">
            <h3 className="text-lg font-semibold leading-[1.4]">{item.title}</h3>
            <p className="mt-3 text-[0.9375rem] leading-[1.7] text-muted-foreground">{item.text}</p>
            {item.tag ? (
              <p className="mt-5 text-[0.8125rem] font-medium text-primary sm:mt-auto sm:pt-5">
                <span className="sr-only">Подходит: </span>
                <span aria-hidden="true" className="mr-2 text-signal">
                  →
                </span>
                {item.tag}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </HomeSection>
  );
}
