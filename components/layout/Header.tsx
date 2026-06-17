import { Plus } from "lucide-react";
import Link from "next/link";
import { HeaderProps } from "../types";

export const Header = ({ title, subtitle, action }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b border-border bg-background/80 px-5 backdrop-blur sm:px-8">
      <div className="min-w-0">
        <h1 className="truncate text-lg font-semibold tracking-tight sm:text-xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="truncate text-sm text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>
      <div className="flex items-center gap-2">
        {action ?? (
          <Link
            href="/study"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Plus className="size-4" />
            <span className="hidden sm:inline">Add card</span>
          </Link>
        )}
        <div
          className="size-9 shrink-0 rounded-full bg-linear-to-br from-state-review to-state-new"
          aria-hidden
        />
      </div>
    </header>
  );
};
