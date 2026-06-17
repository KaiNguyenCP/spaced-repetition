import { Pencil, Plus, Settings2 } from "lucide-react";

export const Toolbar = () => {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      <button className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium transition-colors hover:bg-accent">
        <Plus className="size-4" /> Add card
      </button>
      <button className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium transition-colors hover:bg-accent">
        <Pencil className="size-4" /> Edit deck
      </button>
      <button className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium transition-colors hover:bg-accent">
        <Settings2 className="size-4" /> Scheduling options
      </button>
    </div>
  );
};
