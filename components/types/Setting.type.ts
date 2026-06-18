import { Gauge } from "lucide-react";
import type { ReactNode } from "react";

export type SectionProps = {
  title: string;
  icon: typeof Gauge;
  desc?: string;
  children: ReactNode;
};

export type FieldProps = {
  label: string;
  hint?: string;
  children: ReactNode;
};
export type RowProps = {
  label: string;
  desc: string;
  children: ReactNode;
};
