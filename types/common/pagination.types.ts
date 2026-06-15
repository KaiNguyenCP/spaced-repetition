import z from "zod";
import { Delegate, ModelNames, PrismaFindManyArgs } from "./prisma.types";

export const PaginationParamsSchema = z.object({
  page: z.coerce.number().int().min(1).optional().catch(1),
  size: z.coerce.number().int().min(1).max(100).optional().catch(10),
});

export type PaginationParams = z.infer<typeof PaginationParamsSchema>;

// Define a type for pagination options, including model name, query filters, and pagination IdParameters
export type PaginationOptions<ModelName extends ModelNames> = {
  modelName: Delegate;
  where?: PrismaFindManyArgs<ModelName>["where"];
  orderBy?: PrismaFindManyArgs<ModelName>["orderBy"];
  include?: PrismaFindManyArgs<ModelName>["include"];
  pageNumber?: number;
  pageSize?: number;
};
