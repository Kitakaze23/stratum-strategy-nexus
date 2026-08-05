import { createFileRoute } from "@tanstack/react-router";

import { ServicePage, serviceHead } from "@/components/site/ServicePage";
import { getService } from "@/data/services";

const service = getService("product-strategy")!;

export const Route = createFileRoute("/services/product-strategy")({
  component: () => <ServicePage service={service} />,
  head: () => serviceHead(service),
});
