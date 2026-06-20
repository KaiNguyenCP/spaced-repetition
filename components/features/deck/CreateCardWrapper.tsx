import { CreateCardFormProps } from "@/components/types";
import { createCardAction } from "@/actions/card.actions";
import { CreateCardBody } from "@/types/card";
import { CardForm } from "./CardForm";

export const CreateCardWrapper = ({
  setCreateAction,
  deckId,
}: CreateCardFormProps) => {
  const handleCreate = async (data: CreateCardBody) => {
    const result = await createCardAction(data);
    if (result) {
      setCreateAction(false);
    }
    return result;
  };

  return (
    <CardForm
      onCancel={() => setCreateAction(false)}
      onSubmit={handleCreate}
      deckId={deckId}
    />
  );
};
