import { ArrowLeft, Link, Sparkles } from "lucide-react";
import { AppShell } from "./AppShell";
import { CardsTable, Summary, Toolbar } from "./features/deck";
import { MockDeck } from "@/lib";

export const DeckDetailClient = ({ deck }: { deck: MockDeck }) => {
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

      <Summary deck={deck} />
      <Toolbar />
      <CardsTable deck={deck} />
    </AppShell>
  );
};
