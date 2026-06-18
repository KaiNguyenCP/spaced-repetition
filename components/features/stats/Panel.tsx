import { PanelProps } from "@/components/types";

export const Panel = ({
  title,
  icon: Icon,
  className = "",
  children,
}: PanelProps) => {
  return (
    <div className={`rounded-xl border border-border bg-card p-5 ${className}`}>
      <div className="mb-4 flex items-center gap-2">
        <Icon className="size-4 text-muted-foreground" />
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  );
};
