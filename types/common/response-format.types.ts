
export const StatusCodes = {
  Ok: 200,
  NoContent: 204,
  ValidationError: 422,
  NotFoundError: 404,
  ConflictError: 409,
  InternalServerError: 500,
  BadRequest: 400,
};

export interface ServerResponseType<T> {
  message?: string | undefined;
  error?: unknown;
  data?: T | undefined;
  status?: number | undefined;
}
