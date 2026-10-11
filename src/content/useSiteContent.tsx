import { queryOptions, useQuery } from "@tanstack/react-query";
import { createContext, useContext, useMemo, type ReactNode } from "react";

import { getSiteContentRows } from "@/lib/site-content.functions";

import { mergeContent, type SectionKey, type SiteContent } from "./defaults";

export const siteContentQuery = queryOptions({
  queryKey: ["site-content"],
  queryFn: () => getSiteContentRows(),
  staleTime: 60_000,
});

/**
 * SSR renders with the rows fetched in the route loader; the client must
 * hydrate from the same data or React throws a hydration mismatch. Loaders
 * return the rows and route components wrap the tree in SiteContentProvider.
 * Without a provider (admin, client-only pages) the hook falls back to the
 * query as before.
 */
const SiteContentContext = createContext<Record<string, unknown> | undefined>(undefined);

export function SiteContentProvider({
  rows,
  children,
}: {
  rows: Record<string, unknown>;
  children: ReactNode;
}) {
  return <SiteContentContext.Provider value={rows}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent(): SiteContent {
  const injected = useContext(SiteContentContext);
  const { data } = useQuery({ ...siteContentQuery, enabled: injected === undefined });
  return useMemo(
    () => mergeContent(injected ?? (data as Record<string, unknown> | undefined)),
    [data, injected],
  );
}

export function useSection<K extends SectionKey>(key: K): SiteContent[K] {
  return useSiteContent()[key];
}
