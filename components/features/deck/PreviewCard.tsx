import { Settings2, Trash2, X } from "lucide-react";
import { CardView } from "../study";
import { PreviewCardProps } from "@/components/types";
import { UpdateCardWrapper } from "./UpdateCardWrapper";
import { deleteCardAction } from "@/actions/card.actions";

export const PreviewCard = ({
  isOpen,
  onClose,
  card,
  isEditCard,
  onEditCard,
  setCardUpdated,
}: PreviewCardProps) => {
  if (!isOpen || !card) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={() => {
        onClose(false);
        onEditCard(false);
      }}
    >
      <div
        className="relative w-full max-w-5/6 lg:max-w-3xl rounded-2xl bg-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => {
            onClose(false);
          }}
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          aria-label="Close card"
        >
          <X className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => {
            onEditCard(true);
          }}
          className={
            isEditCard
              ? "hidden"
              : "absolute left-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
          }
          aria-label="Edit card"
        >
          <Settings2 className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => {
            deleteCardAction(card.deckId, card.id);
            onClose(false);
          }}
          className={
            isEditCard
              ? "hidden"
              : "absolute left-3 bottom-3 inline-flex h-9 w-9 items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-destructive"
          }
          aria-label="Delete card"
        >
          <Trash2 className="size-5" />
        </button>
        {isEditCard ? (
          <UpdateCardWrapper
            card={card}
            setUpdateAction={onEditCard}
            setCardUpdated={setCardUpdated}
          />
        ) : (
          <CardView card={card} />
        )}
      </div>
    </div>
  );
};
