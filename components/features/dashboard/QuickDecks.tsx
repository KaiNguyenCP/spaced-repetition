import { Layers } from "lucide-react";
import { Card } from "./Card";
import { CardHeader } from "./CardHeader";
import { decks } from "@/lib";
import Link from "next/link";

export const QuickDecks = () => {
  return (
    <Card>
      <CardHeader title="Decks due" icon={Layers} />
      <ul className="flex flex-col gap-1">
        {decks
          .filter((d) => d.due > 0)
          .map((d) => (
            <li key={d.id}>
              <Link
                href={`/decks/${d.id}`}
                className="flex items-center justify-between rounded-md px-2 py-2 text-sm transition-colors hover:bg-accent"
              >
                <span className="truncate pr-2">{d.title}</span>
                <span className="shrink-0 rounded-full bg-state-review/15 px-2 py-0.5 text-xs font-medium text-state-review">
                  {d.due}
                </span>
              </Link>
            </li>
          ))}
      </ul>
    </Card>
  );
};
