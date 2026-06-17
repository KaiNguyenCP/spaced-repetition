import { CardHeaderProps } from "@/components/types";

export const CardHeader = ({ title, icon: Icon }: CardHeaderProps) => {
  return (
    <div className="mb-4 flex items-center gap-2">
      <Icon className="size-4 text-muted-foreground" />
      <h3 className="text-sm font-semibold">{title}</h3>
    </div>
  );
};
