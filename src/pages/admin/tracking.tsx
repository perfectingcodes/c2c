import { CheckCircle2, Target } from "lucide-react";
import { business } from "@/content/site";
import { trackingStack } from "@/content/marketing";
import { EVENT_LABELS, type EventKind } from "@/lib/leads";
import { AdminShell } from "@/components/admin/shell";
import {
  Micro,
  NotConnected,
  Panel,
  StatCard,
  StatusPill,
  Table,
  Td,
} from "@/components/admin/ui";
import { cn } from "@/lib/utils";

/**
 * Tracking & analytics.
 *
 * The single place to see what is measured and what is still to wire up. It is
 * honest about the fact that nothing is connected yet — but every piece is
 * scoped, dated against the launch plan, and owned, so "not connected" reads as
 * "scheduled for Tuesday", not "unknown".
 */

/** When each tool goes in, from the launch plan. */
const TARGET: Record<string, string> = {
  "Google Search Console": "2026-10-17",
  "Google Analytics 4": "2026-10-18",
  "Lead destination": "2026-10-19",
  "Call tracking": "2026-10-20",
};

/** How each on-site event should be treated once GA4 receives it. */
const EVENT_ROLE: Record<EventKind, { role: string; tone: string }> = {
  view: { role: "Pageview", tone: "text-navy/45" },
  call: { role: "Primary conversion", tone: "text-emerald-600" },
  "quote-submit": { role: "Primary conversion", tone: "text-emerald-600" },
  "quote-open": { role: "Micro-conversion", tone: "text-blue" },
  financing: { role: "Micro-conversion", tone: "text-blue" },
  chat: { role: "Micro-conversion", tone: "text-blue" },
  offer: { role: "Micro-conversion", tone: "text-blue" },
};

const EVENT_PATH: Record<EventKind, string> = {
  view: "every page",
  call: "every phone link",
  "quote-open": "quote forms",
  "quote-submit": "quote forms",
  financing: "/financing + home estimator",
  chat: "Ask Coast launcher",
  offer: "home free-estimate popup",
};

function fmtDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export default function AdminTracking() {
  const connected = trackingStack.filter((t) => t.status === "live").length;
  const kinds = Object.keys(EVENT_LABELS) as EventKind[];
  const conversions = kinds.filter((k) => EVENT_ROLE[k].role === "Primary conversion");

  return (
    <AdminShell
      title="Tracking & analytics"
      lead="Everything that will be measured, in one place — organic sources, on-site events and the conversions that matter. Nothing is connected yet, but each tool is dated against the launch plan and goes in this week, so the site is fully instrumented by Friday."
      actions={
        <span className="inline-flex items-center gap-1.5 rounded-full bg-navy px-3 py-1.5 text-[0.72rem] font-bold text-white">
          <Target className="size-3.5" aria-hidden="true" />
          Instrumented by {fmtDate("2026-10-23")}
        </span>
      }
    >
      {/* ------------------------------------------------------- top row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Tools connected" value={`${connected} / ${trackingStack.length}`} tone="bad" hint="All scheduled this week" />
        <StatCard label="On-site events" value={kinds.length} hint="Already firing in the build" />
        <StatCard label="Primary conversions" value={conversions.length} hint="Calls & estimate requests" />
        <StatCard label="Lead destination" value="Email" tone="warn" hint="Endpoint connects Mon" />
      </div>

      {/* ------------------------------------------------ the stack, dated */}
      <Panel
        title="Measurement stack"
        subtitle="What goes in, in order. Search Console first (free, and the only true view of how Google sees the site), then analytics, then lead routing and call tracking."
      >
        <Table columns={["Tool", "What it gives", "Status", "Target", "Identifier"]}>
          {trackingStack.map((t) => (
            <tr key={t.name} className="transition-colors hover:bg-navy/[0.02]">
              <Td className="font-bold text-navy">{t.name}</Td>
              <Td muted>{t.purpose}</Td>
              <Td>
                <StatusPill status={t.status} />
              </Td>
              <Td className="whitespace-nowrap font-semibold text-navy">
                {TARGET[t.name] ? fmtDate(TARGET[t.name]) : "—"}
              </Td>
              <Td muted>
                <span className="font-mono text-xs">{t.idLabel}</span>
              </Td>
            </tr>
          ))}
        </Table>
        <p className="mt-4 text-[0.72rem] leading-relaxed text-navy/45">
          Dates come from the{" "}
          <span className="font-semibold text-navy/60">launch plan</span>. No
          ad-conversion tag or pixel here — this is an organic-only plan, so the
          stack measures where traffic comes from and whether it becomes a call
          or a form, nothing to attribute to spend.
        </p>
      </Panel>

      {/* ----------------------------------------- what the site measures */}
      <Panel
        title="On-site events & conversions"
        subtitle="These already fire in the build (see lib/leads). Once GA4 is on, each is sent as an event and the two primary ones are marked as conversions — no new instrumentation needed."
      >
        <Table columns={["Event", "What it means", "Where", "GA4 role"]}>
          {kinds.map((k) => (
            <tr key={k} className="transition-colors hover:bg-navy/[0.02]">
              <Td className="font-mono text-xs font-semibold text-navy">{k}</Td>
              <Td muted>{EVENT_LABELS[k]}</Td>
              <Td muted>{EVENT_PATH[k]}</Td>
              <Td>
                <span className={cn("font-semibold", EVENT_ROLE[k].tone)}>
                  {EVENT_ROLE[k].role}
                </span>
              </Td>
            </tr>
          ))}
        </Table>
        <div className="mt-4 rounded-lg bg-navy/[0.035] p-4">
          <Micro>Until GA4 is connected</Micro>
          <p className="mt-1.5 text-xs leading-relaxed text-navy/60">
            These events are also written to the visitor's own browser, so the{" "}
            <span className="font-semibold text-navy/75">Leads &amp; CRM</span>{" "}
            page shows this device's activity today. That is a convenience, not a
            shared view — real cross-visitor numbers arrive with GA4.
          </p>
        </div>
      </Panel>

      {/* ---------------------------------------------- dashboards to watch */}
      <Panel
        title="Dashboards to watch"
        subtitle="Once it is live, this is the weekly loop — four surfaces, each answering one question."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              name: "GA4",
              q: "Is traffic growing, and does it convert?",
              items: ["Acquisition → organic & direct", "Landing pages by division", "Conversions: calls, estimate requests", "Events: financing, chat, popup"],
            },
            {
              name: "Search Console",
              q: "What is Google actually ranking us for?",
              items: ["Queries & average position", "Coverage / indexed pages", "FAQ & LocalBusiness enhancements", "Core Web Vitals"],
            },
            {
              name: "Business Profile insights",
              q: "Is the local pack sending calls?",
              items: ["Calls & direction requests", "Search terms that found the listing", "Photo views vs. competitors", "Post engagement"],
            },
            {
              name: "Leads & CRM",
              q: "Did a lead actually land, and where is it?",
              items: ["New enquiries and their stage", "Source of each lead", "This-device traction (pre-GA4)", "Response-time check"],
            },
          ].map((d) => (
            <div key={d.name} className="rounded-xl border border-navy/8 p-4">
              <p className="font-display text-[0.9rem] font-extrabold text-navy">{d.name}</p>
              <p className="mt-0.5 text-[0.72rem] italic text-navy/50">{d.q}</p>
              <ul className="mt-3 space-y-1.5">
                {d.items.map((it) => (
                  <li key={it} className="flex gap-2 text-[0.8rem] text-navy/70">
                    <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-emerald-600/70" aria-hidden="true" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Panel>

      {/* ----------------------------------------------- source tagging */}
      <Panel
        title="Source tagging (UTMs)"
        subtitle="Organic channels are free, but they still need to be told apart in GA4. A couple of conventions do it."
      >
        <ul className="space-y-2.5 text-sm text-navy/75">
          {[
            "Tag the Business Profile website link: ?utm_source=google&utm_medium=gbp",
            "Tag email/SMS links: ?utm_source=newsletter&utm_medium=email (or sms)",
            "Leave organic search untagged — GA4 classifies it automatically",
            "The site already captures UTMs and the Google click id on first touch and stores them against the lead (lib/leads)",
          ].map((t) => (
            <li key={t} className="flex gap-2.5">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-navy/35" aria-hidden="true" />
              {t}
            </li>
          ))}
        </ul>
      </Panel>

      {/* ---------------------------------------------------- call + consent */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Call tracking & local SEO">
          <NotConnected
            service="Call tracking"
            what={`The site publishes ${business.phone} in the header, footer, every CTA and the structured data. Swapping that for a tracking number in the markup would break NAP consistency and hurt local ranking.`}
            steps={[
              "Use dynamic number insertion: the real number stays in the HTML and schema",
              "Only the rendered number changes per visitor source, after load",
              `Keep ${business.phone} as the NAP of record everywhere off-site`,
            ]}
          />
        </Panel>

        <Panel title="Privacy & consent" action={<StatusPill status="draft" />}>
          <p className="text-sm leading-relaxed text-navy/75">
            Adding analytics means collecting visitor data. Before it goes live
            the site needs a cookie / consent notice, and the privacy policy —
            which today describes a site that collects nothing — must be updated
            to name the tools, what they collect and how long it is kept. This is
            scheduled with call tracking on {fmtDate("2026-10-20")}.
          </p>
        </Panel>
      </div>
    </AdminShell>
  );
}
