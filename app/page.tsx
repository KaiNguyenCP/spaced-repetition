import { HomeClient } from "./_components/HomeClient";
import { DeckRepo } from "@/repos/deck.impl";

export default async function HomePage() {
  const decks = await DeckRepo.findAll({ page: 1, size: 100 });
  return <HomeClient {...decks} />;
}
