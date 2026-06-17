import Link from "next/link";
import { X, Settings2, Flag, Volume2, Undo2, Eye } from "lucide-react";

const ratings = [
  {
    key: "1",
    label: "Again",
    interval: "<1m",
    sub: "Forgot",
    cls: "border-state-relearning/40 bg-state-relearning/10 text-state-relearning hover:bg-state-relearning/20",
  },
  {
    key: "2",
    label: "Hard",
    interval: "8m",
    sub: "Difficult",
    cls: "border-state-learning/40 bg-state-learning/10 text-state-learning hover:bg-state-learning/20",
  },
  {
    key: "3",
    label: "Good",
    interval: "4d",
    sub: "Recalled",
    cls: "border-state-review/40 bg-state-review/10 text-state-review hover:bg-state-review/20",
  },
  {
    key: "4",
    label: "Easy",
    interval: "9d",
    sub: "Effortless",
    cls: "border-state-new/40 bg-state-new/10 text-state-new hover:bg-state-new/20",
  },
];

export default function StudyPage() {
  const done = 35;
  const total = 73;
  const pct = Math.round((done / total) * 100);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Top bar */}
      <header className="flex h-16 items-center justify-between gap-4 border-b border-border px-5 sm:px-8">
        <Link
          href="/decks"
          className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          aria-label="Exit session"
        >
          <X className="size-5" />
        </Link>
        <div className="flex flex-1 flex-col items-center gap-1.5">
          <div className="flex items-center gap-3 text-sm">
            <span className="font-medium">Japanese — JLPT N3 Vocabulary</span>
            <span className="text-muted-foreground tabular-nums">
              {done} / {total}
            </span>
          </div>
          <div className="h-1.5 w-full max-w-md overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
        <button
          className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          aria-label="Session settings"
        >
          <Settings2 className="size-5" />
        </button>
      </header>

      {/* Counts row */}
      <div className="flex items-center justify-center gap-4 border-b border-border py-2 text-xs">
        <span className="flex items-center gap-1.5 text-state-new">
          <span className="size-2 rounded-full bg-state-new" /> 12 new
        </span>
        <span className="flex items-center gap-1.5 text-state-learning">
          <span className="size-2 rounded-full bg-state-learning" /> 23 learning
        </span>
        <span className="flex items-center gap-1.5 text-state-review">
          <span className="size-2 rounded-full bg-state-review" /> 38 review
        </span>
      </div>

      {/* Card area */}
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
                <span className="text-[10px] text-muted-foreground">
                  {r.sub}
                </span>
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
    </div>
  );
}
