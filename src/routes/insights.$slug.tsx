import { Link, createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { absoluteUrl } from "@/lib/site";
import { ArrowLeft } from "lucide-react";

import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Cta } from "@/components/site/primitives";
import { Toaster } from "@/components/ui/sonner";
import { mergeContent } from "@/content/defaults";
import { SiteContentProvider, siteContentQuery } from "@/content/useSiteContent";
import { RETIRED_INSIGHT_SLUGS } from "@/data/insights";

export const Route = createFileRoute("/insights/$slug")({
  loader: async ({ params, context }) => {
    if (params.slug in RETIRED_INSIGHT_SLUGS) {
      const target = RETIRED_INSIGHT_SLUGS[params.slug];
      throw target
        ? redirect({ to: "/insights/$slug", params: { slug: target }, statusCode: 301 })
        : redirect({ to: "/insights", statusCode: 301 });
    }
    const rows = (await context.queryClient.ensureQueryData(siteContentQuery)) ?? {};
    const article = mergeContent(rows as Record<string, unknown>).articles.articles.find(
      (item) => item.slug === params.slug,
    );
    if (!article) throw notFound();
    return { article, rows };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Статья не найдена" }, { name: "robots", content: "noindex" }] };
    }
    const { article } = loaderData;
    const url = absoluteUrl(`/insights/${params.slug}`);
    return {
      meta: [
        { title: article.metaTitle },
        { name: "description", content: article.metaDescription },
        { property: "og:title", content: article.title },
        { property: "og:description", content: article.metaDescription },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.metaDescription,
            inLanguage: "ru-RU",
            author: { "@type": "Organization", name: "Stratum Consulting" },
            publisher: { "@type": "Organization", name: "Stratum Consulting" },
            mainEntityOfPage: url,
          }),
        },
      ],
    };
  },
  component: InsightPage,
});

function InsightPage() {
  const { article, rows } = Route.useLoaderData();

  return (
    <SiteContentProvider rows={rows}>
      <Header />
      <main id="main">
        <article aria-labelledby="article-title" className="border-b border-border pt-[76px]">
          <div className="container-page py-14 md:py-20">
            <div className="mx-auto max-w-[760px]">
              <Link
                to="/insights"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                Все статьи
              </Link>
              <p className="mt-10 flex items-center gap-3 text-sm font-semibold text-primary">
                <span aria-hidden="true" className="h-px w-8 bg-signal" />
                {article.readingTime}
              </p>
              <h1
                id="article-title"
                className="mt-6 font-serif text-[2rem] font-medium leading-[1.12] md:text-[2.75rem]"
              >
                {article.title}
              </h1>
              <p className="mt-6 text-lg leading-[1.7] text-muted-foreground md:text-xl">
                {article.excerpt}
              </p>

              <div className="mt-12 space-y-6 border-t border-border pt-10">
                {article.blocks.map((block, index) =>
                  block.type === "h2" ? (
                    <h2
                      key={index}
                      className="pt-6 font-serif text-[1.625rem] font-medium leading-[1.25] md:text-[1.875rem]"
                    >
                      {block.text ?? ""}
                    </h2>
                  ) : block.type === "p" ? (
                    <p key={index} className="text-[1.0625rem] leading-[1.8] text-foreground/85">
                      {block.text ?? ""}
                    </p>
                  ) : (
                    <ul key={index} className="space-y-3">
                      {(block.items ?? []).map((item, i) => (
                        <li
                          key={i}
                          className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-2 text-[1.0625rem] leading-[1.7] text-foreground/85"
                        >
                          <span aria-hidden="true" className="mt-[0.85em] h-px w-3 bg-signal" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ),
                )}
              </div>

              <aside className="mt-14 border-l-2 border-signal bg-surface p-7 md:p-10">
                <p className="font-serif text-2xl font-medium leading-[1.3]">
                  Нужен независимый взгляд на ваш проект?
                </p>
                <p className="mt-3 text-[0.9375rem] leading-[1.7] text-muted-foreground">
                  Разберём ситуацию и предложим, с чего начать: обоснование инвестиций, техническое
                  задание или оценку текущего проекта.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Cta asChild>
                    <a href="#contact">Обсудить задачу</a>
                  </Cta>
                  <Cta asChild variant="secondary">
                    <Link to="/services/technical-specification">Разработка ТЗ</Link>
                  </Cta>
                </div>
              </aside>
            </div>
          </div>
        </article>
        <Contact tone="surface" />
      </main>
      <Footer />
      <Toaster />
    </SiteContentProvider>
  );
}
