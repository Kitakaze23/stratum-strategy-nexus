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
  const isInitialPage = useRef(true);

  useEffect(() => {
    captureAttribution();
    initMetrica();
  }, []);

  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    // let the route's head() apply so document.title is correct
    // The official init sends the initial page hit. Manual hits are only for
    // client-side route changes, while page_view remains available as a goal.
    const sendHit = !isInitialPage.current;
    isInitialPage.current = false;
    const timer = window.setTimeout(() => trackPageView(pathname, undefined, sendHit), 60);
    return () => window.clearTimeout(timer);
  }, [pathname, router]);

  useScrollDepth(pathname);

  return null;
}
