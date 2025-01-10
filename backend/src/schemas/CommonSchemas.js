import {z} from 'zod'

const StatusDetailsSchema = z.object({
  processStartTime: z.number(),
  processingTime: z.number(),
  processEndTime: z.number()
})

export const StatusDetailsByRecipientsSchema = z.record(z.string(), StatusDetailsSchema)

export const TaskSchema = z.object({
  _id: z.string(),
  name: z.string(),
  message: z.string(),
  recipients: z.array(z.string().email()),
  scheduleTime: z.string(),
  createdBy: z.string(),
  statusDetailsByRecipients: StatusDetailsByRecipientsSchema,
  status: z.enum(['pending', 'processing', 'completed'])
})
