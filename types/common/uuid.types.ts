import z from "zod";

export const UUIDSchema = z.object({
  id: z.uuid({
    error: (iss) => {
      if (iss.code === "invalid_type") {
        return { message: "This field is required." };
      } else if (iss.code === "invalid_format") {
        return { message: "The ID is not in the correct UUID format." };
      }
      return undefined;
    },
  }),
});
export type UUIDType = z.infer<typeof UUIDSchema>;
