"use client";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { AppShell } from "./AppShell";
import {
  CardsTable,
  CreateCardWrapper,
  Summary,
  Toolbar,
  UpdateDeckWrapper,
} from "./features/deck";
import { Deck } from "@/app/generated/prisma/client";
import { deleteDeckAction } from "@/actions/deck.actions";
import { MockCard, MockDeck } from "@/lib";
import { PreviewCard } from "./features/deck/PreviewCard";

export const DeckDetailClient = ({ deck }: { deck: MockDeck }) => {
  const [isCreateNewDeck, setIsCreateNewDeck] = useState(false);
  const [isCreateNewCard, setIsCreateNewCard] = useState(false);
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [isCurrentCardPreview, setCurrentCardPreview] =
    useState<MockCard | null>(null);
  const [isEditCard, setIsEditCard] = useState(false);

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
      {isCreateNewDeck ? (
        <UpdateDeckWrapper
          setUpdateAction={setIsCreateNewDeck}
          deck={updateDeck}
        />
      ) : (
        <>
          <Summary deck={deck} />
          {isCreateNewCard ? (
            <CreateCardWrapper
              deckId={deck.id}
              setCreateAction={setIsCreateNewCard}
            />
          ) : (
            <>
              <Toolbar
                setCreateCardAction={setIsCreateNewCard}
                setUpdateAction={setIsCreateNewDeck}
                deleteAction={() => {
                  deleteDeckAction(deck.id);
                }}
              />
              <CardsTable
                deck={deck}
                setPreviewAction={setIsOpenPreview}
                setCurrentCardPreview={setCurrentCardPreview}
              />
              <PreviewCard
                isOpen={isOpenPreview}
                card={isCurrentCardPreview}
                onClose={setIsOpenPreview}
                isEditCard={isEditCard}
                onEditCard={setIsEditCard}
                setCardUpdated={setCurrentCardPreview}
              />
            </>
          )}
        </>
      )}
    </AppShell>
  );
};
