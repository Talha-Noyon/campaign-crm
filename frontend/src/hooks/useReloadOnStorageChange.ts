import {useEffect} from 'react'

export function useReloadOnStorageChange() {
  useEffect(() => {
    function handleStorageChange({key}: StorageEvent) {
      if (key === 'user-active-key' || key === 'agent-break') {
        window.location.reload()
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])
}
