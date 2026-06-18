import { Prisma, Card } from "@/app/generated/prisma/client";
import { formatDistanceToNow } from "date-fns";
import { State } from "ts-fsrs";

const deckWithCardsArgs = {
  include: { cards: true },
} satisfies Prisma.DeckFindManyArgs;

export type DeckWithCards = Prisma.DeckGetPayload<typeof deckWithCardsArgs>;

export function toMockDeck(deckIncludeCards: DeckWithCards) {
  const now = new Date();

  const total = deckIncludeCards.cards.length;

  const due = deckIncludeCards.cards.filter(
    (card: Card) => card.nextReview <= now,
  ).length;

  const newCount = deckIncludeCards.cards.filter(
    (card: Card) => card.state === State.New,
  ).length;

  const learning = deckIncludeCards.cards.filter(
    (card: Card) => card.state === State.Learning,
  ).length;

  const review = deckIncludeCards.cards.filter(
    (card: Card) => card.state === State.Review,
  ).length;

  const relearning = deckIncludeCards.cards.filter(
    (card: Card) => card.state === State.Relearning,
  ).length;

  const updatedAt = formatDistanceToNow(deckIncludeCards.updatedAt, {addSuffix: true})

  return {
    id: deckIncludeCards.id,
    title: deckIncludeCards.title,
    description: deckIncludeCards.description ?? "",
    total,
    due,
    newCount,
    learning,
    review,
    relearning,
    updatedAt,
    cards: deckIncludeCards.cards.map((card: Card) => ({
      id: card.id,
      front: card.front,
      back: card.back,
      state: card.state,
      stability: card.stability,
      difficulty: card.difficulty,
      repetitions: card.repetitions,
      lapses: card.lapses,
      scheduledDays: card.scheduledDays,
      nextReview: card.nextReview.toISOString(),
      lastReviewed: card.lastReviewed ? card.lastReviewed.toISOString() : null,
    })),
  };
}
