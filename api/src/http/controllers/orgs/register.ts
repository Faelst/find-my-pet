import { FastifyReply, FastifyRequest } from 'fastify'
import { registerOrgSchemaBodyValidation } from '../../../lib/schema-validation/register-org'
import { makeRegisterOrgUseCase } from '../../../use-cases/factories/make-register-use-case'
import { UserAlreadyExistsError } from '../../../use-cases/errors/user-allready-exists.error'

export const registerOrg = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const orgBodyData = registerOrgSchemaBodyValidation(request)

  try {
    const registerOrg = makeRegisterOrgUseCase()

    const org = await registerOrg.execute(orgBodyData)

    return reply.status(201).send(org)
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    throw error
  }
}
