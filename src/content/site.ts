/**
 * Single source of truth for every word, number and route on the site.
 *
 * This is the home base for **Coast to Coast Contracting & Roofing** — one
 * licensed company running three divisions: roofing, general contracting and
 * HVAC. Pages, nav, footer, sitemap and structured data all derive from the
 * arrays below. Add a division or a city and the routes follow on the next
 * build, with no page edits.
 *
 * Business facts (phone, address, licenses, the Clean & Tune checklist) carry
 * over from the company's HVAC site, coastswfl.com.
 *
 * Items marked ⚠️ CONFIRM are not published anywhere public and were drafted
 * for the contracting rebrand — check them with the client before launch.
 */

// ------------------------------------------------------------------ business

export const business = {
  name: "Coast to Coast Contracting & Roofing",
  formalName: "Coast to Coast Contracting & Roofing",
  legalName: "Coast to Coast Contracting & Roofing LLC",
  /** Short trading name for tight spots (the kinetic wordmark, mobile). */
  shortName: "Coast to Coast",
  tagline: "One company. Every trade. Coast to Coast.",
  promise: "Built to last here.",
  url: "https://coasttocoastcontracting.com", // ⚠️ CONFIRM final domain
  phone: "(239) 518-5928",
  phoneHref: "tel:+12395185928",
  email: "info@coasttocoastcontracting.com", // ⚠️ CONFIRM
  street: "7200 Bucks Ln",
  city: "Fort Myers",
  state: "FL",
  zip: "33912",
  /** Office coordinates. One source for the schema.org geo block and for the
   *  readout under the hero map, so the two cannot disagree. */
  lat: 26.5628,
  lng: -81.8226,
  hours: "Mon–Fri, 8am–5pm",
  emergency: "24/7 emergency service",
  /**
   * Headline licence — the general (residential) contractor licence that
   * anchors the construction side. The full set, one per division, is below.
   */
  license: "CRC1335475",
  /**
   * The three Florida licences map one-to-one to the three divisions. The
   * labels below follow the Florida DBPR prefix convention:
   *   CRC = Certified Residential Contractor → general contracting
   *   CCC = Certified Roofing Contractor     → roofing
   *   CMC = Certified Mechanical Contractor  → HVAC
   *
   * ⚠️ CONFIRM — the company's current site (coastswfl.com) lists these with
   * the CRC/CCC labels swapped (CRC shown as "Roofing", CCC as "Residential").
   * That contradicts the DBPR prefixes, so the client must confirm which
   * number belongs to which trade before launch. A licence number printed
   * beside the wrong trade is a compliance problem, not a copy nit.
   */
  licenses: [
    { label: "Roofing Contractor", number: "CCC1336116", division: "Roofing" },
    { label: "Residential Contractor", number: "CRC1335475", division: "General Contracting" },
    { label: "Mechanical Contractor", number: "CMC1251768", division: "HVAC" },
  ],
  /** Used in the schema.org `logo` field and as the OG fallback. The
   *  contracting badge, background knocked out by scripts/contracting-assets.py. */
  logo: "/brand/logo-contracting.png",
  ogImage: "/og.jpg",
  social: {
    google: "https://www.google.com/search?q=Coast+to+Coast+Contracting+Fort+Myers",
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/coast2coast_swfl",
  },
} as const;

export const region = "Southwest Florida";

// ----------------------------------------------------------------------- nav

export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Areas We Serve", href: "/locations" },
  { label: "About", href: "/about" },
  { label: "Financing", href: "/financing" },
  { label: "Contact", href: "/contact" },
] as const;

// ----------------------------------------------------------------- divisions

export type IconName =
  // roofing / contracting
  | "roof"
  | "hardhat"
  | "hammer"
  | "home"
  // hvac
  | "flame"
  | "snowflake"
  | "cog"
  | "wrench"
  | "building"
  | "wind";

/** A single thing a division does — rendered as a numbered capability row. */
export interface Capability {
  title: string;
  body: string;
}

/**
 * A division. The company runs three of them under one licence stack, and the
 * site is built around that: one clean division page each, rather than a
 * sprawling per-service tree. The HVAC division carries the published Clean &
 * Tune offer; the others close on a free estimate.
 *
 * The export is still called `services` because that is what a visitor calls
 * them ("your services") and what the nav and footer read.
 */
export interface Service {
  slug: string;
  name: string;
  /** Short label for cards, nav and breadcrumbs. */
  short: string;
  /** Even shorter label for <title> tags, where ~60 characters is the budget.
   *  Falls back to `short`. */
  seoShort?: string;
  /** Three or four words for a menu row. A restatement of `blurb`, never a
   *  new claim. */
  menuLine: string;
  /** Shown as a card on the home page. */
  featured?: boolean;
  /** One line under the card title. */
  blurb: string;
  /** Two or three sentences opening the division page. */
  intro: string;
  icon: IconName;
  /** Accent treatment on the division card icon. */
  accent: "orange" | "cyan" | "slate" | "blue" | "gold";
  /** Heading + lead over the capabilities grid. */
  capHeading: string;
  capLead: string;
  /** What the division actually does. */
  capabilities: Capability[];
  /** Short proof points. */
  bullets: string[];
  /** The Florida licence that governs this division. */
  licence: { label: string; number: string };
  faqs: { q: string; a: string }[];
  /** HVAC carries the published Clean & Tune offer; others do not. */
  hasOffer?: boolean;
}

