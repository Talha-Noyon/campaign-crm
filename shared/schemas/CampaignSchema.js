import {z} from 'zod'

import {toNumberSchema} from '#schemas/CommonSchemas.js'

export const campaignSchema = z.object({
  name: z.string().min(3, 'Campaign name must be at least 3 characters long'),
  message: z.string().min(1, 'Message content is required').nonempty(),
  recipients: z
    .array(z.string().email({message: 'Each recipient must be a valid email address'}))
    .nonempty({
      message: 'Recipients must be an array of valid email addresses'
    }),
  scheduleTime: toNumberSchema
})
