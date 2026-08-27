# Fix Yandex Metrica production tracking

## Goal
Replace the current custom loader with the official Yandex Metrica bootstrap while preserving every existing event, funnel, attribution rule, and privacy restriction. No UI, copy, layout, navigation, or business-logic changes.

## Implementation
1. Update the centralized Metrica transport to:
   - read `VITE_YANDEX_METRICA_ID` as the single counter source;
   - install the official `window.ym` queue bootstrap exactly once;
   - load `https://mc.yandex.ru/metrika/tag.js?id=<counter-id>` asynchronously;
   - initialize once with `ssr`, `webvisor`, `clickmap`, `ecommerce`, `referrer`, `url`, `accurateTrackBounce`, and `trackLinks`;
   - remain a safe no-op when the environment variable is absent or the script is blocked.
2. Preserve the existing centralized event API and all event names. Keep manual SPA route hits, CTA/service/contact goals, form lifecycle goals, scroll/section events, and Product Review / AI Product Review / “Задать вопрос” funnels unchanged.
3. Keep all analytics payloads limited to technical metadata; do not read or transmit user-entered values.
4. Update analytics documentation to describe the official bootstrap URL, duplicate-init guard, and network-level QA criteria.

## Production configuration
- Keep `VITE_YANDEX_METRICA_ID=112000998` in the build environment and existing local configuration.
- Verify that the built browser bundle contains the configured counter and official script URL.

## Verification
- Capture browser network traffic, not just `window.ym` or its queue.
- Verify requests beyond `tag.js` after initial page load.
- Verify additional Metrica traffic after opening “Задать вопрос”, triggering a tracked CTA, and navigating to a service route.
- Verify the form-submit event through the real successful form path where available; if external delivery prevents a successful submission in QA, report that limitation explicitly rather than claiming success.
- Check browser console errors and confirm analytics blocking/failure does not break the site.
- Compare against the published production URL; because code changes are not live until deployment, clearly distinguish local production-build evidence from the currently published deployment evidence.
