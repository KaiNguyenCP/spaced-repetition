"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { createDeckAction, deleteDeckAction } from "@/app/actions/deck.actions";
import { Deck } from "../generated/prisma/client";

export interface CardCount {
  totalCards: number;
  dueCards: number;
}

export type ContentItem = {
  _count?: CardCount;
} & Deck;

export interface PaginateResponse {
  content: ContentItem[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
}

export function HomeClient({ content: initialDecks }: PaginateResponse) {
  const [decks, setDecks] = useState(initialDecks);
  const [showCreate, setShowCreate] = useState(false);
  const [isPending, startTransition] = useTransition();

  const totalDue = decks.reduce((sum, d) => sum + (d._count!.dueCards ?? 0), 0);
  const totalCards = decks.reduce(
    (sum, d) => sum + (d._count!.totalCards ?? 0),
    0,
  );

  function handleCreate(formData: FormData) {
    startTransition(async () => {
      const result = await createDeckAction(formData);
      if (result?.data) {
        setDecks((prev) => [result.data, ...prev]);
        setShowCreate(false);
      }
    });
  }

  function handleDelete(id: string) {
    if (!confirm("Xoá bộ thẻ này? Tất cả thẻ bên trong cũng sẽ bị xoá."))
      return;
    startTransition(async () => {
      await deleteDeckAction(id);
      setDecks((prev) => prev.filter((d) => d.id !== id));
    });
  }

  return (
    <div className="min-h-screen bg-[#0f0f14] text-white">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🌸</span>
          <div>
            <h1 className="text-lg font-bold tracking-wide">NihongoSRS</h1>
            <p className="text-xs text-white/40">
              Spaced Repetition cho tiếng Nhật
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="bg-[#e84393] hover:bg-[#c73280] px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          + Bộ thẻ mới
        </button>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        {/* Stats banner */}
        {decks.length > 0 && (
          <div className="mb-8 bg-[#1a1a24] rounded-2xl p-6 flex items-center gap-8 border border-white/5">
            <div>
              <p className="text-3xl font-bold text-[#e84393]">{totalDue}</p>
              <p className="text-sm text-white/50 mt-1">thẻ cần ôn hôm nay</p>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div>
              <p className="text-3xl font-bold">{decks.length}</p>
              <p className="text-sm text-white/50 mt-1">bộ thẻ</p>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div>
              <p className="text-3xl font-bold">{totalCards}</p>
              <p className="text-sm text-white/50 mt-1">tổng số thẻ</p>
            </div>
          </div>
        )}

        {/* Deck list */}
        {decks.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">📚</p>
            <p className="text-white/50 mb-6">
              Chưa có bộ thẻ nào. Tạo bộ thẻ đầu tiên!
            </p>
            <button
              onClick={() => setShowCreate(true)}
              className="bg-[#e84393] hover:bg-[#c73280] px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Tạo bộ thẻ
            </button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {decks.map((deck) => (
              <div
                key={deck.id}
                className="bg-[#1a1a24] rounded-2xl border border-white/5 p-5 hover:border-[#e84393]/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h2 className="font-bold text-lg truncate">{deck.title}</h2>
                    {deck.description && (
                      <p className="text-white/40 text-sm mt-1 line-clamp-2">
                        {deck.description}
                      </p>
                    )}
                  </div>
                  {(deck._count!.dueCards ?? 0) > 0 && (
                    <span className="ml-3 bg-[#e84393]/20 text-[#e84393] text-xs font-bold px-2 py-1 rounded-full shrink-0">
                      {deck._count!.dueCards} cần ôn
                    </span>
                  )}
                </div>
                <p className="text-white/30 text-xs mb-4">
                  {deck._count!.totalCards ?? 0} thẻ
                </p>
                <div className="flex gap-2">
                  {(deck._count!.dueCards ?? 0) > 0 && (
                    <Link
                      href={`/study/${deck.id}`}
                      className="flex-1 bg-[#e84393] hover:bg-[#c73280] text-center py-2 rounded-lg text-sm font-semibold transition-colors"
                    >
                      Ôn ngay
                    </Link>
                  )}
                  <Link
                    href={`/decks/${deck.id}`}
                    className="flex-1 bg-white/5 hover:bg-white/10 text-center py-2 rounded-lg text-sm transition-colors"
                  >
                    Quản lý
                  </Link>
                  <button
                    onClick={() => handleDelete(deck.id)}
                    disabled={isPending}
                    className="px-3 py-2 text-white/30 hover:text-red-400 disabled:opacity-40 transition-colors text-sm"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Create modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a24] rounded-2xl border border-white/10 p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Tạo bộ thẻ mới</h2>
            <form action={handleCreate} className="space-y-3">
              <input
                autoFocus
                name="title"
                placeholder="Tên bộ thẻ *"
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#e84393]/50"
              />
              <textarea
                name="description"
                placeholder="Mô tả (tuỳ chọn)"
                rows={2}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#e84393]/50 resize-none"
              />
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreate(false)}
                  className="flex-1 bg-white/5 hover:bg-white/10 py-2.5 rounded-lg text-sm transition-colors"
                >
                  Huỷ
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 bg-[#e84393] hover:bg-[#c73280] disabled:opacity-40 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                >
                  {isPending ? "Đang tạo..." : "Tạo"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
