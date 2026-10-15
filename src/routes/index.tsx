import { createFileRoute } from "@tanstack/react-router";

import { Contact } from "@/components/site/Contact";
import { Faq } from "@/components/site/Faq";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Insights } from "@/components/site/Insights";
import { Portfolio } from "@/components/site/Portfolio";
import { Pricing } from "@/components/site/Pricing";
import { Process } from "@/components/site/Process";
import { Services } from "@/components/site/Services";
import { Team } from "@/components/site/Team";
import { WhyStratum } from "@/components/site/WhyStratum";
import { Toaster } from "@/components/ui/sonner";
import { FAQ_ITEMS } from "@/data/faq";
import {
  SiteContentProvider,
  siteContentQuery,
  useSiteContent,
} from "@/content/useSiteContent";


const TITLE = "Независимая оценка цифрового и AI-проекта до разработки | Stratum Consulting";
const DESCRIPTION =
  "Обоснование инвестиций в IT до выбора подрядчика: сравнение вариантов, оценка стоимости разработки, требований, рисков и целесообразности AI-решений.";

export const Route = createFileRoute("/")({
  loader: async ({ context }) => ({
    rows: (await context.queryClient.ensureQueryData(siteContentQuery)) ?? {},
  }),
  component: Index,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              name: "Stratum Consulting",
              url: "/",
              inLanguage: "ru-RU",
            },
            {
              "@type": "Organization",
              name: "Stratum Consulting",
              description: DESCRIPTION,
              telephone: "+7 (925) 539-33-53",
              email: "inbox@stratum-consulting.ru",

            },
            {
              "@type": "ProfessionalService",
              name: "Stratum Consulting",
              description: DESCRIPTION,
              areaServed: "RU",
              serviceType: [
                "Независимая оценка цифрового и AI-проекта",
                "Digital Product & AI Advisory",
                "Технологический Due Diligence",
                "Enterprise Analytics",
                "Legal & IP",
              ],
              priceRange: "от 25 000 ₽",
              telephone: "+7 (925) 539-33-53",
              email: "inbox@stratum-consulting.ru",
            },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_ITEMS.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }),
      },
    ],
  }),
});

function Index() {
  const { rows } = Route.useLoaderData();
  return (
    <SiteContentProvider rows={rows}>
      <IndexSections />
    </SiteContentProvider>
  );
}

function IndexSections() {
  const c = useSiteContent();
  return (
    <>
      <Header />
      <main>
        {c.hero.enabled ? <Hero /> : <div className="pt-[76px]" />}
        {c.services.enabled ? <Services /> : null}
        {c.process.enabled ? <Process /> : null}
        {c.why.enabled ? <WhyStratum /> : null}
        {c.team.enabled ? <Team /> : null}
        {c.pricing.enabled ? <Pricing /> : null}
        {c.portfolio.enabled ? <Portfolio /> : null}
        {c.insights.enabled ? <Insights /> : null}
        {c.faq.enabled ? <Faq /> : null}
        {c.contact.enabled ? <Contact /> : null}
      </main>
      <Footer />
      <Toaster />
    </>
  );
}
