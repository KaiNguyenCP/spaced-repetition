import z from "zod";

export const BodySchema = z.record(z.string(), z.unknown());
