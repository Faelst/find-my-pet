import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import request from 'supertest'
import { app } from '@/app'
import { CreatePetUseCaseDto } from '@/use-cases/create-pet'
import { createAndAuthenticationUser } from '@/tests/utils/create-org-auth'

describe('Create (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be create pet', async () => {
    const { token, org } = await createAndAuthenticationUser(app)

    const petPayload = {
      dogSize: 'BIG',
      environment: 'LARGE',
      independenceLevel: 'HIGH',
      name: 'jon dog',
      orgId: org.id,
      requirements: JSON.stringify({ abc: 'abc' }),
      about: 'something about dog',
      age: 'ELDERLY',
      avaible: true,
    } as CreatePetUseCaseDto

    const createPetResponse = await request(app.server)
      .post('/pet')
      .set('Authorization', `Bearer ${token}`)
      .send(petPayload)

    const expectResponse = {
      ...petPayload,
      independence_level: petPayload.independenceLevel,
      dog_size: petPayload.dogSize,
    } as any

    delete expectResponse.dogSize
    delete expectResponse.independenceLevel
    delete createPetResponse.body.pet.id

    expect(createPetResponse.status).toBe(201)
    expect(createPetResponse.body.pet).toEqual(
      expect.objectContaining(expectResponse),
    )
  })
})
