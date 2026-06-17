import Link from "next/link";
import { NavProps } from "../types";

export const MobileNav = ({ nav, active }: NavProps) => {
  return (
    <nav className="flex gap-1 overflow-x-auto border-b border-border px-3 py-2 lg:hidden">
      {nav.map((item) => {
        const isActive = item.label === active;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ${
              isActive ? "bg-accent text-foreground" : "text-muted-foreground"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};
