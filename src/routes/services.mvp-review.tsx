import { createFileRoute } from "@tanstack/react-router";

import { ServicePage, serviceHead } from "@/components/site/ServicePage";
import { getService } from "@/data/services";

const service = getService("mvp-review")!;

export const Route = createFileRoute("/services/mvp-review")({
  component: () => <ServicePage service={service} />,
  head: () => serviceHead(service),
});
