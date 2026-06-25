import prisma from "@/lib/prisma";
import { CrawlMinnaLessonRepo } from "@/repos/JapanVocab.impl";

export const MinnaImportService = {
  async importLesson(lesson: number) {
    const vocabularies = await CrawlMinnaLessonRepo.crawlMinnaLesson(lesson);

    return prisma.$transaction(async (tx) => {
      const deck = await tx.deck.create({
        data: {
          title: `Minna No Nihongo - Lesson ${lesson}`,
          description: `Vocabulary lesson ${lesson}`,
          sourceType: "JAPANESE",
        },
      });

      const existingCards = await tx.card.findMany({
        where: {
          deckId: deck.id,
        },
        select: {
          contents: {
            select: {
              japanVocab: {
                select: {
                  vocabulary: true,
                },
              },
            },
          },
        },
      });

      const existingWords = new Set(
        existingCards
          .map((card) => card.contents[0]?.japanVocab?.vocabulary)
          .filter(Boolean),
      );

      const newVocabs = vocabularies.filter(
        (v) => !existingWords.has(v.vocabulary),
      );

      if (newVocabs.length === 0) {
        return {
          deck,
          imported: 0,
          total: existingWords.size,
        };
      }

      await Promise.all(
        newVocabs.map((vocab) =>
          tx.card.create({
            data: {
              deckId: deck.id,

              contents: {
                create: {
                  front: vocab.vocabulary,
                  back: vocab.mean,

                  japanVocab: {
                    create: {
                      vocabulary: vocab.vocabulary,
                      chineseCharacters: vocab.chineseCharacters,
                      sinoPronunciation: vocab.sinoPronunciation,
                      audioUrl: vocab.audioUrl,
                      mean: vocab.mean,
                    },
                  },
                },
              },
            },
          }),
        ),
      );

      return {
        deck,
        imported: newVocabs.length,
        total: existingWords.size + newVocabs.length,
      };
    });
  },
};
