export const Chip = ({
  label,
  count,
  active,
  dot,
}: {
  label: string;
  count: number;
  active?: boolean;
  dot?: string;
}) => {
  return (
    <button
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
        active
          ? "border-transparent bg-accent text-foreground"
          : "border-border text-muted-foreground hover:bg-accent/50"
      }`}
    >
      {dot ? <span className={`size-2 rounded-full ${dot}`} /> : null}
      {label}
      <span className="text-xs text-muted-foreground tabular-nums">
        {count}
      </span>
    </button>
  );
};
