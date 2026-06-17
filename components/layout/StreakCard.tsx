import { Flame } from "lucide-react";

export const StreakCard = () => {
  return (
    <div className="m-3 rounded-lg border border-sidebar-border bg-sidebar-accent/40 p-4">
      <div className="flex items-center gap-2 text-sm font-medium">
        <Flame className="size-4 text-state-learning" />
        28-day streak
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        Keep it up — review today to extend your streak.
      </p>
    </div>
  );
};
