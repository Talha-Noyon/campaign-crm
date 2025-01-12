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
    const {data} = await api.post<AuthUser>('/login', {
      user_email: email,
      user_pass: password
    })

    setAuth(data)

    return data
  }

  async function logout() {
    if (auth) {
      const {data} = await api.post<{assignmentExists: boolean; msg: string}>(
        '/update-logout-session',
        {
          user_id: auth._id,
          user_login_session_id: auth.token
        }
      )
      if (data?.assignmentExists) {
        return {
          status: 'FAILED',
          data
        } as const
      } else {
        setAuth(null)
        return {
          status: 'SUCCESS'
        } as const
      }
    }
  }

  return {auth, login, logout}
}
