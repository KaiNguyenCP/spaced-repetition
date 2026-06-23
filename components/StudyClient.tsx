"use client";
import { useState } from "react";
import { CardArea, CountsRow, TopBar } from "./features/study";
import { StudyClientProps } from "./types";
import { UpdateCardWrapper } from "./features/deck/UpdateCardWrapper";
import { MockCard } from "@/lib";
import { State } from "ts-fsrs";

export default function StudyClient({ deck }: StudyClientProps) {
  const learningCards = deck.cards.filter((c) => c.state === State.Learning);
  const [isUpdateCard, setUpdateCard] = useState(false);
  const [isCurrentCard, setCurrentCard] = useState<MockCard>(learningCards[0]);

  const done = deck.doneCards;
  const total = learningCards.length;
  const pct = Math.round((done / total) * 100);
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
      {isUpdateCard ? (
        <div className="w-full flex flex-1 items-center px-5 py-6 sm:px-8 sm:py-8">
          <div className="w-full">
            <UpdateCardWrapper
              card={isCurrentCard}
              setCardUpdated={setCurrentCard}
              setUpdateAction={setUpdateCard}
            />
          </div>
        </div>
      ) : (
        <CardArea cards={deck.cards} setCurrentCard={setCurrentCard} />
      )}
    </div>
  );
}
