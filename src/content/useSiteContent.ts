import { queryOptions, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { getSiteContentRows } from "@/lib/site-content.functions";

import { mergeContent, type SectionKey, type SiteContent } from "./defaults";

export const siteContentQuery = queryOptions({
  queryKey: ["site-content"],
  queryFn: () => getSiteContentRows(),
  staleTime: 60_000,
});

export function useSiteContent(): SiteContent {
  const { data } = useQuery(siteContentQuery);
  return useMemo(() => mergeContent(data as Record<string, unknown> | undefined), [data]);
}

export function useSection<K extends SectionKey>(key: K): SiteContent[K] {
  return useSiteContent()[key];
}
