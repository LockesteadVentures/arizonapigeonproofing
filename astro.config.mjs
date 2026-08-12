// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
  // Canonical domain — used to build absolute URLs for canonical tags, the
  // sitemap, and OG/Twitter meta. Must be 'www' to match Vercel's domain
  // config: the apex (non-www) 308-redirects to www there, and a redirected
  // sitemap URL reads as unfetchable in Search Console.
  site: 'https://www.arizonapigeonproofing.com',
  trailingSlash: 'always',
  // 'static' by default — output: 'server' would make every page an on-demand
  // function. We only need that for the two API routes, which opt in per-file
  // via `export const prerender = false`. Everything else stays static/fast.
  adapter: vercel(),
  integrations: [
    sitemap(),
    // Runs GTM (and everything loaded through it -- GA4, Google Ads, etc.) in
    // a web worker instead of the main thread. GTM's own JS was costing ~250ms
    // of TBT and delaying LCP under Lighthouse's mobile CPU throttling; this
    // is Google's own recommended fix for exactly that. `forward` lets our
    // main-thread code keep calling window.dataLayer.push(...) normally --
    // Partytown relays those calls into the worker transparently.
    // fallbackTimeout: if the worker sandbox can't set up (service workers
    // blocked by a privacy browser/corporate policy, etc.), Partytown's
    // default is a 10s wait before it gives up and just loads GTM normally.
    // 3s bounds that worst case without cutting off setup that's on track.
    partytown({ config: { forward: ['dataLayer.push'], fallbackTimeout: 3000 } }),
  ],
});
