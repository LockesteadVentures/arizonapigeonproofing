// Per-service copy used to drive the city × service template.
// `process` (the shared "How It Works" steps) and `hub` (used by the two service hub
// pages) are genuinely identical across every city on purpose — see the SEO audit fix
// dated 2026-08-21. Per-city intro/why-it-matters/FAQ copy lives in cityContext.js now,
// since that content needed to vary by city AND by service to fix the audit's
// duplicate-content and FAQ-relevance findings — a shared per-service function couldn't
// do that.

export const SERVICE_CONTENT = {
  "pigeon-proofing-solar-panels": {
    heroVerb: "Pigeon Proofing",
    process: [
      { title: "Inspection", body: "We check under the array for existing nests, droppings, and gaps before quoting mesh." },
      { title: "Nest removal", body: "Any existing nesting material is cleared out and the area is sanitized before sealing." },
      { title: "Mesh install", body: "Stainless steel mesh is fitted to your panel's exact mounting height and roof pitch — no gaps for birds to re-enter." },
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
    process: [
      { title: "Output check", body: "Where possible, we log your current output so you can see the before/after difference." },
      { title: "Deionized wash", body: "Panels are washed with spot-free deionized water — no mineral streaking from Arizona's hard water." },
      { title: "Final inspection", body: "We check for micro-cracks or wiring issues while we're up there and flag anything worth knowing about." },
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
