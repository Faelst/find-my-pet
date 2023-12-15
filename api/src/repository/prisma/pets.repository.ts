import { Pet, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { PetsRepository } from '../pet-repository'
import { PetCharacteristics } from '../../use-cases/search-pets-by-characteristics'

export class PrismaPetsRepository implements PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    return prisma.pet.create({
      data,
    })
  }

  findByCity({
    city,
    page = 1,
  }: {
    city: string
    page?: number
  }): Promise<Pet[] | null> {
    return prisma.pet.findMany({
      where: {
        Org: {
          city,
        },
      },
      take: 10,
      skip: (page - 1) * 10,
    })
  }

  findById(id: string): Promise<Pet | null> {
    return prisma.pet.findUnique({
      where: {
        id,
      },
    })
  }

  searchByCharacteristics(
    query: PetCharacteristics,
    page: number,
  ): Promise<Pet[]> {
    return prisma.pet.findMany({
      where: {
        age: query.dogAge,
        environment: query.dogEnvironment,
        independence_level: query.dogIndependenceLevel,
        dog_size: query.dogSize,
      },
      skip: (page - 1) * 10,
      take: 10,
    })
  }
}
