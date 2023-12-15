import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import request from 'supertest'
import { app } from '@/app'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post('/org').send({
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
    })

    expect(response.statusCode).toEqual(201)
  })
})
