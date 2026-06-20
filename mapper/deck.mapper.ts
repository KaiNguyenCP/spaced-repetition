import { Prisma, Card } from "@/app/generated/prisma/client";
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

  const retention =
    deckIncludeCards.cards.reduce(
      (sum, card) => sum + getCardRetention(card),
      0,
    ) / deckIncludeCards.cards.length;

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
    retention,
    createdAt: deckIncludeCards.createdAt,
    updatedAt: deckIncludeCards.updatedAt,
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
      createdAt: card.createdAt,
      updatedAt: card.updatedAt,
      deckId: card.deckId,
    })),
  };
}

function getCardRetention(card: Card) {
  if (!card.lastReviewed || card.stability <= 0) {
    return 1;
  }
  const now = Date.now();

  const elapsedDays =
    (now - card.lastReviewed.getTime()) / (1000 * 60 * 60 * 24);

  return Math.pow(0.9, elapsedDays / card.stability);
}
