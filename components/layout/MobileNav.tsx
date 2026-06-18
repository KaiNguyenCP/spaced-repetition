import Link from "next/link";
import { NavProps } from "../types";

export const MobileNav = ({ nav, active }: NavProps) => {
  return (
    <nav className="flex justify-between overflow-x-auto border-b border-border px-3 py-2 lg:hidden">
      {nav.map((item) => {
        const isActive = item.label === active;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ${
              isActive ? "bg-primary/15 text-primary" : "text-muted-foreground"
            }`}
          >
            <Icon className="size-5.5" aria-label={item.label} />
          </Link>
        );
      })}
    </nav>
  );
};
