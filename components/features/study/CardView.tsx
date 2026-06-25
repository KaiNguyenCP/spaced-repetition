import { CardViewProps } from "@/components/types";
import { formatDistanceToNow } from "date-fns";
import { Eye, Volume2 } from "lucide-react";
import { State } from "ts-fsrs";

export const stateLabel = (state: State) => {
  switch (state) {
    case State.New:
      return {
        label: "New",
        color: "state-new",
      };

    case State.Learning:
      return {
        label: "Learning",
        color: "state-learning",
      };

    case State.Review:
      return {
        label: "Review",
        color: "state-review",
      };

    case State.Relearning:
      return {
        label: "Relearning",
        color: "state-relearning",
      };

    default:
      return {
        label: "Unknown",
        color: "muted",
      };
  }
};

export const CardView = ({ card, showAnswer }: CardViewProps) => {
  if (!card) return null;

  const state = stateLabel(card.state);

  const content = card.contents?.[0];
  const vocab = content?.japanVocab;

  const isJapanese = !!vocab;

  const front = isJapanese ? vocab.vocabulary : (content?.front ?? "-");

  const back = isJapanese ? vocab.mean : (content?.back ?? "-");

  const subtitle = isJapanese ? vocab.chineseCharacters : null;

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm">
      {/* Front */}
      <div className="flex flex-col items-center gap-3 px-6 py-12 text-center">
        <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium">
          {state.label} ·{" "}
          {formatDistanceToNow(card.updatedAt, {
            addSuffix: true,
          })}
        </span>

        <p className="text-5xl font-semibold tracking-tight sm:text-6xl">
          {front}
        </p>

        {subtitle && (
          <p className="text-lg text-muted-foreground">{subtitle}</p>
        )}

        {vocab?.audioUrl && (
          <button
            className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            onClick={() => new Audio(vocab.audioUrl!).play()}
          >
            <Volume2 className="size-4" />
            Play audio
          </button>
        )}
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 px-6">
        <div className="h-px flex-1 bg-border" />

        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Eye className="size-3.5" />
          Answer
        </span>

        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Back */}
      <div className="flex flex-col items-center gap-3 px-6 py-10 text-center">
        <p
          className={
            showAnswer ? "text-2xl font-medium" : "blur-lg text-2xl font-medium"
          }
        >
          {back}
        </p>

        {isJapanese && vocab?.sinoPronunciation && (
          <p className="text-lg text-muted-foreground">
            {vocab.sinoPronunciation}
          </p>
        )}
      </div>
    </div>
  );
};
