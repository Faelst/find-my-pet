import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '../repository/in-memory/pets.repository'
import { CreatePetUseCase, CreatePetUseCaseDto } from './create-pet'
import { randomUUID } from 'crypto'

describe('CreatePetUseCase', () => {
  let petsRepository: InMemoryPetsRepository
  let sut: CreatePetUseCase

  const petPayload = {
    dogSize: 'BIG',
    environment: 'LARGE',
    independenceLevel: 'HIGH',
    name: 'jon dog',
    orgId: randomUUID(),
    requirements: JSON.stringify({ abc: 'abc' }),
    about: 'something about dog',
    age: 'ELDERLY',
  } as CreatePetUseCaseDto

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petsRepository)
  })

  it('should create user', async () => {
    const { pet } = await sut.execute(petPayload)

    expect(pet).toBeDefined()
    expect(pet.id).toEqual(expect.any(String))
  })
})
