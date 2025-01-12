import {useEffect} from 'react'
import {Navigate, Routes} from 'react-router-dom'

import {useStore} from '@/store'

export function Logout() {
  const setAuth = useStore((state) => state.setAuth)
  useEffect(() => {
    setAuth(null)
    document.location.reload()
  }, [setAuth])

  return (
    <Routes>
      <Navigate to="/auth/login" />
    </Routes>
  )
}
