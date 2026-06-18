import { AppShell } from "./AppShell";
import {
  CardStates,
  DailyGoal,
  DueTodayBanner,
  Forecast,
  Heatmap,
  QuickDecks,
  ReviewActivity,
  StatCards,
} from "./features/dashboard";
import { DashboardClientProps } from "./types";

export const DashboardClient = ({
  goalPct,
  maxActivity,
  maxForecast,
  totalState,
}: DashboardClientProps) => {
  return (
    <AppShell
      active="Dashboard"
      title="Dashboard"
      subtitle="Wednesday, June 17 · 73 cards due today"
    >
      <DueTodayBanner />
      <StatCards />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <DailyGoal goalPct={goalPct} />
          <ReviewActivity maxActivity={maxActivity} />
          <Forecast maxForecast={maxForecast} />
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          <CardStates totalState={totalState} />
          <Heatmap />
          <QuickDecks />
        </div>
      </div>
    </AppShell>
  );
};
