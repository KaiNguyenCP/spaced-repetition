import { LayoutDashboard } from "lucide-react";
import type { ReactNode } from "react";

export type HeaderProps = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
};

export type NavItem = {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
};

export type NavProps = {
  nav: NavItem[];
  active: string;
};

export type MainProps = {
  children: ReactNode;
} & NavProps &
  HeaderProps;

export type AppShellProps = Omit<MainProps, "nav">;
