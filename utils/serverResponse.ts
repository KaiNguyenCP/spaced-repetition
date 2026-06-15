import { ServerResponseType } from "@/types/common";
import { NextResponse } from "next/server";

export function serverResponse<T>(
  payload: ServerResponseType<T>,
): NextResponse<ServerResponseType<T>> {
  const { status = 200, message, error, data } = payload;
  const response: ServerResponseType<T> = { status };

  if (message) response.message = message;
  if (error) response.error = error;
  if (data) response.data = data;

  return NextResponse.json(response, { status: response.status });
}
