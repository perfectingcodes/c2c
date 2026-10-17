import { Link } from "wouter";
import { MapPin } from "lucide-react";
import { business, countyList, locations, region, services } from "@/content/site";
import { saltNote } from "@/content/local";
import { SiteLayout } from "@/components/layout/site-layout";
import { AnswerBlock, FactTable } from "@/components/answer";
import { CtaBand } from "@/components/cta-band";
import { Seo, breadcrumbNode, faqNode } from "@/lib/seo";

/**
 * Service-area page, grouped by county. The county grouping is the point:
 * permitting and inspection follow county lines, so the office that signs off
 * your roof or your AC replacement depends on which county you are in.
 *
 * This is a single coverage page — the home base no longer carries a page per
 * city — so the city cards describe the area rather than linking onward.
 */
export default function LocationsIndex() {
  const path = "/locations";
  const counties = [...new Set(locations.map((l) => l.county))];
  const answer = `${business.name} serves ${locations.length} cities across ${countyList} counties — ${locations
    .map((l) => l.city)
    .join(", ")}. Roofing, general contracting and HVAC, with the same licensed crew, flat-rate pricing and a 24/7 line at ${business.phone} in every one of them.`;

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Service Areas", path },
  ];

  return (
    <>
      <Seo
        title={`Service Areas in ${region} | ${business.name}`}
        description={`${business.name} covers ${locations
          .map((l) => l.city)
          .join(", ")} across ${countyList} counties — roofing, contracting and HVAC. Licensed, insured, 24/7 emergency service.`}
        path={path}
        nodes={[
          faqNode(
            path,
            locations.map((l) => ({
              q: `Do you serve ${l.city}, ${business.state}?`,
              a: `Yes. We cover ${l.city} in ${l.county}, including ${l.neighborhoods.slice(0, 3).join(", ")} and ZIP codes ${l.zips.join(", ")}. Permits in ${l.city} are issued by ${l.permitAuthority}.`,
            })),
          ),
          breadcrumbNode(path, crumbs),
        ]}
      />

      <SiteLayout
        eyebrow="Service areas"
        title="Coast to coast, county to county"
        lead={`Trucks run daily through ${countyList} counties. If you are near any of these, you are in range.`}
        crumbs={crumbs}
      >
        <section className="shell py-14 md:py-16">
          <AnswerBlock className="max-w-4xl">{answer}</AnswerBlock>
        </section>

        {counties.map((county, ci) => {
          const cities = locations.filter((l) => l.county === county);
          return (
            <section
              key={county}
              className={ci % 2 === 1 ? "bg-foam py-12 md:py-16" : "bg-white py-12 md:py-16"}
            >
              <div className="shell">
                <div className="flex flex-wrap items-baseline justify-between gap-3 border-b-2 border-blue/15 pb-4">
                  <h2 className="text-2xl md:text-3xl">{county}</h2>
                  <p className="font-display text-xs font-bold uppercase tracking-[0.16em] text-blue">
                    {cities.length} {cities.length === 1 ? "city" : "cities"} ·{" "}
                    {cities.reduce((n, c) => n + c.zips.length, 0)} ZIP codes
                  </p>
                </div>

                <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {cities.map((l) => (
                    <div key={l.slug} className="card flex h-full flex-col p-6">
                      <span className="inline-flex items-center gap-2 font-display text-sm font-bold text-blue">
                        <MapPin className="size-4" aria-hidden="true" />
                        {l.city}, {business.state}
                      </span>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-navy/70">
                        {l.intro.split(". ")[0]}.
                      </p>
                      <dl className="mt-4 space-y-1 border-t border-navy/8 pt-3 text-xs text-navy/55">
                        <div className="flex gap-2">
                          <dt className="font-bold">ZIPs</dt>
                          <dd>{l.zips.slice(0, 4).join(", ")}</dd>
                        </div>
                        <div className="flex gap-2">
                          <dt className="font-bold">Conditions</dt>
                          <dd>{saltNote(l).short}</dd>
                        </div>
                      </dl>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        <section className="shell py-14 md:py-18">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <h2 className="text-2xl md:text-3xl">Coverage at a glance</h2>
              <p className="mt-4 leading-relaxed text-navy/70">
                Permitting and inspection follow county lines — the table lists
                the office that issues the permit where you live. Every division
                below is available in all {locations.length} cities.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="inline-flex rounded-full px-4 py-2 text-sm font-semibold text-navy/80 ring-1 ring-navy/15 transition-colors hover:bg-blue/5 hover:text-blue"
                    >
                      {s.short}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <FactTable
              caption="Permitting authority by city"
              rows={locations.map((l) => ({
                label: l.city,
                value: l.permitAuthority,
              }))}
            />
          </div>
        </section>

        <CtaBand />
      </SiteLayout>
    </>
  );
}
