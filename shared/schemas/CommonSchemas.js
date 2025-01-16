import {z} from 'zod'

export const toNumberSchema = z.preprocess(
  (value) => (typeof value === 'string' ? parseFloat(value) : value),
  z.number()
)

const StatusDetailsSchema = z.object({
  processStartTime: z.number(),
  processingTime: z.number(),
  processEndTime: z.number()
})

export const StatusDetailsByRecipientsSchema = z.record(z.string(), StatusDetailsSchema)

export const TaskSchema = z.object({
  _id: z.string(),
  campaignName: z.string(),
  messageContent: z.string(),
  recipients: z.array(z.string().email()),
  scheduleTime: z
    .object({
      start: z.string().refine((value) => !isNaN(Date.parse(value)), {
        message: 'Invalid start date format'
      }),
      end: z.string().refine((value) => !isNaN(Date.parse(value)), {
        message: 'Invalid end date format'
      })
    })
    .required(),
  createdBy: z.string().length(24, 'Invalid ObjectId for createdBy'),
  statusDetailsByRecipients: StatusDetailsByRecipientsSchema,
  status: z.enum(['pending', 'processing', 'completed']).default('pending')
})
