import {z} from 'zod'

const StatusDetailsSchema = z.object({
  processStartTime: z.number(),
  processingTime: z.number(),
  processEndTime: z.number()
})

export const campaignSchema = z.object({
  campaignName: z.string().min(3, 'Name is required'), // Required string
  messageContent: z.string().min(1, 'Message is required'), // Required string
  recipients: z.array(z.string().min(1)).nonempty('Recipients cannot be empty'), // Array of non-empty strings
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

  // Validate the statusDetailsByRecipients as a map, ensuring it's not empty
  statusDetailsByRecipients: z
    .record(StatusDetailsSchema)
    .refine((data) => Object.keys(data).length > 0, {
      message: 'Status details by recipients must not be empty'
    })
    .optional(),

  status: z.enum(['pending', 'processing', 'completed']).default('pending'), // Enum with a default value of 'pending'
  createdBy: z.string().length(24, 'Invalid ObjectId for createdBy').optional(), // Assuming ObjectId is a 24-character hex string
  isApproved: z.boolean().default(false),
  approvedBy: z.string().length(24).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
})
