import { TopBarProps } from "@/components/types";
import { Settings2, X } from "lucide-react";
import Link from "next/link";

export const TopBar = ({ done, total, pct }: TopBarProps) => {
  return (
    <header className="flex h-16 items-center justify-between gap-4 border-b border-border px-5 sm:px-8">
      <Link
        href="/decks"
        className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        aria-label="Exit session"
      >
        <X className="size-5" />
      </Link>
      <div className="flex flex-1 flex-col items-center gap-1.5">
        <div className="flex items-center gap-3 text-sm">
          <span className="font-medium">Japanese — JLPT N3 Vocabulary</span>
          <span className="text-muted-foreground tabular-nums">
            {done} / {total}
          </span>
        </div>
        <div className="h-1.5 w-full max-w-md overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
      <button
        className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        aria-label="Session settings"
      >
        <Settings2 className="size-5" />
      </button>
    </header>
  );
};
