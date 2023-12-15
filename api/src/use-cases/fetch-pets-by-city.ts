import { PetsRepository } from '../repository/pet-repository'
import { Pet } from '@prisma/client'

interface FetchPetsByCityUseCaseResponse {
  pets: Pet[] | null
}

export class FetchPetsByCityUseCase {
  constructor(private readonly petsRepository: PetsRepository) {}

  async execute({
    city,
    page,
  }: {
    city: string
    page?: number
  }): Promise<FetchPetsByCityUseCaseResponse> {
    const pets = await this.petsRepository.findByCity({ city, page })

    return {
      pets,
    }
  }
}
