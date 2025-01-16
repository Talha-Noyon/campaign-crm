import {useEffect} from 'react'

import {useStore} from '@/store'

import {removeSocketListeners} from '@/utils/Common'
import {socket} from '@/utils/Socket'

export function useInitSocketStatus() {
  const setCommon = useStore((state) => state.setCommon)
  const auth = useStore((state) => state.auth)
  useEffect(() => {
    socket.on('disconnect', () => {
      setCommon({socketStatus: false})
      console.log('socket off')
    })

    socket.on('connect', () => {
      setCommon({socketStatus: true})
      socket.emit('set-user-room', {token: auth?.token})
      console.log('socket on')
    })

    return () => {
      removeSocketListeners(socket, ['disconnect', 'connect'])
    }
  }, [setCommon, auth])
}
