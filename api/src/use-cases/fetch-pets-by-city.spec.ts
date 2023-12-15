import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '../repository/in-memory/pets.repository'
import { randomUUID } from 'crypto'
import { FetchPetsByCityUseCase } from './fetch-pets-by-city'

describe('FetchPetByIdUseCase', () => {
  let petsRepository: InMemoryPetsRepository
  let sut: FetchPetsByCityUseCase

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetsByCityUseCase(petsRepository)
  })

  it('should find pet by id', async () => {
    const pet1 = await petsRepository.create({
      dog_size: 'BIG',
      environment: 'LARGE',
      independence_level: 'HIGH',
      name: 'jon dog',
      orgId: randomUUID(),
      requirements: JSON.stringify({ abc: 'abc' }),
      about: 'something about dog',
      age: 'ELDERLY',
      city: 'Sao Paulo',
      state: 'SP',
    })

    const pet2 = await petsRepository.create({
      dog_size: 'BIG',
      environment: 'LARGE',
      independence_level: 'HIGH',
      name: 'jon dog',
      orgId: randomUUID(),
      requirements: JSON.stringify({ abc: 'abc' }),
      about: 'something about dog',
      age: 'ELDERLY',
      city: 'Sao Paulo',
      state: 'SP',
    })

    const petFindById = await sut.execute({ city: pet1.city })

    expect(petFindById).not.toBeNull()
    expect(petFindById.pets).toEqual(expect.objectContaining([pet1, pet2]))
  })
})
