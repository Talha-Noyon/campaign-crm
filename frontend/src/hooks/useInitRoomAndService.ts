import {useCallback, useEffect} from 'react'

import {useStore} from '@/store'
import {useAuth} from '@/store/Auth'

import {timeSince} from '@/utils/Common'
import {socket} from '@/utils/Socket'

export function useInitRoomAndService() {
  const {auth} = useAuth()
  const connectionTime = useStore((state) => state.connectionTime)

  const updateRoomAndService = useCallback(() => {
    if (auth) {
      socket.emit('set-room', {user_id: auth.token})
    }
  }, [auth])

  // 01. on mount
  useEffect(() => {
    updateRoomAndService()
  }, [updateRoomAndService])

  // 02. on visibility change
  useEffect(() => {
    document.addEventListener('visibilitychange', updateRoomAndService)

    return () => {
      document.removeEventListener('visibilitychange', updateRoomAndService)
    }
  }, [updateRoomAndService])

  // 03. on "connectionTime" five minutes passed
  useEffect(() => {
    const id = window.setInterval(() => {
      const fiveMinutesPassed = timeSince(connectionTime) > 5

      if (fiveMinutesPassed) {
        updateRoomAndService()
      }
    }, 10000) // 10 seconds

    return () => {
      window.clearInterval(id)
    }
  }, [connectionTime, updateRoomAndService])
}
