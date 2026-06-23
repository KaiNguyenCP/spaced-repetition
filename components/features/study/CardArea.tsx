"use client";
import { useEffect, useState, useCallback } from "react"; // 1. Import thêm useCallback
import { CardAreaProps } from "@/components/types";
import { CardView } from "./CardView";
import { RevealHint } from "./RevealHint";
import { RatingButtons } from "./RatingButtons";
import { FooterActions } from "./FooterActions";
import { Grade, Rating } from "ts-fsrs";
import { Balloon, PartyPopper } from "lucide-react";
import Link from "next/link";
import { reviewCardAction } from "@/actions/card.actions";

export const CardArea = ({ cards, setCurrentCard }: CardAreaProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const currentCard = cards[currentIndex];

  const handleRate = useCallback(
    async (rating: Grade) => {
      if (!currentCard) return;

      await reviewCardAction(
        currentCard.deckId,
        currentCard.id,
        rating,
        currentCard,
      );
      setCurrentIndex((prev) => prev + 1);
      setShowAnswer(false);
    },
    [currentCard],
  );

  useEffect(() => {
    if (cards && cards.length > 0 && currentIndex < cards.length) {
      setCurrentCard(cards[currentIndex]);
    }
  }, [cards, currentIndex, setCurrentCard]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (event.code === "Space") {
        event.preventDefault();
        if (!showAnswer) {
          setShowAnswer(true);
        }
      }

      if (showAnswer) {
        switch (event.key) {
          case "1":
            handleRate(Rating.Again);
            break;
          case "2":
            handleRate(Rating.Hard);
            break;
          case "3":
            handleRate(Rating.Good);
            break;
          case "4":
            handleRate(Rating.Easy);
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showAnswer, handleRate]);

  if (!cards || cards.length === 0 || currentIndex >= cards.length) {
    return (
      <main className="flex flex-1 items-center justify-center p-6">
        <div className="flex flex-col items-center text-center space-y-6 bg-card p-8 rounded-2xl shadow-xl backdrop-blur-sm animate-in fade-in zoom-in-95 duration-300 md:min-w-xl">
          <div className="relative flex items-center justify-center gap-2 text-primary bg-primary/10 p-5 rounded-full ring-8 ring-primary/5 animate-bounce">
            <Balloon className="size-6 opacity-75 -rotate-12 translate-y-1" />
            <PartyPopper className="size-10 text-primary animate-pulse" />
            <Balloon className="size-6 opacity-75 rotate-12 translate-y-1" />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground bg-linear-to-r from-primary to-primary/70 bg-clip-text">
              Outstanding!
            </h2>
            <p className="text-muted-foreground text-sm max-w-70 leading-relaxed">
              You have successfully completed this review session. Keep up the
              great work!
            </p>
          </div>

          <Link
            href="/decks"
            aria-label="Exit session"
            className="w-full bg-primary text-primary-foreground font-medium py-2.5 px-4 rounded-xl shadow-lg shadow-primary/20 hover:opacity-90 active:scale-[0.98] transition-all text-sm"
          >
            Back to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-1 items-center justify-center px-5 py-8">
      <div className="w-full max-w-4xl">
        <CardView card={currentCard} showAnswer={showAnswer} />

        {!showAnswer ? (
          <div onClick={() => setShowAnswer(true)} className="cursor-pointer">
            <RevealHint />
          </div>
        ) : (
          <RatingButtons onRate={handleRate} card={currentCard} />
        )}

        <FooterActions />
      </div>
    </main>
  );
};
