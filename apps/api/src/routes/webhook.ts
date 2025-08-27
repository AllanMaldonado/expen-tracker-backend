import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { env } from '../../../../config/env.ts'
import { processUpdate } from '../../../bot/src/index.ts'

export const webhookRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    `/webhook/${env.TELEGRAM_WEBHOOK_SECRET}`,
    {
      schema: {
        tags: ['webhook'],
        description: 'Webhook for Telegram Bot',
      },
    },
    async (request, reply) => {
      try {
        const update = request.body;

        await processUpdate(update);

        return reply.status(200).send({ ok: true });
      } catch (error) {
        console.error("Erro no webhook:", error);
        return reply.status(500).send({ ok: false });
      }
    });
}