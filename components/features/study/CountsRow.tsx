import { CountsRowProps } from "@/components/types";

export const CountsRow = ({
  newCount,
  learning,
  relearning,
  review,
}: CountsRowProps) => {
  return (
    <div className="flex items-center justify-center gap-4 border-b border-border py-2 text-xs">
      <span className="flex items-center gap-1.5 text-state-new">
        <span className="size-2 rounded-full bg-state-new" />
        {newCount} New
      </span>
      <span className="flex items-center gap-1.5 text-state-learning">
        <span className="size-2 rounded-full bg-state-learning" />
        {learning} Learn
      </span>
      <span className="flex items-center gap-1.5 text-state-review">
        <span className="size-2 rounded-full bg-state-review" />
        {review} Review
      </span>
      <span className="flex items-center gap-1.5 text-state-relearning">
        <span className="size-2 rounded-full bg-state-relearning" />
        {relearning} Relearning
      </span>
    </div>
  );
};
