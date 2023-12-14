import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'

export const sessionRoutes = async (app: FastifyInstance) => {
  //   app.patch('/token/refresh', refresh)
  app.post('/session', authenticate)
}
