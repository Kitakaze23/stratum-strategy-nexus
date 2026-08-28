import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Cta, Reveal } from "@/components/site/primitives";
import { Toaster } from "@/components/ui/sonner";
import { INSIGHTS } from "@/data/insights";

export const Route = createFileRoute("/insights/$slug")({
  loader: ({ params }) => {
    const article = INSIGHTS.find((item) => item.slug === params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Статья не найдена" }, { name: "robots", content: "noindex" }] };
    }
    const { article } = loaderData;
    const url = `https://stratum-strategy-nexus.lovable.app/insights/${params.slug}`;
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
  const { article } = Route.useLoaderData();

  return (
    <>
      <Header />
      <main>
        <article className="border-b border-border pt-[76px]">
          <div className="container-page py-20 md:py-28">
            <Reveal className="measure">
              <Link
                to="/insights"
                className="inline-flex items-center gap-2 text-[0.9375rem] font-medium text-primary"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                Все статьи
              </Link>
              <p className="eyebrow mt-8">{article.readingTime}</p>
              <h1 className="mt-5 text-[2rem] font-semibold leading-[1.15] md:text-[2.75rem]">
                {article.title}
              </h1>
              <p className="mt-6 text-lg leading-[1.75] text-muted-foreground">{article.excerpt}</p>
            </Reveal>

            <div className="measure mt-14 space-y-6">
              {article.blocks.map((block, index) =>
                block.type === "h2" ? (
                  <h2
                    key={index}
                    className="pt-6 text-2xl font-semibold leading-[1.25] md:text-[1.75rem]"
                  >
                    {block.text}
                  </h2>
                ) : block.type === "p" ? (
                  <p key={index} className="text-[1.0625rem] leading-[1.8] text-muted-foreground">
                    {block.text}
                  </p>
                ) : (
                  <ul key={index} className="space-y-3">
                    {block.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-[1.0625rem] leading-[1.7] text-foreground/85"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.65rem] h-[7px] w-[7px] shrink-0 rounded-full bg-primary"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                ),
              )}
            </div>

            <div className="measure mt-14 rounded-[14px] border border-border bg-surface p-8 md:p-10">
              <p className="text-lg font-semibold leading-[1.4]">
                Нужен независимый взгляд на ваш продукт?
              </p>
              <p className="mt-3 text-[0.9375rem] leading-[1.7] text-muted-foreground">
                Разберём ситуацию и предложим подходящий формат работы.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Cta asChild>
                  <a href="/#contact">Обсудить задачу</a>
                </Cta>
                <Cta asChild variant="secondary">
                  <Link to="/services/ai-product-review">Product Review</Link>
                </Cta>
              </div>
            </div>
          </div>
        </article>
        <Contact />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}
