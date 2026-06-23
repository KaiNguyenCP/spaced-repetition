import { State } from "ts-fsrs";

export type CardBrowser = {
  deckTitle: string;
  id: string;
  front: string;
  back: string;
  state: State;
  stability: number;
  difficulty: number;
  repetitions: number;
  lapses: number;
  scheduledDays: number;
  nextReview: Date;
  lastReviewed: Date | null;
};
