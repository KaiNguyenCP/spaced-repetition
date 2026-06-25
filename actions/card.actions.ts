"use server";
import { CardRepo } from "@/repos/card.impl";
import { implementReview } from "@/services/card.service";
import {
  CreateCardBody,
  CreateCardSchema,
  ReviewCardSchema,
  UpdateCardBody,
  UpdateCardSchema,
} from "@/types/card";
import { revalidatePath } from "next/cache";
import { Grade } from "ts-fsrs";
import { Card } from "@/app/generated/prisma/client";

export async function createCardAction(data: CreateCardBody) {
  const parsed = CreateCardSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.message };
  }

  const card = await CardRepo.create(parsed.data);
  revalidatePath(`/decks/${data.deckId}`);
  return { data: card };
}

export async function updateCardAction(cardId: string, data: UpdateCardBody) {
  const parsed = UpdateCardSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.message };
  }

  const card = await CardRepo.update(cardId, parsed.data);
  revalidatePath("/");
  revalidatePath(`/decks/${data.deckId}`);
  return { data: card, success: true };
}

export async function deleteCardAction(deckId: string, cardId: string) {
  await CardRepo.delete(cardId);
  revalidatePath(`/decks/${deckId}`);
  return { success: true };
}

export async function reviewCardAction(
  deckId: string,
  cardId: string,
  rating: Grade,
  card: Card,
) {
  const parsed = ReviewCardSchema.safeParse({ rating });
  if (!parsed.success) {
    return { error: "Rating không hợp lệ" };
  }

  const cardReviewed = await implementReview(cardId, card, parsed.data.rating);
  return { data: cardReviewed };
}
