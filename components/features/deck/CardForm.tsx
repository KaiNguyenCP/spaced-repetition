"use client";
import { CardFormProps } from "@/components/types";
import { SubmitEvent, useState } from "react";

export const CardForm = ({
  initialData,
  deckId,
  onCancel,
  onSubmit,
  submitLabel = "Create",
  submittingLabel = "Creating...",
  formTitle = "Create new Card",
}: CardFormProps) => {
  const [front, setFront] = useState(initialData?.contents[0].front || "");
  const [back, setBack] = useState(initialData?.contents[0].back || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    if (!front.trim()) {
      alert("Please enter a front content");
      return;
    }

    if (!back.trim()) {
      alert("Please enter a deck content");
      return;
    }

    setIsSubmitting(true);
    const result = await onSubmit({ deckId, front, back });
    setIsSubmitting(false);

    if (!result) {
      alert("Something went wrong!");
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">{formTitle}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {initialData
              ? "Update your card information."
              : "Create a new card."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Front */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Front side content
            </label>
            <input
              type="text"
              required
              value={front}
              onChange={(e) => setFront(e.target.value)}
              placeholder="こんにちは"
              className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Back side content
            </label>
            <input
              required
              value={back}
              onChange={(e) => setBack(e.target.value)}
              placeholder="Xin chào!"
              className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-between sm:justify-end gap-3 border-t border-border pt-6">
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-accent disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting ? submittingLabel : submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
