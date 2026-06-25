import StudyDueClient from "@/components/StudyDueClient";
import { CardRepo } from "@/repos/card.impl";
import { notFound } from "next/navigation";

export default async function StudyDuePage() {
  const cards = await CardRepo.findDueCards();
  if (!cards) notFound();

  return <StudyDueClient cards={cards} />;
}
