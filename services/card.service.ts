import { CardRepo } from "@/repos/card.impl";
import {
  PaginationParamsSchema,
  IdParameters,
  ParamSchema,
  RouteContext,
  NotFoundError,
} from "@/types/common";
import {
  CreateCardSchema,
  ReviewCardSchema,
  UpdateCardSchema,
} from "@/types/card";
import { serverResponse, validateBody, validateQuery } from "@/utils";
import { NextRequest } from "next/server";
import { createEmptyCard, generatorParameters, fsrs, Grade } from "ts-fsrs";
import { DeckRepo } from "@/repos/deck.impl";
import { Card } from "@/app/generated/prisma/client";

const f = fsrs(generatorParameters({ enable_fuzz: true }));
const cardNotFoundError = new NotFoundError("Card not found");
const deckNotFoundError = new NotFoundError("Deck not found");

export const CardService = {
  getByDeck: async (
    req: NextRequest,
    { params }: RouteContext<IdParameters>,
  ) => {
    const rawParams = await params;
    const { id: deckId } = ParamSchema.parse(rawParams);
    const queryParams = await validateQuery(req, PaginationParamsSchema);
    const cards = await CardRepo.findByDeck(deckId, queryParams);
    return serverResponse({
      data: cards,
      message: "Get cards by deck ID successfully.",
    });
  },

  getById: async (req: NextRequest, { params }: RouteContext<IdParameters>) => {
    const rawParams = await params;
    const { id: cardId } = ParamSchema.parse(rawParams);
    const card = await CardRepo.findById(cardId);
    if (!card) throw cardNotFoundError;

    return serverResponse({
      data: card,
      message: "Get card successfully.",
    });
  },

  getDueCards: async () => {
    const cards = await CardRepo.findDueCards();
    return serverResponse({
      data: cards,
      message: "Get due cards successfully.",
    });
  },

  create: async (req: NextRequest) => {
    const validatedData = await validateBody(req, CreateCardSchema);
    const foundDeck = DeckRepo.findById(validatedData.deckId);
    if (!foundDeck) throw deckNotFoundError;
    const card = await CardRepo.create(validatedData);
    return serverResponse({
      data: card,
      message: "Created card successfully.",
    });
  },

  update: async (req: NextRequest, { params }: RouteContext<IdParameters>) => {
    const rawParams = await params;
    const { id: cardId } = ParamSchema.parse(rawParams);
    const validatedData = await validateBody(req, UpdateCardSchema);
    const existing = await CardRepo.findById(cardId);
    if (!existing) throw cardNotFoundError;
    const foundDeck = await DeckRepo.findById(validatedData.deckId);
    if (!foundDeck) throw deckNotFoundError;
    const card = await CardRepo.update(cardId, validatedData);
    return serverResponse({
      data: card,
      message: "Updated card successfully.",
    });
  },

  review: async (req: NextRequest, { params }: RouteContext<IdParameters>) => {
    const rawParams = await params;
    const { id: cardId } = ParamSchema.parse(rawParams);
    const validatedData = await validateBody(req, ReviewCardSchema);
    const existing = await CardRepo.findById(cardId);
    if (!existing) throw cardNotFoundError;

    const cardUpdated = implementReview(cardId, existing, validatedData.rating);

    return serverResponse({
      data: cardUpdated,
      message: "Reviewed card successfully.",
    });
  },

  delete: async (req: NextRequest, { params }: RouteContext<IdParameters>) => {
    const rawParams = await params;
    const { id: cardId } = ParamSchema.parse(rawParams);
    const existing = await CardRepo.findById(cardId);
    if (!existing) throw cardNotFoundError;
    await CardRepo.delete(cardId);
    return serverResponse({
      message: "Deleted card successfully.",
    });
  },
};

export async function implementReview(
  id: string,
  existingCard: Card,
  rating: Grade,
) {
  const fsrsCard = createEmptyCard();
  fsrsCard.due = existingCard.nextReview;
  fsrsCard.difficulty = existingCard.difficulty;
  fsrsCard.stability = existingCard.stability;
  fsrsCard.lapses = existingCard.lapses;
  fsrsCard.reps = existingCard.repetitions;
  fsrsCard.state = existingCard.state as 0 | 1 | 2 | 3;
  fsrsCard.scheduled_days = existingCard.scheduledDays;
  fsrsCard.learning_steps = existingCard.learningSteps;
  fsrsCard.last_review = existingCard.lastReviewed ?? undefined;

  const now = new Date();
  const scheduled = f.next(fsrsCard, now, rating);

  const cardUpdated = await CardRepo.updateReview(id, {
    stability: scheduled.card.stability,
    difficulty: scheduled.card.difficulty,
    state: scheduled.card.state,
    repetitions: scheduled.card.reps,
    lapses: scheduled.card.lapses,
    nextReview: scheduled.card.due,
    lastReviewed: scheduled.card.last_review,
    scheduledDays: scheduled.card.scheduled_days,
    learningSteps: scheduled.card.learning_steps,
  });

  return cardUpdated;
}
