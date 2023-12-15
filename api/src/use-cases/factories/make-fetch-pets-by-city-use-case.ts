import { PrismaPetsRepository } from '@/repository/prisma/pets.repository'
import { FetchPetsByCityUseCase } from '../fetch-pets-by-city'

export function makeFetchPetsByCityUseCase() {
  const petsRepository = new PrismaPetsRepository()
  return new FetchPetsByCityUseCase(petsRepository)
}
