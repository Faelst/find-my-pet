import { FastifyReply, FastifyRequest } from 'fastify'
import { createPetSchemaBodyValidation } from '@/lib/schema-validation/create-pet'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { UserAlreadyExistsError } from '../../../use-cases/errors/user-allready-exists.error'

export const createPet = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const petBodyData = createPetSchemaBodyValidation(request)

  try {
    const createPetUseCase = makeCreatePetUseCase()

    const org = await createPetUseCase.execute({
      ...petBodyData,
      orgId: request.user.sub,
    } as any)

    return reply.status(201).send(org)
  } catch (error) {
    console.log(error)
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    throw error
  }
}
