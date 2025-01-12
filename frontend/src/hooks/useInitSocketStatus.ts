import {useEffect} from 'react'

import {useStore} from '@/store'

import {socket} from '@/utils/Socket'
import {removeSocketListeners} from '@/utils/Common'

export function useInitSocketStatus() {
  const setCommon = useStore((state) => state.setCommon)

  useEffect(() => {
    socket.on('disconnect', () => {
      setCommon({socketStatus: false})
      console.log('socket off')
    })

    socket.on('connect', () => {
      setCommon({socketStatus: true})
      console.log('socket on')
    })

    return () => {
      removeSocketListeners(socket, ['disconnect', 'connect'])
    }
  }, [setCommon])
}
