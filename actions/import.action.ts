"use server";
import { MinnaImportService } from "@/services/crawlMinnaLesson.service";
import { revalidatePath } from "next/cache";

export async function importMinnaLessonAction(lesson: number) {
  try {
     await MinnaImportService.importLesson(lesson);
    revalidatePath("/decks");

    return { success: true };
  } catch (error: unknown) {
    console.error(error);
    return { success: true, error: error };
  }
}
