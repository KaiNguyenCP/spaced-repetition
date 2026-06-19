"use client";
import { Sparkles } from "lucide-react";
import { AppShell } from "./AppShell";
import { CardsTable, Summary, Toolbar } from "./features/deck";
import { MockDeck } from "@/lib";
import Link from "next/link";
import { useState } from "react";
import { UpdateDeckWrapper } from "./features/deck/UpdateDeckWrapper";
import { Deck } from "@/app/generated/prisma/client";
import { deleteDeckAction } from "@/actions/deck.actions";

export const DeckDetailClient = ({ deck }: { deck: MockDeck }) => {
  const [isCreateNew, setIsCreateNew] = useState(false);
  const updateDeck: Deck = {
    id: deck.id,
    title: deck.title,
    description: deck.description,
    updatedAt: deck.updatedAt,
    createdAt: deck.createdAt,
  };

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
        <UpdateDeckWrapper setUpdateAction={setIsCreateNew} deck={updateDeck} />
      ) : (
        <>
          <Summary deck={deck} />
          <Toolbar
            setUpdateAction={setIsCreateNew}
            deleteAction={() => {
              deleteDeckAction(deck.id);
            }}
          />
          <CardsTable deck={deck} />
        </>
      )}
    </AppShell>
  );
};
