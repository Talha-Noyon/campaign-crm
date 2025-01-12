import {enqueueSnackbar} from 'notistack'
import {useEffect} from 'react'

import {type Slice, useStore} from '@/store'
import {useAuth} from '@/store/Auth'

import {socket} from '@/utils/Socket'

import {type RegisteredUser} from '@/shared/types'

type State = {
  user: RegisteredUser | null
}

export const defaultState: State = {
  user: null
}

type Action = {
  setUser: (user: RegisteredUser) => void
  loadUser: (sessionId: string) => void
}

export type UserSlice = State & Action

export const createUserSlice: Slice<UserSlice> = (set, get) => ({
  ...defaultState,
  setUser(user) {
    set({user})
  },
  loadUser(sessionId) {
    socket.emit(
      'get-user-info',
      {
        token: sessionId
      },
      (res) => {
        const {setUser} = get()
        if (!res) {
          enqueueSnackbar('User data not found')
        } else {
          const {user_email, username, user_mobile} = res.user
          const {role} = res.user

          setUser({
            username,
            mobile: user_mobile,
            type: role,
            email: user_email
          })
        }
      }
    )
  }
})

export function useLoadUser() {
  const {auth} = useAuth()
  const loadUser = useStore((state) => state.loadUser)
  useEffect(() => {
    if (auth) {
      loadUser(auth.token)
    }
  }, [loadUser, auth])
}
