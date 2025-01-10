import {z} from 'zod'

const toNumberSchema = z.preprocess((value) => parseFloat(value), z.number())

export const campaignSchema = z.object({
  name: z.string().min(3, 'Campaign name must be at least 3 characters long'),
  message: z.string().min(1, 'Message content is required'),
  recipients: z.array(z.string().email(), 'Recipients must be an array of valid email addresses'),
  scheduleTime: toNumberSchema
})
