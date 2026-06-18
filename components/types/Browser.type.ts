import { CardState } from "@/lib";

export type CardBrowser = {
  deckTitle: string;
  id: string;
  front: string;
  back: string;
  state: CardState;
  stability: number;
  difficulty: number;
  repetitions: number;
  lapses: number;
  scheduledDays: number;
  nextReview: string;
  lastReviewed: string | null;
};
