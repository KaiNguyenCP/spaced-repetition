import { decks } from "@/lib";
import { AppShell } from "./AppShell";
import { Plus } from "lucide-react";
import { DeckGrid, SearchAndFilters } from "./features/deck";

export function DeckPageClient() {
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
      <SearchAndFilters />
      <DeckGrid />
    </AppShell>
  );
}
