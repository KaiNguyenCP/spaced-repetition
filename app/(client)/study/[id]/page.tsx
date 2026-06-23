import StudyClient from "@/components/StudyClient";
import { toMockDeck } from "@/mapper/deck.mapper";
import { DeckRepo } from "@/repos/deck.impl";
import { notFound } from "next/navigation";

export default async function StudyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const deck = await DeckRepo.findById(id);
  if (!deck) notFound();
  const deckMappedOut = toMockDeck(deck);

  return <StudyClient deck={deckMappedOut} />;
}
