import { CardService } from "@/services/card.service";
import { globalErrorHandler } from "@/utils";

export const POST = globalErrorHandler(CardService.create);