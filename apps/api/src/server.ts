import { app } from './app.ts'
import { env } from '../../../config/env.ts'

const start = () => {
  try {
    app.listen({ port: env.PORT || 3333 }, () => {
      app.log.info(`Server listening at PORT: ${env.PORT}`)
    })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()