# Analytics — Stratum Consulting

Single analytics layer built on Yandex Metrica. Components never call Metrica
directly: everything goes through `src/analytics`.

## Configuration

| Variable | Purpose |
| --- | --- |
| `VITE_YANDEX_METRICA_ID` | Yandex Metrica counter ID (`112000998`). If empty/missing, all analytics calls become no-ops and the site works normally. |

The counter ID exists in exactly one place (`src/analytics/metrica.ts`, read from
the env var). The official counter-specific tag URL is loaded:

```text
https://mc.yandex.ru/metrika/tag.js?id=112000998
```

`init` runs once per browser session. A marker stored on `window` prevents a
React remount or duplicate analytics mount from initializing the same counter
again.

Init options:

```js
ym(112000998, 'init', {
  ssr: true,
  clickmap: true,
  webvisor: true,
  ecommerce: 'dataLayer',
  referrer: document.referrer,
  url: location.href,
  accurateTrackBounce: true,
  trackLinks: true,
});
```

`tag.js` is loaded asynchronously, so it never blocks rendering. Initial
tracking is handled by the official tag; subsequent SPA route changes are sent
with `ym(id, "hit", ...)`. Scroll maps, form analytics, traffic sources and UTM
attribution keep working natively.
`ecommerce: "dataLayer"` is configured but no purchase/revenue events are ever
pushed — `payment_received`, `lead_qualified` and `meeting_booked` stay reserved
for real business actions from a future CRM/payment integration.

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
| `contact_click` | Contact channel click (tracked before navigation) | `channel` (`phone` / `telegram` / `whatsapp` / `email`), `location` | Contact section, Footer (the header/hero contain no contact links — adding them would be a design change) |
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
| `product_review_view` / `_click` / `_form_open` / `_form_start` / `_form_submit` | Product Review funnel: page view of `/services/product-audit`, `/services/mvp-review`, `/services/ai-product-review`; clicks on Product Review entry points; form stages once the visitor came through that funnel |
| `ai_product_review_view` / `_click` / `_form_open` / `_form_start` / `_form_submit` | AI Product Review funnel (`/services/ai-product-review`) — tracked separately as its own acquisition hypothesis |

Funnel form stages are attributed by remembering the clicked funnel in
`sessionStorage` (`stratum_funnel_intent`), so a click on a service page and the
later submit on the home-page form belong to the same funnel. `*_view` fires once
per route visit; form events are deduplicated per form session.

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
`legal_support`, `faq`, `contact`, `team` (the Team section is currently disabled
on the home page; its tracking stays in the code).

## Privacy per event

Every event listed above carries only technical identifiers. Specifically:

- `form_field_focus` sends `form_id`, `field_id`, `field_type` — never the value.
- `form_submit` sends `form_id`, `page`, `source` and `utm_*` — never names,
  phones, e-mails, Telegram/WhatsApp handles, question text or product URLs.
- `contact_click` sends the channel name, never the phone number or address.

## QA

Verification must inspect actual browser network traffic to `mc.yandex.ru`, not
only the existence of `window.ym` or queued `ym.a` calls. A passing check shows
requests other than `tag.js` after initial load, SPA navigation, CTA/form-open
actions, and a successful form submission.

Metrica initializes exactly once with ID `112000998`; SPA route transitions and
back-navigation issue `hit` calls; `scroll_depth`
25/50/75/90 once each; `section_view` once per section; CTA, service and contact
clicks recorded; contact and question form `form_open` → `form_start` →
`form_field_focus` → `form_submit` recorded with identifiers only; UTM
parameters (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`) preserved
across navigation and attached to form events; with `mc.yandex.ru` fully blocked
the site rendered, navigated and accepted form input with zero console errors.

## Reliability

All Metrica calls are wrapped in try/catch and check the configuration first, so
a blocked or missing counter can never break rendering, navigation, buttons or
form submission. Scroll tracking is throttled with `requestAnimationFrame` and
stops listening after the 90% threshold.
