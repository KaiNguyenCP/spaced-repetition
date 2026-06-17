import { MiniProps } from "@/components/types/Deck.type";

export const Mini = ({
  icon: Icon,
  label,
  value,
  tone = "text-foreground",
}: MiniProps) => {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
        <Icon className="size-3.5" /> {label}
      </div>
      <div className={`text-2xl font-semibold tracking-tight ${tone}`}>
        {value}
      </div>
    </div>
  );
};
