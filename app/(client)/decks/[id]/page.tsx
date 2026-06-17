import { notFound } from "next/navigation";
import { decks } from "@/lib/mock-data";
import { DeckDetailClient } from "@/components/DeckDetailClient";

export default async function DeckDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const deck = decks.find((d) => d.id === id);
  if (!deck) notFound();

  return <DeckDetailClient deck={deck} />;
}
