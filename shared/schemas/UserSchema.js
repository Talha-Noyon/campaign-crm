import {z} from 'zod'

export const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long').nonempty(),
  email: z.string().email('Invalid email address').nonempty(),
  _id: z.string().optional(),
  password: z.string().min(6, 'Password must be at least 6 characters long').nonempty(),
  role: z.enum(['admin', 'campaign_manager']).optional()
})

export const loginSchema = z.object({
  email: z.string().email('Invalid email address').nonempty(),
  password: z.string().min(6, 'Password must be at least 6 characters long').nonempty()
})