export const services: Service[] = [
  // ------------------------------------------------------------- roofing
  {
    slug: "roofing",
    featured: true,
    name: "Roofing",
    short: "Roofing",
    menuLine: "Replacement, repair and inspection",
    blurb:
      "Roof replacement, repair and storm-damage work built for Gulf Coast wind, sun and rain.",
    intro:
      "A roof in Southwest Florida takes a harder beating than almost anywhere — relentless UV, salt air, driving summer rain and hurricane-season wind. We replace, repair and inspect shingle, tile, metal and flat roofs to current Florida wind code, and we document the work the way insurers and inspectors expect to see it.",
    icon: "roof",
    accent: "orange",
    licence: { label: "Roofing Contractor", number: "CCC1336116" },
    capHeading: "Every roof system, to Florida wind code",
    capLead:
      "Which roof you need depends on the home, the HOA and the budget — not on what we happen to stock. We install and service all four of the systems common on the Gulf Coast, and we tell you honestly when a repair will outlast a replacement.",
    capabilities: [
      {
        title: "Asphalt shingle roofing",
        body: "The workhorse of Florida re-roofs — architectural shingles rated for high wind, installed over a sealed, code-compliant underlayment that does the real waterproofing.",
      },
      {
        title: "Tile roofing",
        body: "Concrete and clay tile repair and replacement, including the flashing and underlayment work underneath that most tile failures actually trace back to.",
      },
      {
        title: "Metal roofing",
        body: "Standing-seam and metal systems built for longevity and wind uplift — the roof many coastal homeowners move to after a storm.",
      },
      {
        title: "Flat & low-slope roofing",
        body: "TPO, modified-bitumen and coating systems for flat residential sections and light commercial buildings, detailed properly at the edges and penetrations.",
      },
      {
        title: "Roof repair & leak diagnosis",
        body: "Finding where the water actually enters — rarely where the stain appears — and fixing the cause, not just the symptom.",
      },
      {
        title: "Storm damage & insurance claims",
        body: "Documented inspections and scopes that give your adjuster what they need, and a roof rebuilt to current code once a claim is approved.",
      },
      {
        title: "Roof Guard maintenance program",
        body: "A bi-annual inspection and tune-up that catches lifted shingles, failing sealant and clogged valleys before they become the leak — the roofing side of preventive maintenance.",
      },
    ],
    bullets: [
      "Licensed Florida roofing contractor — CCC1336116",
      "Shingle, tile, metal and flat systems to current wind code",
      "Free roof inspections and written estimates",
      "Storm-damage documentation for insurance claims",
      "Roof Guard — bi-annual roof maintenance program",
    ],
    faqs: [
      {
        q: "Do I need a full replacement or just a repair?",
        a: "Often a repair. We inspect first and tell you honestly — a localized leak around a vent or a section of lifted shingles is usually a repair, while widespread granule loss, failing underlayment or storm damage across the field points to replacement. You get that assessment in writing before you decide.",
      },
      {
        q: "Do you work with insurance claims?",
        a: "Yes. We document the damage, provide a detailed scope your adjuster can work from, and rebuild to current Florida code once the claim is approved. We'll tell you plainly whether we think you have a claim worth filing.",
      },
      {
        q: "How long does a roof last in Southwest Florida?",
        a: "Shorter than the brochure says. UV, salt air and hurricane-season wind mean a shingle roof here often lands at 15–20 years rather than 25–30, while tile and metal systems last considerably longer. Coastal and canal-front homes sit at the shorter end.",
      },
    ],
  },
  // -------------------------------------------------- general contracting
  {
    slug: "contracting",
    featured: true,
    name: "General Contracting",
    short: "Contracting",
    seoShort: "General Contractor",
    menuLine: "Remodels, additions and repairs",
    blurb:
      "Remodels, additions, exterior work and storm repairs — one licensed contractor, permits handled.",
    intro:
      "As a licensed Florida residential contractor, we handle the work that sits between a handyman and a specialist trade: kitchen and bath remodels, additions, exterior and water-damage repairs, and the permitting and inspections that go with them. One company is accountable for the whole job, start to finish.",
    icon: "hardhat",
    accent: "blue",
    licence: { label: "Residential Contractor", number: "CRC1335475" },
    capHeading: "The work behind one accountable contractor",
    capLead:
      "A remodel or a repair touches several trades, and the thing that goes wrong is almost always the hand-off between them. We hold the licence, pull the permits and coordinate the trades, so there is one number to call and one company responsible for the result.",
    capabilities: [
      {
        title: "Kitchen & bathroom remodels",
        body: "Full remodels coordinated end to end — demolition, rough-in, cabinetry, tile and custom finishes — on a written scope and schedule rather than an open-ended one.",
      },
      {
        title: "Room additions",
        body: "Additions and enclosures designed and built to code, with the structural, electrical and mechanical work tied together under one permit.",
      },
      {
        title: "New home construction",
        body: "Custom homes built from the ground up, on a design-build basis so the design, the budget and the construction answer to one company.",
      },
      {
        title: "Commercial construction",
        body: "Ground-up commercial projects and tenant build-outs for retail, office and restaurant spaces, scheduled around the hours a business has to keep.",
      },
      {
        title: "Storm & water-damage repair",
        body: "Rebuilding what wind and water damaged — from the structure out to the finishes — with the documentation an insurer expects.",
      },
      {
        title: "Permitting & project management",
        body: "Permits pulled, inspections scheduled and trades coordinated as part of the job — the paperwork and the hand-offs, handled for you.",
      },
    ],
    bullets: [
      "Licensed Florida residential contractor — CRC1335475",
      "Remodels, additions and new-home construction",
      "Design-build and commercial build-outs",
      "Permits pulled, inspections and trades managed",
      "One company accountable for the whole job",
    ],
    faqs: [
      {
        q: "Do you handle permits and inspections?",
        a: "Yes — on every job that needs them. Permitting and inspections are part of the scope, not an afterthought left to you. Properly permitted work is also what protects the value of the project when you sell.",
      },
      {
        q: "Will I get a fixed price before work starts?",
        a: "Yes. We put a written scope and price together before the job begins, so you are deciding on a number rather than a running tab. Change orders are agreed in writing if the scope changes mid-project.",
      },
      {
        q: "Can one company really handle roofing, contracting and HVAC?",
        a: "That is the point of the three licences. A re-roof that turns up rotted decking, a remodel that needs a new AC zone, or storm damage that spans the roof and the interior — all of it can be handled by one accountable company instead of three you have to coordinate yourself.",
      },
    ],
  },
  // ---------------------------------------------------------------- hvac
  {
    slug: "hvac",
    featured: true,
    name: "HVAC",
    short: "HVAC",
    seoShort: "HVAC & AC",
    menuLine: "AC, heating and air quality",
    blurb:
      "Air conditioning, heating, maintenance and indoor air quality for homes and businesses.",
    intro:
      "Air conditioning in Southwest Florida runs close to year-round, and that runtime is why systems here last 10–15 years rather than twenty. Our mechanical division repairs, replaces and maintains residential and light-commercial systems, quotes flat before touching anything, and sizes replacements to the home rather than to the box that came out.",
    icon: "snowflake",
    accent: "cyan",
    licence: { label: "Mechanical Contractor", number: "CMC1251768" },
    capHeading: "Cooling, heating and the work behind it",
    capLead:
      "The mechanical side is more than a box on a pad: it is the ductwork, the drainage, the electrical and the air you actually breathe. We cover all of it, and the published Clean & Tune is the twice-yearly service that keeps it out of emergency status.",
    capabilities: [
      {
        title: "Air conditioning repair & replacement",
        body: "Repair on all major brands, and replacements sized and permitted properly — near-constant summer runtime is the single biggest reason a Florida system wears out early.",
      },
      {
        title: "Heating service",
        body: "Heat pumps, electric strip heat and gas furnaces, with heating operation verified on every maintenance visit rather than discovered on the first cold night.",
      },
      {
        title: "Duct cleaning & sealing",
        body: "Ductwork repair, cleaning and mastic sealing, air handlers and condensate systems — leaky duct in a hot attic wastes a real share of everything the system produces.",
      },
      {
        title: "Clean & Tune maintenance",
        body: "A flat-rate, 10-point preventive service twice a year that catches capacitor and drain failures before they strand you in August.",
      },
      {
        title: "Energy-efficient upgrades & commercial HVAC",
        body: "High-efficiency replacements sized to the home, plus light-commercial and multi-building service for HOAs, assisted living, restaurants and offices.",
      },
      {
        title: "Indoor air quality",
        body: "Humidity control, condensate and drain treatment, duct sealing and filtration — because in this climate the real air quality problem is moisture, not dust.",
      },
    ],
    bullets: [
      "Licensed Florida mechanical contractor — CMC1251768",
      "Repair on all major brands, in and out of warranty",
      "Duct cleaning & sealing and energy-efficient upgrades",
      "Flat-rate pricing quoted in writing before work begins",
      "$89 Clean & Tune, a 10-point service twice a year",
    ],
    hasOffer: true,
    faqs: [
      {
        q: "How often should I service my AC?",
        a: "Twice a year. Southwest Florida's humidity and near-year-round cooling put more strain on systems than cooler climates, so maintenance matters more here. March and October — either side of the heat — are the two best months to book it.",
      },
      {
        q: "Do I need a permit to replace my AC system?",
        a: "Yes. Florida building code requires a permit for HVAC system replacement, and we handle permitting as part of every replacement we install.",
      },
      {
        q: "How long do AC systems last here?",
        a: "Most residential systems last 10–15 years given near-constant summer runtime. Coastal and canal-front homes often land at the lower end because salt air accelerates coil corrosion.",
      },
    ],
  },
  // ---------------------------------------------------------- commercial
  {
    slug: "commercial",
    featured: true,
    name: "Commercial Services",
    short: "Commercial",
    seoShort: "Commercial",
    menuLine: "Roofing, HVAC & build-outs for business",
    blurb:
      "Commercial roofing, HVAC and build-outs for businesses, HOAs and property managers — one company, scheduled around your hours.",
    intro:
      "For a business, a roof leak or a cooling failure is lost revenue, not just an inconvenience. Our commercial side brings the same three licensed trades to properties that have to stay open — retail, restaurants, offices, HOAs and assisted living — with scheduled work, documentation boards and insurers actually need, and one point of contact across the whole building.",
    icon: "building",
    accent: "slate",
    // Commercial work runs under the existing trade licences — roofing (CCC)
    // and mechanical (CMC) cover commercial roofs and equipment, and
    // tenant/build-out work runs under the residential/light-commercial
    // contractor licence. ⚠️ CONFIRM — ground-up commercial construction in
    // Florida generally requires a General (CGC) or Building (CBC) Contractor
    // licence; confirm the company holds the right licence before advertising
    // new commercial building (as opposed to roofing, HVAC and build-outs).
    licence: { label: "Roofing Contractor", number: "CCC1336116" },
    capHeading: "The whole building, kept running",
    capLead:
      "Commercial work is not residential work at a larger scale — a restaurant needs something different from an HOA board. We bring roofing, mechanical and build-out trades to each under one schedule, so the property has one company to call rather than three to coordinate.",
    capabilities: [
      {
        title: "Commercial roofing",
        body: "Flat and low-slope systems — TPO, modified bitumen and coatings — plus metal and re-roofs, with the inspections and documentation a commercial roof needs for its warranty and the board's reserves.",
      },
      {
        title: "Commercial & rooftop HVAC",
        body: "Rooftop units, multi-zone systems and scheduled maintenance for light-commercial and multi-building properties, worked around the hours you keep.",
      },
      {
        title: "Tenant improvements & build-outs",
        body: "Fit-outs and remodels for retail, office and restaurant spaces — one contractor coordinating the trades so the space opens on schedule.",
      },
      {
        title: "HOA & property-manager programs",
        body: "One service schedule across a whole community, with condition reporting for budgets, reserve studies and insurance on request.",
      },
      {
        title: "Assisted living & senior housing",
        body: "Facilities where a roof or cooling failure is a resident-safety problem: priority response, planned maintenance around occupied hours, and temporary measures while parts ship.",
      },
      {
        title: "Maintenance agreements",
        body: "Roof and HVAC on one preventive schedule, so small problems are found on a planned visit instead of during the storm or the heat wave.",
      },
    ],
    bullets: [
      "Commercial roofing, HVAC and build-outs under one company",
      "Scheduled around your opening hours",
      "Documentation for boards, reserves and insurers",
      "HOA, assisted living, retail, restaurant and office",
    ],
    faqs: [
      {
        q: "Do you work with HOAs and property managers?",
        a: "Yes. We handle multi-building properties on one schedule and provide the condition reporting boards and managers need for budgeting, reserve studies and insurance.",
      },
      {
        q: "Can you service us outside business hours?",
        a: "Yes. For retail, restaurants, offices and medical spaces we schedule around your opening hours wherever the work allows, and we keep priority response for occupied facilities.",
      },
      {
        q: "What commercial work do you take on?",
        a: "Commercial roofing, commercial and rooftop HVAC, tenant improvements and build-outs, and ongoing maintenance for existing buildings. For ground-up commercial construction, talk to us about the scope and we will tell you honestly what we are the right fit for.",
      },
    ],
  },
];

