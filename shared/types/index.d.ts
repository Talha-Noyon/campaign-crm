import {z} from 'zod'

import {StatusDetailsByRecipientsSchema, TaskSchema} from '#shared/schemas/CommonSchemas'
import {loginSchema, registerSchema} from '#shared/schemas/UserSchema'

type Task = z.infer<typeof TaskSchema>
type StatusDetailsByRecipients = z.infer<typeof StatusDetailsByRecipientsSchema>
type RegisteredUser = z.infer<typeof registerSchema>
type LoginUser = z.infer<typeof loginSchema>
