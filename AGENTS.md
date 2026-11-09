## Project context

**arizonapigeonproofing.com** is a lead-generation site for solar panel pigeon-proofing and cleaning services in the Tucson, AZ metro area. Sam (sam@goodjujuagency.com) is the sole business operator; Claude is the sole hands-on-the-site developer — treat instructions given in chat as final, act autonomously within them, and default to shipping rather than asking permission for routine changes.

### Business model & scope
- Live service area today: **Tucson Metro only** (15 cities, tiered `1`/`2` by priority). Phoenix Metro pages exist but are marked "coming soon" — do not imply Phoenix or statewide coverage is live anywhere (titles, meta descriptions, or body copy). "Tucson Metro today, expanding to Phoenix/statewide" hedging language is the approved pattern; a bare "Arizona-wide" claim is not.
- Reviews shown sitewide (`Testimonials.astro`) are 3 real Google reviews that legally belong to **Desert Solar Cleaning** (a different legal entity), reused here by explicit user decision. `reviewCount` in the AggregateRating schema is deliberately kept at `3` (the real count shown), not the vendor's true ~30, to avoid an inflated/false schema claim. This is a known, accepted tension — flagged once in a code comment, not to be "fixed" by inflating the count or silently removed.
- Photos on the site (all supplied by Sam, rendered via `astro:assets` `<Image>` as responsive webp): the home hero (`src/assets/hero-solar-roof.jpg`, birds on a tile roof above a solar array at sunset) and `src/assets/pigeons-on-solar-roof.jpg` (row of pigeons on a roof ridge above an array), shown via `PigeonPhoto.astro` on the pigeon-proofing hub and all 15 pigeon-proofing city pages (not the cleaning pages). Alt text/captions describe the scenes only — it is not a customer job photo and must not be presented as before/after work. These are not customer job photos; no real job photos exist. Do not fabricate or stage before/after photos and present them as genuine customer work — this is blocked on Sam sourcing real photo assets (from Desert Solar Cleaning or new job sites), not something to solve in code.
- Pricing sections have been intentionally removed sitewide (prior explicit decision) — don't reintroduce a pricing page/section without being asked.

### Data model
- `src/data/locations.js` — `REGIONS` (tucson/phoenix/rest, each with a `fulfilled` boolean = vendor-confirmed live), `CITIES` (each with a `tier`: 1 = primary/high-priority, 2 = secondary), `LIVE_CITIES`/`liveCitiesByRegion()` filter by tier + fulfilled. **`tier` = content depth/priority, `fulfilled` = actually live** — these are separate axes, don't conflate them.
- `src/data/cityContext.js` — real, WebSearch-verified per-city facts (named communities, incorporation/jurisdiction status, local character, one bespoke local FAQ) for all 15 Tucson-area cities. This is the tool for adding genuine per-city differentiation — mine it further before writing new city-specific prose from scratch.
- `src/data/serviceContent.js` — shared `SERVICE_CONTENT[service].hub.{signs, methodology, trustPoints}` and per-city `content.{intro, problemFraming, process, faqs}`. This is the content that's **identical across all 27 city×service pages** for a given service — the main driver of measured ~86% text similarity between city pages (e.g. Oro Valley vs. Vail). Any de-duplication work should focus here or expand `cityContext.js`, not just tweak titles/meta (which already vary correctly per city).

