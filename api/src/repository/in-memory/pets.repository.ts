import { Prisma, Pet } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { PetsRepository } from '../pet-repository'

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
}
