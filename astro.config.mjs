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
  // Guides are the only markdown content on the site. Smartypants converts
  // straight quotes/apostrophes to curly ones in the rendered body, but the
  // FAQPage schema is built from the raw frontmatter string -- leaving it on
  // silently breaks Google's "schema must match visible text" requirement for
  // any FAQ containing a quote mark. Off keeps the two byte-identical.
  markdown: { smartypants: false },
  // 3 retired placeholder guides redirect via vercel.json instead of this config's
  // `redirects` -- with trailingSlash: 'always', Astro/Vercel adapter emits a
  // route regex that only matches the no-trailing-slash form, which the site
  // itself never requests (everything gets normalized to a trailing slash first),
  // so the redirect silently 404s. See vercel.json.
  // 'static' by default — output: 'server' would make every page an on-demand
  // function. We only need that for the two API routes, which opt in per-file
  // via `export const prerender = false`. Everything else stays static/fast.
  adapter: vercel(),
  integrations: [sitemap()],
});
