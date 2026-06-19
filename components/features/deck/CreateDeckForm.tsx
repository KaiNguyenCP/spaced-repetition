import { CreateDeckFormProps } from "@/components/types";
import { DeckForm } from "./DeckForm";
import { createDeckAction } from "@/actions/deck.actions";

export const CreateDeckWrapper = ({ setCreateAction }: CreateDeckFormProps) => {
  const handleCreate = async (data: {
    title: string;
    description?: string;
  }) => {
    const result = await createDeckAction(data);
    if (result?.success) {
      setCreateAction(false);
    }
    return result;
  };

  return (
    <DeckForm onCancel={() => setCreateAction(false)} onSubmit={handleCreate} />
  );
};
