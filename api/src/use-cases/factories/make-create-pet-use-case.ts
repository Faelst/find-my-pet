import { PrismaPetsRepository } from '@/repository/prisma/pets.repository'
import { CreatePetUseCase } from '../create-pet'

export function makeCreatePetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  return new CreatePetUseCase(petsRepository)
}
