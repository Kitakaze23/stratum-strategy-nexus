import { createFileRoute, redirect } from "@tanstack/react-router";

/** Retired page — permanently redirected to the closest current service. */
export const Route = createFileRoute("/services/mvp-review")({
  beforeLoad: () => {
    throw redirect({ to: "/services/product-audit", statusCode: 301 });
  },
});
