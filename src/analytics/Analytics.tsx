import { useRouter, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

import { captureAttribution } from "./attribution";
import { trackPageView } from "./events";
import { useScrollDepth } from "./hooks";
import { initMetrica } from "./metrica";

/**
 * Mounted once in the root route.
 * Initializes Yandex Metrica, captures session attribution, sends SPA page
 * views and scroll-depth events. Renders nothing.
 */
export function Analytics() {
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    captureAttribution();
    initMetrica();
  }, []);

  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    // let the route's head() apply so document.title is correct
    const timer = window.setTimeout(() => trackPageView(pathname), 60);
    return () => window.clearTimeout(timer);
  }, [pathname, router]);

  useScrollDepth(pathname);

  return null;
}
