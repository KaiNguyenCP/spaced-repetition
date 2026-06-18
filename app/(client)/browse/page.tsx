import BrowseClient from "@/components/BrowserClient";
import { decks } from "@/lib";

// Flatten all cards across decks for the browser
const allCards = decks.flatMap((d) =>
  d.cards.map((c) => ({ ...c, deckTitle: d.title })),
);

export default function BrowsePage() {
  return <BrowseClient allCards={allCards} />;
}
