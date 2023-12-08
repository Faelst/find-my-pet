import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '../repository/in-memory/pets.repository'
import { randomUUID } from 'crypto'
import { FetchPetByIdUseCase } from './fetch-pet-by-id'

describe('FetchPetByIdUseCase', () => {
  let petsRepository: InMemoryPetsRepository
  let sut: FetchPetByIdUseCase

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetByIdUseCase(petsRepository)
  })

  it('should find pet by id', async () => {
    const pet = await petsRepository.create({
      dog_size: 'BIG',
      environment: 'LARGE',
      independence_level: 'HIGH',
      name: 'jon dog',
      orgId: randomUUID(),
      requirements: JSON.stringify({ abc: 'abc' }),
      about: 'something about dog',
      age: 'ELDERLY',
      city: 'any_city',
      state: 'any_state',
    })

    const petFindById = await sut.execute(pet.id)

    expect(petFindById).not.toBeNull()
    expect(petFindById).toEqual(expect.objectContaining({ pet }))
  })

  it('should be return null when pet id is incorrect', async () => {
    const petFindById = await sut.execute('invalid_pet_id')

    expect(petFindById.pet).toBeNull()
  })
})
