import { Prisma, Card } from "@/app/generated/prisma/client";
import { State } from "ts-fsrs";

const deckWithCardsArgs = {
  include: {
    cards: {
      include: {
        contents: {
          include: { japanVocab: true },
        },
      },
    },
  },
} satisfies Prisma.DeckFindManyArgs;

export type DeckWithCards = Prisma.DeckGetPayload<typeof deckWithCardsArgs>;

const cardWithContentsArgs = {
  include: {
    contents: {
      include: { japanVocab: true },
    },
  },
} satisfies Prisma.CardFindManyArgs;

export type CardWithContents = Prisma.CardGetPayload<typeof cardWithContentsArgs>;

export function toMockDeck(deckIncludeCards: DeckWithCards) {
  const now = new Date();

  const total = deckIncludeCards.cards.length;

  const doneCards = deckIncludeCards.cards.filter(
    (card: Card) => card.state !== State.New,
  ).length;

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
    total > 0
      ? deckIncludeCards.cards.reduce(
          (sum, card) => sum + getCardRetention(card),
          0,
        ) / total
      : 1;

  return {
    ...deckIncludeCards,
    total,
    doneCards,
    due,
    newCount,
    learning,
    review,
    relearning,
    retention,
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
