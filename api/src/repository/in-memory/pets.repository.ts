import { Prisma, Pet, $Enums } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { PetsRepository } from '../pet-repository'
import { PetCharacteristics } from '../../use-cases/search-pets-by-characteristics'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      dog_size: data.environment,
      environment: data.environment,
      independence_level: data.independence_level,
      requirements: JSON.stringify(data.requirements),
      about: data.about,
      age: data.age,
      orgId: data.orgId,
    } as Pet

    this.items.push(pet)

    return pet
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = this.items.find((pet) => pet.id === id)

    return pet || null
  }

  findByCity(city: string): Promise<Pet[] | null> {
    const pets = this.items.filter((pet) => pet.city === city)

    return pets || null
  }

  async searchByCharacteristics(
    query: PetCharacteristics,
    page: number,
    limit = 10,
  ): Promise<Pet[]> {
    const pets = this.items
      .filter(
        (item) =>
          query.dogAge === item.age ||
          query.dogEnvironment === item.environment ||
          query.dogIndependenceLevel === item.independence_level ||
          query.dogSize === item.dog_size,
      )
      .slice(((page === 1 ? 0 : page) - 1) * limit + 1, page * limit + 1)

    return pets
  }
}
