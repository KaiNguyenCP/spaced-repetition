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
  id: string;
  title: string;
  description: string;
  total: number;
  doneCards: number;
  due: number;
  newCount: number;
  learning: number;
  review: number;
  relearning: number;
  retention: number;
  createdAt: Date;
  updatedAt: Date;
  cards: MockCard[];
};

export const decks: MockDeck[] = [
  {
    id: "d1",
    title: "Japanese — JLPT N3 Vocabulary",
    description: "Core 2,000 words for the N3 level exam.",
    total: 842,
    due: 38,
    doneCards: 38,
    newCount: 12,
    learning: 9,
    review: 17,
    relearning: 6,
    retention: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
    cards: [
      {
        id: "c1",
        front: "影響",
        back: "えいきょう — influence, effect",
        state: 2,
        stability: 24.6,
        difficulty: 4.1,
        repetitions: 7,
        lapses: 1,
        learningSteps: 25,
        scheduledDays: 25,
        nextReview: new Date(),
        lastReviewed: new Date(),
        deckId: "d1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "c2",
        front: "提案",
        back: "ていあん — proposal, suggestion",
        state: 1,
        stability: 1.2,
        difficulty: 6.8,
        repetitions: 2,
        lapses: 0,
        learningSteps: 1,
        scheduledDays: 1,
        nextReview: new Date(),
        lastReviewed: new Date(),
        deckId: "d1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "c3",
        front: "効率",
        back: "こうりつ — efficiency",
        state: 0,
        stability: 0,
        difficulty: 0,
        repetitions: 0,
        lapses: 0,
        learningSteps: 0,
        scheduledDays: 0,
        nextReview: new Date(),
        lastReviewed: new Date(),
        deckId: "d1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "c4",
        front: "矛盾",
        back: "むじゅん — contradiction",
        state: 3,
        stability: 0.8,
        difficulty: 8.2,
        repetitions: 5,
        lapses: 3,
        learningSteps: 1,
        scheduledDays: 1,
        nextReview: new Date(),
        lastReviewed: new Date(),
        deckId: "d1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
  {
    id: "d2",
    title: "Biology — Cell Structure",
    description: "Organelles, membranes, and cellular transport.",
    total: 318,
    due: 21,
    doneCards: 38,
    newCount: 8,
    learning: 4,
    review: 9,
    relearning: 6,
    retention: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
    cards: [
      {
        id: "c5",
        front: "What is the function of the mitochondria?",
        back: "Produces ATP through cellular respiration — the powerhouse of the cell.",
        state: 2,
        stability: 41.2,
        deckId: "d1",
        difficulty: 3.4,
        repetitions: 9,
        lapses: 0,
        learningSteps: 41,
        scheduledDays: 41,
        nextReview: new Date(),
        lastReviewed: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "c6",
        front: "Define osmosis.",
        back: "The net movement of water across a semipermeable membrane from low to high solute concentration.",
        state: 2,
        stability: 12.0,
        difficulty: 5.0,
        repetitions: 4,
        lapses: 1,
        deckId: "d1",
        learningSteps: 12,
        scheduledDays: 12,
        nextReview: new Date(),
        lastReviewed: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
  {
    id: "d3",
    title: "System Design Interview",
    description: "Caching, load balancing, sharding, and CAP theorem.",
    total: 156,
    doneCards: 38,
    due: 14,
    newCount: 5,
    learning: 3,
    review: 6,
    relearning: 6,
    retention: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
    cards: [],
  },
  {
    id: "d4",
    title: "Spanish — Common Verbs",
    description: "The 300 most frequent verbs and conjugations.",
    total: 412,
    doneCards: 38,
    due: 0,
    newCount: 0,
    learning: 0,
    review: 0,
    relearning: 6,
    retention: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
    cards: [],
  },
];

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
