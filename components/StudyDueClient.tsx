"use client";
import { useState } from "react";
import { CardArea, CountsRow, TopBar } from "./features/study";
import { StudyDueClientProps } from "./types";
import { UpdateCardWrapper } from "./features/deck/UpdateCardWrapper";
import { Card } from "@/app/generated/prisma/client";
import { State } from "ts-fsrs";

export default function StudyDueClient({ cards }: StudyDueClientProps) {
  const [isUpdateCard, setUpdateCard] = useState(false);
  const [sessionCardIds] = useState<string[]>(() => cards.map((c) => c.id));
  const [currentSessionIndex, setCurrentSessionIndex] = useState(0);
  const currentCardId = sessionCardIds[currentSessionIndex] || null;
  const currentCard = cards.find((c) => c.id === currentCardId);
  const handleNextCard = () => {
    setCurrentSessionIndex((prev) => prev + 1);
  };
  const done = cards.length;
  const total = cards.length;
  const pct = Math.round((done / total) * 100);
  const isSessionFinished =
    currentSessionIndex >= sessionCardIds.length || !currentCardId;

  const newCount = cards.filter(
    (card: Card) => card.state === State.New,
  ).length;

  const learning = cards.filter(
    (card: Card) => card.state === State.Learning,
  ).length;

  const review = cards.filter(
    (card: Card) => card.state === State.Review,
  ).length;

  const relearning = cards.filter(
    (card: Card) => card.state === State.Relearning,
  ).length;

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <TopBar
        done={done}
        pct={pct}
        total={total}
        title="The cards that expire today!"
        onEditCard={setUpdateCard}
      />
      <CountsRow
        learning={learning}
        newCount={newCount}
        relearning={relearning}
        review={review}
      />
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
