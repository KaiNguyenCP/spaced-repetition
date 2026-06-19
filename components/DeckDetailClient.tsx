"use client";
import { Sparkles } from "lucide-react";
import { AppShell } from "./AppShell";
import {
  CardsTable,
  CreateDeckWrapper,
  Summary,
  Toolbar,
} from "./features/deck";
import { MockDeck } from "@/lib";
import Link from "next/link";
import { useState } from "react";

export const DeckDetailClient = ({ deck }: { deck: MockDeck }) => {
  const [isCreateNew, setIsCreateNew] = useState(false);

  return (
    <AppShell
      active="Decks"
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
      {isCreateNew ? (
        <CreateDeckWrapper setCreateAction={setIsCreateNew} />
      ) : (
        <>
          <Summary deck={deck} />
          <Toolbar setCreateAction={setIsCreateNew} />
          <CardsTable deck={deck} />
        </>
      )}
    </AppShell>
  );
};
