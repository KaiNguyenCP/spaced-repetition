import { Panel } from "./Panel";
import { Brain } from "lucide-react";
import { stateDistribution } from "@/lib";

export const CardStates = ({ totalState }: { totalState: number }) => {
  return (
    <Panel title="Card maturity" icon={Brain}>
      <ul className="flex flex-col gap-3">
        {stateDistribution.map((s) => (
          <li key={s.state}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span>{s.state}</span>
              <span className="font-medium tabular-nums">
                {s.count.toLocaleString()}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full rounded-full ${s.color}`}
                style={{ width: `${(s.count / totalState) * 100}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  );
};
