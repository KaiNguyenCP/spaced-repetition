import { Deck } from "@/app/generated/prisma/client";
import { MockCard, MockDeck } from "@/lib";
import { CreateCardBody, UpdateCardBody } from "@/types/card";
import { Layers } from "lucide-react";

export type MiniProps = {
  icon: typeof Layers;
  label: string;
  value: string | number;
  tone?: string;
};

export type DeckFormData = {
  title: string;
  description?: string;
};

export type DeckFormProps = {
  initialData?: DeckFormData;
  onCancel: () => void;
  onSubmit: (
    data: DeckFormData,
  ) => Promise<{ success?: boolean; error?: string } | void>;
  submitLabel?: string;
  submittingLabel?: string;
  formTitle?: string;
};
export type CreateDeckFormProps = {
  setCreateAction: (value: boolean) => void;
};

export type UpdateDeckWrapperProps = {
  setUpdateAction: (value: boolean) => void;
  deck: Deck;
};
export type DeckPageClientProps = {
  decks: MockDeck[];
};

export type DeckGridProps = CreateDeckFormProps & DeckPageClientProps;

export type ToolbarProps = {
  setUpdateAction: (value: boolean) => void;
  setCreateCardAction: (value: boolean) => void;
  deleteAction: () => void;
};

export type CardFormProps = {
  initialData?: MockCard;
  deckId: string;
  onCancel: () => void;
  onSubmit: (
    data: CreateCardBody | UpdateCardBody,
  ) => Promise<{ success?: boolean; error?: string } | void>;
  submitLabel?: string;
  submittingLabel?: string;
  formTitle?: string;
};

export type CreateCardFormProps = {
  setCreateAction: (value: boolean) => void;
  deckId: string;
};

export type CardsTableProps = {
  setPreviewAction: (value: boolean) => void;
  deck: MockDeck;
  setCurrentCardPreview: (card: MockCard | null) => void;
};

export type PreviewCardProps = {
  card: MockCard | null;
  isOpen: boolean;
  isEditCard: boolean;
  onEditCard: (value: boolean) => void;
  onClose: (value: boolean) => void;
  setCardUpdated: (card: MockCard) => void;
};

export type UpdateCardWrapperProps = {
  setUpdateAction: (value: boolean) => void;
  setCardUpdated: (card: MockCard) => void;
  card: MockCard;
};
