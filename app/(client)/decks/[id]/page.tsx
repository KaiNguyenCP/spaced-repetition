import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Plus,
  Sparkles,
  Pencil,
  Settings2,
  Layers,
  Clock,
  TrendingUp,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { decks, STATE_META, type CardState } from "@/lib/mock-data";

export default async function DeckDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const deck = decks.find((d) => d.id === id);
  if (!deck) notFound();

  return (
    <AppShell
      active="True"
      title={deck.title}
      subtitle={deck.description}
      action={
        <Link
          href="/study"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Sparkles className="size-4" />
          <span className="hidden sm:inline">Study {deck.due}</span>
        </Link>
      }
    >
      <Link
        href="/decks"
        className="mb-5 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> All decks
      </Link>

      {/* Summary */}
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
          value="89%"
          tone="text-primary"
        />
      </section>

      {/* Toolbar */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <button className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium transition-colors hover:bg-accent">
          <Plus className="size-4" /> Add card
        </button>
        <button className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium transition-colors hover:bg-accent">
          <Pencil className="size-4" /> Edit deck
        </button>
        <button className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium transition-colors hover:bg-accent">
          <Settings2 className="size-4" /> Scheduling options
        </button>
      </div>

      {/* Cards table */}
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Front</th>
                <th className="px-4 py-3 font-medium">Back</th>
                <th className="px-4 py-3 font-medium">State</th>
                <th className="px-4 py-3 text-right font-medium">Stability</th>
                <th className="px-4 py-3 text-right font-medium">Difficulty</th>
                <th className="px-4 py-3 text-right font-medium">Reps</th>
                <th className="px-4 py-3 text-right font-medium">
                  Next review
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {deck.cards.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-10 text-center text-muted-foreground"
                  >
                    No cards loaded in this preview. Add a card to get started.
                  </td>
                </tr>
              ) : (
                deck.cards.map((c) => {
                  const meta = STATE_META[c.state as CardState];
                  return (
                    <tr
                      key={c.id}
                      className="transition-colors hover:bg-accent/40"
                    >
                      <td className="max-w-50 truncate px-4 py-3 font-medium">
                        {c.front}
                      </td>
                      <td className="max-w-65 truncate px-4 py-3 text-muted-foreground">
                        {c.back}
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
                        {c.stability.toFixed(1)}d
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">
                        {c.difficulty.toFixed(1)}
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">
                        {c.repetitions}
                      </td>
                      <td className="px-4 py-3 text-right text-muted-foreground">
                        {c.nextReview}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}

function Mini({
  icon: Icon,
  label,
  value,
  tone = "text-foreground",
}: {
  icon: typeof Layers;
  label: string;
  value: string | number;
  tone?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
        <Icon className="size-3.5" /> {label}
      </div>
      <div className={`text-2xl font-semibold tracking-tight ${tone}`}>
        {value}
      </div>
    </div>
  );
}
