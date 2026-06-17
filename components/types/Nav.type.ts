import { LayoutDashboard } from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
};

export type NavProps = {
  nav: NavItem[];
  active: string;
};
