import { FastifyInstance } from 'fastify'
import { createPet } from './create'
import { veriyJwt } from '../../middlewares/verify-jwt'

export const petRoutes = async (app: FastifyInstance) => {
  app.post('/pet', { onRequest: [veriyJwt] }, createPet)
}
