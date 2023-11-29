import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOrgUseCase, CreateOrgUseCaseDto } from './create-org'
import { InMemoryOrgsRepository } from '../repository/in-memory/orgs.repository'

describe('CreateOrgUseCase', () => {
  let orgRepository: InMemoryOrgsRepository
  let sut: CreateOrgUseCase

  const orgPayload = {
    name: 'Some Org',
    address: 'some street',
    cep: '12122-120',
    email: 'jhon.due@email.com',
    password: 'password string',
    whatsapp: '(99) 99999 9999',
    latitude: -3.761916,
    longitude: -38.519214,
  } as CreateOrgUseCaseDto

  beforeEach(() => {
    orgRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgRepository)
  })

  it('should create user', async () => {
    const { org } = await sut.execute(orgPayload)

    expect(org).toBeDefined()
    expect(org.id).toEqual(expect.any(String))
  })
})
