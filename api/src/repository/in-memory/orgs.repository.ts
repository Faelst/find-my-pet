import { Prisma, Org } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { OrgsRepository } from '../org-repository'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async create(data: Prisma.OrgUncheckedCreateInput) {
    const org = {
      id: randomUUID(),
      address: data.address,
      cep: data.cep,
      email: data.email,
      latitude: data.latitude,
      longitude: data.longitude,
      name: data.name,
      password_hash: data.password_hash,
      whatsapp: data.whatsapp,
    } as Org

    this.items.push(org)

    return org
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }
}
