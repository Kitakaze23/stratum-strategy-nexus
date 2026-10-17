import { createFileRoute } from "@tanstack/react-router";

import { ServicePage, serviceHead } from "@/components/site/ServicePage";
import { siteContentQuery } from "@/content/useSiteContent";
import { getService } from "@/data/services";

const service = getService("ai-product-review")!;

export const Route = createFileRoute("/services/ai-product-review")({
  loader: async ({ context }) => ({
    rows: (await context.queryClient.ensureQueryData(siteContentQuery)) ?? {},
  }),
  component: Page,
  head: () => serviceHead(service),
});

function Page() {
  const { rows } = Route.useLoaderData();
  return <ServicePage service={service} rows={rows} />;
}
