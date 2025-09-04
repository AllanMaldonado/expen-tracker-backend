import { eq } from 'drizzle-orm'
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { db } from '../db/connection.ts' 
import z from 'zod' 
import { schema } from '../db/index.ts' 

export const createCategoryRoute: FastifyPluginCallbackZod = (app) => {
    app.post(
        '/categories',
        {
            schema: {
                tags: ['categories'],
                description: 'Create category',
                body: z.object({
                    telegram_id: z.string(),
                    name: z.string()
                })
            }
        },
        async (request, reply) => {
            const { telegram_id, name } = request.body

            const [existingUser] = await db
                .select({
                    id: schema.users.id,
                    telegram_id: schema.users.telegram_id,
                })
                .from(schema.users)
                .where(eq(schema.users.telegram_id, telegram_id))
                .limit(1)


            if (!existingUser) {
                return reply.status(409).send({ message: 'User not registred!' })
            }

            const [insertedCategory] = await db
                .insert(schema.categories)
                .values({
                    user_id: existingUser.id,
                    name
                }) 
                .returning()
                
            if(!insertedCategory){
                return reply.status(500).send({
                    message: 'failed to create category'
                })
            }

            return reply.status(201).send({categoryId: insertedCategory.id})
        }
    )
}