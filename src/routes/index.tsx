import { createFileRoute } from "@tanstack/react-router";

import { Approach } from "@/components/site/Approach";
import { Contact } from "@/components/site/Contact";
import { Expertise } from "@/components/site/Expertise";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Pricing } from "@/components/site/Pricing";
import { Services } from "@/components/site/Services";
import { Toaster } from "@/components/ui/sonner";

const TITLE = "Stratum Consulting — независимое продуктовое консультирование";
const DESCRIPTION =
  "Независимая стратегическая экспертиза по продуктам, аналитике, ИИ и цифровой трансформации для CEO, CPO и CTO. Консультации от 25 000 ₽.";

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
    ],
  }),
});

function Index() {
  return (
    <>
      <Header />
      <main>
        <h1 className="sr-only">Stratum Consulting — независимое продуктовое консультирование</h1>
        <Hero />
        <Services />
        <Approach />
        <Expertise />
        <Pricing />
        <Contact />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}
