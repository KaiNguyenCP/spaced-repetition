import { Prisma } from "@/app/generated/prisma/client";

// Define a union type of all model names available in Prisma
export type ModelNames =
  (typeof Prisma.ModelName)[keyof typeof Prisma.ModelName];

export type Delegate = Uncapitalize<ModelNames>;

// Define a type for Prisma operations specific to a given model
export type PrismaOperations<ModelName extends ModelNames> =
  Prisma.TypeMap["model"][ModelName]["operations"];

// Define a type for Prisma findMany arguments specific to a given model
export type PrismaFindManyArgs<ModelName extends ModelNames> =
  PrismaOperations<ModelName>["findMany"]["args"];
