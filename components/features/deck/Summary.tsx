import { Clock, Layers, Plus, TrendingUp } from "lucide-react";
import { Mini } from "./Mini";
import { MockDeck } from "@/lib";

export const Summary = ({ deck }: { deck: MockDeck }) => {
  return (
    <section className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
      <Mini icon={Layers} label="Total cards" value={deck.total} />
      <Mini
        icon={Clock}
        label="Due now"
        value={deck.due}
        tone="text-state-review"
      />
      <Mini
        icon={Plus}
        label="New"
        value={deck.newCount}
        tone="text-state-new"
      />
      <Mini
        icon={TrendingUp}
        label="Retention"
        value={`${Math.round(deck.retention * 100)}%`}
        tone="text-primary"
      />
    </section>
  );
};
