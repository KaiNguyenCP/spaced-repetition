import type { ReactNode } from "react";
import { NavProps } from "./Nav.type";
import { HeaderProps } from "./Header.type";

export type MainProps = {
  children: ReactNode;
} & NavProps &
  HeaderProps;
