import { FastifyInstance } from 'fastify'
import { sessionRoutes } from './sessions/routes'
import { orgRoutes } from './orgs/routes'
import { petRoutes } from './pets/routes'

export const appRoutes = async (app: FastifyInstance) => {
  app.register(sessionRoutes)
  app.register(orgRoutes)
  app.register(petRoutes)
}
