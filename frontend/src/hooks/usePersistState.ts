import {useState} from 'react'

export function usePersistState<T>(storageKey: string, defaultState: T) {
  const [state, setState] = useState<T>(() => {
    try {
      const cachedJson = window.localStorage.getItem(storageKey)

      if (cachedJson) {
        return JSON.parse(cachedJson) as T
      } else {
        return defaultState
      }
    } catch {
      return defaultState
    }
  })

  function deferredSetState(state: T) {
    try {
      setState(state)

      window.localStorage.setItem(storageKey, JSON.stringify(state))
    } catch {
      //
    }
  }

  return [state, deferredSetState] as const
}
