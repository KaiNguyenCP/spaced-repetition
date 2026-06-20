import { CreateDeckFormProps } from "@/components/types";
import { DeckForm } from "./DeckForm";
import { createDeckAction } from "@/actions/deck.actions";
import { CreateDeckBody } from "@/types/deck";

export const CreateDeckWrapper = ({ setCreateAction }: CreateDeckFormProps) => {
  const handleCreate = async (data: CreateDeckBody) => {
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
