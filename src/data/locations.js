// Source of truth for the location matrix — see site plan §4 for tier rationale.
// tier 3 ("Rest of Arizona") intentionally has no fulfillment partner yet (site plan §11) —
// present in data for completeness, but not wired into getStaticPaths until that's resolved.

export const REGIONS = {
  phoenix: { name: "Phoenix Metro", slug: "phoenix-metro" },
  tucson: { name: "Tucson Metro", slug: "tucson-metro" },
  rest: { name: "Rest of Arizona", slug: "rest-of-arizona" },
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
  // --- Phoenix Metro, Tier 1 ---
  { slug: "phoenix", name: "Phoenix", region: "phoenix", tier: 1 },
  { slug: "scottsdale", name: "Scottsdale", region: "phoenix", tier: 1 },
  { slug: "mesa", name: "Mesa", region: "phoenix", tier: 1 },
  { slug: "chandler", name: "Chandler", region: "phoenix", tier: 1 },
  { slug: "gilbert", name: "Gilbert", region: "phoenix", tier: 1 },
  { slug: "tempe", name: "Tempe", region: "phoenix", tier: 1 },
  { slug: "peoria", name: "Peoria", region: "phoenix", tier: 1 },
  { slug: "glendale", name: "Glendale", region: "phoenix", tier: 1 },
  { slug: "surprise", name: "Surprise", region: "phoenix", tier: 1 },

  // --- Phoenix Metro, Tier 2 ---
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

  // --- Tucson Metro, Tier 1 ---
  { slug: "tucson", name: "Tucson", region: "tucson", tier: 1 },
  { slug: "oro-valley", name: "Oro Valley", region: "tucson", tier: 1 },
  { slug: "marana", name: "Marana", region: "tucson", tier: 1 },
  { slug: "sahuarita", name: "Sahuarita", region: "tucson", tier: 1 },

  // --- Tucson Metro, Tier 2 ---
  { slug: "green-valley", name: "Green Valley", region: "tucson", tier: 2 },
  { slug: "vail", name: "Vail", region: "tucson", tier: 2 },
  { slug: "catalina-foothills", name: "Catalina Foothills", region: "tucson", tier: 2 },

  // --- Rest of Arizona, Tier 3 (gated — no fulfillment partner yet, see site plan §11) ---
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

// Live (fulfillment-confirmed) cities — everything the build actually generates pages for.
export const LIVE_CITIES = CITIES.filter((c) => c.tier === 1 || c.tier === 2);

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
  const idx = peers.findIndex((c) => c.slug === slug);
  return peers.slice(0, count);
}
