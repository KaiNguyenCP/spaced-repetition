"use client";
import { useState } from "react";
import { AppShell } from "./AppShell";
import { Plus } from "lucide-react";
import { CreateDeckWrapper, DeckGrid, SearchAndFilters } from "./features/deck";
import { DeckPageClientProps } from "./types/Deck.type";

export function DeckPageClient({ decks }: DeckPageClientProps) {
  const [isCreateNew, setIsCreateNew] = useState(false);
  return (
    <AppShell
      active="Decks"
      title="Decks"
      subtitle={`${decks.length} decks · ${decks.reduce((a, d) => a + d.total, 0).toLocaleString()} cards total`}
      action={
        <button
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          onClick={() => {
            setIsCreateNew(true);
          }}
        >
          <Plus className="size-4" />
          <span className="hidden sm:inline">New deck</span>
        </button>
      }
    >
      {isCreateNew ? (
        <CreateDeckWrapper setCreateAction={setIsCreateNew} />
      ) : (
        <>
          <SearchAndFilters />
          <DeckGrid decks={decks} setCreateAction={setIsCreateNew} />
        </>
      )}
    </AppShell>
  );
}
