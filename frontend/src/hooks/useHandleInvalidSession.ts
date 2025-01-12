import {useEffect} from 'react'

import {useStore} from '@/store'
import {useAuth} from '@/store/Auth'

import {removeSocketListeners} from '@/utils/Common'
import {socket} from '@/utils/Socket'

export function useHandleInvalidSession() {
  const {auth} = useAuth()
  const setCommon = useStore((state) => state.setCommon)
  const setAuth = useStore((state) => state.setAuth)
  const resetAllState = useStore((state) => state.resetAllState)

  useEffect(() => {
    socket.on('logout-for-invalid-session', ({active_key}) => {
      if (auth && active_key !== auth.token) {
        setAuth(null)
        resetAllState()
        socket.disconnect()
        setCommon({connectionTime: Date.now()})
        setTimeout(() => {
          window.location.reload()
        }, 3000) // 3 seconds
      }
    })

    return () => {
      removeSocketListeners(socket, ['logout-for-invalid-session'])
    }
  }, [auth, setAuth, setCommon, resetAllState])
}