export const serviceBySlug = (slug: string) =>
  services.find((s) => s.slug === slug);

// ----------------------------------------------------------- google reviews

/**
 * Google Business Profile.
 *
 * `rating` and `count` are deliberately left unset. While they are undefined
 * the site shows a neutral "Reviews on Google" link and emits **no**
 * `aggregateRating` in its structured data — inventing a star rating is a
 * Google policy violation and a manual-action risk.
 *
 * ⚠️ CONFIRM — once the contracting profile is live, set `reviewUrl` to the
 * profile's own review link and fill in `rating` and `count` from it. Stars,
 * the count and the `aggregateRating` markup all switch on together, here.
 */
export const googleReviews: {
  profileUrl: string;
  reviewUrl: string;
  rating?: number;
  count?: number;
} = {
  profileUrl: business.social.google,
  reviewUrl: business.social.google,
};

/** True only when the client has supplied real, verifiable review figures. */
export const hasReviewData = (): boolean =>
  typeof googleReviews.rating === "number" &&
  typeof googleReviews.count === "number" &&
  googleReviews.count > 0;

// ------------------------------------------------------------ featured offer

/** The company's published maintenance offer, verbatim from coastswfl.com.
 *  It belongs to the HVAC division; the other divisions close on a free
 *  estimate (see `estimate` below). */
