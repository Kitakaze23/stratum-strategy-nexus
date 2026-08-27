import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import { trackCtaClick, trackFunnelView, trackServiceClick } from "@/analytics/events";
import type { ServiceContent } from "@/data/services";
import { SERVICES_CONTENT } from "@/data/services";

import { useEffect } from "react";

import { Footer } from "./Footer";
import { Header } from "./Header";
import { Cta, Reveal, Section, SectionHead } from "./primitives";

/** Stable analytics identifier derived from the service slug, not from copy. */
function serviceAnalyticsId(slug: string): string {
  return slug.replace(/-/g, "_");
}

export function ServicePage({ service }: { service: ServiceContent }) {
  const related = SERVICES_CONTENT.filter((s) => s.slug !== service.slug);
  const serviceId = serviceAnalyticsId(service.slug);

  useEffect(() => {
    if (serviceId === "ai_product_review") {
      trackFunnelView("ai_product_review", service.path);
      trackFunnelView("product_review", service.path);
    } else if (serviceId === "mvp_review" || serviceId === "product_audit") {
      trackFunnelView("product_review", service.path);
    }
  }, [serviceId, service.path]);

  return (
    <>
      <Header />
      <main className="pt-[76px]">
        <section className="border-b border-border bg-background">
          <div className="container-page py-20 md:py-28">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              На главную
            </Link>

            <Reveal className="mt-10 max-w-[860px]">
              <p className="eyebrow">{service.eyebrow}</p>
              <h1 className="mt-6 text-[2rem] font-semibold leading-[1.15] md:text-[2.875rem]">
                {service.title}
              </h1>
              <p className="mt-6 text-lg leading-[1.75] text-muted-foreground">{service.subtitle}</p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Cta asChild>
                  <a
                    href="/#contact"
                    onClick={() => {
                      trackCtaClick("service_primary", "service_hero");
                      trackServiceClick(serviceId, "service_hero");
                    }}
                  >
                    {service.cta}
                  </a>
                </Cta>
                <Cta asChild variant="secondary">
                  <a
                    href="/#contact"
                    onClick={() => trackCtaClick("discuss_task", "service_hero")}
                  >
                    Обсудить задачу
                  </a>
                </Cta>
              </div>
              <p className="mt-5 text-sm text-muted-foreground">{service.ctaNote}</p>
            </Reveal>
          </div>
        </section>

        <Section labelledBy="service-intro">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHead id="service-intro" eyebrow="Контекст" title="Зачем это нужно" />
            </div>
            <div className="space-y-6 text-[1.0625rem] leading-[1.75] text-muted-foreground lg:col-span-7">
              {service.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </div>
        </Section>

        <Section tone="surface" labelledBy="service-questions">
          <SectionHead
            id="service-questions"
            eyebrow="Вопросы"
            title={service.questionsTitle}
            description="Ответы на эти вопросы определяют, куда уйдут следующие месяцы работы и бюджет."
          />
          <ul className="mt-14 grid gap-px overflow-hidden rounded-[14px] border border-border bg-border md:grid-cols-2">
            {service.questions.map((question) => (
              <li key={question} className="bg-card p-7 text-[0.9375rem] leading-[1.7]">
                {question}
              </li>
            ))}
          </ul>
        </Section>

        {service.practices ? (
          <Section labelledBy="service-practices">
            <SectionHead
              id="service-practices"
              eyebrow="Состав работ"
              title={service.practicesTitle ?? "Направления работы"}
              description="Каждое направление можно взять отдельно или в составе комплексной оценки."
            />
            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {service.practices.map((practice, index) => (
                <Reveal key={practice.title} delay={index * 0.05}>
                  <article className="h-full rounded-[14px] border border-border bg-card p-7 shadow-card">
                    <h3 className="text-lg font-semibold">{practice.title}</h3>
                    <p className="mt-3 text-[0.9375rem] leading-[1.7] text-muted-foreground">
                      {practice.text}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </Section>
        ) : null}



        <Section labelledBy="service-deliverables">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHead id="service-deliverables" eyebrow="Результат" title={service.deliverablesTitle} />
              <dl className="mt-12 space-y-6 border-t border-border pt-8">
                {service.format.map((row) => (
                  <div key={row.term}>
                    <dt className="text-xs uppercase tracking-[0.12em] text-primary">{row.term}</dt>
                    <dd className="mt-2 text-[0.9375rem] leading-[1.7] text-muted-foreground">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <Reveal delay={0.06} className="lg:col-span-7">
              <ul className="grid gap-4 sm:grid-cols-2">
                {service.deliverables.map((item) => (
                  <li
                    key={item}
                    className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3 rounded-[12px] border border-border bg-card p-5 text-[0.9375rem] leading-[1.6] shadow-card"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Section>

        <Section tone="navy" labelledBy="service-audience">
          <SectionHead id="service-audience" tone="navy" eyebrow="Аудитория" title={service.audienceTitle} />
          <ul className="mt-12 flex flex-wrap gap-3">
            {service.audience.map((item) => (
              <li
                key={item}
                className="rounded-full border border-navy-foreground/25 px-5 py-2.5 text-[0.875rem] text-navy-foreground/85"
              >
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-navy-foreground/15 pt-10">
            <Cta asChild variant="ghostLight">
              <a
                href="/#contact"
                onClick={() => {
                  trackCtaClick("service_primary", "service_audience");
                  trackServiceClick(serviceId, "service_audience");
                }}
              >
                {service.cta}
              </a>
            </Cta>
            <p className="text-sm text-navy-foreground/70">
              Работа не связана с разработкой — только независимая оценка и рекомендации.
            </p>
          </div>
        </Section>

        {service.crossRef ? (
          <Section labelledBy="service-crossref">
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <h2 id="service-crossref" className="text-[1.75rem] font-semibold leading-[1.25] md:text-[2.125rem]">
                  {service.crossRef.title}
                </h2>
              </div>
              <div className="space-y-6 text-[1.0625rem] leading-[1.75] text-muted-foreground lg:col-span-6">
                {service.crossRef.text.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
                <Link
                  to={service.crossRef.linkTo}
                  onClick={() => trackServiceClick(serviceId, "service_crossref")}
                  className="group inline-flex items-center gap-2 text-[0.9375rem] font-medium text-primary"
                >
                  {service.crossRef.linkLabel}
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
          </Section>
        ) : null}



        <Section tone="surface" labelledBy="service-related">
          <SectionHead
            id="service-related"
            eyebrow="Другие направления"
            title="Смежные форматы работы"
            description="Если задача сформулирована иначе, подойдёт другой формат независимой оценки."
          />
          <ul className="mt-14 grid gap-6 md:grid-cols-2">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  to={item.path}
                  onClick={() => trackServiceClick(serviceAnalyticsId(item.slug), "service_related")}
                  className="group flex h-full flex-col rounded-[14px] border border-border bg-card p-7 shadow-card transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
                >
                  <h3 className="text-lg font-semibold">{item.navLabel}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-[1.7] text-muted-foreground">{item.subtitle}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-primary">
                    Подробнее
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      </main>
      <Footer />
    </>
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
      { property: "og:url", content: service.path },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: service.path }],
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
          provider: { "@type": "Organization", name: "Stratum Consulting" },
        }),
      },
    ],
  };
}
