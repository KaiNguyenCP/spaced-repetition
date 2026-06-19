import { MockDeck } from "@/lib";
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
  deck: DeckFormData;
};
export type DeckPageClientProps = {
  decks: MockDeck[];
};

export type DeckGridProps = CreateDeckFormProps & DeckPageClientProps;

export type ToolbarProps = CreateDeckFormProps;
