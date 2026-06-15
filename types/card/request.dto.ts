import { z } from "zod";
import { UUIDSchema } from "../common";
import { Rating } from "ts-fsrs";

export const CreateCardSchema = z.object({
  deckId: UUIDSchema.shape.id,
  front: z.string().min(1, "Front is required").max(1000),
  back: z.string().min(1, "Back is required").max(1000),
});

export const UpdateCardSchema = CreateCardSchema;

export const ReviewCardSchema = z.object({
  rating: z.union([
    z.literal(Rating.Again),
    z.literal(Rating.Hard),
    z.literal(Rating.Good),
    z.literal(Rating.Easy),
  ]),
});

export type CreateCardBody = z.infer<typeof CreateCardSchema>;
export type UpdateCardBody = z.infer<typeof UpdateCardSchema>;
export type ReviewCardBody = z.infer<typeof ReviewCardSchema>;
