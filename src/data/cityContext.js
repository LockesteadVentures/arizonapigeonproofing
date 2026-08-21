// Verified, real local context per Tucson-area city — named communities, jurisdiction
// status, and housing/terrain character. Sources checked via web research (see commit
// history); nothing here is invented. This is what makes each city page genuinely
// different instead of the same template with a name swapped in.
//
// jurisdiction: "incorporated" means the city/town has its own building & planning
// department (permits go through them); "unincorporated" means Pima County (or, for
// SaddleBrooke, Pinal County) handles it. Kept as reference data even though `content`
// below now carries the literal permit-note sentence per page rather than deriving it
// from this field — city-specific wording (Tucson, South Tucson) doesn't fit one formula.
//
// `content` holds the per-city, per-service copy drafted 2026-08-21 to fix the SEO
// audit's duplicate-content and FAQ-relevance findings: `whyItMatters` and `faqs[].a`
// are pre-authored HTML strings (trusted, static — safe to inject with set:html) so
// in-copy guide links can use varied, natural anchor text instead of bare URLs.

export const CITY_CONTEXT = {
  tucson: {
    jurisdiction: { type: "incorporated", authority: "City of Tucson" },
    communities: [],
    content: {
      "pigeon-proofing-solar-panels": {
        intro:
          "If you've got solar panels in Tucson, there's a good chance pigeons have already found the gap underneath them — it's the single most common service call we get, year-round, not just in spring.",
        whyItMatters:
          `Tucson's housing stock runs the full range — century-old adobe in the central neighborhoods, 1970s ranch homes, and brand-new subdivisions on the edges of the city — so roof pitch, mounting hardware, and panel age vary more here than almost anywhere else we work. That's exactly why we inspect the actual mounting height and roofline before quoting mesh instead of pricing off a flat per-panel rate. <a href="/guides/pigeons-and-solar-panels/why-pigeons-nest-under-solar-panels/">See what actually draws pigeons to a solar array in the first place</a>.`,
        permitNote:
          `Tucson is incorporated, so permits and inspections route through the City of Tucson rather than Pima County — though bird mesh itself typically doesn't need a permit, since it attaches to the mounting rails rather than the roof structure.`,
        faqs: [
          {
            q: "Do I need HOA approval for bird mesh in Tucson?",
            a: `It depends on the neighborhood — HOA review varies a lot within city limits. <a href="/guides/hoa-solar-panel-rules-arizona/bird-mesh-architectural-review/">See what a typical architectural review actually asks for</a>.`,
          },
          {
            q: "Does an older Tucson home need a different mesh install than new construction?",
            a: `Often, yes — older adobe and 1970s ranch roofs tend to use different mounting hardware than newer subdivisions, which is part of why every job starts with an in-person inspection instead of a blind quote. <a href="/guides/pigeons-and-solar-panels/ground-mounted-vs-roof-mounted-pigeon-risk/">Ground-mounted arrays carry a different risk profile than roof-mounted ones, too</a>.`,
          },
        ],
      },
      "solar-panel-cleaning": {
        intro:
          "Tucson doesn't get Phoenix's dramatic haboobs, but the region's official monsoon season — June 15 through September 30, per the National Weather Service — still leaves enough dust and mineral spotting to measurably cut your panel output.",
        whyItMatters:
          `Tucson's housing stock is the most varied in the region — century-old adobe, 1970s ranch homes, and new edge-of-city subdivisions — which means roof access, panel tilt, and mounting hardware differ block to block. <a href="/guides/solar-panel-cleaning-arizona/dust-pollen-solar-output-loss-arizona/">What actually causes output loss from dust and pollen build-up</a>.`,
        permitNote:
          `Neither cleaning nor bird mesh typically requires a city permit on its own — cleaning doesn't alter anything structural. HOAs within city limits may still require a quick architectural review, but that applies to mesh installs, not cleaning visits.`,
        faqs: [
          {
            q: "How can I tell if my panels actually need cleaning right now?",
            a: `Most solar monitoring apps show a daily output trend — a slow, steady dip that isn't explained by shorter days or cloud cover is the tell. <a href="/guides/solar-panel-cleaning-arizona/how-to-read-solar-monitoring-app-for-soiling/">How to read your monitoring app for soiling loss</a>.`,
          },
          {
            q: "How often should panels be cleaned in Tucson?",
            a: `Twice a year for most homes — once before monsoon season and once after. <a href="/guides/solar-panel-cleaning-arizona/seasonal-homeowner-cleaning-schedule/">The full seasonal cleaning schedule for Tucson-area homes</a>.`,
          },
          {
            q: "Does an older Tucson roof change how the cleaning visit is done?",
            a: `Sometimes — older tile and shingle roofs need more careful footing and access planning than a new subdivision roof, which is part of why every job starts with an in-person look rather than a blind quote.`,
          },
        ],
      },
    },
  },

  "oro-valley": {
    jurisdiction: { type: "incorporated", authority: "Town of Oro Valley" },
    communities: ["Rancho Vistoso", "Sun City Oro Valley"],
    content: {
      "pigeon-proofing-solar-panels": {
        intro:
          "Oro Valley homeowners tend to notice the problem in late spring, right as nesting season ramps up and droppings start showing up on driveways and patios below the array.",
        whyItMatters:
          `Oro Valley incorporated in 1974 specifically so residents could set their own rules rather than be annexed by Tucson. Rancho Vistoso, its largest master-planned area, covers over 7,600 acres, and Sun City Oro Valley (formerly Sun City Vistoso) is a Del Webb 55+ community of roughly 2,500 single-level homes built 1987–1995 — the kind of low-slung roofline where a raised array creates an especially easy nesting gap. <a href="/guides/pigeons-and-solar-panels/signs-of-pigeons-under-solar-panels/">Signs pigeons are already using the space under your panels</a>.`,
        permitNote:
          `Oro Valley is incorporated, so permits and inspections go through the Town of Oro Valley rather than the county.`,
        faqs: [
          {
            q: "Does Rancho Vistoso or Sun City Oro Valley require HOA approval for bird mesh?",
            a: `Most HOAs in both communities allow it since the mesh sits close to the panel and is barely visible from the street, but architectural review is common — we can provide spec sheets for submittal if yours requires one. <a href="/guides/hoa-solar-panel-rules-arizona/hoa-approval-spec-sheet/">What to submit for HOA approval</a>.`,
          },
          {
            q: "What does unpermitted bird mesh actually risk in an HOA community like Sun City Oro Valley?",
            a: `Mostly a fine-and-remove letter rather than anything structural — but it's an avoidable hassle. <a href="/guides/hoa-solar-panel-rules-arizona/installing-bird-mesh-without-hoa-approval-risk/">What actually happens if you skip HOA approval</a>.`,
          },
        ],
      },
      "solar-panel-cleaning": {
        intro:
          "Dust and pollen build up fast on Oro Valley rooftops — enough to measurably cut panel output within a few months of the last cleaning.",
        whyItMatters:
          `Tucson's surrounding terrain doesn't set up Phoenix's dramatic haboobs, but the region's official monsoon season — June 15 through September 30, per the National Weather Service — still means heavy dust ahead of storms and mineral spotting from the rain itself. Rancho Vistoso's 7,600+ acres and Sun City Oro Valley's roughly 2,500 single-level homes (built 1987–1995) both sit in the same wash of desert dust, which is why we recommend cleaning on each side of the season regardless of which community you're in. <a href="/guides/solar-panel-cleaning-arizona/dust-pollen-solar-output-loss-arizona/">What dust and pollen actually cost you in output</a>.`,
        permitNote:
          `Oro Valley is incorporated, so permits and inspections go through the Town of Oro Valley rather than the county — though a routine cleaning visit doesn't typically trigger either.`,
        faqs: [
          {
            q: "How often should panels be cleaned in Oro Valley?",
            a: `Twice a year for most homes — once before monsoon season and once after — though Sun City Oro Valley's single-level rooflines make access easier than a two-story Rancho Vistoso custom home. <a href="/guides/solar-panel-cleaning-arizona/seasonal-homeowner-cleaning-schedule/">The full seasonal schedule</a>.`,
          },
          {
            q: "Does Sun City Oro Valley's HOA have rules about cleaning trucks or equipment on-site?",
            a: `Most 55+ community HOAs care more about noise windows and street parking than the cleaning itself — we schedule around both without you needing to ask.`,
          },
        ],
      },
    },
  },

  marana: {
    jurisdiction: { type: "incorporated", authority: "Town of Marana" },
    communities: ["Dove Mountain", "Gladden Farms"],
    content: {
      "pigeon-proofing-solar-panels": {
        intro:
          "Marana's fast growth means a lot of newer solar installs — and newer installs often sit up on taller racking, which pigeons treat as prime real estate.",
        whyItMatters:
          `Marana incorporated in 1977 and has grown fast since. Dove Mountain, in the Tortolita Mountain foothills, and Gladden Farms, with over 850 acres of parks and trails, are its two largest master-planned communities, both with active HOAs. <a href="/guides/pigeons-and-solar-panels/ground-mounted-vs-roof-mounted-pigeon-risk/">How ground-mounted arrays compare to roof-mounted ones for nesting risk</a> — relevant here given how many newer Marana installs use taller racking.`,
        permitNote:
          `Marana is incorporated, so permits and inspections go through the Town of Marana rather than the county.`,
        faqs: [
          {
            q: "Do Dove Mountain and Gladden Farms have different HOA rules for solar equipment?",
            a: `Both have active community associations with architectural guidelines, though neither typically restricts bird mesh once it's clear the install doesn't alter the roofline. We handle the paperwork if a submittal is required. <a href="/guides/hoa-solar-panel-rules-arizona/bird-mesh-architectural-review/">What a typical architectural review actually checks for</a>.`,
          },
          {
            q: "Are newer Dove Mountain and Gladden Farms homes more prone to nesting under panels?",
            a: `Often, yes — taller racking on newer installs creates a bigger, more sheltered gap than older flush-mount setups. <a href="/guides/pigeons-and-solar-panels/why-pigeons-nest-under-solar-panels/">Why pigeons choose the space under a panel in the first place</a>.`,
          },
        ],
      },
      "solar-panel-cleaning": {
        intro:
          "Marana's newer subdivisions often sit closer to open desert and active construction than older Tucson-area neighborhoods, which means more airborne dust settling on panels between cleanings.",
        whyItMatters:
          `The region's official monsoon season — June 15 through September 30, per the National Weather Service — brings heavy dust ahead of storms and mineral spotting from the rain itself. Marana incorporated in 1977 and has grown fast since; Dove Mountain and Gladden Farms, its two largest master-planned communities, both sit near ongoing new-home construction, which kicks up extra dust beyond the seasonal norm. <a href="/guides/solar-panel-cleaning-arizona/construction-dust-new-build-solar-panels/">How construction dust specifically affects new-build panels</a>.`,
        permitNote:
          `Marana is incorporated, so permits and inspections go through the Town of Marana rather than the county — a routine cleaning visit doesn't typically trigger either.`,
        faqs: [
          {
            q: "How often should panels be cleaned in Marana?",
            a: `Twice a year for most homes; homes near active construction in Dove Mountain or Gladden Farms may need a third visit. <a href="/guides/solar-panel-cleaning-arizona/seasonal-homeowner-cleaning-schedule/">The full seasonal schedule</a>.`,
          },
          {
            q: "Does new-home construction nearby actually make a measurable difference?",
            a: `Yes — fresh grading and nearby framing work throw off noticeably more particulate than an established neighborhood, especially in the first year or two after a phase breaks ground.`,
          },
        ],
      },
    },
  },

  sahuarita: {
    jurisdiction: { type: "incorporated", authority: "Town of Sahuarita" },
    communities: ["Rancho Sahuarita", "Quail Creek", "Madera Highlands"],
    content: {
      "pigeon-proofing-solar-panels": {
        intro:
          "Sahuarita's mix of family subdivisions and age-restricted communities means we see two very different nesting patterns here — and both point to the same fix.",
        whyItMatters:
          `Sahuarita incorporated in 1994 and is one of the youngest towns in southern Arizona. Rancho Sahuarita, its original master-planned community, now has around 18,000 residents, and Quail Creek, a Robson-built 55+ community within town limits, adds a second HOA-governed pocket with its own architectural rules. <a href="/guides/pigeons-and-solar-panels/why-pigeons-nest-under-solar-panels/">Why the gap under a raised array is exactly what pigeons look for</a>.`,
        permitNote:
          `Sahuarita is incorporated, so permits and inspections go through the Town of Sahuarita rather than the county.`,
        faqs: [
          {
            q: "Is Quail Creek's HOA process different from Rancho Sahuarita's?",
            a: `Yes — Quail Creek is a Robson-developed 55+ community with its own architectural review separate from Rancho Sahuarita's. Both are usually straightforward for bird mesh since it doesn't change how the roofline looks from the street. <a href="/guides/hoa-solar-panel-rules-arizona/bird-mesh-architectural-review/">What that review typically asks for</a>.`,
          },
          {
            q: "Does Madera Highlands have the same nesting issues as Rancho Sahuarita?",
            a: `Generally yes — panel height and roof pitch matter more than which subdivision you're in, which is why we inspect every roof individually rather than quoting off the community name alone.`,
          },
        ],
      },
      "solar-panel-cleaning": {
        intro:
          "Sahuarita sits south of Tucson in one of the dustier stretches of the valley, which means panels here often need cleaning slightly more often than closer-in neighborhoods.",
        whyItMatters:
          `The region's official monsoon season — June 15 through September 30, per the National Weather Service — brings heavy dust ahead of storms and mineral spotting from the rain itself. Sahuarita incorporated in 1994; Rancho Sahuarita (around 18,000 residents) and Quail Creek, a Robson-built 55+ community, are its two largest HOA-governed areas, and both see enough seasonal dust to justify a cleaning on each side of monsoon. <a href="/guides/solar-panel-cleaning-arizona/dust-pollen-solar-output-loss-arizona/">What that dust actually costs you in output</a>.`,
        permitNote:
          `Sahuarita is incorporated, so permits and inspections go through the Town of Sahuarita rather than the county — a routine cleaning visit doesn't typically trigger either.`,
        faqs: [
          {
            q: "How often should panels be cleaned in Sahuarita?",
            a: `Twice a year for most homes — Quail Creek's single-level rooflines are usually quicker to access than Rancho Sahuarita's larger two-story builds. <a href="/guides/solar-panel-cleaning-arizona/seasonal-homeowner-cleaning-schedule/">The full seasonal schedule</a>.`,
          },
          {
            q: "Is Quail Creek's cleaning process any different from Rancho Sahuarita's?",
            a: `Not in method — the difference is mostly access. Quail Creek's single-level homes are typically faster jobs than Rancho Sahuarita's larger, taller builds.`,
          },
        ],
      },
    },
  },

  "green-valley": {
    jurisdiction: { type: "unincorporated", authority: "Pima County" },
    communities: ["Canoa Ranch", "Las Campanas"],
    content: {
      "pigeon-proofing-solar-panels": {
        intro:
          "Green Valley homeowners tend to notice the problem in late spring, right as nesting season ramps up and droppings start showing up on driveways and patios below the array.",
        whyItMatters:
          `Green Valley itself has never incorporated — it's a cluster of 55+ communities managed largely through Green Valley Recreation's 13 shared facilities rather than a single town government. Canoa Ranch surrounds its own golf club on 480 acres, and Las Campanas, on the community's eastern side, is known for mature landscaping and single-level, retiree-focused homes — exactly the low roofline that makes a raised solar array such an easy nesting spot. <a href="/guides/pigeons-and-solar-panels/signs-of-pigeons-under-solar-panels/">Signs pigeons have already moved in under your panels</a>.`,
        permitNote:
          `Green Valley is unincorporated, so permits and inspections go through Pima County rather than a local town government.`,
        faqs: [
          {
            q: "Since Green Valley isn't an incorporated town, who handles permits?",
            a: `Pima County, not a town building department — Green Valley Recreation manages community facilities and HOA-style architectural rules for member communities, but permitting itself runs through the county. <a href="/guides/hoa-solar-panel-rules-arizona/bird-mesh-architectural-review/">What a typical architectural review checks for</a>.`,
          },
          {
            q: "Do Canoa Ranch and Las Campanas see the same level of pigeon activity?",
            a: `Both do, mainly because single-level rooflines are common in each — the low mounting height matters more than which community you're in. <a href="/guides/pigeons-and-solar-panels/why-pigeons-nest-under-solar-panels/">Why nesting behavior tracks roof height more than location</a>.`,
          },
        ],
      },
      "solar-panel-cleaning": {
        intro:
          "Green Valley's older, retirement-community housing stock tends to have lower, more walkable rooflines than Tucson's newer subdivisions — good news for access, less good news for how fast dust settles at that height.",
        whyItMatters:
          `The region's official monsoon season — June 15 through September 30, per the National Weather Service — still means heavy dust ahead of storms and mineral spotting from the rain itself. Green Valley has never incorporated; it's managed largely through Green Valley Recreation's 13 shared facilities, and its two largest communities, Canoa Ranch (built around its own 480-acre golf club) and Las Campanas, both see enough dust turnover each season to justify cleaning on both sides of monsoon. <a href="/guides/solar-panel-cleaning-arizona/dust-pollen-solar-output-loss-arizona/">What that build-up actually costs you in output</a>.`,
        permitNote:
          `Green Valley is unincorporated, so permits and inspections go through Pima County rather than a local town government — a routine cleaning visit doesn't typically trigger either.`,
        faqs: [
          {
            q: "How often should panels be cleaned in Green Valley?",
            a: `Twice a year for most homes — golf-course-adjacent homes in Canoa Ranch sometimes need an extra visit for turf and irrigation overspray. <a href="/guides/solar-panel-cleaning-arizona/seasonal-homeowner-cleaning-schedule/">The full seasonal schedule</a>.`,
          },
          {
            q: "Does living near Canoa Ranch's golf course change what panels need?",
            a: `It can — irrigation overspray and turf treatment residue add to normal dust build-up for homes directly adjacent to the course, which we account for when scheduling.`,
          },
        ],
      },
    },
  },

  vail: {
    jurisdiction: { type: "unincorporated", authority: "Pima County" },
    communities: ["Rocking K Ranch", "Del Webb at Rancho del Lago", "Del Webb at Rocking K"],
    content: {
      "pigeon-proofing-solar-panels": {
        intro:
          "Vail homeowners tend to notice the problem in late spring, right as nesting season ramps up and droppings start showing up on driveways and patios below the array.",
        whyItMatters:
          `Vail residents have voted down incorporation twice, most recently in 2023, so it stays unincorporated Pima County land even as it's grown fast. Rocking K Ranch, preserving 30% of its native desert in the master plan, and two separate Del Webb 55+ communities (Rancho del Lago and the newer Rocking K location) are driving most of that growth — and the preserved desert acreage right up against the built areas means more birds in the immediate area than a fully built-out suburb. <a href="/guides/pigeons-and-solar-panels/why-pigeons-nest-under-solar-panels/">Why pigeons choose the space under a panel in the first place</a>.`,
        permitNote:
          `Vail is unincorporated, so permits and inspections go through Pima County rather than a local town government.`,
        faqs: [
          {
            q: "Do I need HOA approval for bird mesh in Vail?",
            a: `Most Rocking K and Del Webb HOAs allow it since the mesh is barely visible from the ground, but architectural review is common in these communities — we can provide spec sheets if yours requires one. <a href="/guides/hoa-solar-panel-rules-arizona/hoa-approval-spec-sheet/">What to submit for approval</a>.`,
          },
          {
            q: "Does Vail have its own building department for permits?",
            a: `No — Vail residents have voted against incorporating twice, so Pima County handles permitting rather than a town government. Individual HOAs like Rocking K still run their own architectural review separately.`,
          },
        ],
      },
      "solar-panel-cleaning": {
        intro:
          "Vail's newer subdivisions sit right up against preserved native desert, which means more windblown dust reaching panels than in a fully built-out, paved neighborhood.",
        whyItMatters:
          `The region's official monsoon season — June 15 through September 30, per the National Weather Service — still means heavy dust ahead of storms and mineral spotting from the rain itself. Vail has voted down incorporation twice, most recently in 2023; Rocking K Ranch preserves 30% of its native desert in the master plan, and that open desert edge right against the built neighborhoods means more dust exposure than a community with denser, more established landscaping. <a href="/guides/solar-panel-cleaning-arizona/dust-pollen-solar-output-loss-arizona/">What that dust actually costs you in output</a>.`,
        permitNote:
          `Vail is unincorporated, so permits and inspections go through Pima County rather than a local town government — a routine cleaning visit doesn't typically trigger either.`,
        faqs: [
          {
            q: "How often should panels be cleaned in Vail?",
            a: `Twice a year for most homes; lots backing directly onto preserved desert in Rocking K may benefit from a third visit. <a href="/guides/solar-panel-cleaning-arizona/seasonal-homeowner-cleaning-schedule/">The full seasonal schedule</a>.`,
          },
          {
            q: "Does Vail have its own building department for cleaning visits?",
            a: `No — Pima County handles any permitting question, but routine cleaning doesn't typically require one either way.`,
          },
        ],
      },
    },
  },

  "catalina-foothills": {
    jurisdiction: { type: "unincorporated", authority: "Pima County" },
    communities: ["La Paloma", "Ventana Canyon", "Skyline Country Club"],
    content: {
      "pigeon-proofing-solar-panels": {
        intro:
          "Catalina Foothills homeowners tend to notice the problem in late spring, right as nesting season ramps up and droppings start showing up on driveways and patios below the array.",
        whyItMatters:
          `The Foothills is unincorporated Pima County, but its three best-known guard-gated communities each run their own tight architectural review: La Paloma (856 homes across ten sub-associations, centered on its country club), Ventana Canyon (custom and semi-custom homes against dramatic canyon scenery), and Skyline Country Club. Custom homes here often mean larger, more varied roof geometry — and more places for a nest to tuck in unnoticed. <a href="/guides/pigeons-and-solar-panels/signs-of-pigeons-under-solar-panels/">Signs pigeons are already using the space under your panels</a>.`,
        permitNote:
          `Catalina Foothills is unincorporated, so permits and inspections go through Pima County rather than a local town government.`,
        faqs: [
          {
            q: "Do guard-gated Foothills communities need advance notice for a crew visit?",
            a: `Usually yes — La Paloma, Ventana Canyon, and Skyline Country Club all require gate clearance for contractors, so we coordinate access ahead of the appointment rather than showing up unannounced.`,
          },
          {
            q: "Do La Paloma, Ventana Canyon, or Skyline require HOA sign-off before mesh goes up?",
            a: `All three run tight architectural review, more so than a standard subdivision — we build the submittal into the timeline up front. <a href="/guides/hoa-solar-panel-rules-arizona/hoa-approval-spec-sheet/">What that submittal typically needs to include</a>.`,
          },
        ],
      },
      "solar-panel-cleaning": {
        intro:
          "Custom Foothills homes often sit on larger, more exposed lots against the mountains — which means more direct dust and pollen exposure than a denser, tree-lined subdivision closer to the valley floor.",
        whyItMatters:
          `The region's official monsoon season — June 15 through September 30, per the National Weather Service — still means heavy dust ahead of storms and mineral spotting from the rain itself. The Foothills is unincorporated Pima County; La Paloma, Ventana Canyon, and Skyline Country Club are its three best-known guard-gated communities, and their mountain-facing lots tend to catch more windblown dust than homes further down the valley. <a href="/guides/solar-panel-cleaning-arizona/dust-pollen-solar-output-loss-arizona/">What that build-up actually costs in output</a>.`,
        permitNote:
          `Catalina Foothills is unincorporated, so permits and inspections go through Pima County rather than a local town government — a routine cleaning visit doesn't typically trigger either.`,
        faqs: [
          {
            q: "How often should panels be cleaned in Catalina Foothills?",
            a: `Twice a year for most homes — exposed, mountain-adjacent lots in La Paloma or Ventana Canyon may need a third visit. <a href="/guides/solar-panel-cleaning-arizona/seasonal-homeowner-cleaning-schedule/">The full seasonal schedule</a>.`,
          },
          {
            q: "Do guard-gated Foothills communities need advance notice for a cleaning visit?",
            a: `Same as any service call — La Paloma, Ventana Canyon, and Skyline Country Club all require gate clearance, so we coordinate access ahead of time rather than showing up unannounced.`,
          },
        ],
      },
    },
  },

  "south-tucson": {
    jurisdiction: { type: "incorporated", authority: "City of South Tucson" },
    communities: [],
    content: {
      "pigeon-proofing-solar-panels": {
        intro:
          "South Tucson's older, denser housing stock means arrays here are often mounted lower and closer to the roofline than in the master-planned suburbs further out — which changes how a nest tends to form, not whether one does.",
        whyItMatters:
          `South Tucson is its own city — incorporated in 1936 specifically to avoid annexation by Tucson, and still just 1.2 square miles, entirely surrounded by Tucson on all sides. It runs its own mayor, council, police, and fire department despite the small footprint, though it shares Tucson's utilities and schools. Housing here skews older and denser than the master-planned suburbs further out, with less roof variety but tighter eaves — exactly the kind of gap pigeons look for. <a href="/guides/pigeons-and-solar-panels/why-pigeons-nest-under-solar-panels/">Why pigeons choose the space under a panel in the first place</a>.`,
        permitNote:
          `South Tucson is incorporated, so permits and inspections go through the City of South Tucson rather than the county.`,
        faqs: [
          {
            q: "Does South Tucson's small size mean it doesn't have its own permit process?",
            a: `It still does — South Tucson has run its own city government since 1940 despite being only 1.2 square miles, so permitting is separate from the City of Tucson even though the two are seamlessly adjacent.`,
          },
          {
            q: "Does South Tucson's older housing stock change how mesh gets installed?",
            a: `Sometimes — older, lower-slung roofs and tighter eave gaps need a slightly different mesh fit than a newer subdivision roof, which is why we inspect before quoting rather than pricing blind. <a href="/guides/pigeons-and-solar-panels/ground-mounted-vs-roof-mounted-pigeon-risk/">How roof type affects nesting risk</a>.`,
          },
        ],
      },
      "solar-panel-cleaning": {
        intro:
          "South Tucson's compact, established neighborhoods tend to have lower rooflines than newer subdivisions — easier access for a cleaning crew, but also panels sitting closer to street-level dust and traffic residue.",
        whyItMatters:
          `The region's official monsoon season — June 15 through September 30, per the National Weather Service — still means heavy dust ahead of storms and mineral spotting from the rain itself. South Tucson is its own incorporated city, just 1.2 square miles and entirely surrounded by Tucson, with an older, denser housing stock than the outer suburbs — which means panels here often sit closer to street-level dust and vehicle exhaust residue than in a more spread-out neighborhood. <a href="/guides/solar-panel-cleaning-arizona/dust-pollen-solar-output-loss-arizona/">What that build-up actually costs in output</a>.`,
        permitNote:
          `South Tucson has run its own city government since 1940 despite its size, so permitting is separate from the City of Tucson — though a routine cleaning visit doesn't typically require one either way.`,
        faqs: [
          {
            q: "How often should panels be cleaned in South Tucson?",
            a: `Twice a year for most homes — busier streets may warrant a slightly tighter schedule. <a href="/guides/solar-panel-cleaning-arizona/seasonal-homeowner-cleaning-schedule/">The full seasonal schedule</a>.`,
          },
          {
            q: "Does South Tucson's older housing stock make panels harder to access for cleaning?",
            a: `Usually the opposite — lower, simpler rooflines are typically quicker and easier to work on than a taller custom home further out.`,
          },
        ],
      },
    },
  },

  "casas-adobes": {
    jurisdiction: { type: "unincorporated", authority: "Pima County" },
    communities: [],
    content: {
      "pigeon-proofing-solar-panels": {
        intro:
          "Bigger lots in Casas Adobes usually mean bigger roofs — and bigger arrays give pigeons more sheltered edge to work with.",
        whyItMatters:
          `Casas Adobes has stayed unincorporated since developer Sam Nanini began building its original subdivisions in the mid-1950s. Lots here often run over an acre — larger than almost anywhere else in the Tucson area — which usually means bigger roofs and larger panel arrays than a standard suburban lot, and more perimeter for nesting material to collect along. <a href="/guides/pigeons-and-solar-panels/why-pigeons-nest-under-solar-panels/">Why array size changes the nesting picture</a>.`,
        permitNote:
          `Casas Adobes is unincorporated, so permits and inspections go through Pima County rather than a local town government.`,
        faqs: [
          {
            q: "Do larger Casas Adobes lots mean a bigger panel array to service?",
            a: `Often, yes — acre-plus lots here tend to have larger roof areas and correspondingly bigger arrays, which is exactly the kind of detail that changes a quote from a flat per-panel guess to something accurate.`,
          },
          {
            q: "Does an older, mid-century Casas Adobes home need a different mesh install?",
            a: `It can — homes built since the Nanini-era subdivisions of the 1950s span a wide range of roof ages and mounting hardware, which is why we inspect in person before quoting. <a href="/guides/pigeons-and-solar-panels/ground-mounted-vs-roof-mounted-pigeon-risk/">How roof age affects mesh fit</a>.`,
          },
        ],
      },
      "solar-panel-cleaning": {
        intro:
          "Larger Casas Adobes lots mean larger arrays — which means more square footage of glass collecting dust between visits.",
        whyItMatters:
          `The region's official monsoon season — June 15 through September 30, per the National Weather Service — still means heavy dust ahead of storms and mineral spotting from the rain itself. Casas Adobes has stayed unincorporated since developer Sam Nanini began building its original subdivisions in the mid-1950s, and its acre-plus lots — some of the largest in the Tucson area — typically carry bigger arrays that take longer to clean but also show a more noticeable output recovery afterward. <a href="/guides/solar-panel-cleaning-arizona/dust-pollen-solar-output-loss-arizona/">What that build-up actually costs in output</a>.`,
        permitNote:
          `Casas Adobes is unincorporated, so permits and inspections go through Pima County rather than a local town government — a routine cleaning visit doesn't typically require one either way.`,
        faqs: [
          {
            q: "How often should panels be cleaned in Casas Adobes?",
            a: `Twice a year for most homes; larger arrays are quoted by square footage rather than a flat per-visit rate. <a href="/guides/solar-panel-cleaning-arizona/seasonal-homeowner-cleaning-schedule/">The full seasonal schedule</a>.`,
          },
          {
            q: "Do larger Casas Adobes lots take longer to clean?",
            a: `Yes, proportionally — a bigger array simply means more glass, so we quote and schedule by array size rather than a flat per-visit price.`,
          },
        ],
      },
    },
  },

  "flowing-wells": {
    jurisdiction: { type: "unincorporated", authority: "Pima County" },
    communities: [],
    content: {
      "pigeon-proofing-solar-panels": {
        intro:
          "Flowing Wells' mix of housing ages means no two roofs here look quite the same — which matters more for a clean mesh install than almost anything else.",
        whyItMatters:
          `Flowing Wells grew out of a former ranch turned suburb during the mid-century housing boom, and it shows: homes here date from every decade since the 1950s, a mix of standard single-family houses and mobile/manufactured homes rather than one uniform subdivision era. That range of roof types and mounting hardware is exactly why we inspect before quoting rather than pricing off a flat rate. <a href="/guides/pigeons-and-solar-panels/ground-mounted-vs-roof-mounted-pigeon-risk/">Why nesting risk depends on roof type as much as location</a>.`,
        permitNote:
          `Flowing Wells is unincorporated, so permits and inspections go through Pima County rather than a local town government.`,
        faqs: [
          {
            q: "Does an older roof or a manufactured home change how mesh is installed?",
            a: `It can — older mounting hardware and manufactured-home roof structures sometimes need a slightly different mesh fit than a newer standard subdivision roof, which is exactly why we inspect before quoting rather than pricing blind.`,
          },
          {
            q: "Is a manufactured home in Flowing Wells more prone to pigeon problems than a standard house?",
            a: `Not inherently — it comes down to mounting height and gap size rather than construction type, which is why every quote starts with a look at your specific setup. <a href="/guides/pigeons-and-solar-panels/why-pigeons-nest-under-solar-panels/">What actually draws pigeons to the space under a panel</a>.`,
          },
        ],
      },
      "solar-panel-cleaning": {
        intro:
          "Flowing Wells' mix of decades-old and newer homes means cleaning access varies more block to block here than in a single-era subdivision.",
        whyItMatters:
          `The region's official monsoon season — June 15 through September 30, per the National Weather Service — still means heavy dust ahead of storms and mineral spotting from the rain itself. Flowing Wells grew out of a former ranch turned suburb during the mid-century housing boom, and homes here date from every decade since the 1950s — a mix of standard single-family houses and manufactured homes with different roof pitches and mounting setups, which affects how quickly dust collects and how the crew accesses the array. <a href="/guides/solar-panel-cleaning-arizona/dust-pollen-solar-output-loss-arizona/">What that build-up costs in output regardless of roof type</a>.`,
        permitNote:
          `Flowing Wells is unincorporated, so permits and inspections go through Pima County rather than a local town government — a routine cleaning visit doesn't typically require one either way.`,
        faqs: [
          {
            q: "How often should panels be cleaned in Flowing Wells?",
            a: `Twice a year for most homes. <a href="/guides/solar-panel-cleaning-arizona/seasonal-homeowner-cleaning-schedule/">The full seasonal schedule</a>.`,
          },
          {
            q: "Does a manufactured home's roof change how cleaning is done?",
            a: `Sometimes — lower-pitch manufactured-home roofs can actually be quicker to access than a steep standard-subdivision roof, which we account for when scheduling.`,
          },
        ],
      },
    },
  },

  "tanque-verde": {
    jurisdiction: { type: "unincorporated", authority: "Pima County" },
    communities: [],
    content: {
      "pigeon-proofing-solar-panels": {
        intro:
          "Tanque Verde's big, spread-out lots come with more outbuildings and barn-style roofs than a typical subdivision — and pigeons treat those the same way they treat a solar array.",
        whyItMatters:
          `Tanque Verde is horse country — large lots, custom homes, and a working ranching history going back to Tanque Verde Ranch's founding in 1868, on the east side of town near Saguaro National Park's Rincon Mountain District. Barns, stables, and other outbuildings common on these larger properties give pigeons more nearby roosting options, which often means a bigger, more established flock finds its way to the solar array too. <a href="/guides/pigeons-and-solar-panels/signs-of-pigeons-under-solar-panels/">How to tell if pigeons are already established under your panels</a>.`,
        permitNote:
          `Tanque Verde is unincorporated, so permits and inspections go through Pima County rather than a local town government.`,
        faqs: [
          {
            q: "Do larger Tanque Verde properties need more mesh than a standard house?",
            a: `Usually, yes — bigger roofs and larger arrays mean more linear footage of mesh, which is why we quote by measuring the actual install rather than a flat per-home rate.`,
          },
          {
            q: "Do nearby barns or stables make pigeon problems worse under solar panels?",
            a: `Often, yes — outbuildings give pigeons a nearby home base, which tends to mean a more established, harder-to-discourage flock finds the array too. <a href="/guides/pigeons-and-solar-panels/why-pigeons-nest-under-solar-panels/">What draws pigeons to the space under a panel in the first place</a>.`,
          },
        ],
      },
      "solar-panel-cleaning": {
        intro:
          "Unpaved roads and larger acreage are the norm in Tanque Verde — and both mean more dust reaching your panels between cleanings than a paved subdivision sees.",
        whyItMatters:
          `The region's official monsoon season — June 15 through September 30, per the National Weather Service — still means heavy dust ahead of storms and mineral spotting from the rain itself. Tanque Verde is horse country, with a working ranching history going back to Tanque Verde Ranch's founding in 1868, and many of its large-acreage properties sit on unpaved or lightly paved roads near Saguaro National Park's Rincon Mountain District — both factors that add dust beyond the seasonal norm. <a href="/guides/solar-panel-cleaning-arizona/dust-pollen-solar-output-loss-arizona/">What that build-up actually costs in output</a>.`,
        permitNote:
          `Tanque Verde is unincorporated, so permits and inspections go through Pima County rather than a local town government — a routine cleaning visit doesn't typically require one either way.`,
        faqs: [
          {
            q: "Do larger, unpaved-road properties in Tanque Verde need more frequent cleaning?",
            a: `Generally yes — homes on unpaved roads or larger acreage tend to accumulate dust faster between monsoon and haboob seasons than panels closer to paved, developed streets. <a href="/guides/solar-panel-cleaning-arizona/seasonal-homeowner-cleaning-schedule/">The full seasonal schedule as a baseline</a>.`,
          },
          {
            q: "Does horse-property dust (hay, arena footing) affect panels differently than street dust?",
            a: `It can add a gritty component beyond typical desert dust, which is part of why we inspect before every wash rather than running a one-size routine.`,
          },
        ],
      },
    },
  },

  "rita-ranch": {
    jurisdiction: { type: "unincorporated", authority: "Pima County" },
    communities: ["Rita Ranch"],
    content: {
      "pigeon-proofing-solar-panels": {
        intro:
          "Rita Ranch's uniform, master-planned rooflines mean pigeon problems tend to show up on a predictable pattern here — which makes them easier to catch early.",
        whyItMatters:
          `Rita Ranch is a roughly 3,000-lot master-planned community developed in the early 1990s on the southeast edge of Tucson, bordering Vail and Corona de Tucson. It's home to a lot of Davis-Monthan Air Force Base families and sits within the Vail School District. The community's relatively uniform housing stock and roof style, built in a single era, means most nesting issues here follow the same pattern from house to house. <a href="/guides/pigeons-and-solar-panels/signs-of-pigeons-under-solar-panels/">What that typical pattern looks like</a>.`,
        permitNote:
          `Rita Ranch is unincorporated, so permits and inspections go through Pima County rather than a local town government.`,
        faqs: [
          {
            q: "Does Rita Ranch's HOA have its own architectural review?",
            a: `Yes, typical for a master-planned community this size — bird mesh installs are usually straightforward since they don't change how the roofline looks from the street, but we can provide documentation if a submittal is needed. <a href="/guides/hoa-solar-panel-rules-arizona/hoa-approval-spec-sheet/">What that documentation typically covers</a>.`,
          },
          {
            q: "Since Rita Ranch homes are mostly the same era, do they all need the same mesh setup?",
            a: `Close to it — early-1990s tract construction here is fairly consistent, which is part of why jobs in Rita Ranch tend to be quick, predictable installs.`,
          },
        ],
      },
      "solar-panel-cleaning": {
        intro:
          "Rita Ranch sits on Tucson's southeast edge, close enough to open desert that dust builds up a bit faster here than in more established, tree-lined parts of the city.",
        whyItMatters:
          `The region's official monsoon season — June 15 through September 30, per the National Weather Service — still means heavy dust ahead of storms and mineral spotting from the rain itself. Rita Ranch is a roughly 3,000-lot master-planned community developed in the early 1990s on the southeast edge of Tucson, bordering Vail and Corona de Tucson — an area still close enough to open desert on its outer edges that dust exposure runs a bit higher than in more established, landscaped neighborhoods. <a href="/guides/solar-panel-cleaning-arizona/dust-pollen-solar-output-loss-arizona/">What that exposure actually costs in output</a>.`,
        permitNote:
          `Rita Ranch is unincorporated, so permits and inspections go through Pima County rather than a local town government — a routine cleaning visit doesn't typically require one either way.`,
        faqs: [
          {
            q: "How often should panels be cleaned in Rita Ranch?",
            a: `Twice a year for most homes; lots on the community's outer, desert-adjacent edge may benefit from a third visit. <a href="/guides/solar-panel-cleaning-arizona/seasonal-homeowner-cleaning-schedule/">The full seasonal schedule</a>.`,
          },
          {
            q: "Since most Rita Ranch homes are the same era, does cleaning take the same amount of time everywhere?",
            a: `Mostly, yes — the community's relatively uniform early-1990s roof style means visits here tend to be quick and predictable.`,
          },
        ],
      },
    },
  },

  "corona-de-tucson": {
    jurisdiction: { type: "unincorporated", authority: "Pima County" },
    communities: [],
    content: {
      "pigeon-proofing-solar-panels": {
        intro:
          "Corona de Tucson's rapid growth means a lot of newer solar installs going up every year — and newer racking is exactly the kind of gap pigeons look for first.",
        whyItMatters:
          `Corona de Tucson has grown explosively — from 813 residents in 2000 to over 9,000 by 2020 — while staying a quiet, rural-feeling community in the Santa Rita Mountain foothills, represented by the Corona de Tucson Community Alliance rather than a town government. That pace of new construction means a steady supply of freshly-installed arrays, which are actually more likely to attract early nesting than an older, weathered roof pigeons have already learned to avoid. <a href="/guides/pigeons-and-solar-panels/why-pigeons-nest-under-solar-panels/">Why newer installs are more attractive to nesting pigeons</a>.`,
        permitNote:
          `Corona de Tucson is unincorporated, so permits and inspections go through Pima County rather than a local town government.`,
        faqs: [
          {
            q: "Is Corona de Tucson's rapid growth changing what solar setups look like there?",
            a: `Yes — newer construction here tends to come with newer racking and larger arrays than the area's older ranch-style homes, so we size the quote to your specific roof rather than a flat estimate either way.`,
          },
          {
            q: "Should a brand-new Corona de Tucson install get mesh proactively, before pigeons show up?",
            a: `It's worth considering — mesh installed at move-in is cheaper and less disruptive than removing an established nest later. <a href="/guides/pigeons-and-solar-panels/pigeon-damage-cost/">The real cost difference between prevention and after-the-fact removal</a>.`,
          },
        ],
      },
      "solar-panel-cleaning": {
        intro:
          "Corona de Tucson's rapid, ongoing construction means more dust from grading and new-home building than an established, fully built-out neighborhood.",
        whyItMatters:
          `The region's official monsoon season — June 15 through September 30, per the National Weather Service — still means heavy dust ahead of storms and mineral spotting from the rain itself. Corona de Tucson has grown explosively — from 813 residents in 2000 to over 9,000 by 2020 — and that pace of new construction in the Santa Rita Mountain foothills adds fresh grading dust on top of the seasonal norm, especially for homes near an active building phase. <a href="/guides/solar-panel-cleaning-arizona/construction-dust-new-build-solar-panels/">How construction dust specifically affects new-build panels</a>.`,
        permitNote:
          `Corona de Tucson is unincorporated, so permits and inspections go through Pima County rather than a local town government — a routine cleaning visit doesn't typically require one either way.`,
        faqs: [
          {
            q: "Is Corona de Tucson's rapid growth changing how often panels need cleaning?",
            a: `Yes — homes near active new-construction phases typically need cleaning more often than the area's older, established ranch-style homes. <a href="/guides/solar-panel-cleaning-arizona/seasonal-homeowner-cleaning-schedule/">The full seasonal schedule as a baseline</a>.`,
          },
          {
            q: "Should a brand-new Corona de Tucson install get its first cleaning sooner than the standard schedule?",
            a: `Often yes, if the home is near an active construction phase — fresh grading dust can build up faster than the twice-a-year norm accounts for.`,
          },
        ],
      },
    },
  },

  saddlebrooke: {
    jurisdiction: { type: "unincorporated", authority: "Pinal County (SaddleBrooke Community Association)" },
    communities: ["SaddleBrooke", "SaddleBrooke Ranch"],
    content: {
      "pigeon-proofing-solar-panels": {
        intro:
          "SaddleBrooke's single-level, age-restricted homes tend to have lower rooflines than a two-story family subdivision — which makes for both easier nesting access for pigeons and easier mesh access for us.",
        whyItMatters:
          `SaddleBrooke is a 55+ age-restricted community in the Santa Catalina Mountain foothills near Oracle, developed by Robson Communities, with SaddleBrooke Ranch as a newer, separate age-restricted Robson community nearby. The single-level roof style common to both communities creates a shorter, more uniform gap under the array than a mixed-height subdivision — consistent enough that most installs here follow a predictable pattern. <a href="/guides/pigeons-and-solar-panels/signs-of-pigeons-under-solar-panels/">What that typical nesting pattern looks like</a>.`,
        permitNote:
          `SaddleBrooke is unincorporated, so permits and inspections go through Pinal County (with architectural review handled separately by the SaddleBrooke Community Association) rather than a local town government.`,
        faqs: [
          {
            q: "Is SaddleBrooke's HOA architectural review stricter than other 55+ communities?",
            a: `It tends to be more thorough than average for an age-restricted community, so we build the HOA submittal into the timeline up front rather than treating it as an afterthought. <a href="/guides/hoa-solar-panel-rules-arizona/hoa-approval-spec-sheet/">What a typical submittal package includes</a>.`,
          },
          {
            q: "Does SaddleBrooke Ranch have the same HOA process as the original SaddleBrooke community?",
            a: `They're separate associations with their own architectural review, though both are Robson-developed and generally straightforward for bird mesh once the paperwork is submitted.`,
          },
        ],
      },
      "solar-panel-cleaning": {
        intro:
          "SaddleBrooke's foothill setting near Oracle catches more windblown dust off the Santa Catalinas than a valley-floor subdivision does — and its single-level roofs make quick work of cleaning once we're there.",
        whyItMatters:
          `The region's official monsoon season — June 15 through September 30, per the National Weather Service — still means heavy dust ahead of storms and mineral spotting from the rain itself. SaddleBrooke is a 55+ age-restricted community in the Santa Catalina Mountain foothills near Oracle, developed by Robson Communities, with SaddleBrooke Ranch as a newer, separate age-restricted Robson community nearby — both sit high enough against the mountains to catch extra windblown dust beyond the valley-floor norm. <a href="/guides/solar-panel-cleaning-arizona/dust-pollen-solar-output-loss-arizona/">What that build-up actually costs in output</a>.`,
        permitNote:
          `SaddleBrooke is unincorporated, so permits and inspections go through Pinal County rather than a local town government — a routine cleaning visit doesn't typically require one either way.`,
        faqs: [
          {
            q: "How often should panels be cleaned in SaddleBrooke?",
            a: `Twice a year for most homes. <a href="/guides/solar-panel-cleaning-arizona/seasonal-homeowner-cleaning-schedule/">The full seasonal schedule</a>.`,
          },
          {
            q: "Are SaddleBrooke's single-level homes quicker to clean than a two-story house?",
            a: `Generally, yes — lower rooflines mean simpler access, which tends to make SaddleBrooke and SaddleBrooke Ranch visits faster than a comparable two-story home elsewhere.`,
          },
        ],
      },
    },
  },

  "picture-rocks": {
    jurisdiction: { type: "unincorporated", authority: "Pima County" },
    communities: [],
    content: {
      "pigeon-proofing-solar-panels": {
        intro:
          "Picture Rocks' wide-open, ranchette-style lots mean fewer neighbors but no fewer pigeons — the birds travel from the surrounding desert just as readily as from a next-door roof.",
        whyItMatters:
          `Picture Rocks sits about 20 miles northwest of downtown Tucson against Saguaro National Park's Tucson Mountain District — an "Old West ranchette" area of generous lot sizes, quiet desert scenery, and Hohokam petroglyphs in the surrounding hills. The wide spacing between homes doesn't reduce pigeon activity the way it might with some pests; these birds range widely and treat an isolated solar array as reliably as a densely packed subdivision one. <a href="/guides/pigeons-and-solar-panels/why-pigeons-nest-under-solar-panels/">Why pigeons choose the space under a panel regardless of how remote it is</a>.`,
        permitNote:
          `Picture Rocks is unincorporated, so permits and inspections go through Pima County rather than a local town government.`,
        faqs: [
          {
            q: "Does being this close to Saguaro National Park affect service in Picture Rocks?",
            a: `Not for permitting — there's no park-adjacency restriction on residential solar work — but properties out here do tend to be larger and further apart, which we factor into scheduling.`,
          },
          {
            q: "Do Picture Rocks' generous lot sizes mean bigger arrays to proof?",
            a: `Often, yes — larger custom homes on ranchette-sized lots frequently carry bigger arrays than a standard suburban roof, which is part of why we quote after an in-person look. <a href="/guides/pigeons-and-solar-panels/ground-mounted-vs-roof-mounted-pigeon-risk/">How array size affects nesting risk</a>.`,
          },
        ],
      },
      "solar-panel-cleaning": {
        intro:
          "Picture Rocks' unpaved roads and open desert surroundings mean more dust reaching your panels between visits than a paved subdivision closer to the city.",
        whyItMatters:
          `The region's official monsoon season — June 15 through September 30, per the National Weather Service — still means heavy dust ahead of storms and mineral spotting from the rain itself. Picture Rocks sits about 20 miles northwest of downtown Tucson against Saguaro National Park's Tucson Mountain District, an "Old West ranchette" area of generous lot sizes and quiet desert scenery — and many of its access roads are unpaved, which adds dust beyond the seasonal norm. <a href="/guides/solar-panel-cleaning-arizona/dust-pollen-solar-output-loss-arizona/">What that build-up actually costs in output</a>.`,
        permitNote:
          `Picture Rocks is unincorporated, so permits and inspections go through Pima County rather than a local town government — a routine cleaning visit doesn't typically require one either way.`,
        faqs: [
          {
            q: "How often should panels be cleaned in Picture Rocks?",
            a: `Twice a year for most homes; unpaved-road properties may benefit from a third visit between monsoon and haboob seasons. <a href="/guides/solar-panel-cleaning-arizona/seasonal-homeowner-cleaning-schedule/">The full seasonal schedule</a>.`,
          },
          {
            q: "Does being this close to Saguaro National Park affect a cleaning visit?",
            a: `Not for permitting or access — there's no park-adjacency restriction — but larger, farther-apart properties out here do factor into scheduling.`,
          },
        ],
      },
    },
  },
};
