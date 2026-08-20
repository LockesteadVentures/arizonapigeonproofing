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
    hub: {
      signs: [
        "Cooing or scratching sounds coming from under the array, especially early morning and evening.",
        "Droppings collecting on the roof below the panels, or on patios and driveways underneath.",
        "Visible nesting material — twigs, debris — poking out from the gap between the panels and the roof.",
        "A noticeable, unexplained dip in system output, since nests and droppings block airflow and shade cells.",
      ],
      methodology: [
        {
          title: "Inspection",
          body: "We check under the full array for existing nests, droppings, and any gap wide enough for a pigeon to get through — not just the spot you noticed.",
        },
        {
          title: "Safe nest & droppings removal",
          body: "Old nesting material and droppings are removed and the area sanitized before we seal anything up. Accumulated droppings can carry real health risks, so this step isn't skipped even when it slows the job down.",
        },
        {
          title: "Mesh fitting",
          body: "Mesh is cut and shaped to your panel's exact mounting height and roof pitch, not a generic pre-cut size — the fit is what actually keeps birds out long-term.",
        },
        {
          title: "Rail-mounted installation",
          body: "The mesh clips to the panel's mounting rails, not screwed into your roof or shingles, which is also why it doesn't affect your roofing or panel warranty.",
        },
      ],
      trustPoints: [
        "Licensed and insured",
        "Nest removal included, not billed as a separate surprise",
        "Mesh mounts to the rails, never the roof itself",
      ],
    },
  },
  "solar-panel-cleaning": {
    heroVerb: "Solar Panel Cleaning",
    intro: (city) =>
      `Dust and pollen build up fast on ${city.name} rooftops — enough to measurably cut panel output within a few months of the last cleaning.`,
    problemFraming: (city, region) =>
      region.slug === "tucson-metro"
        ? `Tucson's surrounding terrain doesn't set up the dramatic haboobs Phoenix gets, but the region's official monsoon season — June 15 through September 30, per the National Weather Service — still means heavy dust ahead of storms and mineral spotting from the rain itself, enough to justify cleaning ${city.name} panels on each side of the season.`
        : `Phoenix's open desert terrain means real haboobs, not just dust — between that and monsoon runoff leaving mineral spots, ${city.name} panels usually need cleaning twice a year to stay near rated output.`,
    process: [
      { title: "Output check", body: "Where possible, we note your current output so you can see the before/after difference." },
      { title: "Deionized wash", body: "Panels are washed with spot-free deionized water — no mineral streaking from Arizona's hard water." },
      { title: "Final inspection", body: "We check for micro-cracks or wiring issues while we're up there, and flag anything worth knowing about." },
    ],
    faqs: [
      {
        q: () => "How much output do dirty panels actually lose?",
        a: "NREL research on solar soiling puts typical annual losses around 4–15%, with short-term spikes well beyond that after a heavy dust storm — enough to notice on your utility bill.",
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
    hub: {
      signs: [
        "A visible layer of dust or a hazy film across the panel surface, especially after weeks without rain.",
        "White or gray mineral spotting left behind once monsoon rain dries on the glass.",
        "A drop in system output that shows up on your utility bill without an obvious cause.",
        "Panels near unpaved roads, agricultural land, or active construction, where dust settles faster than average.",
      ],
      methodology: [
        {
          title: "Assessment",
          body: "Where the system allows it, we note your current output before starting so the before/after difference is measurable, not just visual.",
        },
        {
          title: "Pre-rinse",
          body: "A plain-water rinse loosens the heaviest surface dust before anything touches the glass, so we're not grinding grit into the panel on first contact.",
        },
        {
          title: "Deionized wash",
          body: "Panels are washed with spot-free deionized water and soft tools only — no abrasive brushes, no high-pressure spray that risks the seals or glass.",
        },
        {
          title: "Post-clean inspection",
          body: "While we're already up there, we check for micro-cracks, loose wiring, and any hot spots — and flag anything worth knowing about, even if it's outside the cleaning itself.",
        },
      ],
      trustPoints: [
        "Licensed and insured",
        "Deionized water only — no mineral spotting from Arizona's hard water",
        "Free inspection for cracks or wiring issues on every visit",
      ],
    },
  },
};
