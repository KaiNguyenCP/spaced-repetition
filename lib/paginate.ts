import { PaginationOptions } from "@/types/common";
import { ModelNames, PrismaFindManyArgs } from "@/types/common/prisma.types";
import prisma from "./prisma";

export async function paginate<
  ModelName extends ModelNames,
  Args extends PrismaFindManyArgs<ModelName>,
>(params: PaginationOptions<ModelName> & Args) {
  const {
    modelName,
    pageNumber = 1,
    pageSize = 10,
    where,
    orderBy,
    include,
  } = params;
  const modelDelegate = (prisma as any)[modelName];
  const skip = (pageNumber - 1) * pageSize;

  const [totalElements, data] = await prisma.$transaction([
    modelDelegate.count(),
    modelDelegate.findMany({
      skip,
      take: pageSize,
      orderBy: orderBy || { id: "desc" },
      include: include || {},
      where: where || {},
    }),
  ]);

  const totalPages = Math.ceil(totalElements / pageSize) || 1;

  return {
    content: data,
    pageNumber,
    pageSize,
    totalElements,
    totalPages,
    isLast: pageNumber >= totalPages,
  };
}
