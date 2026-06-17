import { stats } from "@/lib";
import { Target } from "lucide-react";
import { CardHeader } from "./CardHeader";
import { Card } from "./Card";

export const DailyGoal = ({ goalPct }: { goalPct: number }) => {
  return (
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
        {stats.reviewGoal - stats.reviewsToday} reviews left · {stats.timeToday}{" "}
        studied today
      </p>
    </Card>
  );
};
