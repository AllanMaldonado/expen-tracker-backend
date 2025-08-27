import { Telegraf } from "telegraf";
import { env } from "../../../config/env.ts";

// Exportar o handler para uso em outros módulos
export const bot = new Telegraf(env.TELEGRAM_BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply(`
👋 Bem-vindo, ${ctx.from?.first_name}! ao seu assistente de controle de gastos!

🤖 Comandos:
 /addcat - Adicionar categoria
  `.trim());
});

async function setCommands() {
  await bot.telegram.setMyCommands([
    { command: "start", description: "Inicia o bot" }, 
    { command: "addcat", description: "Adicionar categoria" }, 
  ]);
}  

export const processUpdate = async (update: any) => {
    await bot.handleUpdate(update);
    setCommands();
};

