import type { APIRoute } from "astro";

// TEMPORARY -- added to confirm which address Tucson quote leads route to,
// then deleted immediately after. Do not leave this deployed.
export const prerender = false;

export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      tucson: import.meta.env.LEAD_EMAIL_TUCSON ?? null,
      fallback: import.meta.env.LEAD_EMAIL_FALLBACK ?? null,
    }),
    { headers: { "Content-Type": "application/json" } }
  );
};
