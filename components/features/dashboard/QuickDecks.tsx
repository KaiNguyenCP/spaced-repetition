import { Layers } from "lucide-react";
import { Card } from "./Card";
import { CardHeader } from "./CardHeader";
import Link from "next/link";

const decks = [
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
export const QuickDecks = () => {
  return (
    <Card>
      <CardHeader title="Decks due" icon={Layers} />
      <ul className="flex flex-col gap-1">
        {decks
          .filter((d) => d.due > 0)
          .map((d) => (
            <li key={d.id}>
              <Link
                href={`/decks/${d.id}`}
                className="flex items-center justify-between rounded-md px-2 py-2 text-sm transition-colors hover:bg-accent"
              >
                <span className="truncate pr-2">{d.title}</span>
                <span className="shrink-0 rounded-full bg-state-review/15 px-2 py-0.5 text-xs font-medium text-state-review">
                  {d.due}
                </span>
              </Link>
            </li>
          ))}
      </ul>
    </Card>
  );
};
