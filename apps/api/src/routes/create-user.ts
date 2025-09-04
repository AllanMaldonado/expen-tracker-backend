import { eq } from 'drizzle-orm'
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { db } from '../db/connection.ts' 
import z from 'zod' 
import { schema } from '../db/index.ts'

export const createUserRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/users',
    {
      schema: {
        tags: ['users'],
        description: 'Create user', 
        body: z.object({
            telegram_id: z.string(), 
            first_name: z.string(), 
            last_name: z.string().optional(), 
            username: z.string().optional(), 
        })
      },
    },
    async (request, reply) => { 
      try {
        const { telegram_id, first_name, last_name, username } = request.body

        const [existingUser] = await db
          .select({ telegram_id: schema.users.telegram_id })
          .from(schema.users)
          .where(eq(schema.users.telegram_id, telegram_id))

        if (existingUser) {  
          return reply.status(409).send({ message: 'User already exists' })
        }

        const [insertedUser] = await db
          .insert(schema.users)
          .values({
            telegram_id, 
            first_name,
            last_name,
            username
          })
          .returning()

        if (!insertedUser) { 
          return reply.status(500).send({ message: 'Error creating user'})
        } 

        return reply.status(201).send({ 
          user: {
            id: insertedUser.id,
            telegram_id, 
            first_name,
            last_name,
            username
          },
        })
      } catch (error) { 
        return reply.status(500).send({ message: 'Internal server error'})
      }
    }
  )
}
