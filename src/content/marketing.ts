/**
 * Marketing plan — first draft.
 *
 * This is an ORGANIC-ONLY plan. There is no ad spend: the three plays are
 * (a) Google Business Profile management, (b) SEO, and (c) GEO — earning
 * citations from answer engines (ChatGPT, Perplexity, Google AI Overviews),
 * which the site is already built for with llms.txt and linked structured
 * data. No Google Ads, Local Services Ads or Meta spend is proposed anywhere.
 *
 * Written from what the site already establishes: four licensed divisions
 * (roofing, general contracting, HVAC and commercial) under three Florida
 * contractor licences, nine cities across four counties, the free
 * no-obligation estimate that roofing and contracting close on, and the
 * published $89 Clean & Tune on the HVAC side.
 *
 * ⚠️ Every target below is a starting assumption for the client to confirm or
 * replace. Nothing here is drawn from their actual accounts or books.
 */
import { business, countyList, estimate, locations } from "./site";

export type Status = "live" | "ready" | "draft" | "blocked" | "not-connected";
export type Channel = "seo" | "geo" | "local" | "email" | "reviews";

export const planMeta = {
  version: "Draft 1",
  drafted: "September 2026",
  owner: "Arranges Marketing",
  note: "An organic-only plan: Google Business Profile, SEO and GEO (answer-engine citations), with owned email/SMS to the existing base. No paid media. Targets need the client's confirmation before anything is committed.",
} as const;

// -------------------------------------------------------------- objectives

export const objectives = [
  {
    title: "Win the local pack through the Business Profile",
    body: `The Google Business Profile is the single highest-ROI asset in local search, and it is free to run. Claimed and actively managed, it puts the business on the map and in the local pack across ${locations.length} cities — where ${estimate.name.toLowerCase()} is reached through the listing, not a paid click.`,
    metric: "Local pack presence",
    target: "Top 3 in 5 of 9 cities",
    horizon: "6 months",
    channel: "local" as Channel,
  },
  {
    title: "Rank organically across four divisions and nine cities",
    body: `The division pages and the coverage page are built and technically clean, so the work is authority and freshness, not more pages. Rank for roofing, remodel, AC and commercial intent across ${countyList} counties on earned position, not ad bids.`,
    metric: "Organic rankings",
    target: "Page 1 for core division + city terms",
    horizon: "6–12 months",
    channel: "seo" as Channel,
  },
  {
    title: "Be the source answer engines cite (GEO)",
    body: "The site already emits llms.txt and one linked structured-data graph per page, with a self-contained answer block on every substantial page. The play is being the cited source when ChatGPT, Perplexity and Google AI Overviews answer a Southwest Florida roofing, contracting, HVAC or commercial question.",
    metric: "Answer-engine citations",
    target: "Cited for core local queries",
    horizon: "Ongoing",
    channel: "geo" as Channel,
  },
  {
    title: "Build the Google review base",
    body: "Reviews feed both local ranking and conversion, and the site publishes no rating today because there is nothing verified to publish. Every completed job — roof, remodel, AC or commercial — should end with a review request.",
    metric: "Google reviews",
    target: "100 reviews at 4.7+",
    horizon: "12 months",
    channel: "reviews" as Channel,
  },
] as const;

// ---------------------------------------------------------------- channels

