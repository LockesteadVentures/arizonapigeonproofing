import type { APIRoute } from "astro";

// TEMPORARY -- confirms the fallback + CC lead email values, then deleted
// immediately after. Do not leave this deployed.
export const prerender = false;

export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      fallback: import.meta.env.LEAD_EMAIL_FALLBACK ?? null,
      cc: import.meta.env.LEAD_EMAIL_CC ?? null,
    }),
    { headers: { "Content-Type": "application/json" } }
  );
};
