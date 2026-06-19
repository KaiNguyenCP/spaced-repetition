"use client";
import { DeckFormProps } from "@/components/types";
import { SubmitEvent, useState } from "react";

export const DeckForm = ({
  initialData,
  onCancel,
  onSubmit,
  submitLabel = "Create",
  submittingLabel = "Creating...",
  formTitle = "Create Deck",
}: DeckFormProps) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || "",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a deck title");
      return;
    }

    setIsSubmitting(true);
    const result = await onSubmit({ title, description });
    setIsSubmitting(false);

    if (result && !result.success) {
      alert(result.error || "Something went wrong!");
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">{formTitle}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {initialData
              ? "Cập nhật thông tin bộ thẻ của bạn."
              : "Create a new collection of cards for spaced repetition."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-medium">Deck title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Japanese N5 Vocabulary"
              className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Common Japanese words and phrases for JLPT N5."
              className="w-full resize-none rounded-lg border border-border bg-background p-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
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
