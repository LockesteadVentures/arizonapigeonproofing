// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

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
  integrations: [sitemap()],
});
