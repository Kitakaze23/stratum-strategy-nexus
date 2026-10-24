import { createFileRoute } from "@tanstack/react-router";
import { absoluteUrl } from "@/lib/site";

import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Insights } from "@/components/site/Insights";
import { Toaster } from "@/components/ui/sonner";
import { SiteContentProvider, siteContentQuery } from "@/content/useSiteContent";

const TITLE = "Статьи об обосновании IT-инвестиций, ТЗ и выборе подрядчика | Stratum Consulting";
const DESCRIPTION =
  "Практические материалы для руководителей цифровых проектов: обоснование инвестиций в IT, техническое задание на разработку, сравнение подрядчиков, оценка AI и аудит IT-проекта.";
const URL = absoluteUrl("/insights");

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
  loader: async ({ context }) => ({
    rows: (await context.queryClient.ensureQueryData(siteContentQuery)) ?? {},
  }),
  component: InsightsIndex,
});

function InsightsIndex() {
  const { rows } = Route.useLoaderData();
  return (
    <SiteContentProvider rows={rows}>
      <Header />
      <main id="main">
        <section aria-labelledby="insights-page-title" className="border-b border-border pt-[76px]">
          <div className="container-page py-14 md:py-20">
            <div className="max-w-[860px]">
              <p className="flex items-center gap-3 text-sm font-semibold text-primary">
                <span aria-hidden="true" className="h-px w-8 bg-signal" />
                Статьи
              </p>
              <h1
                id="insights-page-title"
                className="mt-6 font-serif text-[2.125rem] font-medium leading-[1.1] md:text-[3rem]"
              >
                Как принимать решения о цифровых проектах до начала разработки
              </h1>
              <p className="mt-6 max-w-[680px] text-lg leading-[1.7] text-muted-foreground">
                Практические материалы для руководителей: обоснование инвестиций, выбор решения,
                техническое задание, работа с подрядчиками и оценка AI.
              </p>
            </div>
          </div>
        </section>
        <Insights showHeading={false} />
        <Contact tone="surface" />
      </main>
      <Footer />
      <Toaster />
    </SiteContentProvider>
  );
}
