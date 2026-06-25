import prisma from "@/lib/prisma";
import { CrawlMinnaLessonRepo } from "@/repos/JapanVocab.impl";

export const MinnaImportService = {
  async importLesson(lesson: number) {
    const vocabularies = await CrawlMinnaLessonRepo.crawlMinnaLesson(lesson);

    const deck = await prisma.deck.create({
      data: {
        title: `Minna No Nihongo - Lesson ${lesson}`,
        description: `Vocabulary lesson ${lesson}`,
        sourceType: "JAPANESE",
      },
    });
    await Promise.all(
      vocabularies.map((vocab) =>
        prisma.card.create({
          data: {
            deckId: deck.id,

            contents: {
              create: {
                front: vocab.vocabulary,
                back: vocab.mean,

                japanVocab: {
                  create: {
                    vocabulary: vocab.vocabulary,
                    chineseCharacters: vocab.chineseCharacters || null,
                    sinoPronunciation: vocab.sinoPronunciation || null,
                    audioUrl: vocab.audioUrl || null,
                    mean: vocab.mean,
                  },
                },
              },
            },
          },
        }),
      ),
    );
  },
};
