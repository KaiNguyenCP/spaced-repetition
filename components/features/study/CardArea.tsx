import { RatingOBJ } from "@/components/types";
import { Eye, Flag, Settings2, Undo2, Volume2 } from "lucide-react";

export const CardArea = ({ ratings }: { ratings: RatingOBJ[] }) => {
  return (
    <main className="flex flex-1 items-center justify-center px-5 py-8">
      <div className="w-full max-w-2xl">
        <div className="rounded-2xl border border-border bg-card shadow-sm">
          {/* Front */}
          <div className="flex flex-col items-center gap-3 px-6 py-12 text-center">
            <span className="rounded-full bg-state-learning/15 px-2.5 py-0.5 text-xs font-medium text-state-learning">
              Learning · review in 1 day
            </span>
            <p className="text-5xl font-semibold tracking-tight sm:text-6xl">
              提案
            </p>
            <button className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
              <Volume2 className="size-4" /> Play audio
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 px-6">
            <div className="h-px flex-1 bg-border" />
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Eye className="size-3.5" /> Answer
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Back */}
          <div className="flex flex-col items-center gap-2 px-6 py-10 text-center">
            <p className="text-2xl font-medium">ていあん</p>
            <p className="text-lg text-muted-foreground">
              proposal, suggestion
            </p>
            <p className="mt-3 max-w-md text-sm text-muted-foreground">
              新しい提案を会議で発表した。 — I presented a new proposal at the
              meeting.
            </p>
          </div>
        </div>

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
