// Source of truth for the location matrix — see site plan §4 for tier rationale.
//
// `tier` controls content depth (1 = full unique treatment, 2 = lighter, 3 = combined page).
// `fulfilled` is a SEPARATE axis: whether a vendor agreement actually exists for that region.
// A city only gets published pages when BOTH are satisfied — tier alone is not enough.
// As of 2026-08-11: Tucson is the only region with a confirmed vendor (Desert Solar
// Cleaning/Window Cleaning, both services). Phoenix Metro has no signed agreement yet,
// so it's held back exactly like Tier 3, even though its page content is fully built —
// see site plan §11.

export const REGIONS = {
  phoenix: { name: "Phoenix Metro", slug: "phoenix-metro", fulfilled: false },
  tucson: { name: "Tucson Metro", slug: "tucson-metro", fulfilled: true },
  rest: { name: "Rest of Arizona", slug: "rest-of-arizona", fulfilled: false },
};

// Maps a region to the vendor who actually fulfills its leads — used by the quote pipeline.
// Only regions with a real vendorKey should ever be live; keep contact details in env vars,
// not here.
export const VENDOR_BY_REGION = {
  tucson: { vendorKey: "desert-solar-tucson", label: "Desert Solar Cleaning (Tucson)" },
};

export const SERVICES = {
  "pigeon-proofing-solar-panels": {
    slug: "pigeon-proofing-solar-panels",
    name: "Pigeon Proofing for Solar Panels",
    shortName: "Pigeon Proofing",
  },
  "solar-panel-cleaning": {
    slug: "solar-panel-cleaning",
    name: "Solar Panel Cleaning",
    shortName: "Solar Panel Cleaning",
  },
};

// tier 1/2 cities get a page per service; tier 3 gets one combined page (when unblocked).
export const CITIES = [
  // --- Phoenix Metro, Tier 1 (built, held back — no vendor agreement yet) ---
  { slug: "phoenix", name: "Phoenix", region: "phoenix", tier: 1 },
  { slug: "scottsdale", name: "Scottsdale", region: "phoenix", tier: 1 },
  { slug: "mesa", name: "Mesa", region: "phoenix", tier: 1 },
  { slug: "chandler", name: "Chandler", region: "phoenix", tier: 1 },
  { slug: "gilbert", name: "Gilbert", region: "phoenix", tier: 1 },
  { slug: "tempe", name: "Tempe", region: "phoenix", tier: 1 },
  { slug: "peoria", name: "Peoria", region: "phoenix", tier: 1 },
  { slug: "glendale", name: "Glendale", region: "phoenix", tier: 1 },
  { slug: "surprise", name: "Surprise", region: "phoenix", tier: 1 },

  // --- Phoenix Metro, Tier 2 (built, held back — no vendor agreement yet) ---
  { slug: "avondale", name: "Avondale", region: "phoenix", tier: 2 },
  { slug: "goodyear", name: "Goodyear", region: "phoenix", tier: 2 },
  { slug: "buckeye", name: "Buckeye", region: "phoenix", tier: 2 },
  { slug: "queen-creek", name: "Queen Creek", region: "phoenix", tier: 2 },
  { slug: "fountain-hills", name: "Fountain Hills", region: "phoenix", tier: 2 },
  { slug: "cave-creek", name: "Cave Creek", region: "phoenix", tier: 2 },
  { slug: "paradise-valley", name: "Paradise Valley", region: "phoenix", tier: 2 },
  { slug: "sun-city", name: "Sun City / Sun City West", region: "phoenix", tier: 2 },
  { slug: "apache-junction", name: "Apache Junction", region: "phoenix", tier: 2 },
  { slug: "litchfield-park", name: "Litchfield Park", region: "phoenix", tier: 2 },
  { slug: "anthem", name: "Anthem", region: "phoenix", tier: 2 },

  // --- Tucson Metro, Tier 1 (live — Desert Solar Cleaning confirmed) ---
  { slug: "tucson", name: "Tucson", region: "tucson", tier: 1 },
  { slug: "oro-valley", name: "Oro Valley", region: "tucson", tier: 1 },
  { slug: "marana", name: "Marana", region: "tucson", tier: 1 },
  { slug: "sahuarita", name: "Sahuarita", region: "tucson", tier: 1 },

  // --- Tucson Metro, Tier 2 (live — Desert Solar Cleaning confirmed) ---
  { slug: "green-valley", name: "Green Valley", region: "tucson", tier: 2 },
  { slug: "vail", name: "Vail", region: "tucson", tier: 2 },
  { slug: "catalina-foothills", name: "Catalina Foothills", region: "tucson", tier: 2 },
  { slug: "south-tucson", name: "South Tucson", region: "tucson", tier: 2 },
  { slug: "casas-adobes", name: "Casas Adobes", region: "tucson", tier: 2 },
  { slug: "flowing-wells", name: "Flowing Wells", region: "tucson", tier: 2 },
  { slug: "tanque-verde", name: "Tanque Verde", region: "tucson", tier: 2 },
  { slug: "rita-ranch", name: "Rita Ranch", region: "tucson", tier: 2 },
  { slug: "corona-de-tucson", name: "Corona de Tucson", region: "tucson", tier: 2 },
  { slug: "saddlebrooke", name: "SaddleBrooke", region: "tucson", tier: 2 },
  { slug: "picture-rocks", name: "Picture Rocks", region: "tucson", tier: 2 },

  // --- Rest of Arizona, Tier 3 (held back — no fulfillment partner yet, see site plan §11) ---
  { slug: "flagstaff", name: "Flagstaff", region: "rest", tier: 3 },
  { slug: "prescott", name: "Prescott / Prescott Valley", region: "rest", tier: 3 },
  { slug: "yuma", name: "Yuma", region: "rest", tier: 3 },
  { slug: "lake-havasu-city", name: "Lake Havasu City", region: "rest", tier: 3 },
  { slug: "sierra-vista", name: "Sierra Vista", region: "rest", tier: 3 },
  { slug: "casa-grande", name: "Casa Grande", region: "rest", tier: 3 },
  { slug: "bullhead-city", name: "Bullhead City", region: "rest", tier: 3 },
  { slug: "kingman", name: "Kingman", region: "rest", tier: 3 },
  { slug: "payson", name: "Payson", region: "rest", tier: 3 },
  { slug: "sedona", name: "Sedona", region: "rest", tier: 3 },
];

// Live = content tier is ready (1 or 2) AND the region has a confirmed vendor.
export const LIVE_CITIES = CITIES.filter(
  (c) => (c.tier === 1 || c.tier === 2) && REGIONS[c.region]?.fulfilled
);

// Regions with at least one live city — drives nav/hub "coming soon" states.
export const LIVE_REGIONS = Object.entries(REGIONS)
  .filter(([, r]) => r.fulfilled)
  .map(([key]) => key);

export function citiesByRegion(region) {
  return CITIES.filter((c) => c.region === region);
}

export function liveCitiesByRegion(region) {
  return LIVE_CITIES.filter((c) => c.region === region);
}

export function getCity(slug) {
  return CITIES.find((c) => c.slug === slug);
}

// Simple same-region neighbors for internal linking — nearest 2 by list order.
// Good enough for launch; revisit with real geographic distance later.
export function nearbyCities(slug, count = 2) {
  const city = getCity(slug);
  if (!city) return [];
  const peers = LIVE_CITIES.filter((c) => c.region === city.region && c.slug !== slug);
  return peers.slice(0, count);
}
