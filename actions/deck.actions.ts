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

export async function updateDeckAction(id: string, formData: CreateDeckBody) {
  const raw = {
    title: formData.get("title") as string,
    description: (formData.get("description") as string) || undefined,
  };

  const parsed = UpdateDeckSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.message };
  }

  const deck = await DeckRepo.update(id, parsed.data);
  if (!deck) return { error: "Không tìm thấy bộ thẻ" };

  revalidatePath("/");
  revalidatePath(`/decks/${id}`);
  return { data: deck };
}

export async function deleteDeckAction(id: string) {
  const deleted = await DeckRepo.delete(id);
  if (!deleted) return { error: "Không tìm thấy bộ thẻ" };
  revalidatePath("/");
  redirect("/");
}
