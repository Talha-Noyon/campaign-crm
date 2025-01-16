import {z} from 'zod'

import {campaignSchema} from '../schemas/CampaignSchema'
import {StatusDetailsByRecipientsSchema, TaskSchema} from '../schemas/CommonSchemas'
import {loginSchema, registerSchema} from '../schemas/UserSchema'

export type Task = z.infer<typeof TaskSchema>
export type StatusDetailsByRecipients = z.infer<typeof StatusDetailsByRecipientsSchema>
export type RegisteredUser = z.infer<typeof registerSchema>
export type LoginUser = z.infer<typeof loginSchema>
export type CampaignModel = z.infer<typeof campaignSchema>

export const campaignTypes = ['completed', 'pending', 'processing'] as const

export type CampaignDataParams = {
  campaignName: string
  messageContent: string
  recipients: string[]
  scheduleTime: ScheduleTime
  category?: Category
}
export type CampaignMetrics = {
  _id: string
  campaignName: string
  total?: number
  successCount: number
  failureCount: number
}
export type ScheduleTime = {
  start: string
  end: string
}

export type Category = {
  value: string
  label: string
}

type SendingStatus = 'success' | 'failed'
export type BellNotification = {
  email: string
  sendingStatus: SendingStatus
}
export type AuthUser = {
  _id: string
  email: string
  token: string
  username: string
  role: string
}
