import { createFileRoute } from "@tanstack/react-router";

import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Insights } from "@/components/site/Insights";
import { Reveal } from "@/components/site/primitives";
import { Toaster } from "@/components/ui/sonner";

const TITLE = "Статьи о продуктовых решениях — аудит MVP, SaaS и AI-продуктов | Stratum Consulting";
const DESCRIPTION =
  "Практические разборы: что делать, если MVP не растёт, как понять, нужен ли продукт рынку, что развивать дальше и когда продукту нужен независимый разбор.";
const URL = "https://stratum-strategy-nexus.lovable.app/insights";

export const Route = createFileRoute("/insights/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: InsightsIndex,
});

function InsightsIndex() {
  return (
    <>
      <Header />
      <main>
        <section className="border-b border-border pt-[76px]">
          <div className="container-page py-20 md:py-24">
            <Reveal className="measure">
              <p className="eyebrow">Статьи</p>
              <h1 className="mt-5 text-[2rem] font-semibold leading-[1.15] md:text-[2.75rem]">
                Разборы реальных продуктовых ситуаций
              </h1>
              <p className="mt-6 text-lg leading-[1.75] text-muted-foreground">
                Материалы для основателей и руководителей: как проверять решения до того, как они
                становятся дорогостоящими.
              </p>
            </Reveal>
          </div>
        </section>
        <Insights />
        <Contact />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}
