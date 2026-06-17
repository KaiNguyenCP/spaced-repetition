import {
  stats,
  reviewActivity,
  forecast,
  stateDistribution,
} from "@/lib/mock-data";
import { DashboardClient } from "@/components/DashboardClient";

export default function DashboardPage() {
  const maxActivity = Math.max(...reviewActivity.map((d) => d.count));
  const maxForecast = Math.max(...forecast.map((d) => d.count));
  const totalState = stateDistribution.reduce((a, b) => a + b.count, 0);
  const goalPct = Math.round((stats.reviewsToday / stats.reviewGoal) * 100);

  return (
    <DashboardClient
      goalPct={goalPct}
      totalState={totalState}
      maxForecast={maxForecast}
      maxActivity={maxActivity}
    />
  );
}
