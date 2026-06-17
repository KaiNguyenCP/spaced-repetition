"use client";

import { useState, useTransition, useEffect, useCallback } from "react";
import Link from "next/link";
import { Card } from "@/app/generated/prisma/client";
import { reviewCardAction } from "@/actions/card.actions";
import { Grade } from "ts-fsrs";

type Props = {
  deckId: string;
  deckTitle: string;
  initialCards: Card[];
};

type RatingOption = {
  rating: 1 | 2 | 3 | 4;
  label: string;
  color: string;
  next: string;
  key: string;
};

const RATINGS: RatingOption[] = [
  {
    rating: 1,
    label: "Quên rồi",
    color: "bg-red-500 hover:bg-red-600",
    next: "5 phút",
    key: "1",
  },
  {
    rating: 2,
    label: "Khó",
    color: "bg-orange-500 hover:bg-orange-600",
    next: "1 ngày",
    key: "2",
  },
  {
    rating: 3,
    label: "Được",
    color: "bg-green-500 hover:bg-green-600",
    next: "3 ngày",
    key: "3",
  },
  {
    rating: 4,
    label: "Dễ",
    color: "bg-blue-500 hover:bg-blue-600",
    next: "7+ ngày",
    key: "4",
  },
];

export function StudyClient({ deckId, deckTitle, initialCards }: Props) {
  const [queue, setQueue] = useState<Card[]>(initialCards.slice(1));
  const [current, setCurrent] = useState<Card | null>(initialCards[0] ?? null);
  const [revealed, setRevealed] = useState(false);
  const [reviewed, setReviewed] = useState(0);
  const [done, setDone] = useState(initialCards.length === 0);
  const [isPending, startTransition] = useTransition();

  const total = reviewed + (current ? 1 : 0) + queue.length;
  const progress = total > 0 ? (reviewed / total) * 100 : 0;

  const handleRate = useCallback(
    (rating: Grade) => {
      if (!current || isPending) return;
      startTransition(async () => {
        await reviewCardAction(deckId, current.id, rating, current);

        setReviewed((r) => r + 1);
        if (queue.length === 0) {
          setDone(true);
          setCurrent(null);
        } else {
          setCurrent(queue[0]);
          setQueue((q) => q.slice(1));
          setRevealed(false);
        }
      });
    },
    [current, isPending, queue, deckId],
  );

  // Keyboard shortcuts
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (!current) return;
      if (!revealed && e.code === "Space") {
        e.preventDefault();
        setRevealed(true);
        return;
      }
      if (revealed) {
        const r = RATINGS.find((r) => r.key === e.key);
        if (r) handleRate(r.rating);
      }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current, revealed, handleRate]);

  // ── Hoàn thành ──
  if (done) {
    return (
      <div className="min-h-screen bg-[#0f0f14] flex flex-col items-center justify-center text-white px-6">
        <div className="text-center">
          <p className="text-6xl mb-6">🎉</p>
          <h1 className="text-2xl font-bold mb-2">Hoàn thành!</h1>
          <p className="text-white/50 mb-2">
            Bạn đã ôn{" "}
            <span className="text-white font-semibold">{reviewed}</span> thẻ
            trong phiên này.
          </p>
          <p className="text-white/30 text-sm mb-8">
            Hẹn gặp lại vào ngày mai 👋
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              href={`/decks/${deckId}`}
              className="bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-lg text-sm transition-colors"
            >
              Về bộ thẻ
            </Link>
            <Link
              href="/"
              className="bg-[#e84393] hover:bg-[#c73280] px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
            >
              Trang chủ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Review session ──
  return (
    <div className="min-h-screen bg-[#0f0f14] flex flex-col text-white">
      {/* Header + progress */}
      <header className="border-b border-white/10 px-6 py-4 flex items-center gap-4">
        <Link
          href={`/decks/${deckId}`}
          className="text-white/40 hover:text-white transition-colors text-sm shrink-0"
        >
          ← {deckTitle}
        </Link>
        <div className="flex-1">
          <div className="flex items-center justify-between text-xs text-white/30 mb-1.5">
            <span>
              {reviewed}/{total} thẻ
            </span>
            <span>{queue.length} còn lại</span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#e84393] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      {/* Card area */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        {current && (
          <div className="w-full max-w-2xl">
            {/* Flashcard */}
            <div
              onClick={() => !revealed && setRevealed(true)}
              className={`bg-[#1a1a24] border rounded-3xl p-10 text-center mb-8 transition-all ${
                revealed
                  ? "border-[#e84393]/30"
                  : "border-white/5 cursor-pointer hover:border-white/20"
              }`}
            >
              {/* Front */}
              <div className="mb-8">
                <p className="text-3xl font-bold leading-relaxed tracking-wide whitespace-pre-wrap">
                  {current.front}
                </p>
              </div>

              {/* Back — fade in on reveal */}
              <div
                className={`transition-all duration-300 ${
                  revealed ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <div className="border-t border-white/10 pt-8">
                  <p className="text-2xl text-white/80 leading-relaxed whitespace-pre-wrap">
                    {current.back}
                  </p>
                </div>
              </div>

              {!revealed && (
                <p className="text-white/30 text-sm mt-6">
                  Nhấp hoặc phím{" "}
                  <kbd className="bg-white/10 px-2 py-0.5 rounded text-xs">
                    Space
                  </kbd>{" "}
                  để xem đáp án
                </p>
              )}
            </div>

            {/* Rating buttons */}
            {revealed ? (
              <div>
                <p className="text-center text-white/30 text-xs mb-3">
                  Bạn nhớ tốt như thế nào?
                </p>
                <div className="grid grid-cols-4 gap-3">
                  {RATINGS.map((r) => (
                    <button
                      key={r.rating}
                      onClick={() => handleRate(r.rating)}
                      disabled={isPending}
                      className={`${r.color} disabled:opacity-40 rounded-xl py-3 text-sm font-semibold transition-colors`}
                    >
                      <div>{r.label}</div>
                      <div className="text-xs opacity-70 mt-0.5">{r.next}</div>
                    </button>
                  ))}
                </div>
                <p className="text-center text-white/20 text-xs mt-3">
                  Phím tắt: 1 2 3 4
                </p>
              </div>
            ) : (
              <div className="text-center">
                <button
                  onClick={() => setRevealed(true)}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-3 rounded-xl text-sm transition-colors"
                >
                  Xem đáp án
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