export const channels: {
  key: Channel;
  name: string;
  status: Status;
  role: string;
  budget: string;
  owner: string;
  actions: string[];
}[] = [
  {
    key: "seo",
    name: "Organic search & content",
    status: "live",
    role: "The long game, and the only channel that compounds. The site is a tight, clean set of pages — four divisions and one coverage page — so the work now is authority and freshness, not more pages.",
    budget: "Time, not spend",
    owner: "Arranges Marketing",
    actions: [
      "Publish one seasonal guide a month (hurricane roof prep, repair-vs-replace, planning a remodel, commercial maintenance)",
      "Build citations on the trade and local directories that matter in SWFL",
      "Earn links from the chamber, HOA newsletters and supplier pages",
      "Re-audit with pnpm audit:seo after every content change",
    ],
  },
  {
    key: "geo",
    name: "GEO / answer engines",
    status: "live",
    role: "Generative-engine optimization: being the source ChatGPT, Perplexity and Google AI Overviews quote. The technical foundation already ships; the ongoing work is earning the citations and keeping the facts answer-ready.",
    budget: "Time, not spend",
    owner: "Arranges Marketing",
    actions: [
      "Keep llms.txt and the structured-data graph in step with the content file",
      "Open every substantial page with a self-contained [data-answer] block",
      "Answer real homeowner questions in the FAQs, in plain language a model can lift",
      "Track which AI answers cite the site and which name a competitor instead",
    ],
  },
  {
    key: "local",
    name: "Google Business Profile",
    status: "blocked",
    role: "The single highest-ROI asset in local search and the heart of this plan. Posts, photos and Q&A all feed the local pack ranking, and it is what issues the review link everything else waits on.",
    budget: "Time, not spend",
    owner: "Client + Arranges",
    actions: [
      "Claim and verify the profile for the Fort Myers address",
      `Set service areas to match the ${locations.length} cities on the site`,
      "List all four divisions as services; set the right primary and additional categories",
      "Weekly post, regular job photos, and answers to every Q&A and review",
    ],
  },
  {
    key: "email",
    name: "Email & SMS to the customer base",
    status: "draft",
    role: "The cheapest revenue in the business, and fully owned — not ad spend. A past customer is far likelier to call for the next trade — a roof, then a remodel, then the AC — than a cold lead is to call at all.",
    budget: "Under $100 / mo",
    owner: "Arranges Marketing",
    actions: [
      "Roof Guard and Clean & Tune reminders on their due dates",
      "Pre-season nudges: roof check before storm season, tune-up in March and October",
      "Post-job review request, sent the same day",
      "Win-back for customers not seen in 18 months",
    ],
  },
  {
    key: "reviews",
    name: "Reviews & reputation",
    status: "ready",
    role: "Feeds both local ranking and conversion rate. The site is already built to display a rating the moment there is a verified one.",
    budget: "Time, not spend",
    owner: "Client + Arranges",
    actions: [
      "Same-day review request by SMS after every completed job",
      "Respond to every review, positive or not, within 48 hours",
      "Fill rating and count in content/site.ts once verified — stars and schema switch on together",
    ],
  },
];

// --------------------------------------------------------- seasonal cadence

/**
 * The combined demand curve across all four divisions in Southwest Florida.
 * HVAC peaks with the summer heat; roofing damage and insurance work spike
 * through hurricane season and the months after it; remodels and commercial
 * work run steadier, often timed around when seasonal homes and businesses
 * are quiet. The result is a business that is busy most of the year, with its
 * hardest stretch in late summer.
 *
 * `demand` is a relative 0-100 index, not call volume. It guides where the
 * month's organic effort — posts, content, outreach — is best aimed.
 */
export const seasonality = [
  { month: "Jan", demand: 45, focus: "Dry-season roofing, remodels underway" },
  { month: "Feb", demand: 50, focus: "Peak season — remodels and roof replacements" },
  { month: "Mar", demand: 60, focus: "Pre-summer Clean & Tune, dry-weather roofing" },
  { month: "Apr", demand: 65, focus: "Cooling season opens, roof and remodel schedules fill" },
  { month: "May", demand: 75, focus: "AC replacement quotes climb, roofs ahead of the rains" },
  { month: "Jun", demand: 90, focus: "Storm season opens — HVAC peak, roof storm prep" },
  { month: "Jul", demand: 95, focus: "Peak AC load, emergency first; roof repairs" },
  { month: "Aug", demand: 100, focus: "Peak heat and named-storm risk — roof and AC emergencies" },
  { month: "Sep", demand: 95, focus: "Hurricane peak — storm-damage roofing and insurance work" },
  { month: "Oct", demand: 80, focus: "Post-storm insurance claims, post-season Clean & Tune" },
  { month: "Nov", demand: 55, focus: "Dry season returns, seasonal homes reopening" },
  { month: "Dec", demand: 45, focus: "Remodels and roof replacements, heating checks" },
] as const;

// ------------------------------------------------------------- keyword plan

/**
 * ORGANIC SEO/GEO targets — the queries the division pages, the coverage page
 * and the Business Profile are written to rank and be cited for. These are not
 * ad bids; there is no paid search in this plan. Local "{city}" variants all
 * point at the one division page and the Business Profile, by design — there
 * are no per-city pages to split them across. `page` is always a real route.
 */
