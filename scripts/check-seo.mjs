// Build-time SEO guardrails. Runs against dist/client after `astro build` and exits
// non-zero on any failure, so a bad deploy fails the build instead of shipping.
//
//   node scripts/check-seo.mjs
//
// Checks
//  1. No `[[CLIENT:` placeholder text anywhere in rendered HTML.
//  2. Title <= 65 chars, meta description <= 160 chars, and no two pages share a
//     title or a meta description.
//  3. No em dash (U+2014) or en dash (U+2013) in titles, meta descriptions, or
//     headings (h1-h3) on any page except guide articles, whose headings are
//     authored in markdown and predate this rule. (Body copy written in the
//     2026-11-10 SEO pass was kept dash-free by hand; existing body copy is not
//     rewritten wholesale.)
//  4. No double-encoded `&amp;amp;`.
//  5. Every JSON-LD block parses, and FAQPage schema text equals the visible FAQ text.
//  6. Internal links resolve (page exists, #fragment exists), and no page in the
//     sitemap is an orphan (zero inbound internal links).
//  7. noindex pages (terms, privacy) are absent from the sitemap.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

const DIST = "dist/client";
const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
const text = (html) => decode(html.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      if (name === "_astro" || name === "_vercel") continue;
      out.push(...walk(p));
    } else if (name === "index.html") out.push(p);
  }
  return out;
}

const pages = walk(DIST).map((file) => {
  const rel = "/" + relative(DIST, file).replace(/index\.html$/, "");
  return { file, path: rel === "//" ? "/" : rel, html: readFileSync(file, "utf8") };
});

const failures = [];
const fail = (page, msg) => failures.push(`${page}: ${msg}`);

const titles = new Map();
const metas = new Map();

for (const { path, html } of pages) {
  const isGuide = path.startsWith("/guides/");

  // 1
  if (html.includes("[[CLIENT:")) fail(path, "contains [[CLIENT: placeholder");

  // 2
  const title = decode((html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || "");
  const meta = decode((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "");
  if (!title) fail(path, "missing <title>");
  if (!meta) fail(path, "missing meta description");
  if (title.length > 65) fail(path, `title is ${title.length} chars (max 65): ${title}`);
  if (meta.length > 160) fail(path, `meta description is ${meta.length} chars (max 160)`);
  if (title) titles.set(title, [...(titles.get(title) || []), path]);
  if (meta) metas.set(meta, [...(metas.get(meta) || []), path]);

  // 3
  const dashRe = /[–—]/;
  if (dashRe.test(title)) fail(path, "dash in title");
  if (dashRe.test(meta)) fail(path, "dash in meta description");
  if (!isGuide) {
    for (const m of html.matchAll(/<h([1-3])[^>]*>([\s\S]*?)<\/h\1>/g)) {
      if (dashRe.test(text(m[2]))) fail(path, `dash in h${m[1]}: ${text(m[2])}`);
    }
  }
  if (/[&]/.test(title)) fail(path, "ampersand in title");

  // 4
  if (html.includes("&amp;amp;")) fail(path, "contains &amp;amp;");

  // 5
  const faqSchemas = [];
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const json = JSON.parse(m[1]);
      if (json["@type"] === "FAQPage") faqSchemas.push(json);
    } catch (e) {
      fail(path, `JSON-LD does not parse: ${e.message}`);
    }
  }
  const visible = [
    ...html.matchAll(/<details class="faq-item[^"]*"[^>]*>\s*<summary[^>]*>([\s\S]*?)<\/summary>\s*<p[^>]*>([\s\S]*?)<\/p>\s*<\/details>/g),
  ].map((m) => ({ q: text(m[1]), a: text(m[2]) }));
  if (faqSchemas.length > 1) fail(path, "more than one FAQPage block");
  if (faqSchemas.length === 1 && visible.length) {
    const schema = faqSchemas[0].mainEntity.map((e) => ({ q: text(e.name), a: text(e.acceptedAnswer.text) }));
    if (schema.length !== visible.length) {
      fail(path, `FAQ schema has ${schema.length} questions, page shows ${visible.length}`);
    } else {
      schema.forEach((s, i) => {
        if (s.q !== visible[i].q || s.a !== visible[i].a) fail(path, `FAQ #${i + 1} schema text differs from visible text`);
      });
    }
  } else if (visible.length && !faqSchemas.length) {
    fail(path, "visible FAQ but no FAQPage schema");
  }
}

for (const [t, ps] of titles) if (ps.length > 1) fail(ps.join(", "), `duplicate title: ${t}`);
for (const [m, ps] of metas) if (ps.length > 1) fail(ps.join(", "), `duplicate meta description: ${m.slice(0, 70)}...`);

// 6 + 7: internal links, orphans, sitemap
const byPath = new Map(pages.map((p) => [p.path, p]));
const inbound = new Map(pages.map((p) => [p.path, 0]));
const ids = new Map(pages.map((p) => [p.path, new Set([...p.html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]))]));

for (const { path, html } of pages) {
  for (const m of html.matchAll(/<a\s[^>]*?href="([^"]*)"/g)) {
    let href = decode(m[1]);
    if (/^(mailto:|tel:|https?:\/\/(?!www\.arizonapigeonproofing\.com))/.test(href)) continue;
    href = href.replace(/^https?:\/\/www\.arizonapigeonproofing\.com/, "");
    if (!href.startsWith("/") && !href.startsWith("#")) continue;
    const [beforeFrag, frag] = href.split("#");
    const pathPart = beforeFrag.split("?")[0];
    const target = pathPart === "" ? path : pathPart;
    if (!byPath.has(target)) {
      if (existsSync(join(DIST, target)) && statSync(join(DIST, target)).isFile()) continue; // asset
      fail(path, `broken internal link: ${href}`);
      continue;
    }
    if (target !== path) inbound.set(target, (inbound.get(target) || 0) + 1);
    if (frag && !ids.get(target).has(frag)) fail(path, `link to missing anchor: ${href}`);
  }
}

const sitemapFiles = existsSync(DIST) ? readdirSync(DIST).filter((f) => /^sitemap.*\.xml$/.test(f)) : [];
const sitemapUrls = new Set();
for (const f of sitemapFiles) {
  for (const m of readFileSync(join(DIST, f), "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)) {
    sitemapUrls.add(m[1].replace(/^https?:\/\/[^/]+/, ""));
  }
}
for (const p of sitemapUrls) {
  if (p.endsWith(".xml")) continue;
  if (!byPath.has(p)) fail("sitemap", `lists a URL with no built page: ${p}`);
  else if (p !== "/" && !inbound.get(p)) fail(p, "orphan page (no inbound internal links)");
}
for (const noindexed of ["/terms/", "/privacy/"]) {
  if (sitemapUrls.has(noindexed)) fail("sitemap", `${noindexed} must not be in the sitemap`);
  const page = byPath.get(noindexed);
  if (page && !/<meta name="robots" content="noindex, follow"/.test(page.html)) fail(noindexed, "missing noindex, follow meta");
}

if (failures.length) {
  console.error(`\nSEO checks FAILED (${failures.length}):`);
  for (const f of failures) console.error("  - " + f);
  process.exit(1);
}
console.log(`SEO checks passed: ${pages.length} pages, ${sitemapUrls.size} sitemap URLs.`);
