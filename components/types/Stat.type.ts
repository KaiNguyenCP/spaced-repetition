import { Target } from "lucide-react";

export type KPIProps = {
  icon: typeof Target;
  label: string;
  value: string;
  delta: string;
  up?: boolean;
};

export type PanelProps = {
  title: string;
  icon: typeof Target;
  className?: string;
  children: React.ReactNode;
};

export type AnswerBreakdownPops = {
  label: string;
  pct: number;
  color: string;
};

export type StabilityBucketProps = { range: string; count: number };
export type StabilityBucketsProps = {
  maxBucket: number;
  stabilityBuckets: StabilityBucketProps[];
};

export type StatisticClientProps = {
  maxActivity: number;
  answerBreakdown: AnswerBreakdownPops[];
  maxBucket: number;
  stabilityBuckets: StabilityBucketProps[];
  totalState: number;
  maxForecast: number;
};
