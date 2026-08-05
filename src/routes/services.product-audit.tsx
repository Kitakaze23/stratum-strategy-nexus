import { createFileRoute } from "@tanstack/react-router";

import { ServicePage, serviceHead } from "@/components/site/ServicePage";
import { getService } from "@/data/services";

const service = getService("product-audit")!;

export const Route = createFileRoute("/services/product-audit")({
  component: () => <ServicePage service={service} />,
  head: () => serviceHead(service),
});
