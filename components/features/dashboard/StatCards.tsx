import { stats } from "@/lib";
import { Clock, Flame, Layers, TrendingUp } from "lucide-react";
import { StatCard } from "./StatCard";

export const StatCards = () => {
  return (
    <section className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatCard
        icon={Layers}
        label="Total decks"
        value={stats.totalDecks}
        sub={`${stats.totalCards.toLocaleString()} cards`}
      />
      <StatCard
        icon={Clock}
        label="Due today"
        value={stats.dueToday}
        sub="across all decks"
        tone="text-state-review"
      />
      <StatCard
        icon={Flame}
        label="Current streak"
        value={`${stats.streak}d`}
        sub="personal best: 42d"
        tone="text-state-learning"
      />
      <StatCard
        icon={TrendingUp}
        label="Retention"
        value={`${stats.retention}%`}
        sub="last 30 days"
        tone="text-primary"
      />
    </section>
  );
};
