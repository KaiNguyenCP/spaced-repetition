import { DeckService } from "@/services/deck.service";
import { globalErrorHandler } from "@/utils";

export const POST = globalErrorHandler(DeckService.create);
export const GET = globalErrorHandler(DeckService.getAll);
