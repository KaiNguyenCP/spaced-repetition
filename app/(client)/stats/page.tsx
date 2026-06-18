import { reviewActivity, forecast, stateDistribution } from "@/lib/mock-data";
import StatisticClient from "@/components/StatisticClient";

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
    <StatisticClient
      answerBreakdown={answerBreakdown}
      maxActivity={maxActivity}
      maxBucket={maxBucket}
      maxForecast={maxForecast}
      totalState={totalState}
      stabilityBuckets={stabilityBuckets}
    />
  );
}
