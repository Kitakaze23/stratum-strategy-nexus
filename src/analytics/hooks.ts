import { useCallback, useEffect, useRef, useState } from "react";

import {
  trackFormAbandon,
  trackFormFieldFocus,
  trackFormOpen,
  trackFormStart,
  trackFormSubmit,
  trackScrollDepth,
  trackSectionView,
} from "./events";
import type { AnalyticsParams, FormId } from "./types";

/* ----------------------------- section views ----------------------------- */

/**
 * Fires `section_view` once per page view when the section enters the viewport.
 * Uses a stable analytics id, independent from the DOM anchor id.
 */
export function useSectionView<T extends HTMLElement = HTMLElement>(
  sectionId?: string,
  onView?: () => void,
) {
  const ref = useRef<T | null>(null);
  const onViewRef = useRef(onView);
  onViewRef.current = onView;

  useEffect(() => {
    if (!sectionId) return;
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    let sent = false;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !sent) {
            sent = true;
            trackSectionView(sectionId);
            onViewRef.current?.();
            observer.disconnect();
          }
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [sectionId]);

  return ref;
}

/* ------------------------------ scroll depth ----------------------------- */

const THRESHOLDS = [25, 50, 75, 90] as const;

/** Sends `scroll_depth` at 25/50/75/90 — each threshold once per page view. */
export function useScrollDepth(pathname: string) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const sent = new Set<number>();
    let raf = 0;

    const measure = () => {
      raf = 0;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const percent = ((window.scrollY || doc.scrollTop) / scrollable) * 100;
      for (const threshold of THRESHOLDS) {
        if (percent >= threshold && !sent.has(threshold)) {
          sent.add(threshold);
          trackScrollDepth(threshold);
        }
      }
      if (sent.size === THRESHOLDS.length) {
        window.removeEventListener("scroll", onScroll);
      }
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(measure);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);
}

/* --------------------------------- forms --------------------------------- */

export interface FormAnalytics {
  /** Attach to inputs: onFocus={fieldProps("name", "text").onFocus} */
  fieldProps: (fieldId: string, fieldType?: string) => { onFocus: () => void };
  onSubmitSuccess: (extra?: AnalyticsParams) => void;
}

/**
 * Form funnel tracking: open / start / field focus / submit / abandon.
 * `form_start` fires on the first real field interaction, once per form session.
 * Abandonment is reported on unmount (or page hide) only when the visitor
 * started filling the form and never submitted it successfully.
 */
export function useFormAnalytics(
  formId: FormId,
  options: { source: string; open?: boolean } = { source: "page" },
): FormAnalytics {
  const { source, open = true } = options;
  const started = useRef(false);
  const submitted = useRef(false);
  const lastField = useRef<string | undefined>(undefined);
  const [openedKey, setOpenedKey] = useState(0);

  // form_open — on mount, or each time a dialog form is opened
  useEffect(() => {
    if (!open) return;
    started.current = false;
    submitted.current = false;
    lastField.current = undefined;
    setOpenedKey((k) => k + 1);
    trackFormOpen(formId, source);
  }, [formId, source, open]);

  // form_abandon — started, not submitted, form closed / page left
  useEffect(() => {
    if (!open) return;
    const report = () => {
      if (started.current && !submitted.current) {
        started.current = false;
        trackFormAbandon(formId, lastField.current);
      }
    };
    const onHide = () => {
      if (document.visibilityState === "hidden") report();
    };
    document.addEventListener("visibilitychange", onHide);
    return () => {
      document.removeEventListener("visibilitychange", onHide);
      report();
    };
  }, [formId, open, openedKey]);

  const fieldProps = useCallback(
    (fieldId: string, fieldType = "text") => ({
      onFocus: () => {
        lastField.current = fieldId;
        if (!started.current) {
          started.current = true;
          trackFormStart(formId);
        }
        trackFormFieldFocus(formId, fieldId, fieldType);
      },
    }),
    [formId],
  );

  const onSubmitSuccess = useCallback(
    (extra: AnalyticsParams = {}) => {
      submitted.current = true;
      trackFormSubmit(formId, { source, ...extra });
    },
    [formId, source],
  );

  return { fieldProps, onSubmitSuccess };
}
