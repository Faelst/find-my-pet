import { hash } from 'bcryptjs'
import { Org } from '@prisma/client'
import { OrgsRepository } from '../repository/org-repository'

export interface CreateOrgUseCaseDto {
  address: string
  cep: string
  email: string
  name: string
  password: string
  whatsapp: string
  latitude: number
  longitude: number
  city: string
  state: string
}

interface CreatePetUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private readonly orgsRepository: OrgsRepository) {}

  async execute({
    name,
    address,
    cep,
    email,
    latitude,
    longitude,
    password,
    whatsapp,
    city,
    state,
  }: CreateOrgUseCaseDto): Promise<CreatePetUseCaseResponse> {
    const password_hash = await hash(password, Number(process.env.SECRET_SALT))

    const org = await this.orgsRepository.create({
      name,
      email,
      address,
      cep,
      latitude,
      longitude,
      password_hash,
      whatsapp,
      city,
      state,
    })

    return { org }
  }
}
