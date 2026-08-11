import type { APIRoute } from "astro";
import { REGIONS, VENDOR_BY_REGION } from "../../data/locations.js";

// This route must run on-demand (Vercel function), not at build time.
export const prerender = false;

interface QuotePayload {
  name?: string;
  phone?: string;
  metro?: string; // dropdown value — a REGIONS key, drives routing
  city?: string; // free-text detail (city/neighborhood) for the vendor, not used for routing
  service?: string;
  page?: string;
  // honeypot — real users never fill this in; bots often do
  company?: string;
}

function recipientFor(metroKey: string): { email: string | undefined; note: string } {
  const region = REGIONS[metroKey as keyof typeof REGIONS];

  if (!region) {
    return { email: import.meta.env.LEAD_EMAIL_FALLBACK, note: `Unrecognized metro value: "${metroKey}"` };
  }

  if (!region.fulfilled) {
    return {
      email: import.meta.env.LEAD_EMAIL_FALLBACK,
      note: `${region.name} has no confirmed vendor yet — needs manual follow-up.`,
    };
  }

  const vendor = VENDOR_BY_REGION[metroKey as keyof typeof VENDOR_BY_REGION];
  const email = import.meta.env[`LEAD_EMAIL_${metroKey.toUpperCase()}`] ?? import.meta.env.LEAD_EMAIL_FALLBACK;
  return { email, note: vendor ? `Routed to ${vendor.label}` : `Routed for ${region.name}` };
}

export const POST: APIRoute = async ({ request }) => {
  let data: QuotePayload;
  try {
    data = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "Invalid request body" }), { status: 400 });
  }

  // Honeypot: pretend success so bots don't learn anything, just drop it.
  if (data.company) {
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  const { name, phone, metro, city, service } = data;
  if (!name?.trim() || !phone?.trim() || !metro?.trim()) {
    return new Response(JSON.stringify({ ok: false, error: "Name, phone, and metro area are required." }), {
      status: 400,
    });
  }

  const { email: recipient, note } = recipientFor(metro);
  const apiKey = import.meta.env.RESEND_API_KEY;
  const fromEmail = import.meta.env.RESEND_FROM_EMAIL;

  if (!apiKey || !fromEmail || !recipient) {
    console.error("Quote pipeline missing config", {
      hasApiKey: !!apiKey,
      hasFromEmail: !!fromEmail,
      hasRecipient: !!recipient,
    });
    return new Response(JSON.stringify({ ok: false, error: "Lead pipeline isn't configured yet." }), {
      status: 500,
    });
  }

  const regionName = REGIONS[metro as keyof typeof REGIONS]?.name ?? metro;
  const subject = `New quote request — ${regionName} (${service ?? "not specified"})`;
  const body = [
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Metro area: ${regionName}`,
    `City/neighborhood: ${city?.trim() || "not specified"}`,
    `Service: ${service ?? "not specified"}`,
    `Source page: ${data.page ?? "unknown"}`,
    "",
    note,
  ].join("\n");

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: recipient,
      subject,
      text: body,
    }),
  });

  if (!resendResponse.ok) {
    const errText = await resendResponse.text();
    console.error("Resend send failed", resendResponse.status, errText);
    return new Response(JSON.stringify({ ok: false, error: "Could not send lead notification." }), {
      status: 502,
    });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
