import { notFound } from "next/navigation";
import { DeckPageClient } from "@/components/DeckPageClient";
import { DeckRepo } from "@/repos/deck.impl";
import { CardRepo } from "@/repos/card.impl";

type Props = { params: Promise<{ id: string }> };

// Server Component: fetch deck + cards trực tiếp từ service
export default async function DeckPage({ params }: Props) {
  const { id } = await params;

  const [deck, cards] = await Promise.all([
    DeckRepo.findById(id),
    CardRepo.findByDeck(id, { page: 1, size: 50 }),
  ]);

  if (!deck) notFound();

  return <DeckPageClient deck={deck} initialCards={cards.content} />;
}
