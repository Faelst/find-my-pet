import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '../repository/in-memory/pets.repository'
import { randomUUID } from 'crypto'
import { SearchPetsByCharacteristicsUseCase } from './search-pets-by-characteristics'
import { Pet } from '@prisma/client'

describe('SearchPetsByCharacteristicsUseCase', () => {
  let petsRepository: InMemoryPetsRepository
  let sut: SearchPetsByCharacteristicsUseCase
  let pet1: Pet, pet2: Pet, pet3: Pet, pet4: Pet

  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new SearchPetsByCharacteristicsUseCase(petsRepository)

    pet1 = await petsRepository.create({
      dog_size: 'BIG',
      environment: 'LARGE',
      independence_level: 'LOW',
      name: 'jon dog',
      orgId: randomUUID(),
      requirements: JSON.stringify({ abc: 'abc' }),
      about: 'something about dog',
      age: 'ELDERLY',
    })

    pet2 = await petsRepository.create({
      dog_size: 'BIG',
      environment: 'MEDIUM',
      independence_level: 'HIGH',
      name: 'jon dog',
      orgId: randomUUID(),
      requirements: JSON.stringify({ abc: 'abc' }),
      about: 'something about dog',
      age: 'ELDERLY',
    })

    pet3 = await petsRepository.create({
      dog_size: 'SMALL',
      environment: 'SMALL',
      independence_level: 'LOW',
      name: 'jon dog',
      orgId: randomUUID(),
      requirements: JSON.stringify({ abc: 'abc' }),
      about: 'something about dog',
      age: 'OLD',
    })

    pet4 = await petsRepository.create({
      dog_size: 'MEDIUM',
      environment: 'LARGE',
      independence_level: 'HIGH',
      name: 'jon dog',
      orgId: randomUUID(),
      requirements: JSON.stringify({ abc: 'abc' }),
      about: 'something about dog',
      age: 'OLD',
    })
  })

  it('should find pet by size', async () => {
    const { pets } = await sut.execute({ dogSize: 'BIG' }, 1)

    expect(pets).not.toBeNull()
    expect(pets).toEqual(expect.objectContaining([pet1, pet2]))
  })

  it('should find pet by environment', async () => {
    const { pets } = await sut.execute({ dogEnvironment: 'SMALL' }, 1)

    expect(pets).not.toBeNull()
    expect(pets).toEqual(expect.objectContaining([pet3]))
  })

  it('should find pet by independence_level', async () => {
    const { pets } = await sut.execute({ dogIndependenceLevel: 'LOW' }, 1)

    expect(pets).not.toBeNull()
    expect(pets).toEqual(expect.objectContaining([pet1, pet3]))
  })

  it('should find pet by age', async () => {
    const { pets } = await sut.execute({ dogAge: 'OLD' }, 1)

    expect(pets).not.toBeNull()
    expect(pets).toEqual(expect.objectContaining([pet3]))
  })

  it('should find pet by size, age, independence_level, environment', async () => {
    const { pets } = await sut.execute(
      {
        dogAge: 'OLD',
        dogEnvironment: 'LARGE',
        dogIndependenceLevel: 'HIGH',
        dogSize: 'MEDIUM',
      },
      1,
    )

    expect(pets).not.toBeNull()
    expect(pets).toEqual(expect.objectContaining([pet4]))
  })
})