### Architecture
- Astro (static output) + `@astrojs/vercel` adapter, deployed via `vercel --prod` (project: `lockestead-ventures-8943683a/arizonapigeonproofing` — do NOT use/recreate the erroneous duplicate `arizona-pigeon-proofing` project from earlier linking mistakes).
- `src/components/CityServicePage.astro` is the shared template rendering all 27 Tucson city×service pages; `src/layouts/BaseLayout.astro` renders sitewide `HomeAndConstructionBusiness` JSON-LD (per-page `areaServed` prop, defaults to the full live-city array on non-city pages); `FaqSection.astro` and `Testimonials.astro` are shared components used on the homepage and both service hub pages, each carrying their own FAQPage / Review+AggregateRating schema.
- Quote form (`src/pages/quote.astro` + `src/pages/api/quote.ts`, Resend for email) accepts `?metro=&address=&service=` query params and prefills the form — city/service pages link to `/quote/` with these params pre-populated rather than a bare link. Metro dropdown currently offers Tucson Metro only (Phoenix/Rest of Arizona removed from the form until those regions go live); name/phone/metro/address/service are all required client- and server-side.
- GTM (`GTM-NRVDP9X4`) loads via the standard direct Google snippet in `Tracking.astro` (main thread, `async`) — NOT Partytown. Partytown was tried for the TBT/LCP win but its worker sandbox never finished initializing in production (confirmed via real Chrome: zero network activity to partytown.js, `window.dataLayer` staying undefined indefinitely, no console error) — GTM silently never loaded at all. Removed entirely (astro.config.mjs integration + package). Don't re-add it without a way to verify it's actually working, not just installed. GA4 events: `form_start`, `generate_lead` (includes raw name/phone by deliberate business decision — GA4 is the system of record for lead PII), `form_error`, `cta_click`, `click_to_call`, `region_tab_select`, `nav_menu_open`.
- Guides content collection (`src/content.config.ts`, `astro:content`) — 4 hub-and-spoke topic silos, 30 guides total (pigeons-and-solar-panels, solar-panel-cleaning-arizona, hoa-solar-panel-rules-arizona, solar-panel-maintenance-arizona). Keep publishing more using the same hub-and-spoke pattern (chosen for AI-answer-engine / SERP pickup). `/guides/` index collapses each hub's spoke list into a closed-by-default `<details>` accordion — don't re-expand that back into a flat list.

### Standing conventions
- Never hand-write HTML entities (`&amp;`) inside an Astro prop string that gets interpolated into `{}` — Astro auto-escapes, so literal `&amp;` becomes `&amp;amp;` on render. Use the literal character (`&`).
- Verification workflow: `npm run build` → grep/regex-check `dist/client/**/index.html` for heading order and content spot-checks → commit → push → `vercel --prod` → `curl` the live URL to confirm. For structural checks on our own built output, prefer `curl`/regex over the browser tool.
- The Browser tool's scroll gesture is unreliable in this environment; if you need more content in view, resize the viewport to an extreme height (e.g. 1280x6000–12000) instead of scrolling.
- (Corrected — see GTM note above) A `ServiceWorker` registration error was previously written off here as a browser-sandbox-only quirk. It wasn't: it was Partytown's sandbox failing to initialize for real, in production, in real Chrome too — which is what silently broke GTM. Don't assume a recurring console error is sandbox-only without checking a real browser first.
- Don't add fake urgency, fabricated stats, or invented review counts/photos. Real, sourced data only (see `cityContext.js` and the `LocalStatsBlock` stats, which cite NREL/NWS/Arizona Daily Star).

### Open items
- **Real photos sitewide** — only the home hero has a photo now (see above); the rest is blocked on Sam sourcing real assets (Desert Solar Cleaning or new job sites), do not fabricate. Also blocks `og:image`/`twitter:image` (currently missing sitewide), per-guide Article schema `image`, and a PNG/ICO favicon fallback (SVG-only today).
- **De-duplicate the 27 city×service pages** — ~86% text similarity measured between near-identical city pages (e.g. Oro Valley vs. Vail). Root cause is `serviceContent.js`'s shared `hub.{signs,methodology}` content being identical across all city pages for a given service — see the Data model note above. Titles/meta/FAQ already vary correctly per city; this needs real content variation, not more metadata tweaks.
- Full technical SEO audit (meta titles/descriptions, schema, sitemap, llms.txt) was completed and fixed in this session — Tucson-vs-Arizona branding gap, About page placeholder copy, breadcrumb/Service schema, privacy/terms pages, and a stale llms.txt are all resolved. Don't re-run that audit from scratch; ask what's changed since if unsure.

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
