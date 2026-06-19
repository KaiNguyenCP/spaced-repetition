import { UpdateDeckWrapperProps } from "@/components/types";
import { DeckForm } from "./DeckForm";
import { updateDeckAction } from "@/actions/deck.actions"; // Giả định bạn có action này

export const UpdateDeckWrapper = ({
  deck,
  setUpdateAction,
}: UpdateDeckWrapperProps) => {
  const handleUpdate = async (data: {
    title: string;
    description?: string;
  }) => {
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
        description: deck.description,
      }}
      onCancel={() => setUpdateAction(false)}
      onSubmit={handleUpdate}
    />
  );
};
