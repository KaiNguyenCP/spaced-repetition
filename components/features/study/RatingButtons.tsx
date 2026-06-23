import { RatingButtonProps } from "@/components/types";
import {
  CardInput,
  createEmptyCard,
  show_diff_message,
  fsrs,
  Rating,
  Grade,
} from "ts-fsrs";

export const RatingButtons = ({ card, onRate }: RatingButtonProps) => {
  const TIMEUNITFORMAT = ["s", "m", "h", "d", "m", "y"];
  const now = new Date();
  const scheduler = fsrs();
  const fsrsCard: CardInput = createEmptyCard();

  fsrsCard.due = card.nextReview;
  fsrsCard.difficulty = card.difficulty;
  fsrsCard.stability = card.stability;
  fsrsCard.lapses = card.lapses;
  fsrsCard.reps = card.repetitions;
  fsrsCard.state = card.state;
  fsrsCard.scheduled_days = card.scheduledDays;
  fsrsCard.learning_steps = card.learningSteps;
  fsrsCard.last_review = now;

  const preview = scheduler.repeat(fsrsCard, now);
  const cAgain = preview[Rating.Again].card;
  const prevDateAgain = cAgain.last_review ? cAgain.last_review : cAgain.due;
  const cHard = preview[Rating.Hard].card;
  const prevDateHard = cHard.last_review ? cHard.last_review : cHard.due;
  const cGood = preview[Rating.Good].card;
  const prevDateGood = cGood.last_review ? cGood.last_review : cGood.due;
  const cEasy = preview[Rating.Easy].card;
  const prevDateEasy = cEasy.last_review ? cEasy.last_review : cEasy.due;

  const ratings = [
    {
      key: Rating.Again,
      label: "Again",
      interval: show_diff_message(
        cAgain.due,
        prevDateAgain,
        true,
        TIMEUNITFORMAT,
      ),
      sub: "Forgot",
      cls: "border-state-relearning/40 bg-state-relearning/10 text-state-relearning hover:bg-state-relearning/20",
    },
    {
      key: Rating.Hard,
      label: "Hard",
      interval: show_diff_message(
        cHard.due,
        prevDateHard,
        true,
        TIMEUNITFORMAT,
      ),
      sub: "Difficult",
      cls: "border-state-learning/40 bg-state-learning/10 text-state-learning hover:bg-state-learning/20",
    },
    {
      key: Rating.Good,
      label: "Good",
      interval: show_diff_message(
        cGood.due,
        prevDateGood,
        true,
        TIMEUNITFORMAT,
      ),
      sub: "Recalled",
      cls: "border-state-review/40 bg-state-review/10 text-state-review hover:bg-state-review/20",
    },
    {
      key: Rating.Easy,
      label: "Easy",
      interval: show_diff_message(
        cEasy.due,
        prevDateEasy,
        true,
        TIMEUNITFORMAT,
      ),
      sub: "Effortless",
      cls: "border-state-new/40 bg-state-new/10 text-state-new hover:bg-state-new/20",
    },
  ];
  return (
    <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {ratings.map((r) => (
        <button
          onClick={() => {
            onRate(r.key as Grade);
          }}
          key={r.key}
          className={`flex flex-col items-center gap-0.5 rounded-xl border px-3 py-3 text-center transition-colors ${r.cls}`}
        >
          <span className="text-sm font-semibold">{r.label}</span>
          <span className="text-xs font-medium tabular-nums opacity-90">
            {r.interval}
          </span>
          <span className="text-[10px] text-muted-foreground">{r.sub}</span>
          <kbd className="mt-1 rounded border border-current/30 px-1.5 text-[10px] opacity-70">
            {r.key}
          </kbd>
        </button>
      ))}
    </div>
  );
};
