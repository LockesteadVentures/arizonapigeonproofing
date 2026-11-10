// Usage: node scripts/seo-snapshot.mjs [outfile]
// Snapshots title, meta description, H1, word count (main content) and internal
// link count for the 8 priority URLs from the built site in dist/client.
import { readFileSync, writeFileSync, existsSync } from "node:fs";

export const PRIORITY_URLS = [
  "/",
  "/pigeon-proofing-solar-panels/",
  "/solar-panel-cleaning/",
  "/pigeon-proofing-solar-panels/tucson/",
  "/solar-panel-cleaning/tucson/",
  "/locations/tucson-metro/",
  "/pigeon-proofing-solar-panels/oro-valley/",
  "/solar-panel-cleaning/oro-valley/",
];

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&#39;|&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const strip = (html) => decode(html.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

export function snapshot(path, distDir = "dist/client") {
  const file = `${distDir}${path}index.html`;
  if (!existsSync(file)) return { path, error: "missing" };
  const html = readFileSync(file, "utf8");
  const title = decode((html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || "");
  const meta = decode((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "");
  const h1 = strip((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || "");
  const main = (html.match(/<main[^>]*>([\s\S]*?)<\/main>/) || [])[1] || "";
  const words = strip(main).split(" ").filter(Boolean).length;
  const links = [...main.matchAll(/<a\s[^>]*href="([^"]*)"/g)].map((m) => m[1]).filter((h) => h.startsWith("/") || h.includes("arizonapigeonproofing.com"));
  return { path, title, titleLength: title.length, meta, metaLength: meta.length, h1, words, internalLinks: links.length };
}

if ((process.argv[1] || "").endsWith("seo-snapshot.mjs")) {
  const out = process.argv[2];
  const data = PRIORITY_URLS.map((p) => snapshot(p));
  const json = JSON.stringify({ generated: new Date().toISOString(), pages: data }, null, 2);
  if (out) writeFileSync(out, json + "\n");
  else console.log(json);
}
