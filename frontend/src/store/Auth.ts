import {type Slice, useStore} from '@/store'
import {type AuthUser, localAuth} from '@/store/LocalAuth'

import {api} from '@/utils/Axios'

export type State = {
  auth: AuthUser | null
}

export type Action = {
  setAuth: (auth: AuthUser | null) => void
}

export const defaultState: State = {
  auth: localAuth.get()
}

export type AuthSlice = State & Action

export const createAuthSlice: Slice<AuthSlice> = (set) => ({
  ...defaultState,
  setAuth(auth) {
    localAuth.set(auth)
    set({auth})
  }
})

export function useAuth() {
  const auth = useStore((state) => state.auth)
  const setAuth = useStore((state) => state.setAuth)

  async function login({email, password}: {email: string; password: string}) {
    const {data} = await api.post<AuthUser>('/api/auth/login', {
      email: email,
      password
    })

    setAuth(data)

    return data
  }

  async function logout() {
    if (auth) {
      const {data} = await api.post<{success: boolean; message: string}>('/api/auth/logout', {
        token: auth.token
      })
      if (data?.success) {
        return {
          status: 'SUCCESS'
        } as const
      } else {
        setAuth(null)
        return {
          status: 'FAILED',
          data
        } as const
      }
    }
  }

  return {auth, login, logout}
}
