import { z } from "zod";

export const CreateDeckSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title too long"),
  description: z.string().max(500, "Description too long").optional(),
});

export const UpdateDeckSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional(),
});

export type CreateDeckBody = z.infer<typeof CreateDeckSchema>;
export type UpdateDeckBody = z.infer<typeof UpdateDeckSchema>;
