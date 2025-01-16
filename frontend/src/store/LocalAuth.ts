import {LocalJson} from '@/utils/LocalJSON'

const AUTH_KEY = 'AUTH_KEY'

export type AuthUser = {
  _id: string
  email: string
  token: string
  username: string
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
