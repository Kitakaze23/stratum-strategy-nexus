import { Link } from "@tanstack/react-router";

import { trackCtaClick } from "@/analytics/events";
import { useSection } from "@/content/useSiteContent";

import { ArrowLink, Eyebrow, HomeSection, Lead, SectionTitle } from "./home/shared";

export function Insights({ showHeading = true }: { showHeading?: boolean }) {
  const c = useSection("articles");
  return (
    <HomeSection id="insights" trackId="insights" labelledBy="insights-title">
      {showHeading ? (
        <div className="mb-12 max-w-[860px]">
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <SectionTitle id="insights-title">{c.title}</SectionTitle>
          {c.description ? <Lead className="max-w-[680px]">{c.description}</Lead> : null}
        </div>
      ) : (
        <h2 id="insights-title" className="sr-only">
          {c.title}
        </h2>
      )}

      <ul className="border-b border-border">
        {c.articles.map((article, index) => (
          <li key={`${article.slug}-${index}`} className="border-t border-border">
            <Link
              to="/insights/$slug"
              params={{ slug: article.slug }}
              onClick={() => trackCtaClick(`insight_${article.slug}`, "insights")}
              className="group grid gap-3 py-8 transition-colors duration-200 md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)_7rem] md:items-baseline md:gap-8 md:px-4 md:hover:bg-surface"
            >
              <span className="font-serif text-[1.375rem] font-medium leading-[1.3] text-foreground">
                {article.title}
              </span>
              <span className="text-[0.9375rem] leading-[1.7] text-muted-foreground">
                {article.excerpt}
                <span className="mt-2 block text-[0.8125rem] text-muted-foreground/80">
                  {article.readingTime}
                </span>
              </span>
              <ArrowLink className="whitespace-nowrap text-primary md:justify-self-end">
                Читать
              </ArrowLink>
            </Link>
          </li>
        ))}
      </ul>
    </HomeSection>
  );
}
