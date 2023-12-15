import { FastifyRequest } from 'fastify'
import { z } from 'zod'

export const fetchPetsByCitySchemaQueryValidation = ({
  query,
}: FastifyRequest) => {
  const schema = z.object({
    city: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  return schema.parse(query)
}
