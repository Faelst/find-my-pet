import { PetsRepository } from '../repository/pet-repository'
import { Pet } from '@prisma/client'

interface SearchPetsByCharacteristicsUseCaseResponse {
  pets: Pet[] | null
}

export type PetCharacteristics = {
  dogSize: 'SMALL' | 'MEDIUM' | 'BIG'
  dogAge: 'OLD' | 'MEDIUM' | 'ELDERLY'
  dogIndependenceLevel: 'HIGH' | 'MEDIUM' | 'LOW'
  dogEnvironment: 'LARGE' | 'MEDIUM' | 'SMALL'
}

export class SearchPetsByCharacteristicsUseCase {
  constructor(private readonly petsRepository: PetsRepository) {}

  async execute(
    query: PetCharacteristics,
    page: number,
  ): Promise<SearchPetsByCharacteristicsUseCaseResponse> {
    const pets = await this.petsRepository.searchMany(query, page)

    return {
      pets,
    }
  }
}
