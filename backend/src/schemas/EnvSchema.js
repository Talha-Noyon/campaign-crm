import 'dotenv/config'

import {z} from 'zod'

const toNumberSchema = z.preprocess((value) => parseFloat(value), z.number())

const envSchema = z.object({
  JWT_SECRET: z.string().nonempty(),
  MONGO_URI: z.string().nonempty(),
  SERVER_IP: z.string().nonempty(),
  RABBITMQ_URI: z.string().nonempty(),
  PORT: toNumberSchema
})

export const env = envSchema.parse(process.env)
