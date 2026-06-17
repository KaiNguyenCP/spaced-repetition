import Link from "next/link";
import type { ReactNode } from "react";
import {
  LayoutDashboard,
  Layers,
  GraduationCap,
  ChartColumnIncreasing,
  Search,
  Settings,
  Brain,
  Flame,
  Plus,
} from "lucide-react";

type NavItem = { href: string; label: string; icon: typeof LayoutDashboard };

const nav: NavItem[] = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/decks", label: "Decks", icon: Layers },
  { href: "/study", label: "Study", icon: GraduationCap },
  { href: "/stats", label: "Statistics", icon: ChartColumnIncreasing },
  { href: "/browse", label: "Browse", icon: Search },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function AppShell({
  active,
  title,
  subtitle,
  action,
  children,
}: {
  active: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
        <div className="flex h-16 items-center gap-2.5 border-b border-sidebar-border px-6">
          <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Brain className="size-5" />
          </div>
          <span className="text-lg font-semibold tracking-tight">Recall</span>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-3">
          {nav.map((item) => {
            const isActive = item.label === active;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
                }`}
              >
                <Icon className="size-4.5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Streak card */}
        <div className="m-3 rounded-lg border border-sidebar-border bg-sidebar-accent/40 p-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Flame className="size-4 text-state-learning" />
            28-day streak
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Keep it up — review today to extend your streak.
          </p>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b border-border bg-background/80 px-5 backdrop-blur sm:px-8">
          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold tracking-tight sm:text-xl">
              {title}
            </h1>
            {subtitle ? (
              <p className="truncate text-sm text-muted-foreground">
                {subtitle}
              </p>
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

        {/* Mobile nav */}
        <nav className="flex gap-1 overflow-x-auto border-b border-border px-3 py-2 lg:hidden">
          {nav.map((item) => {
            const isActive = item.label === active;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ${
                  isActive
                    ? "bg-accent text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <main className="flex-1 px-5 py-6 sm:px-8 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
