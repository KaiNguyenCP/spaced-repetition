import { NextRequest } from "next/server";
import z from "zod";

export async function validateBody<T>(
  req: NextRequest,
  schema: z.Schema<T>,
  async: boolean = false,
): Promise<T> {
  const body = await req.json();
  if (async) return schema.parseAsync(body);
  return schema.parse(body);
}

export async function validateQuery<T>(
  req: NextRequest,
  schema: z.Schema<T>,
): Promise<T> {
  const searchParams = req.nextUrl.searchParams;
  const queryParams = schema.parse({
    page: searchParams.get("page"),
    size: searchParams.get("size"),
  });
  return schema.parse(queryParams);
}