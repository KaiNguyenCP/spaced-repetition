"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  CreateDeckBody,
  CreateDeckSchema,
  UpdateDeckBody,
  UpdateDeckSchema,
} from "@/types/deck";
import { DeckRepo } from "@/repos/deck.impl";

export async function createDeckAction(data: CreateDeckBody) {
  const parsed = CreateDeckSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.message };
  }

  await DeckRepo.create(parsed.data);
  revalidatePath("/decks");
  return { success: true };
}

export async function updateDeckAction(id: string, data: UpdateDeckBody) {
  const parsed = UpdateDeckSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.message };
  }

  const deck = await DeckRepo.update(id, parsed.data);
  revalidatePath("/");
  revalidatePath(`/decks/${id}`);
  return { data: deck, success: true };
}

export async function deleteDeckAction(id: string) {
  await DeckRepo.delete(id);
  revalidatePath("/decks");
  redirect("/decks");
}
