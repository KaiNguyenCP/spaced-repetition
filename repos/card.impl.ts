import { Prisma } from "@/app/generated/prisma/browser";
import { paginate } from "@/lib";
import prisma from "@/lib/prisma";
import { CreateCardBody, UpdateCardBody } from "@/types/card";
import { PaginationParams } from "@/types/common";

export const CardRepo = {
  findByDeck: async (deckId: string, params: PaginationParams) => {
    const { page = 1, size = 10 } = params;
    const cards = await paginate({
      modelName: "card",
      where: { deckId },
      orderBy: { createdAt: "desc" },
      pageNumber: page,
      pageSize: size,
    });
    return cards;
  },

  findById: async (id: string) => {
    return prisma.card.findUnique({ where: { id } });
  },

  findDueCards: async (deckId: string, params: PaginationParams) => {
    const { page = 1, size = 20 } = params;

    const cards = await paginate({
      modelName: "card",
      where: {
        deckId,
        nextReview: { lte: new Date() },
      },
      orderBy: { nextReview: "asc" },
      pageNumber: page,
      pageSize: size,
    });
    return cards;
  },

  create: async (data: CreateCardBody) => {
    return prisma.card.create({ data });
  },

  update: async (id: string, data: UpdateCardBody) => {
    return prisma.card.update({ where: { id }, data });
  },

  updateReview: async (id: string, data: Prisma.CardUpdateInput) => {
    return prisma.card.update({ where: { id }, data });
  },

  delete: async (id: string) => {
    return prisma.card.delete({ where: { id } });
  },

  countDue: async (deckId: string) => {
    return prisma.card.count({
      where: { deckId, nextReview: { lte: new Date() } },
    });
  },
};
