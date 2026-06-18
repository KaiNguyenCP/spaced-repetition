import { Plus } from "lucide-react";
import { AppShell } from "./AppShell";
import { Filters, StateFilterChips, TableBrowser } from "./features/browse";
import { CardBrowser } from "./types/Browser.type";

export default function BrowseClient({
  allCards,
}: {
  allCards: CardBrowser[];
}) {
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
      <Filters />
      <StateFilterChips allCards={allCards} />
      <TableBrowser allCards={allCards} />
    </AppShell>
  );
}
