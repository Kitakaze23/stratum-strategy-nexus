import { createFileRoute } from "@tanstack/react-router";

import { Achievements } from "@/components/site/Achievements";
import { AfterLaunch } from "@/components/site/AfterLaunch";
import { Challenges } from "@/components/site/Challenges";
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


const TITLE = "Stratum Consulting — независимый Product Advisor и Product Review";
const DESCRIPTION =
  "Независимая продуктовая экспертиза: Product Review, аудит цифрового продукта и MVP, Product Discovery и стратегия. Помогаем принимать обоснованные продуктовые решения.";

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
              telephone: "+7 (915) 116-73-76",
              email: "kolesnikov_msu@mail.ru",
            },
            {
              "@type": "ProfessionalService",
              name: "Stratum Consulting",
              description: DESCRIPTION,
              areaServed: "RU",
              serviceType: [
                "Продуктовая стратегия",
                "Product Discovery",
                "Цифровая трансформация",
                "Аналитика уровня предприятия",
                "Искусственный интеллект",
                "Executive advisory",
              ],
              priceRange: "от 25 000 ₽",
              telephone: "+7 (915) 116-73-76",
              email: "kolesnikov_msu@mail.ru",
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
        <Challenges />
        <AfterLaunch />
        <Services />
        <Achievements />
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
