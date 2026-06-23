import { UpdateCardWrapperProps } from "@/components/types";
import { updateCardAction } from "@/actions/card.actions";
import { UpdateCardBody } from "@/types/card";
import { CardForm } from "./CardForm";

export const UpdateCardWrapper = ({
  card,
  setUpdateAction,
  setCardUpdated,
}: UpdateCardWrapperProps) => {
  const handleUpdate = async (data: UpdateCardBody) => {
    const result = await updateCardAction(card.id, data);
    if (!result.data) return;
    if (result.data && result.success) {
      setUpdateAction(false);
    }
    setCardUpdated({
      id: result.data.id,
      front: result.data.front,
      back: result.data.back,
      state: result.data.state,
      stability: result.data.stability,
      difficulty: result.data.difficulty,
      repetitions: result.data.repetitions,
      lapses: result.data.lapses,
      scheduledDays: result.data.scheduledDays,
      nextReview: result.data.nextReview,
      lastReviewed: result.data.lastReviewed ? result.data.lastReviewed : null,
      createdAt: result.data.createdAt,
      updatedAt: result.data.updatedAt,
      deckId: result.data.deckId,
      learningSteps: result.data.learningSteps,
    });

    return result;
  };

  return (
    <CardForm
      formTitle="Update Card"
      submitLabel="Save Changes"
      submittingLabel="Saving..."
      initialData={card}
      onCancel={() => setUpdateAction(false)}
      onSubmit={handleUpdate}
      deckId={card.deckId}
    />
  );
};
