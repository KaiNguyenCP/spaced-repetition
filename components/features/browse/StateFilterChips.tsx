import { STATE_META } from "@/lib";
import { Chip } from "./Chip";
import { CardBrowser } from "@/components/types/Browser.type";
import { State } from "ts-fsrs";

export const StateFilterChips = ({ allCards }: { allCards: CardBrowser[] }) => {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      <Chip label="All" active count={allCards.length} />
      {(Object.keys(STATE_META) as unknown as State[]).map((k) => {
        const meta = STATE_META[k];
        const count = allCards.filter((c) => c.state === k).length;
        return (
          <Chip key={k} label={meta.label} dot={meta.color} count={count} />
        );
      })}
    </div>
  );
};
