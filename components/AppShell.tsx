import {
  LayoutDashboard,
  Layers,
  GraduationCap,
  ChartColumnIncreasing,
  Search,
  Settings,
} from "lucide-react";
import { Main, Sidebar } from "./layout";
import { AppShellProps, NavItem } from "./types";

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
}: AppShellProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <Sidebar active={active} nav={nav} />

      <Main
        title={title}
        subtitle={subtitle}
        active={active}
        action={action}
        nav={nav}
      >
        {children}
      </Main>
    </div>
  );
}
