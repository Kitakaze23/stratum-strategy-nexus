# Analytics — Stratum Consulting

Single analytics layer built on Yandex Metrica. Components never call Metrica
directly: everything goes through `src/analytics`.

## Configuration

| Variable | Purpose |
| --- | --- |
| `VITE_YANDEX_METRICA_ID` | Yandex Metrica counter ID. If empty/missing, all analytics calls become no-ops and the site works normally. |

Counter options enabled on init: `clickmap`, `trackLinks`, `accurateTrackBounce`,
`webvisor`, form analytics and scroll map (native Metrica features), traffic
sources and UTM (handled by Metrica automatically). Automatic page views are
disabled (`defer: true`) because SPA page views are sent manually — exactly one
hit per route, no double counting of the initial load.

## Modules

```
src/analytics/
  metrica.ts      – counter ID, one-time init, safe ym() wrapper
  attribution.ts  – landing_page / referrer / utm_* captured once per session
  events.ts       – trackEvent() + typed helpers (the only public API)
  hooks.ts        – useSectionView, useScrollDepth, useFormAnalytics
  types.ts        – event names, form/service/channel identifiers
  Analytics.tsx   – mounted once in src/routes/__root.tsx
```

Adding a new event never requires touching the Metrica init:

```ts
trackEvent("payment_received", { product: "product_review" });
```

Every event automatically carries `page`, `landing_page`, `referrer` and any
`utm_*` captured at session start.

## Privacy

Only technical identifiers are sent: `form_id`, `field_id`, `field_type`,
`service_name`, `cta_name`, `page`, `location`, `source`, `section_id`, `depth`,
`utm_*`, `landing_page`, `referrer`.

Never sent: names, phone numbers, e-mails, Telegram/WhatsApp handles, message or
question text, product URLs entered by the visitor, or any other free-form
input. Form helpers receive field identifiers only — values are never read.

## Event map

| Event | Purpose | Parameters | Triggered in |
| --- | --- | --- | --- |
| `page_view` | Page/route view (SPA-aware) | `page`, `title`, attribution | `Analytics.tsx` on every route resolution |
| `section_view` | Section entered viewport (once per page view) | `section_id`, `page` | `Section` primitive via `trackId`, `Hero` |
| `scroll_depth` | Reading depth | `depth` = 25 / 50 / 75 / 90 (once each) | `useScrollDepth` |
| `cta_click` | Commercial CTA click | `cta_name`, `page`, `location` | Header, Hero, Pricing, service pages |
| `service_click` | Service card / service CTA click | `service_name`, `page`, `location` | Services, AfterLaunch, ServicePage |
| `contact_click` | Contact channel click (tracked before navigation) | `channel`, `location` | Contact section, Footer |
| `form_open` | Form became available to the visitor | `form_id`, `page`, `source` | `useFormAnalytics` |
| `form_start` | First real field interaction (once per form session) | `form_id`, `page` | `useFormAnalytics` |
| `form_field_focus` | Field interaction | `form_id`, `field_id`, `field_type` | `useFormAnalytics` |
| `form_submit` | Successful submission confirmed by the API | `form_id`, `page`, `source`, attribution | Contact form, question dialog |
| `form_abandon` | Started but never submitted (on close / page hide) | `form_id`, `last_field_id` | `useFormAnalytics` |

### Funnel events

| Event | Trigger |
| --- | --- |
| `ask_question_view` | Free "Задать вопрос" card enters viewport |
| `ask_question_click` | Click on the free-question CTA |
| `ask_question_form_open` / `_form_start` / `_form_submit` | Question dialog lifecycle |
| `product_review_view` / `_click` / `_form_open` / `_form_start` / `_form_submit` | Product Review funnel (`/services/product-audit`, `/services/mvp-review`, Product Review entry points) |
| `ai_product_review_view` / `_click` / `_form_open` / `_form_start` / `_form_submit` | AI Product Review funnel (`/services/ai-product-review`) |

### Reserved (not implemented — no fake data)

`lead_qualified`, `meeting_booked`, `payment_received`. These are typed and
ready in `types.ts`; they must only be sent by a real CRM/payment integration.

## Identifiers

Forms: `contact_form`, `ask_question_form`.

Contact form fields: `name`, `company`, `role`, `email`, `phone`, `message`,
`consent`. Question form fields: `name`, `contact`, `question`, `product_url`.

CTAs: `discuss_task`, `independent_opinion`, `ask_question`, `product_review`,
`strategy_review`, `product_assessment`, `service_primary`.

Services: `ai_product_review`, `product_discovery`, `product_audit`,
`product_strategy`, `mvp_review`, `legal_support`.

Analytics sections (stable, independent of DOM anchor ids so navigation and copy
can change freely): `hero`, `business_challenges`, `product_review`,
`expertise`, `services`, `why_stratum`, `achievements`,
`industrial_experience`, `process`, `consultation_formats`, `ask_question_card`,
`faq`, `contact`, `team`.

## Reliability

All Metrica calls are wrapped in try/catch and check the configuration first, so
a blocked or missing counter can never break rendering, navigation, buttons or
form submission. Scroll tracking is throttled with `requestAnimationFrame` and
stops listening after the 90% threshold.
