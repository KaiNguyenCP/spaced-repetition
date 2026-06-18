import { paginate } from "@/lib";
import prisma from "@/lib/prisma";
import { PaginationParams } from "@/types/common";
import { CreateDeckBody, UpdateDeckBody } from "@/types/deck";

export const DeckRepo = {
  findAll: async (params: PaginationParams) => {
    const { page = 1, size = 10 } = params;
    const decks = await paginate({
      modelName: "deck",
      pageNumber: page,
      pageSize: size,
      include: {
        cards: true,
      },
    });

    return decks;
  },

  findById: async (id: string) => {
    const deck = await prisma.deck.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            cards: true,
          },
        },
        cards: {
          where: { nextReview: { lte: new Date() } },
          select: { id: true },
        },
      },
    });

    return deck;
  },

  create: async (data: CreateDeckBody) => {
    return prisma.deck.create({ data });
  },

  update: async (id: string, data: UpdateDeckBody) => {
    return prisma.deck.update({ where: { id }, data });
  },

  delete: async (id: string) => {
    return prisma.deck.delete({ where: { id } });
  },

  getDueCount: async (deckId: string) => {
    return prisma.card.count({
      where: {
        deckId,
        nextReview: { lte: new Date() },
      },
    });
  },
};
