import { createFileRoute } from "@tanstack/react-router";

import { ServicePage, serviceHead } from "@/components/site/ServicePage";
import { getService } from "@/data/services";

const service = getService("legal-support")!;

export const Route = createFileRoute("/services/legal-support")({
  component: () => <ServicePage service={service} />,
  head: () => serviceHead(service),
});
