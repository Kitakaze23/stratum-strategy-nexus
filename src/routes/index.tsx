import { createFileRoute } from "@tanstack/react-router";
import { absoluteUrl } from "@/lib/site";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import {
  ExpressFaq,
  ExpressForm,
  ExpressHero,
  ExpressNext,
  ExpressPains,
  ExpressPrice,
  ExpressResult,
  ExpressSample,
  ExpressTeam,
  ExpressTrust,
} from "@/components/site/home/ExpressLanding";
import { Toaster } from "@/components/ui/sonner";
import { mergeContent } from "@/content/defaults";
import { SiteContentProvider, siteContentQuery, useSiteContent } from "@/content/useSiteContent";

const TITLE = "Независимая экспертиза ТЗ и предложений подрядчиков за 5 дней | Stratum Consulting";
const DESCRIPTION =
  "Экспресс-проверка технического задания и до трёх предложений подрядчиков за 90 000 ₽ и 5 рабочих дней. Независимый консультант для IT-проектов в промышленности, энергетике и нефтегазе: разработку не продаём.";

export const Route = createFileRoute("/")({
  loader: async ({ context }) => ({
    rows: (await context.queryClient.ensureQueryData(siteContentQuery)) ?? {},
  }),
  component: Index,
  head: ({ loaderData }) => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absoluteUrl("/") },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/") }],
    scripts: [
      ...(() => {
        const faq = mergeContent(loaderData?.rows as Record<string, unknown> | undefined).exFaq;
        return faq.enabled && faq.items.length
          ? [
              {
                type: "application/ld+json",
                children: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: faq.items.map((item) => ({
                    "@type": "Question",
                    name: item.q,
                    acceptedAnswer: { "@type": "Answer", text: item.a },
                  })),
                }),
              },
            ]
          : [];
      })(),
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              name: "Stratum Consulting",
              url: absoluteUrl("/"),
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
              slogan: "Надёжное основание для цифровых решений",
              serviceType: [
                "Экспресс-проверка ТЗ и предложений подрядчиков",
                "Аудит IT-проекта",
                "Независимый контроль IT-проекта",
                "Обоснование инвестиций и разработка ТЗ",
                "Экспертиза для спора с подрядчиком",
              ],
              telephone: "+7 (925) 539-33-53",
              email: "inbox@stratum-consulting.ru",
            },
          ],
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
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-[4px] focus:bg-primary focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Перейти к содержанию
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        {c.exHero.enabled ? <ExpressHero /> : <div className="pt-[76px]" />}
        {c.exPains.enabled ? <ExpressPains /> : null}
        {c.exResult.enabled ? <ExpressResult /> : null}
        {c.exSample.enabled ? <ExpressSample /> : null}
        {c.exTrust.enabled ? <ExpressTrust /> : null}
        {c.exPrice.enabled ? <ExpressPrice /> : null}
        {c.exNext.enabled ? <ExpressNext /> : null}
        {c.exTeam.enabled ? <ExpressTeam /> : null}
        {c.exFaq.enabled ? <ExpressFaq /> : null}
        {c.exForm.enabled ? <ExpressForm /> : null}
      </main>
      <Footer />
      <Toaster />
    </>
  );
}
