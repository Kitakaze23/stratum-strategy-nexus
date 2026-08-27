/**
 * Analytics type contracts.
 *
 * Privacy rule: parameter values must never contain user-entered content
 * (names, phones, e-mails, messenger handles, free-form text, URLs typed by
 * the visitor). Only stable technical identifiers are allowed.
 */

export type AnalyticsEventName =
  // core funnel
  | "page_view"
  | "section_view"
  | "cta_click"
  | "service_click"
  | "contact_click"
  | "form_open"
  | "form_start"
  | "form_field_focus"
  | "form_submit"
  | "form_abandon"
  | "scroll_depth"
  // "Задать вопрос" funnel (free entry point)
  | "ask_question_view"
  | "ask_question_click"
  | "ask_question_form_open"
  | "ask_question_form_start"
  | "ask_question_form_submit"
  // Product Review funnel
  | "product_review_view"
  | "product_review_click"
  | "product_review_form_open"
  | "product_review_form_start"
  | "product_review_form_submit"
  // AI Product Review funnel
  | "ai_product_review_view"
  | "ai_product_review_click"
  | "ai_product_review_form_open"
  | "ai_product_review_form_start"
  | "ai_product_review_form_submit"
  // reserved for future CRM / payment integrations — not implemented here
  | "lead_qualified"
  | "meeting_booked"
  | "payment_received";

/** Only primitives — never objects that could carry raw form payloads. */
export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

export type FormId = "contact_form" | "ask_question_form";

export type ContactChannel = "phone" | "telegram" | "whatsapp" | "email";

export type ServiceId =
  | "product_review"
  | "ai_product_review"
  | "product_discovery"
  | "product_audit"
  | "product_strategy"
  | "mvp_review"
  | "enterprise_analytics"
  | "legal_support";

export interface Attribution {
  landing_page?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}
