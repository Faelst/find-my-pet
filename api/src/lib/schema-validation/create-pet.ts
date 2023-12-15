import { FastifyRequest } from 'fastify'
import { z } from 'zod'

export const createPetSchemaBodyValidation = ({ body }: FastifyRequest) => {
  const schema = z.object({
    dogSize: z.string(),
    environment: z.string(),
    independenceLevel: z.string(),
    name: z.string(),
    requirements: z.string(),
    about: z.string(),
    age: z.string(),
  })

  return schema.parse(body)
}
