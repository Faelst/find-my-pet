import { FastifyReply, FastifyRequest } from 'fastify'
import { fetchPetsByCitySchemaQueryValidation } from '../../../lib/schema-validation/fetch-pets-by-city'
import { makeFetchPetsByCityUseCase } from '../../../use-cases/factories/make-fetch-pets-by-city-use-case'

export const fetchPetsByCity = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { city, page } = fetchPetsByCitySchemaQueryValidation(request)

  const fetchPetsByCityUseCase = makeFetchPetsByCityUseCase()

  const { pets } = await fetchPetsByCityUseCase.execute({ city, page })

  return reply.status(200).send({
    pets,
  })
}
