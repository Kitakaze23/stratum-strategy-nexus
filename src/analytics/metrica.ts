/**
 * Yandex Metrica transport.
 *
 * Single source of truth for the counter ID and initialization.
 * Every call is failure-tolerant: if Metrica is blocked, missing or the ID is
 * not configured, the functions become no-ops and the site keeps working.
 */

const RAW_ID = (import.meta.env["VITE_YANDEX_METRICA_ID"] ?? "") as string;

export const METRICA_ID = String(RAW_ID).trim();

let initialized = false;

export function isMetricaConfigured(): boolean {
  return METRICA_ID !== "";
}

export function isMetricaEnabled(): boolean {
  return typeof window !== "undefined" && isMetricaConfigured();
}

type YmFn = ((...args: unknown[]) => void) & { a?: unknown[][]; l?: number };

function getYm(): YmFn | undefined {
  return (window as unknown as { ym?: YmFn }).ym;
}

/** Loads the counter exactly once. Auto page view is disabled (defer: true). */
export function initMetrica(): void {
  if (!isMetricaEnabled() || initialized) return;
  initialized = true;

  try {
    const w = window as unknown as { ym?: YmFn };
    if (!w.ym) {
      const queue: YmFn = function (...args: unknown[]) {
        (queue.a = queue.a || []).push(args);
      } as YmFn;
      queue.l = Date.now();
      w.ym = queue;

      const script = document.createElement("script");
      script.src = "https://mc.yandex.ru/metrika/tag.js";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    getYm()?.(METRICA_ID, "init", {
      // page views are sent manually so SPA navigation is counted exactly once
      defer: true,
      ssr: true,
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
      trackHash: false,
      ecommerce: "dataLayer",
      referrer: document.referrer,
      url: window.location.href,
    });
  } catch {
    /* analytics must never break the app */
  }
}

/** Low-level Metrica call. Never throws. */
export function ym(method: string, ...args: unknown[]): void {
  if (!isMetricaEnabled()) return;
  try {
    getYm()?.(METRICA_ID, method, ...args);
  } catch {
    /* ignored */
  }
}

export function metricaHit(
  url: string,
  options?: { title?: string; referer?: string; params?: Record<string, unknown> },
): void {
  ym("hit", url, options ?? {});
}

export function metricaGoal(name: string, params?: Record<string, unknown>): void {
  if (params && Object.keys(params).length > 0) ym("reachGoal", name, params);
  else ym("reachGoal", name);
}

export function metricaParams(params: Record<string, unknown>): void {
  ym("params", params);
}
