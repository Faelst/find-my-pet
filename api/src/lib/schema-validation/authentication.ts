import { FastifyRequest } from 'fastify'
import { z } from 'zod'

export const authenticationSchemaBodyValidation = ({
  body,
}: FastifyRequest) => {
  const schema = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  return schema.parse(body)
}
