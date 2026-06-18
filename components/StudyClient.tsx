import { CardArea, CountsRow, TopBar } from "./features/study";
import { StudyClientProps } from "./types";

export default function StudyClient({
  ratings,
  done,
  pct,
  total,
}: StudyClientProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <TopBar done={done} pct={pct} total={total} />
      <CountsRow />
      <CardArea ratings={ratings} />
    </div>
  );
}
