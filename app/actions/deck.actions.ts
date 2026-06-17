"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CreateDeckSchema, UpdateDeckSchema } from "@/types/deck";
import { DeckRepo } from "@/repos/deck.impl";

export async function createDeckAction(formData: FormData) {
  const raw = {
    title: formData.get("title") as string,
    description: (formData.get("description") as string) || undefined,
  };

  const parsed = CreateDeckSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.message };
  }

  const deck = await DeckRepo.create(parsed.data);
  revalidatePath("/");
  return { data: deck };
}

export async function updateDeckAction(id: string, formData: FormData) {
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
