import { DeckWithCards } from "@/mapper/deck.mapper";
import { State } from "ts-fsrs";

export const STATE_META: Record<
  State,
  { label: string; color: string; bg: string; text: string }
> = {
  0: {
    label: "New",
    color: "bg-state-new",
    bg: "bg-state-new/15",
    text: "text-state-new",
  },
  1: {
    label: "Learning",
    color: "bg-state-learning",
    bg: "bg-state-learning/15",
    text: "text-state-learning",
  },
  2: {
    label: "Review",
    color: "bg-state-review",
    bg: "bg-state-review/15",
    text: "text-state-review",
  },
  3: {
    label: "Relearning",
    color: "bg-state-relearning",
    bg: "bg-state-relearning/15",
    text: "text-state-relearning",
  },
};

export type MockCard = {
  id: string;
  front: string;
  back: string;
  state: State;
  stability: number;
  difficulty: number;
  repetitions: number;
  lapses: number;
  scheduledDays: number;
  learningSteps: number;
  nextReview: Date;
  lastReviewed: Date | null;
  deckId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type MockDeck = {
  total: number;
  doneCards: number;
  due: number;
  newCount: number;
  learning: number;
  review: number;
  relearning: number;
  retention: number;
} & DeckWithCards;

// Aggregate stats for the dashboard
export const stats = {
  totalCards: 1728,
  totalDecks: 4,
  dueToday: 73,
  reviewsToday: 41,
  reviewGoal: 120,
  streak: 28,
  retention: 91,
  matureCards: 1043,
  youngCards: 462,
  newCards: 223,
  timeToday: "22m",
};

// Cards reviewed per day (last 14 days) — for the activity chart
export const reviewActivity = [
  { day: "Mon", count: 84 },
  { day: "Tue", count: 120 },
  { day: "Wed", count: 67 },
  { day: "Thu", count: 142 },
  { day: "Fri", count: 98 },
  { day: "Sat", count: 156 },
  { day: "Sun", count: 73 },
  { day: "Mon", count: 110 },
  { day: "Tue", count: 95 },
  { day: "Wed", count: 130 },
  { day: "Thu", count: 76 },
  { day: "Fri", count: 118 },
  { day: "Sat", count: 64 },
  { day: "Sun", count: 41 },
];

// Upcoming review forecast (next 7 days)
export const forecast = [
  { label: "Today", count: 73 },
  { label: "Tue", count: 58 },
  { label: "Wed", count: 91 },
  { label: "Thu", count: 44 },
  { label: "Fri", count: 67 },
  { label: "Sat", count: 102 },
  { label: "Sun", count: 39 },
];

// Card state distribution
export const stateDistribution = [
  { state: "New", count: 223, color: "bg-state-new" },
  { state: "Learning", count: 138, color: "bg-state-learning" },
  { state: "Review", count: 1043, color: "bg-state-review" },
  { state: "Relearning", count: 324, color: "bg-state-relearning" },
];

// 12-week study heatmap (0-4 intensity)
export const heatmap: number[] = Array.from({ length: 84 }, (_, i) => {
  const seed = (i * 9301 + 49297) % 233280;
  const r = seed / 233280;
  return Math.floor(r * 5);
});
