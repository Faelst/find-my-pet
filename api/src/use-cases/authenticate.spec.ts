import { beforeEach, describe, expect, it } from 'vitest'
import { OrgsRepository } from '../repository/org-repository'
import { AuthenticateUseCase } from './authenticate'
import { InMemoryOrgsRepository } from '../repository/in-memory/orgs.repository'
import { hash } from 'bcryptjs'
import { Org } from '@prisma/client'
import { randomUUID } from 'crypto'
import { InvalidCredentialsError } from './errors/invalid-credentials.error'

describe('AuthenticateUseCase', () => {
  let orgsRepository: OrgsRepository
  let sut: AuthenticateUseCase

  const orgCredentialTest = {
    name: 'any_name',
    address: '',
    cep: '12310054',
    email: 'mail@mail.com',
    latitude: -1000,
    longitude: -1000,
    whatsapp: '99999999999',
    password: 'any_pass',
  }

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)
  })

  it('should be able to authenticate', async () => {
    await orgsRepository.create({
      ...orgCredentialTest,
      password_hash: await hash(orgCredentialTest.password, 4),
    })

    const { org } = await sut.execute(orgCredentialTest)

    expect(org).toBeDefined()
    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate, when not found user', async () => {
    await expect(() => sut.execute(orgCredentialTest)).rejects.toBeInstanceOf(
      InvalidCredentialsError,
    )
  })

  it('should not be able to authenticate, when be user invalid password', async () => {
    await orgsRepository.create({
      ...orgCredentialTest,
      password_hash: await hash(orgCredentialTest.password, 4),
    })

    await expect(() =>
      sut.execute({
        email: orgCredentialTest.email,
        password: 'invalid_password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
