import {StatusDetailsByRecipientsSchema, TaskSchema} from '@shared/schemas/CommonSchemas'
import {loginSchema, registerSchema} from '@shared/schemas/UserSchema'
import {z} from 'zod'

type Task = z.infer<typeof TaskSchema>
type StatusDetailsByRecipients = z.infer<typeof StatusDetailsByRecipientsSchema>
type RegisteredUser = z.infer<typeof registerSchema>
type LoginUser = z.infer<typeof loginSchema>

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
