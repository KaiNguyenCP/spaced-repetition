import { CardBrowser } from "@/components/types/Browser.type";
import { CardState, STATE_META } from "@/lib";
import { Pencil, Trash2 } from "lucide-react";

export const TableBrowser = ({ allCards }: { allCards: CardBrowser[] }) => {
  return (
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
              <th className="px-4 py-3 text-right font-medium">Next review</th>
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
                      <span className={`size-1.5 rounded-full ${meta.color}`} />
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
  );
};
