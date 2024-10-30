import { Markup, Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { Context } from "telegraf";
import { button } from "telegraf/markup";
import path from "path";
import Papa from "papaparse";
import fs from "fs";
import getTest from "./sanity";
interface MyContext extends Context {
  myProp?: string;
  myOtherProp?: number;
}

const BOT_TOKEN = "7675148055:AAGBJcZ9bFfTW6fDF2r1CYxztTbmOyxzcGM";
const bot = new Telegraf<MyContext>(BOT_TOKEN);
let currentPage = 0;
bot.start((ctx) => {
  ctx.reply("Привет, добро пожаловать в мой магазин", {
    ...Markup.inlineKeyboard([
      Markup.button.callback("Далее", "Next"),
      Markup.button.callback("Прев", "Prev"),
    ]),
  });
});

bot.action("Prev", async (ctx) => {
  currentPage -= 1;
  const test = await getTest(0);
  console.log(test);
});

bot.launch();
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