export const cleanAndTune = {
  name: "AC Clean & Tune",
  price: "$89",
  /**
   * ⚠️ CONFIRM — the standard price this promotion discounts from. The site
   * derives a struck-through price and a "save $X" figure from this.
   * Advertising a saving against a price the business never charged is false
   * advertising, so this must be the real standard rate. Set it to `undefined`
   * and the sale framing disappears, leaving a plain $89 offer.
   */
  regularPrice: "$189" as string | undefined,
  unit: "per visit",
  summary:
    "A 10-point maintenance service that keeps your system efficient, catches failures early and protects your manufacturer warranty.",
  checklist: [
    "Verify thermostat operation",
    "Replace air filter (customer-supplied)",
    "Vacuum and flush condensate drain line, refill P-trap",
    "Chemically treat the condensate drain pan",
    "Verify capacitor microfarad (MFD) readings",
    "Clean evaporator coil with antimicrobial cleaner",
    "Clean condenser coil and cabinet",
    "Measure electrical amp draws and refrigerant pressures",
    "Verify heater operation (with approval)",
    "Inspect system condition and provide recommendations",
  ],
} as const;

/**
 * The company-wide offer. Roofing and contracting work is quoted, not priced
 * off a shelf, so the honest promotion is a free, no-obligation estimate
 * rather than a coupon. ⚠️ CONFIRM the exact wording with the client.
 */
