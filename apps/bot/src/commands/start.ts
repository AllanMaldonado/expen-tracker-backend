import { Scenes } from "telegraf";
import { api } from "../utils/api.ts";
import type { TelegramUser } from "../types/bot.d.ts";

export const startScene = new Scenes.BaseScene<Scenes.SceneContext>('START');

startScene.enter(async (ctx) => {
  const user = ctx.from as TelegramUser;

  await ctx.reply(`Bem-vindo, ${user.first_name}! ao seu assistente de controle de gastos!`);

  await ctx.reply(
    `Olá ${user.first_name}! Quer criar uma conta?`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Sim", callback_data: "create_account" },
            { text: "Não", callback_data: "skip_account" }
          ]
        ]
      }
    }
  );
});

startScene.action("create_account", async (ctx) => {
  const user = ctx.from as TelegramUser;

  try {
    await api.post("/users", {
      telegram_id: user.id.toString(),
      first_name: user.first_name, 
      last_name: user.last_name, 
      username: user.username, 
    });

    await ctx.editMessageText(`✅ Sua conta foi registrada.`);
  } catch (err: any) {
    console.error("Erro ao cadastrar usuário:", {
      error: err.message,
    }); 

    await ctx.editMessageText("❌ Ocorreu um erro ao registrar sua conta.");
  }
  
  await ctx.scene.leave();
});

startScene.action("skip_account", async (ctx) => {
  await ctx.editMessageText("Tudo bem! Você pode criar a conta depois usando /start.");
  await ctx.scene.leave();
});