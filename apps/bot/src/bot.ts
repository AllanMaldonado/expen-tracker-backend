import { Telegraf, Scenes, session } from "telegraf";
import { env } from "../../../config/env.ts";

export const bot = new Telegraf<Scenes.SceneContext>(env.TELEGRAM_BOT_TOKEN);

export const setCommands = async () => {
  bot.start(async (ctx) => {
    await ctx.scene.enter('START');
  });

  bot.command("addcat", async (ctx) => {
    await ctx.scene.enter('ADD_CATEGORY');
  });

  await bot.telegram.setMyCommands([
    { command: "start", description: "Inicia o bot" }, 
    { command: "addcat", description: "Adicionar categoria" }, 
  ]);
};
