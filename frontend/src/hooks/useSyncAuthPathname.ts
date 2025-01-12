import {useEffect} from 'react'
import {useLocation} from 'react-router-dom'

const KEY_NAME = 'LOCATION_PATHNAME'

export function useSyncAuthPathname() {
  const {pathname} = useLocation()

  useEffect(() => {
    if (!pathname.startsWith('/auth')) {
      window.localStorage.setItem(KEY_NAME, pathname)
    }
  }, [pathname])
}

export function getAuthPathname() {
  return window.localStorage.getItem(KEY_NAME)
}
