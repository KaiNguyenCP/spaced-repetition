import React from "react";
import { Panel } from "./Panel";
import { Flame } from "lucide-react";
import { heatmap } from "@/lib";

export const Heatmap = () => {
  return (
    <Panel title="Study calendar" icon={Flame}>
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
          />
        ))}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Last 12 weeks · darker = more reviews
      </p>
    </Panel>
  );
};
