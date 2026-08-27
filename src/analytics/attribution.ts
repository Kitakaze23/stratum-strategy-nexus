import type { Attribution } from "./types";

const STORAGE_KEY = "stratum_attribution";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

let cache: Attribution | null = null;

function read(): Attribution {
  if (cache) return cache;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    cache = raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    cache = {};
  }
  return cache ?? {};
}

function write(value: Attribution) {
  cache = value;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    /* storage unavailable — attribution stays in-memory for this page */
  }
}

/**
 * Captures landing page, referrer and UTM parameters once per session.
 * Later navigations keep the original acquisition data.
 */
export function captureAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const existing = read();
    if (existing.landing_page) return existing;

    const params = new URLSearchParams(window.location.search);
    const next: Attribution = {
      landing_page: window.location.pathname,
    };
    const referrer = document.referrer;
    if (referrer && !referrer.includes(window.location.host)) next.referrer = referrer;
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) next[key] = value.slice(0, 150);
    }
    write(next);
    return next;
  } catch {
    return {};
  }
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    return read();
  } catch {
    return {};
  }
}
