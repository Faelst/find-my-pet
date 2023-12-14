import { Org, Prisma } from '@prisma/client'
import { OrgsRepository } from '../org-repository'
import { prisma } from '../../lib/prisma'

export class PrismaOrgsRepository implements OrgsRepository {
  create(data: Prisma.OrgUncheckedCreateInput): Promise<Org> {
    return prisma.org.create({
      data,
    })
  }

  findByEmail(email: string): Promise<Org | null> {
    return prisma.org.findFirst({
      where: {
        email,
      },
    })
  }
}
