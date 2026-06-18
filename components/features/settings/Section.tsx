import { SectionProps } from "@/components/types";

export const Section = ({
  title,
  icon: Icon,
  desc,
  children,
}: SectionProps) => {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-1 flex items-center gap-2">
        <Icon className="size-4 text-muted-foreground" />
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      {desc ? (
        <p className="mb-4 text-xs text-muted-foreground">{desc}</p>
      ) : (
        <div className="mb-4" />
      )}
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
};
