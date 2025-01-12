import {LocalJson} from '@/utils/LocalJSON'

const AUTH_KEY = 'AUTH'

export type AuthUser = {
  _id: string
  user_type_id: number
  user_email: string
  token: string
  first_name: string
  last_name: string
  role: string
}

export const localAuth = new LocalJson<AuthUser>(AUTH_KEY)

export function getLocalAuth(): AuthUser {
  const authUser = localAuth.get()

  if (!authUser) {
    throw new Error('User session missing')
  }

  return authUser
}
