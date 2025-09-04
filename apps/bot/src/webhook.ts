import axios from 'axios'
import { env } from '../../../config/env.ts';  

export async function setWebhook() {
  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/setWebhook`,
      null,
      { params: { url: `${env.DEV_URL}/api/v1/webhook/${env.TELEGRAM_WEBHOOK_SECRET}` } }
    );

    console.log("Webhook set response:", response.data);
  } catch (error: any) {
    console.error("Error setting webhook:", error.response?.data || error.message);
  }
}

export async function getWebhookInfo() {
  try {
    const response = await axios.get(
      `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/getWebhookInfo`
    );

    console.log("Webhook info:", response.data);
  } catch (error: any) {
    console.error("Error getting webhook info:", error.response?.data || error.message);
  }
}

export async function deleteWebhook() {
  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/deleteWebhook`
    );
    console.log("Webhook deleted:", response.data);
  } catch (error: any) {
    console.error("Error deleting webhook:", error.response?.data || error.message);
  }
}
