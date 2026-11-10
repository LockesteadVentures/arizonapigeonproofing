// Title / meta description builders for the city x service pages, with the length
// guards from the SEO ownership plan (Task 1). Kept as plain functions so the
// templates and the build-time check share one source of truth.
//
// Rules: no "&", no em/en dashes. A title over 60 characters drops the trailing
// " | Free Quote". A meta description over 155 characters drops trailing sentence
// fragments (cutting at a period or comma, never mid-word) until it fits.

export const TITLE_SOFT_LIMIT = 60;
export const META_SOFT_LIMIT = 155;

export function fitTitle(base, suffix = " | Free Quote") {
  const full = `${base}${suffix}`;
  return full.length > TITLE_SOFT_LIMIT ? base : full;
}

export function fitMeta(text, limit = META_SOFT_LIMIT) {
  if (text.length <= limit) return text;
  // Candidate cut points: every period or comma, scanned from the end, so the
  // longest version that still fits wins.
  const cuts = [];
  for (let i = 0; i < text.length; i++) if (text[i] === "." || text[i] === ",") cuts.push(i);
  for (let k = cuts.length - 1; k >= 0; k--) {
    const candidate = `${text.slice(0, cuts[k])}.`;
    if (candidate.length <= limit) return candidate;
  }
  // Last resort (should not happen with the current templates): cut at a word boundary.
  const hard = text.slice(0, limit - 1).replace(/\s+\S*$/, "");
  return `${hard}.`;
}

export const SERVICE_SEO = {
  "pigeon-proofing-solar-panels": {
    h1: (city) => `Solar Panel Pigeon Proofing in ${city}, AZ`,
    title: (city) => fitTitle(`Solar Panel Pigeon Proofing in ${city}, AZ`),
    meta: (city) =>
      fitMeta(
        `Pigeons under your solar panels in ${city}? Rail-mounted stainless bird mesh with nest removal and sanitizing. Local crew, free quote in 24-48 hours.`
      ),
  },
  "solar-panel-cleaning": {
    h1: (city) => `Solar Panel Cleaning in ${city}, AZ`,
    title: (city) => fitTitle(`Solar Panel Cleaning in ${city}, AZ`),
    meta: (city) =>
      fitMeta(
        `Dusty or monsoon-soiled panels in ${city}? Spot-free deionized water cleaning by a local crew. Bundle with bird proofing and save a visit. Free quote.`
      ),
  },
};

// The flagship Tucson pigeon page has its own hand-written meta (Task 1).
export const TUCSON_PIGEON_META =
  "Pigeons nesting under your solar panels? Stainless bird mesh, nest removal and sanitizing in one visit. Local Tucson crew. Free quote in 24-48 hours.";
