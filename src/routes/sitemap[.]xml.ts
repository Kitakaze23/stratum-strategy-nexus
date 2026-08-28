import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

import { INSIGHTS } from "@/data/insights";

// TODO: replace with your project URL once a project name or custom domain is set.
const BASE_URL = "";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/services/ai-product-review", changefreq: "monthly", priority: "0.9" },
          { path: "/services/product-audit", changefreq: "monthly", priority: "0.8" },
          { path: "/services/product-discovery", changefreq: "monthly", priority: "0.8" },
          { path: "/services/product-strategy", changefreq: "monthly", priority: "0.8" },
          { path: "/services/mvp-review", changefreq: "monthly", priority: "0.8" },
          { path: "/services/legal-support", changefreq: "monthly", priority: "0.8" },

          { path: "/insights", changefreq: "weekly", priority: "0.7" },
          ...INSIGHTS.map((a) => ({
            path: `/insights/${a.slug}`,
            changefreq: "monthly" as const,
            priority: "0.6",
          })),
          { path: "/privacy", changefreq: "yearly", priority: "0.3" },
          { path: "/consent", changefreq: "yearly", priority: "0.3" },
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
