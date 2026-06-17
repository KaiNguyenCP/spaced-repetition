import { CardHeader } from "./CardHeader";
import { Sparkles } from "lucide-react";
import { stateDistribution } from "@/lib";
import { Card } from "./Card";

export const CardStates = ({ totalState }: { totalState: number }) => {
  return (
    <Card>
      <CardHeader title="Card states" icon={Sparkles} />
      <div className="mb-4 flex h-2.5 w-full overflow-hidden rounded-full">
        {stateDistribution.map((s) => (
          <div
            key={s.state}
            className={s.color}
            style={{ width: `${(s.count / totalState) * 100}%` }}
            title={`${s.state}: ${s.count}`}
          />
        ))}
      </div>
      <ul className="flex flex-col gap-2.5">
        {stateDistribution.map((s) => (
          <li
            key={s.state}
            className="flex items-center justify-between text-sm"
          >
            <span className="flex items-center gap-2">
              <span className={`size-2.5 rounded-full ${s.color}`} />
              {s.state}
            </span>
            <span className="font-medium tabular-nums">
              {s.count.toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
};
