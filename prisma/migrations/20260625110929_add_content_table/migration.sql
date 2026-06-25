/*
  Warnings:

  - You are about to drop the column `back` on the `cards` table. All the data in the column will be lost.
  - You are about to drop the column `front` on the `cards` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "source_type" AS ENUM ('japanese', 'normal');

-- AlterTable
ALTER TABLE "cards" DROP COLUMN "back",
DROP COLUMN "front";

-- AlterTable
ALTER TABLE "decks" ADD COLUMN     "sourceType" "source_type" NOT NULL DEFAULT 'normal';

-- CreateTable
CREATE TABLE "contents" (
    "id" UUID NOT NULL,
    "front" TEXT,
    "back" TEXT,
    "url_document" TEXT,
    "card_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "japan_vocab" (
    "id" UUID NOT NULL,
    "vocabulary" TEXT NOT NULL,
    "chinese_characters" TEXT,
    "sino_pronunciation" TEXT,
    "audio_url" TEXT,
    "mean" TEXT NOT NULL,
    "content_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "japan_vocab_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "contents_card_id_idx" ON "contents"("card_id");

-- CreateIndex
CREATE UNIQUE INDEX "japan_vocab_content_id_key" ON "japan_vocab"("content_id");

-- CreateIndex
CREATE INDEX "japan_vocab_content_id_idx" ON "japan_vocab"("content_id");

-- AddForeignKey
ALTER TABLE "contents" ADD CONSTRAINT "contents_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "japan_vocab" ADD CONSTRAINT "japan_vocab_content_id_fkey" FOREIGN KEY ("content_id") REFERENCES "contents"("id") ON DELETE CASCADE ON UPDATE CASCADE;
