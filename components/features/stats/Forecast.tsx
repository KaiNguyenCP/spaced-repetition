import React from "react";
import { Panel } from "./Panel";
import { CalendarDays } from "lucide-react";
import { forecast } from "@/lib";

export const Forecast = ({ maxForecast }: { maxForecast: number }) => {
  return (
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
  );
};