export const estimate = {
  eyebrow: "No cost, no obligation",
  name: "Free project estimate",
  summary:
    "An inspection, a written scope and a flat price before you commit to anything — whether it's a roof, a remodel or a system replacement.",
  points: [
    "On-site inspection by a licensed contractor",
    "A written scope of work, in plain language",
    "A flat price — not a running hourly tab",
    "No obligation and no high-pressure sales call",
  ],
} as const;

// ----------------------------------------------------------------- locations

export type SaltExposure = "canal" | "gulf" | "inland";

export interface Location {
  slug: string;
  city: string;
  county: string;
  /** County office that issues building permits — differs per county. */
  permitAuthority: string;
  /** Approximate city-centre coordinates, used for LocalBusiness geo markup. */
  lat: number;
  lng: number;
  zips: string[];
  /** Priority markets — surfaced first on the coverage map. */
  focus?: boolean;
  /** Genuinely local context, drawn from the company's own city pages. */
  intro: string;
  neighborhoods: string[];
  /** Real conditions that change how a roof or a system is specified here. */
  conditions: {
    salt: SaltExposure;
    /** One line on the local housing stock. */
    housing: string;
    /** Significant share of seasonally occupied homes. */
    seasonal: boolean;
    /** Took direct damage in the 2022 Hurricane Ian landfall. */
    stormImpact: boolean;
  };
}

