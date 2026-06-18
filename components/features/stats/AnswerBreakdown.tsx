import { Gauge } from "lucide-react";
import { Panel } from "./Panel";
import { AnswerBreakdownPops } from "@/components/types";

export const AnswerBreakdown = ({
  answerBreakdown,
}: {
  answerBreakdown: AnswerBreakdownPops[];
}) => {
  return (
    <Panel title="Answer breakdown" icon={Gauge}>
      <div className="mb-4 flex h-2.5 w-full overflow-hidden rounded-full">
        {answerBreakdown.map((a) => (
          <div
            key={a.label}
            className={a.color}
            style={{ width: `${a.pct}%` }}
            title={`${a.label}: ${a.pct}%`}
          />
        ))}
      </div>
      <ul className="flex flex-col gap-2.5">
        {answerBreakdown.map((a) => (
          <li
            key={a.label}
            className="flex items-center justify-between text-sm"
          >
            <span className="flex items-center gap-2">
              <span className={`size-2.5 rounded-full ${a.color}`} /> {a.label}
            </span>
            <span className="font-medium tabular-nums">{a.pct}%</span>
          </li>
        ))}
      </ul>
    </Panel>
  );
};
