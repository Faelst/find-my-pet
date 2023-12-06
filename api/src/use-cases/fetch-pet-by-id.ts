import { PetsRepository } from '../repository/pet-repository'
import { Pet } from '@prisma/client'

interface FetchPetByIdUseCaseResponse {
  pet: Pet | null
}

export class FetchPetByIdUseCase {
  constructor(private readonly petsRepository: PetsRepository) {}

  async execute(petId: string): Promise<FetchPetByIdUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId)

    return {
      pet,
    }
  }
}
