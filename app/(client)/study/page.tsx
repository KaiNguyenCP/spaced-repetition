import StudyClient from "@/components/StudyClient";

const ratings = [
  {
    key: "1",
    label: "Again",
    interval: "<1m",
    sub: "Forgot",
    cls: "border-state-relearning/40 bg-state-relearning/10 text-state-relearning hover:bg-state-relearning/20",
  },
  {
    key: "2",
    label: "Hard",
    interval: "8m",
    sub: "Difficult",
    cls: "border-state-learning/40 bg-state-learning/10 text-state-learning hover:bg-state-learning/20",
  },
  {
    key: "3",
    label: "Good",
    interval: "4d",
    sub: "Recalled",
    cls: "border-state-review/40 bg-state-review/10 text-state-review hover:bg-state-review/20",
  },
  {
    key: "4",
    label: "Easy",
    interval: "9d",
    sub: "Effortless",
    cls: "border-state-new/40 bg-state-new/10 text-state-new hover:bg-state-new/20",
  },
];

export default function StudyPage() {
  const done = 35;
  const total = 73;
  const pct = Math.round((done / total) * 100);

  return <StudyClient done={done} pct={pct} ratings={ratings} total={total} />;
}
