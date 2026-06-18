export type RatingOBJ = {
  key: string;
  label: string;
  interval: string;
  sub: string;
  cls: string;
};

export type TopBarProps = {
  done: number;
  total: number;
  pct: number;
};

export type StudyClientProps = {
  ratings: RatingOBJ[];
} & TopBarProps;