export const locations: Location[] = [
  {
    slug: "fort-myers",
    city: "Fort Myers",
    county: "Lee County",
    permitAuthority: "Lee County Department of Community Development",
    lat: 26.6406,
    lng: -81.8723,
    zips: ["33901", "33905", "33907", "33908", "33912", "33913", "33916", "33919", "33966"],
    intro:
      "Fort Myers housing runs from historic homes in the Downtown River District to newer construction south of Daniels Parkway, and the two need very different things from a roof and a remodel. Older neighborhoods often have original roofs, ductwork and undersized electrical that change what any project actually requires.",
    neighborhoods: [
      "Downtown River District",
      "McGregor",
      "College Park",
      "Iona",
      "South Fort Myers",
      "Whiskey Creek",
      "Fort Myers Beach",
      "Centennial Park",
    ],
    conditions: {
      salt: "gulf",
      housing:
        "a wide split between pre-1970 block homes downtown and post-2000 construction south of Daniels Parkway",
      seasonal: false,
      stormImpact: true,
    },
  },
  {
    slug: "cape-coral",
    city: "Cape Coral",
    county: "Lee County",
    permitAuthority: "City of Cape Coral Building Division",
    lat: 26.5629,
    lng: -81.9495,
    zips: ["33904", "33909", "33914", "33990", "33991", "33993"],
    intro:
      "With more canal miles than any city in the world, Cape Coral's waterfront homes face humidity and salt exposure inland Florida homes simply don't. Canal-front salt air shortens roof and condenser life alike, and many homeowners moved to metal roofs and hurricane-rated mounts after Ian.",
    neighborhoods: [
      "Pelican",
      "Yacht Club",
      "Southwest Cape Coral",
      "Trafalgar",
      "Burnt Store",
      "Cape Harbour",
    ],
    conditions: {
      salt: "canal",
      housing:
        "overwhelmingly single-family homes on canal lots, close to brackish water",
      seasonal: false,
      stormImpact: true,
    },
  },
  {
    slug: "naples",
    focus: true,
    city: "Naples",
    county: "Collier County",
    permitAuthority: "Collier County Growth Management Department",
    lat: 26.142,
    lng: -81.7948,
    zips: ["34102", "34103", "34104", "34105", "34112", "34113"],
    intro:
      "Licensed, insured roofing, contracting and HVAC for Naples homes and businesses — from Old Naples and Port Royal to East Naples and Golden Gate. A great many Naples homes also sit empty for months, and an unoccupied house in storm season is where roof and humidity damage starts unnoticed.",
    neighborhoods: [
      "Old Naples",
      "Port Royal",
      "Coquina Sands",
      "Aqualane Shores",
      "Golden Gate",
      "East Naples",
    ],
    conditions: {
      salt: "gulf",
      housing:
        "high-value coastal homes, many of them closed up for months at a time",
      seasonal: true,
      stormImpact: false,
    },
  },
  {
    slug: "north-naples",
    city: "North Naples",
    county: "Collier County",
    permitAuthority: "Collier County Growth Management Department",
    lat: 26.2637,
    lng: -81.8009,
    zips: ["34108", "34109", "34110", "34119"],
    intro:
      "North Naples' mix of beachfront condos along Vanderbilt Beach, established communities like Pelican Bay and Pelican Marsh, and the Mercato retail corridor all place heavy demand on roofs and air conditioning alike. Salt air off Wiggins Pass and Barefoot Beach adds corrosion on top of that load.",
    neighborhoods: [
      "Pelican Bay",
      "Vanderbilt Beach",
      "Naples Park",
      "Pelican Marsh",
      "Tarpon Cove",
      "Wiggins Bay",
    ],
    conditions: {
      salt: "gulf",
      housing:
        "a mix of beachfront high-rise condos and established gated communities",
      seasonal: true,
      stormImpact: false,
    },
  },
  {
    slug: "bonita-springs",
    focus: true,
    city: "Bonita Springs",
    county: "Lee County",
    permitAuthority: "City of Bonita Springs Building Department",
    lat: 26.3398,
    lng: -81.7787,
    zips: ["34134", "34135"],
    intro:
      "Licensed, insured roofing, contracting and HVAC for Bonita Springs homes and businesses — from Barefoot Beach to Downtown Bonita Springs and Bonita Beach. Gulf-front wind and humidity are hard on roofs and condensate lines alike.",
    neighborhoods: [
      "Downtown Bonita Springs",
      "Bonita Beach",
      "Spring Creek",
      "Bonita Farms",
      "Village Walk",
      "Worthington",
    ],
    conditions: {
      salt: "gulf",
      housing:
        "gulf-front homes and inland golf communities within a few miles of each other",
      seasonal: true,
      stormImpact: false,
    },
  },
  {
    slug: "estero",
    focus: true,
    city: "Estero",
    county: "Lee County",
    permitAuthority: "Village of Estero Building Department",
    lat: 26.4381,
    lng: -81.8068,
    zips: ["33928", "33967"],
    intro:
      "Estero's rapid growth around Coconut Point and Miromar Outlets has brought established communities like The Brooks and Grandezza alongside newer construction in Corkscrew Shores and Copperleaf. Newer builds bring newer roofs and equipment, which makes warranty-correct work worth doing properly.",
    neighborhoods: [
      "The Brooks",
      "Grandezza",
      "Breckenridge",
      "Copperleaf",
      "Corkscrew Shores",
      "Downtown Estero",
    ],
    conditions: {
      salt: "inland",
      housing:
        "predominantly post-2000 construction, much of it still inside the manufacturer warranty window",
      seasonal: false,
      stormImpact: false,
    },
  },
  {
    slug: "punta-gorda",
    city: "Punta Gorda",
    county: "Charlotte County",
    permitAuthority: "Charlotte County Community Development",
    lat: 26.8979,
    lng: -82.0454,
    zips: ["33950", "33955", "33982", "33983"],
    intro:
      "Punta Gorda's waterfront homes along Charlotte Harbor and the historic homes near Gilchrist Park rely on Coast to Coast for roofing, repairs and HVAC. The storm seasons since Charley and Ian have left a lot of roofs and systems running on patched work rather than replacements.",
    neighborhoods: [
      "Historic Downtown Punta Gorda",
      "Punta Gorda Isles",
      "Burnt Store Isles",
      "Punta Gorda Heights",
      "Trabue Woods",
    ],
    conditions: {
      salt: "canal",
      housing:
        "harbour-front and canal homes alongside a historic downtown core",
      seasonal: false,
      stormImpact: true,
    },
  },
  {
    slug: "port-charlotte",
    city: "Port Charlotte",
    county: "Charlotte County",
    permitAuthority: "Charlotte County Community Development",
    lat: 26.9762,
    lng: -82.0906,
    zips: ["33948", "33952", "33953", "33954", "33980", "33981"],
    intro:
      "Port Charlotte's canal-front homes near the Beach Park, the growing Deep Creek area, and neighborhoods throughout South Port Charlotte all trust Coast to Coast for roofing, contracting and HVAC. The housing stock skews older, so original roofs and air handlers are a common find here.",
    neighborhoods: [
      "South Port Charlotte",
      "Port Charlotte West",
      "El Jobean",
      "Deep Creek",
      "Harbor Heights",
    ],
    conditions: {
      salt: "canal",
      housing:
        "an older housing stock where original roofs, air handlers and undersized electrical service are common",
      seasonal: false,
      stormImpact: true,
    },
  },
  {
    slug: "venice",
    city: "Venice",
    county: "Sarasota County",
    permitAuthority: "City of Venice Building Department",
    lat: 27.0998,
    lng: -82.4543,
    zips: ["34285", "34292", "34293"],
    intro:
      "Venice runs from the island itself — where Gulf-front condos and mid-century block homes sit a few hundred feet from open water — inland through Venice Gardens and South Venice to the newer construction out toward Wellen Park. The island and the inland neighborhoods are effectively two different jobs, and a roof that lasts twenty years east of the Trail will not last that long west of it.",
    neighborhoods: [
      "Venice Island",
      "Venice Gardens",
      "South Venice",
      "Jacaranda",
      "Plantation",
      "Laurel",
    ],
    conditions: {
      salt: "gulf",
      housing:
        "a large share of 1970s and 1980s construction alongside newer inland development",
      seasonal: true,
      stormImpact: false,
    },
  },
];

