import { PrismaOrgsRepository } from '../../repository/prisma/orgs.repository'
import { RegisterOrgUseCase } from '../register-org'

export function makeRegisterOrgUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  return new RegisterOrgUseCase(orgsRepository)
}
