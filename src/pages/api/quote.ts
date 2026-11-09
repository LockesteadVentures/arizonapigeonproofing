import type { APIRoute } from "astro";
import { REGIONS, VENDOR_BY_REGION } from "../../data/locations.js";

// This route must run on-demand (Vercel function), not at build time.
export const prerender = false;

interface QuotePayload {
  name?: string;
  phone?: string;
  metro?: string; // dropdown value — a REGIONS key, drives routing
  address?: string; // free-text street address for the vendor, not used for routing
  service?: string;
  page?: string;
  // honeypot — real users never fill this in; bots often do
  company?: string;
  recaptchaToken?: string;
  // From the browser's _ga cookie, when GA actually loaded there.
  gaClientId?: string;
  // True only if GTM/GA were running in the browser, i.e. the browser-side
  // generate_lead event will fire. Used to avoid double-counting.
  browserTracked?: boolean;
}

const GA4_MEASUREMENT_ID = "G-VV0HWBDHZZ";

// Server-side fallback for generate_lead. The browser-side event (GTM) never
// fires for visitors running an ad blocker or privacy browser, but their lead
// email still arrives -- so when the browser says it wasn't tracking, report
// the lead to GA4 from here via the Measurement Protocol. Best-effort: a GA
// failure must never fail the submission.
async function sendServerLead(data: QuotePayload): Promise<void> {
  const apiSecret = import.meta.env.GA4_API_SECRET;
  if (!apiSecret || data.browserTracked) return;

  const clientId = /^\d+\.\d+$/.test(data.gaClientId ?? "") ? data.gaClientId! : crypto.randomUUID();
  const payload = {
    client_id: clientId,
    events: [
      {
        name: "generate_lead",
        params: {
          form_name: "quote_request",
          metro: data.metro,
          service: data.service,
          tracking_source: "server",
          engagement_time_msec: 100,
        },
      },
    ],
    // Mirrors the user properties the GTM generate_lead tag sets (Name, Phone
    // Number, Service, Metro) so a server-reported lead carries the same data.
    user_properties: {
      Name: { value: data.name },
      Phone_Number: { value: data.phone },
      Service: { value: data.service },
      Metro: { value: data.metro },
    },
  };

  try {
    const res = await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${GA4_MEASUREMENT_ID}&api_secret=${apiSecret}`,
      { method: "POST", body: JSON.stringify(payload), signal: AbortSignal.timeout(2500) }
    );
    if (!res.ok) console.error("GA4 Measurement Protocol failed", res.status);
  } catch (err) {
    console.error("GA4 Measurement Protocol error", err);
  }
}

const RECAPTCHA_SCORE_THRESHOLD = 0.5;

// Skips verification (rather than hard-failing every submission) until
// RECAPTCHA_SECRET_KEY is actually set in the Vercel env -- lets this route
// deploy safely before the reCAPTCHA site/secret key pair exists yet.
async function verifyRecaptcha(token: string | undefined): Promise<{ ok: boolean; reason?: string }> {
  const secretKey = import.meta.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) return { ok: true };
  if (!token) return { ok: false, reason: "Missing reCAPTCHA token" };

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret: secretKey, response: token }),
  });
  const result = await res.json();

  if (!result.success) return { ok: false, reason: `siteverify rejected: ${JSON.stringify(result["error-codes"])}` };
  if (typeof result.score === "number" && result.score < RECAPTCHA_SCORE_THRESHOLD) {
    return { ok: false, reason: `score ${result.score} below threshold` };
  }
  return { ok: true };
}

// Each regional address must be referenced by its literal name. Astro only
// inlines private env vars it finds as static `import.meta.env.NAME` accesses;
// a computed lookup like import.meta.env[`LEAD_EMAIL_${key}`] compiles against
// an object that never contains them, so every lead silently fell back to
// LEAD_EMAIL_FALLBACK (found when the first real Tucson lead never reached the
// vendor). Add a new region's variable here when it goes live.
const REGION_EMAILS: Record<string, string | undefined> = {
  tucson: import.meta.env.LEAD_EMAIL_TUCSON,
};

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
  const regionalEmail = REGION_EMAILS[metroKey];
  if (!regionalEmail) {
    // Say so in the email itself instead of claiming it was routed to the vendor.
    return {
      email: import.meta.env.LEAD_EMAIL_FALLBACK,
      note: `${vendor?.label ?? region.name} has no routing address configured — sent to the default address, needs manual forwarding.`,
    };
  }
  return { email: regionalEmail, note: vendor ? `Routed to ${vendor.label}` : `Routed for ${region.name}` };
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

  const { name, phone, metro, address, service, recaptchaToken } = data;
  if (!name?.trim() || !phone?.trim() || !metro?.trim() || !address?.trim() || !service?.trim()) {
    return new Response(JSON.stringify({ ok: false, error: "Name, phone, metro area, address, and service are required." }), {
      status: 400,
    });
  }

  const recaptcha = await verifyRecaptcha(recaptchaToken);
  if (!recaptcha.ok) {
    console.error("reCAPTCHA check failed", recaptcha.reason);
    // Generic message -- don't tell a bot (or its operator) it was the
    // reCAPTCHA check specifically that stopped the submission.
    return new Response(JSON.stringify({ ok: false, error: "Could not verify submission. Please try again in a moment." }), {
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
    `Address: ${address}`,
    `Service: ${service}`,
    `Source page: ${data.page ?? "unknown"}`,
    "",
    note,
  ].join("\n");

  const ccEmail = import.meta.env.LEAD_EMAIL_CC;

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: recipient,
      ...(ccEmail ? { cc: ccEmail } : {}),
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

  await sendServerLead(data);

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
