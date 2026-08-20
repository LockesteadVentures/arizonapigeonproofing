## Project context

**arizonapigeonproofing.com** is a lead-generation site for solar panel pigeon-proofing and cleaning services in the Tucson, AZ metro area. Sam (sam@goodjujuagency.com) is the sole business operator; Claude is the sole hands-on-the-site developer — treat instructions given in chat as final, act autonomously within them, and default to shipping rather than asking permission for routine changes.

### Business model & scope
- Live service area today: **Tucson Metro only** (15 cities, tiered `1`/`2` by priority). Phoenix Metro pages exist but are marked "coming soon" — do not imply Phoenix or statewide coverage is live anywhere (titles, meta descriptions, or body copy). "Tucson Metro today, expanding to Phoenix/statewide" hedging language is the approved pattern; a bare "Arizona-wide" claim is not.
- Reviews shown sitewide (`Testimonials.astro`) are 3 real Google reviews that legally belong to **Desert Solar Cleaning** (a different legal entity), reused here by explicit user decision. `reviewCount` in the AggregateRating schema is deliberately kept at `3` (the real count shown), not the vendor's true ~30, to avoid an inflated/false schema claim. This is a known, accepted tension — flagged once in a code comment, not to be "fixed" by inflating the count or silently removed.
- No real job photos exist anywhere on the site (zero `<img>` tags as of the last audit). Do not fabricate or stage before/after photos and present them as genuine customer work — this is blocked on Sam sourcing real photo assets (from Desert Solar Cleaning or new job sites), not something to solve in code.
- Pricing sections have been intentionally removed sitewide (prior explicit decision) — don't reintroduce a pricing page/section without being asked.

### Data model
- `src/data/locations.js` — `REGIONS` (tucson/phoenix/rest, each with a `fulfilled` boolean = vendor-confirmed live), `CITIES` (each with a `tier`: 1 = primary/high-priority, 2 = secondary), `LIVE_CITIES`/`liveCitiesByRegion()` filter by tier + fulfilled. **`tier` = content depth/priority, `fulfilled` = actually live** — these are separate axes, don't conflate them.
- `src/data/cityContext.js` — real, WebSearch-verified per-city facts (named communities, incorporation/jurisdiction status, local character, one bespoke local FAQ) for all 15 Tucson-area cities. This is the tool for adding genuine per-city differentiation — mine it further before writing new city-specific prose from scratch.
- `src/data/serviceContent.js` — shared `SERVICE_CONTENT[service].hub.{signs, methodology, trustPoints}` and per-city `content.{intro, problemFraming, process, faqs}`. This is the content that's **identical across all 27 city×service pages** for a given service — the main driver of measured ~86% text similarity between city pages (e.g. Oro Valley vs. Vail). Any de-duplication work should focus here or expand `cityContext.js`, not just tweak titles/meta (which already vary correctly per city).

### Architecture
- Astro (static output) + `@astrojs/vercel` adapter, deployed via `vercel --prod` (project: `lockestead-ventures-8943683a/arizonapigeonproofing` — do NOT use/recreate the erroneous duplicate `arizona-pigeon-proofing` project from earlier linking mistakes).
- `src/components/CityServicePage.astro` is the shared template rendering all 27 Tucson city×service pages; `src/layouts/BaseLayout.astro` renders sitewide `HomeAndConstructionBusiness` JSON-LD (per-page `areaServed` prop, defaults to the full live-city array on non-city pages); `FaqSection.astro` and `Testimonials.astro` are shared components used on the homepage and both service hub pages, each carrying their own FAQPage / Review+AggregateRating schema.
- Quote form (`src/pages/quote.astro` + `src/pages/api/quote.ts`, Resend for email) accepts `?metro=&city=&service=` query params and prefills the form — city/service pages link to `/quote/` with these params pre-populated rather than a bare link.
- GTM (`GTM-NRVDP9X4`) loads via Partytown web worker. GA4 events: `form_start`, `generate_lead` (includes raw name/phone by deliberate business decision — GA4 is the system of record for lead PII), `form_error`, `cta_click`, `click_to_call`, `region_tab_select`, `nav_menu_open`.
- Guides content collection (`src/content.config.ts`, `astro:content`) — only 3 guides exist so far; keep publishing more using the established content-silo topics (chosen for AI-answer-engine / SERP pickup), same cadence as before.

### Standing conventions
- Never hand-write HTML entities (`&amp;`) inside an Astro prop string that gets interpolated into `{}` — Astro auto-escapes, so literal `&amp;` becomes `&amp;amp;` on render. Use the literal character (`&`).
- Verification workflow: `npm run build` → grep/regex-check `dist/client/**/index.html` for heading order and content spot-checks → commit → push → `vercel --prod` → `curl` the live URL to confirm. For structural checks on our own built output, prefer `curl`/regex over the browser tool.
- The Browser tool's scroll gesture is unreliable in this environment; if you need more content in view, resize the viewport to an extreme height (e.g. 1280x6000–12000) instead of scrolling.
- A `ServiceWorker` registration error in the browser console on every page load is a known sandbox limitation of the test browser, not a site bug — don't re-diagnose it.
- Don't add fake urgency, fabricated stats, or invented review counts/photos. Real, sourced data only (see `cityContext.js` and the `LocalStatsBlock` stats, which cite NREL/NWS/Arizona Daily Star).

### Status of the last punch list (10 items, priority order)
Done: (1) fixed double-HTML-encoded titles, (2) added Review/AggregateRating schema, (3) upgraded Organization→LocalBusiness schema with per-page `areaServed`, (7) added post-testimonial CTA + quote-form city prefill, (8) removed hard-coded hero `<br>`, (9) regrouped city pills into Primary/Also-serving (tier-based, all links kept), (10) added FAQ schema to homepage + both service hubs.
Still open: (4) real photos sitewide — blocked on Sam sourcing real assets, do not fabricate; (5) de-duplicate the 27 city×service pages beyond current per-city facts — see `serviceContent.js` note above; (6) Tucson-vs-Arizona branding gap — last audit found body copy already uses correct "Tucson today, expanding" hedging, but titles/meta on `about.astro`, `contact.astro`, and `quote.astro` say bare "Arizona" without a Tucson qualifier and haven't been judged/fixed yet.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
