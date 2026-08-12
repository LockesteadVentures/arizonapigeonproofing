// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Canonical domain — used to build absolute URLs for canonical tags, the
  // sitemap, and OG/Twitter meta. Update if the final domain differs;
  // arizonapigeonproofing.com is not registered yet as of this writing.
  site: 'https://arizonapigeonproofing.com',
  trailingSlash: 'always',
  // 'static' by default — output: 'server' would make every page an on-demand
  // function. We only need that for the two API routes, which opt in per-file
  // via `export const prerender = false`. Everything else stays static/fast.
  adapter: vercel(),
  integrations: [sitemap()],
});
