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
import { Toaster } from "@/components/ui/sonner";
import { FAQ_ITEMS } from "@/data/faq";


const TITLE = "Независимая оценка цифровых решений и разработок | Stratum Consulting";
const DESCRIPTION =
  "Stratum Consulting независимо оценивает цифровые решения перед разработкой, перед запуском и перед инвестициями.";

export const Route = createFileRoute("/")({
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
                "Оценка цифрового решения до разработки",
                "Независимая оценка результата разработки",
                "Digital Due Diligence",
                "Оценка AI-решений",
              ],
              priceRange: "от 60 000 ₽",
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
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Team />
        <Insights />
        <Process />
        <Pricing />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}