/** Great-circle distance in statute miles. */
export function milesBetween(
  aLat: number, aLng: number, bLat: number, bLng: number,
) {
  const R = 3958.8;
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(bLat - aLat);
  const dLng = rad(bLng - aLng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(aLat)) * Math.cos(rad(bLat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** Straight-line distance from the shop to a city, to the nearest mile. */
export const milesFromShop = (loc: { lat: number; lng: number }) =>
  Math.round(milesBetween(business.lat, business.lng, loc.lat, loc.lng));

/**
 * Service radius, rounded up from the farthest city we actually list rather
 * than written down, so it cannot drift when a city is added.
 */
export const serviceRadiusMiles =
  Math.ceil(Math.max(...locations.map(milesFromShop)) / 5) * 5 + 5;

export const locationBySlug = (slug: string) =>
  locations.find((l) => l.slug === slug);

/** Every county we hold work in, in the order the cities are listed. */
export const counties = [...new Set(locations.map((l) => l.county))];

/**
 * "Lee, Collier, Charlotte and Sarasota" — derived rather than written out, so
 * adding a city in a new county cannot leave a stale list somewhere.
 */
export const countyList = (() => {
  const names = counties.map((c) => c.replace(/ County$/, ""));
  return names.length < 2
    ? names.join("")
    : `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
})();

// --------------------------------------------------------------------- proof

/** `tag` is the same claim as `body`, compressed to a spec-sheet value. */
export const whyUs = [
  {
    title: "Three licences, one company",
    tag: "Roofing · Build · HVAC",
    body: "Roofing, residential contracting and mechanical licences under one roof — never subcontracted out and back.",
  },
  {
    title: "Flat-rate pricing",
    tag: "In writing",
    body: "A written scope and price before work starts, and it does not move.",
  },
  {
    title: "Locally owned",
    tag: `${business.city} based`,
    body: "Fort Myers based. We answer our own phones, day and night.",
  },
  {
    title: "All of Southwest Florida",
    tag: `${locations.length} cities`,
    body: `${countyList} counties — Venice down through Naples.`,
  },
] as const;

/**
 * ⚠️ CONFIRM — these are drafted placeholders spanning the three divisions.
 * Replace with real, attributable Google reviews before launch.
 *
 * No `rating` on any of these, and the cards only draw stars when one is
 * present — a five-star row under a quote is a rating we do not have. The
 * Google profile link is the honest proof until real reviews are supplied.
 */
export const testimonials: {
  quote: string;
  name: string;
  city: string;
  /** 1-5, only when it comes from the customer's actual review. */
  rating?: number;
}[] = [
  {
    quote:
      "They re-roofed the whole house after Ian and handled the insurance paperwork start to finish. The crew was clean, fast, and the inspector passed it first time.",
    name: "James T.",
    city: "Fort Myers, FL",
  },
  {
    quote:
      "We used them for a kitchen remodel and then had them back for a new AC. One company, one number to call, and the price didn't move. Exactly what you want.",
    name: "Maria S.",
    city: "Naples, FL",
  },
  {
    quote:
      "Called about a roof leak and had someone out the same day. They found the actual cause, fixed it, and didn't try to sell me a whole new roof. Rare these days.",
    name: "Linda K.",
    city: "Cape Coral, FL",
  },
];

export const process = [
  {
    title: "Tell us what you need",
    body: "Two minutes on the phone or the form. Roof, remodel or AC — we ask what the job is, not for your life story.",
    image: "step-1-call",
  },
  {
    title: "We inspect and price it",
    body: "A licensed contractor inspects the work and gives you a flat price in writing before anything begins.",
    image: "step-2-quote",
  },
  {
    title: "The work gets done right",
    body: "Permits pulled, trades coordinated, and we leave the site cleaner than we found it.",
    image: "step-3-work",
  },
  {
    title: "We follow up",
    body: "A check-in after the work, and the paperwork that protects the value of what we built.",
    image: "step-4-followup",
  },
] as const;

export const guarantees = [
  `Licensed and insured — FL ${business.licenses.map((l) => l.number).join(", ")}`,
  "Flat-rate pricing quoted in writing before work begins",
  "Permits pulled and inspections scheduled on every project",
  "Locally owned and operated out of Fort Myers",
] as const;

// ---------------------------------------------------------------- financing

/** ⚠️ CONFIRM every line below with the client before launch. */
export const financing = {
  intro:
    "A new roof or a system replacement is rarely something you plan for. Financing options are available on approved credit so storm damage or a failed system doesn't have to become a five-figure decision made in a single afternoon.",
  points: [
    {
      title: "Apply in minutes",
      body: "A short application with a decision in most cases the same day, so you know your options before you choose materials.",
    },
    {
      title: "Monthly payments that fit",
      body: "Terms chosen around your budget rather than around the invoice, with no prepayment penalty.",
    },
    {
      title: "Ask about current promotions",
      body: "Manufacturer rebates and seasonal promotions change through the year. Call and we will tell you what's available right now.",
    },
  ],
} as const;

// ------------------------------------------------------------------ season

/**
 * Cooling load through the year in Southwest Florida — context for the HVAC
 * division. Used by any readout that reads the visitor's current month: real
 * context computed from the date, not a fabricated live sensor reading.
 */
export const season: Record<
  string,
  { label: string; load: "Low" | "Moderate" | "High" | "Peak"; note: string }
> = {
  Jan: { label: "Dry season", load: "Low", note: "Heat runs a handful of nights" },
  Feb: { label: "Dry season", load: "Low", note: "Seasonal homes occupied" },
  Mar: { label: "Pre-season", load: "Moderate", note: "Best month to service before the heat" },
  Apr: { label: "Season opens", load: "Moderate", note: "Cooling load climbing" },
  May: { label: "Building", load: "High", note: "Systems running most of the day" },
  Jun: { label: "Storm season", load: "Peak", note: "Peak load and afternoon storms" },
  Jul: { label: "Peak summer", load: "Peak", note: "Near-continuous runtime" },
  Aug: { label: "Peak summer", load: "Peak", note: "Hardest month on equipment" },
  Sep: { label: "Storm season", load: "High", note: "Humidity still at its heaviest" },
  Oct: { label: "Post-season", load: "Moderate", note: "Best month to service after the heat" },
  Nov: { label: "Cooling off", load: "Low", note: "Seasonal homes reopening" },
  Dec: { label: "Dry season", load: "Low", note: "Heating checks worth doing" },
};

/**
 * The two shoulder months, read off `season` rather than written down twice.
 * The honest answer to "when should I book the tune-up?".
 */
export const bestServiceMonths = (() => {
  const full: Record<string, string> = {
    Jan: "January", Feb: "February", Mar: "March", Apr: "April",
    May: "May", Jun: "June", Jul: "July", Aug: "August",
    Sep: "September", Oct: "October", Nov: "November", Dec: "December",
  };
  return Object.entries(season)
    .filter(([, v]) => v.note.startsWith("Best month to service"))
    .map(([k]) => full[k]);
})();

// --------------------------------------------------------------------- faqs

/**
 * Grouped, because a flat list of eight is a list and a grouped one is an
 * index. `group` is only used for presentation — the JSON-LD FAQPage and the
 * support bot both read q/a and ignore it.
 *
 * Every answer restates something the site already asserts elsewhere: the
 * three licences, the free estimate, the published Clean & Tune price, the
 * flat price in writing, permits on every project, and the 24/7 line.
 */
export const generalFaqs = [
  {
    group: "Coverage & credentials",
    q: "What do you do?",
    a: "Three things, under one licensed company: roofing, general contracting and HVAC. A storm job that spans the roof, the interior and the AC can be handled by one accountable contractor instead of three you coordinate yourself.",
  },
  {
    group: "Coverage & credentials",
    q: "Are you licensed and insured?",
    a: `Yes. Coast to Coast holds three Florida licences — ${business.licenses
      .map((l) => `${l.label} ${l.number}`)
      .join(", ")} — and carries liability and workers' compensation coverage. Certificates are available on request.`,
  },
  {
    group: "Coverage & credentials",
    q: "What areas do you serve?",
    a: `All of ${region} — ${countyList} counties, including ${locations
      .map((l) => l.city)
      .slice(0, 4)
      .join(", ")} and everywhere between.`,
  },
  {
    group: "What it costs",
    q: "Do you charge for an estimate?",
    a: "No. Roofing, remodels and system replacements all start with a free, no-obligation estimate: an inspection, a written scope and a flat price before you commit to anything.",
  },
  {
    group: "What it costs",
    q: "How will I know the price before you start?",
    a: "A licensed contractor inspects the work and puts a flat price in writing before anything begins. It does not move because the job ran long, and any change in scope is agreed in writing.",
  },
  {
    group: "What it costs",
    q: "Do you offer financing?",
    a: "Yes, on roofs, system replacements and larger projects, with decisions in most cases the same day and no prepayment penalty. Call us and we'll walk through the options.",
  },
  {
    group: "The work",
    q: "Do you handle permits and insurance claims?",
    a: "Yes. Permits are pulled and inspections scheduled as part of every project, and for storm damage we document the work and provide the scope your insurance adjuster needs.",
  },
  {
    group: "The work",
    q: "How quickly can someone get out to me?",
    a: `Same-day appointments across ${region} in most cases, and the line is answered by a person around the clock — ${business.emergency.toLowerCase()} is not an answering machine taking a message until Monday.`,
  },
] as const;

// -------------------------------------------------------------------- stats

/** Verifiable facts only — nothing here is an unbacked claim. */
export const stats = [
  { value: `${services.length}`, label: "Service divisions under one company" },
  { value: `${business.licenses.length}`, label: "Florida contractor licenses held" },
  { value: `${locations.length}`, label: "Southwest Florida cities served" },
  { value: "24/7", label: "Emergency service availability" },
] as const;
