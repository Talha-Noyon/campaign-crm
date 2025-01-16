import {type AuthUser} from '@shared/types'

import {LocalJson} from '@/utils/LocalJSON'

const AUTH_KEY = 'AUTH_KEY'

export const localAuth = new LocalJson<AuthUser>(AUTH_KEY)

export function getLocalAuth(): AuthUser {
  const authUser = localAuth.get()

  if (!authUser) {
    throw new Error('User session missing')
  }

  return authUser
}
