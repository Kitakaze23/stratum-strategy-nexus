import { createFileRoute } from "@tanstack/react-router";

import { ServicePage, serviceHead } from "@/components/site/ServicePage";
import { siteContentQuery } from "@/content/useSiteContent";
import { getService } from "@/data/services";

const service = getService("product-audit")!;

export const Route = createFileRoute("/services/product-audit")({
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
