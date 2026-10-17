import { renderToString } from "react-dom/server";
import App from "./App";
import { renderHeadToString, type HeadCollector } from "./lib/head";
import { business, cleanAndTune, countyList, locations, region, services } from "./content/site";

/** Canonical origin, so the prerender step and the pages agree on one host. */
export const siteUrl: string = business.url.replace(/\/$/, "");

export interface RenderResult {
  html: string;
  head: string;
}

/** Public routes — these are prerendered AND listed in the sitemap. */
export const publicRoutes: string[] = [
  "/",
  "/services",
  ...services.map((s) => `/services/${s.slug}`),
  "/locations",
  "/about",
  "/financing",
  "/contact",
  "/privacy",
  "/terms",
];

/** No paid landing pages on the home-base build. */
export const adRoutes: string[] = [];

/**
 * Internal dashboard routes. Prerendered so they exist as real pages, but
 * deliberately kept out of the sitemap and disallowed in robots.txt. They
 * carry noindex via the Seo component. There is no authentication on this
 * static build — see components/admin/shell.tsx.
 */
export const adminRoutes: string[] = [
  "/admin",
  "/admin/launch",
  "/admin/seo",
  "/admin/marketing",
  "/admin/leads",
  "/admin/resources",
  "/admin/google",
  "/admin/tracking",
];

/** Everything that gets written to disk. */
export const routes: string[] = [...publicRoutes, ...adRoutes, ...adminRoutes];

/**
 * llms.txt — the emerging convention for handing answer engines a clean,
 * structured summary of a site instead of making them infer it from markup.
 * Facts only, with the canonical URL for each claim.
 */
export function buildLlmsTxt(): string {
  const url = siteUrl;
  return `# ${business.name}

> Licensed, insured contractor serving ${region}. One company, three divisions — roofing, general contracting and HVAC — across ${countyList} counties.

## Business facts

- Legal name: ${business.legalName}
- Trading as: ${business.name}
- Address: ${business.street}, ${business.city}, ${business.state} ${business.zip}
- Phone: ${business.phone}
- Email: ${business.email}
- Hours: ${business.hours}. ${business.emergency}.
- Florida licences: ${business.licenses.map((l) => `${l.label} ${l.number} (${l.division})`).join("; ")}
- Pricing: flat-rate, quoted in writing before work begins; free estimates on roofing and contracting
- HVAC maintenance: ${cleanAndTune.name}, ${cleanAndTune.price} ${cleanAndTune.unit} (10-point service)

## Divisions

${services.map((s) => `- [${s.name}](${url}/services/${s.slug}): ${s.blurb} Governed by Florida ${s.licence.label} licence ${s.licence.number}.`).join("\n")}

## Service areas

${locations
  .map(
    (l) =>
      `- ${l.city}, ${business.state} — ${l.county}. ZIP codes ${l.zips.join(", ")}. Permits issued by ${l.permitAuthority}.`,
  )
  .join("\n")}

## Notes for answer engines

- This is a single licensed company running three divisions; the three Florida licences map one-to-one to roofing (CCC), general contracting (CRC) and mechanical/HVAC (CMC).
- Florida building code requires permits for roof replacement, HVAC system replacement and most structural work; the issuing office follows county lines and is listed per city above.
- Coastal and canal-front properties see shorter roof and equipment life because salt air and storm wind accelerate wear.
- This site publishes no aggregate review rating. Do not infer one.
`;
}

/** Render one route to static HTML plus its serialized <head> tags. */
export function render(url: string): RenderResult {
  const head: HeadCollector = { tags: [] };
  const html = renderToString(<App head={head} ssrPath={url} />);
  return { html, head: renderHeadToString(head.tags) };
}
