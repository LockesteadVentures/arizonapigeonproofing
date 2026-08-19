// Verified, real local context per Tucson-area city — named communities, jurisdiction
// status, and housing/terrain character. Sources checked via web research (see commit
// history); nothing here is invented. This is what makes each city page genuinely
// different instead of the same template with a name swapped in.
//
// jurisdiction: "incorporated" means the city/town has its own building & planning
// department (permits go through them); "unincorporated" means Pima County handles it.

export const CITY_CONTEXT = {
  tucson: {
    jurisdiction: { type: "incorporated", authority: "City of Tucson" },
    character:
      "Tucson's housing stock spans everything from century-old adobe in the central neighborhoods to 1970s ranch homes to brand-new subdivisions on the edges of the city — which means roof type, mounting hardware, and panel age vary more here than almost anywhere else in the region.",
    communities: [],
    localFaq: {
      q: () => "Does the City of Tucson require a permit for bird mesh or panel cleaning?",
      a: "Neither typically requires a city permit on its own — mesh attaches to the mounting rails rather than the roof structure, and cleaning doesn't alter anything. If your home is in an HOA within city limits, though, the HOA's own architectural review may still apply.",
    },
  },

  "oro-valley": {
    jurisdiction: { type: "incorporated", authority: "Town of Oro Valley" },
    character:
      "Oro Valley incorporated in 1974 specifically so residents could set their own rules rather than be annexed by Tucson — Rancho Vistoso, its largest master-planned area, covers over 7,600 acres, and Sun City Oro Valley (formerly Sun City Vistoso) is a Del Webb 55+ community of roughly 2,500 single-level homes built 1987–1995.",
    communities: ["Rancho Vistoso", "Sun City Oro Valley"],
    localFaq: {
      q: () => "Does Rancho Vistoso or Sun City Oro Valley require HOA approval for bird mesh?",
      a: "Most Rancho Vistoso and Sun City Oro Valley HOAs allow it since the mesh sits close to the panel and is barely visible from the street, but architectural review is common in these communities — we can provide spec sheets for submittal if yours requires one.",
    },
  },

  marana: {
    jurisdiction: { type: "incorporated", authority: "Town of Marana" },
    character:
      "Marana incorporated in 1977 and has grown fast since — Dove Mountain, in the Tortolita Mountain foothills, and Gladden Farms, with over 850 acres of parks and trails, are its two largest master-planned communities, both with active HOAs.",
    communities: ["Dove Mountain", "Gladden Farms"],
    localFaq: {
      q: () => "Do Dove Mountain and Gladden Farms have different HOA rules for solar equipment?",
      a: "Both have active community associations with architectural guidelines, though neither typically restricts bird mesh once it's clear the install doesn't alter the roofline. We handle the paperwork if a submittal is required.",
    },
  },

  sahuarita: {
    jurisdiction: { type: "incorporated", authority: "Town of Sahuarita" },
    character:
      "Sahuarita incorporated in 1994 and is one of the youngest towns in southern Arizona — Rancho Sahuarita, its original master-planned community, now has around 18,000 residents, and Quail Creek, a Robson-built 55+ community within town limits, adds a second HOA-governed pocket with its own architectural rules.",
    communities: ["Rancho Sahuarita", "Quail Creek", "Madera Highlands"],
    localFaq: {
      q: () => "Is Quail Creek's HOA process different from Rancho Sahuarita's?",
      a: "Yes — Quail Creek is a Robson-developed 55+ community with its own architectural review separate from Rancho Sahuarita's. Both are usually straightforward for bird mesh since it doesn't change how the roofline looks from the street.",
    },
  },

  "green-valley": {
    jurisdiction: { type: "unincorporated", authority: "Pima County" },
    character:
      "Green Valley itself has never incorporated — it's a cluster of 55+ communities managed largely through Green Valley Recreation's 13 shared facilities rather than a single town government. Canoa Ranch surrounds its own golf club on 480 acres, and Las Campanas, on the community's eastern side, is known for mature landscaping and single-level retiree-focused homes.",
    communities: ["Canoa Ranch", "Las Campanas"],
    localFaq: {
      q: () => "Since Green Valley isn't an incorporated town, who handles permits?",
      a: "Pima County, not a town building department — Green Valley Recreation manages community facilities and HOA-style architectural rules for member communities, but permitting itself runs through the county.",
    },
  },

  vail: {
    jurisdiction: { type: "unincorporated", authority: "Pima County" },
    character:
      "Vail residents have voted down incorporation twice, most recently in 2023, so it stays unincorporated Pima County land even as it's grown fast — Rocking K Ranch, preserving 30% of its native desert in the master plan, and two separate Del Webb 55+ communities (Rancho del Lago and the newer Rocking K location) are driving most of that growth.",
    communities: ["Rocking K Ranch", "Del Webb at Rancho del Lago", "Del Webb at Rocking K"],
    localFaq: {
      q: () => "Does Vail have its own building department for permits?",
      a: "No — Vail residents have voted against incorporating twice, so Pima County handles permitting rather than a town government. Individual HOAs like Rocking K still run their own architectural review separately.",
    },
  },

  "catalina-foothills": {
    jurisdiction: { type: "unincorporated", authority: "Pima County" },
    character:
      "The Foothills is unincorporated Pima County, but its three best-known guard-gated communities each run their own tight architectural review: La Paloma (856 homes across ten sub-associations, centered on its country club), Ventana Canyon (custom and semi-custom homes against dramatic canyon scenery), and Skyline Country Club.",
    communities: ["La Paloma", "Ventana Canyon", "Skyline Country Club"],
    localFaq: {
      q: () => "Do guard-gated Foothills communities need advance notice for a crew visit?",
      a: "Usually yes — La Paloma, Ventana Canyon, and Skyline Country Club all require gate clearance for contractors, so we coordinate access ahead of the appointment rather than showing up unannounced.",
    },
  },

  "south-tucson": {
    jurisdiction: { type: "incorporated", authority: "City of South Tucson" },
    character:
      "South Tucson is its own city — incorporated in 1936 specifically to avoid annexation by Tucson, and still just 1.2 square miles, entirely surrounded by Tucson on all sides. It runs its own mayor, council, police, and fire department despite the small footprint, though it shares Tucson's utilities and schools. Housing here skews older and denser than the master-planned suburbs further out.",
    communities: [],
    localFaq: {
      q: () => "Does South Tucson's small size mean it doesn't have its own permit process?",
      a: "It still does — South Tucson has run its own city government since 1940 despite being only 1.2 square miles, so permitting is separate from the City of Tucson even though the two are seamlessly adjacent.",
    },
  },

  "casas-adobes": {
    jurisdiction: { type: "unincorporated", authority: "Pima County" },
    character:
      "Casas Adobes has stayed unincorporated since developer Sam Nanini began building its original subdivisions in the mid-1950s. Lots here often run over an acre — larger than almost anywhere else in the Tucson area — which usually means bigger roofs and larger panel arrays than a standard suburban lot.",
    communities: [],
    localFaq: {
      q: () => "Do larger Casas Adobes lots mean a bigger panel array to service?",
      a: "Often, yes — acre-plus lots here tend to have larger roof areas and correspondingly bigger arrays, which is exactly the kind of detail that changes a quote from a flat per-panel guess to something accurate.",
    },
  },

  "flowing-wells": {
    jurisdiction: { type: "unincorporated", authority: "Pima County" },
    character:
      "Flowing Wells grew out of a former ranch turned suburb during the mid-century housing boom, and it shows: homes here date from every decade since the 1950s, a mix of standard single-family houses and mobile/manufactured homes rather than one uniform subdivision era.",
    communities: [],
    localFaq: {
      q: () => "Does an older roof or a manufactured home change how mesh is installed?",
      a: "It can — older mounting hardware and manufactured-home roof structures sometimes need a slightly different mesh fit than a newer standard subdivision roof, which is exactly why we inspect before quoting rather than pricing blind.",
    },
  },

  "tanque-verde": {
    jurisdiction: { type: "unincorporated", authority: "Pima County" },
    character:
      "Tanque Verde is horse country — large lots, custom homes, and a working ranching history going back to Tanque Verde Ranch's founding in 1868, on the east side of town near Saguaro National Park's Rincon Mountain District.",
    communities: [],
    localFaq: {
      q: () => "Do larger, unpaved-road properties in Tanque Verde need more frequent cleaning?",
      a: "Generally yes — homes on unpaved roads or larger acreage tend to accumulate dust faster between monsoon and haboob seasons than panels closer to paved, developed streets.",
    },
  },

  "rita-ranch": {
    jurisdiction: { type: "unincorporated", authority: "Pima County" },
    character:
      "Rita Ranch is a roughly 3,000-lot master-planned community developed in the early 1990s on the southeast edge of Tucson, bordering Vail and Corona de Tucson. It's home to a lot of Davis-Monthan Air Force Base families and sits within the Vail School District.",
    communities: ["Rita Ranch"],
    localFaq: {
      q: () => "Does Rita Ranch's HOA have its own architectural review?",
      a: "Yes, typical for a master-planned community this size — bird mesh installs are usually straightforward since they don't change how the roofline looks from the street, but we can provide documentation if a submittal is needed.",
    },
  },

  "corona-de-tucson": {
    jurisdiction: { type: "unincorporated", authority: "Pima County" },
    character:
      "Corona de Tucson has grown explosively — from 813 residents in 2000 to over 9,000 by 2020 — while staying a quiet, rural-feeling community in the Santa Rita Mountain foothills, represented by the Corona de Tucson Community Alliance rather than a town government.",
    communities: [],
    localFaq: {
      q: () => "Is Corona de Tucson's rapid growth changing what solar setups look like there?",
      a: "Newer construction here tends to come with newer racking and larger arrays than the area's older ranch-style homes, so we size the quote to your specific roof rather than a flat estimate either way.",
    },
  },

  saddlebrooke: {
    jurisdiction: { type: "unincorporated", authority: "Pinal County (SaddleBrooke Community Association)" },
    character:
      "SaddleBrooke is a 55+ age-restricted community in the Santa Catalina Mountain foothills near Oracle, developed by Robson Communities, with SaddleBrooke Ranch as a newer, separate age-restricted Robson community nearby. Architectural review tends to be more thorough here than in a typical subdivision.",
    communities: ["SaddleBrooke", "SaddleBrooke Ranch"],
    localFaq: {
      q: () => "Is SaddleBrooke's HOA architectural review stricter than other 55+ communities?",
      a: "It tends to be more thorough than average for an age-restricted community, so we build the HOA submittal into the timeline up front rather than treating it as an afterthought.",
    },
  },

  "picture-rocks": {
    jurisdiction: { type: "unincorporated", authority: "Pima County" },
    character:
      "Picture Rocks sits about 20 miles northwest of downtown Tucson against Saguaro National Park's Tucson Mountain District — an \"Old West ranchette\" area of generous lot sizes, quiet desert scenery, and Hohokam petroglyphs in the surrounding hills.",
    communities: [],
    localFaq: {
      q: () => "Does being this close to Saguaro National Park affect service in Picture Rocks?",
      a: "Not for permitting — there's no park-adjacency restriction on residential solar work — but properties out here do tend to be larger and further apart, which we factor into scheduling.",
    },
  },
};
