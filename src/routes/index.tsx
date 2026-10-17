import { createFileRoute } from "@tanstack/react-router";

import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Approach } from "@/components/site/home/Approach";
import { CoreServices } from "@/components/site/home/CoreServices";
import { ExpertiseAreas } from "@/components/site/home/ExpertiseAreas";
import { HomeHero } from "@/components/site/home/HomeHero";
import { IndustryExperience } from "@/components/site/home/IndustryExperience";
import { Principles } from "@/components/site/home/Principles";
import { Founder } from "@/components/site/home/Founder";
import { Situations } from "@/components/site/home/Situations";
import { Toaster } from "@/components/ui/sonner";
import { SiteContentProvider, siteContentQuery, useSiteContent } from "@/content/useSiteContent";

const TITLE = "Обоснование инвестиций в IT и разработка технического задания | Stratum Consulting";
const DESCRIPTION =
  "Независимая оценка цифрового решения до начала разработки: обоснование инвестиций в IT, выбор решения для автоматизации бизнеса, требования и техническое задание.";

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
              slogan: "Better Decisions. Better Products.",
              serviceType: [
                "Обоснование инвестиций в цифровые решения",
                "Разработка технического задания на цифровой проект",
                "Технологический Due Diligence",
                "Enterprise Analytics",
                "Цифровизация промышленных и инженерных процессов",
                "Legal & IP",
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
        {c.homeHero.enabled ? <HomeHero /> : <div className="pt-[76px]" />}
        {c.homeSituations.enabled ? <Situations /> : null}
        {c.homeServices.enabled ? <CoreServices /> : null}
        {c.homeApproach.enabled ? <Approach /> : null}
        {c.homeExpertise.enabled ? <ExpertiseAreas /> : null}
        {c.homeExperience.enabled ? <IndustryExperience /> : null}
        {c.homeTeam.enabled ? <Founder /> : null}
        {c.homePrinciples.enabled ? <Principles /> : null}
        {c.homeContact.enabled ? <Contact section="homeContact" tone="surface" /> : null}
      </main>
      <Footer />
      <Toaster />
    </>
  );
}
