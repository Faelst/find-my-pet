import { Pet, Prisma } from '@prisma/client'
import { PetCharacteristics } from '../use-cases/search-pets-by-characteristics'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findByCity(city: string): Promise<Pet[] | null>
  searchByCharacteristics(
    query: PetCharacteristics,
    page: number,
  ): Promise<Pet[]>
}
