import { StatusCodes } from "./response-format.types";

export class APIError extends Error {
  constructor(
    message: string,
    public code: number,
    public err?: unknown,
  ) {
    super(message);
    this.code = code;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class NotFoundError extends APIError {
  constructor(message: string, err?: unknown) {
    super(message, StatusCodes.NotFoundError, err);
  }
}

export class ConflictError extends APIError {
  constructor(message: string, err?: unknown) {
    super(message, StatusCodes.ConflictError, err);
  }
}

export class TransactionError extends APIError {
  constructor(message: string, err?: unknown) {
    super(message, StatusCodes.InternalServerError, err);
  }
}
