import z from "zod";

export const ParamSchema = z.object({
  id: z.uuid("The ID is not in the correct UUID format."),
});
export type IdParameters = z.infer<typeof ParamSchema>;

export const MockApiParamSchema = z.object({
  project: z
    .string()
    .min(1)
    .regex(
      /^[a-z0-9-]+$/,
      "Slugs can only contain lowercase letters, numbers, and hyphens.",
    ),
  resource: z
    .string()
    .min(1)
    .regex(
      /^[a-z0-9-]+$/,
      "Slugs can only contain lowercase letters, numbers, and hyphens.",
    ),
});
export type MockApiParameters = z.infer<typeof MockApiParamSchema>;

export const MockApiParamSchemaWithId = MockApiParamSchema.extend({
  id: ParamSchema.shape.id,
});
export type MockApiWithIdParameters = z.infer<typeof MockApiParamSchemaWithId>;
