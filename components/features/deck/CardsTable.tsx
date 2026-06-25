import { CardsTableProps } from "@/components/types";
import { STATE_META } from "@/lib";
import { format } from "date-fns";
import { EyeDashed, Volume2 } from "lucide-react";
import { State } from "ts-fsrs";

export const CardsTable = ({
  deck,
  setPreviewAction,
  setCurrentCardPreview,
}: CardsTableProps) => {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              {deck.sourceType === "JAPANESE" ? (
                <>
                  <th className="px-4 py-3 font-medium">Vocabulary</th>
                  <th className="px-4 py-3 font-medium">Chinese Characters</th>
                  <th className="px-4 py-3 font-medium">Sino Pronunciation</th>
                  <th className="px-4 py-3 font-medium">Audio</th>
                  <th className="px-4 py-3 font-medium">Meaning</th>
                </>
              ) : (
                <>
                  <th className="px-4 py-3 font-medium">Front</th>
                  <th className="px-4 py-3 font-medium">Back</th>
                </>
              )}

              <th className="px-4 py-3 font-medium">State</th>
              <th className="px-4 py-3 text-right font-medium">Stability</th>
              <th className="px-4 py-3 text-right font-medium">Difficulty</th>
              <th className="px-4 py-3 text-right font-medium">Reps</th>
              <th className="px-4 py-3 text-right font-medium">Next Review</th>
              <th className="px-4 py-3 text-center font-bold">@</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {deck.cards.length === 0 ? (
              <tr>
                <td
                  colSpan={deck.sourceType === "JAPANESE" ? 11 : 8}
                  className="px-4 py-10 text-center text-muted-foreground"
                >
                  No cards loaded in this preview. Add a card to get started.
                </td>
              </tr>
            ) : (
              deck.cards.map((card) => {
                const meta = STATE_META[card.state as State];
                const content = card.contents?.[0];
                const vocab = content?.japanVocab;

                return (
                  <tr
                    key={card.id}
                    className="transition-colors hover:bg-accent/40"
                  >
                    {deck.sourceType === "JAPANESE" ? (
                      <>
                        <td className="px-4 py-3 font-medium">
                          {vocab?.vocabulary ?? "-"}
                        </td>

                        <td className="px-4 py-3">
                          {vocab?.chineseCharacters ?? "-"}
                        </td>

                        <td className="px-4 py-3">
                          {vocab?.sinoPronunciation ?? "-"}
                        </td>

                        <td className="px-4 py-3">
                          {vocab?.audioUrl ? (
                            <button
                              type="button"
                              onClick={() => new Audio(vocab.audioUrl!).play()}
                              className="rounded-md p-2 hover:bg-accent"
                            >
                              <Volume2 className="size-4" />
                            </button>
                          ) : (
                            "-"
                          )}
                        </td>

                        <td className="max-w-72 truncate px-4 py-3 text-muted-foreground">
                          {vocab?.mean ?? "-"}
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="max-w-50 truncate px-4 py-3 font-medium">
                          {content?.front ?? "-"}
                        </td>

                        <td className="max-w-65 truncate px-4 py-3 text-muted-foreground">
                          {content?.back ?? "-"}
                        </td>
                      </>
                    )}

                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${meta.bg} ${meta.text}`}
                      >
                        <span
                          className={`size-1.5 rounded-full ${meta.color}`}
                        />
                        {meta.label}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">
                      {card.stability.toFixed(1)}d
                    </td>

                    <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">
                      {card.difficulty.toFixed(1)}
                    </td>

                    <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">
                      {card.repetitions}
                    </td>

                    <td className="px-4 py-3 text-right text-muted-foreground">
                      {format(card.nextReview, "HH:mm dd/MM/yyyy")}
                    </td>

                    <td className="text-center">
                      <button
                        className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
                        onClick={() => {
                          setCurrentCardPreview(card);
                          setPreviewAction(true);
                        }}
                      >
                        <EyeDashed className="size-5" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
