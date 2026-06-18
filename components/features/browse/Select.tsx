import { ChevronDown } from "lucide-react";

export const Select = ({ label }: { label: string }) => {
  return (
    <button className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium transition-colors hover:bg-accent">
      {label}
      <ChevronDown className="size-4 text-muted-foreground" />
    </button>
  );
};
