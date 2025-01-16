import {type RegisteredUser} from '@shared/types/index'

import {type Slice} from '@/store'

type State = {
  user: RegisteredUser | null
}

export const userDefaultState: State = {
  user: null
}

type Action = {
  setUser: (user: RegisteredUser) => void
}

export type UserSlice = State & Action

export const createUserSlice: Slice<UserSlice> = (set, get) => ({
  ...userDefaultState,
  setUser(user) {
    set({user})
  }
})
