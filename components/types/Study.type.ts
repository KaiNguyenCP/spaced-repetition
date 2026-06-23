import { MockCard, MockDeck } from "@/lib";
import { Grade } from "ts-fsrs";

export type TopBarProps = {
  done: number;
  total: number;
  pct: number;
  title: string;
  onEditCard: (value: boolean) => void;
};

export type StudyClientProps = {
  deck: MockDeck;
};

export type CardViewProps = {
  card: MockCard | null;
  showAnswer: boolean;
};

export type CardAreaProps = {
  cards: MockCard[];
  setCurrentCard: (value: MockCard) => void;
};
export type RatingButtonProps = {
  onRate: (rating: Grade) => void;
  card: MockCard;
};
