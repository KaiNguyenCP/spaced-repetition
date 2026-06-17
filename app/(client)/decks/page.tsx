import Link from "next/link";
import {
  Plus,
  Search,
  Clock,
  Sparkles,
  BookOpen,
  MoreVertical,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { decks } from "@/lib/mock-data";

export default function DecksPage() {
  return (
    <AppShell
    active="true"
      title="Decks"
      subtitle={`${decks.length} decks · ${decks.reduce((a, d) => a + d.total, 0).toLocaleString()} cards total`}
      action={
        <button className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          <Plus className="size-4" />
          <span className="hidden sm:inline">New deck</span>
        </button>
      }
    >
      {/* Search + filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search decks..."
            className="w-full rounded-md border border-border bg-card py-2 pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30"
          />
        </div>
        <div className="flex items-center gap-2">
          {["All", "Due", "New", "Archived"].map((f, i) => (
            <button
              key={f}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                i === 0
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:bg-accent/50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Deck grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {decks.map((d) => {
          const progress = Math.round(((d.total - d.due) / d.total) * 100);
          return (
            <div
              key={d.id}
              className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-ring/40"
            >
              <div className="mb-3 flex items-start justify-between gap-2">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <BookOpen className="size-5" />
                </div>
                <button className="rounded-md p-1.5 text-muted-foreground opacity-0 transition-opacity hover:bg-accent group-hover:opacity-100">
                  <MoreVertical className="size-4" />
                </button>
              </div>

              <Link href={`/decks/${d.id}`} className="flex-1">
                <h3 className="font-semibold leading-snug text-balance">
                  {d.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {d.description}
                </p>
              </Link>

              {/* counts */}
              <div className="mt-4 flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5 text-state-new">
                  <span className="size-2 rounded-full bg-state-new" />{" "}
                  {d.newCount} new
                </span>
                <span className="flex items-center gap-1.5 text-state-learning">
                  <span className="size-2 rounded-full bg-state-learning" />{" "}
                  {d.learning} learn
                </span>
                <span className="flex items-center gap-1.5 text-state-review">
                  <span className="size-2 rounded-full bg-state-review" />{" "}
                  {d.review} due
                </span>
              </div>

              {/* progress */}
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="size-3.5" /> {d.updatedAt}
                </span>
                {d.due > 0 ? (
                  <Link
                    href="/study"
                    className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    <Sparkles className="size-3.5" /> Study {d.due}
                  </Link>
                ) : (
                  <span className="text-xs font-medium text-muted-foreground">
                    All done
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {/* New deck tile */}
        <button className="flex min-h-55 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-card/40 text-muted-foreground transition-colors hover:border-ring/40 hover:text-foreground">
          <Plus className="size-6" />
          <span className="text-sm font-medium">Create new deck</span>
        </button>
      </div>
    </AppShell>
  );
}
