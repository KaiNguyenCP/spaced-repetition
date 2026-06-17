import { DeckService } from "@/services/deck.service";
import { globalErrorHandler } from "@/utils";

export const PUT = globalErrorHandler(DeckService.update);
export const GET = globalErrorHandler(DeckService.getById);
export const DELETE = globalErrorHandler(DeckService.delete);
