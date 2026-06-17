import { CardService } from "@/services/card.service";
import { globalErrorHandler } from "@/utils";

export const DELETE = globalErrorHandler(CardService.delete);
export const PUT = globalErrorHandler(CardService.update);
export const GET = globalErrorHandler(CardService.getById);