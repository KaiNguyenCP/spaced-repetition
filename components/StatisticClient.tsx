import { AppShell } from "./AppShell";
import { CardStates, Forecast, Heatmap } from "./features/dashboard";
import {
  AnswerBreakdown,
  KPIRow,
  ReviewsOverTime,
  StabilityDistribution,
} from "./features/stats";
import { StatisticClientProps } from "./types";

export default function StatisticClient({
  maxActivity,
  answerBreakdown,
  maxBucket,
  stabilityBuckets,
  totalState,
  maxForecast,
}: StatisticClientProps) {
  return (
    <AppShell
      active="Statistics"
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
      <KPIRow />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <ReviewsOverTime maxActivity={maxActivity} />
        <AnswerBreakdown answerBreakdown={answerBreakdown} />
        <StabilityDistribution
          maxBucket={maxBucket}
          stabilityBuckets={stabilityBuckets}
        />
        <CardStates totalState={totalState} />
        <Forecast maxForecast={maxForecast} />
        <Heatmap />
      </div>
    </AppShell>
  );
}
