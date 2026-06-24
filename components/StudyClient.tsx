"use client";
import { useState } from "react";
import { CardArea, CountsRow, TopBar } from "./features/study";
import { StudyClientProps } from "./types";
import { UpdateCardWrapper } from "./features/deck/UpdateCardWrapper";

export default function StudyClient({ deck }: StudyClientProps) {
  const [isUpdateCard, setUpdateCard] = useState(false);
  const [sessionCardIds] = useState<string[]>(() =>
    deck.cards.map((c) => c.id),
  );
  const [currentSessionIndex, setCurrentSessionIndex] = useState(0);
  const currentCardId = sessionCardIds[currentSessionIndex] || null;
  const currentCard = deck.cards.find((c) => c.id === currentCardId);
  const handleNextCard = () => {
    setCurrentSessionIndex((prev) => prev + 1);
  };
  const done = deck.doneCards;
  const total = deck.total;
  const pct = Math.round((done / total) * 100);
  const isSessionFinished =
    currentSessionIndex >= sessionCardIds.length || !currentCardId;
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <TopBar
        done={done}
        pct={pct}
        total={total}
        title={deck.title}
        onEditCard={setUpdateCard}
      />
      <CountsRow deck={deck} />
      {isUpdateCard && currentCard ? (
        <div className="w-full flex flex-1 items-center px-5 py-6 sm:px-8 sm:py-8">
          <div className="w-full">
            <UpdateCardWrapper
              card={currentCard}
              setUpdateAction={setUpdateCard}
              setCardUpdated={() => {}}
            />
          </div>
        </div>
      ) : (
        <CardArea
          currentCard={currentCard}
          isFinished={isSessionFinished}
          onNext={handleNextCard}
        />
      )}
    </div>
  );
}
