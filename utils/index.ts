import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export * from "./globalErrorHandler";
export * from "./serverResponse";
export * from "./validate";
export * from "./objIsEmpty";
