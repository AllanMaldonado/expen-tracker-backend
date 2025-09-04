import { Telegraf, Context } from "telegraf";

export type BotCommandRegister = (bot: Telegraf) => void;

export interface TelegramUser {
  id: number;
  is_bot: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

export interface TypedContext extends Context {
  from: TelegramUser;
}
