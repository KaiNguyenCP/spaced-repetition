import { JapanVocabDto } from "@/types/card";
import { chromium } from "playwright";
import * as cheerio from "cheerio";


export const CrawlMinnaLessonRepo = {
  crawlMinnaLesson: async (lesson: number) => {
    const browser = await chromium.launch();

    const page = await browser.newPage();

    await page.goto(
      `https://www.vnjpclub.com/minna-no-nihongo/bai-${lesson}-tu-vung.html`,
      {
        waitUntil: "networkidle",
      },
    );

    await page.waitForSelector(".search_result");

    const html = await page.content();

    const $ = cheerio.load(html);

    const result: JapanVocabDto[] = [];

    $(".search_result tbody tr").each((_, row) => {
      const tds = $(row).find("td");

      if (tds.length < 5) return;

      result.push({
        vocabulary: $(tds[0]).text().trim(),
        chineseCharacters: $(tds[1]).text().trim(),
        sinoPronunciation: $(tds[2]).text().trim(),
        mean: $(tds[4]).text().trim(),
        audioUrl:
          "https://www.vnjpclub.com" +
          ($(tds[3]).find("audio").attr("src") ?? ""),
      });
    });

    await browser.close();

    return result;
  },
};
