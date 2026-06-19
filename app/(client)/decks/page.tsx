import { DeckPageClient } from "@/components/DeckPageClient";
import { toMockDeck } from "@/mapper/deck.mapper";
import { DeckRepo } from "@/repos/deck.impl";

export default async function DecksPage() {
  const decks = await DeckRepo.findAll({ page: 1, size: 10 });
  const decksMappedOut = decks.content.map(toMockDeck);
  return <DeckPageClient decks={decksMappedOut} />;
}
