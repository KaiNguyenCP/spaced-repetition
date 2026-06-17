import { heatmap } from "@/lib";
import { Flame } from "lucide-react";
import { CardHeader } from "./CardHeader";
import { Card } from "./Card";

export const Heatmap = () => {
  return (
    <Card>
      <CardHeader title="12-week activity" icon={Flame} />
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
            title={`${v * 8} reviews`}
          />
        ))}
      </div>
      <div className="mt-3 flex items-center justify-end gap-1.5 text-[10px] text-muted-foreground">
        Less
        {[0, 1, 2, 3, 4].map((v) => (
          <span
            key={v}
            className="size-2.5 rounded-[3px]"
            style={{
              backgroundColor:
                v === 0
                  ? "var(--muted)"
                  : `color-mix(in oklab, var(--primary) ${v * 25}%, var(--muted))`,
            }}
          />
        ))}
        More
      </div>
    </Card>
  );
};
