import { DeckRepo } from "@/repos/deck.impl";
import {
  PaginationParamsSchema,
  IdParameters,
  ParamSchema,
  RouteContext,
  NotFoundError,
} from "@/types/common";
import { CreateDeckSchema, UpdateDeckSchema } from "@/types/deck";
import { serverResponse, validateBody, validateQuery } from "@/utils";
import { NextRequest } from "next/server";

const deckNotFoundError = new NotFoundError("Deck not found");

export const DeckService = {
  getAll: async (req: NextRequest) => {
    const queryParams = await validateQuery(req, PaginationParamsSchema);
    const decks = await DeckRepo.findAll(queryParams);
    return serverResponse({
      data: decks,
      message: "Get decks successfully.",
    });
  },

  getById: async (req: NextRequest, { params }: RouteContext<IdParameters>) => {
    const rawParams = await params;
    const { id: deckId } = ParamSchema.parse(rawParams);
    const deck = await DeckRepo.findById(deckId);
    if (!deck) throw deckNotFoundError;

    return serverResponse({
      data: deck,
      message: "Get deck successfully.",
    });
  },

  create: async (req: NextRequest) => {
    const validatedData = await validateBody(req, CreateDeckSchema);
    const deck = await DeckRepo.create(validatedData);
    return serverResponse({
      data: deck,
      message: "Created deck successfully.",
    });
  },

  update: async (req: NextRequest, { params }: RouteContext<IdParameters>) => {
    const rawParams = await params;
    const { id: deckId } = ParamSchema.parse(rawParams);
    const validatedData = await validateBody(req, UpdateDeckSchema);
    const existing = await DeckRepo.findById(deckId);
    if (!existing) throw deckNotFoundError;
    const deck = await DeckRepo.update(deckId, validatedData);
    return serverResponse({
      data: deck,
      message: "Updated deck successfully.",
    });
  },

  delete: async (req: NextRequest, { params }: RouteContext<IdParameters>) => {
    const rawParams = await params;
    const { id: deckId } = ParamSchema.parse(rawParams);
    const existing = await DeckRepo.findById(deckId);
    if (!existing) throw deckNotFoundError;
    await DeckRepo.delete(deckId);
    return serverResponse({
      message: "Deleted deck successfully.",
    });
  },
};
