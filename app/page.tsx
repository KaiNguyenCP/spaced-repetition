import Link from "next/link";
import {
  Layers,
  Clock,
  Flame,
  Target,
  TrendingUp,
  Sparkles,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import {
  decks,
  stats,
  reviewActivity,
  forecast,
  stateDistribution,
  heatmap,
} from "@/lib/mock-data";

export default function DashboardPage() {
  const maxActivity = Math.max(...reviewActivity.map((d) => d.count));
  const maxForecast = Math.max(...forecast.map((d) => d.count));
  const totalState = stateDistribution.reduce((a, b) => a + b.count, 0);
  const goalPct = Math.round((stats.reviewsToday / stats.reviewGoal) * 100);

  return (
    <AppShell
      active="True"
      title="Dashboard"
      subtitle="Wednesday, June 17 · 73 cards due today"
    >
      {/* Due-today banner */}
      <section className="mb-6 flex flex-col gap-4 rounded-xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <GraduationCap className="size-6" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">
              You have 73 cards to review
            </h2>
            <p className="text-sm text-muted-foreground">
              12 new · 23 learning · 38 due · about 22 minutes
            </p>
          </div>
        </div>
        <Link
          href="/study"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Start studying
          <ArrowRight className="size-4" />
        </Link>
      </section>

      {/* Stat cards */}
      <section className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          icon={Layers}
          label="Total decks"
          value={stats.totalDecks}
          sub={`${stats.totalCards.toLocaleString()} cards`}
        />
        <StatCard
          icon={Clock}
          label="Due today"
          value={stats.dueToday}
          sub="across all decks"
          tone="text-state-review"
        />
        <StatCard
          icon={Flame}
          label="Current streak"
          value={`${stats.streak}d`}
          sub="personal best: 42d"
          tone="text-state-learning"
        />
        <StatCard
          icon={TrendingUp}
          label="Retention"
          value={`${stats.retention}%`}
          sub="last 30 days"
          tone="text-primary"
        />
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* Daily goal */}
          <Card>
            <CardHeader title="Today's goal" icon={Target} />
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {stats.reviewsToday} of {stats.reviewGoal} reviews
              </span>
              <span className="font-medium text-primary">{goalPct}%</span>
            </div>
            <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${goalPct}%` }}
              />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              {stats.reviewGoal - stats.reviewsToday} reviews left ·{" "}
              {stats.timeToday} studied today
            </p>
          </Card>

          {/* Review activity */}
          <Card>
            <CardHeader title="Reviews — last 14 days" icon={TrendingUp} />
            <div className="flex h-44 items-end gap-1.5">
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
          </Card>

          {/* Forecast */}
          <Card>
            <CardHeader title="Upcoming reviews — next 7 days" icon={Clock} />
            <ul className="flex flex-col gap-3">
              {forecast.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  <span className="w-12 shrink-0 text-muted-foreground">
                    {f.label}
                  </span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
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
          </Card>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          {/* Card states */}
          <Card>
            <CardHeader title="Card states" icon={Sparkles} />
            <div className="mb-4 flex h-2.5 w-full overflow-hidden rounded-full">
              {stateDistribution.map((s) => (
                <div
                  key={s.state}
                  className={s.color}
                  style={{ width: `${(s.count / totalState) * 100}%` }}
                  title={`${s.state}: ${s.count}`}
                />
              ))}
            </div>
            <ul className="flex flex-col gap-2.5">
              {stateDistribution.map((s) => (
                <li
                  key={s.state}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="flex items-center gap-2">
                    <span className={`size-2.5 rounded-full ${s.color}`} />
                    {s.state}
                  </span>
                  <span className="font-medium tabular-nums">
                    {s.count.toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Heatmap */}
          <Card>
            <CardHeader title="12-week activity" icon={Flame} />
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
                  title={`${v * 8} reviews`}
                />
              ))}
            </div>
            <div className="mt-3 flex items-center justify-end gap-1.5 text-[10px] text-muted-foreground">
              Less
              {[0, 1, 2, 3, 4].map((v) => (
                <span
                  key={v}
                  className="size-2.5 rounded-[3px]"
                  style={{
                    backgroundColor:
                      v === 0
                        ? "var(--muted)"
                        : `color-mix(in oklab, var(--primary) ${v * 25}%, var(--muted))`,
                  }}
                />
              ))}
              More
            </div>
          </Card>

          {/* Quick decks */}
          <Card>
            <CardHeader title="Decks due" icon={Layers} />
            <ul className="flex flex-col gap-1">
              {decks
                .filter((d) => d.due > 0)
                .map((d) => (
                  <li key={d.id}>
                    <Link
                      href={`/decks/${d.id}`}
                      className="flex items-center justify-between rounded-md px-2 py-2 text-sm transition-colors hover:bg-accent"
                    >
                      <span className="truncate pr-2">{d.title}</span>
                      <span className="shrink-0 rounded-full bg-state-review/15 px-2 py-0.5 text-xs font-medium text-state-review">
                        {d.due}
                      </span>
                    </Link>
                  </li>
                ))}
            </ul>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  tone = "text-foreground",
}: {
  icon: typeof Layers;
  label: string;
  value: string | number;
  sub: string;
  tone?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
      <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className="size-4" />
        {label}
      </div>
      <div
        className={`text-2xl font-semibold tracking-tight sm:text-3xl ${tone}`}
      >
        {value}
      </div>
      <div className="mt-1 text-xs text-muted-foreground">{sub}</div>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      {children}
    </div>
  );
}

function CardHeader({
  title,
  icon: Icon,
}: {
  title: string;
  icon: typeof Layers;
}) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <Icon className="size-4 text-muted-foreground" />
      <h3 className="text-sm font-semibold">{title}</h3>
    </div>
  );
}
