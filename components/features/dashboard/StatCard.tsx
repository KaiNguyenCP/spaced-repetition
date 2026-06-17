import { Layers } from "lucide-react";

export const StatCard = ({
  icon: Icon,
  label,
  value,
  sub,
  tone = "text-foreground",
}: {
  icon: typeof Layers;
  label: string;
  value: string | number;
  sub: string;
  tone?: string;
}) => {
  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
      <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className="size-4" />
        {label}
      </div>
      <div
        className={`text-2xl font-semibold tracking-tight sm:text-3xl ${tone}`}
      >
        {value}
      </div>
      <div className="mt-1 text-xs text-muted-foreground">{sub}</div>
    </div>
  );
};
