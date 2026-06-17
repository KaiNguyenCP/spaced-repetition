import {
  TrendingUp,
  Target,
  Clock,
  Flame,
  Brain,
  CalendarDays,
  Gauge,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import {
  reviewActivity,
  forecast,
  stateDistribution,
  heatmap,
} from "@/lib/mock-data";

// Retention by answer button
const answerBreakdown = [
  { label: "Again", pct: 9, color: "bg-state-relearning" },
  { label: "Hard", pct: 18, color: "bg-state-learning" },
  { label: "Good", pct: 58, color: "bg-state-review" },
  { label: "Easy", pct: 15, color: "bg-state-new" },
];

// Stability distribution buckets
const stabilityBuckets = [
  { range: "0–1d", count: 184 },
  { range: "1–7d", count: 312 },
  { range: "7–30d", count: 468 },
  { range: "1–3mo", count: 392 },
  { range: "3–6mo", count: 214 },
  { range: "6mo+", count: 158 },
];

export default function StatsPage() {
  const maxActivity = Math.max(...reviewActivity.map((d) => d.count));
  const maxForecast = Math.max(...forecast.map((d) => d.count));
  const maxBucket = Math.max(...stabilityBuckets.map((b) => b.count));
  const totalState = stateDistribution.reduce((a, b) => a + b.count, 0);

  return (
    <AppShell
      active="True"
      title="Statistics"
      subtitle="Your learning performance over time"
      action={
        <div className="flex items-center gap-1 rounded-md border border-border bg-card p-1 text-sm">
          {["30d", "90d", "1y", "All"].map((r, i) => (
            <button
              key={r}
              className={`rounded px-2.5 py-1 font-medium transition-colors ${
                i === 0
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      }
    >
      {/* KPI row */}
      <section className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Kpi
          icon={Target}
          label="True retention"
          value="91%"
          delta="+2.4%"
          up
        />
        <Kpi
          icon={TrendingUp}
          label="Reviews / day"
          value="98"
          delta="+12"
          up
        />
        <Kpi
          icon={Clock}
          label="Avg. answer time"
          value="6.2s"
          delta="-0.4s"
          up
        />
        <Kpi icon={Flame} label="Days studied" value="28 / 30" delta="93%" up />
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Reviews over time */}
        <Panel
          className="lg:col-span-2"
          title="Reviews over time"
          icon={TrendingUp}
        >
          <div className="flex h-56 items-end gap-1.5">
            {reviewActivity.map((d, i) => (
              <div
                key={i}
                className="group flex flex-1 flex-col items-center gap-1.5"
              >
                <div className="flex w-full flex-1 items-end">
                  <div
                    className="w-full rounded-t-sm bg-primary/70 transition-colors group-hover:bg-primary"
                    style={{ height: `${(d.count / maxActivity) * 100}%` }}
                    title={`${d.count} reviews`}
                  />
                </div>
                <span className="text-[10px] text-muted-foreground">
                  {d.day}
                </span>
              </div>
            ))}
          </div>
        </Panel>

        {/* Answer breakdown */}
        <Panel title="Answer breakdown" icon={Gauge}>
          <div className="mb-4 flex h-2.5 w-full overflow-hidden rounded-full">
            {answerBreakdown.map((a) => (
              <div
                key={a.label}
                className={a.color}
                style={{ width: `${a.pct}%` }}
                title={`${a.label}: ${a.pct}%`}
              />
            ))}
          </div>
          <ul className="flex flex-col gap-2.5">
            {answerBreakdown.map((a) => (
              <li
                key={a.label}
                className="flex items-center justify-between text-sm"
              >
                <span className="flex items-center gap-2">
                  <span className={`size-2.5 rounded-full ${a.color}`} />{" "}
                  {a.label}
                </span>
                <span className="font-medium tabular-nums">{a.pct}%</span>
              </li>
            ))}
          </ul>
        </Panel>

        {/* Stability distribution */}
        <Panel
          className="lg:col-span-2"
          title="Memory stability distribution"
          icon={Brain}
        >
          <div className="flex h-44 items-end gap-3">
            {stabilityBuckets.map((b) => (
              <div
                key={b.range}
                className="group flex flex-1 flex-col items-center gap-2"
              >
                <span className="text-xs tabular-nums text-muted-foreground">
                  {b.count}
                </span>
                <div className="flex w-full flex-1 items-end">
                  <div
                    className="w-full rounded-t-md bg-state-review/70 transition-colors group-hover:bg-state-review"
                    style={{ height: `${(b.count / maxBucket) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] text-muted-foreground">
                  {b.range}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Stability = days until recall probability drops to 90% (FSRS).
          </p>
        </Panel>

        {/* Card states */}
        <Panel title="Card maturity" icon={Brain}>
          <ul className="flex flex-col gap-3">
            {stateDistribution.map((s) => (
              <li key={s.state}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span>{s.state}</span>
                  <span className="font-medium tabular-nums">
                    {s.count.toLocaleString()}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full ${s.color}`}
                    style={{ width: `${(s.count / totalState) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        {/* Forecast */}
        <Panel
          className="lg:col-span-2"
          title="Review forecast"
          icon={CalendarDays}
        >
          <ul className="flex flex-col gap-3">
            {forecast.map((f, i) => (
              <li key={i} className="flex items-center gap-3 text-sm">
                <span className="w-12 shrink-0 text-muted-foreground">
                  {f.label}
                </span>
                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-state-new"
                    style={{ width: `${(f.count / maxForecast) * 100}%` }}
                  />
                </div>
                <span className="w-8 shrink-0 text-right font-medium tabular-nums">
                  {f.count}
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        {/* Heatmap */}
        <Panel title="Study calendar" icon={Flame}>
          <div className="grid grid-flow-col grid-rows-7 gap-1">
            {heatmap.map((v, i) => (
              <div
                key={i}
                className="aspect-square rounded-[3px]"
                style={{
                  backgroundColor:
                    v === 0
                      ? "var(--muted)"
                      : `color-mix(in oklab, var(--primary) ${v * 25}%, var(--muted))`,
                }}
              />
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Last 12 weeks · darker = more reviews
          </p>
        </Panel>
      </div>
    </AppShell>
  );
}

function Kpi({
  icon: Icon,
  label,
  value,
  delta,
  up,
}: {
  icon: typeof Target;
  label: string;
  value: string;
  delta: string;
  up?: boolean;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
      <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className="size-4" /> {label}
      </div>
      <div className="flex items-end justify-between gap-2">
        <span className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {value}
        </span>
        <span
          className={`text-xs font-medium ${up ? "text-primary" : "text-destructive"}`}
        >
          {delta}
        </span>
      </div>
    </div>
  );
}

function Panel({
  title,
  icon: Icon,
  className = "",
  children,
}: {
  title: string;
  icon: typeof Target;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`rounded-xl border border-border bg-card p-5 ${className}`}>
      <div className="mb-4 flex items-center gap-2">
        <Icon className="size-4 text-muted-foreground" />
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  );
}
