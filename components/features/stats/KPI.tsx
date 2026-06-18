import { KPIProps } from "@/components/types";

export const KPI = ({ icon: Icon, label, value, delta, up }: KPIProps) => {
  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
      <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className="size-4" /> {label}
      </div>
      <div className="flex items-end justify-between gap-2">
        <span className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {value}
        </span>
        <span
          className={`text-xs font-medium ${up ? "text-primary" : "text-destructive"}`}
        >
          {delta}
        </span>
      </div>
    </div>
  );
};
