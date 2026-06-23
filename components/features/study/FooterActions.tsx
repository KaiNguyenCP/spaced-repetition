import { Flag, Settings2, Undo2 } from "lucide-react";

export const FooterActions = () => {
  return (
    <div className="mt-5 flex items-center justify-center gap-5 text-sm text-muted-foreground">
      <button className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
        <Undo2 className="size-4" /> Undo
      </button>
      <button className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
        <Flag className="size-4" /> Flag
      </button>
      <button className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
        <Settings2 className="size-4" /> Edit card
      </button>
    </div>
  );
};
