import { MockDeck } from "@/lib";
import { CardWithContents } from "@/mapper/deck.mapper";
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

export type StudyDueClientProps = {
  cards: CardWithContents[];
};

export type CardViewProps = {
  card: CardWithContents | null;
  showAnswer: boolean;
};

export type CardAreaProps = {
  currentCard: CardWithContents | undefined;
  isFinished: boolean;
  onNext: () => void;
};
export type RatingButtonProps = {
  onRate: (rating: Grade) => void;
  card: CardWithContents;
};

export type CountsRowProps = {
  newCount: number;
  learning: number;
  review: number;
  relearning: number;
};

export type FooterActionProps = {
  onEditCard: (value: boolean) => void;
};
