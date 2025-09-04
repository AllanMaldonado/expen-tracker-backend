import { Scenes, session } from "telegraf";
import { bot, setCommands } from "./bot.ts";
import { addCategoryScene } from "./commands/addcat.ts";
import { startScene } from "./commands/start.ts";

/* Setar Webhook novo (ngrok)

  import { deleteWebhook, getWebhookInfo, setWebhook } from "./webhook.ts";
  deleteWebhook()
  setWebhook()
  getWebhookInfo()

*/


const stage = new Scenes.Stage<Scenes.SceneContext>([startScene, addCategoryScene]);

bot.use(session());

bot.use(stage.middleware());

await setCommands();

bot.launch(); 


/* Iniciar Bot com Webhook:

  export const processUpdate = async (update: any) => {
    await bot.handleUpdate(update);
  };
  const initializeBot = async () => {
    // Configura session e stage
    bot.use(session());
    bot.use(stage.middleware());

    await setCommands();
  };
  initializeBot().catch(console.error);
*/

