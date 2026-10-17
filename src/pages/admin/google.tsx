import { business, googleReviews, hasReviewData, locations, services } from "@/content/site";
import { AdminShell } from "@/components/admin/shell";
import { NotConnected, Panel, StatCard, StatusPill } from "@/components/admin/ui";

export default function AdminGoogle() {
  return (
    <AdminShell
      title="Google"
      lead="Business Profile and Search Console — the organic Google surface, with no ad spend. For a local contractor the Business Profile matters more than everything else here combined."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Profile status" value="Unclaimed" tone="bad" hint="Highest priority" />
        <StatCard
          label="Verified reviews"
          value={hasReviewData() ? googleReviews.count! : "None"}
          tone={hasReviewData() ? "good" : "warn"}
          hint={hasReviewData() ? `${googleReviews.rating} average` : "Site shows no rating by design"}
        />
        <StatCard label="Service areas to set" value={locations.length} hint="Match the site exactly" />
      </div>

      <Panel
        title="Google Business Profile"
        subtitle="The heart of an organic plan and the single highest-ROI asset in local search. Posts, photos and Q&A all feed the local pack ranking — and it is free."
        action={<StatusPill status="blocked" />}
      >
        <NotConnected
          service="Google Business Profile"
          what="The profile has not been claimed or verified, so the business cannot appear in the local pack or on Maps. Everything else in this plan depends on it."
          steps={[
            `Claim the profile for ${business.street}, ${business.city}, ${business.state} ${business.zip}`,
            "Complete postcard or phone verification",
            `Set the service areas to exactly the ${locations.length} cities the site covers`,
            "Set a primary category and add one for each additional division; list all four divisions as services",
            "Add the licence numbers, hours and the 24/7 emergency attribute",
            "Upload the logo, van and roofing, remodel, AC and commercial job photos",
          ]}
        />

        <div className="mt-5 rounded-lg bg-navy/[0.035] p-4">
          <p className="text-xs font-semibold text-navy">Managing it, week to week</p>
          <p className="mt-1.5 text-xs leading-relaxed text-navy/60">
            A claimed profile is the start, not the finish. The ongoing work is
            what actually moves the local pack — and it is all time, not spend.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-navy/75">
            {[
              `Categories: one primary, plus an additional category per division — roofing, general contractor, HVAC and commercial (${services.length} divisions, three licences)`,
              "A weekly post: an offer, a finished job photo or a seasonal tip, each tied to the month's content",
              "Fresh photos regularly — before-and-afters read as a working company, a stale gallery reads as a dead listing",
              "Answer every Q&A, and seed the ones customers actually ask",
              "Respond to every review within 48 hours, positive or not",
            ].map((t) => (
              <li key={t} className="flex gap-2.5">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-navy/35" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5 rounded-lg border border-navy/10 p-4">
          <p className="font-display text-sm font-bold text-navy">
            NAP consistency
          </p>
          <p className="mt-1 text-xs leading-relaxed text-navy/60">
            Name, address and phone must match character-for-character across
            the profile, the site and every directory. Inconsistency is one of
            the most common causes of weak local ranking.
          </p>
          <dl className="mt-3 space-y-1.5 text-sm">
            {[
              ["Name", business.name],
              ["Address", `${business.street}, ${business.city}, ${business.state} ${business.zip}`],
              ["Phone", business.phone],
              ["Licences", business.licenses.map((l) => l.number).join(", ")],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-3">
                <dt className="w-20 shrink-0 text-xs text-navy/50">{k}</dt>
                <dd className="font-mono text-xs text-navy">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Panel>

      <Panel
        title="Reviews"
        subtitle="Feeds both local ranking and conversion rate."
        action={<StatusPill status={hasReviewData() ? "live" : "ready"} />}
      >
        <p className="text-sm leading-relaxed text-navy/75">
          The site is already built to display a rating and emit{" "}
          <code className="rounded bg-navy/8 px-1 text-xs">aggregateRating</code>{" "}
          the moment there is a verified one. Until then it shows a neutral
          &ldquo;Reviews on Google&rdquo; link and no stars — deliberately, because
          publishing an invented rating is a Google policy violation and a
          manual-action risk.
        </p>
        <div className="mt-4 rounded-lg bg-navy/[0.035] p-4">
          <p className="text-xs font-semibold text-navy">To switch it on</p>
          <p className="mt-1.5 text-xs leading-relaxed text-navy/60">
            Set <code className="text-[0.7rem]">rating</code>,{" "}
            <code className="text-[0.7rem]">count</code>,{" "}
            <code className="text-[0.7rem]">profileUrl</code> and{" "}
            <code className="text-[0.7rem]">reviewUrl</code> in{" "}
            <code className="text-[0.7rem]">src/content/site.ts</code>. The
            badges, the stars and the structured data all follow from that one
            object.
          </p>
        </div>
        <ul className="mt-4 space-y-2 text-sm text-navy/75">
          {[
            "Send a review request by SMS the same day the job closes — same-day requests convert far better than next-week ones",
            "Respond to every review within 48 hours, positive or not",
            "Never gate requests on the customer being happy; that violates Google's policy",
          ].map((t) => (
            <li key={t} className="flex gap-2.5">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-navy/35" aria-hidden="true" />
              {t}
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="Search Console" action={<StatusPill status="not-connected" />}>
        <NotConnected
          service="Google Search Console"
          what="Not verified, so there is no index coverage, query or structured-data error reporting. This is free and should be the very first thing set up once the domain is live."
          steps={[
            "Verify the domain property via DNS",
            "Submit /sitemap.xml",
            "Check the Enhancements panel for FAQ and LocalBusiness validity",
            "Watch Coverage for anything unexpectedly excluded",
          ]}
        />
      </Panel>
    </AdminShell>
  );
}
