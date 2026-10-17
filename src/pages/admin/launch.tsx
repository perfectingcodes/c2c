import { CalendarClock, Rocket, ShieldAlert } from "lucide-react";
import { launchPlan, type LaunchState } from "@/content/marketing";
import { AdminShell } from "@/components/admin/shell";
import { Instrument, Micro, Panel, StatCard } from "@/components/admin/ui";
import { cn } from "@/lib/utils";

/**
 * Launch plan.
 *
 * The one screen that answers "what ships, and when". The build is done, so
 * this is a dated, owned schedule rather than a backlog — front-loaded to go
 * live on day one and fully instrumented by the end of the week.
 */

const STATE: Record<LaunchState, { label: string; chip: string; dot: string }> = {
  done: {
    label: "Done",
    chip: "bg-emerald-500/12 text-emerald-700 ring-emerald-500/25",
    dot: "bg-emerald-500",
  },
  now: {
    label: "Today",
    chip: "bg-ember/12 text-ember ring-ember/30",
    dot: "bg-ember",
  },
  scheduled: {
    label: "Scheduled",
    chip: "bg-blue/10 text-blue ring-blue/25",
    dot: "bg-blue",
  },
  waiting: {
    label: "Waiting on Google",
    chip: "bg-gold/18 text-amber-800 ring-gold/40",
    dot: "bg-gold",
  },
};

/** Local today, as yyyy-mm-dd, so the timeline marks the real current day. */
function todayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

function fmt(iso: string) {
  const d = new Date(`${iso}T12:00:00`);
  return {
    weekday: d.toLocaleDateString("en-US", { weekday: "short" }),
    day: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
  };
}

export default function AdminLaunch() {
  const today = todayISO();
  const { milestones } = launchPlan;
  const done = milestones.filter((m) => m.state === "done").length;
  const dueToday = milestones.filter((m) => m.date === today && m.state !== "done").length;
  const owners = [...new Set(milestones.map((m) => m.owner))];

  return (
    <AdminShell
      title="Launch plan"
      lead={`${launchPlan.note} Launch window ${launchPlan.window}.`}
      actions={
        <span className="inline-flex items-center gap-1.5 rounded-full bg-ember/10 px-3 py-1.5 text-[0.72rem] font-bold text-ember ring-1 ring-inset ring-ember/25">
          <Rocket className="size-3.5" aria-hidden="true" />
          Go live today
        </span>
      }
    >
      {/* ------------------------------------------------- top instruments */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <Instrument
          className="lg:col-span-5"
          label="Target go-live"
          value="Today"
          footnote={`${fmt(launchPlan.goLive).weekday} · ${fmt(launchPlan.goLive).day} · ${launchPlan.window}`}
        />
        <div className="grid grid-cols-3 gap-5 lg:col-span-7">
          <StatCard label="Milestones" value={milestones.length} hint="All inside one week" icon={<CalendarClock />} />
          <StatCard label="Done" value={done} tone="good" hint="Build complete & verified" />
          <StatCard
            label="Due today"
            value={dueToday}
            tone={dueToday ? "warn" : "default"}
            hint="Go-live & Search Console"
          />
        </div>
      </div>

      {/* --------------------------------------------------- dependency */}
      <Panel title="One dependency" className="ring-1 ring-gold/30">
        <div className="flex items-start gap-3">
          <ShieldAlert className="mt-0.5 size-4 shrink-0 text-amber-600" aria-hidden="true" />
          <p className="max-w-prose text-sm leading-relaxed text-navy/70">
            {launchPlan.dependency}
          </p>
        </div>
      </Panel>

      {/* ----------------------------------------------------- timeline */}
      <Panel
        title="The week, day by day"
        subtitle="Every item is scoped and owned. States move left to right: done, today, scheduled, and the one step that waits on Google."
      >
        <ol className="relative">
          {/* The spine the days hang off. */}
          <span
            className="pointer-events-none absolute bottom-3 left-[6.5rem] top-3 w-px bg-navy/10 sm:left-[7.5rem]"
            aria-hidden="true"
          />
          {milestones.map((m, i) => {
            const s = STATE[m.state];
            const d = fmt(m.date);
            const isToday = m.date === today;
            return (
              <li key={`${m.date}-${m.title}`} className="relative flex gap-4 pb-7 last:pb-0 sm:gap-6">
                {/* date */}
                <div className="w-[5.5rem] shrink-0 pt-0.5 text-right sm:w-[6.5rem]">
                  <p
                    className={cn(
                      "font-display text-[0.6rem] font-extrabold uppercase tracking-[0.14em]",
                      isToday ? "text-ember" : "text-navy/40",
                    )}
                  >
                    {d.weekday}
                  </p>
                  <p
                    className={cn(
                      "font-display text-sm font-extrabold tracking-tight",
                      isToday ? "text-ember" : "text-navy/70",
                    )}
                  >
                    {d.day}
                  </p>
                  {isToday && (
                    <p className="mt-0.5 font-mono text-[0.55rem] uppercase tracking-[0.12em] text-ember/80">
                      Today
                    </p>
                  )}
                </div>

                {/* node */}
                <span className="relative z-10 mt-1 shrink-0">
                  <span
                    className={cn(
                      "grid size-5 place-items-center rounded-full ring-4 ring-[#eaf1fa]",
                      s.dot,
                    )}
                    aria-hidden="true"
                  >
                    {m.state === "done" && (
                      <svg viewBox="0 0 10 10" className="size-2.5 text-white" fill="none">
                        <path d="M1.5 5.2 4 7.5 8.5 2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                </span>

                {/* body */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <h3 className="font-display text-[0.95rem] font-extrabold text-navy">
                      {m.title}
                    </h3>
                    <span
                      className={cn(
                        "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[0.62rem] font-bold ring-1 ring-inset",
                        s.chip,
                      )}
                    >
                      <span className={cn("size-1.5 rounded-full", s.dot)} aria-hidden="true" />
                      {s.label}
                    </span>
                    {m.depends && (
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-navy/40">
                        needs {m.depends}
                      </span>
                    )}
                  </div>
                  <Micro className="mt-1.5">{m.owner}</Micro>
                  <ul className="mt-2.5 space-y-1.5">
                    {m.tasks.map((t) => (
                      <li key={t} className="flex gap-2.5 text-[0.82rem] leading-relaxed text-navy/70">
                        <span className="mt-1.5 size-1 shrink-0 rounded-full bg-navy/30" aria-hidden="true" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <span className="sr-only">Step {i + 1}</span>
              </li>
            );
          })}
        </ol>
      </Panel>

      <p className="text-[0.72rem] leading-relaxed text-navy/40">
        Owners: {owners.join(" · ")}. Dates are the plan of record and move only
        with the client. The Business Profile steps publish the moment Google
        verifies the listing, whenever in the window that lands.
      </p>
    </AdminShell>
  );
}
