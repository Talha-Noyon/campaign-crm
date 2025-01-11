import 'dotenv/config'

import {z} from 'zod'

import {toNumberSchema} from '#schemas/CommonSchemas.js'

const envSchema = z.object({
  JWT_SECRET: z.string().nonempty(),
  MONGO_URI: z.string().nonempty(),
  SERVER_IP: z.string().nonempty(),
  RABBITMQ_URI: z.string().nonempty(),
  PORT: toNumberSchema
})

export const env = envSchema.parse(process.env)
