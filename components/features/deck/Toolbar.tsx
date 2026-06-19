import { ToolbarProps } from "@/components/types";
import { Pencil, Plus, Settings2, Trash2 } from "lucide-react";

export const Toolbar = ({ setUpdateAction, deleteAction }: ToolbarProps) => {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      <button className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium transition-colors hover:bg-accent">
        <Plus className="size-4" /> Add card
      </button>
      <button
        className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
        onClick={() => setUpdateAction(true)}
      >
        <Pencil className="size-4" /> Edit deck
      </button>

      <button
        className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
        onClick={() => deleteAction()}
      >
        <Trash2 className="size-4" /> Delete deck
      </button>
      <button className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium transition-colors hover:bg-accent">
        <Settings2 className="size-4" /> Scheduling options
      </button>
    </div>
  );
};
