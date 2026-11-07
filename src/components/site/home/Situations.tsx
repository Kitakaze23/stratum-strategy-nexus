import { useSection } from "@/content/useSiteContent";

import { HomeSection, SectionTitle } from "./shared";

/** «Когда к нам приходят»: four one-line situations, plain text without links. */
export function Situations() {
  const c = useSection("homeSituations");

  return (
    <HomeSection id="situations" trackId="situations" labelledBy="situations-title" tone="surface">
      <SectionTitle id="situations-title" className="mt-0">
        {c.title}
      </SectionTitle>
      <ul className="mt-10 grid gap-px overflow-hidden rounded-[4px] border border-border bg-border sm:grid-cols-2">
        {c.items.map((item, i) => (
          <li key={i} className="bg-background p-6 text-[1.0625rem] leading-[1.55] md:p-7">
            {item}
          </li>
        ))}
      </ul>
    </HomeSection>
  );
}
