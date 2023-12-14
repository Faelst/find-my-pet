import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { registerOrg } from './register'

export const orgRoutes = async (app: FastifyInstance) => {
  app.post('/org', registerOrg)
  app.get('/org', (request: FastifyRequest, reply: FastifyReply) => {
    return reply.status(200).send(true)
  })
}
