import { notFound } from "next/navigation";
import { StudyClient } from "@/components/StudyClient";
import { DeckRepo } from "@/repos/deck.impl";
import { CardRepo } from "@/repos/card.impl";

type Props = { params: Promise<{ id: string }> };

export default async function StudyPage({ params }: Props) {
  const { id } = await params;

  const deck = await DeckRepo.findById(id);
  if (!deck) notFound();

  const dueCards = await CardRepo.findDueCards(id, { page: 1, size: 50 });

  return (
    <StudyClient
      deckId={id}
      deckTitle={deck.title}
      initialCards={dueCards.content}
    />
  );
}
