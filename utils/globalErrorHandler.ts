import { NextRequest, NextResponse } from "next/server";
import { APIError, StatusCodes, TransactionError } from "@/types/common";
import { serverResponse } from "./serverResponse";
import z, { ZodError } from "zod";

function handleError(err: Error | APIError | ZodError): Response {
  if (err instanceof APIError && err.code) {
    if (err instanceof TransactionError) console.error(err);

    return serverResponse({
      message: err.message,
      status: err.code || StatusCodes.BadRequest,
      error: err.err,
    });
  } else if (err instanceof ZodError) {
    const formatErrors = z.flattenError(err);
    return serverResponse({
      error: formatErrors.fieldErrors,
      message: "Validation errors.",
      status: StatusCodes.ValidationError,
    });
  }
  console.error(err);
  return serverResponse({
    error: "Internal Server Error",
    status: StatusCodes.InternalServerError,
  });
}

export function globalErrorHandler<TContext>(
  handler: (
    req: NextRequest,
    context: TContext,
  ) => Promise<NextResponse> | NextResponse,
) {
  return async (req: NextRequest, context: TContext) => {
    try {
      const res = await handler(req, context);
      return res;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return handleError(err);
    }
  };
}
