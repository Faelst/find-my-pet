import { FastifyRequest } from 'fastify'
import { z } from 'zod'

export const registerOrgSchemaBodyValidation = ({ body }: FastifyRequest) => {
  const schema = z.object({
    email: z.string().email(),
    name: z.string(),
    password: z.string().min(6),
    cep: z.string(),
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
    address: z.string(),
    whatsapp: z.string(),
    city: z.string(),
    state: z.string(),
  })

  return schema.parse(body)
}
