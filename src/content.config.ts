import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Guides are the Byword.ai pipeline's output — see src/pages/api/webhook/byword.ts.
// Byword's webhook opens a PR that adds a file here; nothing publishes until it's
// reviewed and merged (site plan §7 — human edit pass before publish).
const guides = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/guides" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    draft: z.boolean().default(false),
    // Hub-and-spoke pieces carry their FAQ as structured data (kept byte-identical
    // to the visible "## FAQ" section in the body) so the page can emit FAQPage
    // schema without re-parsing markdown. Flat Byword.ai output just omits this.
    faqs: z.array(z.object({ question: z.string(), answer: z.string() })).optional(),
  }),
});

export const collections = { guides };
