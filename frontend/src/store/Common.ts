import {type BellNotification} from '@shared/types'
import {useEffect} from 'react'

import {type Slice, useStore} from '@/store'
import {userDefaultState} from '@/store/User'

export type State = {
  socketStatus: boolean
  bellNotifications: BellNotification[]
  isOnline: boolean
}

export const defaultState: State = {
  bellNotifications: [],
  socketStatus: false,
  isOnline: true
}

type Action = {
  setCommon: (status: Partial<State>) => void
  resetAllState: () => void
}

export type CommonSlice = State & Action

export const createCommonSlice: Slice<CommonSlice> = (set, get) => ({
  ...defaultState,
  setCommon(common) {
    set(common)
  },

  resetAllState() {
    set({
      ...defaultState,
      ...userDefaultState
    })
  }
})

export function useInitIsOnline() {
  const setCommon = useStore((state) => state.setCommon)

  useEffect(() => {
    function handleStatus() {
      setCommon({isOnline: navigator.onLine})
    }

    handleStatus()

    window.addEventListener('offline', handleStatus)
    window.addEventListener('online', handleStatus)

    return () => {
      window.removeEventListener('offline', handleStatus)
      window.removeEventListener('online', handleStatus)
    }
  }, [setCommon])
}
