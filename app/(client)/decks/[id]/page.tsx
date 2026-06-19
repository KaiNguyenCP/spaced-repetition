import { notFound } from "next/navigation";
import { DeckDetailClient } from "@/components/DeckDetailClient";
import { DeckRepo } from "@/repos/deck.impl";
import { toMockDeck } from "@/mapper/deck.mapper";

export default async function DeckDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const deck = await DeckRepo.findById(id);
  if (!deck) notFound();
  const deckMappedOut = toMockDeck(deck);

  return <DeckDetailClient deck={deckMappedOut} />;
}
