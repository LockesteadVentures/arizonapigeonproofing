// Price anchors for the PriceBlock component (SEO plan, Task 7).
//
// Every value below is a placeholder until the owner supplies real figures. PriceBlock
// renders NOTHING in production while any value contains "[[CLIENT:", and the build
// check (scripts/check-seo.mjs) fails the build if that text ever reaches rendered HTML.
// To go live: replace each [[CLIENT: ...]] with the real number or range, e.g.
//   { label: "Small array (up to 12 panels)", range: "$600 to $900" }
// Do not invent figures. The site has deliberately never published a price.

export const PRICING = {
  proofing: {
    ranges: [
      { label: "Small array ([[CLIENT: panel count]] panels or fewer)", range: "[[CLIENT: price range]]" },
      { label: "Medium array ([[CLIENT: panel count range]] panels)", range: "[[CLIENT: price range]]" },
      { label: "Large array ([[CLIENT: panel count]] panels or more)", range: "[[CLIENT: price range]]" },
    ],
    bundleNote: "[[CLIENT: bundle discount for adding cleaning to a proofing visit]]",
  },
  cleaning: {
    ranges: [
      { label: "Small array ([[CLIENT: panel count]] panels or fewer)", range: "[[CLIENT: price range]]" },
      { label: "Medium array ([[CLIENT: panel count range]] panels)", range: "[[CLIENT: price range]]" },
      { label: "Large array ([[CLIENT: panel count]] panels or more)", range: "[[CLIENT: price range]]" },
    ],
    bundleNote: "[[CLIENT: bundle discount for adding proofing to a cleaning visit]]",
  },
};

export const PRICE_FACTORS = {
  proofing: [
    "Array size and layout",
    "Roof access and pitch",
    "How much existing nesting and droppings need to be removed",
    "Whether you bundle cleaning with proofing",
  ],
  cleaning: [
    "Array size and layout",
    "Roof access and pitch",
    "How long it has been since the last cleaning",
    "Whether you bundle cleaning with proofing",
  ],
};
