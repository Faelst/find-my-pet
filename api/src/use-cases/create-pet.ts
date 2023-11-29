import { Pet } from '@prisma/client'
import { PetsRepository } from '../repository/pet-repository'

export interface CreatePetUseCaseDto {
  name: string
  about?: string
  age: 'OLD' | 'MEDIUM' | 'ELDERLY'
  dogSize: 'SMALL' | 'MEDIUM' | 'BIG'
  independenceLevel: 'HIGH' | 'MEDIUM' | 'LOW'
  environment: 'LARGE' | 'MEDIUM' | 'SMALL'
  requirements: string
  orgId: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private readonly petsRepository: PetsRepository) {}

  async execute({
    name,
    about,
    age,
    dogSize,
    independenceLevel,
    environment,
    requirements,
    orgId,
  }: CreatePetUseCaseDto): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      dog_size: dogSize,
      independence_level: independenceLevel,
      environment,
      requirements,
      orgId,
    })

    return { pet }
  }
}
