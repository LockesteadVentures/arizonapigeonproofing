import type { APIRoute } from "astro";
import { CITIES, REGIONS, VENDOR_BY_REGION } from "../../data/locations.js";

// This route must run on-demand (Vercel function), not at build time.
export const prerender = false;

interface QuotePayload {
  name?: string;
  phone?: string;
  city?: string;
  service?: string;
  page?: string;
  // honeypot — real users never fill this in; bots often do
  company?: string;
}

function findCity(rawCity: string) {
  const needle = rawCity.trim().toLowerCase();
  return CITIES.find(
    (c) => c.slug === needle || c.name.toLowerCase() === needle || c.name.toLowerCase().includes(needle)
  );
}

function recipientFor(rawCity: string): { email: string | undefined; note: string } {
  const city = findCity(rawCity);

  if (!city) {
    return { email: import.meta.env.LEAD_EMAIL_FALLBACK, note: `Unrecognized city: "${rawCity}"` };
  }

  const region = REGIONS[city.region as keyof typeof REGIONS];
  if (!region?.fulfilled) {
    return {
      email: import.meta.env.LEAD_EMAIL_FALLBACK,
      note: `${city.name} is in ${region?.name ?? city.region}, which has no confirmed vendor yet — needs manual follow-up.`,
    };
  }

  const vendor = VENDOR_BY_REGION[city.region as keyof typeof VENDOR_BY_REGION];
  const email = import.meta.env[`LEAD_EMAIL_${city.region.toUpperCase()}`] ?? import.meta.env.LEAD_EMAIL_FALLBACK;
  return { email, note: vendor ? `Routed to ${vendor.label}` : `Routed for ${city.name}` };
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

  const { name, phone, city, service } = data;
  if (!name?.trim() || !phone?.trim() || !city?.trim()) {
    return new Response(JSON.stringify({ ok: false, error: "Name, phone, and city are required." }), {
      status: 400,
    });
  }

  const { email: recipient, note } = recipientFor(city);
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

  const subject = `New quote request — ${city} (${service ?? "not specified"})`;
  const body = [
    `Name: ${name}`,
    `Phone: ${phone}`,
    `City: ${city}`,
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
