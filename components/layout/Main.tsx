import { MainProps } from "../types";
import { Header } from "./Header";
import { MobileNav } from "./MobileNav";

export const Main = ({
  title,
  nav,
  children,
  active,
  subtitle,
  action,
}: MainProps) => {
  return (
    <div className="flex h-full min-w-0 flex-1 flex-col overflow-hidden">
      <Header title={title} subtitle={subtitle} action={action} />
      <MobileNav active={active} nav={nav} />
      <main className="flex-1 overflow-y-auto px-5 py-6 sm:px-8 sm:py-8">
        {children}
      </main>
    </div>
  );
};
