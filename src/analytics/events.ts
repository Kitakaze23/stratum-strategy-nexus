import { getAttribution } from "./attribution";
import { metricaGoal, metricaHit, metricaParams } from "./metrica";
import type {
  AnalyticsEventName,
  AnalyticsParams,
  ContactChannel,
  FormId,
  ServiceId,
} from "./types";

function currentPage(): string {
  if (typeof window === "undefined") return "";
  return window.location.pathname;
}

function clean(params: AnalyticsParams): Record<string, string | number | boolean> {
  const out: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === "") continue;
    out[key] = value;
  }
  return out;
}

/**
 * Single entry point for every custom analytics event.
 * Adds page + acquisition context automatically. Never sends form values.
 */
export function trackEvent(name: AnalyticsEventName | string, params: AnalyticsParams = {}): void {
  if (typeof window === "undefined") return;
  try {
    const payload = clean({
      page: currentPage(),
      ...getAttribution(),
      ...params,
    });
    metricaGoal(name, payload);
    metricaParams({ [name]: payload });
  } catch {
    /* analytics must never break the app */
  }
}

/* ------------------------------ page views ------------------------------- */

export function trackPageView(pathname: string, title?: string): void {
  if (typeof window === "undefined") return;
  try {
    metricaHit(window.location.origin + pathname + window.location.search, {
      title: title ?? document.title,
      referer: document.referrer,
    });
  } catch {
    /* ignored */
  }
  trackEvent("page_view", { page: pathname, title: title ?? undefined });
}

/* -------------------------------- funnel --------------------------------- */

export function trackSectionView(sectionId: string): void {
  trackEvent("section_view", { section_id: sectionId });
}

export function trackCtaClick(ctaName: string, location: string): void {
  trackEvent("cta_click", { cta_name: ctaName, location });
}

export function trackServiceClick(serviceName: ServiceId | string, location: string): void {
  trackEvent("service_click", { service_name: serviceName, location });
}

export function trackContactClick(channel: ContactChannel, location: string): void {
  trackEvent("contact_click", { channel, location });
}

export function trackScrollDepth(depth: 25 | 50 | 75 | 90): void {
  trackEvent("scroll_depth", { depth });
}

/* --------------------------------- forms --------------------------------- */

export function trackFormOpen(formId: FormId, source: string): void {
  trackEvent("form_open", { form_id: formId, source });
  if (formId === "ask_question_form") {
    trackEvent("ask_question_form_open", { source });
  }
  forEachFunnelIntent((funnel) => trackFunnelFormEvent(funnel, "form_open", { source }));
}

export function trackFormStart(formId: FormId): void {
  trackEvent("form_start", { form_id: formId });
  if (formId === "ask_question_form") trackEvent("ask_question_form_start", {});
  forEachFunnelIntent((funnel) => trackFunnelFormEvent(funnel, "form_start"));
}

export function trackFormFieldFocus(formId: FormId, fieldId: string, fieldType: string): void {
  // field_id / field_type only — never the value the user typed
  trackEvent("form_field_focus", { form_id: formId, field_id: fieldId, field_type: fieldType });
}

export function trackFormSubmit(formId: FormId, extra: AnalyticsParams = {}): void {
  trackEvent("form_submit", { form_id: formId, ...extra });
  if (formId === "ask_question_form") trackEvent("ask_question_form_submit", extra);
  forEachFunnelIntent((funnel) => trackFunnelFormEvent(funnel, "form_submit", extra));
}

export function trackFormAbandon(formId: FormId, lastFieldId?: string): void {
  trackEvent("form_abandon", { form_id: formId, last_field_id: lastFieldId });
}

/* ------------------------- service-level funnels -------------------------- */

type Funnel = "product_review" | "ai_product_review";

const INTENT_KEY = "stratum_funnel_intent";

/** Remembers which funnel the visitor came from, so form events can be attributed. */
function rememberFunnelIntent(funnel: Funnel): void {
  try {
    const current = new Set(readFunnelIntent());
    current.add(funnel);
    sessionStorage.setItem(INTENT_KEY, JSON.stringify([...current]));
  } catch {
    /* storage unavailable — funnel form events are simply not attributed */
  }
}

function readFunnelIntent(): Funnel[] {
  try {
    const raw = sessionStorage.getItem(INTENT_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed.filter((v) => typeof v === "string") as Funnel[]) : [];
  } catch {
    return [];
  }
}

function forEachFunnelIntent(fn: (funnel: Funnel) => void): void {
  for (const funnel of readFunnelIntent()) fn(funnel);
}

/** `product_review` / `ai_product_review` view + click + form funnels. */
export function trackFunnelView(funnel: Funnel, page: string): void {
  trackEvent(`${funnel}_view`, { page });
}

export function trackFunnelClick(funnel: Funnel, location: string): void {
  rememberFunnelIntent(funnel);
  trackEvent(`${funnel}_click`, { location });
}

export function trackFunnelFormEvent(
  funnel: Funnel,
  stage: "form_open" | "form_start" | "form_submit",
  params: AnalyticsParams = {},
): void {
  trackEvent(`${funnel}_${stage}`, params);
}
