// Per-service copy used to drive the city × service template.
// This is structurally-real placeholder content — each page interpolates real city/region
// facts (see locations.js), but the sentence-level copy still needs a Byword.ai + human
// editing pass per site plan §7 before publish. Do not treat this as launch-ready copy.

export const SERVICE_CONTENT = {
  "pigeon-proofing-solar-panels": {
    heroVerb: "Pigeon Proofing",
    intro: (city) =>
      `Pigeons nesting under solar panels is one of the most common service calls we get in ${city.name} — the gap under a raised array is exactly the sheltered, warm spot they look for.`,
    problemFraming: (city, region) =>
      region.slug === "phoenix-metro"
        ? `${city.name}'s mix of tile roofs and dense HOA communities means bird mesh often has to clear an architectural review before install — we handle that paperwork, not just the mesh.`
        : `${city.name} homeowners tend to notice the problem in late spring, right as nesting season ramps up and droppings start showing up on driveways and patios below the array.`,
    process: [
      { title: "Inspection", body: "We check under the array for existing nests, droppings, and gaps before quoting mesh." },
      { title: "Nest removal", body: "Any existing nesting material is cleared out and the area is sanitized before sealing." },
      { title: "Mesh install", body: "Stainless steel mesh is fitted to your panel's exact mounting height and roof pitch — no gaps for birds to re-enter." },
    ],
    pricing: { label: "Typical range", range: "$400–$1,200 depending on array size and roof access" },
    faqs: [
      {
        q: (city) => `Do I need HOA approval for bird mesh in ${city.name}?`,
        a: "Most HOAs allow it since the mesh is barely visible from the ground, but some require a quick architectural review — we can provide spec sheets if yours does.",
      },
      {
        q: () => "Will this damage my solar panels or void my warranty?",
        a: "No — mesh is fitted to the mounting rails, not the panels themselves, so it doesn't affect your manufacturer or installer warranty.",
      },
      {
        q: () => "How long does the pigeons-are-already-there problem take to fix?",
        a: "Most jobs, including nest removal, finish in a single visit — same day in most cases.",
      },
    ],
  },
  "solar-panel-cleaning": {
    heroVerb: "Solar Panel Cleaning",
    intro: (city) =>
      `Dust and pollen build up fast on ${city.name} rooftops — enough to measurably cut panel output within a few months of the last cleaning.`,
    problemFraming: (city, region) =>
      region.slug === "tucson-metro"
        ? `${city.name}'s dust storms and the surrounding desert terrain mean panels here often need a post-haboob cleaning on top of the usual seasonal schedule.`
        : `Between haboob season and monsoon runoff leaving mineral spots, ${city.name} panels usually need cleaning twice a year to stay near rated output.`,
    process: [
      { title: "Output check", body: "Where possible, we note your current output so you can see the before/after difference." },
      { title: "Deionized wash", body: "Panels are washed with spot-free deionized water — no mineral streaking from Arizona's hard water." },
      { title: "Final inspection", body: "We check for micro-cracks or wiring issues while we're up there, and flag anything worth knowing about." },
    ],
    pricing: { label: "Typical range", range: "$150–$400 per visit depending on panel count" },
    faqs: [
      {
        q: () => "How much output do dirty panels actually lose?",
        a: "Typically 5–20% depending on how long since the last cleaning and how much dust/pollen has settled — enough to notice on your utility bill.",
      },
      {
        q: (city) => `How often should panels be cleaned in ${city.name}?`,
        a: "Twice a year for most homes — once before monsoon season and once after — though homes near unpaved roads or agricultural land may need more.",
      },
      {
        q: () => "Do you use anything that could scratch the glass?",
        a: "No abrasive tools — deionized water and soft brushes only, which is also why there's no streaking afterward.",
      },
    ],
  },
};
