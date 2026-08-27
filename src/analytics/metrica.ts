/**
 * Yandex Metrica transport.
 *
 * Single source of truth for the counter ID and initialization.
 * Every call is failure-tolerant: if Metrica is blocked, missing or the ID is
 * not configured, the functions become no-ops and the site keeps working.
 */

const RAW_ID = (import.meta.env["VITE_YANDEX_METRICA_ID"] ?? "") as string;

export const METRICA_ID = String(RAW_ID).trim();
const METRICA_SCRIPT_BASE = "https://mc.yandex.ru/metrika/tag.js";
const INIT_MARKER = "__stratumMetricaInitialized";

export function isMetricaConfigured(): boolean {
  return METRICA_ID !== "";
}

export function isMetricaEnabled(): boolean {
  return typeof window !== "undefined" && isMetricaConfigured();
}

type YmFn = ((...args: unknown[]) => void) & { a?: IArguments[]; l?: number };
type MetricaWindow = Window & {
  ym?: YmFn;
  [INIT_MARKER]?: Record<string, boolean>;
};

function getYm(): YmFn | undefined {
  return (window as MetricaWindow).ym;
}

/** Installs Yandex's official command queue and counter-specific loader. */
function installOfficialTag(): YmFn {
  const metricaWindow = window as MetricaWindow;

  if (!metricaWindow.ym) {
    const queue = function () {
      (queue.a = queue.a || []).push(arguments);
    } as YmFn;
    queue.l = Date.now();
    metricaWindow.ym = queue;
  }

  const scriptUrl = `${METRICA_SCRIPT_BASE}?id=${encodeURIComponent(METRICA_ID)}`;
  const existingScript = document.querySelector<HTMLScriptElement>(
    `script[src="${scriptUrl}"]`,
  );

  if (!existingScript) {
    const script = document.createElement("script");
    script.async = true;
    script.src = scriptUrl;
    const firstScript = document.getElementsByTagName("script")[0];
    if (firstScript?.parentNode) firstScript.parentNode.insertBefore(script, firstScript);
    else document.head.appendChild(script);
  }

  return metricaWindow.ym;
}

/** Loads and initializes this counter exactly once across React remounts. */
export function initMetrica(): void {
  if (!isMetricaEnabled()) return;

  try {
    const metricaWindow = window as MetricaWindow;
    const initializedCounters = metricaWindow[INIT_MARKER] ?? {};
    if (initializedCounters[METRICA_ID]) return;

    const counterId = Number(METRICA_ID);
    if (!Number.isSafeInteger(counterId) || counterId <= 0) return;

    const queue = installOfficialTag();
    initializedCounters[METRICA_ID] = true;
    metricaWindow[INIT_MARKER] = initializedCounters;

    queue(counterId, "init", {
      ssr: true,
      webvisor: true,
      clickmap: true,
      ecommerce: "dataLayer",
      referrer: document.referrer,
      url: window.location.href,
      accurateTrackBounce: true,
      trackLinks: true,
    });
  } catch {
    /* analytics must never break the app */
  }
}

/** Low-level Metrica call. Never throws. */
export function ym(method: string, ...args: unknown[]): void {
  if (!isMetricaEnabled()) return;
  try {
    const counterId = Number(METRICA_ID);
    if (!Number.isSafeInteger(counterId) || counterId <= 0) return;
    getYm()?.(counterId, method, ...args);
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
