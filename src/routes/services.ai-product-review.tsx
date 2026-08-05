import { createFileRoute } from "@tanstack/react-router";

import { ServicePage, serviceHead } from "@/components/site/ServicePage";
import { getService } from "@/data/services";

const service = getService("ai-product-review")!;

export const Route = createFileRoute("/services/ai-product-review")({
  component: () => <ServicePage service={service} />,
  head: () => serviceHead(service),
});
