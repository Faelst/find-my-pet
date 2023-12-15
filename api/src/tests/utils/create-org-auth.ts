import { Org } from '@prisma/client'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export const createAndAuthenticationUser = async (app: FastifyInstance) => {
  const org = {
    email: 'example@email.com',
    name: 'John Doe',
    password: 'securePassword',
    cep: '12345678',
    latitude: 45.678,
    longitude: -123.456,
    address: '123 Main Street',
    whatsapp: '1234567890',
    city: 'Cityville',
    state: 'ST',
  }

  const newOrg = await request(app.server).post('/org').send(org)

  const sessionResponse = await request(app.server).post('/session').send({
    email: org.email,
    password: org.password,
  })

  const { token } = sessionResponse.body

  return {
    org: newOrg.body.org as Org,
    token,
  }
}
