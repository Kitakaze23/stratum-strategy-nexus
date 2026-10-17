import { useSection } from "@/content/useSiteContent";

import { Eyebrow, HomeSection, SectionTitle } from "./shared";

export function Principles() {
  const c = useSection("homePrinciples");

  return (
    <HomeSection id="principles" trackId="principles" labelledBy="principles-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <SectionTitle id="principles-title">{c.title}</SectionTitle>
          </div>
        </div>

        <ol className="border-b border-border lg:col-span-7 lg:col-start-6">
          {c.items.map((item, i) => (
            <li
              key={i}
              className="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-3 border-t border-border py-8 md:grid-cols-[4rem_minmax(0,2fr)_minmax(0,3fr)] md:gap-x-8"
            >
              <span aria-hidden="true" className="font-serif text-xl text-signal tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-lg font-semibold leading-[1.4]">{item.title}</h3>
              <p className="col-start-2 mt-2 text-[0.9375rem] leading-[1.7] text-muted-foreground md:col-start-3 md:mt-0">
                {item.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </HomeSection>
  );
}
