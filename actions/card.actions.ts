"use server";
import { CardRepo } from "@/repos/card.impl";
import { implementReview } from "@/services/card.service";
import {
  CreateCardSchema,
  ReviewCardSchema,
  UpdateCardSchema,
} from "@/types/card";
import { revalidatePath } from "next/cache";
import { Grade } from "ts-fsrs";
import { Card } from "@/app/generated/prisma/client";

export async function createCardAction(deckId: string, formData: FormData) {
  const raw = {
    deckId,
    front: formData.get("front") as string,
    back: formData.get("back") as string,
  };

  const parsed = CreateCardSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.message };
  }

  const card = await CardRepo.create(parsed.data);
  revalidatePath(`/decks/${deckId}`);
  return { data: card };
}

export async function updateCardAction(
  deckId: string,
  cardId: string,
  formData: FormData,
) {
  const raw = {
    front: formData.get("front") as string,
    back: formData.get("back") as string,
  };

  const parsed = UpdateCardSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.message };
  }

  const card = await CardRepo.update(cardId, parsed.data);
  if (!card) return { error: "Không tìm thấy thẻ" };

  revalidatePath(`/decks/${deckId}`);
  return { data: card };
}

export async function deleteCardAction(deckId: string, cardId: string) {
  const deleted = await CardRepo.delete(cardId);
  if (!deleted) return { error: "Không tìm thấy thẻ" };
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
  if (!cardReviewed) return { error: "Không tìm thấy thẻ" };
  revalidatePath(`/study/${deckId}`);
  revalidatePath("/");
  return { data: cardReviewed };
}
