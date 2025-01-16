import {type StateCreator, create} from 'zustand'

import {type AuthSlice, createAuthSlice} from '@/store/Auth'
import {type CommonSlice, createCommonSlice} from '@/store/Common'

export type Slice<T> = StateCreator<Store, [], [], T>
export type Store = CommonSlice & AuthSlice

export const useStore = create<Store>()((...a) => ({
  ...createCommonSlice(...a),
  ...createAuthSlice(...a)
}))
