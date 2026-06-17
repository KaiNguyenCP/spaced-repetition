import { notFound } from "next/navigation";
import { DeckService } from "@/services/deck.service";
import { CardService } from "@/services/card.service";
import { DeckPageClient } from "@/app/_components/DeckPageClient";

type Props = { params: Promise<{ id: string }> };

// Server Component: fetch deck + cards trực tiếp từ service
export default async function DeckPage({ params }: Props) {
  const { id } = await params;

  const [deck, { data: cards }] = await Promise.all([
    DeckService.getById(id),
    CardService.getByDeck(id, 1, 100),
  ]);

  if (!deck) notFound();

  return <DeckPageClient deck={deck} initialCards={cards} />;
}
