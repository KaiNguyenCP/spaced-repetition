import { Brain } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex h-16 items-center gap-2.5 border-b border-sidebar-border px-6">
      <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <Brain className="size-5" />
      </div>
      <span className="text-lg font-semibold tracking-tight">Recall</span>
    </div>
  );
};
