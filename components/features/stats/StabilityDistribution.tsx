import { Brain } from "lucide-react";
import { Panel } from "./Panel";
import { StabilityBucketsProps } from "@/components/types";

export const StabilityDistribution = ({
  stabilityBuckets,
  maxBucket,
}: StabilityBucketsProps) => {
  return (
    <Panel
      className="lg:col-span-2"
      title="Memory stability distribution"
      icon={Brain}
    >
      <div className="flex h-44 items-end gap-3">
        {stabilityBuckets.map((b) => (
          <div
            key={b.range}
            className="group flex flex-1 flex-col items-center gap-2"
          >
            <span className="text-xs tabular-nums text-muted-foreground">
              {b.count}
            </span>
            <div className="flex w-full flex-1 items-end">
              <div
                className="w-full rounded-t-md bg-state-review/70 transition-colors group-hover:bg-state-review"
                style={{ height: `${(b.count / maxBucket) * 100}%` }}
              />
            </div>
            <span className="text-[10px] text-muted-foreground">{b.range}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Stability = days until recall probability drops to 90% (FSRS).
      </p>
    </Panel>
  );
};
