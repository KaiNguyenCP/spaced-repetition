"use client";
import { SubmitEvent, useState, useTransition } from "react";
import { AppShell } from "./AppShell";
import { Loader2, Plus } from "lucide-react";
import { CreateDeckWrapper, DeckGrid, SearchAndFilters } from "./features/deck";
import { DeckPageClientProps } from "./types/Deck.type";
import { importMinnaLessonAction } from "@/actions/import.action";

export function DeckPageClient({ decks }: DeckPageClientProps) {
  const [isCreateNew, setIsCreateNew] = useState(false);
  const [isJPImport, setJPImport] = useState(false);
  const [lessonNumber, setLessonNumber] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const handleImportSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const lesson = parseInt(lessonNumber, 10);

    if (isNaN(lesson) || lesson <= 0) {
      alert("Please enter a valid number of lessons!");
      return;
    }

    startTransition(async () => {
      const res = await importMinnaLessonAction(lesson);
      if (res.success) {
        setJPImport(false);
        setLessonNumber("");
      } else {
        alert(`Lỗi: ${res.error}`);
      }
    });
  };
  return (
    <AppShell
      active="Decks"
      title="Decks"
      subtitle={`[${decks.length} decks] · [${decks.reduce((a, d) => a + d.total, 0).toLocaleString()} cards total]`}
      action={
        <button
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          onClick={() => {
            setIsCreateNew(true);
          }}
        >
          <Plus className="size-4" />
          <span className="hidden sm:inline">New deck</span>
        </button>
      }
    >
      {isCreateNew ? (
        <CreateDeckWrapper setCreateAction={setIsCreateNew} />
      ) : (
        <>
          <SearchAndFilters setJPImportAction={setJPImport} />
          <DeckGrid decks={decks} setCreateAction={setIsCreateNew} />
        </>
      )}

      {isJPImport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-lg bg-background p-6 shadow-lg border border-border">
            <h3 className="text-lg font-semibold mb-2">
              Enter the Minna No Nihongo lesson.
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              The system will automatically crawl the vocabulary from this
              lesson and save it to the database.
            </p>

            <form onSubmit={handleImportSubmit}>
              <input
                type="number"
                min="1"
                placeholder="Ví dụ: 1, 2, 25..."
                disabled={isPending}
                value={lessonNumber}
                onChange={(e) => setLessonNumber(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 mb-4"
                required
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => setJPImport(false)}
                  className="rounded-md border border-input px-4 py-2 text-sm font-medium hover:bg-accent disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                >
                  {isPending && <Loader2 className="size-4 animate-spin" />}
                  {isPending ? "Data scraping..." : "Start Import"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppShell>
  );
}
