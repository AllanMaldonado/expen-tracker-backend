import { Telegraf, Scenes } from "telegraf";
import { api } from "../utils/api.ts";

export const addCategoryScene = new Scenes.BaseScene<Scenes.SceneContext>('ADD_CATEGORY');

addCategoryScene.enter(async (ctx) => {
  await ctx.reply('🏷️ Digite o nome da categoria:');
});

addCategoryScene.on('text', async (ctx) => {
  const categoryName = ctx.text;
  const telegramId = ctx.from.id;
  
  try {
    await api.post("/categories", {
      name: categoryName,
      telegram_id: telegramId.toString(),
    });
    await ctx.reply(`✅ Categoria "${categoryName}" adicionada!`);
  } catch (err: any) {
    console.error("Erro ao adicionar categoria:", {error: err.message}); 
    await ctx.reply("❌ Erro ao adicionar a categoria.");
  }
  
  await ctx.scene.leave();
});

