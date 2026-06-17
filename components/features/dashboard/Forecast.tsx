import { Clock } from "lucide-react";
import { CardHeader } from "./CardHeader";
import { Card } from "./Card";
import { forecast } from "@/lib";

export const Forecast = ({ maxForecast }: { maxForecast: number }) => {
  return (
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
  );
};
