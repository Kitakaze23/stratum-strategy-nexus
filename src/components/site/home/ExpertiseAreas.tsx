import { Link } from "@tanstack/react-router";

import { trackCtaClick, trackEvent, trackServiceClick } from "@/analytics/events";
import { useSection } from "@/content/useSiteContent";

import { ArrowLink, Eyebrow, HomeSection, Lead, SectionTitle } from "./shared";

/** Stable analytics ids per expertise area, by position. */
const TRACKING = [
  {
    cta: "technology_due_diligence",
    event: "digital_due_diligence_click",
    service: "product_audit",
  },
  {
    cta: "enterprise_analytics",
    event: "enterprise_analytics_click",
    service: "enterprise_analytics",
  },
  {
    cta: "industrial_digitalization",
    event: "industrial_digitalization_click",
    service: "industrial_digitalization",
  },
  { cta: "legal_ip", event: "legal_ip_click", service: "legal_support" },
] as const;

const rowLink =
  "group grid gap-3 py-8 transition-colors duration-200 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)_9.5rem] md:items-baseline md:gap-8 md:px-4 md:hover:bg-surface";

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
        {c.areas.map((area, i) => {
          const tracking = TRACKING[i] ?? {
            cta: `expertise_${i + 1}`,
            event: "service_click",
            service: `expertise_${i + 1}`,
          };
          const onClick = () => {
            trackCtaClick(tracking.cta, "expertise");
            trackServiceClick(tracking.service, "expertise");
            trackEvent(tracking.event, { location: "expertise" });
          };
          const body = (
            <>
              <span className="block">
                <span
                  lang="en"
                  className="block text-lg font-semibold leading-[1.35] text-foreground"
                >
                  {area.title}
                </span>
                <span className="mt-1 block text-[0.9375rem] text-muted-foreground">
                  {area.subtitle}
                </span>
              </span>
              <span className="block text-[0.9375rem] leading-[1.7] text-foreground/85">
                {area.text}
              </span>
              <ArrowLink className="whitespace-nowrap text-primary md:justify-self-end">
                {area.cta}
              </ArrowLink>
            </>
          );
          return (
            <li key={i} className="border-t border-border">
              {area.link ? (
                <Link to={area.link} onClick={onClick} className={rowLink}>
                  {body}
                </Link>
              ) : (
                <a href="#contact" onClick={onClick} className={rowLink}>
                  {body}
                </a>
              )}
            </li>
          );
        })}
      </ul>

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
          {c.aiLink ? (
            <Link
              to={c.aiLink}
              onClick={() => trackServiceClick("ai_product_review", "expertise_ai")}
              className="group mt-6 inline-flex text-primary underline-offset-4 hover:underline"
            >
              <ArrowLink>{c.aiCta}</ArrowLink>
            </Link>
          ) : null}
        </div>
      </aside>
    </HomeSection>
  );
}
