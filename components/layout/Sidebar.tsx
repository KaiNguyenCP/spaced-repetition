import { NavProps } from "../types";
import { Logo } from "./Logo";
import { Nav } from "./Nav";
import { StreakCard } from "./StreakCard";

export const Sidebar = ({ active, nav }: NavProps) => {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
      <Logo />
      <Nav active={active} nav={nav} />
      <StreakCard />
    </aside>
  );
};