export const keywordTargets = [
  { term: "roof replacement {city} fl", intent: "Research", priority: "P0", page: "/services/roofing" },
  { term: "roof leak repair {city}", intent: "Emergency", priority: "P0", page: "/services/roofing" },
  { term: "storm damage roof repair {city}", intent: "Emergency", priority: "P0", page: "/services/roofing" },
  { term: "roof insurance claim florida", intent: "Research", priority: "P1", page: "/services/roofing" },
  { term: "general contractor {city} fl", intent: "Research", priority: "P0", page: "/services/contracting" },
  { term: "kitchen remodel {city}", intent: "Research", priority: "P1", page: "/services/contracting" },
  { term: "room addition contractor {city}", intent: "Research", priority: "P2", page: "/services/contracting" },
  { term: "ac repair {city} fl", intent: "Emergency", priority: "P0", page: "/services/hvac" },
  { term: "ac replacement cost {city}", intent: "Research", priority: "P1", page: "/services/hvac" },
  { term: "commercial roofing {city} fl", intent: "Commercial", priority: "P1", page: "/services/commercial" },
  { term: "commercial hvac {city}", intent: "Commercial", priority: "P2", page: "/services/commercial" },
  { term: "roofing contractor near me", intent: "Local", priority: "P0", page: "Google Business Profile" },
] as const;

// ----------------------------------------------------------------- tracking

/**
 * Organic measurement only. There is no ad-conversion tag or Meta Pixel here,
 * because there is no paid media to attribute — the stack measures where
 * organic traffic comes from and whether it turns into a call or a form.
 */
export const trackingStack: {
  name: string;
  purpose: string;
  status: Status;
  idLabel: string;
  note: string;
}[] = [
  {
    name: "Google Search Console",
    purpose: "Index coverage, the queries the site actually ranks for, structured-data health",
    status: "not-connected",
    idLabel: "Verified property",
    note: "Free, and the only true view of how Google sees the site. Verify and submit the sitemap as soon as the domain is live — this is the first thing to set up.",
  },
  {
    name: "Google Analytics 4",
    purpose: "Traffic, landing pages, organic sources and conversion paths",
    status: "not-connected",
    idLabel: "Measurement ID (G-XXXXXXX)",
    note: "Nothing is installed on the site yet. No visitor data is being collected.",
  },
  {
    name: "Call tracking",
    purpose: "Attribute phone calls, which are most of this business's leads",
    status: "not-connected",
    idLabel: "Tracking number pool",
    note: `The site publishes ${business.phone} everywhere. Use dynamic number insertion so the real number stays the NAP of record for local SEO.`,
  },
  {
    name: "Lead destination",
    purpose: "Where the quote form actually sends",
    status: "blocked",
    idLabel: "VITE_QUOTE_ENDPOINT",
    note: "Unset. The form currently falls back to opening a prefilled email, so leads are not dropped but are not tracked either.",
  },
];

// ----------------------------------------------------------- content plan

/**
 * One substantial organic piece a month, each tied to a seasonal play rather
 * than published in isolation. Every piece is SEO/GEO work — written to rank
 * and to be answer-ready — and feeds the Business Profile posts for the month.
 */
export const contentCalendar = [
  { month: "January", piece: "Planning a remodel in SWFL: timing it around season", channel: "seo" as Channel, ties: "Remodel demand, dry-season window" },
  { month: "February", piece: "What a free roof inspection actually tells you", channel: "geo" as Channel, ties: "Answer-engine FAQ on roof inspections" },
  { month: "March", piece: "Pre-summer AC checklist for SWFL homeowners", channel: "seo" as Channel, ties: "Clean & Tune pre-season push" },
  { month: "April", piece: "Repair or replace? Reading a 15-year-old roof", channel: "geo" as Channel, ties: "High-intent repair-vs-replace query" },
  { month: "May", piece: "When to repair and when to replace a 10–15 year AC", channel: "seo" as Channel, ties: "Replacement research season" },
  { month: "June", piece: "Hurricane prep: your roof, your condenser and your documents", channel: "local" as Channel, ties: "Storm-season Business Profile posts" },
  { month: "August", piece: "What to do when the roof leaks — or the AC quits — mid-storm", channel: "geo" as Channel, ties: "Emergency answer-engine citations" },
  { month: "September", piece: "Documenting storm damage for a Florida insurance claim", channel: "email" as Channel, ties: "Post-storm outreach to the base" },
] as const;

// --------------------------------------------------------------- launch plan

/**
 * The go-live schedule.
 *
 * The site is built and verified — a simpler build than the flagship — so the
 * whole launch is scheduled inside one week, front-loaded to go live on day
 * one. This is ready, owned work with real dates, not a wish list.
 *
 * ⚠️ Dates assume the DBA and the coasttocoastcontracting.com domain are in
 * hand. Confirm the host and the lead destination with the client; the
 * Business Profile is the one step whose verification can run past the week.
 */
export type LaunchState = "done" | "now" | "scheduled" | "waiting";

