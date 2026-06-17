import {
  Search,
  Filter,
  Plus,
  ChevronDown,
  Trash2,
  Pencil,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { decks, STATE_META, type CardState } from "@/lib/mock-data";

// Flatten all cards across decks for the browser
const allCards = decks.flatMap((d) =>
  d.cards.map((c) => ({ ...c, deckTitle: d.title })),
);

export default function BrowsePage() {
  return (
    <AppShell
      active="True"
      title="Browse"
      subtitle={`${allCards.length} cards in preview · filter, search and edit`}
      action={
        <button className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          <Plus className="size-4" />
          <span className="hidden sm:inline">Add card</span>
        </button>
      }
    >
      {/* Filters */}
      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search front, back, or tags..."
            className="w-full rounded-md border border-border bg-card py-2 pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select label="All decks" />
          <Select label="Any state" />
          <Select label="Sort: Due date" />
          <button className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium transition-colors hover:bg-accent">
            <Filter className="size-4" /> More
          </button>
        </div>
      </div>

      {/* State filter chips */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Chip label="All" active count={allCards.length} />
        {(Object.keys(STATE_META) as unknown as CardState[]).map((k) => {
          const meta = STATE_META[k];
          const count = allCards.filter((c) => c.state === k).length;
          return (
            <Chip key={k} label={meta.label} dot={meta.color} count={count} />
          );
        })}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="w-10 px-4 py-3">
                  <input
                    type="checkbox"
                    className="size-4 rounded border-border accent-primary"
                    aria-label="Select all"
                  />
                </th>
                <th className="px-4 py-3 font-medium">Front</th>
                <th className="px-4 py-3 font-medium">Back</th>
                <th className="px-4 py-3 font-medium">Deck</th>
                <th className="px-4 py-3 font-medium">State</th>
                <th className="px-4 py-3 text-right font-medium">Lapses</th>
                <th className="px-4 py-3 text-right font-medium">
                  Next review
                </th>
                <th className="w-20 px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {allCards.map((c) => {
                const meta = STATE_META[c.state as CardState];
                return (
                  <tr
                    key={c.id}
                    className="group transition-colors hover:bg-accent/40"
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        className="size-4 rounded border-border accent-primary"
                        aria-label={`Select ${c.front}`}
                      />
                    </td>
                    <td className="max-w-45 truncate px-4 py-3 font-medium">
                      {c.front}
                    </td>
                    <td className="max-w-60 truncate px-4 py-3 text-muted-foreground">
                      {c.back}
                    </td>
                    <td className="max-w-40 truncate px-4 py-3 text-muted-foreground">
                      {c.deckTitle}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${meta.bg} ${meta.text}`}
                      >
                        <span
                          className={`size-1.5 rounded-full ${meta.color}`}
                        />
                        {meta.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">
                      {c.lapses}
                    </td>
                    <td className="px-4 py-3 text-right text-muted-foreground">
                      {c.nextReview}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                        <button
                          className="rounded p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
                          aria-label="Edit"
                        >
                          <Pencil className="size-4" />
                        </button>
                        <button
                          className="rounded p-1.5 text-muted-foreground hover:bg-accent hover:text-destructive"
                          aria-label="Delete"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border px-4 py-3 text-sm text-muted-foreground">
          <span>Showing {allCards.length} of 1,728 cards</span>
          <div className="flex items-center gap-1">
            <button className="rounded-md border border-border px-2.5 py-1 transition-colors hover:bg-accent">
              Previous
            </button>
            <button className="rounded-md border border-border px-2.5 py-1 transition-colors hover:bg-accent">
              Next
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Select({ label }: { label: string }) {
  return (
    <button className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium transition-colors hover:bg-accent">
      {label}
      <ChevronDown className="size-4 text-muted-foreground" />
    </button>
  );
}

function Chip({
  label,
  count,
  active,
  dot,
}: {
  label: string;
  count: number;
  active?: boolean;
  dot?: string;
}) {
  return (
    <button
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
        active
          ? "border-transparent bg-accent text-foreground"
          : "border-border text-muted-foreground hover:bg-accent/50"
      }`}
    >
      {dot ? <span className={`size-2 rounded-full ${dot}`} /> : null}
      {label}
      <span className="text-xs text-muted-foreground tabular-nums">
        {count}
      </span>
    </button>
  );
}
