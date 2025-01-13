import {z} from 'zod'

import {StatusDetailsByRecipientsSchema, TaskSchema} from '../schemas/CommonSchemas'
import {loginSchema, registerSchema} from '../schemas/UserSchema'

export type Task = z.infer<typeof TaskSchema>
export type StatusDetailsByRecipients = z.infer<typeof StatusDetailsByRecipientsSchema>
export type RegisteredUser = z.infer<typeof registerSchema>
export type LoginUser = z.infer<typeof loginSchema>

/**
 * Fetch activity
 */
export const campaignTypes = ['completed', 'pending', 'processing'] as const

export type ReportTypes = (typeof campaignTypes)[number]

export type FetchReportArgs = {
  type: ReportTypes
  startDate: string
  endDate: string
}