export const launchPlan: {
  goLive: string;
  window: string;
  note: string;
  dependency: string;
  milestones: {
    date: string; // ISO yyyy-mm-dd
    title: string;
    owner: string;
    state: LaunchState;
    depends?: string;
    tasks: string[];
  }[];
} = {
  goLive: "2026-10-17",
  window: "Oct 17–23, 2026",
  note: "A schedule of ready, planned work — every item is scoped and owned. The site goes live today and is fully instrumented by Friday.",
  dependency:
    "Assumes the DBA registration and the coasttocoastcontracting.com domain are in hand — go-live and DNS cutover wait on nothing else. The Business Profile is the one step whose verification (a mailed postcard or phone call from Google) can land after this week, so it is started on day one to start the clock early.",
  milestones: [
    {
      date: "2026-10-17",
      title: "Build complete & verified",
      owner: "Arranges Marketing",
      state: "done",
      tasks: [
        "Four division pages, coverage, about, financing, contact and legal — 12 public pages prerendered",
        "Full admin dashboard, linked structured data, sitemap, robots and llms.txt generated",
        "Typecheck clean and production build green",
      ],
    },
    {
      date: "2026-10-17",
      title: "Go live",
      owner: "Arranges Marketing",
      state: "now",
      depends: "DBA & domain",
      tasks: [
        "Deploy the build to the host and confirm every page renders over HTTPS",
        "Point the domain's DNS at the host; verify SSL and the www / non-www redirect",
        "Confirm sitemap.xml, robots.txt and llms.txt resolve on the live domain",
      ],
    },
    {
      date: "2026-10-17",
      title: "Search Console verified",
      owner: "Arranges Marketing",
      state: "now",
      tasks: [
        "Verify the domain property by DNS",
        "Submit the sitemap and request indexing on the home and four division pages",
        "Check the Enhancements panel for FAQ and LocalBusiness validity",
      ],
    },
    {
      date: "2026-10-18",
      title: "Analytics live & conversions defined",
      owner: "Arranges Marketing",
      state: "scheduled",
      tasks: [
        "Install GA4 and confirm pageviews arrive from the live site",
        "Define the conversions: phone taps, estimate requests, form submits, financing use",
        "Mark the division and contact pages as conversion steps",
      ],
    },
    {
      date: "2026-10-19",
      title: "Lead routing connected",
      owner: "Arranges Marketing + client",
      state: "scheduled",
      tasks: [
        "Point VITE_QUOTE_ENDPOINT at a real destination so every quote request is captured, not just emailed",
        "Route leads to the inbox or CRM the office actually watches, with an auto-acknowledge to the customer",
        "Submit a test lead end-to-end and confirm it lands",
      ],
    },
    {
      date: "2026-10-19",
      title: "Business Profile — claim & submit",
      owner: "Client + Arranges Marketing",
      state: "waiting",
      depends: "Google verification",
      tasks: [
        "Claim the profile for the Fort Myers address and request verification (may land after this week)",
        "Prepare the categories, the four divisions as services, the nine service-area cities and the licence numbers to publish on approval",
      ],
    },
    {
      date: "2026-10-20",
      title: "Call tracking & consent",
      owner: "Arranges Marketing",
      state: "scheduled",
      tasks: [
        "Add dynamic number insertion so the real number stays the NAP of record while calls are attributed",
        "Add the cookie / consent notice now that analytics collects data",
        "Update the privacy policy to name the tools, what they collect and how long it is kept",
      ],
    },
    {
      date: "2026-10-21",
      title: "Profile populated & first posts",
      owner: "Arranges Marketing",
      state: "waiting",
      depends: "Google verification",
      tasks: [
        "On verification: publish categories, services, areas, hours, licences and the 24/7 attribute",
        "Upload the logo plus roofing, remodel, AC and commercial job photos",
        "First weekly post, and seed the common Q&A",
      ],
    },
    {
      date: "2026-10-22",
      title: "Reviews & first content",
      owner: "Arranges Marketing",
      state: "scheduled",
      tasks: [
        "Stand up the same-day review-request SMS flow after every completed job",
        "Queue the first SEO / GEO content piece from the calendar",
        "Confirm llms.txt and the structured-data graph match the live content",
      ],
    },
    {
      date: "2026-10-23",
      title: "Verify, baseline & start the cadence",
      owner: "Arranges Marketing",
      state: "scheduled",
      tasks: [
        "Walk every conversion end-to-end on the live site and confirm each fires",
        "Baseline the GA4 and Search Console numbers as week-zero",
        "Begin the weekly loop: Search Console queries, Business Profile posts, new reviews",
      ],
    },
  ],
};
