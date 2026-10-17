import { createFileRoute, redirect } from "@tanstack/react-router";

/** Retired page — permanently redirected to the closest current service. */
export const Route = createFileRoute("/services/product-discovery")({
  beforeLoad: () => {
    throw redirect({ to: "/services/investment-assessment", statusCode: 301 });
  },
});
