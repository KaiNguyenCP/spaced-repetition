"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  createCardAction,
  updateCardAction,
  deleteCardAction,
} from "@/actions/card.actions";
import { Card, Deck } from "../app/generated/prisma/client";

type Props = {
  deck: Deck;
  initialCards: Card[];
};

const STATE_LABELS = ["Mới", "Học", "Ôn tập", "Thuộc"];
const STATE_COLORS = [
  "text-blue-400",
  "text-yellow-400",
  "text-green-400",
  "text-[#e84393]",
];

export function DeckPageClient({ deck, initialCards }: Props) {
  const [cards, setCards] = useState(initialCards);
  const [showAdd, setShowAdd] = useState(false);
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleAddCard(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await createCardAction(deck.id, formData);
      if (result?.error) {
        setError(result.error);
        return;
      }
      if (result?.data) {
        setCards((prev) => [result.data, ...prev]);
        setShowAdd(false);
      }
    });
  }

  function handleUpdateCard(formData: FormData) {
    if (!editingCard) return;
    setError(null);
    startTransition(async () => {
      const result = await updateCardAction(deck.id, editingCard.id, formData);
      if (result?.error) {
        setError(result.error);
        return;
      }
      if (result?.data) {
        setCards((prev) =>
          prev.map((c) => (c.id === editingCard.id ? result.data : c)),
        );
        setEditingCard(null);
      }
    });
  }

  function handleDeleteCard(cardId: string) {
    if (!confirm("Xoá thẻ này?")) return;
    startTransition(async () => {
      await deleteCardAction(deck.id, cardId);
      setCards((prev) => prev.filter((c) => c.id !== cardId));
    });
  }

  return (
    <div className="min-h-screen bg-[#0f0f14] text-white">
      <header className="border-b border-white/10 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link
            href="/"
            className="text-white/40 hover:text-white transition-colors text-sm"
          >
            ← Trang chủ
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="font-bold text-lg truncate">{deck.title}</h1>
            {deck.description && (
              <p className="text-white/40 text-sm truncate">
                {deck.description}
              </p>
            )}
          </div>
          {(deck.dueCount ?? 0) > 0 && (
            <Link
              href={`/study/${deck.id}`}
              className="bg-[#e84393] hover:bg-[#c73280] px-4 py-2 rounded-lg text-sm font-semibold transition-colors shrink-0"
            >
              Ôn {deck.dueCount} thẻ
            </Link>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-white/40 text-sm">{cards.length} thẻ</p>
          <button
            onClick={() => setShowAdd(true)}
            className="bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg text-sm transition-colors border border-white/10"
          >
            + Thêm thẻ
          </button>
        </div>

        {cards.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🃏</p>
            <p className="text-white/40 mb-4">Chưa có thẻ nào</p>
            <button
              onClick={() => setShowAdd(true)}
              className="bg-[#e84393] hover:bg-[#c73280] px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
            >
              Thêm thẻ đầu tiên
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {cards.map((card) => (
              <div
                key={card.id}
                className="bg-[#1a1a24] rounded-xl border border-white/5 p-4 flex items-start gap-4"
              >
                <div className="flex-1 grid grid-cols-2 gap-4 min-w-0">
                  <div>
                    <p className="text-xs text-white/30 mb-1">Mặt trước</p>
                    <p className="text-sm font-medium whitespace-pre-wrap">
                      {card.front}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-white/30 mb-1">Mặt sau</p>
                    <p className="text-sm text-white/70 whitespace-pre-wrap">
                      {card.back}
                    </p>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <p
                    className={`text-xs font-semibold ${STATE_COLORS[card.state] ?? "text-white/40"}`}
                  >
                    {STATE_LABELS[card.state] ?? "?"}
                  </p>
                  <p className="text-xs text-white/20 mt-1">
                    {card.repetitions} lần ôn
                  </p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button
                    onClick={() => setEditingCard(card)}
                    className="p-2 text-white/30 hover:text-white transition-colors text-sm"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDeleteCard(card.id)}
                    disabled={isPending}
                    className="p-2 text-white/30 hover:text-red-400 disabled:opacity-40 transition-colors text-sm"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Add card modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a24] rounded-2xl border border-white/10 p-6 w-full max-w-lg">
            <h2 className="text-lg font-bold mb-4">Thêm thẻ mới</h2>
            <form action={handleAddCard}>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-white/40 mb-1 block">
                    Mặt trước (tiếng Nhật)
                  </label>
                  <textarea
                    autoFocus
                    name="front"
                    placeholder="例: 日本語"
                    required
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#e84393]/50 resize-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/40 mb-1 block">
                    Mặt sau (nghĩa / cách đọc)
                  </label>
                  <textarea
                    name="back"
                    placeholder="例: Tiếng Nhật"
                    required
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#e84393]/50 resize-none"
                  />
                </div>
              </div>
              {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
              <div className="flex gap-3 mt-5">
                <button
                  type="button"
                  onClick={() => {
                    setShowAdd(false);
                    setError(null);
                  }}
                  className="flex-1 bg-white/5 hover:bg-white/10 py-2.5 rounded-lg text-sm transition-colors"
                >
                  Huỷ
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 bg-[#e84393] hover:bg-[#c73280] disabled:opacity-40 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                >
                  {isPending ? "Đang thêm..." : "Thêm thẻ"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit card modal */}
      {editingCard && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a24] rounded-2xl border border-white/10 p-6 w-full max-w-lg">
            <h2 className="text-lg font-bold mb-4">Chỉnh sửa thẻ</h2>
            <form action={handleUpdateCard}>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-white/40 mb-1 block">
                    Mặt trước
                  </label>
                  <textarea
                    name="front"
                    defaultValue={editingCard.front}
                    required
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#e84393]/50 resize-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/40 mb-1 block">
                    Mặt sau
                  </label>
                  <textarea
                    name="back"
                    defaultValue={editingCard.back}
                    required
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#e84393]/50 resize-none"
                  />
                </div>
              </div>
              {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
              <div className="flex gap-3 mt-5">
                <button
                  type="button"
                  onClick={() => {
                    setEditingCard(null);
                    setError(null);
                  }}
                  className="flex-1 bg-white/5 hover:bg-white/10 py-2.5 rounded-lg text-sm transition-colors"
                >
                  Huỷ
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 bg-[#e84393] hover:bg-[#c73280] disabled:opacity-40 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                >
                  {isPending ? "Đang lưu..." : "Lưu"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
