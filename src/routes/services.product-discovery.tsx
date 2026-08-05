import { createFileRoute } from "@tanstack/react-router";

import { ServicePage, serviceHead } from "@/components/site/ServicePage";
import { getService } from "@/data/services";

const service = getService("product-discovery")!;

export const Route = createFileRoute("/services/product-discovery")({
  component: () => <ServicePage service={service} />,
  head: () => serviceHead(service),
});
