import { reviewActivity } from "@/lib";
import { TrendingUp } from "lucide-react";
import { CardHeader } from "./CardHeader";
import { Card } from "./Card";

export const ReviewActivity = ({ maxActivity }: { maxActivity: number }) => {
  return (
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
            <span className="text-[10px] text-muted-foreground">{d.day}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};
