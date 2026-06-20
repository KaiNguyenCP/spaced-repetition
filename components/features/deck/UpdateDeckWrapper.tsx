import { UpdateDeckWrapperProps } from "@/components/types";
import { DeckForm } from "./DeckForm";
import { updateDeckAction } from "@/actions/deck.actions";
import { UpdateDeckBody } from "@/types/deck";

export const UpdateDeckWrapper = ({
  deck,
  setUpdateAction,
}: UpdateDeckWrapperProps) => {
  const handleUpdate = async (data: UpdateDeckBody) => {
    const result = await updateDeckAction(deck.id, data);
    if (result?.success) {
      setUpdateAction(false);
    }
    return result;
  };

  return (
    <DeckForm
      formTitle="Update Deck"
      submitLabel="Save Changes"
      submittingLabel="Saving..."
      initialData={{
        title: deck.title,
        description: deck.description || "",
      }}
      onCancel={() => setUpdateAction(false)}
      onSubmit={handleUpdate}
    />
  );
};
