import { Link } from "@tanstack/react-router";
import { absoluteUrl } from "@/lib/site";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";

import { trackCtaClick, trackFunnelView, trackServiceClick } from "@/analytics/events";
import { SiteContentProvider } from "@/content/useSiteContent";
import type { ServiceContent } from "@/data/services";
import { SERVICES_CONTENT } from "@/data/services";

import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { ArrowLink, Eyebrow, HomeSection, Lead, SectionTitle } from "./home/shared";
import { Cta } from "./primitives";
import { Toaster } from "@/components/ui/sonner";

/** Stable analytics identifier derived from the service slug, not from copy. */
function serviceAnalyticsId(slug: string): string {
  return slug.replace(/-/g, "_");
}

const funnelViewsSent = new Set<string>();

export function ServicePage({
  service,
  rows,
}: {
  service: ServiceContent;
  rows: Record<string, unknown>;
}) {
  const related = SERVICES_CONTENT.filter((s) => s.slug !== service.slug);
  const serviceId = serviceAnalyticsId(service.slug);

  useEffect(() => {
    // one funnel view per route visit, even if the component mounts twice
    if (funnelViewsSent.has(service.path)) return;
    funnelViewsSent.add(service.path);
    if (serviceId === "ai_product_review") {
      trackFunnelView("ai_product_review", service.path);
      trackFunnelView("product_review", service.path);
    } else if (serviceId === "product_audit") {
      trackFunnelView("product_review", service.path);
    }
  }, [serviceId, service.path]);

  const primaryCta = (location: string) => ({
    href: "#contact",
    onClick: () => {
      trackCtaClick("service_primary", location);
      trackServiceClick(serviceId, location);
    },
  });

  return (
    <SiteContentProvider rows={rows}>
      <Header />
      <main id="main" className="pt-[76px]">
        {/* Hero */}
        <section aria-labelledby="service-title" className="border-b border-border">
          <div className="container-page py-14 md:py-20 lg:py-24">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              На главную
            </Link>
            <div className="mt-10 max-w-[900px]">
              <p
                lang={/[а-яё]/i.test(service.eyebrow) ? undefined : "en"}
                className="flex items-center gap-3 text-sm font-semibold tracking-[0.02em] text-primary"
              >
                <span aria-hidden="true" className="h-px w-8 bg-signal" />
                {service.eyebrow}
              </p>
              <h1
                id="service-title"
                className="mt-7 font-serif text-[2.125rem] font-medium leading-[1.1] sm:text-[2.75rem] lg:text-[3.25rem]"
              >
                {service.title}
              </h1>
              <p className="mt-7 max-w-[720px] text-lg leading-[1.65] text-muted-foreground md:text-xl">
                {service.subtitle}
              </p>
              <div className="mt-10">
                <Cta asChild>
                  <a {...primaryCta("service_hero")}>{service.cta}</a>
                </Cta>
              </div>
              <p className="mt-5 text-sm text-muted-foreground">{service.ctaNote}</p>
            </div>
          </div>
        </section>

        {/* Context */}
        <HomeSection id="context" trackId="service_context" labelledBy="service-intro">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <Eyebrow>Контекст</Eyebrow>
              <SectionTitle id="service-intro">Зачем это нужно</SectionTitle>
            </div>
            <div className="space-y-6 text-[1.0625rem] leading-[1.75] text-foreground/85 lg:col-span-6 lg:col-start-7">
              {service.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </div>
        </HomeSection>

        {/* When */}
        <HomeSection
          id="when"
          trackId="service_situations"
          labelledBy="service-questions"
          tone="surface"
        >
          <Eyebrow>Ситуации</Eyebrow>
          <SectionTitle id="service-questions">{service.questionsTitle}</SectionTitle>
          <ul className="mt-12 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {service.questions.map((question) => (
              <li
                key={question}
                className="border-t border-border py-6 text-[1rem] leading-[1.6] text-foreground"
              >
                {question}
              </li>
            ))}
          </ul>
        </HomeSection>

        {/* What we do */}
        {service.practices ? (
          <HomeSection id="scope" trackId="service_scope" labelledBy="service-practices">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-4">
                <Eyebrow>Состав работ</Eyebrow>
                <SectionTitle id="service-practices">
                  {service.practicesTitle ?? "Что делает Stratum"}
                </SectionTitle>
              </div>
              <ol className="border-b border-border lg:col-span-7 lg:col-start-6">
                {service.practices.map((practice, i) => (
                  <li
                    key={practice.title}
                    className="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-3 border-t border-border py-7 md:grid-cols-[4rem_minmax(0,2fr)_minmax(0,3fr)] md:gap-x-8"
                  >
                    <span
                      aria-hidden="true"
                      className="font-serif text-xl text-signal tabular-nums"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-lg font-semibold leading-[1.4]">{practice.title}</h3>
                    <p className="col-start-2 mt-2 text-[0.9375rem] leading-[1.7] text-muted-foreground md:col-start-3 md:mt-0">
                      {practice.text}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </HomeSection>
        ) : null}

        {/* Result */}
        <HomeSection
          id="result"
          trackId="service_result"
          labelledBy="service-deliverables"
          className="border-t border-border"
        >
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <Eyebrow>Результат</Eyebrow>
              <SectionTitle id="service-deliverables">{service.deliverablesTitle}</SectionTitle>
              <h3 className="mt-10 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {service.formatTitle}
              </h3>
              <dl className="mt-4 border-b border-border">
                {service.format.map((row) => (
                  <div key={row.term} className="border-t border-border py-4">
                    <dt className="text-[0.9375rem] font-semibold">{row.term}</dt>
                    <dd className="mt-1 text-[0.9375rem] leading-[1.65] text-muted-foreground">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <ul className="self-start border-b border-border lg:col-span-6 lg:col-start-7">
              {service.deliverables.map((item) => (
                <li
                  key={item}
                  className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-3 border-t border-border py-4 text-[1rem] leading-[1.6]"
                >
                  <span aria-hidden="true" className="mt-[0.75em] h-px w-3 bg-signal" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </HomeSection>

        {/* Document structure */}
        {service.document ? (
          <HomeSection
            id="document"
            trackId="service_document"
            labelledBy="service-document"
            tone="navy"
          >
            <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-6">
                <Eyebrow tone="navy">Пример результата</Eyebrow>
                <SectionTitle id="service-document">{service.document.title}</SectionTitle>
              </div>
              <Lead tone="navy" className="lg:col-span-5 lg:col-start-8 lg:mt-auto">
                {service.document.intro}
              </Lead>
            </div>
            <ol className="mt-14 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
              {service.document.sections.map((section, i) => (
                <li key={section.title} className="border-t border-navy-foreground/20 py-7">
                  <h3 className="flex items-baseline gap-3 text-lg font-semibold">
                    <span
                      aria-hidden="true"
                      className="font-serif text-base text-signal tabular-nums"
                    >
                      {i + 1}.
                    </span>
                    {section.title}
                  </h3>
                  <ul className="mt-4 space-y-2 pl-7">
                    {section.items.map((item, k) => (
                      <li
                        key={item}
                        className="text-[0.9375rem] leading-[1.55] text-navy-foreground/75"
                      >
                        <span
                          aria-hidden="true"
                          className="mr-2 tabular-nums text-navy-foreground/45"
                        >
                          {i + 1}.{k + 1}
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </HomeSection>
        ) : null}

        {/* Audience + cross reference */}
        <HomeSection
          id="audience"
          trackId="service_audience"
          labelledBy="service-audience"
          {...(service.document ? {} : { className: "border-t border-border" })}
        >
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <Eyebrow>Аудитория</Eyebrow>
              <SectionTitle id="service-audience">{service.audienceTitle}</SectionTitle>
              <ul className="mt-10 border-b border-border">
                {service.audience.map((item) => (
                  <li key={item} className="border-t border-border py-3.5 text-[1rem]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {service.crossRef ? (
              <aside
                aria-labelledby="service-crossref"
                className="self-start border-l-2 border-signal bg-surface p-7 sm:p-10 lg:col-span-6 lg:col-start-7"
              >
                <h3
                  id="service-crossref"
                  className="font-serif text-2xl font-medium leading-[1.25] md:text-[1.75rem]"
                >
                  {service.crossRef.title}
                </h3>
                <div className="mt-4 space-y-3 text-[0.9375rem] leading-[1.7] text-muted-foreground">
                  {service.crossRef.text.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                  ))}
                </div>
                <Link
                  to={service.crossRef.linkTo}
                  onClick={() => trackServiceClick(serviceId, "service_crossref")}
                  className="group mt-6 inline-flex text-primary underline-offset-4 hover:underline"
                >
                  <ArrowLink>{service.crossRef.linkLabel}</ArrowLink>
                </Link>
              </aside>
            ) : null}
          </div>
        </HomeSection>

        <Contact tone="surface" />

        {/* Related services */}
        <HomeSection id="related" trackId="service_related" labelledBy="service-related">
          <Eyebrow>Другие услуги</Eyebrow>
          <SectionTitle id="service-related">Смежные задачи</SectionTitle>
          <ul className="mt-12 border-b border-border">
            {related.map((item) => (
              <li key={item.slug} className="border-t border-border">
                <Link
                  to={item.path}
                  onClick={() =>
                    trackServiceClick(serviceAnalyticsId(item.slug), "service_related")
                  }
                  className="group grid gap-3 py-7 transition-colors duration-200 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)_8rem] md:items-baseline md:gap-8 md:px-4 md:hover:bg-surface"
                >
                  <span className="text-lg font-semibold leading-[1.35]">{item.navLabel}</span>
                  <span className="text-[0.9375rem] leading-[1.7] text-muted-foreground">
                    {item.subtitle}
                  </span>
                  <ArrowLink className="whitespace-nowrap text-primary md:justify-self-end">
                    Подробнее
                  </ArrowLink>
                </Link>
              </li>
            ))}
          </ul>
        </HomeSection>
      </main>
      <Footer />
      <Toaster />
    </SiteContentProvider>
  );
}

export function serviceHead(service: ServiceContent) {
  return {
    meta: [
      { title: service.metaTitle },
      { name: "description", content: service.metaDescription },
      { property: "og:title", content: service.metaTitle },
      { property: "og:description", content: service.metaDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absoluteUrl(service.path) },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl(service.path) }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.metaDescription,
          serviceType: service.navLabel,
          areaServed: "RU",
          provider: { "@type": "Organization", name: "Stratum Consulting", url: absoluteUrl("/") },
          url: absoluteUrl(service.path),
        }),
      },
    ],
  };
}
