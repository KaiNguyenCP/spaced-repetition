export const CountsRow = () => {
  return (
    <div className="flex items-center justify-center gap-4 border-b border-border py-2 text-xs">
      <span className="flex items-center gap-1.5 text-state-new">
        <span className="size-2 rounded-full bg-state-new" /> 12 new
      </span>
      <span className="flex items-center gap-1.5 text-state-learning">
        <span className="size-2 rounded-full bg-state-learning" /> 23 learning
      </span>
      <span className="flex items-center gap-1.5 text-state-review">
        <span className="size-2 rounded-full bg-state-review" /> 38 review
      </span>
    </div>
  );
};
