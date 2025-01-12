import {type StateCreator, create} from 'zustand'

import {type AuthSlice, createAuthSlice} from '@/store/Auth'
import {type UserSlice, createUserSlice} from '@/store/User'
import {type CommonSlice, createCommonSlice} from '@/store/Common'

export type Slice<T> = StateCreator<Store, [], [], T>
export type Store = CommonSlice & UserSlice & AuthSlice

export const useStore = create<Store>()((...a) => ({
  ...createCommonSlice(...a),
  ...createUserSlice(...a),
  ...createAuthSlice(...a)
}))
