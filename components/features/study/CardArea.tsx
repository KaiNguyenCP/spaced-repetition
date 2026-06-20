import { RatingOBJ } from "@/components/types";
import { Flag, Settings2, Undo2 } from "lucide-react";
import { CardView } from "./CardView";

export const CardArea = ({ ratings }: { ratings: RatingOBJ[] }) => {
  return (
    <main className="flex flex-1 items-center justify-center px-5 py-8">
      <div className="w-full max-w-2xl">
        <CardView />
        {/* Reveal hint (shown before flipping) */}
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Press{" "}
          <kbd className="rounded border border-border bg-card px-1.5 py-0.5 text-xs">
            Space
          </kbd>{" "}
          to show answer, then rate your recall.
        </p>

        {/* Rating buttons */}
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {ratings.map((r) => (
            <button
              key={r.key}
              className={`flex flex-col items-center gap-0.5 rounded-xl border px-3 py-3 text-center transition-colors ${r.cls}`}
            >
              <span className="text-sm font-semibold">{r.label}</span>
              <span className="text-xs font-medium tabular-nums opacity-90">
                {r.interval}
              </span>
              <span className="text-[10px] text-muted-foreground">{r.sub}</span>
              <kbd className="mt-1 rounded border border-current/30 px-1.5 text-[10px] opacity-70">
                {r.key}
              </kbd>
            </button>
          ))}
        </div>

        {/* Footer actions */}
        <div className="mt-5 flex items-center justify-center gap-5 text-sm text-muted-foreground">
          <button className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
            <Undo2 className="size-4" /> Undo
          </button>
          <button className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
            <Flag className="size-4" /> Flag
          </button>
          <button className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
            <Settings2 className="size-4" /> Edit card
          </button>
        </div>
      </div>
    </main>
  );
};
